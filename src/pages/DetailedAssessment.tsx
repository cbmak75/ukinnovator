import { useEffect, useMemo, useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import BackHomeButton from "@/components/BackHomeButton";
import ImportantNotice from "@/components/ImportantNotice";
import SEOHead from "@/components/SEOHead";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { GrokService } from "@/services/GrokService";
import { Link, useNavigate } from "react-router-dom";

interface EvaluationResult {
  researchSummary: string;
  innovation: {
    analysis: string;
    score: number;
  };
  scalability: {
    analysis: string;
    score: number;
  };
  viability: {
    analysis: string;
    score: number;
  };
  suggestions: string[];
  overallScore: number;
}

interface FormState {
  coreIdea: string;
  problem: string;
  targetMarket: string;
  uvp: string;
  innovationDesc: string;
  technology: string;
  competitiveAdv: string;
  ip: string;
  marketSize: string;
  growth: string;
  businessModel: string;
  revenue: string;
  validation: string;
  capitalNeeded: string;
  capitalAvailable: string;
  priorInvestment: string;
  education: string;
  qualifications: string;
  businessExp: string;
  sectorExp: string;
  prevStartups: string;
  leadership: string;
}

const defaultValues: FormState = {
  coreIdea: "",
  problem: "",
  targetMarket: "",
  uvp: "",
  innovationDesc: "",
  technology: "",
  competitiveAdv: "",
  ip: "",
  marketSize: "",
  growth: "",
  businessModel: "",
  revenue: "",
  validation: "",
  capitalNeeded: "",
  capitalAvailable: "",
  priorInvestment: "",
  education: "",
  qualifications: "",
  businessExp: "",
  sectorExp: "",
  prevStartups: "",
  leadership: "",
};

const DetailedAssessment = () => {
  const [form, setForm] = useState<FormState>(defaultValues);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<EvaluationResult | null>(null);
  const LS_FORM_KEY = "detailedAssessment.form";
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem(LS_FORM_KEY);
    if (saved) {
      try { 
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          setForm({ ...defaultValues, ...parsed });
        }
      } catch (error) {
        console.warn('Failed to parse saved form data:', error);
        localStorage.removeItem(LS_FORM_KEY);
      }
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(LS_FORM_KEY, JSON.stringify(form));
    } catch (error) {
      console.warn('Failed to save form data to localStorage:', error);
    }
  }, [form]);

  const compiledPrompt = useMemo(() => {
    const lines = [
      "DETAILED ASSESSMENT INPUT (optimise feedback for Innovator Founder UK visa scheme):",
      "",
      "# Business Concept Summary",
      `Core Business Idea: ${form.coreIdea}`,
      `Problem Solved: ${form.problem}`,
      `Target Market: ${form.targetMarket}`,
      `Unique Value Proposition: ${form.uvp}`,
      "",
      "# Innovation Details",
      `Innovation Description: ${form.innovationDesc}`,
      `Technology Used: ${form.technology}`,
      `Competitive Advantage: ${form.competitiveAdv}`,
      `Intellectual Property: ${form.ip}`,
      "",
      "# Scalability & Viability",
      `Market Size: ${form.marketSize}`,
      `Growth Strategy: ${form.growth}`,
      `Business Model: ${form.businessModel}`,
      `Revenue Streams: ${form.revenue}`,
      `Market Validation: ${form.validation}`,
      `Capital Needed (6 months): ${form.capitalNeeded}`,
      `Capital Available: ${form.capitalAvailable}`,
      `Prior Investment: ${form.priorInvestment}`,
      "",
      "# Applicant Background",
      `Education Level: ${form.education}`,
      `Relevant Qualifications: ${form.qualifications}`,
      `Business Experience: ${form.businessExp}`,
      `Sector Experience: ${form.sectorExp}`,
      `Previous Start-ups: ${form.prevStartups}`,
      `Leadership Experience: ${form.leadership}`,
      "",
      "Please evaluate with emphasis on Innovator Founder (UK) visa criteria where relevant.",
    ];
    return lines.join("\n");
  }, [form]);

  const onSubmit = async () => {
    setSubmitting(true);
    setError(null);
    try {
      const evaluation = await GrokService.evaluateIdea(compiledPrompt);
      setResult(evaluation);
    } catch (e: any) {
      setError(e?.message || "Failed to generate assessment");
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleReset = () => {
    setForm(defaultValues);
    setResult(null);
    setError(null);
    try {
      localStorage.removeItem(LS_FORM_KEY);
    } catch (error) {
      console.warn('Failed to remove saved form data:', error);
    }
  };

  return (
    <>
      <SEOHead
        title="Detailed Assessment | UK Innovator Founder Visa Tool"
        description="Complete a detailed business assessment for UK Innovator Founder Visa. Evaluate innovation, scalability, viability with competitor research and personalised suggestions."
        canonicalPath="/detailed"
      />
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1 container mx-auto px-4 py-8 max-w-5xl">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-sm text-muted-foreground">
              <li><a href="/" className="hover:underline">Home</a></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-foreground">Detailed Assessment</li>
            </ol>
          </nav>
          <div className="mb-6">
            <BackHomeButton variant="outline" size="sm" />
          </div>
          <header className="mb-6">
            <h1 className="text-3xl font-semibold text-foreground">Detailed Assessment</h1>
            <p className="text-muted-foreground mt-2">Provide a richer brief for a deeper evaluation, tailored to the Innovator Founder UK visa scheme.</p>
          </header>
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-innovation">Business Concept Summary</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div>
                <Label htmlFor="coreIdea">Core Business Idea</Label>
                <Textarea id="coreIdea" value={form.coreIdea} onChange={handleChange("coreIdea")} placeholder="Describe the core concept" />
              </div>
              <div>
                <Label htmlFor="problem">Problem Solved</Label>
                <Textarea id="problem" value={form.problem} onChange={handleChange("problem")} placeholder="What pain point are you addressing?" />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="targetMarket">Target Market</Label>
                  <Input id="targetMarket" value={form.targetMarket} onChange={handleChange("targetMarket")} placeholder="Who are your customers?" />
                </div>
                <div>
                  <Label htmlFor="uvp">Unique Value Proposition</Label>
                  <Input id="uvp" value={form.uvp} onChange={handleChange("uvp")} placeholder="Why you over alternatives?" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-innovation">Innovation Details</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div>
                <Label htmlFor="innovationDesc">Innovation Description</Label>
                <Textarea id="innovationDesc" value={form.innovationDesc} onChange={handleChange("innovationDesc")} placeholder="What makes it innovative?" />
              </div>
              <div>
                <Label htmlFor="technology">Technology Used</Label>
                <Input id="technology" value={form.technology} onChange={handleChange("technology")} placeholder="Key technologies" />
              </div>
              <div>
                <Label htmlFor="competitiveAdv">Competitive Advantage</Label>
                <Textarea id="competitiveAdv" value={form.competitiveAdv} onChange={handleChange("competitiveAdv")} placeholder="Why will you win?" />
              </div>
              <div>
                <Label htmlFor="ip">Intellectual Property</Label>
                <Input id="ip" value={form.ip} onChange={handleChange("ip")} placeholder="Patents, trade secrets, code ownership" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                <span className="text-scalability">Scalability</span>
                <span className="mx-2">&</span>
                <span className="text-viability">Viability</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="marketSize">Market Size</Label>
                  <Input id="marketSize" value={form.marketSize} onChange={handleChange("marketSize")} placeholder="e.g., $100 million" />
                </div>
                <div>
                  <Label htmlFor="growth">Growth Strategy</Label>
                  <Input id="growth" value={form.growth} onChange={handleChange("growth")} placeholder="Go-to-market plan" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="businessModel">Business Model</Label>
                  <Input id="businessModel" value={form.businessModel} onChange={handleChange("businessModel")} placeholder="How do you make money?" />
                </div>
                <div>
                  <Label htmlFor="revenue">Revenue Streams</Label>
                  <Input id="revenue" value={form.revenue} onChange={handleChange("revenue")} placeholder="e.g., subscriptions, ads" />
                </div>
              </div>
              <div>
                <Label htmlFor="validation">Market Validation</Label>
                <Input id="validation" value={form.validation} onChange={handleChange("validation")} placeholder="Evidence of demand (pre-orders, pilots)" />
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="capitalNeeded">Capital Needed (6 months)</Label>
                  <Input id="capitalNeeded" value={form.capitalNeeded} onChange={handleChange("capitalNeeded")} placeholder="e.g., £15,000" />
                </div>
                <div>
                  <Label htmlFor="capitalAvailable">Capital Available</Label>
                  <Input id="capitalAvailable" value={form.capitalAvailable} onChange={handleChange("capitalAvailable")} placeholder="e.g., £5,000" />
                </div>
                <div>
                  <Label htmlFor="priorInvestment">Prior Investment</Label>
                  <Input id="priorInvestment" value={form.priorInvestment} onChange={handleChange("priorInvestment")} placeholder="e.g., £6,000" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-foreground">Applicant Background</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="education">Education Level</Label>
                <Input id="education" value={form.education} onChange={handleChange("education")} placeholder="e.g., Master's degree" />
              </div>
              <div>
                <Label htmlFor="qualifications">Relevant Qualifications</Label>
                <Input id="qualifications" value={form.qualifications} onChange={handleChange("qualifications")} placeholder="e.g., MBA" />
              </div>
              <div>
                <Label htmlFor="businessExp">Business Experience</Label>
                <Input id="businessExp" value={form.businessExp} onChange={handleChange("businessExp")} placeholder="e.g., 3-5 years" />
              </div>
              <div>
                <Label htmlFor="sectorExp">Sector Experience</Label>
                <Input id="sectorExp" value={form.sectorExp} onChange={handleChange("sectorExp")} placeholder="e.g., 3-5 years" />
              </div>
              <div>
                <Label htmlFor="prevStartups">Previous Start-ups</Label>
                <Input id="prevStartups" value={form.prevStartups} onChange={handleChange("prevStartups")} placeholder="e.g., Worked in a startup for 4 years" />
              </div>
              <div>
                <Label htmlFor="leadership">Leadership Experience</Label>
                <Input id="leadership" value={form.leadership} onChange={handleChange("leadership")} placeholder="e.g., Led a team of support workers" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button onClick={onSubmit} disabled={submitting} className="sm:w-auto w-full">
            {submitting ? "Generating assessment…" : "Generate Detailed Assessment"}
          </Button>
          <Button variant="outline" onClick={handleReset} className="sm:w-auto w-full">
            Reset
          </Button>
          <BackHomeButton className="sm:w-auto w-full" />
        </div>

        {error && (
          <p className="text-destructive mt-4">{error}</p>
        )}

        {result && (
          <section className="mt-8 grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Research Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground whitespace-pre-line">{result.researchSummary}</p>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-3">
              <Card className="border-innovation/30">
                <CardHeader>
                  <CardTitle className="text-innovation">Innovation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">{result.innovation?.analysis}</p>
                  <p className="font-medium">Score: {result.innovation?.score} / 10</p>
                </CardContent>
              </Card>
              <Card className="border-scalability/30">
                <CardHeader>
                  <CardTitle className="text-scalability">Scalability</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">{result.scalability?.analysis}</p>
                  <p className="font-medium">Score: {result.scalability?.score} / 10</p>
                </CardContent>
              </Card>
              <Card className="border-viability/30">
                <CardHeader>
                  <CardTitle className="text-viability">Viability</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">{result.viability?.analysis}</p>
                  <p className="font-medium">Score: {result.viability?.score} / 10</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Suggestions</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  {Array.isArray(result.suggestions) && result.suggestions.map((s: string, i: number) => (
                    <li key={i} className="text-muted-foreground">{s}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Overall Score</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold">{result.overallScore} / 30</p>
              </CardContent>
            </Card>
            <ImportantNotice />
            <div className="flex justify-center gap-3 mt-4 flex-wrap">
              <Button asChild variant="secondary" size="lg">
                <Link to="/resources" aria-label="View Innovator Founder resources">View Resources</Link>
              </Button>
            </div>
          </section>
        )}
      </main>
    </div>
    </>
  );
};

export default DetailedAssessment;
