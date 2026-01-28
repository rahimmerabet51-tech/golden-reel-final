import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { LogOut, FileVideo, FileImage, Loader2, CheckCircle, AlertCircle, ArrowLeft, Trash2, Eye, Upload, X } from "lucide-react";
import { fetchWorks, saveWorkMetadata, deleteWork } from "@/lib/api";
import type { Work } from "@/lib/supabase";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Link } from "wouter";

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
    videoUrl: "",
    description: "",
    category: "",
    type: "video" as 'video' | 'image',
    mediaSource: "url" as 'url' | 'file'
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [editingWorkId, setEditingWorkId] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const fetchWorksData = async () => {
    try {
      const data = await fetchWorks();
      setWorks(data);
    } catch (error) {
      showNotification('error', 'Failed to fetch works');
    }
  };

  // Check auth on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          setIsAuthorized(true);
          fetchWorksData();
        } else {
          setIsAuthorized(false);
        }
      } catch (error) {
        setIsAuthorized(false);
      }
    };
    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setIsAuthorized(true);
        fetchWorksData();
      } else {
        setIsAuthorized(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleThumbnailSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
    }
  };

  const uploadThumbnail = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `portfolio-covers/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('portfolio-covers')
      .upload(filePath, file);

    if (uploadError) {
      throw new Error(`Upload failed: ${uploadError.message}`);
    }

    const { data: { publicUrl } } = supabase.storage
      .from('portfolio-covers')
      .getPublicUrl(filePath);

    return publicUrl;
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
    
    if (!formData.title.trim()) {
      showNotification('error', 'Please enter a title');
      return;
    }

    // Check if we have either a URL or a file
    const hasUrl = formData.videoUrl.trim();
    const hasFile = selectedFile;
    
    if (!hasUrl && !hasFile) {
      showNotification('error', 'Please provide either a video URL or upload a file');
      return;
    }

    setIsLoading(true);
    setUploadProgress(0);

    try {
      let finalUrl = formData.videoUrl.trim();
      let fileType: 'image' | 'video' = formData.type;
      let thumbnailUrl: string | null = null;
      
      // Upload thumbnail if provided
      if (thumbnailFile) {
        setUploadProgress(25);
        console.log('Uploading thumbnail:', thumbnailFile.name);
        thumbnailUrl = await uploadThumbnail(thumbnailFile);
        console.log('Thumbnail uploaded:', thumbnailUrl);
      }
      
      // If we have a URL, use it directly (skip file upload)
      if (hasUrl) {
        console.log('Using direct URL:', finalUrl);
        setUploadProgress(50);
      } 
      // If we have a file but no URL, handle file upload
      else if (hasFile) {
        // TODO: Implement file upload logic
        showNotification('error', 'File upload not implemented yet. Please use URL option.');
        setIsLoading(false);
        return;
      }
      
      setUploadProgress(75);

      // Save metadata to database - INCLUDE thumbnail URL
      const workData: any = {
        title: formData.title.trim(),
        url: finalUrl,
        type: fileType,
        description: formData.description.trim()
      };

      // Add thumbnail URL if uploaded
      if (thumbnailUrl) {
        workData.thumbnail_url = thumbnailUrl;
      }

      // Add category if provided
      if (formData.category.trim()) {
        workData.category = formData.category.trim();
      }

      console.log('Saving to database:', workData);
      
      let result;
      if (isEditMode && editingWorkId) {
        // Update existing work
        const { data, error } = await supabase
          .from('works')
          .update(workData)
          .eq('id', editingWorkId)
          .select();

        if (error) {
          console.error("Supabase Error:", error);
          throw new Error(error.message);
        }
        result = data;
        console.log('Successfully updated:', result);
      } else {
        // Insert new work
        const { data, error } = await supabase
          .from('works')
          .insert([workData])
          .select();

        if (error) {
          console.error("Supabase Error:", error);
          throw new Error(error.message);
        }
        result = data;
        console.log('Successfully saved:', result);
      }
      setUploadProgress(100);

      // Reset form
      resetForm();

      showNotification('success', isEditMode ? 'Projet mis à jour avec succès!' : 'Projet ajouté avec succès!');
      await fetchWorksData();
    } catch (error: any) {
      console.error("Supabase Error:", error);
      showNotification('error', `Database error: ${error.message}`);
    } finally {
      setIsLoading(false);
      setUploadProgress(0);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this work?')) return;

    try {
      const { error } = await supabase
        .from('works')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Delete error:', error);
        showNotification('error', `Failed to delete: ${error.message}`);
        return;
      }

      showNotification('success', 'Work deleted successfully!');
      await fetchWorksData();
    } catch (error) {
      console.error('Error deleting work:', error);
      showNotification('error', 'Failed to delete work');
    }
  };

  const handleEdit = (work: any) => {
    setFormData({
      title: work.title || '',
      videoUrl: work.url || '',
      description: work.description || '',
      category: work.category || '',
      type: work.type || 'video',
      mediaSource: 'url'
    });
    setEditingWorkId(work.id);
    setIsEditMode(true);
    setSelectedFile(null);
    setThumbnailFile(null);
    
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      videoUrl: "",
      description: "",
      category: "",
      type: "video",
      mediaSource: "url"
    });
    setSelectedFile(null);
    setThumbnailFile(null);
    setEditingWorkId(null);
    setIsEditMode(false);
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setLocation("/login");
    } catch (error) {
      console.error("Error logging out:", error);
      setLocation("/login");
    }
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
            <div className="flex justify-between items-center mb-6">
              <Button 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white hover:text-black"
                asChild
              >
                <Link href="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Site
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                className="border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
            
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
            className={`bg-black/50 border rounded-lg p-8 transition-all duration-300 ${
              isEditMode 
                ? 'border-2 border-[#D4AF37] shadow-xl shadow-[#D4AF37]/20' 
                : 'border border-white/10'
            }`}
          >
            <h2 className="text-2xl font-display font-black text-white mb-6">
              {isEditMode ? 'Modifier le' : 'Ajouter un'} <span className="text-[#D4AF37]">Projet</span>
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Form Fields */}
              <div className="space-y-6">
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
                    Type *
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as 'video' | 'image' })}
                    className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg text-white focus:border-primary focus:outline-none"
                  >
                    <option value="video">Video</option>
                    <option value="image">Image</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-display font-bold text-white mb-2">
                    Category
                  </label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-primary focus:outline-none"
                    placeholder="e.g., Wedding, Corporate, Music Video"
                  />
                </div>

                <div>
                  <label className="block text-sm font-display font-bold text-white mb-2">
                    Media Source *
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="mediaSource"
                        value="url"
                        checked={formData.mediaSource === 'url'}
                        onChange={() => setFormData({ ...formData, mediaSource: 'url' })}
                        className="mr-2"
                      />
                      <span className="text-white">Paste URL</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="mediaSource"
                        value="file"
                        checked={formData.mediaSource === 'file'}
                        onChange={() => setFormData({ ...formData, mediaSource: 'file' })}
                        className="mr-2"
                      />
                      <span className="text-white">Upload File</span>
                    </label>
                  </div>
                </div>

                {formData.mediaSource === 'url' ? (
                  <div>
                    <label className="block text-sm font-display font-bold text-white mb-2">
                      Video URL (YouTube/Vimeo) *
                    </label>
                    <input
                      type="url"
                      value={formData.videoUrl}
                      onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                      className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-primary focus:outline-none"
                      placeholder="Paste any video link (YouTube, Vimeo, or direct MP4 URL)"
                      required={formData.mediaSource === 'url'}
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-display font-bold text-white mb-2">
                      Upload File *
                    </label>
                    <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                      <input
                        type="file"
                        onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                        accept="image/*,video/*"
                        className="hidden"
                        id="file-upload"
                        required={formData.mediaSource === 'file'}
                      />
                      <label htmlFor="file-upload" className="cursor-pointer">
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
                      </label>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-display font-bold text-white mb-2">
                    Video Cover (Thumbnail)
                  </label>
                  <div className="relative">
                    <input
                      id="thumbnail-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleThumbnailSelect}
                      className="hidden"
                    />
                    <label
                      htmlFor="thumbnail-upload"
                      className="flex items-center justify-center w-full p-6 border-2 border-dashed border-white/30 rounded-lg cursor-pointer hover:border-primary/50 transition-colors"
                    >
                      <div className="text-center">
                        {thumbnailFile ? (
                          <div className="flex items-center gap-3">
                            <FileImage className="w-8 h-8 text-primary" />
                            <span className="text-white">{thumbnailFile.name}</span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                setThumbnailFile(null);
                              }}
                              className="text-red-400 hover:text-red-300"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </div>
                        ) : (
                          <div>
                            <Upload className="w-8 h-8 text-primary mx-auto mb-2" />
                            <p className="text-white/60">Click to upload thumbnail</p>
                            <p className="text-white/40 text-sm">JPG, PNG, WebP (Max 5MB)</p>
                          </div>
                        )}
                      </div>
                    </label>
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
              <div className="flex gap-4">
                {isEditMode && (
                  <Button
                    type="button"
                    onClick={resetForm}
                    className="flex-1 bg-transparent border-2 border-white/50 text-white hover:bg-white hover:text-black font-display font-bold rounded-none transition-all duration-300"
                  >
                    Annuler
                  </Button>
                )}
                <Button
                  type="submit"
                  disabled={isLoading || (!selectedFile && !formData.videoUrl.trim())}
                  className="flex-1 bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black font-display font-bold rounded-none transition-all duration-300 shadow-lg hover:shadow-[#D4AF37]/25 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      {isEditMode ? 'Mise à jour...' : 'Ajout...'}
                    </>
                  ) : (
                    <>
                      <Upload className="w-5 h-5 mr-2" />
                      {isEditMode ? 'Mettre à jour' : 'Ajouter le Projet'}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Manage Works Section */}
      <section className="py-16 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl font-display font-black text-white mb-6">
              Manage <span className="text-primary">Works</span>
            </h2>
            
            {works.length === 0 ? (
              <div className="text-center py-12 bg-black/50 border border-white/10 rounded-lg">
                <p className="text-white/60 mb-4">No works found. Add your first work above!</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full bg-black/50 border border-white/10 rounded-lg overflow-hidden">
                  <thead className="bg-black/70 border-b border-white/10">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                        Preview
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                        URL
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                        Created
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-medium text-white/60 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {works.map((work) => (
                      <tr key={work.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="w-12 h-12 bg-black/50 rounded-lg overflow-hidden flex items-center justify-center">
                            {work.thumbnail_url ? (
                              <img 
                                src={work.thumbnail_url} 
                                alt={work.title}
                                className="w-full h-full object-cover"
                              />
                            ) : work.type === 'video' ? (
                              <FileVideo className="w-6 h-6 text-primary" />
                            ) : (
                              <FileImage className="w-6 h-6 text-primary" />
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-white">
                            {work.title}
                          </div>
                          {work.category && (
                            <div className="text-xs text-white/50">
                              {work.category}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            work.type === 'video' 
                              ? 'bg-blue-900/50 text-blue-400' 
                              : 'bg-green-900/50 text-green-400'
                          }`}>
                            {work.type}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-white/60 truncate max-w-xs">
                            {work.url}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white/50">
                          {work.created_at ? new Date(work.created_at).toLocaleDateString() : 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleEdit(work)}
                              className="text-[#D4AF37] hover:text-[#D4AF37]/80 transition-colors"
                              title="Modifier"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(work.id!)}
                              className="text-red-400 hover:text-red-300 transition-colors"
                              title="Supprimer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </motion.div>
  );
}
