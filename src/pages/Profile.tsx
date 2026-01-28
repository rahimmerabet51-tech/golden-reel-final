import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Mail, Phone, MapPin, Camera, Video, Calendar, Award } from "lucide-react";

export default function Profile() {
  const services = [
    {
      icon: Camera,
      title: "Photographie de Mariage",
      description: "Capturer les moments précieux de votre journée spéciale avec une élégance cinématique."
    },
    {
      icon: Video,
      title: "Production Vidéo",
      description: "Création de vidéos professionnelles pour les entreprises, les artistes et les événements."
    },
    {
      icon: Calendar,
      title: "Événements Corporatifs",
      description: "Couverture complète de vos événements d'entreprise avec une approche cinématographique."
    }
  ];

  const featuredWorks = [
    { id: 1, title: "Mariage Luxury", category: "Mariage", image: "/images/wedding-1.jpg" },
    { id: 2, title: "Corporate Merinal", category: "Corporate", image: "/images/corporate-1.jpg" },
    { id: 3, title: "El Dey Music Video", category: "Musique", image: "/images/music-1.jpg" },
    { id: 4, title: "Event Vivalor", category: "Événement", image: "/images/event-1.jpg" },
    { id: 5, title: "Portrait Artistique", category: "Portrait", image: "/images/portrait-1.jpg" },
    { id: 6, title: "Documentaire Alger", category: "Documentaire", image: "/images/doc-1.jpg" }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-black text-white"
    >
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Gold smoke background image */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)),
              url('/bbb.jpg')
            `,
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>
        
        {/* Additional gold accent overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#D4AF37]/5 via-transparent to-[#D4AF37]/10"></div>
        
        <div className="relative z-10 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
            {/* Text Content - 3 columns (60%) */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-3"
            >
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="inline-block py-2 px-4 border border-white/30 text-white text-xs md:text-sm tracking-[0.3em] uppercase mb-6 md:mb-8 bg-black/30 backdrop-blur-sm"
              >
                VISUAL STORYTELLER & FILMMAKER
              </motion.span>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="heading-responsive font-display font-black text-white mb-6 md:mb-8 leading-tight"
              >
                Rahim<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-white">
                  Merabet
                </span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-responsive text-slate-200 max-w-2xl mb-8 md:mb-10 leading-relaxed"
              >
                Artiste visuel basé à Alger, passionné par la narration cinématographique. 
                Spécialisé dans la capture de moments authentiques à travers une approche 
                artistique et technique qui transforme chaque événement en une œuvre d'art mémorable.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-col sm:flex-row items-center gap-4"
              >
                <Button 
                  size="lg"
                  className="bg-primary text-black hover:bg-primary/90 font-display font-bold border border-primary shadow-lg hover:shadow-xl transition-all duration-300 button-responsive"
                  asChild
                >
                  <Link href="/contact">
                    Contactez-moi <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-black font-display font-bold shadow-lg hover:shadow-xl transition-all duration-300 button-responsive"
                  asChild
                >
                  <Link href="/featured-works">
                    Voir Portfolio
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            {/* Image - 2 columns (40%) */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative lg:max-w-lg mx-auto lg:col-span-2"
            >
              {/* Gold glow backdrop that blends with background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/20 via-transparent to-[#D4AF37]/10 rounded-lg blur-xl"></div>
              
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg border-2 border-[#D4AF37] shadow-xl shadow-[#D4AF37]/20">
                <img 
                  src="/images/rahim-profile.jpg"
                  alt="Rahim Merabet - Visual Storyteller & Filmmaker"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/rahimgold.jpeg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-black/80 backdrop-blur-sm p-4 border border-[#D4AF37]/50">
                    <p className="text-[#D4AF37] text-sm font-display font-bold mb-1">Rahim Merabet</p>
                    <p className="text-white/80 text-sm">Visual Storyteller & Filmmaker</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="py-20 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="inline-block py-1 px-3 border border-primary/50 text-primary text-xs tracking-[0.2em] uppercase mb-4">
              À PROPOS
            </span>
            <h2 className="heading-responsive font-display font-black text-white mb-6">
              Passionné par <span className="text-primary">l'Art Visuel</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="space-y-6 text-slate-200 leading-relaxed">
                <p className="text-lg">
                  Rahim Merabet est un photographe et vidéaste professionnel basé à Alger, 
                  dont le travail transcende la simple documentation pour créer des narrations 
                  visuelles émouvantes et cinématiques.
                </p>
                <p className="text-lg">
                  Avec plus de 5 ans d'expérience dans la narration visuelle, il spécialise 
                  dans la capture de l'essence des moments à travers des techniques cinématographiques 
                  et une vision artistique unique. Son travail s'étend des événements privés intimes 
                  aux productions commerciales à grande échelle.
                </p>
                <p className="text-lg">
                  Spécialiste en couverture de mariages de luxe, événements corporatifs, et 
                  productions vidéo pour les artistes, Rahim a eu le privilège de collaborer 
                  avec des marques renommées et des artistes de talent, donnant vie à leurs histoires 
                  à travers des narrations visuelles convaincantes qui résonnent avec le public 
                  en Algérie et au-delà.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="bg-black/50 border border-white/10 p-8">
                <h3 className="text-2xl font-display font-black text-primary mb-6">Expertise</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Award className="text-primary w-5 h-5 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-white font-display font-bold">Spécialiste Audiovisuel</h4>
                      <p className="text-white/60 text-sm">Laboratoires Merinal • Actuel</p>
                      <p className="text-slate-200 text-sm mt-1">Production vidéo corporate, création de contenu de marque</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Video className="text-primary w-5 h-5 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-white font-display font-bold">Réalisateur Vidéo</h4>
                      <p className="text-white/60 text-sm">El Dey Group • 2022-Actuel</p>
                      <p className="text-slate-200 text-sm mt-1">Production de clips musicaux, couverture de performances live</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Camera className="text-primary w-5 h-5 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-white font-display font-bold">Photographe/Vidéaste Freelance</h4>
                      <p className="text-white/60 text-sm">2019-Actuel</p>
                      <p className="text-slate-200 text-sm mt-1">Mariages, événements, projets commerciaux</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-black/50 border border-white/10 p-8">
                <h3 className="text-2xl font-display font-black text-primary mb-6">Clients Prestigieux</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-slate-200">
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

      {/* Services Section */}
      <section className="py-20 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="inline-block py-1 px-3 border border-primary/50 text-primary text-xs tracking-[0.2em] uppercase mb-4">
              SERVICES
            </span>
            <h2 className="heading-responsive font-display font-black text-white mb-6">
              Services <span className="text-primary">Professionnels</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-black/50 border border-white/10 rounded-lg p-8 hover:border-primary/50 transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/30 transition-colors">
                  <service.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-4">{service.title}</h3>
                <p className="text-slate-200 leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="heading-responsive font-display font-black text-white mb-6">
              Collaborons <span className="text-[#D4AF37]">Ensemble</span>
            </h2>
            <p className="text-lg text-slate-200 mb-8 leading-relaxed">
              Transformons vos idées en réalités visuelles extraordinaires. 
              Contactez-moi pour discuter de votre projet et donner vie à votre vision.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-12">
              <div className="flex items-center gap-3 text-slate-200">
                <Mail className="w-5 h-5 text-[#D4AF37]" />
                <span>rahimmerabet51@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 text-slate-200">
                <Phone className="w-5 h-5 text-[#D4AF37]" />
                <span>+213 660 951 299</span>
              </div>
            </div>
            
            <Button 
              size="lg"
              className="bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black font-display font-bold shadow-lg hover:shadow-[#D4AF37]/25 transition-all duration-300"
              asChild
            >
              <Link href="/contact">
                Démarrer un Projet <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </motion.div>
  );
}
