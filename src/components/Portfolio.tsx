import { VideoDisplay } from "./VideoDisplay";
import { SectionHeading } from "./SectionHeading";

export function Portfolio() {
  return (
    <section id="portfolio" className="py-24 bg-secondary/20">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading 
          title="Featured Work"
          subtitle="Portfolio"
        />
        
        <VideoDisplay />
      </div>
    </section>
  );
}
