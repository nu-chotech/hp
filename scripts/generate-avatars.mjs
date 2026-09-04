import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { humation1 } from "@humation/assets-humation-1";
import { createAvatar } from "@humation/core";

/**
 * ペルソナのアバター（§6.14 / DECISION U-26）
 *
 * Humation（hand-drawn kawaii avatar、MIT）で決定的に生成し、public/images/personas/ に
 * SVG として書き出す。実行時に描かないのは、ページが静的で「画像の実体は public/images/
 * にある」という取り決め（README「画像を差し替えたいとき」）に揃えるため。
 * チャットのアバター（§6.12.1）も同じファイルを 24 に縮めて使う。
 *
 * 部位と色を変えたらここを直して `pnpm generate:avatars`。
 * 部位名の一覧は `getPartsForSlot(humation1, "head" | "body" | "bottom" | "item" | "glasses")`。
 * 背景は透明にして、円の地（persona は image/placeholder、チャットは color/avatar）を
 * 置く側に任せる。
 */
const outDir = resolve(process.cwd(), "public/images/personas");

/** 線はページのインク（neutral-950）と同じ */
const stroke = "201e1d";

/**
 * Case 01 … 06 の順（content/personas.ts と対応）。女性像 3・男性像 3 で半々にする。
 * 基準は Case 02 / 05（2026-09-05 に「好み」とされた 2 体）: すっきりした髪型 +
 * 小物か眼鏡をひとつ + 落ち着いた 1 色。暗い色と実用的な小物（ゴーグル・アンテナ）は
 * 野暮ったく見えたので使わない。パステルに限らない。
 */
const personas = [
  {
    // これから始めたい人 — ポニーテールに芽、コーラルのドレープ T
    file: "case-01",
    selections: {
      head: "ponytail",
      body: "drape-tee",
      bottom: "culottes",
      item: "sprout",
      glasses: "none",
    },
    colors: {
      skin: "F8D9C4",
      hair: "5B3A29",
      clothes: "F2B8A2",
      bottom: "3F4A5A",
    },
  },
  {
    // 開発が好きなエンジニア — 短髪にパーカー、頭に黒猫
    file: "case-02",
    selections: {
      head: "short",
      body: "hoodie",
      bottom: "wide-pants",
      item: "black-cat",
      glasses: "none",
    },
    colors: {
      skin: "F6D3BC",
      hair: "2B2B2B",
      clothes: "AFCBEB",
      bottom: "5C7BA6",
    },
  },
  {
    // UI/UX が好きな人 — 切りそろえたボブに小さな眼鏡、ネイビーのシャツ
    file: "case-03",
    selections: {
      head: "blunt-bob",
      body: "shirt",
      bottom: "midi-skirt",
      item: "none",
      glasses: "tiny",
    },
    colors: {
      skin: "FBE3D3",
      hair: "1D1D1D",
      clothes: "1E3A5F",
      bottom: "C9C2B8",
    },
  },
  {
    // ハッカソンに出たい人 — 無造作な短髪に深緑のジャケット
    file: "case-04",
    selections: {
      head: "messy-short",
      body: "jacket",
      bottom: "tapered-pants",
      item: "none",
      glasses: "none",
    },
    colors: {
      skin: "F1C9AE",
      hair: "2B2B2B",
      clothes: "2E7D5B",
      bottom: "1F2937",
    },
  },
  {
    // 研究の話をしたい人 — 横お団子に丸眼鏡、ミントのシャツ
    file: "case-05",
    selections: {
      head: "low-side-bun",
      body: "shirt",
      bottom: "long-skirt",
      item: "none",
      glasses: "round",
    },
    colors: {
      skin: "F8D9C4",
      hair: "4A3728",
      clothes: "CFE8D9",
      bottom: "6C9A8B",
    },
  },
  {
    // 発信してみたい人 — 前髪短髪にカメラ、青いシャツ
    file: "case-06",
    selections: {
      head: "short-bangs",
      body: "shirt",
      bottom: "wide-pants",
      item: "camera",
      glasses: "none",
    },
    colors: {
      skin: "F1C9AE",
      hair: "4A3728",
      clothes: "8FB3D9",
      bottom: "1F2937",
    },
  },
];

await mkdir(outDir, { recursive: true });

await Promise.all(
  personas.map(async ({ file, selections, colors }) => {
    const svg = createAvatar(humation1, {
      selections,
      colors: { stroke, ...colors },
      background: "transparent",
    }).toString();
    await writeFile(resolve(outDir, `${file}.svg`), svg);
  }),
);

console.log(`${personas.length} avatars → ${outDir}`);
