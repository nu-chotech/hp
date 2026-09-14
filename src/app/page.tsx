import { JoinDialog, joinDialogIds } from "@/components/join/join-dialog";
import { JoinDialogProvider } from "@/components/join/join-dialog-provider";
import { Footer } from "@/components/layout/footer";
import { Marquee } from "@/components/layout/marquee";
import { Nav } from "@/components/layout/nav";
import { SkipLink } from "@/components/layout/skip-link";
import { About } from "@/components/sections/about";
import { Activities } from "@/components/sections/activities";
import { ForYou } from "@/components/sections/for-you";
import { Hero } from "@/components/sections/hero";
import { Members } from "@/components/sections/members";
import { Partners } from "@/components/sections/partners";
import { Poster } from "@/components/sections/poster";

/**
 * ページの並び順（§0.3）
 *
 * インク面のヒーローで始まり、ライムのポスターで閉じる。その間はグラウンド面が続き、
 * 2px の罫線だけが節を区切る。マーキー帯はヒーローとベントの間に挟まる「継ぎ目」で、
 * 前後の面が変わる境目に帯を置くことで、色面の切り替えが唐突に見えないようにしている。
 *
 * 順序そのものが読者への提案になっている: 何をしている人たちか（About）→ 何をするか
 * （Activities）→ あなたはどれか（For You）→ 誰がやっているか（Members）→
 * 支えている人たち（Partners）→ 参加（Poster）。
 *
 * 参加の導線（Nav・Menu・Hero 主・Poster）はすべて 1 つの参加ダイアログ（U-49 / U-54）を開き、
 * 学生であることを確かめてから Discord へ出る。ダイアログの中身はここでサーバ描画し、
 * 開閉だけを Provider（client）が持つ。
 */
export default function Home() {
  return (
    <JoinDialogProvider
      dialog={<JoinDialog />}
      labelledBy={joinDialogIds.title}
      describedBy={joinDialogIds.lead}
    >
      <SkipLink />
      <Nav />
      <main id="main">
        <Hero />
        <Marquee />
        <About />
        <Activities />
        <ForYou />
        <Members />
        <Partners />
        <Poster />
      </main>
      <Footer />
    </JoinDialogProvider>
  );
}
