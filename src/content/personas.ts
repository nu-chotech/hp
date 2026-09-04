export interface Persona {
  /** Case 01 … 06。連番はここだけに残る（DECISION U-4） */
  caseNo: string;
  title: string;
  /** 一人称の声。鉤括弧はコンテンツ側に持つ（§6.14） */
  quote: string;
  /** 次の一歩。先頭に arrow-right を添える */
  recommendation: string;
  /**
   * 円のイラスト（径 96）。無い間は placeholder のアイコンが出る（§6.19）。
   * 実在の運営ではなく**人物像**なので、素材は顔の判別より「誰かの顔がある」
   * ことだけを担う。alt は persona-card 側が空で固定する（§8.6）。
   *
   * NOTE: 実体は public/images/personas/ のプレースホルダ（Unsplash 由来、192×192 = 径 96 の DPR 2）。
   * 差し替えは同名で上書きするか、この 1 行。
   */
  photo?: string;
}

/**
 * こんな人に、おすすめ（§6.14）
 *
 * 「誰に向けたものか」を人物像で示す節。カードはリンクではない。
 */
export const personasContent = {
  heading: { title: "こんな人に、おすすめ。", label: "FOR YOU" },
  personas: [
    {
      caseNo: "Case 01",
      title: "これから始めたい人",
      quote: "「プログラミング、何から始めればいいか分からない…」",
      recommendation: "Dev Dayで一緒に手を動かそう",
      photo: "/images/personas/case-01.jpg",
    },
    {
      caseNo: "Case 02",
      title: "開発が好きなエンジニア",
      quote: "「個人開発、一人だと続かないんだよね」",
      recommendation: "Projectで仲間と作り切ろう",
      photo: "/images/personas/case-02.jpg",
    },
    {
      caseNo: "Case 03",
      title: "UI/UXが好きな人",
      quote: "「デザインの話ができる仲間がほしい」",
      recommendation: "ProjectでアプリのUIを担当しよう",
      photo: "/images/personas/case-03.jpg",
    },
    {
      caseNo: "Case 04",
      title: "ハッカソンに出たい人",
      quote: "「出たいけど、チームメイトが見つからない」",
      recommendation: "Discordで一声かければ集まります",
      photo: "/images/personas/case-04.jpg",
    },
    {
      caseNo: "Case 05",
      title: "研究の話をしたい人",
      quote: "「自分の研究、誰かに聞いてほしい」",
      recommendation: "Talk Dayのテーマは技術も研究もOK",
      photo: "/images/personas/case-05.jpg",
    },
    {
      caseNo: "Case 06",
      title: "発信してみたい人",
      quote: "「LT、一回やってみたいかも」",
      recommendation: "Talk Dayは5分・経験ゼロでOK",
      photo: "/images/personas/case-06.jpg",
    },
  ] satisfies Persona[],
} as const;
