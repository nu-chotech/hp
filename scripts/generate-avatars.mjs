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

/** Case 01 … 06 の順。人物像に合わせて部位を選ぶ（content/personas.ts と対応） */
const personas = [
  {
    // これから始めたい人 — 芽（sprout）を持つ
    file: "case-01",
    selections: {
      head: "short-bangs",
      body: "tee",
      bottom: "tapered-pants",
      item: "sprout",
      glasses: "none",
    },
    colors: {
      skin: "F4C9A8",
      hair: "2B2B2B",
      clothes: "7A8C6E",
      bottom: "3F4A5A",
    },
  },
  {
    // 開発が好きなエンジニア — パーカーと眼鏡
    file: "case-02",
    selections: {
      head: "messy-short",
      body: "hoodie",
      bottom: "wide-pants",
      item: "black-cat",
      glasses: "round",
    },
    colors: {
      skin: "E8B48E",
      hair: "1D1D1D",
      clothes: "3B6EA5",
      bottom: "2A2A2A",
    },
  },
  {
    // UI/UX が好きな人 — ボブと花
    file: "case-03",
    selections: {
      head: "blunt-bob",
      body: "shirt",
      bottom: "midi-skirt",
      item: "flower",
      glasses: "tiny",
    },
    colors: {
      skin: "F7D7BF",
      hair: "6B4423",
      clothes: "EDE6D6",
      bottom: "B85C5C",
    },
  },
  {
    // ハッカソンに出たい人 — ジャケットとゴーグル
    file: "case-04",
    selections: {
      head: "ponytail",
      body: "jacket",
      bottom: "cropped-pants",
      item: "goggles",
      glasses: "none",
    },
    colors: {
      skin: "D9A27C",
      hair: "4A3728",
      clothes: "5C6B8C",
      bottom: "2A2A2A",
    },
  },
  {
    // 研究の話をしたい人 — お団子と丸眼鏡
    file: "case-05",
    selections: {
      head: "bun",
      body: "polo",
      bottom: "culottes",
      item: "none",
      glasses: "round",
    },
    colors: {
      skin: "F1C6A5",
      hair: "3A3A3A",
      clothes: "D9A441",
      bottom: "6A5B4C",
    },
  },
  {
    // 発信してみたい人 — アンテナ（antennae）
    file: "case-06",
    selections: {
      head: "wavy-medium",
      body: "drape-tee",
      bottom: "long-skirt",
      item: "antennae",
      glasses: "none",
    },
    colors: {
      skin: "C68B62",
      hair: "8C5A3C",
      clothes: "B85C5C",
      bottom: "3F4A5A",
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
