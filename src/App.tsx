import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LoginButton } from "@/components/LoginButton";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import PortfolioHome from "@/pages/PortfolioHome";
import Profile from "@/pages/Profile";
import ContactPage from "@/pages/ContactPage";
import VideoPlayer from "@/pages/VideoPlayer";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import LoginPage from "@/pages/LoginPage";
import AdminPanel from "@/pages/AdminPanel";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={PortfolioHome} />
      <Route path="/profile" component={Profile} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/video/:id" component={VideoPlayer} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/terms-of-service" component={TermsOfService} />
      <Route path="/login" component={LoginPage} />
      <Route path="/admin">
        <ProtectedRoute>
          <AdminPanel />
        </ProtectedRoute>
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background text-foreground antialiased relative">
          {/* Cinematic Aura - Top Glow */}
          <div className="fixed top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-b from-yellow-600/20 via-yellow-600/10 to-transparent rounded-full blur-3xl opacity-20 pointer-events-none z-[-1]" />
          
          {/* Cinematic Aura - Bottom Glow */}
          <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-t from-yellow-600/20 via-yellow-600/10 to-transparent rounded-full blur-3xl opacity-20 pointer-events-none z-[-1]" />
          
          <Toaster />
          <Router />
          <LoginButton />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
