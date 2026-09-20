import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Scale } from "lucide-react";
import AuthorBlock from "@/components/AuthorBlock";
import ConsultationLinks from "@/components/ConsultationLinks";

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
): { name: string; slug: string } | null => {
  const areas: Array<{ name: string; slug: string; score: number }> = [
    { name: "innovation", slug: "/innovation", score: innovation ?? Infinity },
    { name: "scalability", slug: "/scalability", score: scalability ?? Infinity },
    { name: "viability", slug: "/viability", score: viability ?? Infinity },
  ].filter((a) => Number.isFinite(a.score));

  if (areas.length === 0) return null;
  return areas.reduce((lowest, a) => (a.score < lowest.score ? a : lowest));
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
              ? `The weakest part of this result was ${weakest.name}. That is often fixable — many ideas score low on one criterion simply because of how they are framed and evidenced, rather than because the business itself cannot meet the requirement.`
              : "A lower score is often fixable — many ideas score low simply because of how they are framed and evidenced, rather than because the business itself cannot meet the requirement."}
          </p>
        )}

        {weakest && <Link to={weakest.slug} className="inline-flex items-center gap-2 font-semibold text-primary underline underline-offset-4">Understand your {weakest.name} result<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>}
        <AuthorBlock compact />
        <ConsultationLinks />
      </CardContent>
    </Card>
  );
};

export default NextStepBlock;
