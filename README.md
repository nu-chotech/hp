# ChoTech 公式サイト

長崎大学公認の学生技術系コミュニティ「ChoTech」の公式サイトです。

- 本番: Vercel（プロジェクト名 `chotech-hp`）
- ブランチ運用: `main` からフィーチャーブランチを切り、`main` へ PR（マージコミット）。`dev` ブランチは廃止済み

## デザインの正本

**`docs/design/design-system-v2.md`** がこのサイトの正本です。色・文字・余白・形・部品・動き・支援技術・コピーのすべてが、1 行の根拠つきでここに書かれています。Figma（[ChoTech Design System v2](https://www.figma.com/design/CPqI3iL7yOiR8AqUG7YC1L)）はその視覚表現で、両者は同じ内容を指します。

**実装で迷ったら仕様書を読んでください。** 値を足す前に、その値が仕様書のどの行から来るのかを確かめてください。仕様書に無い値が要るなら、まず仕様書に足します（`DECISION` として根拠 1 行つきで）。順序が逆になると、コードだけが知っている数字が増えて誰も直せなくなります。

方向は「ポスター × ベント」:

- 書体は **LINE Seed JP のみ**（400 / 700 / 800）
- アイコンは **Tabler Icons outline のみ**（24 グリッド、stroke 2）。絵文字・記号文字は使わない
- **角丸ゼロ**。例外はチャットの吹き出しと 3 つの円だけ
- 影ゼロ。段差は 1px / 2px の罫線と面の色だけで作る
- 全要素フラッシュレフト
- アクセントはアシッドライム 1 色で、**出現するのは 5 箇所だけ**

## 技術スタック

- Next.js 16 (App Router, React Compiler) / React 19
- Tailwind CSS v4 — トークンは `src/app/globals.css` に置き、設定ファイルは持たない
- Motion (`motion/react`)
- Biome (lint / format)
- pnpm

## 開発

```bash
pnpm install
pnpm dev             # http://localhost:3000
pnpm lint            # biome check
pnpm format          # biome format --write
pnpm build
pnpm generate:icons  # public/icons/favicon.svg から favicon / PWA アイコン一式を再生成
```

## トークン層の読み方

`src/app/globals.css` は 7 つのブロックに分かれています。

| ブロック | 中身 |
|---|---|
| 2. Primitives | neutral 11 / lime 8 / alpha 11。**直接使わない** |
| 3. Semantic roles | 62 行。色を触るときはここだけを参照する |
| 4. レスポンシブなスカラー | Mobile が基底、Desktop はメディアクエリ 1 本で上書き |
| 5. `@theme inline` | Tailwind の名前空間への写像。`inline` なので上の上書きに自動追従する |
| 6. `@layer base` | 和文組版、フォーカス、選択範囲、リンクの既定 |
| 7. ユーザー設定 | reduced-motion / contrast / transparency / forced-colors |

Tailwind 既定の階梯（`text-lg`、`rounded-lg`、`sm:` 〜 `2xl:`）は**消してあります**。使えるのは仕様書のトークンだけで、ブレークポイントも 2 つだけです。

| バリアント | 幅 | 何が変わるか |
|---|---|---|
| `tablet:` | 48rem (768) | 構造だけ。ナビが横並びに開き、罫線グリッドが 2 列になる |
| `desktop:` | 78rem (1248) | トークンのモードごと。タイポ・余白が Desktop 値になり、列数が設計どおりになる |

仕様書は Desktop 1440 / Mobile 390 の 2 フレームしか定義しないので、この 2 段は実装判断です（DECISION L-29、§3.6）。仕様外のクラスを書くとコンパイルは通っても CSS が生成されないので、その場で気づけます。

## 覚えておくとハマらないこと

- `<a>` は `@layer base` で下線が既定です。下線を持たないリンク（ナビ・フッター・ソーシャル・ブランド・`asChild` の Button）は `no-underline` で明示的に打ち消します
- フォーカスリングは `:focus-visible` がグローバルに 1 つだけ持ち、祖先の `data-surface` を見て地ごとに色を出し分けます。部品側でリング色を宣言しないでください
- 登場アニメーションは CSS 主導です。要素に `data-reveal` を付けると `src/lib/use-reveal.ts` が拾います。`motion/react` の `whileInView` は隠し状態を SSR に焼き込むので使いません（JS が無い読者にページが真っ白で届く）
- `cn()` は tailwind-merge を拡張してあります。素の tailwind-merge は `text-label-m` を「色」と誤分類して `text-action-ink` と衝突させ、型ロールを黙って捨てます

## ディレクトリ

```
src/
  app/
    layout.tsx        metadata / viewport / フォント / モーションのブートストラップ
    manifest.ts       Web App Manifest（siteConfig から生成）
    page.tsx          セクションの並び順
    globals.css       トークン層（上表）
  config/site.ts      サイト名・説明文・ナビ・SNS・外部リンク
  content/            各セクションの文言とデータ
  components/
    ui/               仕様書の部品表（Button / TextLink / Chip / Rule / Container /
                      Section / SectionHeading / RuledGrid / ImageSlot）
    layout/           SkipLink / Brand / Nav / Marquee / Footer
    sections/         Hero / About / Activities / ForYou / Members / Partners / Poster
    bento/ chat/      About のベントセルとチャットの部品
    icons.tsx         Tabler の薄い再エクスポート（既定で装飾扱い）
    providers/        MotionProvider
  lib/
    motion.ts         モーションの語彙（§7.2）
    use-reveal.ts     [data-reveal] のオブザーバ
    utils.ts          cn()
    site-url.ts       metadataBase 用のサイト URL 解決
scripts/              generate-icons.mjs
public/
  icons/              favicon / PWA アイコン一式（favicon.svg から generate-icons.mjs が生成）
  images/             写真・ロゴの実体。hero / about / members / personas / partners
docs/design/          デザインシステムの正本
```

## 文言・データを変えたいとき

- サイト名・説明文・ナビ・SNS・外部リンク → `src/config/site.ts`
- 各セクションの文言とデータ → `src/content/*.ts`（コンポーネントは触らなくてよい）
- OGP / manifest の文言は `siteConfig` から自動で反映される

## 画像を差し替えたいとき

写真・運営メンバー・パートナーロゴは**プレースホルダ**です（Unsplash 由来）。実体はすべて `public/images/` にあり、参照は `src/content/*.ts` が持ちます。コンポーネントは触らなくてよい。

| 場所 | ファイル | 参照 | 比率・目安サイズ |
|---|---|---|---|
| Hero 背景 | `public/images/hero/backdrop.jpg` | `content/hero.ts` | 横 1920 |
| About の活動写真 | `public/images/about/{talk-day,dev-day,hackathon}.jpg` | `content/about.ts` | 16:9、1200×675 |
| 運営メンバー | `public/images/members/<id>.jpg` | `content/members.ts` | Leader 16:9 1200×675 / Staff 4:3 800×600 |
| こんな人に | `public/images/personas/case-0N.jpg` | `content/personas.ts` | 1:1、192×192（円 96 の DPR 2） |
| パートナーロゴ | `public/images/partners/` | `content/partners.ts` の `logo` | 任意（contain、内側 349×72） |

同じファイル名で上書きすればコードは触らずに済みます。名前や拡張子を変えるときは `src/content/` の該当 1 行を書き換えてください。書き出しはスロット幅の 2 倍（DPR 2）が目安です（仕様書 §5.7.2）。Hero 背景だけは、不透明度を写真の最も明るい画素で測って決めているので、差し替えたら測り直します（`content/hero.ts` のコメント）。
