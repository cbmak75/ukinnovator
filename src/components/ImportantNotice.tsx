import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ImportantNotice() {
  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle className="text-foreground">Important Notice – Limited Pre-Assessment</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 text-foreground">
        <div>
          <p className="mb-3">
            This assessment is based on preliminary information only and provides initial guidance. A successful Innovator Founder visa application requires:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm md:text-base">
            <li>Comprehensive business plan analysis with detailed market research</li>
            <li>Financial projections with supporting evidence and assumptions</li>
            <li>Competitive analysis and strategic positioning documentation</li>
            <li>Professional legal guidance throughout the application process</li>
            <li>Endorsing body approval and ongoing compliance requirements</li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold">Recommended Next Steps</h4>
          <p className="mt-1 font-medium">Comprehensive business assessment strongly recommended</p>
          <p className="mt-3">
            Our preliminary assessment provides initial guidance, but visa success requires detailed professional analysis. An experienced immigration solicitor can help with your application by providing:
          </p>
          <ul className="list-disc pl-5 space-y-2 mt-2 text-sm md:text-base">
            <li>Expert evaluation of your business plan against all Home Office criteria</li>
            <li>Guidance on validating your market research and strengthening competitive positioning</li>
            <li>Review and validation of your financial projections, including advice on supporting documentation</li>
            <li>Strategic advice to optimise your application for maximum approval chances</li>
            <li>Step-by-step guidance through endorsing body requirements and the full application process</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
