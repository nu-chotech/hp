/** メンバーカードに並べる SNS の種類（表示順） */
export const memberSocialKeys = [
  "twitter",
  "instagram",
  "github",
  "link",
] as const;

export type MemberSocialKey = (typeof memberSocialKeys)[number];

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  skills: string[];
  socials?: Partial<Record<MemberSocialKey, string>>;
}

/**
 * 「運営メンバー」セクションの文言
 *
 * NOTE: メンバーデータは現状ダミー。実データに差し替える際はここだけ更新すればよい。
 */
export const membersContent = {
  title: "運営メンバー",
  description: "ChoTechを運営するコアメンバーです。",
  members: [
    {
      id: "1",
      name: "田中 太郎",
      role: "代表",
      bio: "情報データ科学部3年。ChoTechの立ち上げメンバーとして、コミュニティの成長をリードしています。Webアプリケーション開発を中心に活動中。",
      skills: ["React", "TypeScript", "Next.js", "Python"],
      socials: {
        twitter: "https://twitter.com",
        instagram: "https://instagram.com",
        github: "https://github.com",
        link: "https://example.com",
      },
    },
    {
      id: "2",
      name: "佐藤 花子",
      role: "副代表",
      bio: "情報データ科学部2年。デザインとフロントエンド開発を担当。ユーザー体験を重視したプロダクト作りを心がけています。",
      skills: ["UI/UX Design", "Figma", "React", "CSS"],
      socials: {
        twitter: "https://twitter.com",
        instagram: "https://instagram.com",
        github: "https://github.com",
      },
    },
    {
      id: "3",
      name: "鈴木 一郎",
      role: "技術リーダー",
      bio: "情報データ科学部4年。バックエンド開発とインフラ構築を担当。クラウドサービスを活用した効率的なシステム設計を得意としています。",
      skills: ["Go", "AWS", "Docker", "Kubernetes", "PostgreSQL"],
      socials: {
        twitter: "https://twitter.com",
        github: "https://github.com",
        link: "https://example.com",
      },
    },
    {
      id: "4",
      name: "山田 美咲",
      role: "広報",
      bio: "情報データ科学部2年。SNS運営やイベントの企画・告知を担当。ChoTechの魅力を多くの人に届けるため、日々発信しています。",
      skills: ["Marketing", "SNS運用", "Canva", "Notion"],
      socials: {
        instagram: "https://instagram.com",
        github: "https://github.com",
      },
    },
    {
      id: "5",
      name: "高橋 健太",
      role: "イベント担当",
      bio: "情報データ科学部3年。ハッカソンや勉強会の企画・運営を担当。参加者が楽しく学べるイベント作りを目指しています。",
      skills: [
        "Event Planning",
        "JavaScript",
        "Machine Learning",
        "Data Analysis",
      ],
      socials: {
        twitter: "https://twitter.com",
        github: "https://github.com",
      },
    },
  ] satisfies TeamMember[],
} as const;
