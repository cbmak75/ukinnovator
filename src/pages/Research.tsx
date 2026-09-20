import { Link } from "react-router-dom";
import { ArrowRight, BookOpen } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SEOHead from "@/components/SEOHead";
import AssessmentPrompt from "@/components/AssessmentPrompt";
import { researchArticles } from "@/content/siteContent";

const Research = () => (
  <>
    <SEOHead title="Innovator Founder Research and Analysis | Endorsement Process" description="Research and analysis of the Innovator Founder endorsement process, Immigration Rules and guidance, and reasons applications may be refused." canonicalPath="/research" />
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 py-10">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground"><Link to="/" className="hover:underline">Home</Link> <span aria-hidden="true">/</span> <span aria-current="page">Research</span></nav>
        <header className="max-w-4xl">
          <p className="mb-3 text-sm font-semibold uppercase text-primary">Research library</p>
          <h1 className="text-4xl font-bold leading-tight text-foreground sm:text-5xl">Research and analysis: the Innovator Founder endorsement process</h1>
          <p className="mt-5 text-xl leading-relaxed text-muted-foreground">A growing collection of solicitor-led analysis about endorsement, the legal framework and application outcomes.</p>
        </header>
        <aside className="my-10 border-y border-border py-5 text-sm text-muted-foreground"><strong className="text-foreground">Anonymity:</strong> All case examples in this research section are anonymised. No client, applicant, founder or business is identifiable.</aside>
        <section aria-labelledby="articles-heading">
          <h2 id="articles-heading" className="text-3xl font-semibold text-foreground">Articles</h2>
          <div className="mt-6 divide-y divide-border border-y border-border">
            {researchArticles.map((article) => (
              <article key={article.slug} className="grid gap-4 py-7 md:grid-cols-[auto_1fr_auto] md:items-start">
                <BookOpen className="mt-1 h-6 w-6 text-primary" aria-hidden="true" />
                <div><p className="text-sm text-muted-foreground">Published {article.published}</p><h3 className="mt-1 text-2xl font-semibold text-foreground"><Link to={`/research/${article.slug}`} className="hover:underline">{article.title}</Link></h3><p className="mt-2 text-muted-foreground">{article.description}</p></div>
                <Link to={`/research/${article.slug}`} className="inline-flex items-center gap-2 font-semibold text-primary">Read article<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
              </article>
            ))}
          </div>
        </section>
        <div className="mt-12"><AssessmentPrompt /></div>
      </main>
    </div>
  </>
);

export default Research;