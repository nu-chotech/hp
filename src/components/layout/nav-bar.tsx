"use client";

import type { ReactNode } from "react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Close, Menu } from "@/components/icons";
import { Container } from "@/components/ui/container";
import { insetFocusRing, tintedControl } from "@/components/ui/interaction";
import { Rule } from "@/components/ui/rule";
import { TextLink } from "@/components/ui/text-link";
import { navLinks } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * Nav bar の対話部分（§6.7）
 *
 * 帯が持つ状態は 3 つだけ（メニュー開閉・aria-current・アンカー移動後のフォーカス）で、
 * どれも DOM 側にしか無い。ブランドと CTA は状態を持たないので、この階層には
 * **要素として渡ってくる**（nav.tsx がサーバで描いたもの）。こうすると
 * next/image と Button がクライアントチャンクに乗らない。
 *
 * 中身は静的なマークアップなので、SSR された HTML だけでもリンクとして機能する
 * （JS 無しで失われるのは Mobile のメニュー開閉だけで、同じ 4 本のリンクは
 * Footer にもある）。
 */

/** ナビが指すセクション id。DOM 順に持つ（aria-current の決定に使う） */
const SECTION_IDS = navLinks.map((link) => link.href.replace("#", ""));

/**
 * アンカー移動後にフォーカスを移す（§7.4.6 / WCAG 2.4.3）
 *
 * スクロールは CSS（`html { scroll-behavior: smooth }`）が持っている。
 * CSS が運べないのはフォーカスだけなので、既定動作を止めずに次のフレームで
 * 移動先へ focus() する。ページ内リンクは Nav・Menu・Brand・Footer・Hero 副ボタンに
 * 散っているので、実装は 1 つにして document で委譲する。
 */
function focusAnchorTarget(id: string) {
  const target = document.getElementById(id);
  if (!target) return;

  // section は aria-labelledby で h2 を指す（§8.5）。読み上げ位置は見出しに置きたい。
  // SectionHeading の h2 は tabindex="-1" を持っているので、そのまま焦点になれる
  const labelledBy = target.getAttribute("aria-labelledby");
  const heading = labelledBy
    ? document.getElementById(labelledBy.split(/\s+/)[0] ?? "")
    : null;
  const element = heading ?? target;

  if (!element.hasAttribute("tabindex")) element.setAttribute("tabindex", "-1");
  // preventScroll: focus 側が飛ばすと smooth scroll と二重に動いて見える
  element.focus({ preventScroll: true });
}

function useAnchorFocus() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
        return;

      const anchor = (
        event.target as Element | null
      )?.closest?.<HTMLAnchorElement>("a[href]");
      const href = anchor?.getAttribute("href");
      if (!href || !href.startsWith("#") || href.length < 2) return;

      const id = decodeURIComponent(href.slice(1));
      requestAnimationFrame(() => focusAnchorTarget(id));
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
}

/**
 * ビューポート中央線に掛かっているセクションを「今いる節」とする（§6.3.2、任意）
 *
 * 閾値 0.5 を交差比で取ると、ビューポートより背の高い節は永遠に 50% に届かず
 * どこにも current が付かない。中央線（rootMargin −50% / −50%）なら節の高さに
 * 依らず必ず 1 つだけが交差するので、同じ「50%」でこちらを採る。
 * JS が無ければ current はどこにも付かない — 下線が 1 本出ないだけで、
 * リンクとしては完全に機能する。
 */
function useCurrentSection() {
  const [current, setCurrent] = useState<string | null>(null);

  useEffect(() => {
    const targets = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (element): element is HTMLElement => element !== null,
    );
    if (targets.length === 0) return;

    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        setCurrent(SECTION_IDS.find((id) => visible.has(id)) ?? null);
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
    );

    for (const target of targets) observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return current;
}

/**
 * Menu row（§6.7.3）
 *
 * TextLink の nav バリアントは「帯の中の 20px 行を ::before で 44 に広げる」部品で、
 * すでに 44 高のこの行に重ねると当たり判定が行からはみ出す。行そのものが
 * コントロールなので、ここは行として組む。
 */
function MenuRow({
  href,
  label,
  current,
}: {
  href: string;
  label: string;
  current: boolean;
}) {
  return (
    <a
      href={href}
      aria-current={current ? "true" : undefined}
      className={cn(
        "flex min-h-control-md items-center px-page-inset text-ink text-label-nav no-underline",
        tintedControl,
        // 全幅の行なのでリングは内側に入れ、上下の hairline と交差させない（K-7）
        insetFocusRing,
      )}
    >
      {/* 持続状態はラベル幅の 2px 下線。左の縦バーは §4.3 規則 6 に反する（R16） */}
      <span
        className={cn(
          "[text-decoration-skip-ink:none]",
          current &&
            "underline decoration-link-current decoration-(length:--stroke-underline)",
        )}
      >
        {label}
      </span>
    </a>
  );
}

export interface NavBarProps {
  /** サーバで描いた Brand lockup（状態を持たないのでここには含めない） */
  brand: ReactNode;
  /** 帯右端の CTA。Mobile 44 / 横並び以降 36 の 2 つを出し分ける（§6.7.1・§6.7.2） */
  cta: ReactNode;
  /** Menu panel 末尾の fullWidth CTA */
  menuCta: ReactNode;
  className?: string;
}

