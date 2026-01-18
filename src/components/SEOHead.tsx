import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalPath?: string;
  ogImage?: string;
  ogType?: string;
  noindex?: boolean;
  structuredData?: object;
}

/**
 * SEO component for managing meta tags dynamically.
 * Updates document head with page-specific meta information.
 */
export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  canonicalPath = "",
  ogImage = "/lovable-uploads/60dd26fd-47df-4009-8a35-8d12e52c9bed.png",
  ogType = "website",
  noindex = false,
  structuredData,
}) => {
  useEffect(() => {
    const baseUrl = "https://www.ukinnovator.online";
    const fullTitle = title.length < 60 ? title : title.substring(0, 57) + "...";
    const fullDescription = description.length < 160 ? description : description.substring(0, 157) + "...";
    const canonicalUrl = `${baseUrl}${canonicalPath}`;
    const imageUrl = ogImage.startsWith("http") ? ogImage : `${baseUrl}${ogImage}`;

    // Title
    document.title = fullTitle;

    // Helper to set/create meta tags
    const setMeta = (selector: string, attribute: string, value: string) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement("meta");
        const [attr, attrVal] = selector.match(/\[([^=]+)="([^"]+)"\]/)?.slice(1) || [];
        if (attr && attrVal) el.setAttribute(attr, attrVal);
        document.head.appendChild(el);
      }
      el.setAttribute(attribute, value);
    };

    // Description
    setMeta('meta[name="description"]', "content", fullDescription);

    // Robots
    setMeta('meta[name="robots"]', "content", noindex ? "noindex, nofollow" : "index, follow");

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalUrl);

    // Open Graph
    setMeta('meta[property="og:title"]', "content", fullTitle);
    setMeta('meta[property="og:description"]', "content", fullDescription);
    setMeta('meta[property="og:url"]', "content", canonicalUrl);
    setMeta('meta[property="og:type"]', "content", ogType);
    setMeta('meta[property="og:image"]', "content", imageUrl);

    // Twitter
    setMeta('meta[name="twitter:title"]', "content", fullTitle);
    setMeta('meta[name="twitter:description"]', "content", fullDescription);
    setMeta('meta[name="twitter:image"]', "content", imageUrl);

    // Structured Data
    if (structuredData) {
      const existingScript = document.getElementById("page-structured-data");
      if (existingScript) existingScript.remove();
      
      const script = document.createElement("script");
      script.id = "page-structured-data";
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }

    return () => {
      // Cleanup structured data on unmount
      const script = document.getElementById("page-structured-data");
      if (script) script.remove();
    };
  }, [title, description, canonicalPath, ogImage, ogType, noindex, structuredData]);

  return null;
};

export default SEOHead;
