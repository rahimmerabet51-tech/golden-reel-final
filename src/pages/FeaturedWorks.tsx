import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { VideoDisplay } from "@/components/VideoDisplay";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Play, Calendar, User, ArrowRight, Filter } from "lucide-react";
import { fetchWorks } from "@/lib/api";
import type { Work } from "@/lib/supabase";

export default function FeaturedWorks() {
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categories = ["All", "Wedding", "Corporate", "Music Video", "Commercial", "Event", "Documentary", "AI"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const loadWorks = async () => {
      try {
        const data = await fetchWorks();
        setWorks(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load works');
      } finally {
        setLoading(false);
      }
    };

    loadWorks();
  }, []);

  const filteredWorks = selectedCategory === "All" 
    ? works 
    : works.filter(work => work.category === selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/60">Loading featured works...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center max-w-2xl px-6">
          <h1 className="text-4xl font-display font-black text-white mb-4">
            Error <span className="text-primary">Loading</span>
          </h1>
          <p className="text-slate-200 mb-8">{error}</p>
          <Button 
            className="bg-primary text-black hover:bg-primary/90 font-display font-bold"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

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
            <span className="inline-block py-2 px-4 border border-white/30 text-white text-xs md:text-sm tracking-[0.3em] uppercase mb-6 md:mb-8 bg-black/30 backdrop-blur-sm">
              PORTFOLIO SÉLECTION
            </span>
            <h1 className="heading-responsive font-display font-black text-white mb-6 md:mb-8 leading-tight">
              Travaux<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-white">
                Vedettes
              </span>
            </h1>
            <p className="text-responsive text-slate-200 max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed">
              Une sélection de mes meilleurs travaux, des films d'entreprise et vidéos musicales aux cinématographies de mariage et projets documentaires.
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
                    src={work.file_url}
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
                  <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-primary transition-colors duration-300">
                    {work.title}
                  </h3>
                  <p className="text-slate-200 text-sm mb-4 line-clamp-2 leading-relaxed">
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
                    {work.tags?.map((tag) => (
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
            <h2 className="heading-responsive font-display font-black text-white mb-6 md:mb-8">
              Derniers <span className="text-primary">Téléchargements</span>
            </h2>
            <p className="text-slate-200 max-w-2xl mx-auto leading-relaxed">
              Vidéos récemment téléchargées de notre collection, présentant les derniers travaux et projets.
            </p>
          </motion.div>

          <VideoDisplay />
        </div>
      </motion.section>

      <Footer />
    </motion.div>
  );
}
