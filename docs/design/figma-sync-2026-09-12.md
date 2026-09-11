# Figma v2 同期チェックリスト（2026-09-12 の改修分）

正本は `design-system-v2.md`。本書はそこに「Figma 未反映」と記した変更を、Figma ファイル
`CPqI3iL7yOiR8AqUG7YC1L`（ChoTech Design System v2）へ写すための作業一覧。
順序は依存関係順（Variables → Icons → Components → Screens → Docs）。各項目の根拠と実測値は
括弧内の節・DECISION を参照する。Plugin API の落とし穴は memory の `hp-figma-design-system` を見る。

## 1. Variables（§1、C-29）

- [ ] `Primitives`: `lime/200–900` の 8 行を **`green/200–900`** に改名し値を差し替える
      （200 `#aceebb` / 300 `#56d364` / 400 `#3fb950` / 500 `#2ea043` / 600 `#238636` / 700 `#1a7f37` / 800 `#116329` / 900 `#044f1e`）。
      `alpha/lime-400/24` → `alpha/green-400/24`（RGBA 63,185,80 @ 0.24）。lime の記録は付録 C.4 / C.5 が持つ。
- [ ] `Color` コレクション: モード `Lime accent` → **`Green accent`** に改名（既定モードのまま）。
      エイリアス先は改名で追従するが、次の 10 行が green の同じ段を指していることを確認:
      `poster/ground` `hero/word` `accent` `accent-on-ink` → green/400、`accent-hover` → 500、`accent-pressed` → 600、
      `pop/separator` `focus/ring` → 700、`accent-text` `pop/badge` `link/hover` → 800、
      `accent-text-small` `on-accent-subtle` `poster/focus/ring` `link/pressed` → 900、`focus/ring-inverse` → 300、`accent-subtle` → 200。
- [ ] `01 Foundations / Color` の判定表（§1.4）の数値を C.5 の実測値に差し替える
      （ink 上の 400 = 6.54、地の上の 800 = 6.62 / 900 = 8.77 / 700 = 4.55、ポスター secondary = 5.37、selection = 12.19 / 9.78 / 5.33）。
- [ ] `Spacing`: `size/illustration` 96 → **80**（U-42）。`icon/xl` **32** を追加（U-40）。

## 2. Icons（§5、U-38 / U-40）

- [ ] `Icon/BrandX` `Icon/BrandInstagram` `Icon/BrandGithub` `Icon/BrandDiscord`（Tabler 由来）を **`Brand/X` `Brand/Instagram` `Brand/GitHub` `Brand/Discord`** に置き換える。
      素材は `assets/brand/*.svg`（各社の公式）をそのまま読み込み、fill を `color/ink` にバインド。Size variant は 20（枠は正方形、縦横比は素材のまま中央）。
- [ ] ベントの図 11 種を `Icon/*` に追加（Tabler outline、Size **32**、stroke **1.5**）:
      Book / Hammer / MessageCircle / Code / Palette / Flask / MapPin / Messages / School / HeartHandshake / Flag。

## 3. Components（§6）

- [ ] `Section / Hero`（§6.8、U-39）: `Hero / Meta Strip` インスタンスを外す（部品は非推奨として残置）。
      h1 を墨の板（fill `inverse/ground`、padding 左右 0.2em = 23 / 上下 0.1em = 12、板は container の外へ 23 吊るす）に載せ、
      文は `inverse/ink`、句点 `.` だけ `hero/word`。`Hack` の色分けはやめる。Mobile は板の中で 2 行。
- [ ] `Bento / Cell Text`（§6.11.2、U-40）: `icon1–3` INSTANCE_SWAP + `showIcons` BOOL を追加。
      解剖は kicker（天）／[icons → stack/md 16 → title]（地）。図同士 inline/sm 12。
- [ ] **`Bento / Cell Official` を新設**（§6.11.4）: 2×1、kicker `OFFICIAL`、行 × 2 = 図 32 + inline/md 16 + [Headline 17 → stack/2xs 4 → Footnote 13 ink-secondary]、行間 stack/md 16。
- [ ] `Bento / Grid`（§6.11.1）: 行構成を **行 1 [CULTURE 2×1 · MEMBERS · SINCE] / 行 2–3 [CHAT 2×2 · OFFICIAL 2×1 / ONLINE & OFFLINE · FOR EVERYONE]** に。
      `Cell Image` と `Cell CTA` は Screens から外す（部品は残置）。実測: 行 1 = 198、CHAT = 465、OFFICIAL = 240、行 3 = 224。
- [ ] `Activity / Cell`（§6.13、U-41）: `Size` {Feature, Compact} を 1 サイズに統合し `photo` INSTANCE_SWAP（Image Slot 16:9、inset 0）を上端に追加。題は Title/1 固定。
      `Activity / Bento` は 2×2（597 × 544、写真 597 × 336）。Mobile 338 × 406–430。
- [ ] `Persona / Card`（§6.14、U-42）: 3 行 = header（イラスト **80** + [CASE 番号 / 題]、上下中央、gap 12）／引用（fill `inverse/ground`、inset 12 × 16、Callout `inverse/ink`）／
      次の一歩（fill `surface`、inset 12 × 16、arrow-right 16 + Footnote/Bold `ink`）。引用と次の一歩は隙間 0。実測 397 × 256 / 254。
- [ ] `Partner / Cell`（§6.16、U-43）: `Filler` を廃止し **`Partner / Logo`**（3:2 × 96、列の中央）に。
      `Section / Partners` は外枠 1 つの白い面（`logo-ground`、inset 24）に団体数で等分した列（Desktop 5 / tablet 3 / Mobile 2）。
- [ ] `Member / Card`・`Section / Poster`: Socials のアイコンを `Brand/*` に差し替える（U-38）。

## 4. Screens（`03 Screens`）

- [ ] `Desktop 1440` / `Mobile 390` を上記に合わせて再構成する。Color モードは `Green accent`。
- [ ] Mobile の About は DOM 順の 1 列（CULTURE 176 / MEMBERS 128 / SINCE 144 / CHAT 475 / OFFICIAL 208 / ONLINE 168 / EVERYONE 168）。

## 5. Docs フレーム（`01 Foundations` / Motion）

- [ ] Motion: `motion/chat/step` 900 → **600 ms**、`motion/chat/hold` 2,400 → **2,000 ms**、畳む先は 1 行目（U-44）。`motion/photo/step` は撤去（U-40）。
- [ ] Imagery（§5.7.2）: スロット表を activity photo 16:9 / persona 80 / partner logo 3:2 に更新、配信は next/image（U-45）。
- [ ] Icons: 「Tabler のみ」に「ブランドマークは公式素材」の例外を追記（U-38）。

## 実行メモ

- Claude Code から行う場合: Figma MCP の OAuth を通した後、`figma-use` スキルを読み込んでから `use_figma` で 1 → 5 の順に。
  変数のバインド先を変えるときは `setBoundVariableForPaint`、モード名の変更は `collection.renameMode`。
- 手作業で行う場合も順序は同じ。Variables を先に直せば Screens の色は追従する。
