/**
 * 対話状態の共通レシピ（§4.5 / §6.1 の G1・G6）
 *
 * hover / pressed の「速さ」と「ティント」は面のルールであって部品ごとの裁量ではない。
 * それでも Button・Nav の 2 か所・Marquee の停止セルが同じクラス列を書き写していて、
 * Marquee のコメントは「同じ状態のレシピだけを引き写して」と、写しであることを
 * 自認していた。書き写しは片方だけ直せる — 同じ帯の中で速さが食い違いうる。
 *
 * cva ではなく素の文字列で持つのは、各部品が自分の cva の base や compoundVariants に
 * 展開して使うため。バリアント軸を増やす部品ではなく、どの部品にも同じように
 * 掛かる「地の規則」なので、軸を持たない形が実態に合う。
 */

/** G6 の時間（入り 100ms / 抜け 200ms / 押下 0）。easing は色専用の ease-color */
const timing =
  "ease-color duration-(--dur-2) hover:duration-(--dur-1) active:duration-(--dur-0)";

/**
 * 同じ時間を、状態を親の :hover から受ける部品（Brand ロックアップ）向けに。
 * duration の上書きは擬似クラスに紐づくので、group- 側は別に持つしかない。
 */
const groupTiming =
  "ease-color duration-(--dur-2) group-hover:duration-(--dur-1) group-active:duration-(--dur-0)";

/**
 * 文字色と下線だけを動かすリンクの遷移プロパティ（§6.1.6）。
 * outline は含めない（G4）。背景も動かさない — リンクは面を持たない。
 */
const linkProperties =
  "transition-[color,text-decoration-color,text-decoration-thickness]";

/** 背景と文字色をまとめて動かすコントロール（Button・Nav・Marquee） */
export const colorTransition = `transition-colors ${timing}`;

/** リンク（TextLink） */
export const linkTransition = `${linkProperties} ${timing}`;

/** 親のホバーを受けるリンク（Brand の wordmark） */
export const groupLinkTransition = `${linkProperties} ${groupTiming}`;

/**
 * 面を持たない部品の hover / pressed。地の上に薄く敷くティントで、
 * 塗りを持つ Solid ボタンはこれではなく専用の fill ロールを使う。
 */
export const stateTint =
  "hover:bg-state-hover-tint active:bg-state-pressed-tint";

/** 同じティントのインク面版。ground 版と対で持ち、片方だけ動かない状態を作らない */
export const inverseStateTint =
  "hover:bg-inverse-state-hover-tint active:bg-inverse-state-pressed-tint";

/**
 * 「セル全体が当たり判定のコントロール」の地（§6.9.3・§6.7.3）
 *
 * Button 部品はラベルを持つ横長のコントロールで左右 inset を必ず持つので、
 * Menu row（全幅の行）やマーキーの停止セル（44 × 52 のアイコンのみ）には使えない。
 * それらが素の要素で組まれるとき、状態の見え方だけはボタンと同じでなければならない。
 *
 * G1: 応答は pointer-down で返すので、OS のタップハイライトは消す。
 */
export const tintedControl = [
  "cursor-pointer [-webkit-tap-highlight-color:transparent]",
  stateTint,
  colorTransition,
].join(" ");

/**
 * フォーカスリングを内側に入れる（K-7）
 *
 * 全幅の行や帯の中のセルは上下を 2px 罫・hairline に接しているので、既定の外向き
 * オフセットだとリングが罫と交差して、どちらの線なのか読めなくなる。
 * リングの**色**は指定しない — globals.css が祖先の data-surface から出し分ける。
 */
export const insetFocusRing =
  "focus-visible:outline-offset-(length:--focus-offset-inset)";
