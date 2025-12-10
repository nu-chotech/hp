import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { AboutSection } from "@/components/sections/AboutSection";
import { ActivitiesSection } from "@/components/sections/ActivitiesSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { MembersSection } from "@/components/sections/MembersSection";
import { NewsSection } from "@/components/sections/NewsSection";
import { RecruitSection } from "@/components/sections/RecruitSection";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ActivitiesSection />
        <NewsSection />
        <MembersSection />
        <RecruitSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
