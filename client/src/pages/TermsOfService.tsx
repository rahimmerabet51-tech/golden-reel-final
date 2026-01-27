import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, FileText, Camera, Calendar, DollarSign, Shield, AlertCircle } from "lucide-react";

export default function TermsOfService() {
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
              <FileText className="w-10 h-10 text-primary" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight">
              Terms of <span className="text-primary">Service</span>
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
                Welcome to Rahim Merabet Photography & Videography. These Terms of Service govern your use of our 
                website and photography/videography services. By accessing our website or booking our services, 
                you agree to these terms.
              </p>
            </motion.div>

            {/* Services Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3 mb-4">
                <Camera className="text-primary w-6 h-6" />
                <h2 className="text-2xl font-serif text-primary">Services Description</h2>
              </div>
              
              <div className="bg-black/50 border border-white/10 p-6">
                <p className="text-white/80 leading-relaxed mb-4">
                  Rahim Merabet provides professional photography and videography services including:
                </p>
                <ul className="text-white/80 space-y-2">
                  <li>• Wedding photography and videography</li>
                  <li>• Corporate events and commercial projects</li>
                  <li>• Music video production</li>
                  <li>• Portrait and lifestyle photography</li>
                  <li>• Event coverage and documentary work</li>
                  <li>• Post-production and editing services</li>
                </ul>
              </div>
            </motion.div>

            {/* Booking and Payment */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="text-primary w-6 h-6" />
                <h2 className="text-2xl font-serif text-primary">Booking and Payment</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-black/50 border border-white/10 p-6">
                  <h3 className="text-white font-semibold mb-3">Booking Process</h3>
                  <ul className="text-white/70 space-y-2 text-sm">
                    <li>• Initial consultation and quote</li>
                    <li>• 50% deposit to secure date</li>
                    <li>• Signed service agreement</li>
                    <li>• Final payment due before delivery</li>
                  </ul>
                </div>
                
                <div className="bg-black/50 border border-white/10 p-6">
                  <h3 className="text-white font-semibold mb-3">Payment Terms</h3>
                  <ul className="text-white/70 space-y-2 text-sm">
                    <li>• Bank transfer or cash accepted</li>
                    <li>• Prices in Algerian Dinar (DZD)</li>
                    <li>• Payment plans available for large projects</li>
                    <li>• Non-refundable deposit policy</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Pricing and Fees */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3 mb-4">
                <DollarSign className="text-primary w-6 h-6" />
                <h2 className="text-2xl font-serif text-primary">Pricing and Fees</h2>
              </div>
              
              <div className="bg-black/50 border border-white/10 p-6">
                <p className="text-white/80 leading-relaxed mb-4">
                  All pricing is customized based on project requirements. Factors affecting pricing include:
                </p>
                <ul className="text-white/80 space-y-2">
                  <li>• Event duration and location</li>
                  <li>• Number of photographers/videographers required</li>
                  <li>• Equipment and editing requirements</li>
                  <li>• Travel and accommodation expenses</li>
                  <li>• Delivery timeline and format</li>
                </ul>
                <p className="text-primary mt-4 font-semibold">
                  Detailed quotes provided after initial consultation.
                </p>
              </div>
            </motion.div>

            {/* Client Responsibilities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-serif text-primary mb-4">Client Responsibilities</h2>
              <div className="bg-black/50 border border-white/10 p-6">
                <ul className="text-white/80 space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>Provide accurate event details and timeline</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>Ensure venue access and cooperation during shoot</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>Obtain necessary permits for locations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>Respect copyright and usage terms</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>Provide feedback during editing process</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Cancellation Policy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="text-primary w-6 h-6" />
                <h2 className="text-2xl font-serif text-primary">Cancellation Policy</h2>
              </div>
              
              <div className="bg-black/50 border border-white/10 p-6">
                <div className="text-white/80 space-y-3">
                  <p><strong>More than 30 days before event:</strong> Full refund of deposit</p>
                  <p><strong>15-30 days before event:</strong> 50% refund of deposit</p>
                  <p><strong>Less than 15 days before event:</strong> No refund of deposit</p>
                  <p><strong>Client cancellation on event day:</strong> Full payment required</p>
                  <p className="text-primary mt-4 text-sm">
                    In case of photographer emergency, full refund or alternative photographer will be provided.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Image Rights and Usage */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3 mb-4">
                <Shield className="text-primary w-6 h-6" />
                <h2 className="text-2xl font-serif text-primary">Image Rights and Usage</h2>
              </div>
              
              <div className="bg-black/50 border border-white/10 p-6">
                <p className="text-white/80 leading-relaxed mb-4">
                  Rahim Merabet retains copyright to all images and videos. Client receives usage rights as follows:
                </p>
                <ul className="text-white/80 space-y-2">
                  <li>• Personal use and social media sharing with credit</li>
                  <li>• Commercial use requires additional licensing</li>
                  <li>• Photographer may use images for portfolio and marketing</li>
                  <li>• Raw files remain property of photographer</li>
                  <li>• Editing and alterations by third parties prohibited</li>
                </ul>
              </div>
            </motion.div>

            {/* Limitation of Liability */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-serif text-primary mb-4">Limitation of Liability</h2>
              <div className="bg-black/50 border border-white/10 p-6">
                <p className="text-white/80 leading-relaxed">
                  While we strive for perfection, we cannot guarantee perfect conditions due to factors beyond our control 
                  (weather, equipment failure, etc.). Our liability is limited to the refund of payments made for the specific 
                  service in question.
                </p>
              </div>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-serif text-primary mb-4">Contact Us</h2>
              <div className="bg-black/50 border border-white/10 p-6">
                <p className="text-white/80 leading-relaxed mb-4">
                  For questions about these Terms of Service, please contact us:
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
