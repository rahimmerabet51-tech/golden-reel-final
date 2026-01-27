import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle: string;
  align?: "left" | "center";
}

export function SectionHeading({ title, subtitle, align = "center" }: SectionHeadingProps) {
  return (
    <div className={`mb-16 ${align === "center" ? "text-center" : "text-left"}`}>
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="block text-primary uppercase tracking-[0.2em] text-sm font-semibold mb-3"
      >
        {subtitle}
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-4xl md:text-5xl font-serif font-bold text-white relative inline-block"
      >
        {title}
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: "60%" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className={`h-1 bg-primary mt-4 ${align === "center" ? "mx-auto" : ""}`}
        />
      </motion.h2>
    </div>
  );
}
