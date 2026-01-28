import { useState } from "react";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Instagram, Facebook, Linkedin, MessageCircle } from "lucide-react";
import emailjs from 'emailjs-com';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    serviceType: "",
    projectDescription: ""
  });
  
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setShowError(false);
    setShowSuccess(false);
    
    try {
      const templateParams = {
        from_name: formData.fullName,
        reply_to: formData.email,
        service_type: formData.serviceType,
        message: formData.projectDescription
      };

      const result = await emailjs.send(
        'service_ba9heac',
        'template_5jddso5',
        templateParams,
        'cTEJ8RML05ryS3y5F'
      );

      console.log('Email sent successfully:', result.text);
      
      // Clear form fields
      setFormData({
        fullName: "",
        email: "",
        serviceType: "",
        projectDescription: ""
      });
      
      // Show success message
      setShowSuccess(true);
      
      // Hide success message after 5 seconds
      setTimeout(() => setShowSuccess(false), 5000);
      
    } catch (error: any) {
      console.error('Failed to send email:', error);
      setErrorMessage('Échec de l\'envoi. Veuillez réessayer plus tard.');
      setShowError(true);
      
      // Hide error message after 5 seconds
      setTimeout(() => setShowError(false), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen text-white"
      style={{
        backgroundImage: `
          linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
          url('/bbb.jpg')
        `,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-center justify-center overflow-hidden">
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
        
        <div className="relative z-10 text-center container-responsive py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block py-1 px-3 sm:py-2 sm:px-4 border border-[#D4AF37]/50 text-[#D4AF37] text-xs sm:text-sm tracking-[0.2em] uppercase mb-4 sm:mb-6 bg-black/30 backdrop-blur-sm">
              Contactez-Nous
            </span>
            <h1 className="hero-title-responsive font-serif font-bold text-white mb-4 sm:mb-6 leading-tight">
              Créons<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-yellow-200 to-[#D4AF37]">
                Quelque Chose d'Incroyable
              </span>
            </h1>
            <p className="hero-subtitle-responsive text-white/80 max-w-2xl mx-auto mb-6 sm:mb-8 font-light leading-relaxed">
              Disponible pour des commissions en Algérie et à l'international. Discutons de votre vision et donnons-lui vie.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="section-padding">
        <div className="max-w-6xl mx-auto container-responsive">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            
            {/* Contact Form - 2 columns */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="card-responsive bg-black/50 border border-white/10">
                <h2 className="section-title-responsive text-[#D4AF37] mb-6 sm:mb-8">Envoyer email</h2>
                
                {showSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-6 text-center"
                  >
                    <p className="text-[#D4AF37] text-lg font-semibold text-center shadow-lg shadow-[#D4AF37]/30">
                      Merci ! Votre message a été envoyé avec succès. Rahim vous contactera bientôt.
                    </p>
                  </motion.div>
                )}

                {showError && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-6 text-center"
                  >
                    <p className="text-orange-500 text-lg font-semibold text-center">
                      {errorMessage}
                    </p>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div>
                    <label htmlFor="fullName" className="block text-white/80 text-sm font-medium mb-2">
                      Nom Complet *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="form-input-responsive w-full bg-black/50 border border-white/20 text-white placeholder-white/50 focus:border-[#D4AF37] focus:outline-none rounded-none"
                      placeholder="Entrez votre nom complet"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-white/80 text-sm font-medium mb-2">
                      Adresse E-mail *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="form-input-responsive w-full bg-black/50 border border-white/20 text-white placeholder-white/50 focus:border-[#D4AF37] focus:outline-none rounded-none"
                      placeholder="votre@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="serviceType" className="block text-white/80 text-sm font-medium mb-2">
                      Type de Service *
                    </label>
                    <select
                      id="serviceType"
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleInputChange}
                      required
                      className="form-input-responsive w-full bg-black/50 border border-white/20 text-white focus:border-[#D4AF37] focus:outline-none rounded-none"
                    >
                      <option value="">Sélectionnez un type de service</option>
                      <option value="wedding">Mariage</option>
                      <option value="commercial">Commercial</option>
                      <option value="music-video">Vidéo Musicale</option>
                      <option value="other">Autre</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="projectDescription" className="block text-white/80 text-sm font-medium mb-2">
                      Description du Projet *
                    </label>
                    <textarea
                      id="projectDescription"
                      name="projectDescription"
                      value={formData.projectDescription}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="form-input-responsive w-full bg-black/50 border border-white/20 text-white placeholder-white/50 focus:border-[#D4AF37] focus:outline-none rounded-none resize-none"
                      placeholder="Décrivez votre projet et votre vision..."
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isLoading}
                    className="form-button-responsive button-responsive-lg bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black text-lg px-8 py-4 rounded-none font-semibold transition-all duration-300 shadow-lg hover:shadow-[#D4AF37]/25 disabled:opacity-50 disabled:cursor-not-allowed touch-target"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin mr-2"></div>
                        Envoi en cours...
                      </div>
                    ) : (
                      'Envoyer le Message'
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* Social Media Sidebar - 1 column */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6 sm:space-y-8"
            >
              {/* Stay Connected */}
              <div className="card-responsive bg-black/50 border border-white/10">
                <h3 className="section-title-responsive text-[#D4AF37] mb-4 sm:mb-6">Réseaux Sociaux</h3>
                <p className="text-white/70 mb-4 sm:mb-6 text-sm sm:text-base">
                  Suivez-nous pour découvrir nos derniers projets et coulisses.
                </p>
                
                <div className="space-y-3 sm:space-y-4">
                  <a
                    href="https://www.instagram.com/rahim.mrbt?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 border border-white/10 hover:border-[#D4AF37]/50 hover:bg-white/5 transition-all group touch-target"
                  >
                    <Instagram className="text-[#D4AF37] w-5 h-5 sm:w-6 sm:h-6 group-hover:shadow-lg group-hover:shadow-[#D4AF37]/30 transition-all duration-300" />
                    <div>
                      <h4 className="text-white font-semibold text-sm sm:text-base">Instagram</h4>
                      <p className="text-white/50 text-xs sm:text-sm">@rahim.mrbt</p>
                    </div>
                  </a>

                  <a
                    href="https://www.facebook.com/rahim.merabet.412488/about/?fb_profile_edit_entry_point=%7B%22click_point%22%3A%22edit_profile_button%22%2C%22feature%22%3A%22profile_header%22%7D&id=100072671658300&sk=about&locale=fr_FR"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 border border-white/10 hover:border-[#D4AF37]/50 hover:bg-white/5 transition-all group touch-target"
                  >
                    <Facebook className="text-[#D4AF37] w-5 h-5 sm:w-6 sm:h-6 group-hover:shadow-lg group-hover:shadow-[#D4AF37]/30 transition-all duration-300" />
                    <div>
                      <h4 className="text-white font-semibold text-sm sm:text-base">Facebook</h4>
                      <p className="text-white/50 text-xs sm:text-sm">Rahim Merabet</p>
                    </div>
                  </a>

                  <a
                    href="https://www.linkedin.com/in/merabet-abderrahim-58a46b331?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 border border-white/10 hover:border-[#D4AF37]/50 hover:bg-white/5 transition-all group touch-target"
                  >
                    <Linkedin className="text-[#D4AF37] w-5 h-5 sm:w-6 sm:h-6 group-hover:shadow-lg group-hover:shadow-[#D4AF37]/30 transition-all duration-300" />
                    <div>
                      <h4 className="text-white font-semibold text-sm sm:text-base">LinkedIn</h4>
                      <p className="text-white/50 text-xs sm:text-sm">Abderrahim Merabet</p>
                    </div>
                  </a>

                  <a
                    href="https://wa.me/213660951299"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 border border-white/10 hover:border-[#D4AF37]/50 hover:bg-white/5 transition-all group touch-target"
                  >
                    <MessageCircle className="text-[#D4AF37] w-5 h-5 sm:w-6 sm:h-6 group-hover:shadow-lg group-hover:shadow-[#D4AF37]/30 transition-all duration-300" />
                    <div>
                      <h4 className="text-white font-semibold text-sm sm:text-base">WhatsApp</h4>
                      <p className="text-white/50 text-xs sm:text-sm">+213 660 951 299</p>
                    </div>
                  </a>
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
