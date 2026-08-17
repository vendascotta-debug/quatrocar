const sharp = require("sharp");
const path = require("path");

const src = path.join(__dirname, "..", "public", "images", "logo-mark.webp");
const outDir = path.join(__dirname, "..", "public", "icons");
const BG = { r: 6, g: 10, b: 22, alpha: 1 };

async function squareIcon(size, padRatio, outFile) {
  const inner = Math.round(size * (1 - padRatio * 2));
  const resized = await sharp(src)
    .resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  await sharp({
    create: { width: size, height: size, channels: 4, background: BG },
  })
    .composite([{ input: resized, gravity: "center" }])
    .png()
    .toFile(path.join(outDir, outFile));
}

Promise.all([
  squareIcon(192, 0.12, "icon-192.png"),
  squareIcon(512, 0.12, "icon-512.png"),
  squareIcon(180, 0.12, "apple-touch-icon.png"),
  squareIcon(512, 0.22, "icon-512-maskable.png"),
])
  .then(() => console.log("Icons generated"))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
