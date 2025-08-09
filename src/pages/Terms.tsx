import { useEffect } from "react";
import SiteHeader from "@/components/SiteHeader";
import BackHomeButton from "@/components/BackHomeButton";
const Terms = () => {
  useEffect(() => {
    document.title = "Terms and Conditions | UK Innovator Founder Visa Assessment";
    const desc = "Terms and Conditions for using UKInnovator.online assessment tool by LEGAL ARTIFICIAL INTELLIGENCE DEVELOPMENT (LEGALAID) LIMITED.";
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
    link.setAttribute('href', window.location.origin + '/terms');
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-6"><BackHomeButton variant="outline" size="sm" /></div>
        <header className="mb-6">
          <h1 className="text-3xl font-semibold text-foreground">Terms and Conditions for UKInnovator.online</h1>
          <p className="text-muted-foreground mt-2">Effective Date: 7 August 2025</p>
        </header>

        <article className="prose prose-neutral dark:prose-invert max-w-none">
          <p>These Terms and Conditions ("Terms") govern your access to and use of the website ukinnovator.online (the "Website" or "Service"), owned and operated by LEGAL ARTIFICIAL INTELLIGENCE DEVELOPMENT (LEGALAID) LIMITED, a company registered in England and Wales with company number 16633371, whose registered office is at 14 Lillymonte Drive, Rochester, Kent, United Kingdom, ME1 3EX ("we", "us", or "our"). By accessing or using the Service, you agree to be bound by these Terms. If you do not agree to these Terms, you must not use the Service.</p>

          <p>These Terms form a legally binding agreement between you (the "User" or "you") and us. Please read them carefully. We recommend printing or saving a copy for your records.</p>

          <h2>1. Introduction and Service Description</h2>
          <p>The Service provides an AI-powered pre-assessment tool for potential applicants to the UK's Innovator Founder Visa. Users can anonymously submit business ideas for assessment against criteria such as core business idea, innovation, scalability, viability, and applicant suitability. The tool uses our proprietary algorithm and integrates with the Grok API provided by xAI (a third-party AI service provider).</p>
          <ul>
            <li><strong>Assessment Options:</strong> Users may choose a quick assessment (typically a few minutes) or a detailed assessment (typically 10-15 minutes).</li>
            <li><strong>Output:</strong> A printable PDF report is generated based on the assessment. No hard copies or records of submissions are saved on our servers.</li>
            <li><strong>Anonymity and Temporary Storage:</strong> The Service is designed to operate without collecting or storing personal data. For ease of use and convenience, we may temporarily store previous inputs between sessions on a personal basis for the individual user (e.g., using browser local storage or similar mechanisms). This allows users to resume or review prior entries without re-entering information. Such storage is strictly client-side, unique to your device/browser, and not accessible by us or third parties. You can erase this temporary storage at any time by using the form reset button provided on the Website.</li>
          </ul>
          <p>The Service is for informational purposes only and does not constitute legal, immigration, or professional advice. Assessments are AI-generated and may not reflect official visa outcomes.</p>

          <h2>2. Acceptance of Terms</h2>
          <p>By ticking the consent box and submitting any query for assessment, you confirm that you have read, understood, and agree to these Terms. You must also self-declare that you are over 18 years of age. If you are under 18, you must not use the Service.</p>
          <p>Your continued use of the Service constitutes ongoing acceptance of these Terms. We may update these Terms from time to time (see Section 11). Your use after changes indicates acceptance of the updated Terms.</p>

          <h2>3. User Eligibility</h2>
          <ul>
            <li>You must be at least 18 years old to use the Service. By using the Service, you self-declare and warrant that you meet this age requirement.</li>
            <li>The Service is intended for users in the UK or those interested in the UK's Innovator Founder Visa. However, access may be restricted in certain jurisdictions due to legal requirements.</li>
            <li>You must not use the Service if you are in a country under embargo or if you are on any prohibited list (e.g., US government restricted parties lists).</li>
            <li>We reserve the right to refuse access to any user at our discretion.</li>
          </ul>

          <h2>4. User Obligations and Prohibitions</h2>
          <p>You agree to:</p>
          <ul>
            <li>Provide accurate and non-personal information in your submissions. <strong>Warning:</strong> Do not include any personal data (e.g., names, contact details, health information, or anything that could identify an individual) in your business ideas or queries. Including personal data may violate these Terms and could trigger unintended data protection obligations.</li>
            <li>Use the Service only for lawful purposes and in compliance with applicable laws, including UK immigration rules.</li>
            <li>Not submit content that is offensive, illegal, infringing on third-party rights, or harmful (e.g., viruses, malware).</li>
            <li>Not attempt to reverse-engineer, hack, or interfere with the Service, including the AI algorithms or integrations.</li>
            <li>Not use automated tools (e.g., bots) to access or submit queries.</li>
            <li>Acknowledge that submissions are processed via third-party APIs (e.g., Grok API by xAI) and consent to such processing.</li>
          </ul>
          <p>Failure to comply may result in immediate termination of access, without liability on our part.</p>

          <h2>5. Data Handling, Privacy, and Confidentiality</h2>
          <ul>
            <li><strong>No Personal Data Collection:</strong> The Service does not collect, store, or process personal data as defined under the UK GDPR or Data Protection Act 2018. All submissions are intended to be anonymous and business-idea focused. However, if you inadvertently include personal data, you do so at your own risk, and we disclaim any responsibility.</li>
            <li><strong>Temporary Processing and Storage:</strong> Submissions are processed temporarily on our servers and via the Grok API for generating assessments. Data is not stored beyond the session and is deleted immediately after PDF generation (which occurs client-side where possible). For user convenience, previous inputs may be temporarily stored between sessions on a personal basis for the individual user (e.g., using browser local storage). This storage is client-side, unique to your device/browser, and not accessible by us or third parties. You can erase this temporary storage at any time using the form reset button on the Website.</li>
            <li><strong>Third-Party Integration:</strong> By using the Service, you consent to your submissions being transmitted to xAI's Grok API for AI analysis. xAI treats such data as confidential and does not use it for training purposes under their Enterprise Terms (available at https://x.ai/legal/terms-of-service-enterprise). Please review xAI's Privacy Policy for details on their handling. Data transfers to xAI (US-based) are subject to appropriate safeguards, but international transfers carry inherent risks.</li>
            <li><strong>No Retention or Sharing:</strong> We do not retain, sell, or share your submissions with any other parties except as necessary for the Service (e.g., xAI). Server logs may capture minimal technical data (e.g., IP addresses for security), but these are anonymised and not linked to submissions.</li>
            <li><strong>Confidentiality of Ideas:</strong> While we treat your business ideas as confidential, transmission and AI processing involve risks (e.g., potential breaches). We do not claim ownership of your ideas but cannot guarantee absolute security.</li>
            <li><strong>Privacy Policy:</strong> For more details, refer to our Privacy Policy [insert link to policy if separate]. If personal data is processed unintentionally, you may contact us to exercise rights under UK data protection laws.</li>
          </ul>

          <h2>6. Intellectual Property</h2>
          <ul>
            <li><strong>Our Rights:</strong> All content on the Website, including the AI tool, algorithms, reports, and materials, is owned by us or our licensors (e.g., xAI). You are granted a limited, non-exclusive, revocable licence to use the Service for personal, non-commercial purposes.</li>
            <li><strong>Your Submissions:</strong> You retain ownership of your business ideas. By submitting, you grant us a limited licence to process them for the assessment. You warrant that your submissions do not infringe third-party rights.</li>
            <li><strong>Prohibitions:</strong> You may not copy, modify, distribute, or create derivative works from our content without written permission.</li>
          </ul>

          <h2>7. Disclaimers and Limitations of Liability</h2>
          <ul>
            <li><strong>As-Is Basis:</strong> The Service is provided "as is" and "as available," without warranties of any kind, express or implied (e.g., accuracy, reliability, fitness for purpose). Assessments are AI-generated and may contain errors; they do not guarantee visa success.</li>
            <li><strong>No Professional Advice:</strong> Outputs are not substitutes for professional legal or immigration advice. Consult qualified experts for visa applications.</li>
            <li><strong>Limitations:</strong> To the fullest extent permitted by law, we shall not be liable for any indirect, consequential, special, or punitive damages, including loss of profits, data, or opportunities arising from use of the Service. Our total liability shall not exceed £100 (or the amount you paid, if any).</li>
            <li><strong>Exceptions:</strong> Nothing excludes our liability for death/personal injury caused by negligence, fraud, or matters that cannot be limited under UK law.</li>
            <li><strong>Force Majeure:</strong> We are not liable for failures due to events beyond our control (e.g., API outages, cyber-attacks).</li>
          </ul>

          <h2>8. Indemnification</h2>
          <p>You agree to indemnify and hold us harmless from any claims, losses, or damages arising from your breach of these Terms, misuse of the Service, or submission of infringing content.</p>

          <h2>9. Termination</h2>
          <p>We may terminate or suspend your access at any time, without notice, for any reason (e.g., violations). Upon termination, you must cease using the Service.</p>

          <h2>10. Governing Law and Dispute Resolution</h2>
          <p>These Terms are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales. For consumers, mandatory protections under your local laws apply.</p>

          <h2>11. Changes to Terms</h2>
          <p>We may amend these Terms at any time. Changes will be posted on the Website with the updated effective date. Your continued use constitutes acceptance. For material changes, we may notify via the Website.</p>

          <h2>12. Miscellaneous</h2>
          <ul>
            <li><strong>Severability:</strong> If any provision is invalid, the remainder remains enforceable.</li>
            <li><strong>No Waiver:</strong> Failure to enforce a right does not waive it.</li>
            <li><strong>Entire Agreement:</strong> These Terms constitute the full agreement, superseding prior understandings.</li>
            <li><strong>Assignment:</strong> We may assign these Terms; you may not without our consent.</li>
          </ul>

          <h2>13. Contact Us</h2>
          <p>For questions or concerns, contact us at <a href="mailto:info@lawyery.co" className="underline">info@lawyery.co</a> or at LEGAL ARTIFICIAL INTELLIGENCE DEVELOPMENT (LEGALAID) LIMITED, c/o Lawyery Limited, 3 Waterhouse Square, 138-142 Holborn, London, EC1N 2SW.</p>

          <p>By using the Service, you acknowledge that you have read and agree to these Terms.</p>
        </article>
        <div className="mt-6"><BackHomeButton /></div>
      </main>
    </div>
  );
};

export default Terms;