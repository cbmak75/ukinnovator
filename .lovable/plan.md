# ukinnovator.online: links, conversion path, and search visibility

## 1. Outbound links to the law firm

Checked every file: there are no `lawyery.co.uk` links left anywhere — the footer, home page "About the Creator" text, expertise paragraph and Chris Dias biography all already point to `https://www.lawyery.co`. The Terms page mentions Lawyery Limited as a postal address only, with no link. Nothing to change here; `legalaid.dev` and `gov.uk` links stay as they are.

## 2. Next-step block on the results screen

A new block appears directly under the score on both the quick assessment and the detailed assessment results.

Positive or borderline result (overall score 15 or above on the quick tool, the equivalent band on the detailed tool):

- Heading: "Your next step"
- Short paragraph explaining the assessment is an indication only, and that endorsement depends on how the business is presented to the endorsing body, so a solicitor-led review is what turns a promising idea into an endorsement-ready application
- Named solicitor: Chris Dias, immigration solicitor, Lawyery Limited (SRA 8001894)
- Fees stated plainly: endorsement stage £2,500 fixed; visa stage £2,500 fixed; £4,500 if both stages are instructed together. Endorsing body fee £1,000, payable to the endorsing body. Home Office visa fee and Immigration Health Surcharge payable separately on the UKVI application. All legal fees plus VAT.
- Prominent primary button "Book a consultation" (the strongest visual element on the results screen)
- Quieter link "Read more about the Innovator Founder route" to `https://www.lawyery.co/innovator-founder`

Negative result (below 15): a shorter version naming the weakest of the three areas from the result itself, noting that it is often fixable, with the same prominent button labelled "Discuss your options".

No change to questions, scoring, thresholds or the existing result wording, and no claim that the tool predicts or guarantees an endorsement. The existing disclaimers stay.

## 3. Crawlable HTML — this one cannot be done on the current setup

The site is a browser-assembled app on Lovable's static hosting. The build produces a single empty HTML shell and there is no server step, so a prerender plugin has nowhere to run and nothing would be served differently. Adding one would be busywork that changes nothing at the live URL. Stating that plainly, as asked.

Interim measure being added instead: a `noscript` block in `index.html` carrying the main headings and a plain-text summary of what the tool does, who provides it, and the paid legal route — so a crawler that runs no JavaScript sees real text.

Real fix available separately: the app can be moved to Lovable's server-rendered template, which serves complete HTML per page. That is a migration, not a plugin, and I would do it as its own piece of work once the items here are live.

## 4. Per-route head tags

Add `react-helmet-async` with the provider at the app root, and give each of the five routes its own unique title, meta description, absolute canonical on `https://www.ukinnovator.online`, `og:title`, `og:description`, `og:url`, `og:image` and `twitter:card`. The home page title stays close to "UK Innovator Founder Visa Assessment Tool | Free Eligibility Check". No two routes share a title or description. The existing hand-rolled head component is replaced. Note: these per-page tags are read by search crawlers but not by social-preview crawlers on this hosting — that is the same limit described in item 3.

## 5. Structured data on the home page

JSON-LD covering:

- `WebApplication` for the tool, with name, description and price 0
- `Organization` for Legal Artificial Intelligence Development (Legalaid) Ltd as publisher
- `LegalService` for Lawyery Limited, url `https://www.lawyery.co`, as provider of the paid legal work
- `FAQPage` for the existing home page FAQ

Duplicate and stale blocks in `index.html` get consolidated so there is one clean set.

## 6. Sitemap and robots

The sitemap lists `/`, `/detailed`, `/resources`, `/terms` — all real, all on the www host, none redirecting or missing. `/auth` is correctly absent and blocked in robots.txt. I will refresh the dates and otherwise leave both files alone.

The non-www to www redirect is a hosting/DNS setting, not something in the code. Both `ukinnovator.online` and `www.ukinnovator.online` are attached to this project; `www` currently shows as not live. That needs finishing in the project's domain settings, and I will flag exactly what to check.

## Technical notes

- `src/components/NextStepBlock.tsx`: new presentational component, outcome variant driven by the score already computed; no scoring logic inside it.
- Rendered in `IdeaEvaluator.tsx` and `DetailedAssessment.tsx` results sections.
- `react-helmet-async` added; `HelmetProvider` in `src/main.tsx`; `SEOHead.tsx` rewritten to wrap `Helmet`; sitewide canonical removed from `index.html` so routes own theirs, while sitewide `og:*` stays as fallback.
