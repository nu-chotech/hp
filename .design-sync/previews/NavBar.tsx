import { ArrowUpRight, Brand, Button, JoinTrigger, NavBar } from "hp";

/**
 * Nav bar の対話部分（§6.7）。ブランドと CTA は状態を持たないので要素として渡す —
 * layout/nav.tsx（サーバ層）が組んでいるものをそのまま再現する。
 *
 * 帯の高さは 62 = size/nav。横並び（Nav 項目 4 本）は tablet 48rem から、
 * タグラインは desktop 78rem から。カードは 900 幅なので tablet 段が写る。
 * Mobile の開閉ボタンとメニューパネルは `tablet:hidden` で、この幅では出ない。
 */

const CTA_LABEL = "参加する";

/** CTA は Mobile 44 / 横並び以降 36。サイズはトークンの段そのものなので 2 つの箱を出し分ける（§6.7.1） */
const cta = (
  <>
    <Button asChild size="md" icon={ArrowUpRight} className="tablet:hidden">
      <JoinTrigger>{CTA_LABEL}</JoinTrigger>
    </Button>
    <Button
      asChild
      size="sm"
      icon={ArrowUpRight}
      className="hidden tablet:inline-flex"
    >
      <JoinTrigger>{CTA_LABEL}</JoinTrigger>
    </Button>
  </>
);

/** Menu panel 末尾の fullWidth CTA（Mobile のみ） */
const menuCta = (
  <Button asChild size="md" fullWidth icon={ArrowUpRight}>
    <JoinTrigger>{CTA_LABEL}</JoinTrigger>
  </Button>
);

/** 既定: Brand（me-auto で左）─ Nav 4 本 ─ CTA 36。下端に 2px の full-bleed 罫 */
export const Default = () => (
  <NavBar
    brand={<Brand size="nav" className="me-auto" />}
    cta={cta}
    menuCta={menuCta}
  />
);

/**
 * aria-current（§6.3.2）: ビューポート中央線に掛かっている節が「今いる節」。
 * 下に置いた About の代役セクションが中央線を跨ぐので、Nav の About に
 * link-current の 2px 下線が付く。JS が無ければ下線が 1 本出ないだけ。
 */
export const Current = () => (
  <>
    <NavBar
      brand={<Brand size="nav" className="me-auto" />}
      cta={cta}
      menuCta={menuCta}
    />
    <section
      aria-label="About"
      className="bg-surface p-inset-lg text-caption text-ink-secondary"
      id="about"
      style={{ minHeight: "100vh" }}
    >
      About セクションの代役（中央線の交差で aria-current を決める）
    </section>
  </>
);

/** 文言の差し替え（nav.tsx の ctaLabel）。CTA が伸びても Brand と Nav の位置は動かない */
export const LongCta = () => (
  <NavBar
    brand={<Brand size="nav" className="me-auto" />}
    cta={
      <Button asChild size="sm" icon={ArrowUpRight}>
        <JoinTrigger>Discordに参加する</JoinTrigger>
      </Button>
    }
    menuCta={
      <Button asChild size="md" fullWidth icon={ArrowUpRight}>
        <JoinTrigger>Discordに参加する</JoinTrigger>
      </Button>
    }
  />
);
