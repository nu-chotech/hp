import { CellChat } from "@/components/bento/cell-chat";
import { CellCycle } from "@/components/bento/cell-cycle";
import { CellFacts } from "@/components/bento/cell-facts";
import { CellOfficial } from "@/components/bento/cell-official";
import { CellPhoto } from "@/components/bento/cell-photo";
import { CellStat } from "@/components/bento/cell-stat";
import { CellPair, RuledGrid } from "@/components/ui/ruled-grid";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { sectionIds } from "@/config/site";
import { aboutContent } from "@/content/about";

/**
 * About（§6.11 / DECISION U-40 → U-56 → L-40）
 *
 * 9 セル。DOM 順は **Mobile の読み順**で固定し、
 * 「文化 → 規模 → 設立 → 会話 → 写真 → 対象 → 集合写真 → 場 → 公認」がどの段でも変わらない。
 *
 *   wide ≥ 1248（4 列・明示配置）        desktop 1024–1247（3 列）
 *   [ CULTURE 2×2 ][CHAT][ 写真  ]       [ CULTURE 2×2      ][ MEMBERS ]
 *   [             ][1×3 ][ MEM   ]       [                  ][ SINCE   ]
 *   [ EVERYONE 2×1][    ][ SIN   ]       [ CHAT ][ 写真      ][ EVERYONE]
 *   [ 集合写真 2×1 ][ FMT][ OFFI ]       [ 1×2  ][ 集合写真 2×1         ]
 *                                        [ FMT  ][ OFFICIAL 2×1         ]
 *
 *   tablet 768–1023（2 列）              Mobile < 768（1 列）
 *   [ CULTURE 2×1       ]                CULTURE → [MEM · SIN] → CHAT → 写真
 *   [ MEMBERS ][ SINCE  ]                 → EVERYONE → 集合写真 → FORMAT → OFFICIAL
 *   [ CHAT    ][ 写真    ]                （MEMBERS · SINCE は CellPair の 1 行 2 列、L-35）
 *   [ 1×2     ][EVERYONE]
 *   [ 集合写真 2×1      ]
 *   [ FORMAT 2×1        ]
 *   [ OFFICIAL 2×1      ]
 *
 * 集合写真は**どの段でも横 2 マス**（L-40）。8 人の横並びは 1×1 では両端から欠けるので、
 * FORMAT の前に DOM を移して span で横長に取る。そのぶん OFFICIAL は desktop で 3×1 → 2×1、
 * wide で 2×1 → 1×1（2 件を縦に積む）、FORMAT は tablet でだけ 2×1 になる。tablet で
 * OFFICIAL を 1×1 にしないのは、横に並べたマーク 2 枚（各 179）が内側 ≈ 310 に入らないため。
 *
 * wide だけ `col-start` / `row-start` で明示的に置く（**DECISION L-37**）。CULTURE の 2×2 と
 * CHAT の 1×3 が同じ行を跨いで噛み合う構図は、疎な auto-placement では作れない — CHAT が
 * 欲しい 3 列目の行 1 を、DOM で先に来る MEMBERS が取ってしまう。1 / 2 / 3 列は今までどおり
 * span だけで、段ごとに「span か、明示配置か」を排他にしてある（ruled-grid.tsx の colSpan）。
 *
 * 中間の 2 段は**空トラックを作らない**ことを規準に決めた（L-36 と同じ）。9 セルの占有数が
 * 列数の倍数になる組み合わせは限られていて、L-40 で集合写真が 2 マスになってからは
 * tablet 14 マス = 7 行 / desktop 15 マス = 5 行。どちらも DOM 順のまま疎な auto-placement で
 * 埋まることを検算してある（集合写真が FORMAT より先に来るので、desktop の行 4 に 2 マスが空く）。
 *
 * どの段でも高さを決めるのはチャットで、**幅ではなく行数**で受ける（1×2 / 1×3）。2 列に
 * 広げると吹き出しが左右の縁に貼り付いて真ん中に帯ができ、1×1 に畳むと隣の写真セルが
 * チャット 13 行の高さに引かれて極端な縦長に切り取られる。
 *
 * reveal はグリッドを **1 つの親** として出す（DECISION M-2）。2px 罫線で結ばれた
 * 格子は 1 つの面であって、セルが順に現れると格子が壊れて見える。
 * インデックスは見出し 0 / グリッド 1（§7.4.1 の About 0/1）。
 */

