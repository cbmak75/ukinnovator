import React from "react";
import SiteHeader from "@/components/SiteHeader";
import BackHomeButton from "@/components/BackHomeButton";
import SEOHead from "@/components/SEOHead";

const Resources: React.FC = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "UK Innovator Founder Visa Resources",
    "description": "Essential resources for UK Innovator Founder Visa applicants. Official requirements, endorsement body information, business plan guidance and application tips.",
    "url": "https://www.ukinnovator.online/resources",
    "datePublished": "2024-01-01",
    "dateModified": "2026-01-18",
    "author": {
      "@type": "Person",
      "name": "Chris Dias"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Legal Artificial Intelligence Development (Legalaid) Ltd"
    },
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "UKVI Innovator Founder Visa Overview", "url": "https://www.gov.uk/innovator-founder-visa" },
        { "@type": "ListItem", "position": 2, "name": "Immigration Rules Appendix", "url": "https://www.gov.uk/guidance/immigration-rules/immigration-rules-appendix-innovator-founder" },
        { "@type": "ListItem", "position": 3, "name": "Caseworker Guidance", "url": "https://www.gov.uk/government/publications/innovator-appendix-w-workers/innovator-founder-caseworker-guidance-accessible" },
        { "@type": "ListItem", "position": 4, "name": "Official Endorsing Bodies List", "url": "https://www.gov.uk/government/publications/endorsing-bodies-innovator-founder-and-scale-up-visas/innovator-founder-and-scale-up-visas-endorsing-bodies" },
        { "@type": "ListItem", "position": 5, "name": "UK Endorsing Services", "url": "https://www.ukesapp.co.uk/" },
        { "@type": "ListItem", "position": 6, "name": "Innovator International", "url": "https://www.innovatorinternational.com/" },
        { "@type": "ListItem", "position": 7, "name": "Envestors Limited", "url": "https://envestors-visa-endorsement.co.uk" },
        { "@type": "ListItem", "position": 8, "name": "Global Entrepreneurs Programme", "url": "https://www.great.gov.uk/international/content/invest/how-to-setup-in-the-uk/global-entrepreneur-program/" }
      ]
    }
  };

  return (
    <>
      <SEOHead
        title="UK Innovator Founder Visa Resources | Guides, Requirements & Tips"
        description="Essential resources for UK Innovator Founder Visa applicants. Official requirements, endorsement body information, business plan guidance and application tips."
        canonicalPath="/resources"
        structuredData={structuredData}
      />
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1 container mx-auto px-4 py-8 max-w-5xl" role="main">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-sm text-muted-foreground" itemScope itemType="https://schema.org/BreadcrumbList">
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <a href="/" className="hover:underline" itemProp="item"><span itemProp="name">Home</span></a>
                <meta itemProp="position" content="1" />
              </li>
              <li aria-hidden="true">/</li>
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <span aria-current="page" className="text-foreground" itemProp="name">Resources</span>
                <meta itemProp="position" content="2" />
              </li>
            </ol>
          </nav>
          <div className="mb-6">
            <BackHomeButton variant="outline" size="sm" />
          </div>

          <header className="mb-6">
            <h1 className="text-3xl font-semibold text-foreground">Resources for Innovator Founder Visa Applicants</h1>
            <p className="text-muted-foreground mt-2">
              Below is a curated list of essential resources for applicants seeking the UK Innovator Founder visa. Each entry includes a link
              and a brief description of its relevance, focusing on official guidance, endorsing bodies, and specified legal and advisory
              services. All information is accurate as of the latest available data and presented in UK English.
            </p>
            <p className="text-sm text-muted-foreground mt-2">Last updated: January 2026 • Curated by Chris Dias, Legalaid Ltd</p>
          </header>

        <section aria-labelledby="official-guidance" className="mb-10">
          <h2 id="official-guidance" className="text-2xl font-semibold text-foreground mb-4">Official UKVI Guidance</h2>
          <ul className="space-y-4">
            <li>
              <article>
                <a className="text-primary underline-offset-4 hover:underline" href="https://www.gov.uk/innovator-founder-visa" target="_blank" rel="noopener noreferrer">
                  UKVI Innovator Founder Visa Overview and Eligibility
                </a>
                <p className="text-muted-foreground">Outlines eligibility criteria, required documents, application processes, extensions, switching, and family inclusion options for the Innovator Founder visa.</p>
              </article>
            </li>
            <li>
              <article>
                <a className="text-primary underline-offset-4 hover:underline" href="https://www.gov.uk/guidance/immigration-rules/immigration-rules-appendix-innovator-founder" target="_blank" rel="noopener noreferrer">
                  Immigration Rules Appendix Innovator Founder
                </a>
                <p className="text-muted-foreground">Details the legal requirements for the visa, covering endorsement, business viability, and settlement pathways.</p>
              </article>
            </li>
            <li>
              <article>
                <a className="text-primary underline-offset-4 hover:underline" href="https://www.gov.uk/government/publications/innovator-appendix-w-workers/innovator-founder-caseworker-guidance-accessible" target="_blank" rel="noopener noreferrer">
                  Innovator Founder Visa Caseworker Guidance
                </a>
                <p className="text-muted-foreground">Provides insight into how UKVI caseworkers assess applications, including evaluation of business ideas, endorsements, and extension criteria.</p>
              </article>
            </li>
          </ul>
        </section>

        <section aria-labelledby="endorsing-bodies" className="mb-10">
          <h2 id="endorsing-bodies" className="text-2xl font-semibold text-foreground mb-4">Endorsing Bodies</h2>
          <ul className="space-y-4">
            <li>
              <article>
                <a className="text-primary underline-offset-4 hover:underline" href="https://www.gov.uk/government/publications/endorsing-bodies-innovator-founder-and-scale-up-visas/innovator-founder-and-scale-up-visas-endorsing-bodies" target="_blank" rel="noopener noreferrer">
                  Official List of Endorsing Bodies for Innovator Founder Visa
                </a>
                <p className="text-muted-foreground">Lists authorised endorsing bodies required to validate your innovative business idea. Includes legacy bodies (no longer accepting new applications) for reference.</p>
              </article>
            </li>
          </ul>
        </section>

        <section aria-labelledby="active-bodies" className="mb-10">
          <h2 id="active-bodies" className="text-2xl font-semibold text-foreground mb-4">Current active business endorsing bodies and their websites:</h2>
          <ul className="space-y-4">
            <li>
              <article>
                <a className="text-primary underline-offset-4 hover:underline" href="https://www.innovatorinternational.com/" target="_blank" rel="noopener noreferrer">
                  Innovator International
                </a>
                <p className="text-muted-foreground">Supports international entrepreneurs with scalable, viable business ideas for the UK market.</p>
              </article>
            </li>
            <li>
              <article>
                <a className="text-primary underline-offset-4 hover:underline" href="https://www.ukesapp.co.uk/" target="_blank" rel="noopener noreferrer">
                  UK Endorsing Services
                </a>
                <p className="text-muted-foreground">Authorised to endorse applicants establishing innovative businesses in the UK.</p>
              </article>
            </li>
            <li>
              <article>
                <a className="text-primary underline-offset-4 hover:underline" href="https://envestors-visa-endorsement.co.uk" target="_blank" rel="noopener noreferrer">
                  Envestors Limited
                </a>
                <p className="text-muted-foreground">An investment network endorsing founders based on business potential and investor connections.</p>
              </article>
            </li>
            <li>
              <article>
                <a className="text-primary underline-offset-4 hover:underline" href="https://www.great.gov.uk/international/content/invest/how-to-setup-in-the-uk/global-entrepreneur-program/" target="_blank" rel="noopener noreferrer">
                  The Global Entrepreneurs Programme (GEP)
                </a>
                <p className="text-muted-foreground">A UK government initiative by the Department for Business and Trade, endorsing tech-based entrepreneurs scaling businesses from a UK headquarters.</p>
              </article>
            </li>
          </ul>
        </section>

        <section aria-labelledby="legal-advisory" className="mb-10">
          <h2 id="legal-advisory" className="text-2xl font-semibold text-foreground mb-4">Legal and Advisory Resources</h2>
          <ul className="space-y-4">
            <li>
              <article>
                <a className="text-primary underline-offset-4 hover:underline" href="https://www.lawyery.co/innovator-founder-visa" target="_blank" rel="noopener noreferrer">
                  Lawyery
                </a>
                <p className="text-muted-foreground">A London-based firm specialising in immigration law, offering tailored guidance and services for Innovator Founder visa applicants, including business plan support and endorsement assistance.</p>
              </article>
            </li>
            <li>
              <article>
                <a className="text-primary underline-offset-4 hover:underline" href="https://www.horsfieldmenzies.com/employment-law" target="_blank" rel="noopener noreferrer">
                  Horsfield Menzies
                </a>
                <p className="text-muted-foreground">Based in London and Manchester, their business immigration department provides expert advice on employment law and immigration matters for growing UK businesses.</p>
              </article>
            </li>
            <li>
              <article>
                <a className="text-primary underline-offset-4 hover:underline" href="https://www.impactlawyers.co.uk/" target="_blank" rel="noopener noreferrer">
                  Impact Lawyers
                </a>
                <p className="text-muted-foreground">A web-based firm offering a range of business services, including immigration support for Innovator Founder visa applications, focusing on startups and SMEs with a positive impact.</p>
              </article>
            </li>
            <li>
              <article>
                <a className="text-primary underline-offset-4 hover:underline" href="https://alt-legal.co.uk/" target="_blank" rel="noopener noreferrer">
                  ALT Legal
                </a>
                <p className="text-muted-foreground">A Leeds-based firm specialising in SME business advice, covering corporate, commercial, and employment law to support Innovator Founder visa applicants.</p>
              </article>
            </li>
          </ul>
        </section>
      </main>
    </div>
    </>
  );
};

export default Resources;
