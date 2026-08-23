import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { Resvg } from "@resvg/resvg-js";
import pngToIco from "png-to-ico";

const projectRoot = process.cwd();
const publicDir = resolve(projectRoot, "public");
const appDir = resolve(projectRoot, "src/app");
const sourceSvgPath = resolve(publicDir, "favicon.svg");

const sourceSvg = await readFile(sourceSvgPath, "utf8");

const faviconSizes = [16, 32, 48, 64, 128, 256];

const renderPng = async (size, outputName) => {
  const rendered = new Resvg(sourceSvg, {
    fitTo: {
      mode: "width",
      value: size,
    },
  }).render();

  await writeFile(resolve(publicDir, outputName), rendered.asPng());
};

await Promise.all([
  ...faviconSizes.map((size) => renderPng(size, `favicon-${size}x${size}.png`)),
  renderPng(180, "apple-touch-icon.png"),
  renderPng(192, "icon-192.png"),
  renderPng(512, "icon-512.png"),
  renderPng(512, "icon-512-maskable.png"),
]);

const faviconIco = await pngToIco(
  faviconSizes.map((size) => resolve(publicDir, `favicon-${size}x${size}.png`)),
);

await Promise.all([
  writeFile(resolve(publicDir, "favicon.ico"), faviconIco),
  writeFile(resolve(appDir, "favicon.ico"), faviconIco),
]);
