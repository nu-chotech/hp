import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { Resvg } from "@resvg/resvg-js";
import pngToIco from "png-to-ico";

const projectRoot = process.cwd();
/** favicon / PWA アイコン一式の置き場。元になる favicon.svg も同じ場所に置く */
const iconsDir = resolve(projectRoot, "public/icons");
const appDir = resolve(projectRoot, "src/app");
const sourceSvgPath = resolve(iconsDir, "favicon.svg");

const sourceSvg = await readFile(sourceSvgPath, "utf8");
await mkdir(iconsDir, { recursive: true });

const faviconSizes = [16, 32, 48, 64, 128, 256];

const renderPng = async (size, outputName) => {
  const rendered = new Resvg(sourceSvg, {
    fitTo: {
      mode: "width",
      value: size,
    },
  }).render();

  await writeFile(resolve(iconsDir, outputName), rendered.asPng());
};

await Promise.all([
  ...faviconSizes.map((size) => renderPng(size, `favicon-${size}x${size}.png`)),
  renderPng(180, "apple-touch-icon.png"),
  renderPng(192, "icon-192.png"),
  renderPng(512, "icon-512.png"),
  renderPng(512, "icon-512-maskable.png"),
]);

/**
 * favicon.ico だけは src/app/ に置く。Next の metadata file convention が /favicon.ico で
 * 配信するので、public 側に同じものを重ねて持たない。
 */
const faviconIco = await pngToIco(
  faviconSizes.map((size) => resolve(iconsDir, `favicon-${size}x${size}.png`)),
);

await writeFile(resolve(appDir, "favicon.ico"), faviconIco);
