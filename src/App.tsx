import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import PortfolioHome from "@/pages/PortfolioHome";
import Profile from "@/pages/Profile";
import ContactPage from "@/pages/ContactPage";
import VideoPlayer from "@/pages/VideoPlayer";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import AdminPanel from "@/pages/AdminPanel";
import AdminGate from "@/pages/AdminGate";
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
      <Route path="/admin" component={AdminGate} />
      <Route path="/admin/upload" component={AdminPanel} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background text-foreground antialiased">
          <Toaster />
          <Router />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
