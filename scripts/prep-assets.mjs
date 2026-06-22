import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const SRC = 'C:\\Users\\jvand\\OneDrive\\Bijlagen\\Bureaublad\\Images_yannick';
const OUT = 'c:\\Users\\jvand\\OneDrive\\Bijlagen\\Bureaublad\\tekenbureauwinter\\public\\images';
mkdirSync(OUT, { recursive: true });

const photos = [
  ['DSC02454.png', 'sfeerbeeld-werkplek.jpg'],
  ['DSC02459.jpg', 'sfeerbeeld-lijntekening-scherm.jpg'],
  ['DSC02465.jpg', 'project-opbouw.jpg'],
  ['DSC02472.jpg', 'project-aanbouw.jpg'],
  ['DSC02477.jpg', 'portret-tekenbureau-winter.jpg'],
  ['DSC02480.jpg', 'project-dakkapel.jpg'],
  ['DSC02482.jpg', 'project-overkapping.jpg'],
  ['DSC02483.jpg', 'project-vergunningsaanvraag.jpg'],
  ['DSC02484.jpg', 'project-detaillering.jpg'],
];

async function main() {
  for (const [src, dest] of photos) {
    await sharp(`${SRC}\\${src}`)
      .rotate()
      .resize({ width: 1600, withoutEnlargement: true })
      .jpeg({ quality: 78, mozjpeg: true })
      .toFile(`${OUT}\\${dest}`);
    console.log('ok', dest);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
