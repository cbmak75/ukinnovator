import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const AssessmentPrompt = ({ text = "Try the free assessment" }: { text?: string }) => (
  <section className="border-y border-border py-8 text-center" aria-label="Try the assessment">
    <h2 className="text-2xl font-semibold text-foreground">Put your business idea to the test</h2>
    <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">Use the free tool for an indication of where your idea appears strongest and where it may need more work. It is not legal advice and does not predict endorsement.</p>
    <Button asChild size="lg" className="mt-5">
      <Link to="/#assessment-tool">{text}<ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" /></Link>
    </Button>
  </section>
);

export default AssessmentPrompt;