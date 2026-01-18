import React from "react";
import { Link } from "react-router-dom";

const SiteFooter = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer role="contentinfo" aria-label="Site footer" className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex items-center justify-center">
            <a href="https://legalaid.dev/" target="_blank" rel="noopener noreferrer" aria-label="Visit LegalAid - Legal Artificial Intelligence Development (opens in new tab)">
              <img
                src="/lovable-uploads/legalaid-logo-new.png"
                alt="LegalAid logo — Legal Artificial Intelligence Development Ltd"
                loading="lazy"
                decoding="async"
                width="200"
                height="80"
                className="h-20 sm:h-24 w-auto"
              />
            </a>
          </div>
          <p className="text-sm font-medium">© {currentYear} Legal Artificial Intelligence Development Ltd. All rights reserved.</p>
          <p className="mt-2 text-xs sm:text-sm">
            This tool provides a preliminary assessment for informational purposes only. It does not constitute legal advice or guarantee visa approval.
          </p>
          <p className="mt-1 text-xs sm:text-sm">
            For official guidance, consult with qualified immigration professionals and refer to <a href="https://www.gov.uk/innovator-founder-visa" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">UK Government official sources</a>.
          </p>
          
          {/* Enhanced footer navigation with more internal links */}
          <nav aria-label="Footer navigation" className="mt-4">
            <ul className="flex flex-wrap items-center gap-4 justify-center text-sm">
              <li>
                <Link to="/" className="underline-offset-4 hover:underline">Home</Link>
              </li>
              <li>
                <Link to="/detailed" className="underline-offset-4 hover:underline">Detailed Assessment</Link>
              </li>
              <li>
                <Link to="/resources" className="underline-offset-4 hover:underline">Resources</Link>
              </li>
              <li>
                <Link to="/terms" className="underline-offset-4 hover:underline">Terms</Link>
              </li>
              <li>
                <Link to="/#faq" className="underline-offset-4 hover:underline">FAQ</Link>
              </li>
            </ul>
          </nav>
          
          {/* Additional SEO-friendly content */}
          <aside className="mt-6 text-xs text-primary-foreground/70 max-w-2xl">
            <p>
              ukinnovator.online is a free AI-powered UK Innovator Founder Visa assessment tool developed by 
              <strong> Chris Dias</strong>, founder of Legalaid Ltd and specialist immigration solicitor at{" "}
              <a href="https://lawyery.co.uk" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">Lawyery</a>.
              Evaluate your business idea's innovation, scalability, and viability before applying for endorsement.
            </p>
          </aside>
          
          <p className="mt-4 text-xs text-primary-foreground/60">
            Contact: <a href="mailto:info@lawyery.co" className="underline hover:no-underline">info@lawyery.co</a> • 
            Last updated: January 2026
          </p>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
