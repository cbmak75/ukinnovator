import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Scale } from "lucide-react";

const BOOKING_URL = "https://app.acuityscheduling.com/schedule/0aea335c";
const ROUTE_URL = "https://www.lawyery.co/innovator-founder";

interface NextStepBlockProps {
  /** Overall score out of 30, as already calculated by the assessment. */
  overallScore: number;
  /** Individual criterion scores out of 10, used only to name the weakest area. */
  innovationScore?: number;
  scalabilityScore?: number;
  viabilityScore?: number;
}

const weakestArea = (
  innovation?: number,
  scalability?: number,
  viability?: number,
): string | null => {
  const areas: Array<{ name: string; score: number }> = [
    { name: "innovation", score: innovation ?? Infinity },
    { name: "scalability", score: scalability ?? Infinity },
    { name: "viability", score: viability ?? Infinity },
  ].filter((a) => Number.isFinite(a.score));

  if (areas.length === 0) return null;
  return areas.reduce((lowest, a) => (a.score < lowest.score ? a : lowest)).name;
};

/**
 * Presentational next-step block shown on results screens.
 * Content varies by outcome. Contains no assessment or scoring logic.
 */
const NextStepBlock: React.FC<NextStepBlockProps> = ({
  overallScore,
  innovationScore,
  scalabilityScore,
  viabilityScore,
}) => {
  const isPromising = overallScore >= 15;
  const weakest = weakestArea(innovationScore, scalabilityScore, viabilityScore);

  return (
    <Card className="border-2 border-primary/40 bg-primary/5">
      <CardContent className="p-6 sm:p-8 space-y-5">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15">
            <Scale className="h-5 w-5 text-primary" aria-hidden="true" />
          </span>
          <h2 className="text-2xl font-bold text-foreground">
            {isPromising ? "Your next step" : "Where to go from here"}
          </h2>
        </div>

        {isPromising ? (
          <p className="text-foreground leading-relaxed">
            This assessment is an indication only, and endorsement depends on how the business is
            presented to the endorsing body. A solicitor-led review is what turns a promising idea
            into an endorsement-ready application.
          </p>
        ) : (
          <p className="text-foreground leading-relaxed">
            {weakest
              ? `The weakest part of this result was ${weakest}. That is often fixable — many ideas score low on one criterion simply because of how they are framed and evidenced, rather than because the business itself cannot meet the requirement.`
              : "A lower score is often fixable — many ideas score low simply because of how they are framed and evidenced, rather than because the business itself cannot meet the requirement."}
          </p>
        )}

        <div className="rounded-lg border border-border bg-background p-4 space-y-2">
          <p className="font-semibold text-foreground">
            Chris Dias, immigration solicitor, Lawyery Limited (SRA 8001894)
          </p>
          {isPromising && (
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>Endorsement stage: £2,500 fixed</li>
              <li>Visa stage: £2,500 fixed</li>
              <li>Both stages instructed together: £4,500</li>
              <li>Endorsing body fee: £1,000, payable to the endorsing body</li>
              <li>
                Home Office visa fee and Immigration Health Surcharge payable separately on the UKVI
                application
              </li>
              <li className="font-medium text-foreground">All legal fees plus VAT.</li>
            </ul>
          )}
        </div>

        <div className="flex flex-col items-center gap-3 pt-1">
          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto text-lg px-10 py-7 shadow-lg font-semibold"
          >
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              {isPromising ? "Book a consultation" : "Discuss your options"}
              <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
            </a>
          </Button>
          <a
            href={ROUTE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground underline underline-offset-4 hover:no-underline"
          >
            Read more about the Innovator Founder route
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

export default NextStepBlock;
