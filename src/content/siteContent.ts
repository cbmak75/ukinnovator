export const BOOKING_URL = "https://app.acuityscheduling.com/schedule/0aea335c";
export const LAWYERY_URL = "https://www.lawyery.co/innovator-founder";
export const PRACTICE_URL = "https://www.innovator.lawyer";
export const CONTACT_EMAIL = "info@lawyery.co";

export const AUTHOR_TEXT =
  "This tool was built by Chris Dias, a UK immigration solicitor who has spent his career helping founders and applicants through the Innovator Founder route. He built it as a free resource because too many people spend money on an application before finding out whether their idea meets the criteria at all. Lawyery Limited is regulated by the Solicitors Regulation Authority, SRA number 8001894.";

export const criteria = [
  {
    slug: "innovation",
    label: "Innovation",
    question: "What counts as an innovative business idea for the Innovator Founder visa?",
    searchPhrase: "innovative business idea UK visa",
    explanation: "what innovation means in practice and how to distinguish a genuinely innovative proposition from a familiar business presented differently",
    assessorFocus: "the evidence and features an assessor considers when reviewing innovation",
    failureReasons: "the recurring reasons an idea does not demonstrate the innovation criterion",
    relatedQuestions: [
      "What is an innovative idea for the Innovator Founder visa?",
      "Is my business idea innovative enough for endorsement?",
      "Does using new technology make a business innovative?",
      "Can an existing business model meet the innovation criterion?",
      "What evidence can support an innovation claim?",
    ],
  },
  {
    slug: "viability",
    label: "Viability",
    question: "What makes a business idea viable for the Innovator Founder visa?",
    searchPhrase: "what makes a business viable",
    explanation: "what viability means in practice and how the business proposition, founder, resources and evidence fit together",
    assessorFocus: "the evidence and practical factors an assessor considers when reviewing viability",
    failureReasons: "the recurring reasons an idea does not demonstrate the viability criterion",
    relatedQuestions: [
      "What makes a business viable for the Innovator Founder visa?",
      "How do I show that my business model is viable?",
      "Does a viable business need existing customers?",
      "How important is the founder’s experience to viability?",
      "What evidence can support a viability claim?",
    ],
  },
  {
    slug: "scalability",
    label: "Scalability",
    question: "What makes a business idea scalable for the Innovator Founder visa?",
    searchPhrase: "what makes a business scalable",
    explanation: "what scalability means in practice and how a plan can show credible growth beyond its starting point",
    assessorFocus: "the evidence and growth factors an assessor considers when reviewing scalability",
    failureReasons: "the recurring reasons an idea does not demonstrate the scalability criterion",
    relatedQuestions: [
      "What makes a business scalable for the Innovator Founder visa?",
      "Does scalability mean expanding internationally?",
      "How do I show a credible growth plan?",
      "Can a service business be scalable?",
      "What evidence can support a scalability claim?",
    ],
  },
] as const;

export type CriterionSlug = (typeof criteria)[number]["slug"];

export const researchArticles = [
  {
    slug: "endorsement-assessment-process",
    title: "How the Innovator Founder endorsement assessment process works",
    description: "A structured research page on how an Innovator Founder business idea is assessed, with legal analysis to be supplied by Chris Dias.",
    published: "20 September 2026",
    sections: [
      "Purpose and scope of endorsement",
      "Stages in the assessment process",
      "Evidence and presentation",
      "Questions and further scrutiny",
      "Practical preparation",
    ],
  },
  {
    slug: "immigration-rules-and-guidance",
    title: "Immigration Rules and guidance for Innovator Founder applicants",
    description: "A structured research page for analysis of the Immigration Rules and guidance relevant to Innovator Founder applicants.",
    published: "20 September 2026",
    sections: [
      "Legal framework",
      "How rules and guidance interact",
      "Requirements affecting endorsement",
      "Requirements affecting the visa application",
      "Checking for updates",
    ],
  },
  {
    slug: "why-applications-are-refused",
    title: "Why Innovator Founder applications are refused",
    description: "A structured research page for evidence-based analysis of why Innovator Founder applications may be refused.",
    published: "20 September 2026",
    sections: [
      "Different decision points",
      "Problems with the business proposition",
      "Problems with evidence",
      "Problems with the visa application",
      "Learning from an adverse decision",
    ],
  },
] as const;