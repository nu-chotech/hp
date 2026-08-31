/**
 * 絶対 URL が必要な場面 (OGP 画像や canonical) で使うサイトの起点 URL
 *
 * 優先順: 明示設定 > Vercel の本番ドメイン > Vercel のデプロイ URL > ローカル
 */
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit;

  const vercelHost =
    process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
  if (vercelHost) return `https://${vercelHost}`;

  return "http://localhost:3000";
}
