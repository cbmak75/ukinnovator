import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import DetailedAssessment from "./pages/DetailedAssessment";
import Terms from "./pages/Terms";
import Resources from "./pages/Resources";
import Criteria from "./pages/Criteria";
import CriterionPage from "./pages/CriterionPage";
import Research from "./pages/Research";
import ResearchArticle from "./pages/ResearchArticle";
import SiteFooter from "./components/SiteFooter";
import ScrollToTop from "./components/ScrollToTop";
import { ErrorBoundary } from "./components/ErrorBoundary";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <ErrorBoundary>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/detailed" element={<DetailedAssessment />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/criteria" element={<Criteria />} />
                <Route path="/innovation" element={<CriterionPage criterionSlug="innovation" />} />
                <Route path="/viability" element={<CriterionPage criterionSlug="viability" />} />
                <Route path="/scalability" element={<CriterionPage criterionSlug="scalability" />} />
                <Route path="/research" element={<Research />} />
                <Route path="/research/:slug" element={<ResearchArticle />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </ErrorBoundary>
            <SiteFooter />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
