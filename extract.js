import fs from 'fs';
import { exportImages } from 'pdf-export-images';

async function extract() {
  const file = "C:\\Users\\Christopher\\Documents\\sam annan\\SJ STUDIOZ (5).pdf";
  const outputDir = "C:\\Users\\Christopher\\Documents\\sam annan\\assets\\pdf_images";
  
  if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
  }

  try {
      const images = await exportImages(file, outputDir);
      console.log(`Extracted ${images.length} images to ${outputDir}`);
  } catch (err) {
      console.error("Image extraction failed:", err);
  }
}
extract();
