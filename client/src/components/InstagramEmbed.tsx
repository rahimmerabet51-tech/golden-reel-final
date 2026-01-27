import { motion } from "framer-motion";

interface InstagramEmbedProps {
  url: string;
  className?: string;
}

export function InstagramEmbed({ url, className = "" }: InstagramEmbedProps) {
  // Convert Instagram URL to embed URL
  const getEmbedUrl = (instagramUrl: string) => {
    // Remove any existing /embed and query parameters, then add /embed
    const cleanUrl = instagramUrl.split('?')[0].replace(/\/embed$/, '');
    return `${cleanUrl}/embed`;
  };

  const embedUrl = getEmbedUrl(url);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`w-full max-w-2xl mx-auto ${className}`}
    >
      {/* STACK Style Container */}
      <div className="relative">
        {/* Main container with STACK styling */}
        <div className="relative bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-none overflow-hidden">
          {/* Instagram iframe */}
          <div className="relative w-full" style={{ paddingBottom: '120%' }}>
            <iframe
              src={embedUrl}
              className="absolute top-0 left-0 w-full h-full border-0"
              scrolling="no"
              allowFullScreen
              title="Instagram Reel"
            />
          </div>
        </div>
        
        {/* Optional: Add a subtle stack effect with additional layers */}
        <div className="absolute -bottom-2 -right-2 w-full h-full bg-black border-4 border-black -z-10"></div>
        <div className="absolute -bottom-4 -right-4 w-full h-full bg-gray-800 border-4 border-black -z-20"></div>
      </div>
    </motion.div>
  );
}

export default InstagramEmbed;
