import { Section, SectionHeading } from "hp";

/** ground 面の既定: 上 2px 罫、罫線の上 80・下 64（L-4 / L-5）。見出し → 導入文の順で置く */
export const Ground = () => (
  <Section aria-labelledby="preview-activities">
    <SectionHeading
      title="活動内容"
      label="ACTIVITY"
      titleId="preview-activities"
      spacing="intro"
    />
    <p className="max-w-measure text-body-m text-ink-secondary">
      1人5分の短い発表で、最近学んだこと・作ったもの簡単に共有。発表経験ゼロでもOK、聞くだけ参加も大歓迎。
    </p>
  </Section>
);

/** 直前が罫線で終わる帯（マーキーの下罫）に続くときは rule={false}（§3.9）。リズムは同じ */
export const NoRule = () => (
  <Section rule={false} aria-labelledby="preview-partners">
    <SectionHeading
      title="パートナー"
      label="PARTNERS"
      titleId="preview-partners"
      spacing="intro"
    />
    <p className="max-w-measure text-body-m text-ink-secondary">
      ChoTechの活動を支えてくださる企業・団体の皆さまをご紹介します。
    </p>
  </Section>
);

/** インク面（Hero）。色の切替が境界なので罫線は重ねず、リズムは display（96 / 96）。SectionHeading は ground 専用なので使わない */
export const Ink = () => (
  <Section surface="ink" aria-label="Hero">
    <p className="text-balance text-title-1 text-inverse-ink">長崎にテック好きのためのハブを。</p>
    <p className="mt-stack-xs max-w-measure whitespace-pre-line text-body-l text-inverse-ink-secondary">
      {"ChoTech（チョーテック）は長崎大学公認の学生テックコミュニティです。\nものづくりに少しでも興味があれば、大学・学部・学科を問わず、誰でも参加することができます。"}
    </p>
  </Section>
);

/** ポスター面（Join）。インク面と同じ暗さ（C-30）、文は poster/ink、句点だけ poster/display（U-51） */
export const Poster = () => (
  <Section surface="poster" aria-labelledby="preview-join">
    <p className="text-overline text-poster-ink-secondary">JOIN US</p>
    <h2
      id="preview-join"
      className="mt-stack-md whitespace-pre-line text-wrap text-display-l text-poster-ink"
    >
      {"Hack\nYour Limits"}
      <span className="text-poster-display">.</span>
    </h2>
    <p className="mt-stack-lg max-w-measure text-body-m text-poster-ink-secondary">
      最初は誰でも初心者。学びたい、挑戦したい、仲間を作りたい。そう思ったら最初の一歩を踏み出してみよう。ChoTechは、あなたのチャレンジする気持ちを応援します。
    </p>
  </Section>
);

/** ground 面でも rhythm="display" にできる（色面のない帯に 96 / 96 を使うとき） */
export const GroundDisplay = () => (
  <Section rhythm="display" aria-labelledby="preview-members">
    <SectionHeading
      title="運営メンバー"
      label="MEMBERS"
      titleId="preview-members"
      spacing="intro"
    />
    <p className="max-w-measure text-body-m text-ink-secondary">
      エンジニアもデザイナーもサイエンティストも。対面活動も、Discordでのオンライン交流も活発。
    </p>
  </Section>
);
