import { createRoot, hydrateRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.tsx'
import './index.css'

const routeMetadata: Record<string, { title: string; description: string }> = {
  "/innovation": {
    title: "What Counts as an Innovative Business Idea? | Innovator Founder Visa",
    description: "What INNF 8.3(a) requires, what endorsing bodies are told to look for, and the Home Office's own examples of ideas that pass and fail the innovation criterion.",
  },
  "/viability": {
    title: "What Makes a Business Idea Viable? | Innovator Founder Visa",
    description: "What INNF 8.3(b) and (c) require, why viability is assessed on the resources you already have, and the most common reasons the criterion fails.",
  },
  "/scalability": {
    title: "What Makes a Business Idea Scalable? | Innovator Founder Visa",
    description: "What INNF 8.3(d) requires, why structured planning matters as much as growth potential, and what endorsing bodies mean by high quality and skilled job creation.",
  },
  "/research/endorsement-assessment-process": {
    title: "How the Innovator Founder Endorsement Assessment Works",
    description: "Who the endorsing bodies are, what each publishes about its process, what endorsement and contact point meetings cost, and how to choose between them.",
  },
  "/research/why-applications-are-refused": {
    title: "Why Innovator Founder applications are refused | ukinnovator.online",
    description: "An evidence-based analysis of the substantive and procedural reasons Innovator Founder applications and endorsements may be refused.",
  },
  "/research/immigration-rules-and-guidance": {
    title: "Immigration Rules and guidance for Innovator Founder applications | ukinnovator.online",
    description: "How Appendix Innovator Founder, caseworker guidance and guidance for endorsing bodies combine in Innovator Founder applications.",
  },
};

const currentMetadata = routeMetadata[window.location.pathname.replace(/\/$/, "") || "/"];
if (currentMetadata) {
  document.title = currentMetadata.title;
  const descriptionTag = document.querySelector<HTMLMetaElement>('meta[name="description"]');
  descriptionTag?.setAttribute("content", currentMetadata.description);
}

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Application root was not found");

const app = (
  <HelmetProvider>
    <App />
  </HelmetProvider>
);

if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, app);
} else {
  createRoot(rootElement).render(app);
}
