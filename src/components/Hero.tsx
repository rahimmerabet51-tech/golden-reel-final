import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

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
            transition={{ duration: 0.8, delay: 0.8 }}
            className="inline-block py-2 px-4 border border-white/30 text-white text-xs md:text-sm tracking-[0.3em] uppercase mb-6 md:mb-8 bg-black/30 backdrop-blur-sm"
          >
            DESIGN & DÉVELOPPEMENT CINÉMATIQUE
          </motion.span>
          <h1 className="heading-responsive font-serif font-bold text-white mb-6 md:mb-8 leading-tight">
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              L'art du mouvement
            </motion.span>
            <br />
            <motion.span 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-white"
            >
              numérique.
            </motion.span>
          </h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="text-responsive text-white/80 max-w-2xl mx-auto mb-8 md:mb-10 font-light leading-relaxed"
          >
            Création d'expériences visuelles cinématiques de luxe pour les marques d'élite. 
            Spécialisés en production numérique haut de gamme à Alger.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button 
              size="lg"
              className="bg-white text-black hover:bg-gray-100 border border-white shadow-lg hover:shadow-xl transition-all duration-300 button-responsive font-light tracking-wide"
              onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })}
            >
              Voir Portfolio
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black hover:border-white shadow-lg hover:shadow-xl transition-all duration-300 button-responsive font-light tracking-wide"
              onClick={() => window.open("https://wa.me/213000000000", "_blank")}
            >
              Contactez-nous
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
