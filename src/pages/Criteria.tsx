import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SEOHead from "@/components/SEOHead";
import AssessmentPrompt from "@/components/AssessmentPrompt";
import { criteria } from "@/content/siteContent";

const Criteria = () => (
  <>
    <SEOHead title="The Three Innovator Founder Criteria Explained | UK Visa Guide" description="Innovation, viability and scalability explained in one structured guide to the core Innovator Founder criteria, with links to detailed criterion pages." canonicalPath="/criteria" />
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 py-10">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground"><Link to="/" className="hover:underline">Home</Link> <span aria-hidden="true">/</span> <span aria-current="page">The Three Criteria</span></nav>
        <header className="max-w-4xl">
          <p className="mb-3 text-sm font-semibold uppercase text-primary">Innovator Founder requirements explained</p>
          <h1 className="text-4xl font-bold text-foreground sm:text-5xl">The three Innovator Founder criteria explained</h1>
          <p className="mt-5 text-xl leading-relaxed text-muted-foreground">Use this hub to examine innovation, viability and scalability separately before testing how your business idea performs across all three.</p>
        </header>
        <section className="mt-12 grid gap-5" aria-label="The three criteria">
          {criteria.map((criterion, index) => (
            <Link key={criterion.slug} to={`/${criterion.slug}`} className="group grid gap-4 border-t border-border py-7 sm:grid-cols-[4rem_1fr_auto] sm:items-center">
              <span className="text-4xl font-bold text-muted-foreground">0{index + 1}</span>
              <span><span className="block text-2xl font-semibold text-foreground">{criterion.label}</span><span className="mt-1 block text-muted-foreground">{criterion.question}</span></span>
              <ArrowRight className="h-6 w-6 text-primary transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          ))}
        </section>
        <section className="my-12">
          <h2 className="text-3xl font-semibold text-foreground">How the criteria work together</h2>
          <p className="mt-4 rounded-md border-l-4 border-primary bg-card p-5 leading-relaxed">{`[CONTENT TO BE SUPPLIED BY CHRIS DIAS: an explanation of how innovation, viability and scalability are considered together in the endorsement process]`}</p>
        </section>
        <AssessmentPrompt />
      </main>
    </div>
  </>
);

export default Criteria;