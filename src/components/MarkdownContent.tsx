import { Children, isValidElement, type ReactNode } from "react";
import ReactMarkdown from "react-markdown";

const headingId = (children: ReactNode) =>
  String(children).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const Paragraph = ({ children }: { children?: ReactNode }) => {
  const parts = Children.toArray(children);
  const first = parts[0];
  if (isValidElement<{ children?: ReactNode }>(first) && first.type === "strong") {
    return (
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-foreground">{first.props.children}</h3>
        {parts.length > 1 && <p className="leading-relaxed text-foreground">{parts.slice(1)}</p>}
      </div>
    );
  }
  return <p className="leading-relaxed text-foreground">{children}</p>;
};

const MarkdownContent = ({ content }: { content: string }) => (
  <div className="space-y-5 leading-relaxed text-foreground">
    <ReactMarkdown
      components={{
        h2: ({ children }) => <h2 id={headingId(children)} className="pt-4 text-3xl font-semibold text-foreground">{children}</h2>,
        h3: ({ children }) => <h2 id={headingId(children)} className="pt-4 text-3xl font-semibold text-foreground">{children}</h2>,
        p: Paragraph,
        ul: ({ children }) => <ul className="ml-6 list-disc space-y-2">{children}</ul>,
        ol: ({ children }) => <ol className="ml-6 list-decimal space-y-2">{children}</ol>,
        strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
      }}
    >
      {content}
    </ReactMarkdown>
  </div>
);

export default MarkdownContent;