import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, Shield, Eye, Lock, Cookie, Database, UserCheck } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-dark-bg text-white"
    >
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-12"
          >
            <Button 
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 hover:text-white hover:border-white rounded-none px-6 py-3 mb-8"
              asChild
            >
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
            
            <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10 text-primary" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight">
              Privacy <span className="text-primary">Policy</span>
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 px-6 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            
            {/* Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-serif text-primary mb-4">Introduction</h2>
              <p className="text-white/80 leading-relaxed">
                At Rahim Merabet Photography & Videography, we respect your privacy and are committed to protecting your personal data. 
                This privacy policy explains how we collect, use, and protect your information when you use our website and services.
              </p>
            </motion.div>

            {/* Information We Collect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3 mb-4">
                <Database className="text-primary w-6 h-6" />
                <h2 className="text-2xl font-serif text-primary">Information We Collect</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-black/50 border border-white/10 p-6">
                  <h3 className="text-white font-semibold mb-3">Personal Information</h3>
                  <ul className="text-white/70 space-y-2 text-sm">
                    <li>• Name and contact details</li>
                    <li>• Email address and phone number</li>
                    <li>• Project requirements and preferences</li>
                    <li>• Event dates and locations</li>
                  </ul>
                </div>
                
                <div className="bg-black/50 border border-white/10 p-6">
                  <h3 className="text-white font-semibold mb-3">Technical Information</h3>
                  <ul className="text-white/70 space-y-2 text-sm">
                    <li>• IP address and browser type</li>
                    <li>• Device information</li>
                    <li>• Pages visited and time spent</li>
                    <li>• Cookies and usage data</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* How We Use Your Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3 mb-4">
                <Eye className="text-primary w-6 h-6" />
                <h2 className="text-2xl font-serif text-primary">How We Use Your Information</h2>
              </div>
              
              <div className="bg-black/50 border border-white/10 p-6">
                <ul className="text-white/80 space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>To provide photography and videography services</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>To communicate with clients about projects and appointments</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>To process payments and manage bookings</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>To improve our website and services</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>To send marketing communications (with consent)</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Data Protection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3 mb-4">
                <Lock className="text-primary w-6 h-6" />
                <h2 className="text-2xl font-serif text-primary">Data Protection</h2>
              </div>
              
              <div className="bg-black/50 border border-white/10 p-6">
                <p className="text-white/80 leading-relaxed mb-4">
                  We implement appropriate security measures to protect your personal information against unauthorized access, 
                  alteration, disclosure, or destruction. This includes:
                </p>
                <ul className="text-white/80 space-y-2">
                  <li>• Secure servers and encryption</li>
                  <li>• Regular security updates</li>
                  <li>• Limited access to personal data</li>
                  <li>• Secure payment processing</li>
                </ul>
              </div>
            </motion.div>

            {/* Cookies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3 mb-4">
                <Cookie className="text-primary w-6 h-6" />
                <h2 className="text-2xl font-serif text-primary">Cookies</h2>
              </div>
              
              <div className="bg-black/50 border border-white/10 p-6">
                <p className="text-white/80 leading-relaxed">
                  Our website uses cookies to enhance your experience. These are small text files stored on your device 
                  that help us remember your preferences and analyze website traffic. You can control cookie settings 
                  through your browser preferences.
                </p>
              </div>
            </motion.div>

            {/* Your Rights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3 mb-4">
                <UserCheck className="text-primary w-6 h-6" />
                <h2 className="text-2xl font-serif text-primary">Your Rights</h2>
              </div>
              
              <div className="bg-black/50 border border-white/10 p-6">
                <p className="text-white/80 leading-relaxed mb-4">
                  You have the right to:
                </p>
                <ul className="text-white/80 space-y-2">
                  <li>• Access your personal information</li>
                  <li>• Correct inaccurate data</li>
                  <li>• Request deletion of your data</li>
                  <li>• Opt-out of marketing communications</li>
                  <li>• Data portability</li>
                </ul>
              </div>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-serif text-primary mb-4">Contact Us</h2>
              <div className="bg-black/50 border border-white/10 p-6">
                <p className="text-white/80 leading-relaxed mb-4">
                  If you have any questions about this Privacy Policy or how we handle your data, please contact us:
                </p>
                <div className="text-white/80 space-y-2">
                  <p><strong>Email:</strong> contact@rahimmerabet.com</p>
                  <p><strong>Phone:</strong> +213 555 00 00 00</p>
                  <p><strong>Location:</strong> Algiers, Algeria</p>
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
