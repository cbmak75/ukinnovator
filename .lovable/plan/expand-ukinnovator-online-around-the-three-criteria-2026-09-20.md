# Expand ukinnovator.online around the three criteria

## Results, author and Lawyery links
- Remove legal-service, endorsement, Home Office and visa pricing from results, homepage copy, structured data, and the current no-JavaScript fallback. Keep the voluntary donation tiers as requested.
- Replace the results and footer author wording with the supplied Chris Dias text, including Lawyery Limited and SRA number 8001894.
- Rebuild the results block around three ordered choices: the Acuity consultation link as the primary action, followed by Lawyery and innovator.lawyer with one-line descriptions. Keep email as a quiet tertiary contact.
- Preserve the existing indication-only and no-legal-advice disclaimers.
- Link each result to the page for its lowest-scoring criterion without changing scoring, questions, thresholds, or existing result wording.

## Criteria pages
- Add `/criteria`, `/innovation`, `/viability`, and `/scalability` as substantial, linked pages.
- Build the complete requested heading, explanation, assessor, failure, illustration, FAQ, and onward-link structure.
- Use only the exact the approved editorial placeholder format format wherever legal substance belongs. No legal analysis, citations, statistics, clients, or invented examples will be presented as legal conclusions.
- Use natural search phrasing in headings and connective copy while keeping the pages readable.

## Research section
- Add `/research` plus the three requested article routes, each with unique metadata and a visible publication/updated date.
- Give every article a byline, table of contents, structured placeholder body, and closing links to the assessment and all three Lawyery destinations.
- Add the required anonymisation note to the research index.

## Navigation and discovery
- Expand the main navigation to Home, Quick Assessment, Detailed Assessment, The Three Criteria, Research, and Resources. “Quick Assessment” will point to the assessment section on the homepage.
- Cross-link the criteria pages, research pages, assessment, and weakest-result guidance.
- Update `llms.txt` and the existing static sitemap with every public route on the `www` host. Omit generated `<lastmod>` values because the project has no authoritative per-page content timestamps.

## Metadata and rendered HTML
- Give every public route a unique title, description, self-referencing canonical, Open Graph title/description/URL, and Twitter card through the existing head component.
- Add build-time prerendering and verify the output contains route-specific visible body copy and head tags for each public route, including `/innovation` rather than the homepage fallback.
- Keep the existing static homepage tags as the non-JavaScript social fallback where needed.

## Hosting limitation: genuine HTTP 404
- Keep the proper in-app 404 page and `noindex` metadata, but do not claim a genuine HTTP 404 response is achievable on this current Lovable Vite hosting. Lovable’s infrastructure automatically serves `index.html` for unknown browser paths and provides no project-level switch to remove that fallback or set the response status.
- Do not add ineffective Netlify/Vercel redirect files. A real unmatched-path 404 requires migration to a server-rendered/static-route template with status control.

## Verification
- Check all prohibited pricing is gone except the explicitly retained donation amounts.
- Validate route rendering, unique metadata/canonicals, internal links, weakest-criterion links, sitemap coverage, desktop/mobile layout, and the production build/prerender output.
