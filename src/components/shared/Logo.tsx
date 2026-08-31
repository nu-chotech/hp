"use client";

import Image from "next/image";
import { SmoothLink } from "@/components/shared/SmoothLink";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

interface LogoProps {
  /** アイコンの一辺 (px) */
  size?: number;
  className?: string;
}

/**
 * ロゴ。Header と Footer で使い、クリックでページ先頭 (Hero) へ戻る
 */
export function Logo({ size = 40, className }: LogoProps) {
  return (
    <SmoothLink
      href="#hero"
      className={cn("flex items-center gap-3", className)}
    >
      {/* 隣にサイト名が表示されるので、画像自体は読み上げない */}
      <Image
        src="/icon.png"
        alt=""
        width={size}
        height={size}
        className="rounded-lg"
      />
      <span className="flex flex-col">
        <span className="text-xs text-muted-foreground">
          {siteConfig.description}
        </span>
        <span className="font-bold text-lg leading-tight">
          {siteConfig.name}
        </span>
      </span>
    </SmoothLink>
  );
}
