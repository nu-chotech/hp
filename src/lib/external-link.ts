/**
 * 外部リンクの共通属性（§6.3.2 / §8.5、DECISION M-21）
 *
 * サイトの外へ出るリンクは**すべて新しいタブ**で開く。当初は「新しいタブは読者が選ぶ」
 * （M-15、Agency）で `target="_blank"` を禁じていたが、2026-09-10 に撤回 —
 * 1 ページのサイトで外へ出ると戻り先が失われるので、読者の主体性より
 * 「このページを閉じない」ことを優先する。
 *
 * `rel="noopener noreferrer"`: 新しいタブに window.opener を渡さない（tabnabbing 対策）。
 * 読み上げには「新しいタブで開く」を必ず添える（WCAG G201）— 文脈が変わることを
 * 押す前に知らせる。visually-hidden の文言は 1 か所で持ち、部品ごとに言い換えない。
 *
 * ページ内アンカー（#about など）には付けない。外部かどうかは呼び出し側が知っている
 * （content の `external` や href の由来）ので、ここで URL を判定しない。
 */
export const externalLinkProps = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;

/** 外部リンクに添える読み上げ用の注記。可視ラベルの直後、矢印の前に置く */
export const externalLinkNote = "（外部、新しいタブで開く）";
