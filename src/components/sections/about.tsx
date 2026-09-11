import { CellChat } from "@/components/bento/cell-chat";
import { CellOfficial } from "@/components/bento/cell-official";
import { CellStat } from "@/components/bento/cell-stat";
import { CellText } from "@/components/bento/cell-text";
import { bentoIcons } from "@/components/icons";
import { RuledGrid } from "@/components/ui/ruled-grid";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { sectionIds } from "@/config/site";
import { type AboutIcon, aboutContent } from "@/content/about";

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
 * 行 2–3 の高さはチャットが決め、右側の 3 セルがそれに追従して伸びる。
 * 各セルは「キッカー（天）／図 + 題（地）」の 2 段で、行が伸びても表情が変わらない。
 *
 * reveal はグリッドを **1 つの親** として出す（DECISION M-2）。2px 罫線で結ばれた
 * 格子は 1 つの面であって、セルが順に現れると格子が壊れて見える。
 * インデックスは見出し 0 / グリッド 1（§7.4.1 の About 0/1）。
 */

const icons = (names: readonly AboutIcon[]) =>
  names.map((name) => bentoIcons[name]);

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
        {/* 行 1: 2×1 CULTURE · MEMBERS（墨、ページ唯一の数字）· SINCE（図 + 題） */}
        <CellText
          colSpan={2}
          icons={icons(culture.icons)}
          kicker={culture.kicker}
          size="2x1"
          title={culture.title}
        />
        <CellStat
          accessibleName={stat.accessibleName}
          kicker={stat.kicker}
          suffix={stat.suffix}
          value={stat.value}
        />
        <CellText
          icons={icons(founded.icons)}
          kicker={founded.kicker}
          size="1x1-sm"
          title={founded.title}
        />

        {/* 行 2–3: Chat 2×2 · OFFICIAL 2×1 / 1×1 · 1×1 */}
        <CellChat kicker={chat.kicker} note={chat.note} thread={chat.thread} />
        <CellOfficial
          kicker={official.kicker}
          rows={official.rows.map((row) => ({
            ...row,
            icon: bentoIcons[row.icon],
          }))}
        />
        <CellText
          icons={icons(onlineOffline.icons)}
          kicker={onlineOffline.kicker}
          size="1x1-sm"
          title={onlineOffline.title}
        />
        <CellText
          icons={icons(forEveryone.icons)}
          kicker={forEveryone.kicker}
          size="1x1-sm"
          title={forEveryone.title}
        />
      </RuledGrid>
    </Section>
  );
}
