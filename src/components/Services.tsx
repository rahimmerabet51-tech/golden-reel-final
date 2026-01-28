import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { Camera, Film, Mic2, MonitorPlay } from "lucide-react";
import { useServices } from "@/hooks/use-portfolio";

// Mock services if API empty
const mockServices = [
  { id: 1, title: "Videography", description: "Professional video production services including weddings, events, corporate films, and commercials. Capturing your story with cinematic quality.", priceRange: "À partir de 50 000 DA" },
  { id: 2, title: "Photography", description: "Stunning photography services for portraits, events, products, and architectural projects. Creating timeless images that tell your story.", priceRange: "À partir de 50 000 DA" },
  { id: 3, title: "Post-Production", description: "Professional editing, color grading, and visual effects. Transform your raw footage into polished, compelling visual content.", priceRange: "Sur Devis" },
  { id: 4, title: "Aerial Photography", description: "Drone and aerial cinematography for breathtaking perspectives. Perfect for real estate, events, and establishing shots.", priceRange: "Sur Devis" },
];

export function Services() {
  const { data: services = [] } = useServices();
  const displayServices = services.length > 0 ? services : mockServices;

  const icons = [Camera, Film, Mic2, MonitorPlay];

  return (
    <section id="services" className="py-24 bg-background relative">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading title="Services & Investment" subtitle="What We Offer" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayServices.map((service: any, idx: number) => {
            const Icon = icons[idx % icons.length];
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="group relative p-8 border border-white/5 bg-secondary/10 hover:bg-secondary/20 transition-all duration-500 overflow-hidden"
              >
                {/* Hover gold gradient line */}
                <div className="absolute top-0 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-500" />
                
                <div className="flex items-start justify-between mb-6">
                  <div className="p-3 bg-white/5 rounded-none group-hover:bg-primary/20 transition-colors duration-300">
                    <Icon className="w-8 h-8 text-white group-hover:text-primary transition-colors duration-300" />
                  </div>
                  <span className="text-sm font-mono text-white/40 border border-white/10 px-3 py-1">
                    0{idx + 1}
                  </span>
                </div>

                <h3 className="text-2xl font-serif text-white mb-4 group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-white/60 mb-6 leading-relaxed">
                  {service.description}
                </p>

                <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                  <span className="text-[#D4AF37] font-medium">
                    {service.priceRange || "Sur Devis"}
                  </span>
                  <a href="#contact" className="text-xs uppercase tracking-widest text-white/50 hover:text-white transition-colors">
                    DEMANDER UN DEVIS &rarr;
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
