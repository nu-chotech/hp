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
 * About（§6.11 / DECISION U-40 → U-56）
 *
 * 9 セル。DOM 順は **Mobile の読み順**で固定し、
 * 「文化 → 規模 → 設立 → 会話 → 写真 → 対象 → 場 → 写真 → 公認」がどの段でも変わらない。
 *
 *   wide ≥ 1248（4 列・明示配置）        desktop 1024–1247（3 列）
 *   [ CULTURE 2×2 ][CHAT][ 写真  ]       [ CULTURE 2×2      ][ MEMBERS ]
 *   [             ][1×3 ][ MEM   ]       [                  ][ SINCE   ]
 *   [ EVERYONE 2×1][    ][ SIN   ]       [ CHAT ][ 写真      ][ EVERYONE]
 *   [ FMT ][ 写真 ][ OFFICIAL 2×1 ]       [ 1×2  ][ FMT      ][ 写真     ]
 *                                        [ OFFICIAL 3×1                ]
 *
 *   tablet 768–1023（2 列）              Mobile < 768（1 列）
 *   [ CULTURE 2×1       ]                CULTURE → [MEM · SIN] → CHAT → 写真
 *   [ MEMBERS ][ SINCE  ]                 → EVERYONE → FORMAT → 写真 → OFFICIAL
 *   [ CHAT    ][ 写真    ]                （MEMBERS · SINCE は CellPair の 1 行 2 列、L-35）
 *   [ 1×2     ][EVERYONE]
 *   [ FORMAT  ][ 写真    ]
 *   [ OFFICIAL 2×1      ]
 *
 * wide だけ `col-start` / `row-start` で明示的に置く（**DECISION L-37**）。CULTURE の 2×2 と
 * CHAT の 1×3 が同じ行を跨いで噛み合う構図は、疎な auto-placement では作れない — CHAT が
 * 欲しい 3 列目の行 1 を、DOM で先に来る MEMBERS が取ってしまう。1 / 2 / 3 列は今までどおり
 * span だけで、段ごとに「span か、明示配置か」を排他にしてある（ruled-grid.tsx の colSpan）。
 *
 * 中間の 2 段は**空トラックを作らない**ことを規準に決めた（L-36 と同じ）。9 セルの占有数が
 * 列数の倍数になる組み合わせは限られていて、tablet 12 マス = 6 行 / desktop 15 マス = 5 行が
 * それぞれ唯一の解に近い（OFFICIAL が desktop で 3×1 になるのはそのため）。
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
  photoTalk: "wide:col-start-4 wide:row-start-1",
  members: "wide:col-start-4 wide:row-start-2",
  since: "wide:col-start-4 wide:row-start-3",
  chat: "wide:col-start-3 wide:row-start-1 wide:row-end-4",
  everyone: "wide:col-start-1 wide:col-end-3 wide:row-start-3",
  format: "wide:col-start-1 wide:row-start-4",
  photoDev: "wide:col-start-2 wide:row-start-4",
  official: "wide:col-start-3 wide:col-end-5 wide:row-start-4",
} as const;

/** 写真セルの実幅。Mobile 1 列 / tablet 2 列 / desktop 3 列 / wide は 1×1 の 297.5 */
const PHOTO_SIZES =
  "(min-width: 78rem) 298px, (min-width: 64rem) 33vw, (min-width: 48rem) 50vw, 100vw";

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
  const [talkDay, devDay] = photos;

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
          alt={talkDay.alt}
          className={WIDE.photoTalk}
          sizes={PHOTO_SIZES}
          src={talkDay.src}
        />

        <CellFacts
          className={WIDE.everyone}
          figures={forEveryone.figures}
          kicker={forEveryone.kicker}
          title={forEveryone.title}
        />

        <CellFacts
          className={WIDE.format}
          figures={format.figures}
          kicker={format.kicker}
        />

        <CellPhoto
          alt={devDay.alt}
          className={WIDE.photoDev}
          sizes={PHOTO_SIZES}
          src={devDay.src}
        />

        <CellOfficial
          className={WIDE.official}
          colSpan="2-tablet-3-desktop"
          kicker={official.kicker}
          rows={official.rows}
        />
      </RuledGrid>
    </Section>
  );
}
