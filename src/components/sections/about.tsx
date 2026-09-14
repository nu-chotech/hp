import { CellChat } from "@/components/bento/cell-chat";
import { CellOfficial } from "@/components/bento/cell-official";
import { CellStat } from "@/components/bento/cell-stat";
import { CellText } from "@/components/bento/cell-text";
import { RuledGrid } from "@/components/ui/ruled-grid";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { sectionIds } from "@/config/site";
import { aboutContent } from "@/content/about";

/**
 * About（§6.11 / DECISION U-40）
 *
 * 7 セルを 3 行に組む。DOM 順がそのまま Mobile の 1 列になるので、
 * 「文化 → 規模 → 設立 → 会話 → 公認 → 場 → 対象」の読み順は
 * Desktop の格子でも Mobile の縦列でも変わらない（span は列方向にだけ効く）。
 *
 *   行 1   [ CULTURE 2×1          ][ MEMBERS ][ SINCE ]
 *   行 2   [ CHAT 2×2             ][ OFFICIAL 2×1     ]
 *   行 3   [                      ][ ONLINE  ][ EVERY ]
 *
 * 行 2–3 の高さは右側（OFFICIAL 2 列 + 行 3）が決め、チャットがそれに追従して伸びる（U-52。
 * U-40 ではチャットが決めていた）。各セルは「キッカー（天）／題 + 図（地）」の 2 段で、
 * 行が伸びても表情が変わらない。図は Bento / Figure（語 + 色の円、§6.11.2）。
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
          accessibleTitle={culture.accessibleTitle}
          colSpan={2}
          figures={culture.figures}
          kicker={culture.kicker}
          size="2x1-statement"
          title={culture.title}
        />
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

        {/* 行 2–3: Chat 2×2 · OFFICIAL 2×1（2 列）/ 1×1 · 1×1 */}
        <CellChat kicker={chat.kicker} note={chat.note} thread={chat.thread} />
        <CellOfficial kicker={official.kicker} rows={official.rows} />
        <CellText
          figures={onlineOffline.figures}
          kicker={onlineOffline.kicker}
          size="1x1-md"
          title={onlineOffline.title}
        />
        <CellText
          figures={forEveryone.figures}
          kicker={forEveryone.kicker}
          size="1x1-md"
          title={forEveryone.title}
        />
      </RuledGrid>
    </Section>
  );
}
