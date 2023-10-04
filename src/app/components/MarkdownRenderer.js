import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useTheme } from "next-themes";

const MarkdownRenderer = ({ content }) => {
  // const { themeState } = useThemeStore(); // zustand

  const { theme } = useTheme(); //next-themes


  const components = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <SyntaxHighlighter
          style={vscDarkPlus}
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };

  return (
    <ReactMarkdown
      className={`markdown ${theme === "light" ? "lightThemeText" : "darkThemeText"}`}
      components={components}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
