import { CellChat } from "@/components/bento/cell-chat";
import { CellOfficial } from "@/components/bento/cell-official";
import { CellStat } from "@/components/bento/cell-stat";
import { CellText } from "@/components/bento/cell-text";
import { CellPair, RuledGrid } from "@/components/ui/ruled-grid";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { sectionIds } from "@/config/site";
import { aboutContent } from "@/content/about";

/**
 * About（§6.11 / DECISION U-40）
 *
 * 7 セルを、幅の段ごとに 1 / 2 / 3 / 4 列の構図に組む（DECISION L-34）。DOM 順は固定で、
 * 「文化 → 規模 → 設立 → 会話 → 公認 → 場 → 対象」の読み順はどの段でも変わらない
 * （疎な auto-placement で、span だけが構図を決める）。
 *
 *   wide ≥ 1248（4 列）        desktop 1024–1247（3 列）     tablet 768–1023（2 列）   Mobile（1 列）
 *   [ CULTURE 2×1 ][ MEM ][ SIN ]  [ CULTURE 2×1     ][ MEM ]  [ CULTURE 2×1        ]  [ CULTURE ]
 *   [ CHAT 2×2     ][ OFFICIAL  ]  [ SIN ][ CHAT 2×2       ]  [ MEMBERS ][ SINCE   ]  [ MEM ][ SIN ]  ← L-35 のペア
 *   [              ][ ONL ][ EVE ]  [ OFF ][                ]  [ CHAT    ][ OFFICIAL]  [ CHAT ]
 *                                  [ ONL ][ EVERYONE 2×1   ]  [ ONLINE  ][ EVERY   ]  [ OFFICIAL ] …
 *
 * 4 列では行 2–3 の高さをチャット（465）が決め、右側の 3 セルが追従して伸びる。3 列では
 * SINCE + OFFICIAL の列（583）がチャットを伸ばす。各セルは「キッカー（天）／題 + 図（地）」の
 * 2 段で、行が伸びても表情が変わらない。図は Bento / Figure（緑の円、§6.11.2）。
 *
 * reveal はグリッドを **1 つの親** として出す（DECISION M-2）。2px 罫線で結ばれた
 * 格子は 1 つの面であって、セルが順に現れると格子が壊れて見える。
 * インデックスは見出し 0 / グリッド 1（§7.4.1 の About 0/1）。
 */

export function About() {
  const {
    heading,
    culture,
    stat,
    founded,
    chat,
    official,
    onlineOffline,
    forEveryone,
  } = aboutContent;

  return (
    <Section aria-labelledby="about-title" id={sectionIds.about}>
      <SectionHeading
        data-reveal
        label={heading.label}
        title={heading.title}
        titleId="about-title"
      />

      <RuledGrid columns={4} data-reveal>
        {/* 行 1: 2×1 CULTURE · MEMBERS（墨、ページ唯一の数字）· SINCE（題 + 図） */}
        <CellText
          colSpan={2}
          figures={culture.figures}
          kicker={culture.kicker}
          size="2x1-statement"
          title={culture.title}
        />
        {/* Mobile では MEMBERS と SINCE を 1 行 2 列に（L-35）。tablet からは箱が消えて親の item になる */}
        <CellPair>
          <CellStat
            accessibleName={stat.accessibleName}
            kicker={stat.kicker}
            suffix={stat.suffix}
            value={stat.value}
          />
          <CellText
            accessibleTitle={founded.accessibleTitle}
            figures={founded.figures}
            kicker={founded.kicker}
            size="1x1-lg"
            title={founded.title}
          />
        </CellPair>

        {/* 行 2–3: Chat（desktop から 2×2）· OFFICIAL（wide で 2×1）/ ONLINE · FOR EVERYONE（3 列では 2×1） */}
        <CellChat kicker={chat.kicker} note={chat.note} thread={chat.thread} />
        <CellOfficial kicker={official.kicker} rows={official.rows} />
        <CellText
          figures={onlineOffline.figures}
          kicker={onlineOffline.kicker}
          size="1x1-md"
          title={onlineOffline.title}
        />
        <CellText
          colSpan="2-desktop-only"
          figures={forEveryone.figures}
          kicker={forEveryone.kicker}
          size="1x1-md"
          title={forEveryone.title}
        />
      </RuledGrid>
    </Section>
  );
}
