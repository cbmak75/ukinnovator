import React from "react";

const SiteFooter = () => {
  return (
    <footer role="contentinfo" aria-label="Site footer" className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <img
            src="/lovable-uploads/10eb0b13-ad91-4951-bb02-f0382be897fa.png"
            alt="LegalAid logo — Legal Artificial Intelligence Development"
            loading="lazy"
            decoding="async"
            className="h-10 sm:h-12 w-auto"
          />
          <p className="text-sm font-medium">© 2025 Legal Artificial Intelligence Development Ltd. All rights reserved.</p>
          <p className="mt-2 text-xs sm:text-sm">
            This tool provides a preliminary assessment for informational purposes only. It does not constitute legal advice or guarantee visa approval.
          </p>
          <p className="mt-1 text-xs sm:text-sm">
            For official guidance, consult with qualified immigration professionals and refer to UK Government official sources.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
