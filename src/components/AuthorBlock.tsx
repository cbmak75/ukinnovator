import { AUTHOR_TEXT } from "@/content/siteContent";

const AuthorBlock = ({ compact = false }: { compact?: boolean }) => (
  <section aria-label="About the creator" className={compact ? "text-sm" : "border-y border-border py-6"}>
    {!compact && <h2 className="mb-3 text-2xl font-semibold text-foreground">About the creator</h2>}
    <p className="leading-relaxed">{AUTHOR_TEXT}</p>
  </section>
);

export default AuthorBlock;