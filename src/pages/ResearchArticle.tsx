import { Link, Navigate, useParams } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import SEOHead from "@/components/SEOHead";
import ConsultationLinks from "@/components/ConsultationLinks";
import AssessmentPrompt from "@/components/AssessmentPrompt";
import MarkdownContent from "@/components/MarkdownContent";
import SourcesBlock from "@/components/SourcesBlock";
import { researchArticles } from "@/content/siteContent";
import legalPageContent from "@/content/legalPageContent.json";

const makeId = (heading: string) => heading.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const ResearchArticle = ({ articleSlug }: { articleSlug?: string }) => {
  const params = useParams();
  const article = researchArticles.find((item) => item.slug === (articleSlug ?? params.slug));
  if (!article) return <Navigate to="/research" replace />;
  const content = legalPageContent[`/research/${article.slug}`];
  const sectionHeadings = content.match(/^#{2,3} .+$/gm)?.map((heading) => heading.replace(/^#{2,3} /, "")) ?? [];
  const showsSources = article.slug === "endorsement-assessment-process" || article.slug === "immigration-rules-and-guidance";

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: "2026-09-20",
    dateModified: "2026-09-20",
    author: { "@type": "Person", name: "Chris Dias", jobTitle: "Immigration solicitor" },
    publisher: { "@type": "Organization", name: "Legal Artificial Intelligence Development (Legalaid) Ltd" },
    mainEntityOfPage: `https://www.ukinnovator.online/research/${article.slug}`,
  };

  return (
    <>
      <SEOHead title={`${article.title} | ukinnovator.online`} description={article.description} canonicalPath={`/research/${article.slug}`} ogType="article" structuredData={articleSchema} />
      <div className="min-h-screen">
        <SiteHeader />
        <main className="mx-auto max-w-5xl px-4 py-10">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground"><Link to="/" className="hover:underline">Home</Link> <span aria-hidden="true">/</span> <Link to="/research" className="hover:underline">Research</Link> <span aria-hidden="true">/</span> <span aria-current="page">{article.title}</span></nav>
          <article>
            <header className="max-w-4xl border-b border-border pb-8">
              <h1 className="text-4xl font-bold leading-tight text-foreground sm:text-5xl">{article.title}</h1>
              <p className="mt-5 text-muted-foreground">Chris Dias, immigration solicitor</p>
              <p className="mt-1 text-sm text-muted-foreground">Published and last updated: {article.published}</p>
            </header>
            <nav aria-label="Table of contents" className="my-10 border-y border-border py-6">
              <h2 className="text-xl font-semibold text-foreground">On this page</h2>
              <ol className="mt-3 grid gap-2 sm:grid-cols-2">
                {sectionHeadings.map((section, index) => <li key={section}><a href={`#${makeId(section)}`} className="text-primary hover:underline">{index + 1}. {section}</a></li>)}
              </ol>
            </nav>
            <MarkdownContent content={content} />
            {showsSources && <SourcesBlock />}
            <div className="mt-14"><AssessmentPrompt text="Try the assessment tool" /></div>
            <section className="mt-12" aria-labelledby="professional-help-heading"><h2 id="professional-help-heading" className="mb-5 text-3xl font-semibold text-foreground">Further information and professional help</h2><ConsultationLinks /></section>
          </article>
        </main>
      </div>
    </>
  );
};

export default ResearchArticle;