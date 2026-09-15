import { Cell, FigureRow, RuledGrid } from "hp";

/**
 * ベントの図（§6.11.2 / U-52 / C-32）: 緑の円 64 = size/figure の中に白い Tabler 32 / stroke 1.5。
 * 語は添えない — 意味は題が運ぶ。行全体は aria-hidden（装飾）。
 */

/** CULTURE の 3 つ: 学ぶ / 創る / 話す。64 × 3 + 12 × 2 = 216 は 1×1 の内側に収まる */
export const Culture = () => <FigureRow figures={["book", "hammer", "message"]} />;

/** 1 つ（SINCE の旗）。行は flex-wrap なので 1 つでも左に座る */
export const Single = () => <FigureRow figures={["flag"]} />;

/** AboutIcon の全 11 語。幅が足りなければ折り返す（gap は inline/sm） */
export const All = () => (
  <div style={{ maxWidth: "32rem" }}>
    <FigureRow
      figures={[
        "book",
        "hammer",
        "message",
        "code",
        "palette",
        "flask",
        "map-pin",
        "messages",
        "school",
        "handshake",
        "flag",
      ]}
    />
  </div>
);

/** セルの中での置き方: 題の下 stack/md 16 に、mt-auto で底に落とす（CellText と同じ解剖） */
export const InCell = () => (
  <RuledGrid columns={2} style={{ maxWidth: "48rem" }}>
    <Cell>
      <p className="text-overline text-ink-secondary">ONLINE &amp; OFFLINE</p>
      <p className="mt-auto pt-stack-md text-title-3">対面活動も、Discordでのオンライン交流も活発。</p>
      <FigureRow className="mt-stack-md" figures={["map-pin", "messages"]} />
    </Cell>
    <Cell>
      <p className="text-overline text-ink-secondary">FOR EVERYONE</p>
      <p className="mt-auto pt-stack-md text-title-3">エンジニアもデザイナーもサイエンティストも。</p>
      <FigureRow className="mt-stack-md" figures={["code", "palette", "flask"]} />
    </Cell>
  </RuledGrid>
);
