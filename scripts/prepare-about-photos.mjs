import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import sharp from "sharp";

/**
 * About のベントに置く活動写真の切り出し（§6.11.5 / DECISION U-56）
 *
 * ベントの写真セルは **Mobile で 16:9**、tablet からは隣のセルが高さを決める（§6.11.5）。
 * 届いた集合写真はどちらも 4:3 で、上 1/5 が天井・下に床という構図だった — そのまま
 * 置くと、どの段でも「人が集まっている」より先に天井が目に入る。表示側で焦点
 * （`object-position`）を動かしても直らない: wide / desktop のセルは 4:3 より**縦長**なので
 * cover は高さを合わせて左右を切り、縦は全部出てしまう。
 *
 * なので素材の側で 16:9 に切る。Partner ロゴ（`normalize-partner-logos.mjs`）と同じ考え方で、
 * 「表示側は素材に手を加えない（U-21）／ばらつきは取り込み時に揃える」。
 * 元素材は `assets/about/` に原寸で残すので、切り位置を変えたければ `top` を直して
 * `pnpm generate:about-photos`。
 */
const srcDir = resolve(process.cwd(), "assets/about");
const outDir = resolve(process.cwd(), "public/images/about");

/** 16:9。Mobile のセルがこの比なので、そこでは 1 ドットも切られない */
const ratio = 16 / 9;

/**
 * `top`: 切り取りの上端（px、原寸基準）。人の頭の少し上に取る — 天井を帯として
 * 残すと奥行きが出るが、1/5 を占めると主役が入れ替わる。
 */
const photos = [
  { source: "geek-project.jpg", top: 300 },
  { source: "nagasaki-hackathon.jpg", top: 300 },
];

await mkdir(outDir, { recursive: true });

for (const { source, top } of photos) {
  const input = resolve(srcDir, source);
  const { width, height } = await sharp(input).metadata();
  const cropHeight = Math.round(width / ratio);
  // 下が足りなければ上端を引き上げる（原寸より大きくは切れない）
  const y = Math.min(top, Math.max(0, height - cropHeight));

  await sharp(input)
    .extract({ left: 0, top: y, width, height: cropHeight })
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(resolve(outDir, source));

  console.log(
    `${source}  ${width}×${height} → ${width}×${cropHeight}（top ${y}）`,
  );
}
