import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export function Hero() {
  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2564&auto=format&fit=crop"
          alt="Cinematic Background"
          className="w-full h-full object-cover bg-cover bg-center"
        />
        {/* Dark overlay for text contrast */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative z-20 text-center container-responsive">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-6 sm:mb-8"
          >
            <span className="inline-block py-1 px-3 sm:py-2 sm:px-4 border border-primary/50 text-primary text-xs sm:text-sm tracking-[0.2em] uppercase mb-4 sm:mb-6 bg-black/30 backdrop-blur-sm">
              Visual Storyteller & Filmmaker
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="hero-title-responsive font-display font-black text-white mb-4 sm:mb-6 leading-tight"
          >
            Crafting Visual
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-200 to-primary block sm:inline">
              {" "}Stories
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="hero-subtitle-responsive text-white/80 max-w-2xl mx-auto mb-6 sm:mb-8 font-light leading-relaxed padding-responsive-x"
          >
            Transforming moments into cinematic experiences through the art of visual storytelling. 
            From intimate weddings to grand corporate productions.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          >
            <Button 
              size="lg"
              className="button-responsive-lg bg-primary text-primary-foreground hover:bg-primary/90 border border-primary shadow-lg hover:shadow-xl transition-all duration-300 font-light tracking-wide touch-target"
              asChild
            >
              <Link href="/featured-works">
                Voir Portfolio
              </Link>
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="button-responsive-lg border-white text-white hover:bg-white hover:text-black hover:border-white shadow-lg hover:shadow-xl transition-all duration-300 font-light tracking-wide touch-target"
              asChild
            >
              <Link href="/contact">
                Contactez-nous
              </Link>
            </Button>
          </motion.div>
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
