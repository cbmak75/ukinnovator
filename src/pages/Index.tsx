import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { IdeaEvaluator } from "@/components/IdeaEvaluator";
import SiteHeader from "@/components/SiteHeader";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";


const Index = () => {
  const [showApp, setShowApp] = useState(false);
  const navigate = useNavigate();
  const [isOver18, setIsOver18] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  useEffect(() => {
    document.title = "UK Innovator Founder Visa Assessment | Free Quick & Detailed";

    const desc = "Evaluate your business idea's eligibility for the UK Innovator Founder Visa with our free assessment tool offering quick and detailed options. Developed by Legal Artificial Intelligence Development (Legalaid) Ltd.";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', desc);

    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', window.location.origin + '/');
  }, []);

  if (showApp) {
    return <IdeaEvaluator onBack={() => setShowApp(false)} />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl mx-auto text-center">
          <CardContent className="p-8">
            <h1 className="text-3xl font-semibold text-foreground mb-2">UK Innovator Founder Visa Assessment</h1>
            <p className="text-xl text-muted-foreground mb-6">
              Evaluate your business idea's eligibility for the UK Innovator Founder Visa with our free UK Innovator Founder Visa assessment tool, offering both quick assessment and detailed assessment options. This UK Innovator Founder Visa assessment tool is developed and maintained by Legal Artificial Intelligence Development (Legalaid) Ltd. This assessment tool does not constitute legal advice
            </p>

            <div className="space-y-4 mb-8 text-left">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-innovation rounded-full mt-2"></div>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Innovation Analysis:</strong> Discover how unique and groundbreaking your idea really is
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-scalability rounded-full mt-2"></div>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Scalability Assessment:</strong> Understand your idea's potential for growth and expansion
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-viability rounded-full mt-2"></div>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Viability Check:</strong> Get insights on market demand and business feasibility
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Actionable Suggestions:</strong> Receive concrete next steps to improve your concept
                </p>
              </div>
            </div>

            {/* Consent Section */}
            <section className="mb-6 space-y-4 text-left">
              <div className="flex items-start gap-3">
                <Checkbox id="over18" checked={isOver18} onCheckedChange={(v) => setIsOver18(!!v)} />
                <Label htmlFor="over18" className="leading-snug cursor-pointer">I confirm I am 18 years of age or older.</Label>
              </div>
              <div className="flex items-start gap-3">
                <Checkbox id="agree" checked={agreeToTerms} onCheckedChange={(v) => setAgreeToTerms(!!v)} />
                <Label htmlFor="agree" className="leading-snug cursor-pointer">
                  I agree to the <Link to="/terms" className="underline underline-offset-2">Terms and Conditions</Link> of use.
                </Label>
              </div>
              {!isOver18 || !agreeToTerms ? (
                <p className="text-sm text-warning-foreground/80">Please confirm you are over 18 and agree to the Terms to continue.</p>
              ) : null}
            </section>

            <div className="grid gap-3 sm:grid-cols-2">
              <Button onClick={() => setShowApp(true)} size="lg" className="w-full" disabled={!isOver18 || !agreeToTerms}>
                Quick assessment
              </Button>
              <Button variant="outline" onClick={() => navigate('/detailed')} size="lg" className="w-full" disabled={!isOver18 || !agreeToTerms}>
                Detailed assessment
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground mt-4">
              Powered by advanced AI • No signup required
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Index;
