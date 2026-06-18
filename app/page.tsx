import { Footer } from "@/components/Footer";
import { HeroVideo } from "@/components/HeroVideo";
import { HighlightsSection } from "@/components/HighlightsSection";
import { Navigation } from "@/components/Navigation";
import { OurHubs } from "@/components/OurHubs";
import { ProgramsSection } from "@/components/ProgramsSection";
import { WhoWeAre } from "@/components/WhoWeAre";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <HeroVideo
          videoSrc="/media/video-banner-dark.mov"
          posterSrc="https://images.unsplash.com/photo-1508973379184-7517410fb0bc?auto=format&fit=crop&w=2400&q=85"
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
