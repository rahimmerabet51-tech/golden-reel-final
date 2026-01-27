import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export function About() {
  return (
    <section id="about" className="py-24 bg-dark-bg border-y border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative z-10 border border-primary/20 p-2 aspect-[3/4] overflow-hidden rounded-lg">
              <img 
                src="/attached_assets/rahimgold2.jpeg"
                alt="Rahim Merabet - Professional Videographer & Photographer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-black/70 backdrop-blur-sm p-4 border border-primary/30">
                  <p className="text-primary text-sm font-semibold mb-1">Rahim Merabet</p>
                  <p className="text-white/80 text-sm">Cinematic Visual Storyteller</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary uppercase tracking-[0.2em] text-sm font-semibold mb-4 block">
              Rahim Merabet
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight">
              Professional Videographer & Photographer
            </h2>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              Rahim Merabet is a professional Videographer & Photographer based in Algiers. Currently Audiovisual Specialist at Laboratoires Merinal, he has collaborated with major brands like La Vache Qui Rit and musical groups like El Dey.
            </p>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              With 5+ years of experience and over 100 completed projects, I specialize in high-end cinematic production for clients who demand excellence. My work is defined by professionalism, trust, and a commitment to capturing the essence of luxury in every frame.
            </p>

            <div className="space-y-4">
              {[
                "5+ Years Experience",
                "100+ Projects Completed",
                "Sony A7S III, DJI RS3, Mavic 3 Pro",
                "4K Cinema Quality Production"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="text-primary w-5 h-5" />
                  <span className="text-white/90">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
