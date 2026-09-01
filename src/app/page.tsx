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
 */
export default function Home() {
  return (
    <>
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
    </>
  );
}
