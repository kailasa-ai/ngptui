import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Props = {
  children: string;
};

const MarkdownContent = ({ children }: Props) => {
  return (
    <Markdown
      components={{
        ol: ({ children }) => (
          <ol className="list-decimal list-inside">{children}</ol>
        ),
        ul: ({ children }) => (
          <ul className="list-disc list-inside">{children}</ul>
        ),
        a: ({ node, ...props }) => (
          <a
            {...props}
            className="text-blue-500 underline break-all"
            target="_blank"
            rel="noreferrer"
          />
        ),
      }}
      remarkPlugins={[remarkGfm]}
    >
      {children}
    </Markdown>
  );
};

export default MarkdownContent;
