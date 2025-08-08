import React from "react";

export const SiteHeader: React.FC = () => {
  return (
    <header className="text-center space-y-4 py-8 bg-header">
      <img
        src="/lovable-uploads/7c3ada4e-ea41-46c3-9af2-c6bcb785a131.png"
        alt="ukinnovator.online – pre-assessment tool for Innovator Founders: innovation, scalability, viability"
        className="w-full max-w-4xl mx-auto h-auto"
        loading="lazy"
      />
      <h1 className="sr-only">ukinnovator.online</h1>
    </header>
  );
};

export default SiteHeader;
