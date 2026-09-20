import { ArrowRight, Building2, CalendarDays, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BOOKING_URL, CONTACT_EMAIL, LAWYERY_URL, PRACTICE_URL } from "@/content/siteContent";

const ConsultationLinks = () => (
  <div className="space-y-4">
    <Button asChild size="lg" className="min-h-14 w-full text-base font-semibold sm:w-auto">
      <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
        <CalendarDays className="mr-2 h-5 w-5" aria-hidden="true" />
        Book a consultation with Chris Dias
        <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
      </a>
    </Button>

    <div className="grid gap-3 md:grid-cols-2">
      <a href={LAWYERY_URL} target="_blank" rel="noopener noreferrer" className="block rounded-md border border-border bg-background p-4 transition-colors hover:bg-muted">
        <span className="flex items-center gap-2 font-semibold text-foreground"><Building2 className="h-5 w-5 text-primary" aria-hidden="true" />Innovator Founder at Lawyery</span>
        <span className="mt-2 block text-sm text-muted-foreground">Read about Lawyery’s regulated legal support for the Innovator Founder route.</span>
      </a>
      <a href={PRACTICE_URL} target="_blank" rel="noopener noreferrer" className="block rounded-md border border-border bg-background p-4 transition-colors hover:bg-muted">
        <span className="flex items-center gap-2 font-semibold text-foreground"><Building2 className="h-5 w-5 text-primary" aria-hidden="true" />innovator.lawyer, the dedicated Innovator Founder practice</span>
        <span className="mt-2 block text-sm text-muted-foreground">Explore the specialist practice focused on endorsement and visa applications.</span>
      </a>
    </div>

    <a href={`mailto:${CONTACT_EMAIL}`} className="inline-flex items-center gap-2 text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground">
      <Mail className="h-4 w-4" aria-hidden="true" />Email {CONTACT_EMAIL}
    </a>
  </div>
);

export default ConsultationLinks;