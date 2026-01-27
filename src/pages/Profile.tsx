import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { About } from "@/components/About";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Mail, Phone, MapPin, Calendar, Award, Camera } from "lucide-react";

export default function Profile() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-dark-bg text-white"
    >
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-black/90"></div>
        
        <div className="relative z-10 px-6 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <span className="inline-block py-1 px-3 border border-primary/50 text-primary text-sm tracking-[0.2em] uppercase mb-6 bg-black/30 backdrop-blur-sm">
                Professional Profile
              </span>
              <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight">
                Rahim<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-200 to-primary">
                  Merabet
                </span>
              </h1>
              <p className="text-lg md:text-xl text-white/80 max-w-2xl mb-10 font-light leading-relaxed">
                Professional Videographer & Photographer based in Algiers. Currently the Audiovisual Specialist at Laboratoires Merinal.
              </p>
              
              <div className="flex flex-col md:flex-row items-center gap-4">
                <Button 
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 border border-primary shadow-lg hover:shadow-xl transition-all duration-300 button-responsive"
                  asChild
                >
                  <Link href="/contact">
                    Get In Touch <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground hover:border-primary shadow-lg hover:shadow-xl transition-all duration-300 button-responsive"
                  asChild
                >
                  <Link href="/">
                    View Portfolio
                  </Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg border border-primary/30">
                <img 
                  src="/rahimgold.jpeg"
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
          </div>
        </div>
      </section>

      {/* Detailed Bio Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-serif font-bold text-white mb-8">
                About <span className="text-primary">Rahim</span>
              </h2>
              <div className="space-y-6 text-white/80 leading-relaxed">
                <p>
                  Professional Videographer & Photographer based in Algiers. Currently the Audiovisual Specialist at Laboratoires Merinal. Expert in event coverage, music videos (El Dey Group), and corporate branding (La Vache Qui Rit).
                </p>
                <p>
                  With over 5 years of experience in visual storytelling, I specialize in capturing the essence of moments through cinematic techniques and artistic vision. My work spans from intimate private events to large-scale commercial productions.
                </p>
                <p>
                  I've had the privilege of working with renowned brands and artists, bringing their stories to life through compelling visual narratives that resonate with audiences across Algeria and beyond.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="bg-black/50 border border-white/10 p-8">
                <h3 className="text-2xl font-serif text-primary mb-6">Experience</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Award className="text-primary w-5 h-5 mt-1" />
                    <div>
                      <h4 className="text-white font-semibold">Audiovisual Specialist</h4>
                      <p className="text-white/60 text-sm">Laboratoires Merinal • Present</p>
                      <p className="text-white/70 text-sm mt-1">Corporate video production, brand content creation</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Camera className="text-primary w-5 h-5 mt-1" />
                    <div>
                      <h4 className="text-white font-semibold">Music Video Director</h4>
                      <p className="text-white/60 text-sm">El Dey Group • 2022-Present</p>
                      <p className="text-white/70 text-sm mt-1">Music video production, live performance coverage</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Calendar className="text-primary w-5 h-5 mt-1" />
                    <div>
                      <h4 className="text-white font-semibold">Freelance Videographer</h4>
                      <p className="text-white/60 text-sm">2019-Present</p>
                      <p className="text-white/70 text-sm mt-1">Weddings, events, commercial projects</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-black/50 border border-white/10 p-8">
                <h3 className="text-2xl font-serif text-primary mb-6">Key Clients</h3>
                <div className="grid grid-cols-2 gap-4 text-white/80">
                  <div>• Laboratoires Merinal</div>
                  <div>• La Vache Qui Rit (Groupe Bel)</div>
                  <div>• El Dey Group</div>
                  <div>• Vivalor</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </motion.div>
  );
}
