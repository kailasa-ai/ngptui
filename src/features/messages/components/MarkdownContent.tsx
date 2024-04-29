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
          <ol className="list-decimal list-inside list flex flex-col gap-3">
            {children}
          </ol>
        ),
        ul: ({ children }) => (
          <ul className="list-disc list-inside list flex flex-col gap-3">
            {children}
          </ul>
        ),
        a: ({ node, ...props }) => (
          <a
            {...props}
            className="text-blue-500 underline break-all"
            target="_blank"
            rel="noreferrer"
          />
        ),
        li: ({ children }) => <li className="inline-flex">{children}</li>,
      }}
      remarkPlugins={[remarkGfm]}
    >
      {children}
    </Markdown>
  );
};

export default MarkdownContent;
