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
 * 配色は明るく（肌は桃色寄り、服はパステル）、小物は「可愛い」側から選ぶ —
 * 暗い色と実用的な小物（ゴーグル・アンテナ）は野暮ったく見えた（2026-09-05 レビュー）。
 */
const personas = [
  {
    // これから始めたい人 — ふわっとしたボブにアヒル
    file: "case-01",
    selections: {
      head: "fluffy-bob",
      body: "tee",
      bottom: "flared-skirt",
      item: "duck",
      glasses: "none",
    },
    colors: {
      skin: "FBE3D3",
      hair: "6B4A3A",
      clothes: "FFD6A5",
      bottom: "F4A7B9",
    },
  },
  {
    // 開発が好きなエンジニア — 短髪にパーカー、肩に黒猫
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
    // UI/UX が好きな人 — ロブに花
    file: "case-03",
    selections: {
      head: "lob",
      body: "drape-tee",
      bottom: "midi-skirt",
      item: "flower",
      glasses: "none",
    },
    colors: {
      skin: "FBE3D3",
      hair: "3B2A26",
      clothes: "E8D5F2",
      bottom: "9F86C0",
    },
  },
  {
    // ハッカソンに出たい人 — くるくる短髪に王冠
    file: "case-04",
    selections: {
      head: "curly-short",
      body: "tee",
      bottom: "tapered-pants",
      item: "crown",
      glasses: "none",
    },
    colors: {
      skin: "F1C9AE",
      hair: "5B3A29",
      clothes: "FFF1A8",
      bottom: "4F6D8F",
    },
  },
  {
    // 研究の話をしたい人 — お団子に丸眼鏡
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
    // 発信してみたい人 — 横に流した短髪にカメラ
    file: "case-06",
    selections: {
      head: "side-swept-short",
      body: "polo",
      bottom: "cropped-pants",
      item: "camera",
      glasses: "tiny",
    },
    colors: {
      skin: "F6D3BC",
      hair: "1D1D1D",
      clothes: "F7C6C7",
      bottom: "8C6F5E",
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
