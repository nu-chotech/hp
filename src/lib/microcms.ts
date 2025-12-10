import { createClient } from "microcms-js-sdk";

// MicroCMS クライアント
export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN || "",
  apiKey: process.env.MICROCMS_API_KEY || "",
});

// ニュース/お知らせの型定義
export type NewsItem = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  content: string;
  category: {
    id: string;
    name: string;
  };
  thumbnail?: {
    url: string;
    width: number;
    height: number;
  };
};

export type NewsResponse = {
  contents: NewsItem[];
  totalCount: number;
  offset: number;
  limit: number;
};

// メンバーの型定義
export type Member = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  name: string;
  role: string;
  description?: string;
  avatar?: {
    url: string;
    width: number;
    height: number;
  };
  github?: string;
  twitter?: string;
};

export type MembersResponse = {
  contents: Member[];
  totalCount: number;
  offset: number;
  limit: number;
};

// ニュース一覧取得
export async function getNewsList(limit = 6) {
  const response = await client.get<NewsResponse>({
    endpoint: "news",
    queries: {
      limit,
      orders: "-publishedAt",
    },
  });
  return response;
}

// ニュース詳細取得
export async function getNewsDetail(id: string) {
  const response = await client.get<NewsItem>({
    endpoint: "news",
    contentId: id,
  });
  return response;
}

// メンバー一覧取得
export async function getMembersList(limit = 20) {
  const response = await client.get<MembersResponse>({
    endpoint: "members",
    queries: {
      limit,
    },
  });
  return response;
}
