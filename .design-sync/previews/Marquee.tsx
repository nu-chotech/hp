import { Marquee } from "hp";
import { useLayoutEffect, useRef } from "react";
import geekProject from "../../public/images/partners/geek-project.png";
import karabinerInc from "../../public/images/partners/karabiner-inc.png";
import nBarco from "../../public/images/partners/n-barco.png";
import nfec from "../../public/images/partners/nfec.png";
import progatePath from "../../public/images/partners/progate-path.png";

/**
 * Marquee band（§6.9）。内容は content/marquee.ts が partners.ts から生成する
 * （✳ PARTNERS ✳ に続いて団体ロゴ 5 つ）ので、props は className だけ。
 *
 * ロゴは `/images/partners/<slug>.png` を next/image（shim）で読むが、バンドルの
 * PUBLIC_ASSETS には mark.svg しか無く、そのままだと shim が img を隠して
 * placeholder の枠だけが残る。ここでは同じ png（各 100KB 未満）を data URL で import し、
 * 描かれた img の src を差し替える — プレビュー専用の細工で、部品自体は触らない。
 *
 * トラックは CSS keyframes で 40px/s に流れる。カードは静止画なので、hover / 画面外と
 * 同じ「止まっている」状態（t=0、先頭の ✳ から）を撮る。
 */
const LOGOS: Record<string, string> = {
  "/images/partners/geek-project.png": geekProject,
  "/images/partners/karabiner-inc.png": karabinerInc,
  "/images/partners/n-barco.png": nBarco,
  "/images/partners/nfec.png": nfec,
  "/images/partners/progate-path.png": progatePath,
};

function WithLogos({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;

    const patch = () => {
      // src がまだ /images/… のものだけ差し替える（data: に替えた後は触らない）
      for (const img of root.querySelectorAll<HTMLImageElement>(
        'img[src^="/images/partners/"]',
      )) {
        const data = LOGOS[img.getAttribute("src") ?? ""];
        if (data) img.src = data;
      }
      // 差し替え前に 404 を踏んで shim が隠したものは戻す
      for (const img of root.querySelectorAll<HTMLImageElement>(
        'img[src^="data:"]',
      )) {
        if (img.style.visibility) img.style.visibility = "";
      }
    };

    patch();
    // トラックは描画前（layout effect）に止める = 読み込んだ瞬間（t=0）の並び。
    // hover / 画面外で止まるのと同じ状態で、流れている途中では先頭の ✳ が写らない
    root
      .querySelector<HTMLElement>(".marquee__track")
      ?.style.setProperty("animation-play-state", "paused");
    // 複製数（copies）は JS が測ってから増えるので、後から足された img も拾う
    const observer = new MutationObserver(patch);
    observer.observe(root, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["src", "style"],
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={style}>
      {children}
    </div>
  );
}

/** Hero 直下の帯。上下 2px 罫、面は logo-ground（白、U-33）。✳ PARTNERS ✳ のあとにロゴ列（U-32） */
export const Default = () => (
  <WithLogos>
    <Marquee />
  </WithLogos>
);

/**
 * 狭い幅（Mobile 相当）。グループ 1 つ（約 900px）がビューより長いので、
 * ロゴ列の途中で右端がクリップされる — 帯は full-bleed で、端は viewport の端
 */
export const Narrow = () => (
  <WithLogos style={{ maxWidth: "24rem" }}>
    <Marquee />
  </WithLogos>
);
