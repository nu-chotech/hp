"use client";

import { useEffect, useRef, useState } from "react";
import { ImageSlot } from "@/components/ui/image-slot";
import { useMotionPlaying } from "@/hooks/use-motion-switch";
import { motionVar, photoSlides } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * 活動の様子（§6.11.5 / DECISION U-18）
 *
 * 複数枚を横にスライドさせて回す。「いろいろやっている」は 1 枚の代表写真では
 * 出ない — Talk Day と Hackathon と勉強会が同じ枠に並んで初めて伝わる。
 *
 * 末尾に先頭の複製を 1 枚置き、そこまで送ったらトランジション無しで 0 に戻す。
 * 逆回しの掃引を見せないための定石で、これが無いと「最後まで来たら巻き戻る」
 * という、送りとは別の運動がもう 1 つ生まれてしまう。
 *
 * トラックは装飾（`aria-hidden`）。活動の情報は Activities 節が本文として持つ。
 */

export interface PhotoSlide {
  /** 制作中の目印。実素材が入ったら渡さない（§6.19） */
  label?: string;
  /** 実素材。src と alt は必ず対（§8.6）。写真は装飾なので alt は "" */
  src?: string;
  alt?: string;
}

export interface PhotoSlidesProps {
  photos: readonly PhotoSlide[];
  className?: string;
  /** ファーストビューの直下なので既定は eager（遅れて入ると行が動く） */
  priority?: boolean;
}

export function PhotoSlides({
  photos,
  className,
  priority = true,
}: PhotoSlidesProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const playing = useMotionPlaying();
  /** セルが画面内 かつ タブが前面（§7.5「バックグラウンド / 非可視」） */
  const [awake, setAwake] = useState(false);
  const [index, setIndex] = useState(0);
  /** 複製から先頭へ飛ぶ 1 フレームだけトランジションを切る */
  const [snapping, setSnapping] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let onScreen = false;
    const sync = () => setAwake(onScreen && !document.hidden);
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) onScreen = entry.isIntersecting;
      sync();
    });

    observer.observe(root);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  useEffect(() => {
    // 止まっているときは先頭の 1 枚（§7.5）。空の枠で止めない
    if (!playing) {
      setIndex(0);
      return;
    }
    if (!awake) return;

    const timer = setInterval(() => {
      // 複製（= photos.length）まで来ていたら、既に 0 へ飛んだ後なので 1 へ
      setIndex((i) => (i >= photos.length ? 1 : i + 1));
    }, photoSlides.stepMs);
    return () => clearInterval(timer);
  }, [playing, awake, photos.length]);

  // 切ったトランジションは次のフレームで戻す。同じ描画で戻すと切れない
  useEffect(() => {
    if (!snapping) return;
    const frame = requestAnimationFrame(() => setSnapping(false));
    return () => cancelAnimationFrame(frame);
  }, [snapping]);

  /** 先頭の複製を末尾に置く。送り切った位置と先頭が同じ絵になる */
  const slides = [...photos, photos[0]];

  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative aspect-16/9 overflow-hidden bg-image-placeholder",
        "desktop:aspect-auto desktop:flex-1",
        className,
      )}
      ref={rootRef}
    >
      {/*
        translateX の % はトラック自身の幅（= 枠幅）に対して解決するので、
        子が枠からはみ出していても 1 枚ぶんちょうど動く。
      */}
      <div
        className="flex size-full"
        onTransitionEnd={() => {
          if (index !== photos.length) return;
          setSnapping(true);
          setIndex(0);
        }}
        style={{
          transform: `translateX(-${index * 100}%)`,
          transition: snapping
            ? "none"
            : `transform ${motionVar.springDefault}`,
        }}
      >
        {slides.map((photo, i) => (
          <div
            className="size-full shrink-0"
            // 末尾は先頭の複製なので、位置まで含めた鍵でないと衝突する
            key={`${photo.src ?? photo.label ?? "slide"}-${i}`}
          >
            {photo.src ? (
              <ImageSlot
                alt={photo.alt ?? ""}
                priority={priority && i === 0}
                ratio="fill"
                src={photo.src}
              />
            ) : (
              <ImageSlot caption={photo.label} ratio="fill" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
