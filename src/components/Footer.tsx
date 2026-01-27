export function Footer() {
  return (
    <footer className="bg-black py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-serif font-bold text-white mb-2 flex items-baseline">
            <span className="text-2xl md:text-3xl">R</span>
            <span className="text-xl md:text-2xl font-sans font-light tracking-wider ml-1">motion</span>
          </h2>
          <p className="text-white/40 text-xs tracking-wider uppercase">
            DESIGN & DÉVELOPPEMENT CINÉMATIQUE
          </p>
          <p className="text-white/40 text-sm mt-2">
            © 2026 R motion. Tous droits réservés.
          </p>
        </div>
        
        <div className="flex gap-8">
          <a 
            href="/privacy-policy" 
            className="text-white/40 hover:text-primary text-sm transition-colors"
          >
            Privacy Policy
          </a>
          <a 
            href="/terms-of-service" 
            className="text-white/40 hover:text-primary text-sm transition-colors"
          >
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
