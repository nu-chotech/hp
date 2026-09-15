# ChoTech HP design system — how to build with it

This is the design system of ChoTech (a student tech community at Nagasaki University). Everything below is compiled from the site's own source; the spec that the tokens transcribe is `guidelines/docs/design/design-system-v2.md` (Japanese). UI copy is Japanese; the only typeface is **LINE Seed JP** (weights 400 / 700 / 800), shipped in `fonts/` and already applied through `styles.css`.

## Setup: nothing to wrap, one attribute to set on dark surfaces

- No provider is required. `MotionProvider` and `JoinDialogProvider` exist for the site's own page and are optional.
- `styles.css` styles `html`/`body` (ground colour, ink text, LINE Seed JP). Build on the ground; do not restyle `body`.
- **Dark surfaces declare themselves.** Anything on ink or poster ground needs `data-surface="ink"` (or `"poster"`) on the wrapper plus the classes `on-ink bg-inverse-ground text-inverse-ink` (poster: `bg-poster-ground text-poster-ink`). The attribute switches focus rings and `::selection`; `on-ink` fixes font smoothing. `Section surface="ink"` and `Cell surface="ink"` do this for you — prefer them.
- Buttons and links are the only interactive surfaces. Page CTAs are links: `<Button asChild><a href=…>…</a></Button>`.

## Styling idiom: Tailwind utilities over the system's own tokens — no raw colours, no raw numbers

The stylesheet is Tailwind v4 compiled with the palette and font scales **replaced** by the system's tokens. Standard Tailwind colours (`bg-red-500`, `text-gray-700`), font sizes (`text-lg`), radii and shadows do **not exist**. Use these families (all present in `styles.css`; `tablet:` (48rem), `desktop:` (64rem) and `wide:` (78rem) prefixes are available on layout/colour/type utilities):

| Family | Utilities | Notes |
|---|---|---|
| Surfaces | `bg-ground` `bg-surface` `bg-logo-ground` `bg-inverse-ground` `bg-poster-ground` `bg-divider` `bg-chip-fill` `bg-accent-subtle` `bg-accent-fill` `bg-discord-fill` `bg-image-placeholder` | `ground` is the page; `surface` is one step darker (chips, incoming bubbles); ink/poster are the dark planes |
| Text colour | `text-ink` `text-ink-secondary` `text-ink-tertiary` `text-inverse-ink` `text-inverse-ink-secondary` `text-inverse-ink-tertiary` `text-poster-ink` `text-accent-text` `text-on-accent` `text-on-accent-subtle` `text-on-discord` | On ground: small supporting text is `ink-secondary`; `ink-tertiary` only for ≥24px text or shapes. No alpha on light-surface text |
| Type roles | `text-display-xl` `text-display-l` `text-display-m` `text-title-1` `text-title-2` `text-title-3` `text-title-3-caps` `text-headline` `text-subheadline` `text-callout` `text-body-l` `text-body-m` `text-body-s` `text-footnote` `text-footnote-bold` `text-caption` `text-caption-bold` `text-label-m` `text-label-s` `text-label-nav` `text-overline` `text-overline-jp` | Each role sets size, weight, leading and tracking together. Never add `font-bold`/`leading-*` on top. Overlines are uppercase English labels; `overline-jp` for Japanese |
| Vertical rhythm | `gap-stack-2xs` … `gap-stack-xl`, `mt-/mb-/pt-/pb-stack-*` | 4 / 8 / 12 / 16 / 24 / 32 steps |
| Horizontal rhythm | `gap-inline-xs` … `gap-inline-2xl`, `gap-inline-icon`, `ps-/pe-/ms-/me-inline-*` | icon ↔ label is `inline-icon` (4) or `inline-xs` (8) |
| Insets | `p-inset-xs` `p-inset-sm` `p-inset-md` `p-inset-cell` `p-inset-row` `p-inset-control` `px-page-inset` | `inset-cell` is the padding of a ruled-grid cell |
| Sizes | `size-icon-sm` `size-icon-md` `size-icon-lg` `size-icon-xl` `size-avatar` `size-figure` `size-control-sm` `size-control-md` `min-h-control-md` `max-w-measure` | icons 16 / 20 / 24 / 32 |
| Shape | `rounded-none` (default everywhere) `rounded-full` (avatars, figures) `rounded-bubble` (chat only) `shadow-lg` (dialog only) | The system has square corners; only chat bubbles are rounded |
| Layout | `flex flex-col flex-row flex-wrap items-* justify-* grid grid-cols-1…6 col-span-2 row-span-2 relative absolute inset-0 overflow-hidden min-w-0 shrink-0 w-full mx-auto sr-only` | plain Tailwind, kept in the stylesheet |

Escape hatch: when a value has no utility, use the CSS variable inline — `style={{ maxWidth: "var(--container-page)", gap: "var(--stack-md)" }}`. Every token in the tables is also a `--*` custom property on `:root` (`--ground`, `--ink`, `--stack-md`, `--inline-sm`, `--inset-cell`, `--icon-md`, `--radius-bubble`).

## Composition rules the site follows

- Content sits in **ruled grids**: `<RuledGrid columns={2|3|4|6}>` with `<Cell>` children (divider-coloured gaps draw the rules; `CellPair` keeps two 1×1 cells side by side on mobile). Bento cells: `CellText`, `CellStat`, `CellOfficial`, `CellChat`. Cards: `MemberCard`, `PersonaCard`, `ActivityCell`, `PartnerLogo`.
- Every section: `<Section>` (rule on top, page container, rhythm) → `<SectionHeading title="活動内容" label="ACTIVITY" />` → grid/list. Japanese title first, English overline second.
- Images go through `<ImageSlot ratio="16:9" src alt>`; without `src` it renders the placeholder ground — that is the correct "no asset yet" state.
- Icons: `ArrowRight` (internal link), `ArrowUpRight` (external), `Check`, `Close`, `Menu`, `Photo`, brand marks `BrandDiscordMark` `BrandGithubMark` `BrandXMark` `BrandInstagramMark`. Bento figures are the green disc + white icon via `FigureRow figures={["book","hammer"]}`.
- Accent green is for small marks, figures and the accent button — never a large green plane. The Discord CTA is Discord's Blurple (`variant="discord"`), the only third-party colour.

## Where the truth lives

Read `styles.css` (imports `fonts/fonts.css` and `_ds_bundle.css`; the tokens are the `:root` custom properties at the top of `_ds_bundle.css`) and each component's `<Name>.d.ts` + `<Name>.prompt.md` under `components/<group>/<Name>/`. The full spec with contrast ratios and decisions is `guidelines/docs/design/design-system-v2.md`.

## One idiomatic block

```tsx
import { ArrowUpRight, BrandDiscordMark, Button, Cell, CellText, RuledGrid, Section, SectionHeading } from "hp";

<Section>
  <SectionHeading title="活動内容" label="ACTIVITY" />
  <RuledGrid columns={2}>
    <CellText colSpan={2} size="2x1-statement" kicker="CULTURE" title={"仲間と、\n学ぶ。創る。話す。"} figures={["book", "hammer", "message"]} />
    <CellText kicker="ONLINE & OFFLINE" title="対面活動も、Discordでのオンライン交流も活発。" figures={["map-pin", "messages"]} />
    <Cell className="justify-between gap-stack-md">
      <p className="text-overline text-ink-secondary">JOIN</p>
      <Button variant="discord" brand={BrandDiscordMark} icon={ArrowUpRight} asChild>
        <a href="https://discord.gg/…">Discordに参加する</a>
      </Button>
    </Cell>
  </RuledGrid>
</Section>
```
