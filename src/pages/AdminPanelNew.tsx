import { useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  Upload, 
  X, 
  FileVideo, 
  FileImage, 
  Loader2, 
  CheckCircle, 
  AlertCircle,
  ArrowLeft,
  Trash2,
  Eye
} from "lucide-react";
import { uploadFile, saveWorkMetadata, fetchWorks, deleteWork } from "@/lib/api";
import type { Work } from "@/lib/supabase";

// Admin access control - only Rahim can access
const ADMIN_PIN = "RAHIMDEY";

export default function AdminPanel() {
  const [location, setLocation] = useLocation();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [works, setWorks] = useState<Work[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    category: "Wedding",
    description: "",
    client: "",
    year: new Date().getFullYear().toString(),
    tags: ""
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Check auth on mount
  useState(() => {
    const checkAuth = () => {
      const access = sessionStorage.getItem('adminAccess');
      if (access === 'granted') {
        setIsAuthorized(true);
        fetchWorksData();
      } else {
        setIsAuthorized(false);
      }
    };
    checkAuth();
  });

  const fetchWorksData = async () => {
    try {
      const data = await fetchWorks();
      setWorks(data);
    } catch (error) {
      showNotification('error', 'Failed to fetch works');
    }
  };

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'video/mp4', 'video/webm', 'video/quicktime'];
      if (validTypes.includes(file.type)) {
        setSelectedFile(file);
      } else {
        showNotification('error', 'Invalid file type. Please select an image or video file.');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile) {
      showNotification('error', 'Please select a file to upload');
      return;
    }

    if (!formData.title.trim()) {
      showNotification('error', 'Please enter a title');
      return;
    }

    setIsLoading(true);
    setUploadProgress(0);

    try {
      // Upload file to Supabase Storage
      setUploadProgress(25);
      const uploadResult = await uploadFile(selectedFile);
      setUploadProgress(75);

      // Determine file type
      const fileType = selectedFile.type.startsWith('image/') ? 'image' : 'video';

      // Save metadata to database
      const workData = {
        title: formData.title.trim(),
        category: formData.category,
        description: formData.description.trim(),
        file_url: uploadResult.publicUrl,
        file_type: fileType,
        client: formData.client.trim() || undefined,
        year: formData.year,
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()).filter(Boolean) : []
      };

      await saveWorkMetadata(workData);
      setUploadProgress(100);

      // Reset form
      setFormData({
        title: "",
        category: "Wedding",
        description: "",
        client: "",
        year: new Date().getFullYear().toString(),
        tags: ""
      });
      setSelectedFile(null);
      const fileInput = document.getElementById('file-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

      showNotification('success', 'Work uploaded successfully!');
      fetchWorksData();

    } catch (error) {
      showNotification('error', error instanceof Error ? error.message : 'Upload failed');
    } finally {
      setIsLoading(false);
      setUploadProgress(0);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this work?')) return;

    try {
      await deleteWork(id);
      showNotification('success', 'Work deleted successfully');
      fetchWorksData();
    } catch (error) {
      showNotification('error', 'Failed to delete work');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("adminAccess");
    setLocation("/admin");
  };

  // Show unauthorized message
  if (isAuthorized === false) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-2xl"
        >
          <div className="mb-8">
            <h1 className="text-4xl font-display font-black text-white mb-4">
              Access <span className="text-primary">Denied</span>
            </h1>
            
            <p className="text-lg text-slate-200 max-w-2xl mx-auto mb-8 leading-relaxed">
              You don't have permission to access this admin panel. This area is restricted to authorized personnel only.
            </p>
            
            <Button 
              className="bg-primary text-black hover:bg-primary/90 font-display font-bold rounded-none px-8"
              asChild
            >
              <Link href="/">Return Home</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Show loading
  if (isAuthorized === null) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-black text-white"
    >
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-black/90"></div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Button 
              variant="outline" 
              className="mb-6 border-white/30 text-white hover:bg-white hover:text-black"
              asChild
            >
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Site
              </Link>
            </Button>
            
            <h1 className="heading-responsive font-display font-black text-white mb-6 leading-tight">
              Admin <span className="text-primary">Panel</span>
            </h1>
            <p className="text-responsive text-slate-200 max-w-2xl mx-auto leading-relaxed">
              Manage your portfolio - upload new content and organize your media library.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Notification */}
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`fixed top-20 right-6 z-50 p-4 rounded-lg border ${
            notification.type === 'success' 
              ? 'bg-green-500/20 border-green-500 text-green-100' 
              : 'bg-red-500/20 border-red-500 text-red-100'
          }`}
        >
          <div className="flex items-center gap-3">
            {notification.type === 'success' ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <span>{notification.message}</span>
          </div>
        </motion.div>
      )}

      {/* Upload Form */}
      <section className="py-16 px-6 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black/50 border border-white/10 rounded-lg p-8"
          >
            <h2 className="text-2xl font-display font-black text-white mb-6">
              Upload New <span className="text-primary">Work</span>
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* File Upload */}
              <div>
                <label className="block text-sm font-display font-bold text-white mb-2">
                  Select File
                </label>
                <div className="relative">
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <label
                    htmlFor="file-upload"
                    className="flex items-center justify-center w-full p-8 border-2 border-dashed border-white/30 rounded-lg cursor-pointer hover:border-primary/50 transition-colors"
                  >
                    <div className="text-center">
                      {selectedFile ? (
                        <div className="flex items-center gap-3">
                          {selectedFile.type.startsWith('image/') ? (
                            <FileImage className="w-8 h-8 text-primary" />
                          ) : (
                            <FileVideo className="w-8 h-8 text-primary" />
                          )}
                          <span className="text-white">{selectedFile.name}</span>
                          <button
                            type="button"
                            onClick={() => setSelectedFile(null)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      ) : (
                        <div>
                          <Upload className="w-8 h-8 text-primary mx-auto mb-2" />
                          <p className="text-white/60">Click to upload or drag and drop</p>
                          <p className="text-white/40 text-sm">Images (JPG, PNG, WebP) or Videos (MP4, WebM)</p>
                        </div>
                      )}
                    </div>
                  </label>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-display font-bold text-white mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-primary focus:outline-none"
                    placeholder="Enter work title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-display font-bold text-white mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg text-white focus:border-primary focus:outline-none"
                  >
                    <option value="Wedding">Wedding</option>
                    <option value="Corporate">Corporate</option>
                    <option value="Music Video">Music Video</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Event">Event</option>
                    <option value="Documentary">Documentary</option>
                    <option value="AI">AI</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-display font-bold text-white mb-2">
                    Client
                  </label>
                  <input
                    type="text"
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-primary focus:outline-none"
                    placeholder="Client name (optional)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-display font-bold text-white mb-2">
                    Year
                  </label>
                  <input
                    type="text"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-primary focus:outline-none"
                    placeholder="Year"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-display font-bold text-white mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-primary focus:outline-none resize-none"
                  placeholder="Describe this work..."
                />
              </div>

              <div>
                <label className="block text-sm font-display font-bold text-white mb-2">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-primary focus:outline-none"
                  placeholder="e.g., cinematic, luxury, algiers"
                />
              </div>

              {/* Upload Progress */}
              {isLoading && uploadProgress > 0 && (
                <div className="w-full bg-black/50 border border-white/20 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white/60">Uploading...</span>
                    <span className="text-sm text-primary">{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading || !selectedFile}
                className="w-full bg-primary text-black hover:bg-primary/90 font-display font-bold py-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5 mr-2" />
                    Upload Work
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </motion.div>
  );
}
