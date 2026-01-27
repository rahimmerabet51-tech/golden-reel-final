import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { AlertCircle, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-dark-bg text-white"
    >
      <Navigation />
      
      <section className="relative min-h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-black/90"></div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-10 h-10 text-primary" />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4 leading-tight">
              404 <span className="text-primary">Page Not Found</span>
            </h1>
            
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8 font-light leading-relaxed">
              The page you're looking for doesn't exist or has been moved. Let's get you back to something beautiful.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-primary text-black hover:bg-primary/90 text-lg px-8 py-4 rounded-none"
                asChild
              >
                <Link href="/">
                  <Home className="w-5 h-5 mr-2" />
                  Back to Home
                </Link>
              </Button>
              
              <Button 
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 hover:text-white hover:border-white text-lg px-8 py-4 rounded-none"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Go Back
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </motion.div>
  );
}
