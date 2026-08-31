"use client";

import { motion } from "motion/react";
import { type RevealOptions, reveal } from "@/lib/motion-variants";
import { cn } from "@/lib/utils";

interface MemberAvatarProps extends RevealOptions {
  name: string;
  size?: "sm" | "lg";
  className?: string;
}

const sizeClassName = {
  sm: "w-16 h-16 text-xl",
  lg: "w-20 h-20 text-2xl",
} as const;

/**
 * 名前の頭文字を使ったプレースホルダーアバター
 * 隣に名前が必ず表示されるので、読み上げ対象からは外す
 */
export function MemberAvatar({
  name,
  size = "sm",
  className,
  delay,
  on,
}: MemberAvatarProps) {
  return (
    <motion.div
      aria-hidden="true"
      className={cn(
        "mx-auto rounded-full bg-muted flex items-center justify-center font-bold",
        sizeClassName[size],
        className,
      )}
      {...reveal("popIn", { delay, on })}
    >
      {name.charAt(0)}
    </motion.div>
  );
}
