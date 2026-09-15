import {
  ArrowRight,
  ArrowUpRight,
  BrandDiscordMark,
  BrandGithubMark,
  Button,
} from "hp";

/** 反転面（Hero と同じ面。Section の surface="ink" と同じクラス） */
function Ink({ children }: { children: React.ReactNode }) {
  return (
    <div
      data-surface="ink"
      className="on-ink flex flex-wrap items-center gap-inline-sm bg-inverse-ground p-inset-md text-inverse-ink"
    >
      {children}
    </div>
  );
}

/** ポスター面（Join セクションの面。C-30 でインク面と同じ暗さ） */
function Poster({ children }: { children: React.ReactNode }) {
  return (
    <div
      data-surface="poster"
      className="on-ink flex flex-wrap items-center gap-inline-sm bg-poster-ground p-inset-md text-poster-ink"
    >
      {children}
    </div>
  );
}

/** ground 面の 5 スタイル（§6.2.3）。ページの CTA は solid / outline / discord の 3 つ */
export const Ground = () => (
  <div className="flex flex-wrap items-center gap-inline-sm">
    <Button variant="solid">活動を見る</Button>
    <Button variant="outline">メンバーを見る</Button>
    <Button variant="ghost">もっと読む</Button>
    <Button variant="accent">参加する</Button>
    <Button variant="discord" brand={BrandDiscordMark} icon={ArrowUpRight}>
      Discordに参加する
    </Button>
  </div>
);

/** 高さ駆動の 2 サイズ（md 44 / sm 36）。アイコンは 20 / 16 に追従する */
export const Sizes = () => (
  <div className="flex flex-wrap items-center gap-inline-sm">
    <Button size="md" icon={ArrowRight}>
      活動を見る
    </Button>
    <Button size="sm" icon={ArrowRight}>
      活動を見る
    </Button>
    <Button size="md" variant="outline">
      メンバーを見る
    </Button>
    <Button size="sm" variant="outline">
      メンバーを見る
    </Button>
  </div>
);

/** インク面（Hero）。outline の枠は inverse/ink、ghost は無い */
export const OnInk = () => (
  <Ink>
    <Button surface="ink" variant="discord" brand={BrandDiscordMark} icon={ArrowUpRight}>
      参加する
    </Button>
    <Button surface="ink" variant="outline">
      活動を見る
    </Button>
    <Button surface="ink" variant="solid">
      詳しく
    </Button>
    <Button surface="ink" variant="accent">
      参加する
    </Button>
  </Ink>
);

/** ポスター面（Join）。許されるのは solid と discord だけ（§1.4.4） */
export const OnPoster = () => (
  <Poster>
    <Button surface="poster" variant="discord" brand={BrandDiscordMark} icon={ArrowUpRight}>
      Discordに参加する
    </Button>
    <Button surface="poster" variant="solid">
      活動を見る
    </Button>
  </Poster>
);

/** 末尾アイコンは行き先を言う: 外部 → ArrowUpRight、サイト内 → ArrowRight。ブランドマークはサービスへ出る導線だけ（§6.1.9） */
export const WithIcons = () => (
  <div className="flex flex-wrap items-center gap-inline-sm">
    <Button variant="outline" icon={ArrowRight}>
      活動を見る
    </Button>
    <Button variant="outline" brand={BrandGithubMark} icon={ArrowUpRight}>
      GitHub
    </Button>
    <Button variant="solid" asChild icon={ArrowUpRight}>
      <a href="https://discord.com" target="_blank" rel="noreferrer">
        リンクとして
      </a>
    </Button>
  </div>
);

/** Disabled はタブ順に残して見た目だけ落とす（G5）。fullWidth でもラベルは左揃えのまま */
export const States = () => (
  <div className="flex w-[20rem] flex-col gap-stack-sm">
    <Button disabled>送信できません</Button>
    <Button variant="outline" disabled>
      無効
    </Button>
    <Button fullWidth icon={ArrowRight}>
      全幅のボタン
    </Button>
  </div>
);
