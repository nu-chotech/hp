"use client";

import {
  type ComponentProps,
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";

/**
 * 参加ダイアログの対話部分（§6.21、DECISION U-49）
 *
 * 「参加する」の 4 本（Nav・Menu・Hero 主・Poster）はどれも同じ Discord へ出るので、
 * ダイアログは 1 つだけをページの根に置き、トリガーは context の open() を呼ぶ。
 * 実体は素の <dialog> + showModal(): 幕・最上層・背後の inert・Escape・フォーカスの
 * 往復（閉じたら押した要素へ戻る）をブラウザが持つので、ライブラリを足さない。
 * 中身（題・導入・ボタン）はサーバで描いたものを `dialog` として受け取る —
 * nav.tsx と同じ理由で、Button を丸ごとクライアントチャンクに乗せないため。
 *
 * 開閉の動きは reveal と同じ語彙（opacity + y 16、spring/quick）。閉じる側は
 * display / overlay の discrete transition で、幕とともにフェードで消える。
 * globals.css の reduced-motion 側が `.join-dialog { transform: none; transition: opacity … }`
 * で上書きする契約なので、:where() の詳細度 0 で置く（Mobile メニューと同じ）。
 */
const JoinDialogContext = createContext<() => void>(() => {});

export function useJoinDialog() {
  return useContext(JoinDialogContext);
}

export interface JoinDialogProviderProps {
  children: ReactNode;
  /** サーバで描いたダイアログの中身 */
  dialog: ReactNode;
  /** 見出しの id（aria-labelledby） */
  labelledBy: string;
  /** 説明の id（aria-describedby）。空白区切りで複数可 */
  describedBy: string;
}

export function JoinDialogProvider({
  children,
  dialog,
  labelledBy,
  describedBy,
}: JoinDialogProviderProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const open = useCallback(() => {
    ref.current?.showModal();
  }, []);

  // 幕のクリックで閉じる（閉じるボタンと同じ結果）。中身は inset を持つ内側の div が
  // 受けるので、target が dialog 自身なら幕。参加リンクを踏んだら閉じる — 新しいタブへ
  // 出た後にこのページへ戻ったとき、幕が残っていると「もう一度参加」を迫って見える。
  // Escape は dialog の既定で閉じるが、document で Escape を聞いている Mobile メニュー
  // まで畳まないよう伝播を止める（フォーカスは押した CTA へ戻り、メニューは開いたまま）。
  // JSX の onClick だと dialog が「対話的な静的要素」になるので、DOM に直接張る（nav-bar と同じ）
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;

    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      if (target === dialog || target?.closest?.("a[href]")) dialog.close();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") event.stopPropagation();
    };

    dialog.addEventListener("click", onClick);
    dialog.addEventListener("keydown", onKeyDown);
    return () => {
      dialog.removeEventListener("click", onClick);
      dialog.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <JoinDialogContext value={open}>
      {children}
      {/* precedence 付きなので React 19 が <head> へ巻き上げる（nav-bar と同じ） */}
      <style href="join-dialog" precedence="components">{`
:where(.join-dialog){opacity:0;transform:translateY(var(--reveal-y));transition:opacity var(--spring-quick),transform var(--spring-quick),display var(--spring-quick) allow-discrete,overlay var(--spring-quick) allow-discrete}
:where(.join-dialog[open]){opacity:1;transform:none}
@starting-style{:where(.join-dialog[open]){opacity:0;transform:translateY(var(--reveal-y))}}
:where(.join-dialog)::backdrop{opacity:0;transition:opacity var(--spring-quick),display var(--spring-quick) allow-discrete,overlay var(--spring-quick) allow-discrete}
:where(.join-dialog[open])::backdrop{opacity:1}
@starting-style{:where(.join-dialog[open])::backdrop{opacity:0}}`}</style>
      {/* 罫線グリッドのセル 1 枚を紙から持ち上げた形（§6.21）: ground の面、角丸なし、
          影は shadow/lg（ページで唯一の影。必ず幕 backdrop と組む、§4.4）。
          幅は container と同じ「viewport − 2 × page/inset」を size/dialog 480 で止め、
          高さが足りない画面（横向きの電話）では中でスクロールする。
          UA の padding 1em / border / Canvas 色は打ち消す（preflight は dialog を触らない） */}
      <dialog
        ref={ref}
        aria-labelledby={labelledBy}
        aria-describedby={describedBy}
        className="join-dialog fixed inset-0 m-auto w-[calc(100%_-_2_*_var(--page-inset))] max-w-dialog max-h-[calc(100%_-_2_*_var(--page-inset))] overflow-y-auto overscroll-contain border-0 bg-ground p-0 text-ink shadow-lg backdrop:bg-backdrop forced-colors:border"
      >
        {dialog}
      </dialog>
    </JoinDialogContext>
  );
}

export type JoinTriggerProps = Omit<
  ComponentProps<"button">,
  "type" | "onClick"
>;

/**
 * ダイアログを開くボタン（Nav・Menu・Hero 主・Poster の「参加する」）
 *
 * Button の asChild の子として使う。Slot が渡す className などは先に展開し、
 * type / haspopup / onClick はこの部品が最後に決める（Slot は onClick を undefined で
 * 渡してくるので、後に置くと open が消える）。
 * 行き先は外部だが、出る前に学生であることの確認を挟むので、押した瞬間に新しいタブは開かない —
 * 「（外部、新しいタブで開く）」の注記はダイアログの参加リンクが持つ。
 */
export function JoinTrigger({ children, ...props }: JoinTriggerProps) {
  const open = useJoinDialog();
  return (
    <button {...props} type="button" aria-haspopup="dialog" onClick={open}>
      {children}
    </button>
  );
}
