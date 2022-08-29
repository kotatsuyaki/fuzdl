use std::fs::File;
use std::io::BufWriter;
use std::path::Path;
use std::{collections::HashMap, fs};

use anyhow::{Context, Result};
use image::io::Reader as ImageReader;
use image::DynamicImage;
use printpdf::{ImageTransform, Mm, PdfDocument, PdfDocumentReference, PdfPageIndex, Px};

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
        let img = ImageReader::open(img_path.as_ref())?.decode()?;
        pdf_builder.add_image(&img);

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
        Self {
            doc: PdfDocument::empty(title.as_ref()),
            pages: vec![],
        }
    }

    fn add_image(&mut self, img: &DynamicImage) {
        let img = printpdf::image::Image::from_dynamic_image(img);
        let width = px_to_mm(img.image.width);
        let height = px_to_mm(img.image.height);
        let (page, layer) = self.doc.add_page(width, height, "Layer1");
        self.pages.push(page);
        let layer = self.doc.get_page(page).get_layer(layer);

        let mut image_transform = ImageTransform::default();
        image_transform.dpi = Some(DPI);
        img.add_to_layer(layer, image_transform);
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
