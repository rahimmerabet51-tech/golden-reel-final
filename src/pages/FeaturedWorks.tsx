import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import type { Work } from "@/lib/supabase";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { WorkCard } from "@/components/WorkCard";
import ProjectModal from "@/components/ProjectModal";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Loader2 } from "lucide-react";

export default function FeaturedWorks() {
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchWorks();
  }, []);

  const openModal = (work: Work) => {
    setSelectedWork(work);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedWork(null);
    setIsModalOpen(false);
  };

  const fetchWorks = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('works')
        .select('*')
        .order('created_at', { ascending: false }) // Show NEWEST first
        .limit(6); // Show only the top 6 items

      if (error) {
        console.error('Supabase error:', error);
        setError(error.message);
        return;
      }

      console.log('Fetched works from Supabase:', data);
      setWorks(data || []);
    } catch (err) {
      console.error('Error fetching works:', err);
      setError('Failed to fetch works');
    } finally {
      setLoading(false);
    }
  };

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
              Projets <span className="text-[#D4AF37]">Réalisés</span>
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto font-light">
              Découvrez nos derniers projets de narration visuelle, mettant en vedette des vidéos premium hébergées sur diverses plateformes
            </p>
          </motion.div>
        </div>
      </section>

      {/* Works Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-[#D4AF37] animate-spin mr-3" />
              <span className="text-white/60">Chargement des projets...</span>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-400 mb-4">Erreur: {error}</p>
              <Button onClick={fetchWorks} variant="outline">
                Réessayer
              </Button>
            </div>
          ) : works.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-white/60 mb-4">Aucun projet trouvé. Ajoutez votre premier projet !</p>
              <Link href="/admin">
                <Button className="bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black font-semibold rounded-none px-6 transition-all duration-300 shadow-lg hover:shadow-[#D4AF37]/25">
                  Ajouter un Projet
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {works.map((work) => (
                <WorkCard 
                  key={work.id} 
                  work={work}
                  onOpen={openModal}
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
            <h2 className="text-4xl md:text-6xl font-bold mb-6 font-serif">
              Prêt à <span className="text-[#D4AF37]">Créer</span> ?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Donnons vie à votre vision avec notre expertise cinématographique
            </p>
            <Button 
              className="bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black font-semibold rounded-none px-8 py-4 text-lg transition-all duration-300 shadow-lg hover:shadow-[#D4AF37]/25"
              asChild
            >
              <Link href="/contact">
                Démarrer Votre Projet
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
      
      {/* Project Modal */}
      <ProjectModal
        work={selectedWork}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
}
