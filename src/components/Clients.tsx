import { motion } from "framer-motion";

// Mock logos - representing high-end Algerian and international brands
const brands = [
  "Laboratoires Merinal", "La Vache Qui Rit (Groupe Bel)", "El Dey Group", "Vivalor"
];

export function Clients() {
  return (
    <section id="clients" className="py-20 bg-black border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 mb-10 text-center">
        <p className="uppercase tracking-[0.3em] text-xs text-white/40">Trusted by world-class brands</p>
      </div>
      
      <div className="relative flex overflow-hidden group">
        <div className="flex animate-loop-scroll group-hover:paused whitespace-nowrap">
          {/* First set */}
          {brands.map((brand, i) => (
            <div key={`a-${i}`} className="mx-12 md:mx-20 flex items-center justify-center opacity-40 hover:opacity-100 transition-opacity duration-300 grayscale cursor-default">
              <span className="text-3xl md:text-4xl font-serif font-bold text-white">{brand}</span>
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {brands.map((brand, i) => (
            <div key={`b-${i}`} className="mx-12 md:mx-20 flex items-center justify-center opacity-40 hover:opacity-100 transition-opacity duration-300 grayscale cursor-default">
              <span className="text-3xl md:text-4xl font-serif font-bold text-white">{brand}</span>
            </div>
          ))}
        </div>
        
        {/* Gradients to fade edges */}
        <div className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-black to-transparent z-10" />
      </div>
    </section>
  );
}
