import { Message, Typing } from "hp";
import case03 from "../../public/images/personas/case-03.svg";

/**
 * Typing は `<li>`。ラベルは持たず、3 点の明滅だけで「入力中」を伝える（§6.12.3）。
 * ドットは CSS keyframes で動くので、静止画では 3 点のどこかの明るさの瞬間が写る。
 */
function Thread({ children }: { children: React.ReactNode }) {
  return (
    <ul className="flex flex-col gap-stack-xs" style={{ maxWidth: "24rem" }}>
      {children}
    </ul>
  );
}

/** 入力中バブル。相手側なので吹き出しの左端にインデントし、テールは左下 */
export const Default = () => (
  <Thread>
    <Typing />
  </Thread>
);

/** 発言のあとに続く形（スレッドの末尾、content/about.ts）。avatar は付かず、吹き出しの左端だけ揃う */
export const AfterMessage = () => (
  <Thread>
    <Message
      side="incoming"
      avatar={case03}
      message="こんなやり方もあるよ！"
    />
    <Typing />
  </Thread>
);
