import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowRight, CheckCircle2, CircleAlert, Search } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SEOHead from "@/components/SEOHead";
import AssessmentPrompt from "@/components/AssessmentPrompt";
import { Card, CardContent } from "@/components/ui/card";
import { criteria, type CriterionSlug } from "@/content/siteContent";

const placeholder = (description: string) => `[CONTENT TO BE SUPPLIED BY CHRIS DIAS: ${description}]`;

const CriterionPage = ({ criterionSlug }: { criterionSlug?: CriterionSlug }) => {
  const params = useParams();
  const slug = criterionSlug ?? params.criterionSlug;
  const criterion = criteria.find((item) => item.slug === slug);
  if (!criterion) return <Navigate to="/criteria" replace />;

  const otherCriteria = criteria.filter((item) => item.slug !== criterion.slug);
  const description = `${criterion.question} Explore a structured guide to the Innovator Founder ${criterion.label.toLowerCase()} criterion, common weaknesses and practical illustrations.`;

  return (
    <>
      <SEOHead title={`${criterion.question} | ukinnovator.online`} description={description} canonicalPath={`/${criterion.slug}`} />
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

            <section aria-labelledby="meaning-heading">
              <h2 id="meaning-heading" className="text-3xl font-semibold text-foreground">What {criterion.label.toLowerCase()} means in practice</h2>
              <p className="mt-4 rounded-md border-l-4 border-primary bg-card p-5 leading-relaxed text-foreground">{placeholder(criterion.explanation)}</p>
            </section>

            <section aria-labelledby="assessors-heading">
              <div className="flex items-center gap-3"><Search className="h-6 w-6 text-primary" aria-hidden="true" /><h2 id="assessors-heading" className="text-3xl font-semibold text-foreground">What assessors are actually looking for</h2></div>
              <p className="mt-4 rounded-md border-l-4 border-primary bg-card p-5 leading-relaxed text-foreground">{placeholder(criterion.assessorFocus)}</p>
            </section>

            <section aria-labelledby="failures-heading">
              <div className="flex items-center gap-3"><CircleAlert className="h-6 w-6 text-destructive" aria-hidden="true" /><h2 id="failures-heading" className="text-3xl font-semibold text-foreground">Common reasons this criterion fails</h2></div>
              <p className="mt-4 rounded-md border-l-4 border-destructive bg-card p-5 leading-relaxed text-foreground">{placeholder(criterion.failureReasons)}</p>
            </section>

            <section aria-labelledby="illustrations-heading">
              <h2 id="illustrations-heading" className="text-3xl font-semibold text-foreground">Worked illustrations</h2>
              <p className="mt-3 text-muted-foreground">These slots are reserved for generic, anonymised illustrations. They will not identify any person, company, applicant or client.</p>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {[1, 2, 3, 4].map((number) => (
                  <Card key={number}>
                    <CardContent className="p-5">
                      <h3 className="flex items-center gap-2 text-lg font-semibold"><CheckCircle2 className="h-5 w-5 text-primary" aria-hidden="true" />Illustration {number}: comparison</h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{placeholder(`a generic worked illustration comparing an idea that demonstrates ${criterion.label.toLowerCase()} with one that does not`)}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section aria-labelledby="faq-heading">
              <h2 id="faq-heading" className="text-3xl font-semibold text-foreground">Questions founders ask about {criterion.label.toLowerCase()}</h2>
              <div className="mt-6 divide-y divide-border border-y border-border">
                {criterion.relatedQuestions.map((question) => (
                  <div key={question} className="py-5">
                    <h3 className="text-xl font-semibold text-foreground">{question}</h3>
                    <p className="mt-2 text-muted-foreground">{placeholder(`a concise answer to “${question}”`)}</p>
                  </div>
                ))}
              </div>
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