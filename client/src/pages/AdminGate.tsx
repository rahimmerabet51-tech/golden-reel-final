import { useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";

export default function AdminGate() {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [, setLocation] = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple hardcoded PIN check
    if (pin === "GOLDEN_KEY") {
      // Store access in sessionStorage
      sessionStorage.setItem("adminAccess", "granted");
      setLocation("/admin/upload");
    } else {
      setError("Invalid access code. Please try again.");
      setPin("");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="bg-black border-4 border-yellow-400 p-8 shadow-[8px_8px_0px_0px_rgba(250,204,21,1)]">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-yellow-400 mb-2">Admin Access</h1>
            <p className="text-gray-400">Enter your access code to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Enter access code"
                className="w-full px-4 py-3 bg-black border-2 border-gray-700 text-white placeholder-gray-500 focus:border-yellow-400 focus:outline-none transition-colors"
                required
              />
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-400 text-sm text-center"
              >
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              className="w-full bg-yellow-400 text-black font-bold py-3 px-6 border-4 border-yellow-400 hover:bg-yellow-300 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              Access Admin Panel
            </button>
          </form>

          <div className="mt-8 text-center">
            <button
              onClick={() => setLocation("/")}
              className="text-gray-500 hover:text-yellow-400 transition-colors text-sm"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
