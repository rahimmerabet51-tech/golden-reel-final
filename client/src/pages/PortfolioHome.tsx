import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Clients } from "@/components/Clients";

export default function PortfolioHome() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-dark-bg text-white"
    >
      <Navigation />
      <Hero />
      <About />
      <Services />
      <Clients />
      <Footer />
    </motion.div>
  );
}
