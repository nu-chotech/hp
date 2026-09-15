# design-sync NOTES（hp → claude.ai/design「ChoTech HP Design System」）

再同期の前にここを読む。1 行 1 事実。

## 前提・構成

- この repo は Next.js サイトで、デザインシステム単体のパッケージではない。`dist/` は無い。
  コンバータは **synth-entry モード**（`src/components` の .tsx を全部 `export *` するエントリを合成）で動かす。
- synth-entry を発動させるため、コンバータには **存在しないパス** `--entry ./dist/index.js` を渡す（soft 解決で null → 合成）。
  `--entry` 無しだと `node_modules/hp/package.json` を探して落ちる。`[NO_DIST]` の 2 行はこの前提の正常ログ。
- `.d.ts` は `.design-sync/prebuild.mjs` が `tsc` の宣言出力で `build/ts/` に作る（バレルは `build/ds-entry/index.ts`）。
  コンバータは `package.json` の `publishConfig.types`（= `build/ts/index.d.ts`）から型の入口を読む。
  この `publishConfig` は private パッケージなので publish に影響しない。消すと 5 件しか検出されなくなる。
  バレルをドット始まりのディレクトリ（`.design-sync/.cache/`）に置くと ts-morph の glob が拾わず、同じ症状になる。
- CSS は Tailwind v4。`.design-sync/ds.css`（globals.css + `--font-line-seed-jp` の定義 + layout.tsx の body クラス相当）を
  `@tailwindcss/postcss` でコンパイルし `.design-sync/.cache/ds.css` → `cfg.cssEntry`。スキャン対象は repo 全体（gitignore 尊重）なので
  `.design-sync/previews/*.tsx` のユーティリティも拾う。
- フォント: LINE Seed JP は `next/font/local` が `node_modules/line-seed-jp/woff2` を self-host している。
  `.design-sync/fonts.css` に同じ 3 ウェイト（400/700/800）の @font-face を書き `cfg.extraFonts` で `fonts/` に同梱。
- `next/image` は `.design-sync/shims/next-image.tsx` に差し替える（`.design-sync/tsconfig.json` の paths、コードのフォーク無し）。
  読めない素材は `onError` で自分を隠し、ImageSlot のプレースホルダ地が見える。`/icons/mark.svg` だけ data URI（prebuild が生成）。
  `/images/**` の写真（19MB）は同梱しない — セクション系のカードでは写真が空スロットで出る。
- `cfg.buildCmd` = `node .design-sync/prebuild.mjs`（CSS・アセット・型の 3 つ）。コンバータの前に毎回走らせる。
- 実行順: `node .design-sync/prebuild.mjs` → `node .ds-sync/package-build.mjs --config .design-sync/config.json --node-modules ./node_modules --entry ./dist/index.js --out ./ds-bundle` → `node .ds-sync/package-validate.mjs ./ds-bundle`。
- Playwright は `.ds-sync/` にローカル導入。Chromium のキャッシュは macOS では `~/Library/Caches/ms-playwright`（`~/.cache` ではない）。
  この repo では `npx` を使わない（偽バイナリを引く）— `node .ds-sync/node_modules/playwright/cli.js install chromium`。
- グループ: ファイル名と export 名が違う部品（ChatThread/FigureRow/JoinTrigger/Tail/ReactionChip）は `componentSrcMap` で src を固定。
  `ui/` と `icons.tsx` は汎用ディレクトリ扱いで group が general に落ちるので `docsMap` のスタブ（`.design-sync/docs/ui.md`, `icons.md`）で UI / Icons に寄せる。
- `docs/about.md` が About セクションのドキュメントとして誤マッチするので `docsMap.About = null`。
- `icons.tsx` の `BrandDiscord/BrandX/BrandInstagram/BrandGithub` は `*Mark` のエイリアスなのでカードから除外（`componentSrcMap: null`）。バンドルの export には残る。
- biome は `.design-sync` を対象外（biome.json）。`.ds-sync/` `ds-bundle/` `build/` `.design-sync/.cache/` は gitignore。

