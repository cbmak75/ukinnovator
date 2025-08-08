import React from "react";

const SiteFooter = () => {
  return (
    <footer role="contentinfo" aria-label="Site footer" className="border-t bg-background">
      <div className="container mx-auto px-4 py-6 text-center">
        <p className="text-sm font-medium text-foreground">© 2025 Legal Artificial Intelligence Development Ltd. All rights reserved.</p>
        <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
          This tool provides a preliminary assessment for informational purposes only. It does not constitute legal advice or guarantee visa approval.
        </p>
        <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
          For official guidance, consult with qualified immigration professionals and refer to UK Government official sources.
        </p>
      </div>
    </footer>
  );
};

export default SiteFooter;
