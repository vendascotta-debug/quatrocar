const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const svg = `
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" rx="96" fill="#0a0a0a"/>
  <text x="256" y="320" font-family="Arial, Helvetica, sans-serif" font-size="260" font-weight="900" fill="#fbbf24" text-anchor="middle">Q</text>
</svg>
`;

const outDir = path.join(__dirname, "..", "public", "icons");
fs.mkdirSync(outDir, { recursive: true });

const sizes = [192, 512];

Promise.all(
  sizes.map((size) =>
    sharp(Buffer.from(svg))
      .resize(size, size)
      .png()
      .toFile(path.join(outDir, `icon-${size}.png`))
  )
)
  .then(() =>
    sharp(Buffer.from(svg)).resize(180, 180).png().toFile(path.join(outDir, "apple-touch-icon.png"))
  )
  .then(() => console.log("Icons generated"))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
