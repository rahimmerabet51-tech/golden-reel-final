import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Video Background Overlay */}
      <div className="absolute inset-0 z-10 bg-black/50" />
      
      {/* Background Video or Image Placeholder */}
      <div className="absolute inset-0 z-0">
        {/* Using an Unsplash image as fallback/placeholder for video to ensure visual fidelity without large assets */}
        {/* dark moody cinematic camera lens */}
        <img 
          src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2564&auto=format&fit=crop"
          alt="Cinematic Background"
          className="w-full h-full object-cover"
        />
        {/* In production, replace <img> with: 
        <video autoPlay loop muted playsInline className="w-full h-full object-cover">
          <source src="/hero-video.mp4" type="video/mp4" />
        </video> 
        */}
      </div>

      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block py-1 px-3 border border-primary/50 text-primary text-sm tracking-[0.2em] uppercase mb-6 bg-black/30 backdrop-blur-sm">
            Algeria's Premier Production
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-6 leading-tight">
            Turning Moments into<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-200 to-primary">
              Cinematic Memories
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            Weddings, Events, Corporate & Commercial Visuals. Specialized in premium cinematic storytelling for elite clients in Algeria.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Button 
              size="lg"
              className="bg-primary text-black hover:bg-primary/90 text-lg px-8 py-6 rounded-none min-w-[200px]"
              onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })}
            >
              View Portfolio
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 hover:text-white hover:border-white text-lg px-8 py-6 rounded-none min-w-[200px]"
              onClick={() => window.open("https://wa.me/213000000000", "_blank")}
            >
              Contact via WhatsApp
            </Button>
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 cursor-pointer text-white/50 hover:text-primary transition-colors"
        onClick={scrollToAbout}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ChevronDown size={24} />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
