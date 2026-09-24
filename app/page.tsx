import { Footer } from "@/components/Footer";
import { HeroVideo } from "@/components/HeroVideo";
import { HighlightsSection } from "@/components/HighlightsSection";
import { Navigation } from "@/components/Navigation";
import { OurHubs } from "@/components/OurHubs";
import { ProgramsSection } from "@/components/ProgramsSection";
import { WhoWeAre } from "@/components/WhoWeAre";
import { getResolvedSiteSettings } from "@/lib/wix/globalConfig";

export default async function Home() {
  const siteSettings = await getResolvedSiteSettings();

  return (
    <>
      <Navigation />
      <main>
        <HeroVideo
          videoSrc={siteSettings.homepageHeroVideo}
          posterSrc="/media/hero-video-poster-optimized.jpg"
          eyebrow={siteSettings.homepageHeroEyebrow}
          headline={siteSettings.homepageHeroHeadline}
          heroStats={siteSettings.heroStats}
        />
        <ProgramsSection />
        <HighlightsSection />
        <WhoWeAre />
        <OurHubs />
      </main>
      <Footer />
    </>
  );
}
