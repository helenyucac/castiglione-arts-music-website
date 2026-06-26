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
          posterSrc={
            siteSettings.homepageHeroFallbackImage ??
            "https://images.unsplash.com/photo-1508973379184-7517410fb0bc?auto=format&fit=crop&w=2400&q=85"
          }
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
