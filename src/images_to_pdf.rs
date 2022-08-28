use std::fs::File;
use std::io::BufWriter;
use std::path::Path;
use std::{collections::HashMap, fs};

use anyhow::{Context, Result};
use image::io::Reader as ImageReader;
use image::DynamicImage;
use printpdf::{ImageTransform, Mm, PdfDocument, PdfDocumentReference, PdfPageIndex, Px};

const DPI: f64 = 96.0;

pub fn images_to_pdf<T: AsRef<Path>>(
    title: impl AsRef<str>,
    toc: HashMap<usize, String>,
    img_paths: impl IntoIterator<Item = T>,
    pdf_path: impl AsRef<Path>,
) -> Result<()> {
    let mut pdf_builder = PdfBuilder::new(title);
    for img_path in img_paths.into_iter() {
        let img = ImageReader::open(img_path.as_ref())?.decode()?;
        pdf_builder.add_image(&img);
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
