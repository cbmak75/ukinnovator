import React, { useEffect } from "react";
import SiteHeader from "@/components/SiteHeader";
import BackHomeButton from "@/components/BackHomeButton";

const Resources: React.FC = () => {
  useEffect(() => {
    // SEO: title and meta description
    document.title = "Innovator Founder Visa Resources";

    const metaDescription =
      "Curated official guidance, endorsing bodies, and legal advisors for UK Innovator Founder visa applicants.";
    let descEl = document.querySelector('meta[name="description"]');
    if (!descEl) {
      descEl = document.createElement("meta");
      descEl.setAttribute("name", "description");
      document.head.appendChild(descEl);
    }
    descEl.setAttribute("content", metaDescription);

    // Canonical
    const canonicalHref = `${window.location.origin}/resources`;
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalHref);

    // Structured data (ItemList)
    const resources = [
      { name: "UKVI Innovator Founder Visa Overview and Eligibility", url: "https://www.gov.uk/innovator-founder-visa" },
      { name: "Immigration Rules Appendix Innovator Founder", url: "https://www.gov.uk/guidance/immigration-rules/immigration-rules-appendix-innovator-founder" },
      { name: "Innovator Founder Visa Caseworker Guidance", url: "https://www.gov.uk/government/publications/innovator-appendix-w-workers/innovator-founder-caseworker-guidance-accessible" },
      { name: "Official List of Endorsing Bodies", url: "https://www.gov.uk/government/publications/endorsing-bodies-innovator-founder-and-scale-up-visas/innovator-founder-and-scale-up-visas-endorsing-bodies" },
      { name: "UK Endorsing Services", url: "https://www.ukesapp.co.uk/" },
      { name: "Innovator International", url: "https://www.innovatorinternational.com/" },
      { name: "Envestors Limited", url: "https://envestors-visa-endorsement.co.uk" },
      { name: "The Global Entrepreneurs Programme (GEP)", url: "https://www.great.gov.uk/international/content/invest/how-to-setup-in-the-uk/global-entrepreneur-program/" },
      { name: "Lawyery", url: "https://www.lawyery.co/innovator-founder-visa" },
      { name: "Horsfield Menzies", url: "https://www.horsfieldmenzies.com/employment-law" },
      { name: "Impact Lawyers", url: "https://www.impactlawyers.co.uk/" },
      { name: "ALT Legal", url: "https://alt-legal.co.uk/" },
    ];

    const ldJson = {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Innovator Founder Visa Resources',
      description: metaDescription,
      url: canonicalHref,
      hasPart: resources.map((r) => ({ '@type': 'WebPage', name: r.name, url: r.url })),
    };

    let ldEl = document.getElementById("ld-resources") as HTMLScriptElement | null;
    if (!ldEl) {
      ldEl = document.createElement("script") as HTMLScriptElement;
      ldEl.setAttribute("type", "application/ld+json");
      ldEl.id = "ld-resources";
      document.head.appendChild(ldEl);
    }
    ldEl.textContent = JSON.stringify(ldJson);

    return () => {
      // keep canonical and meta; structured data can remain or be cleared if needed
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-5xl">
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
  );
};

export default Resources;
