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

/* ---------------------------------------------------------------------------
 * OFFICIAL のロゴ板（§6.11.4 / DECISION U-56）
 *
 * Partners のタイル（上の 3:2）とは板の形が違う: 板は 263 × 72（Desktop）の**横長**で、
 * マークは高さ 52（`size/logo-mark`）で揃える。3:2 のキャンバスに載せると、横長のマークは
 * 高さ方向が余って板の中で豆粒になるので、ここでは **3:1 のキャンバスに縁まで**収める
 * （余白は板が 72 − 52 = 20 持っている）。2 枚のマークが同じ高さで並ぶことが、
 * 「同格の裏づけが 2 つ」という構図を支える。
 *
 * 技育プロジェクトのマークは 977 × 1024 のほぼ正方形で、横長の板の中では小さく見える。
 * 運営元の「サポーターズ」のワードマークを**左に組む**ことで、ロックアップ全体が横長になり
 * 板の形と噛み合う（クライアント判断 2026-10-10:「技育プロジェクト（サポーターズ）みたいな
 * 感じだから、技育プロジェクトロゴの左にあるとちょうど横長になる」）。
 * ------------------------------------------------------------------------- */
const officialSrcDir = resolve(process.cwd(), "assets/official");
const officialOutDir = resolve(process.cwd(), "public/images/official");
/**
 * 16:5（3.2:1）。**最も横に長いマークが高さいっぱいで収まる**比に取る — 2 枚が同じ高さで
 * 並ぶことがこの図の要なので、キャンバスの側を広げて縮小を避ける（長崎大学 3.12:1、
 * 技育のロックアップ 3.15:1）。
 */
const officialCanvas = { width: 960, height: 300 };

/**
 * ロックアップ（複数のマークを横に組む）か、単体か。
 * - `height`: キャンバス高に対するそのマークの高さ（1 = 縁まで）
 * - `gap`: 直前のマークとの間隔（キャンバス高に対する比）
 */
const officialLogos = [
  {
    slug: "nagasaki-university",
    marks: [
      {
        dir: officialSrcDir,
        source: "nagasaki-university.png",
        trim: 10,
        height: 1,
      },
    ],
  },
  {
    slug: "geek-project",
    marks: [
      // 運営元。細いワードマーク（6:1）なので、筆文字のマークに対して 32% の高さで釣り合う。
      // 56 の中で約 18px になり、6 文字のカタカナがはっきり読める
      {
        dir: officialSrcDir,
        source: "supporters.png",
        trim: 10,
        height: 0.32,
      },
      {
        dir: srcDir,
        source: "geek-project.jpg",
        trim: 30,
        whitePoint: 246,
        height: 1,
        // 2 つで 1 つのロックアップに見える距離。詰めると字とマークがぶつかり、
        // 離すと「別々の 2 社」に読める
        gap: 0.24,
      },
    ],
  },
];

await mkdir(officialOutDir, { recursive: true });

for (const { slug, marks } of officialLogos) {
  const laid = [];
  for (const mark of marks) {
    let cleaned = sharp(resolve(mark.dir, mark.source)).trim({
      threshold: mark.trim,
    });
    if (mark.whitePoint) cleaned = cleaned.linear(255 / mark.whitePoint, 0);
    // 透過素材は白に焼き付ける（板は logo-ground の白。U-33 と同じ理由）
    const buf = await cleaned.flatten({ background: white }).toBuffer();
    const { width: w, height: h } = await sharp(buf).metadata();
    const height = Math.round(officialCanvas.height * mark.height);
    const width = Math.round((w / h) * height);
    laid.push({
      buf,
      width,
      height,
      gap: (mark.gap ?? 0) * officialCanvas.height,
    });
  }

  // 横に並べた素の幅。キャンバスに入らなければ全体を縮める
  const raw = laid.reduce((sum, m) => sum + m.gap + m.width, 0);
  const fit = Math.min(1, officialCanvas.width / raw);
  const total = Math.round(raw * fit);

  let x = Math.round((officialCanvas.width - total) / 2);
  const composite = [];
  for (const m of laid) {
    const width = Math.max(1, Math.round(m.width * fit));
    const height = Math.max(1, Math.round(m.height * fit));
    x += Math.round(m.gap * fit);
    composite.push({
      input: await sharp(m.buf)
        .resize(width, height, { fit: "fill", kernel: "lanczos3" })
        .toBuffer(),
      left: x,
      // 縦は中央揃え。ワードマークは筆文字のマークの重心に合わせる
      top: Math.round((officialCanvas.height - height) / 2),
    });
    x += width;
  }

  const composed = await sharp({
    create: { ...officialCanvas, channels: 3, background: white },
  })
    .composite(composite)
    .png()
    .toBuffer();

  const out = resolve(officialOutDir, `${slug}.png`);
  await sharp(composed).removeAlpha().png({ compressionLevel: 9 }).toFile(out);

  console.log(
    `official/${slug}.png  ${marks.map((m) => m.source).join(" + ")} → ${total}×${officialCanvas.height} on ${officialCanvas.width}×${officialCanvas.height}`,
  );
}
