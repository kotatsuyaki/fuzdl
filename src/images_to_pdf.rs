use std::fs::File;
use std::io::{BufReader, BufWriter};
use std::path::Path;
use std::{collections::HashMap, fs};

use anyhow::{Context, Result};
use image::codecs::jpeg::JpegDecoder;
use image::ImageDecoder;
use printpdf::{
    ColorBits, ColorSpace, CustomPdfConformance, ImageFilter, ImageTransform, ImageXObject, Mm,
    PdfConformance, PdfDocument, PdfDocumentReference, PdfPageIndex, Px,
};

use crate::progress::Progress;

const DPI: f64 = 96.0;

pub struct PdfConfig<Title, ImgPathIter, ImgPath, PdfPath>
where
    Title: AsRef<str>,
    ImgPathIter: IntoIterator<Item = ImgPath>,
    ImgPath: AsRef<Path>,
    PdfPath: AsRef<Path>,
{
    pub title: Title,
    pub toc: HashMap<usize, String>,
    pub image_paths: ImgPathIter,
    pub pdf_path: PdfPath,
}

pub fn build_pdf<Title, ImgPathIter, ImgPath, PdfPath>(
    config: PdfConfig<Title, ImgPathIter, ImgPath, PdfPath>,
    update_progress: impl Fn(Progress),
) -> Result<()>
where
    Title: AsRef<str>,
    ImgPathIter: IntoIterator<Item = ImgPath>,
    ImgPath: AsRef<Path>,
    PdfPath: AsRef<Path>,
{
    let PdfConfig {
        title,
        toc,
        image_paths,
        pdf_path,
    } = config;

    let img_paths: Vec<_> = image_paths.into_iter().collect();
    let num_pages = img_paths.len();

    let mut pdf_builder = PdfBuilder::new(title);
    for (i, img_path) in img_paths.into_iter().enumerate() {
        pdf_builder.add_image(&img_path)?;

        update_progress(Progress {
            done: i + 1,
            total: num_pages,
        });
    }
    for (page, name) in toc {
        pdf_builder.add_bookmark(page, name);
    }
    pdf_builder.save_to_file(pdf_path)?;
    Ok(())
}

struct PdfBuilder {
    doc: PdfDocumentReference,
    pages: Vec<PdfPageIndex>,
}

impl PdfBuilder {
    fn new(title: impl AsRef<str>) -> Self {
        let doc = PdfDocument::empty(title.as_ref());
        let doc = doc.with_conformance(PdfConformance::Custom(CustomPdfConformance {
            requires_icc_profile: false,
            requires_xmp_metadata: false,
            ..Default::default()
        }));
        Self { doc, pages: vec![] }
    }

    fn add_image(&mut self, path: impl AsRef<Path>) -> Result<()> {
        let path = path.as_ref();

        let image_file = BufReader::new(File::open(&path)?);
        let image_decoder = JpegDecoder::new(image_file)?;

        let (width, height) = {
            let dim = image_decoder.dimensions();
            (Px(dim.0 as usize), Px(dim.1 as usize))
        };
        let (color_bits, color_space) = {
            let color_type = image_decoder.color_type();
            (ColorBits::from(color_type), ColorSpace::from(color_type))
        };
        drop(image_decoder);

        let image_data = std::fs::read(&path)?;
        let img_xobject = ImageXObject {
            width,
            height,
            color_space,
            bits_per_component: color_bits,
            image_data,
            interpolate: true,
            image_filter: Some(ImageFilter::DCT),
            clipping_bbox: None,
        };
        let image: printpdf::Image = img_xobject.into();

        let width_mm = px_to_mm(width);
        let height_mm = px_to_mm(height);

        let (page, layer) = self.doc.add_page(width_mm, height_mm, "Layer1");
        self.pages.push(page);
        let layer = self.doc.get_page(page).get_layer(layer);

        let mut image_transform = ImageTransform::default();
        image_transform.dpi = Some(DPI);
        image.add_to_layer(layer, image_transform);

        Ok(())
    }

    fn add_bookmark(&mut self, page: usize, name: String) {
        self.doc.add_bookmark(name, self.pages[page - 1]);
    }

    fn save_to_file(self, path: impl AsRef<Path>) -> Result<()> {
        let path = path.as_ref();
        fs::create_dir_all(path.parent().context("Destination path has no parent")?)?;
        self.doc.save(&mut BufWriter::new(File::create(path)?))?;

        Ok(())
    }
}

fn px_to_mm(px: Px) -> Mm {
    px.into_pt(DPI).into()
}
