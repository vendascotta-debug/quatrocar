const sharp = require("sharp");
const path = require("path");

const src = path.join(__dirname, "..", "public", "images", "logo-mark.webp");
const outDir = path.join(__dirname, "..", "public", "icons");

const sizes = [192, 512];

Promise.all(
  sizes.map((size) =>
    sharp(src).resize(size, size).png().toFile(path.join(outDir, `icon-${size}.png`))
  )
)
  .then(() => sharp(src).resize(180, 180).png().toFile(path.join(outDir, "apple-touch-icon.png")))
  .then(() =>
    // Maskable icon: logo shrunk to fit inside the safe zone (center ~65%)
    // so Android's adaptive-icon mask never crops the mark.
    sharp(src)
      .resize(330, 330)
      .extend({
        top: 91,
        bottom: 91,
        left: 91,
        right: 91,
        background: { r: 6, g: 10, b: 22, alpha: 1 },
      })
      .png()
      .toFile(path.join(outDir, "icon-512-maskable.png"))
  )
  .then(() => console.log("Icons generated"))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
