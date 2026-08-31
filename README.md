# ChoTech 公式サイト

長崎大学 情報データ科学部発の学生エンジニアコミュニティ「ChoTech」の公式サイトです。

- 本番: Vercel（プロジェクト名 `chotech-hp`）
- ブランチ運用: `main` からフィーチャーブランチを切り、`main` へ PR（マージコミット）。`dev` ブランチは廃止済み

## 技術スタック

- Next.js 16 (App Router, React Compiler) / React 19
- Tailwind CSS v4 + shadcn/ui (new-york)
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
pnpm generate:icons  # public/favicon.svg から favicon / PWA アイコン一式を再生成
```

## ディレクトリ

```
src/
  app/
    layout.tsx        metadata / viewport（siteConfig から導出）
    manifest.ts       Web App Manifest（siteConfig から生成）
    page.tsx          セクションの並び順
    globals.css       テーマトークン・タイポグラフィ・reduced-motion 対応
  config/site.ts      サイト名・説明文・ナビ・SNS・外部リンク
  content/            各セクションの文言とデータ（about / activities / members / recruit）
  components/
    sections/         Hero / About / Activities / Members / Recruit
    sections/members/ MemberCard / MemberDialog / MemberAvatar / MemberSocialLinks
    shared/           Section（骨格と背景トーン）/ SectionHeader / Logo / SmoothLink
    ui/               shadcn/ui
    providers/        MotionProvider（reduced-motion 対応）
  lib/
    motion-variants.ts  spring プリセット・stagger variants・reveal() ファクトリ
    site-url.ts         metadataBase 用のサイト URL 解決
  hooks/              use-smooth-scroll
scripts/              generate-icons.mjs
docs/                 コミュニティのコンセプト資料（docs/README.md に索引）
.claude/skills/       デザインシステム系の Claude スキル
```

## 文言・データを変えたいとき

- サイト名や説明文、SNS / Discord のリンク → `src/config/site.ts`
- 各セクションの見出し・カード・メンバー → `src/content/*.ts`（コンポーネントは触らなくてよい）
- OGP / manifest の文言は `siteConfig` から自動で反映される

## デザイン方針

- 各セクションは `<Section tone="muted">` で骨格を共有する。背景は `muted` と素の背景を交互に並べ、隣接セクションの境界を保つ（Hero → About(灰) → Activities → Members(灰) → Recruit → Footer(灰)）。セクションを増減したら交互が崩れていないか確認する
- モーションは `src/lib/motion-variants.ts` に集約する。stagger させる要素は variants、単発の要素は `reveal(preset, { delay })` を使い、コンポーネント内に生の数値を書かない
- `MotionProvider` と `globals.css` で reduced-motion / reduced-transparency / contrast を尊重する
- 詳細は `.claude/skills/apple-design/SKILL.md` を参照

## 環境変数

| 変数 | 用途 | 既定 |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | OGP 画像などの絶対 URL の起点 | Vercel の本番ドメイン → `http://localhost:3000` |
