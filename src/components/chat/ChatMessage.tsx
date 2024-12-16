import { Message } from "ai/react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import { cn } from "@/lib/utils";

export const ChatMessages = ({ messages }: { messages: Message[] }) => {
  return (
    <div className="flex w-full flex-1 flex-col gap-2 px-4 py-24">
      {messages.map((m) => (
        <ChatMessage key={m.id} message={m} />
      ))}
    </div>
  );
};

const ChatMessage = ({ message }: { message: Message }) => {
  const isSelf = message.role === "user";
  return (
    <div className={cn("flex", isSelf ? "justify-end" : "justify-start")}>
      {isSelf ? (
        <div className="max-w-[70%] whitespace-pre-wrap break-words overflow-wrap-anywhere rounded-3xl bg-muted px-5 py-2.5">
          {message.content}
        </div>
      ) : (
        <div className="max-w-[70%] prose dark:prose-invert">
          <ReactMarkdown
            components={{
              code({node, inline, className, children, ...props}) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={vscDarkPlus}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              }
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
};
