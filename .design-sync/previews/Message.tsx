import { Message } from "hp";
import case03 from "../../public/images/personas/case-03.svg";
import case04 from "../../public/images/personas/case-04.svg";

/**
 * Message は `<ul>` の 1 行（`<li>`）。ChatThread と同じ `flex flex-col gap-stack-xs` の
 * リストに置く。吹き出しの max-width は行の 80% なので、行の幅はここで決める。
 */
function Thread({
  children,
  width = "24rem",
}: {
  children: React.ReactNode;
  width?: string;
}) {
  return (
    <ul className="flex flex-col gap-stack-xs" style={{ maxWidth: width }}>
      {children}
    </ul>
  );
}

/** 相手側: avatar 24 を吹き出しの下端に揃え、surface の上に ink。テールは左下（§6.12.1） */
export const Incoming = () => (
  <Thread>
    <Message
      side="incoming"
      avatar={case04}
      message="ハッカソン誰か一緒に出ない？"
    />
  </Thread>
);

/** 自分側: avatar を持たず右寄せ。accent-fill の上に白、テールは右下（C-30） */
export const Outgoing = () => (
  <Thread>
    <Message side="outgoing" message="私もそれ興味ある！" />
  </Thread>
);

/** 往復。左右の寄せ・文字色・avatar の有無が冗長に話者を運ぶ（content/about.ts のスレッド） */
export const Exchange = () => (
  <Thread>
    <Message
      side="incoming"
      avatar={case04}
      message="ハッカソン誰か一緒に出ない？"
    />
    <Message side="outgoing" message="私もそれ興味ある！" />
    <Message
      side="incoming"
      avatar={case03}
      message="こんなやり方もあるよ！"
    />
    <Message side="outgoing" message="UIは私がやりたい！" />
  </Thread>
);

/** 狭い行（Mobile のセル幅相当）。吹き出しは行の 80% で折り返し、テールは行の枠内に収まる */
export const Narrow = () => (
  <Thread width="14rem">
    <Message
      side="incoming"
      avatar={case04}
      message="ハッカソン誰か一緒に出ない？"
    />
    <Message side="outgoing" message="私もそれ興味ある！" />
  </Thread>
);