export function NavBar({ brand, cta, menuCta, className }: NavBarProps) {
  const panelId = useId();
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const current = useCurrentSection();

  useAnchorFocus();

  const close = useCallback((returnFocus: boolean) => {
    setOpen(false);
    // 非モーダルでもフォーカスは呼び出し元に返す（§6.7.3 / APG）
    if (returnFocus) buttonRef.current?.focus();
  }, []);

  // Escape と外側タップ。開いている間だけ張る
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close(true);
    };
    const onPointerDown = (event: PointerEvent) => {
      if (headerRef.current?.contains(event.target as Node)) return;
      // 外側を触ったときはフォーカスを奪い返さない（触った先に用がある）
      close(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open, close]);

  // 横並びに開いたら（= 開閉ボタンが消えたら）状態も畳む。
  // 閾値は CSS の --breakpoint-tablet をそのまま読む（数値を TS に二重に持たない）
  useEffect(() => {
    const breakpoint = getComputedStyle(document.documentElement)
      .getPropertyValue("--breakpoint-tablet")
      .trim();
    if (!breakpoint) return;

    const query = window.matchMedia(`(width >= ${breakpoint})`);
    const sync = () => {
      if (query.matches) setOpen(false);
    };
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  const onButtonKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    // 開示パネルの作法（APG）: 開いてもフォーカスはボタンに留め、ArrowDown で 1 行目へ
    if (event.key !== "ArrowDown") return;
    event.preventDefault();
    setOpen(true);
    requestAnimationFrame(() => {
      panelRef.current?.querySelector<HTMLAnchorElement>("a[href]")?.focus();
    });
  };

  // パネル内のリンク（行 4 本 + 末尾 CTA）を踏んだら畳む。行も CTA もサーバ側で
  // 描けるように、閉じる責任はリンク自身ではなくパネルへの委譲で持つ。
  // JSX の onClick だと「対話的な静的要素」になるので、DOM に直接張る
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      if (target?.closest?.("a[href]")) close(false);
    };

    panel.addEventListener("click", onClick);
    return () => panel.removeEventListener("click", onClick);
  }, [close]);

  return (
    <header
      ref={headerRef}
      className={cn("sticky top-0 z-50 bg-ground", className)}
    >
      {/* パネルの移動は transform で持つ。globals.css の reduced-motion 側が
          `.menu__panel { transform: none; transition: opacity … }` で上書きする契約なので、
          インラインスタイル（上書き不能）ではなく :where() の詳細度 0 の規則として置く。
          低減時に必要な「見えない状態」だけをここで足す（globals は opacity を触らない）。
          precedence 付きなので React 19 が <head> へ巻き上げる — body 内の <style> は
          metadata content の置き場所ではない */}
      <style href="menu-panel" precedence="components">{`
:where(.menu__panel){transform:translateY(-100%);transition:transform var(--spring-quick)}
:where(.menu__panel[data-open="true"]){transform:translateY(0)}
@media (prefers-reduced-motion: reduce){
:where(.menu__panel){opacity:0}
:where(.menu__panel[data-open="true"]){opacity:1}
}`}</style>
      <nav aria-label="メイン" className="relative flex h-nav flex-col">
        <Container
          width="viewport"
          className="flex flex-1 items-center gap-inline-md py-nav-pad-y"
        >
          {brand}

          {/* 横並びに開くのは tablet 48rem から。トークンは Mobile のまま（L-29） */}
          <ul className="hidden items-center gap-inline-md tablet:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <TextLink
                  variant="nav"
                  href={link.href}
                  current={current === link.href.replace("#", "")}
                >
                  {link.label}
                </TextLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-inline-sm tablet:gap-inline-md">
            {cta}

            <button
              ref={buttonRef}
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpen((value) => !value)}
              onKeyDown={onButtonKeyDown}
              className={cn(
                "flex size-control-md shrink-0 items-center justify-center text-ink tablet:hidden",
                tintedControl,
              )}
            >
              {/* アイコンの差し替えは duration/0（§6.7.3）。名前は状態で変えない（APG） */}
              {open ? (
                <Close className="size-icon-lg" />
              ) : (
                <Menu className="size-icon-lg" />
              )}
              <span className="sr-only">メニュー</span>
            </button>
          </div>
        </Container>

        {/* ナビ下の 2px 罫。full-bleed（帯は紙ではなく窓枠、L-23） */}
        <Rule />

        {/* パネルは罫の直下から滑り出す。ラッパーが overflow: hidden の境界（§7.4.6）。
            閉じている間は inert で読み上げ・タブ順から外し、下の内容へのクリックも通す */}
        <div
          className={cn(
            "absolute inset-x-0 top-full overflow-hidden tablet:hidden",
            !open && "pointer-events-none",
          )}
          inert={!open}
        >
          <div
            ref={panelRef}
            id={panelId}
            data-open={open}
            className="menu__panel bg-ground"
          >
            <ul>
              {navLinks.map((link, index) => (
                <li key={link.href}>
                  {/* 行間は 1px hairline（構成要素の内部の仕切り、§4.2） */}
                  {index > 0 ? <Rule weight="hair" tone="hairline" /> : null}
                  <MenuRow
                    href={link.href}
                    label={link.label}
                    current={current === link.href.replace("#", "")}
                  />
                </li>
              ))}
            </ul>
            <div className="px-page-inset py-inset-md">{menuCta}</div>
            <Rule />
          </div>
        </div>
      </nav>
    </header>
  );
}
