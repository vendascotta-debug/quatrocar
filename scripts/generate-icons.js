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
  .then(() => console.log("Icons generated"))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
