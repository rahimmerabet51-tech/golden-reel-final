import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { WorkDisplay } from "@/components/WorkDisplay";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { fetchWorks } from "@/lib/api";
import type { Work } from "@/lib/supabase";

export default function FeaturedWorks() {
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 font-serif">
              Featured <span className="text-primary">Works</span>
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto font-light">
              Discover our latest visual storytelling projects, featuring premium Vimeo-hosted videos
            </p>
          </motion.div>
        </div>
      </section>

      {/* Works Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-500 text-lg">{error}</p>
            </div>
          ) : works.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-white/60 text-lg">No works found. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {works.map((work, index) => (
                <WorkDisplay 
                  key={work.id || index} 
                  work={work}
                  className="transform transition-all duration-300 hover:scale-105"
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6 font-serif">
              Ready to Create Something <span className="text-primary">Amazing?</span>
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Let's bring your vision to life with our cinematic expertise
            </p>
            <Button 
              className="bg-primary text-black hover:bg-primary/90 font-semibold rounded-none px-8 py-4 text-lg"
              asChild
            >
              <Link href="/contact">
                Start Your Project
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
