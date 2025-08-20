import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { IdeaEvaluator } from "@/components/IdeaEvaluator";
import SiteHeader from "@/components/SiteHeader";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";


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
                  <strong className="text-foreground">Innovation Analysis:</strong> Discover how unique and groundbreaking your idea really is. Benchmarks novelty vs. existing solutions, highlights your differentiators, and flags potential IP opportunities or red flags.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-scalability rounded-full mt-2"></div>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Scalability Assessment:</strong> Understand your idea's potential for growth and expansion. Estimates addressable market dynamics, growth levers, and operational bottlenecks that could limit scale.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-viability rounded-full mt-2"></div>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Viability Check:</strong> Get insights on market demand and business feasibility. Evaluates revenue realism, pricing approach, routes to first customers, and early traction signals investors look for.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Actionable Suggestions:</strong> Receive concrete next steps to improve your concept. Generates prioritised experiments, validation checklists, KPIs to track, and funding‑readiness tips tailored to your inputs.
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

            <div className="flex flex-col gap-3">
              <Button onClick={() => setShowApp(true)} size="lg" className="w-full" disabled={!isOver18 || !agreeToTerms}>
                Quick assessment
              </Button>
              <Button variant="outline" onClick={() => navigate('/detailed')} size="lg" className="w-full" disabled={!isOver18 || !agreeToTerms}>
                Detailed assessment
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground mt-4">
              Powered by advanced AI • No sign-up required
            </p>
          </CardContent>
        </Card>
        
        {/* FAQ Section */}
        <section id="faq" className="w-full max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-3xl font-bold text-foreground mb-8 text-center">Test Your Business Idea with the UK Innovator Founder Visa Assessment Tool</h1>

          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="item-1" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold hover:no-underline">
                What is the UK Innovator Founder Visa assessment tool?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pt-2">
                Embark on your entrepreneurial journey with <a href="https://ukinnovator.online" className="text-primary hover:underline">ukinnovator.online</a>, where our free, AI-powered assessment tool serves as a litmus test for your business idea, tailored to the UK Innovator Founder Visa criteria. Developed by Legal Artificial Intelligence Development (Legalaid) Ltd, under the guidance of Chris Dias, an experienced immigration solicitor and founder of Legalaid Ltd, this platform evaluates your concept's innovation, scalability, and viability. Whether you're a global entrepreneur dreaming of launching a startup in the UK or refining an existing idea, our tool provides instant feedback to help you align with the <a href="https://ukinnovator.online/eligibility" className="text-primary hover:underline">UK Innovator Founder Visa eligibility requirements</a>.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold hover:no-underline">
                How does the assessment tool work?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pt-2">
                Input details of your business idea, such as its core concept, market potential, and unique features, into our user-friendly platform. The tool rigorously analyses your submission against the UK Innovator Founder Visa requirements, assessing innovation, scalability, and viability. Choose a quick assessment for a rapid overview or a detailed evaluation that includes competitor research and personalised suggestions to strengthen your concept. For example, if your idea is a tech startup, the tool might suggest refining your scalability plan to meet visa endorsement standards. It's your diagnostic test to see if your vision is ready for the <a href="https://ukinnovator.online/application-guide" className="text-primary hover:underline">UK startup visa application process</a>.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold hover:no-underline">
                Is the assessment free?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pt-2">
                Yes, absolutely! The tool at <a href="https://ukinnovator.online" className="text-primary hover:underline">ukinnovator.online</a> is completely free, offering both quick and detailed assessments at no cost. We're committed to empowering global entrepreneurs to explore their eligibility for the UK Innovator Founder Visa without financial barriers, making your journey to launching a UK business more accessible.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold hover:no-underline">
                What makes this tool unique compared to other UK visa resources?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pt-2">
                Unlike traditional visa guides or costly consultancy services, our AI-powered tool delivers a bespoke "litmus test" tailored to the UK Innovator Founder Visa's core criteria: innovation, scalability, and viability. Backed by Chris Dias's immigration expertise and Legalaid Ltd, it provides competitor insights and actionable recommendations to refine your idea, such as enhancing your business plan's innovation narrative. No other platform offers a free, AI-driven <a href="https://ukinnovator.online/assessment" className="text-primary hover:underline">Innovator Founder Visa eligibility test</a> that combines ease of use with in-depth analysis, giving you a head start on your UK entrepreneurial path.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold hover:no-underline">
                Does the tool provide legal advice?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pt-2">
                No, the assessment tool is not legal advice. It's a preliminary evaluation designed to gauge your business idea's alignment with the UK Innovator Founder Visa criteria. For professional legal guidance, consult a qualified immigration solicitor. Our tool offers clarity and direction to start your journey, helping you understand your idea's potential before seeking formal advice. Learn more about preparing for your visa application at our <Link to="/resources" className="text-primary hover:underline">resource hub</Link>.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold hover:no-underline">
                Who is Chris Dias?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pt-2">
                Chris Dias, qualified as a solicitor in 2001, is a UK immigration law expert, specialising in the Innovator Founder Visa. As founder of Legal Artificial Intelligence Development (Legalaid) Ltd, he drives <a href="https://ukinnovator.online" className="text-primary hover:underline">ukinnovator.online</a>. Chris trains practitioners in Level 2 Advanced Immigration Law at Free Movement, equipping them with advanced knowledge, and supervises students at the Queen Mary Legal Advice Centre, guiding future lawyers in pro bono legal support. His expertise ensures our tool is grounded in authoritative insight, making it a trusted starting point for your <a href="https://ukinnovator.online/about" className="text-primary hover:underline">UK Innovator Founder Visa journey</a>.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold hover:no-underline">
                How does ukinnovator.online ensure my privacy?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pt-2">
                Your privacy is paramount at <a href="https://ukinnovator.online" className="text-primary hover:underline">ukinnovator.online</a>. We don't ask personal questions that could identify you, such as your name, contact details, or other sensitive information, and we don't harvest or store your data. Our tool is powered by the enterprise version of the Grok API from xAI, which is designed not to use your data for training purposes, ensuring your business idea remains confidential. Explore our <a href="https://ukinnovator.online/privacy" className="text-primary hover:underline">privacy policy</a> for more details on our commitment to your security.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold hover:no-underline">
                What are the key requirements for the UK Innovator Founder Visa?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pt-2">
                The UK Innovator Founder Visa requires your business idea to be innovative, scalable, and viable, as assessed by an approved endorsing body. Our tool evaluates these criteria, providing insights into whether your idea meets visa standards. For instance, a viable business might demonstrate a clear revenue model, while scalability could involve plans for global expansion. Use our <a href="https://ukinnovator.online/assessment" className="text-primary hover:underline">assessment tool</a> to test your idea and receive tips on crafting a compelling business plan for endorsement.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-9" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold hover:no-underline">
                How do I start?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pt-2">
                Begin today at <a href="https://ukinnovator.online" className="text-primary hover:underline">ukinnovator.online</a>! Select a quick or detailed assessment, enter your business idea details, and receive instant AI-driven feedback to make your concept shine. Whether you're exploring the UK Innovator Founder Visa for the first time or refining your startup pitch, our tool guides you towards success. Take the first step towards your UK business dream now with our <a href="https://ukinnovator.online/start" className="text-primary hover:underline">free assessment</a>!
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </main>
    </div>
  );
};

export default Index;
