export function Footer() {
  return (
    <footer className="bg-black py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-serif font-bold text-white tracking-wider mb-2">
            <span className="text-primary">Rahim</span> Merabet
          </h2>
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Rahim Merabet. All rights reserved.
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
