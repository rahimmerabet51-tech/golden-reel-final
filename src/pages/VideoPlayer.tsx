import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, Link } from "wouter";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { InstagramEmbed } from "@/components/InstagramEmbed";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play, Pause, Volume2, Maximize, Share2, Calendar, User, Tag } from "lucide-react";

export default function VideoPlayer() {
  const params = useParams();
  const workId = params.id;
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Mock data - in a real app, this would come from an API
  const featuredWorks = [
    {
      id: "1",
      title: "Laboratoires Merinal Corporate Film",
      category: "Corporate",
      client: "Laboratoires Merinal",
      year: "2024",
      thumbnail: "/attached_assets/FEATURED WORKS1.png",
      description: "Corporate branding film showcasing the pharmaceutical excellence and innovation at Laboratoires Merinal.",
      videoUrl: "https://www.instagram.com/reel/DTaSzyOiC8O/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ==",
      tags: ["Corporate", "Branding", "Pharmaceutical"]
    },
    {
      id: "2",
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
      id: "3",
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
      id: "4",
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
      id: "5",
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
      id: "6",
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

  const currentWork = featuredWorks.find(work => work.id === workId);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: currentWork?.title,
          text: currentWork?.description,
          url: window.location.href
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (!currentWork) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-dark-bg text-white flex items-center justify-center"
      >
        <div className="text-center">
          <h1 className="text-4xl font-serif text-primary mb-4">Work Not Found</h1>
          <p className="text-white/70 mb-8">The featured work you're looking for doesn't exist.</p>
          <Button 
            className="bg-primary text-black hover:bg-primary/90"
            asChild
          >
            <Link href="/featured-works">
              Back to Featured Works
            </Link>
          </Button>
        </div>
      </motion.div>
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
      
      {/* Video Details Section */}
      <section className="py-20 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Main Content - 2 columns */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="space-y-8">
                <div>
                  <span className="inline-block py-1 px-3 border border-primary/50 text-primary text-sm tracking-[0.2em] uppercase mb-6">
                    {currentWork.category}
                  </span>
                  <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight">
                    {currentWork.title}
                  </h1>
                  <p className="text-lg text-white/80 leading-relaxed">
                    {currentWork.description}
                  </p>
                </div>

                {/* Project Metadata */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center gap-3">
                    <User className="text-primary w-5 h-5" />
                    <div>
                      <p className="text-white/60 text-sm">Client</p>
                      <p className="text-white font-semibold">{currentWork.client}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Calendar className="text-primary w-5 h-5" />
                    <div>
                      <p className="text-white/60 text-sm">Year</p>
                      <p className="text-white font-semibold">{currentWork.year}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Tag className="text-primary w-5 h-5" />
                    <div>
                      <p className="text-white/60 text-sm">Category</p>
                      <p className="text-white font-semibold">{currentWork.category}</p>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {currentWork.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-3 py-1 bg-primary/20 text-primary border border-primary/30 text-sm rounded-none"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg"
                    className="bg-primary text-black hover:bg-primary/90 text-lg px-8 py-4 rounded-none"
                    asChild
                  >
                    <Link href="/contact">
                      Discuss Similar Project
                    </Link>
                  </Button>
                  
                  {currentWork.videoUrl && currentWork.videoUrl !== "#" && (
                    <Button 
                      size="lg"
                      variant="outline"
                      className="border-white/30 text-white hover:bg-white/10 hover:text-white hover:border-white text-lg px-8 py-4 rounded-none"
                      onClick={() => window.open(currentWork.videoUrl, '_blank')}
                    >
                      <Play className="w-5 h-5 mr-2" />
                      Watch on Instagram
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Sidebar - 1 column */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Related Works */}
              <div className="bg-black/50 border border-white/10 p-8">
                <h3 className="text-2xl font-serif text-primary mb-6">More Works</h3>
                <div className="space-y-4">
                  {featuredWorks
                    .filter(work => work.id !== currentWork.id)
                    .slice(0, 3)
                    .map((work) => (
                      <Link key={work.id} href={`/video/${work.id}`}>
                        <div className="flex items-center gap-4 p-3 border border-white/10 hover:border-primary/50 hover:bg-white/5 transition-all cursor-pointer">
                          <div className="w-16 h-16 bg-black/50 border border-white/20 rounded overflow-hidden flex-shrink-0">
                            <img 
                              src={work.thumbnail}
                              alt={work.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-white font-semibold text-sm mb-1">{work.title}</h4>
                            <p className="text-white/50 text-xs">{work.category} • {work.year}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-black/50 border border-white/10 p-8">
                <h3 className="text-2xl font-serif text-primary mb-6">Quick Actions</h3>
                <div className="space-y-4">
                  <Button 
                    variant="outline"
                    className="w-full border-white/30 text-white hover:bg-white/10 hover:text-white hover:border-white rounded-none"
                    onClick={handleShare}
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share This Work
                  </Button>
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
