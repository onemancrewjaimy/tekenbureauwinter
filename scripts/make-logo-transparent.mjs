import sharp from 'sharp';

const SRC = 'public/images/logo.png';

async function main() {
  const img = sharp(SRC);
  const { width, height } = await img.metadata();
  const { data } = await img.raw().toBuffer({ resolveWithObject: true });

  const out = Buffer.alloc(width * height * 4);
  for (let i = 0, j = 0; i < data.length; i += 3, j += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const brightness = (r + g + b) / 3;
    const alpha = 255 - brightness; // wit -> volledig transparant, donker -> opaak
    out[j] = r;
    out[j + 1] = g;
    out[j + 2] = b;
    out[j + 3] = Math.round(alpha);
  }

  await sharp(out, { raw: { width, height, channels: 4 } }).png().toFile(SRC);
  console.log('done, logo is now transparent:', SRC);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
