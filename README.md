# ChoTech 公式サイト

長崎大学 情報データ科学部発の学生エンジニアコミュニティ「ChoTech」の公式サイトです。

- 本番: Vercel（プロジェクト名 `chotech-hp`）
- ブランチ運用: `dev` で開発 → `main` へマージ

## 技術スタック

- Next.js 16 (App Router, React Compiler) / React 19
- Tailwind CSS v4 + shadcn/ui (new-york)
- Motion (`motion/react`)
- Biome (lint / format)
- pnpm

## 開発

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm lint     # biome check
pnpm format   # biome format --write
pnpm build
```

## ディレクトリ

```
src/
  app/            layout / page / globals.css
  components/
    sections/     Hero / About / Activities / Members / Recruit
    shared/       Logo / SectionHeader / SmoothLink
    ui/           shadcn/ui
    providers/    MotionProvider (reduced-motion 対応)
  config/site.ts  サイト名・ナビ・SNS・外部リンクの一元管理
  lib/            motion-variants / utils
  hooks/          use-smooth-scroll
docs/             コミュニティのコンセプト資料
.claude/skills/   デザインシステム系の Claude スキル
```
