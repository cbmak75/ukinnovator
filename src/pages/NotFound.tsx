import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import SiteHeader from "@/components/SiteHeader";
import BackHomeButton from "@/components/BackHomeButton";
import SEOHead from "@/components/SEOHead";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <SEOHead
        title="Page Not Found | ukinnovator.online"
        description="The page you're looking for doesn't exist. Return to the UK Innovator Founder Visa assessment tool."
        noindex={true}
      />
      <div className="min-h-screen text-foreground">
        <SiteHeader />
        <main className="container mx-auto px-4 py-8 max-w-5xl">
          <div className="mb-6">
            <BackHomeButton variant="outline" size="sm" />
          </div>
          <section className="flex items-center justify-center py-16">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">404 – Page Not Found</h1>
              <p className="text-xl text-muted-foreground mb-4">Sorry, the page you're looking for doesn't exist.</p>
              <p className="text-muted-foreground mb-6">
                Try returning to our <a href="/" className="text-primary underline hover:no-underline">homepage</a> to assess your business idea.
              </p>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default NotFound;
