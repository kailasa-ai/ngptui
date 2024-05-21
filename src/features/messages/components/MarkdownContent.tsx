import Markdown from "react-markdown";
import RemarkGfm from "remark-gfm";
import RemarkMath from "remark-math";
import RemarkBreaks from "remark-breaks";
import RehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

type Props = {
  children: string;
};

const MarkdownContent = ({ children }: Props) => {
  return (
    <Markdown
      components={{
        ol: ({ children, ...props }) => (
          <ol
            {...props}
            className="list-decimal list-inside list flex flex-col gap-3"
          >
            {children}
          </ol>
        ),
        ul: ({ children, ...props }) => (
          <ul
            {...props}
            className="list-disc list-inside list flex flex-col gap-3"
          >
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
        li: ({ children, ...props }) => (
          <li {...props} className="inline-flex">
            {children}
          </li>
        ),
      }}
      remarkPlugins={[
        [RemarkMath, { singleDollarTextMath: false }],
        RemarkGfm,
        RemarkBreaks,
      ]}
      rehypePlugins={[RehypeKatex]}
    >
      {children}
    </Markdown>
  );
};

export default MarkdownContent;
