import ReactPlayer from "react-player";
import { SectionHeading } from "./SectionHeading";

export function Portfolio() {
  return (
    <section id="portfolio" className="py-24 bg-secondary/20">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading 
          title="Featured Work"
          subtitle="Portfolio"
        />
        
        <div className='w-full h-full bg-black'>
          <ReactPlayer
            url="/site1.mp4"
            width="100%"
            height="100%"
            controls={true}
            playing={true}
          />
        </div>
      </div>
    </section>
  );
}