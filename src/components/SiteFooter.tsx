import React from "react";
import { Link } from "react-router-dom";
const SiteFooter = () => {
  return (
    <footer role="contentinfo" aria-label="Site footer" className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex items-center justify-center">
            <a href="https://legalaid.dev/" target="_blank" rel="noopener noreferrer" aria-label="Visit LegalAid (opens in a new tab)">
              <img
                src="/lovable-uploads/legalaid-logo-new.png"
                alt="LegalAid logo — Legal Artificial Intelligence Development"
                loading="lazy"
                decoding="async"
                className="h-20 sm:h-24 w-auto"
              />
            </a>
          </div>
          <p className="text-sm font-medium">© 2025 Legal Artificial Intelligence Development Ltd. All rights reserved.</p>
          <p className="mt-2 text-xs sm:text-sm">
            This tool provides a preliminary assessment for informational purposes only. It does not constitute legal advice or guarantee visa approval.
          </p>
          <p className="mt-1 text-xs sm:text-sm">
            For official guidance, consult with qualified immigration professionals and refer to UK Government official sources.
          </p>
          <nav aria-label="Footer navigation" className="mt-4">
            <ul className="flex flex-wrap items-center gap-4 justify-center text-sm">
              <li>
                <Link to="/resources" className="underline-offset-4 hover:underline">Resources</Link>
              </li>
              <li>
                <Link to="/terms" className="underline-offset-4 hover:underline">Terms</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
