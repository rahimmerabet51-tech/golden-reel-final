import { useState } from "react";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Mail, Phone, MapPin, Clock, Instagram, Facebook, Linkedin, MessageCircle } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    serviceType: "",
    projectDescription: ""
  });
  
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000);
    
    // Reset form
    setFormData({
      fullName: "",
      email: "",
      serviceType: "",
      projectDescription: ""
    });
  };

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
              Get In Touch
            </span>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4 leading-tight">
              Let's Create<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-200 to-primary">
                Something Amazing
              </span>
            </h1>
            <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto mb-6 font-light leading-relaxed">
              Available for commissions across Algeria and internationally. Let's discuss your vision and bring it to life.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Contact Form - 2 columns */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="bg-black/50 border border-white/10 p-8">
                <h2 className="text-3xl font-serif text-primary mb-8">Send Us a Message</h2>
                
                {showSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-primary/20 border border-primary/50 rounded-none"
                  >
                    <p className="text-primary font-semibold">Thank you for your message! We'll get back to you soon.</p>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="fullName" className="block text-white/80 text-sm font-medium mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-black/50 border border-white/20 text-white placeholder-white/50 focus:border-primary focus:outline-none rounded-none"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-white/80 text-sm font-medium mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-black/50 border border-white/20 text-white placeholder-white/50 focus:border-primary focus:outline-none rounded-none"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="serviceType" className="block text-white/80 text-sm font-medium mb-2">
                      Service Type *
                    </label>
                    <select
                      id="serviceType"
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-black/50 border border-white/20 text-white focus:border-primary focus:outline-none rounded-none"
                    >
                      <option value="">Select a service type</option>
                      <option value="wedding">Wedding</option>
                      <option value="commercial">Commercial</option>
                      <option value="music-video">Music Video</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="projectDescription" className="block text-white/80 text-sm font-medium mb-2">
                      Project Description *
                    </label>
                    <textarea
                      id="projectDescription"
                      name="projectDescription"
                      value={formData.projectDescription}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-black/50 border border-white/20 text-white placeholder-white/50 focus:border-primary focus:outline-none rounded-none resize-none"
                      placeholder="Please describe your project and vision..."
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-primary text-black hover:bg-primary/90 text-lg px-8 py-4 rounded-none font-semibold"
                  >
                    Send Message
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* Social Media Sidebar - 1 column */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Stay Connected */}
              <div className="bg-black/50 border border-white/10 p-8">
                <h3 className="text-2xl font-serif text-primary mb-6">Stay Connected</h3>
                <p className="text-white/70 mb-6">
                  Follow us on social media for updates and behind-the-scenes content.
                </p>
                
                <div className="space-y-4">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-4 p-4 border border-white/10 hover:border-primary/50 hover:bg-white/5 transition-all group"
                  >
                    <Instagram className="text-primary w-6 h-6" />
                    <div>
                      <h4 className="text-white font-semibold">Instagram</h4>
                      <p className="text-white/50 text-sm">Rahim Merabet</p>
                    </div>
                  </a>

                  <a
                    href="mailto:contact@rahimmerabet.com"
                    className="flex items-center gap-4 p-4 border border-white/10 hover:border-primary/50 hover:bg-white/5 transition-all group"
                  >
                    <Mail className="text-primary w-6 h-6" />
                    <div>
                      <h4 className="text-white font-semibold">Email</h4>
                      <span>contact@rahimmerabet.com</span>
                    </div>
                  </a>

                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-4 p-4 border border-white/10 hover:border-primary/50 hover:bg-white/5 transition-all group"
                  >
                    <Facebook className="text-primary w-6 h-6" />
                    <div>
                      <h4 className="text-white font-semibold">Facebook</h4>
                      <p className="text-white/50 text-sm">Rahim Merabet</p>
                    </div>
                  </a>

                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-4 p-4 border border-white/10 hover:border-primary/50 hover:bg-white/5 transition-all group"
                  >
                    <Linkedin className="text-primary w-6 h-6" />
                    <div>
                      <h4 className="text-white font-semibold">LinkedIn</h4>
                      <p className="text-white/50 text-sm">Professional Network</p>
                    </div>
                  </a>

                  <a
                    href="https://wa.me/213555000000"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-4 p-4 border border-white/10 hover:border-primary/50 hover:bg-white/5 transition-all group"
                  >
                    <MessageCircle className="text-primary w-6 h-6" />
                    <div>
                      <h4 className="text-white font-semibold">WhatsApp</h4>
                      <p className="text-white/50 text-sm">+213 555 00 00 00</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Quick Contact Info */}
              <div className="bg-black/50 border border-white/10 p-8">
                <h3 className="text-2xl font-serif text-primary mb-6">Quick Info</h3>
                <div className="space-y-4 text-white/80">
                  <div className="flex items-center gap-3">
                    <Mail className="text-primary w-5 h-5" />
                    <span>contact@rahimmerabet.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="text-primary w-5 h-5" />
                    <span>+213 555 00 00 00</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="text-primary w-5 h-5" />
                    <span>Algiers, Algeria</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="text-primary w-5 h-5" />
                    <span>Mon-Sat: 9AM-8PM</span>
                  </div>
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
