import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SEOHead from "@/components/SEOHead";
import AssessmentPrompt from "@/components/AssessmentPrompt";
import MarkdownContent from "@/components/MarkdownContent";
import SourcesBlock from "@/components/SourcesBlock";
import { criteria, type CriterionSlug } from "@/content/siteContent";
import legalPageContent from "@/content/legalPageContent.json";

const CriterionPage = ({ criterionSlug }: { criterionSlug?: CriterionSlug }) => {
  const params = useParams();
  const slug = criterionSlug ?? params.criterionSlug;
  const criterion = criteria.find((item) => item.slug === slug);
  if (!criterion) return <Navigate to="/criteria" replace />;

  const otherCriteria = criteria.filter((item) => item.slug !== criterion.slug);
  const pageContent = legalPageContent[`/${criterion.slug}`];

  return (
    <>
      <SEOHead title={criterion.seoTitle} description={criterion.seoDescription} canonicalPath={`/${criterion.slug}`} />
      <div className="min-h-screen">
        <SiteHeader />
        <main className="mx-auto max-w-5xl px-4 py-10">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground">
            <Link to="/" className="hover:underline">Home</Link> <span aria-hidden="true">/</span>{" "}
            <Link to="/criteria" className="hover:underline">The Three Criteria</Link> <span aria-hidden="true">/</span>{" "}
            <span aria-current="page">{criterion.label}</span>
          </nav>

          <article className="space-y-12">
            <header className="max-w-4xl">
              <p className="mb-3 text-sm font-semibold uppercase text-primary">Innovator Founder {criterion.label.toLowerCase()} criterion</p>
              <h1 className="text-4xl font-bold leading-tight text-foreground sm:text-5xl">{criterion.question}</h1>
              <p className="mt-5 text-xl leading-relaxed text-muted-foreground">A structured guide for founders asking “{criterion.searchPhrase}?” and looking for Innovator Founder requirements explained clearly.</p>
            </header>

            <section aria-label={`${criterion.label} guidance`}>
              <MarkdownContent content={pageContent} />
              <SourcesBlock />
            </section>

            <AssessmentPrompt text={`Test your idea’s ${criterion.label.toLowerCase()}`} />

            <section aria-labelledby="related-heading">
              <h2 id="related-heading" className="text-2xl font-semibold text-foreground">Explore the other criteria</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {otherCriteria.map((item) => (
                  <Link key={item.slug} to={`/${item.slug}`} className="flex items-center justify-between rounded-md border border-border bg-card p-4 font-semibold hover:bg-muted">
                    {item.question}<ArrowRight className="ml-3 h-5 w-5 shrink-0" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </section>
          </article>
        </main>
      </div>
    </>
  );
};

export default CriterionPage;