- Tailwind v4 はソースで使ったユーティリティしか出力しない（サイト由来は 386 個）。デザインエージェントがトークン語彙を自由に使えるよう
  `.design-sync/ds.css` の `@source inline(...)` でトークン × ユーティリティを明示生成している（約 1,800 個、CSS 170KB）。
  トークンを追加・改名したら **このセーフリストも更新する**（値は globals.css が正本、ここは名前の列挙）。既定パレット（bg-red-500 等）は出さない。
- プレビュー（.design-sync/previews/*.tsx）の任意値クラス（`max-w-[48rem]` 等）は効かない前提で書く — 幅はインライン style。
- README 先頭の規約ヘッダは `.design-sync/conventions.md`（`cfg.readmeHeader`）。名前は必ずビルド出力（`ds-bundle/_ds_bundle.css`、`components/*/`）に対して検証する。
- アニメーションする部品（ChatThread / RollingNumber / ReactionChip など）のカードは、プレビュー先頭で `matchMedia("(prefers-reduced-motion: reduce)")` を
  matches=true に固定して「低減時の全表示状態」を撮る。部品は触らない。

- next/image shim の `PUBLIC_ASSETS` は `/icons/mark.svg` + `public/images/partners/*.png`（計 260KB、prebuild が data URI 化）。
  読めない src は `onError` で img を隠す → ImageSlot の placeholder 地（Photo アイコン無し）になる。アイコン付きが欲しければ src を渡さない。
- 撮影ビューポートの既定は 900×700（tablet 段）。`columns` 3/4/6 や `rowSpan` は段に届かないので、RuledGrid / Cell / Container は
  `cfg.overrides.<Name>` で `cardMode: "column"` + `viewport: "1440x…"` を付けている。NavBar の Mobile 段・開いた Menu は静的に撮れない（open は内部 state）。
- ブレークポイントは L-34 で tablet 48rem / desktop 64rem / wide 78rem の 3 段（2026-09-15）。セーフリストの prefix にも `wide:` を含める。
- プレビュー側のハック（部品は触らない）: Marquee は `useLayoutEffect` で track を `animation-play-state: paused`（t=0 で撮る）。
  ReactionRow は `playing={false}` で最終値。Typing のドット明滅は CSS メディアクエリなので JS では止まらず、一瞬の状態が写る（許容）。
- `<li>` を返すカード（MemberCard / PersonaCard / ActivityCell）は `<RuledGrid asChild><ul role="list">` で包む。PersonaCard の親グリッドは `auto-rows-auto` 必須（for-you.tsx と同じ）。
- 存在しないトークン名に注意: `p-inset-lg` は無い（inset は xs/sm/md/cell/row/control）。
- **部品側の潜在バグ（未修正、報告済み）**: `TextLink variant="inline" external`（standalone 無し）は段落内で矢印 svg がブロック化して行が割れる
  （preflight の `svg { display:block }` を inflow の class が上書きしていない）。ページに実例が無いので露見していない。プレビューは inline external を避けた。

## Re-sync risks

- `src/` のトークン追加・改名 → `ds.css` のセーフリストと `conventions.md` の表が古くなる（validate は検出しない。手で grep する）。
- `package.json` の `publishConfig.types` を誰かが消すと検出が 5 件に落ちる。
- 並行して src を触るセッションがあると、ビルド時点の src と作業ツリーがずれる。ビルド前に `git status` を見る。
- プレビューが借りている content（`src/content/*.ts` の文言）は手書きコピーなので、content 側の改稿で乖離する。
- Playwright / Chromium のバージョンは `.ds-sync/`（gitignore）にあり、クローンごとに再導入。

## Known render warns（validate の警告のうち妥当と判断したもの）

- `[RENDER_THIN] BrandDiscordMark / BrandGithubMark / BrandInstagramMark / BrandXMark: mounts have no text and paint nothing` — 16px の単色マークをそのまま描いているだけ。正常。
- `[RENDER_THIN] JoinDialogProvider: mounted text is just "JoinDialogProvider"` — プロバイダで見た目を持たない。正常。
