import React from "react";
import { Link } from "react-router-dom";

export const SiteHeader: React.FC = () => {
  return (
    <header className="text-center space-y-4 py-8 bg-header" role="banner">
      <Link to="/" aria-label="ukinnovator.online – Go to homepage">
        <img
          src="/lovable-uploads/7c3ada4e-ea41-46c3-9af2-c6bcb785a131.png"
          alt="ukinnovator.online – AI pre-assessment tool for UK Innovator Founder Visa"
          className="w-full max-w-4xl mx-auto h-auto"
          loading="lazy"
          width="800"
          height="200"
        />
      </Link>
      <nav aria-label="Main navigation" className="flex flex-wrap justify-center gap-x-4 gap-y-2 px-4 text-sm">
        <Link to="/" className="text-primary-foreground hover:underline underline-offset-4">Home</Link>
        <Link to="/#assessment-tool" className="text-primary-foreground hover:underline underline-offset-4">Quick Assessment</Link>
        <Link to="/detailed" className="text-primary-foreground hover:underline underline-offset-4">Detailed Assessment</Link>
        <Link to="/criteria" className="text-primary-foreground hover:underline underline-offset-4">The Three Criteria</Link>
        <Link to="/research" className="text-primary-foreground hover:underline underline-offset-4">Research</Link>
        <Link to="/resources" className="text-primary-foreground hover:underline underline-offset-4">Resources</Link>
      </nav>
    </header>
  );
};

export default SiteHeader;
