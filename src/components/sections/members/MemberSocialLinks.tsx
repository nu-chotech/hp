"use client";

import type { LucideIcon } from "lucide-react";
import { Github, Instagram, Link2, Twitter } from "lucide-react";
import type { MouseEvent } from "react";
import {
  type MemberSocialKey,
  memberSocialKeys,
  type TeamMember,
} from "@/content/members";
import { cn } from "@/lib/utils";

const socialMeta: Record<MemberSocialKey, { icon: LucideIcon; label: string }> =
  {
    twitter: { icon: Twitter, label: "Twitter" },
    instagram: { icon: Instagram, label: "Instagram" },
    github: { icon: Github, label: "GitHub" },
    link: { icon: Link2, label: "Webサイト" },
  };

interface MemberSocialLinksProps {
  member: TeamMember;
  className?: string;
  /** クリック可能なカードの中に置く場合、親へのクリック伝播を止める */
  stopPropagation?: boolean;
}

/**
 * メンバーが持つ SNS リンクをアイコンで並べる
 * カードとダイアログの両方で使う
 */
export function MemberSocialLinks({
  member,
  className,
  stopPropagation = false,
}: MemberSocialLinksProps) {
  const links = memberSocialKeys.flatMap((key) => {
    const href = member.socials?.[key];
    return href ? [{ key, href, ...socialMeta[key] }] : [];
  });

  if (links.length === 0) return null;

  const handleClick = stopPropagation
    ? (e: MouseEvent<HTMLAnchorElement>) => e.stopPropagation()
    : undefined;

  return (
    <nav
      aria-label={`${member.name}のリンク`}
      className={cn("flex items-center justify-center gap-2", className)}
    >
      {links.map(({ key, href, icon: Icon, label }) => (
        <a
          key={key}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="p-2 rounded-full hover:bg-muted transition-[background-color,transform] duration-150 ease-out hover:scale-110 active:scale-95 active:duration-75"
          onClick={handleClick}
        >
          <Icon className="w-4 h-4" aria-hidden="true" />
        </a>
      ))}
    </nav>
  );
}
