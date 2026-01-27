import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Video, Trash2, Plus, Upload, ArrowLeft, Shield } from "lucide-react";
import { Video as VideoType, InsertVideo } from "../../../shared/schema";

// Admin access control - only Rahim can access
const ADMIN_PIN = "GOLDEN_KEY";

export default function AdminPanel() {
  const [location, setLocation] = useLocation();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    videoUrl: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Check authorization - in a real app, this would use Clerk or similar
  useEffect(() => {
    // For demo purposes, we'll use a simple check
    // In production, this would check actual user authentication
    const checkAuth = () => {
      // Simulate auth check - replace with actual auth logic
      const access = sessionStorage.getItem('adminAccess');
      if (access === 'granted') {
        setIsAuthorized(true);
        fetchVideos();
      } else {
        setIsAuthorized(false);
      }
    };
    
    checkAuth();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await fetch('/api/videos');
      if (response.ok) {
        const data = await response.json();
        setVideos(data);
      }
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    if (!formData.videoUrl) {
      setMessage("Please enter a video URL");
      setIsLoading(false);
      return;
    }

    try {
      const videoData = {
        title: formData.title,
        description: formData.description,
        videoUrl: formData.videoUrl
      };

      const response = await fetch('/api/videos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(videoData),
      });

      if (response.ok) {
        setMessage("Video uploaded successfully!");
        setFormData({ title: "", description: "", videoUrl: "" });
        fetchVideos();
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('Server error response:', errorData);
        setMessage(`Error: ${errorData.message || 'Unknown error'} Please try again.`);
      }
    } catch (error) {
      setMessage("Error uploading video. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number, videoUrl: string) => {
    if (!confirm("Are you sure you want to delete this video?")) return;

    try {
      const response = await fetch(`/api/videos/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMessage("Video deleted successfully!");
        fetchVideos();
      } else {
        setMessage("Error deleting video record. Please try again.");
      }
    } catch (error) {
      setMessage("Error deleting video. Please try again.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogout = () => {
    sessionStorage.removeItem("adminAccess");
    setLocation("/admin");
  };

  // Show unauthorized message
  if (isAuthorized === false) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-dark-bg text-white"
      >
        <Navigation />
        
        <section className="relative min-h-[60vh] flex items-center justify-center">
          <div className="text-center px-6 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-10 h-10 text-red-500" />
              </div>
              
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
                403 <span className="text-primary">Unauthorized</span>
              </h1>
              
              <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8 font-light leading-relaxed">
                You don't have permission to access this admin panel. This area is restricted to authorized personnel only.
              </p>
              
              <Button 
                size="lg"
                className="bg-primary text-black hover:bg-primary/90 text-lg px-8 py-4 rounded-none"
                asChild
              >
                <Link href="/">
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back to Home
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
        
        <Footer />
      </motion.div>
    );
  }

  // Show loading
  if (isAuthorized === null) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-dark-bg text-white flex items-center justify-center"
      >
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/70">Checking authorization...</p>
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
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-black/90"></div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10 text-primary" />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4 leading-tight">
              Admin <span className="text-primary">Panel</span>
            </h1>
            <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto mb-6 font-light leading-relaxed">
              Manage your video portfolio - upload new content and organize your media library.
            </p>
            
            <Button 
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 hover:text-white hover:border-white text-lg px-8 py-4 rounded-none"
              asChild
            >
              <Link href="/">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Site
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Admin Content */}
      <section className="py-12 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          
          {/* Upload Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-black/50 border border-white/10 p-8 mb-12"
          >
            <h2 className="text-2xl font-serif text-primary mb-6 flex items-center gap-3">
              <Upload className="w-6 h-6" />
              Upload New Video
            </h2>
            
            {message && (
              <div className={`p-4 rounded-lg mb-6 ${
                message.includes("success") 
                  ? "bg-green-500/20 border border-green-500/50 text-green-400" 
                  : "bg-red-500/20 border border-red-500/50 text-red-400"
              }`}>
                {message}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-white/80 mb-2 text-sm font-medium">Video Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-black/50 border border-white/20 text-white rounded-none focus:border-primary focus:outline-none transition-colors"
                  placeholder="Enter video title..."
                />
              </div>
              
              <div>
                <label className="block text-white/80 mb-2 text-sm font-medium">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-black/50 border border-white/20 text-white rounded-none focus:border-primary focus:outline-none transition-colors resize-none"
                  placeholder="Enter video description..."
                />
              </div>
              
              <div>
                <label className="block text-white/80 mb-2 text-sm font-medium">Video Embed URL (YouTube, Vimeo, direct mp4)</label>
                <input
                  type="text"
                  name="videoUrl"
                  value={formData.videoUrl}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-black/50 border border-white/20 text-white rounded-none focus:border-primary focus:outline-none transition-colors"
                  placeholder="https://youtu.be/your-video"
                />
              </div>
              
              <Button 
                type="submit"
                disabled={isLoading}
                className="bg-primary text-black hover:bg-primary/90 text-lg px-8 py-4 rounded-none disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin mr-2"></div>
                ) : (
                  <Plus className="w-5 h-5 mr-2" />
                )}
                {isLoading ? "Uploading..." : "Upload Video"}
              </Button>
            </form>
          </motion.div>

          {/* Videos List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-black/50 border border-white/10 p-8"
          >
            <h2 className="text-2xl font-serif text-primary mb-6 flex items-center gap-3">
              <Video className="w-6 h-6" />
              Video Library ({videos.length})
            </h2>
            
            {videos.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Video className="w-8 h-8 text-primary" />
                </div>
                <p className="text-white/70">No videos uploaded yet. Upload your first video above!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {videos.map((video) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-black/30 border border-white/10 p-6 flex items-center justify-between"
                  >
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-2">{video.title}</h3>
                      <p className="text-white/70 text-sm mb-2 line-clamp-2">{video.description}</p>
                      <div className="flex items-center gap-4 text-xs text-white/50">
                        <span>URL: {video.videoUrl}</span>
                        <span>•</span>
                        <span>{new Date(video.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 ml-6">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-red-500/50 text-red-400 hover:bg-red-500/10 hover:text-red-300 hover:border-red-500"
                        onClick={() => handleDelete(video.id, video.videoUrl)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </motion.div>
  );
}