/**
 * wide（4 列）の明示配置（L-37）。`grid-row / grid-column` の開始と終了で書く —
 * `col-span-*` は一括指定なので、同じ段で混ぜると宣言順で勝ち負けが決まってしまう。
 */
const WIDE = {
  culture: "wide:col-start-1 wide:col-end-3 wide:row-start-1 wide:row-end-3",
  photoUpper: "wide:col-start-4 wide:row-start-1",
  members: "wide:col-start-4 wide:row-start-2",
  since: "wide:col-start-4 wide:row-start-3",
  chat: "wide:col-start-3 wide:row-start-1 wide:row-end-4",
  everyone: "wide:col-start-1 wide:col-end-3 wide:row-start-3",
  photoLower: "wide:col-start-1 wide:col-end-3 wide:row-start-4",
  format: "wide:col-start-3 wide:row-start-4",
  official: "wide:col-start-4 wide:row-start-4",
} as const;

/** 上の写真セルの実幅。Mobile 1 列 / tablet 2 列 / desktop 3 列 / wide は 1×1 の 297.5 */
const PHOTO_SIZES =
  "(min-width: 78rem) 298px, (min-width: 64rem) 33vw, (min-width: 48rem) 50vw, 100vw";

/** 集合写真の実幅（L-40）。どの段でも横 2 マス: wide 597 / desktop 2/3 / それ未満は行いっぱい */
const GROUP_PHOTO_SIZES =
  "(min-width: 78rem) 597px, (min-width: 64rem) 67vw, 100vw";

export function About() {
  const {
    heading,
    culture,
    stat,
    founded,
    chat,
    official,
    format,
    forEveryone,
    photos,
  } = aboutContent;
  // 上段（wide では CHAT の隣）と下段（OFFICIAL の隣）の 2 枚。順序は content が決める
  const [upperPhoto, lowerPhoto] = photos;

  return (
    <Section aria-labelledby="about-title" id={sectionIds.about}>
      <SectionHeading
        data-reveal
        label={heading.label}
        title={heading.title}
        titleId="about-title"
      />

      <RuledGrid columns={4} data-reveal>
        {/* 文化 — 節の主張を 1 枚の図で言い切る、ベント唯一の 2×2 */}
        <CellCycle
          accessibleTitle={culture.accessibleTitle}
          center={culture.center}
          className={WIDE.culture}
          colSpan="2-until-wide"
          rowSpan="2-until-wide"
          figures={culture.cycle}
          kicker={culture.kicker}
        />

        {/* Mobile では MEMBERS と SINCE を 1 行 2 列に（L-35）。tablet からは箱が消えて親の item になる */}
        <CellPair>
          <CellStat
            accessibleName={stat.accessibleName}
            className={WIDE.members}
            kicker={stat.kicker}
            size="l"
            suffix={stat.suffix}
            value={stat.value}
          />
          <CellStat
            accessibleName={founded.accessibleName}
            asHeading
            className={WIDE.since}
            kicker={founded.kicker}
            size="m"
            tone="ground"
            value={founded.value}
          />
        </CellPair>

        <CellChat
          className={WIDE.chat}
          kicker={chat.kicker}
          note={chat.note}
          thread={chat.thread}
        />

        <CellPhoto
          alt={upperPhoto.alt}
          className={WIDE.photoUpper}
          sizes={PHOTO_SIZES}
          src={upperPhoto.src}
        />

        <CellFacts
          className={WIDE.everyone}
          figures={forEveryone.figures}
          kicker={forEveryone.kicker}
          title={forEveryone.title}
        />

        {/* 集合写真 — 8 人が欠けないよう横 2 マス、tablet からは自分で 2:1（L-40） */}
        <CellPhoto
          alt={lowerPhoto.alt}
          className={WIDE.photoLower}
          colSpan="2-until-wide"
          sizes={GROUP_PHOTO_SIZES}
          src={lowerPhoto.src}
        />

        <CellFacts
          className={WIDE.format}
          colSpan="2-tablet-only"
          figures={format.figures}
          kicker={format.kicker}
        />

        <CellOfficial
          className={WIDE.official}
          colSpan="2-until-wide"
          kicker={official.kicker}
          rows={official.rows}
        />
      </RuledGrid>
    </Section>
  );
}
