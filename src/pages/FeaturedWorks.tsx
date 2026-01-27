import { useState } from "react";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { VideoDisplay } from "@/components/VideoDisplay";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Play, Calendar, User, ArrowRight, Filter } from "lucide-react";

export default function FeaturedWorks() {
  // Mock featured works data
  const featuredWorks = [
    {
      id: 1,
      title: "Laboratoires Merinal Corporate Film",
      category: "Corporate",
      client: "Laboratoires Merinal",
      year: "2024",
      thumbnail: "/FEATURED WORKS1.png",
      description: "Corporate branding film showcasing the pharmaceutical excellence and innovation at Laboratoires Merinal.",
      videoUrl: "https://www.instagram.com/reel/DTaSzyOiC8O/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ==",
      tags: ["Corporate", "Branding", "Pharmaceutical"]
    },
    {
      id: 2,
      title: "El Dey Group - Music Video",
      category: "Music Video",
      client: "El Dey Group",
      year: "2023",
      thumbnail: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1000",
      description: "Dynamic music video production for El Dey Group's latest single, featuring cinematic storytelling and artistic visuals.",
      videoUrl: "https://www.instagram.com/reel/DTS_EUKjOGc/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ==",
      tags: ["Music", "Video", "Algerian Artist"]
    },
    {
      id: 3,
      title: "La Vache Qui Rit Commercial",
      category: "Commercial",
      client: "La Vache Qui Rit (Groupe Bel)",
      year: "2024",
      thumbnail: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=1000",
      description: "Television commercial for La Vache Qui Rit, highlighting the brand's family-friendly values and quality products.",
      videoUrl: "#",
      tags: ["Commercial", "TV", "Food & Beverage"]
    },
    {
      id: 4,
      title: "Vivalor Luxury Event Coverage",
      category: "Event",
      client: "Vivalor",
      year: "2023",
      thumbnail: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000",
      description: "Comprehensive event coverage for Vivalor's luxury product launch, capturing the elegance and sophistication of the occasion.",
      videoUrl: "#",
      tags: ["Event", "Luxury", "Product Launch"]
    },
    {
      id: 5,
      title: "Algerian Wedding Cinematography",
      category: "Wedding",
      client: "Private Client",
      year: "2024",
      thumbnail: "https://images.unsplash.com/photo-1511285560982-1351cdeb9821?q=80&w=1000",
      description: "Romantic wedding cinematography capturing the beauty and emotion of a traditional Algerian wedding celebration.",
      videoUrl: "#",
      tags: ["Wedding", "Cinematography", "Cultural"]
    },
    {
      id: 6,
      title: "Documentary: Algiers Street Art",
      category: "Documentary",
      client: "Independent Project",
      year: "2023",
      thumbnail: "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=1000",
      description: "Short documentary exploring the vibrant street art scene in Algiers, featuring local artists and their creative process.",
      videoUrl: "#",
      tags: ["Documentary", "Art", "Culture"]
    }
  ];

  const categories = ["All", "Wedding", "Corporate", "Music Video", "Commercial", "Event", "Documentary"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredWorks = selectedCategory === "All" 
    ? featuredWorks 
    : featuredWorks.filter(work => work.category === selectedCategory);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-dark-bg text-white"
    >
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-black/90"></div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block py-1 px-3 border border-primary/50 text-primary text-sm tracking-[0.2em] uppercase mb-4 bg-black/30 backdrop-blur-sm">
              Portfolio Showcase
            </span>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4 leading-tight">
              Featured<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-200 to-primary">
                Works
              </span>
            </h1>
            <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto mb-6 font-light leading-relaxed">
              A curated selection of my best work, from corporate films and music videos to wedding cinematography and documentary projects.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 px-6 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Filter className="text-primary w-5 h-5" />
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={`${
                  selectedCategory === category 
                    ? "bg-primary text-black hover:bg-primary/90" 
                    : "border-white/20 text-white/70 hover:text-white hover:border-white/30"
                } rounded-none px-6`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Works Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredWorks.map((work, index) => (
              <motion.div
                key={work.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group relative overflow-hidden border border-white/10 hover:border-primary/50 transition-all duration-300"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={work.thumbnail}
                    alt={work.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button 
                      size="lg"
                      className="bg-primary/90 text-black hover:bg-primary rounded-full w-16 h-16 p-0"
                      asChild
                    >
                      <Link href={`/video/${work.id}`}>
                        <Play className="w-6 h-6 ml-1" />
                      </Link>
                    </Button>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-primary/90 text-black text-xs font-semibold rounded-none">
                      {work.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 bg-black/50">
                  <h3 className="text-xl font-serif text-white mb-2 group-hover:text-primary transition-colors duration-300">
                    {work.title}
                  </h3>
                  <p className="text-white/70 text-sm mb-4 line-clamp-2">
                    {work.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-white/50 mb-4">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {work.client}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {work.year}
                      </span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {work.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="px-2 py-1 bg-white/10 text-white/60 text-xs rounded-none"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-16">
            <Button 
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-white hover:border-primary text-lg px-8 py-4 rounded-none"
              asChild
            >
              <Link href="/contact">
                View More Projects <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Uploaded Videos Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-16 px-6 border-t border-white/10"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
              Latest <span className="text-primary">Uploads</span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Recently uploaded videos from our collection, showcasing the latest work and projects.
            </p>
          </motion.div>

          <VideoDisplay />
        </div>
      </motion.section>

      <Footer />
    </motion.div>
  );
}
