import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import sharp from "sharp";

/**
 * パートナーロゴの正規化（§6.16 / DECISION U-33・L-32）
 *
 * 各団体から届く素材は形式も縦横比も背景もばらばら（白背景の jpg、透過 png、4:1 を
 * 超えるワードマーク…）。そのまま contain で置くと、白背景の素材は ground の上で板として
 * 浮き、ワードマークは細い帯になって並びの重さが揃わない。表示側は素材に手を加えない
 * 約束（U-21: filter も tint も掛けない）なので、揃えるのはここ —
 * **3:2 の白キャンバス**（600 × 400、Desktop タイル 198 × 132 の約 3 倍）に載せ直す。
 *
 * 手順: 余白をトリム → セーフエリア（キャンバスから inset を引いた矩形）に contain →
 * 団体ごとの `scale` で見た目の重さを揃える → 白地の中央に合成 → PNG。
 * 白はタイルとマーキー帯の面 `color/logo-ground`（neutral-0）と同じ色で、セルは inset 0 で
 * 画像を縁まで敷くので、キャンバスの縁は見えない。
 *
 * 元素材は assets/partners/ に置く（public には出さない）。素材を差し替えたり倍率を
 * 変えたら `pnpm generate:partner-logos`。出力は public/images/partners/<slug>.png で、
 * content/partners.ts の `logo` がそれを指す。
 */
const srcDir = resolve(process.cwd(), "assets/partners");
const outDir = resolve(process.cwd(), "public/images/partners");

const canvas = { width: 600, height: 400 };
/** セーフエリアの inset。タイルの `inset/cell` 24（幅 198 の 12%）に相当する余白をキャンバス側に焼き込む */
const inset = { x: 72, y: 48 };
const safe = {
  width: canvas.width - inset.x * 2,
  height: canvas.height - inset.y * 2,
};
const white = { r: 255, g: 255, b: 255 };

/**
 * 団体ごとの調整（content/partners.ts と同じ並び）。
 * - `scale`: セーフエリアに contain した後に掛ける倍率（≤ 1）。筆文字や太いマークは
 *   面積で勝つので少し引き、細いワードマークは 1 のまま
 * - `trim`: 余白検出の閾値。jpg は圧縮ノイズを余白とみなせるよう高め、透過 png は低め
 * - `whitePoint`: この値以上の画素を純白に飛ばす（不透明素材のみ）。jpg の白背景は 250〜254 の
 *   ノイズを含み、そのままだと白タイルの上で素材の矩形がうっすら見える
 */
const logos = [
  {
    source: "geek-project.jpg",
    slug: "geek-project",
    scale: 0.9,
    trim: 30,
    whitePoint: 246,
  },
  {
    source: "karabiner-inc.png",
    slug: "karabiner-inc",
    scale: 0.88,
    trim: 30,
    whitePoint: 246,
  },
  { source: "n-barco.png", slug: "n-barco", scale: 1, trim: 10 },
  { source: "nfec.jpg", slug: "nfec", scale: 1, trim: 30, whitePoint: 246 },
  { source: "progate-path.png", slug: "progate-path", scale: 1, trim: 10 },
];

await mkdir(outDir, { recursive: true });

for (const { source, slug, scale, trim, whitePoint } of logos) {
  let cleaned = sharp(resolve(srcDir, source)).trim({ threshold: trim });
  // 白飛ばし: a × 入力 + 0 を 255 で飽和させる。マークの色も約 (a − 1) 明るくなるが知覚できない
  if (whitePoint) cleaned = cleaned.linear(255 / whitePoint, 0);
  const trimmed = await cleaned.toBuffer();
  const { width: w, height: h } = await sharp(trimmed).metadata();
  const factor = Math.min(safe.width / w, safe.height / h) * scale;
  const width = Math.round(w * factor);
  const height = Math.round(h * factor);

  const mark = await sharp(trimmed)
    .resize(width, height, { fit: "fill", kernel: "lanczos3" })
    .toBuffer();

  // 合成すると透過 png の alpha が出力にも残るので、いったんバッファに落として RGB に戻す
  const composed = await sharp({
    create: { ...canvas, channels: 3, background: white },
  })
    .composite([{ input: mark, gravity: "centre" }])
    .png()
    .toBuffer();

  const out = resolve(outDir, `${slug}.png`);
  await sharp(composed).removeAlpha().png({ compressionLevel: 9 }).toFile(out);

  console.log(
    `${slug}.png  ${source} ${w}×${h} → mark ${width}×${height} on ${canvas.width}×${canvas.height}`,
  );
}
