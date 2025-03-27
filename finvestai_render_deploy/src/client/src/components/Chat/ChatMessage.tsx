import React from "react";
import ReactMarkdown from "react-markdown";
import { useQuery } from "@tanstack/react-query";
import { getMutualFunds } from "@/lib/api";
import QuickSuggestion from "./QuickSuggestion";
import MutualFundCard from "./MutualFundCard";
import SIPChart from "./SIPChart";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  onSuggestionClick: (text: string) => void;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ role, content, onSuggestionClick }) => {
  const isUser = role === "user";
  
  // Fetch mutual funds for display in messages
  const { data: mutualFunds = [] } = useQuery({
    queryKey: ["/api/mutual-funds"],
    queryFn: getMutualFunds,
    enabled: role === "assistant" && content.includes("mutual fund"),
  });
  
  // Extract suggestions from content if present
  const getSuggestions = (): string[] => {
    const suggestionMatch = content.match(/Would you like.+?\?[\r\n]+(.*?)(?:[\r\n]+|$)/i);
    if (suggestionMatch && suggestionMatch[1]) {
      const buttonsContent = suggestionMatch[1];
      // Extract text within quotes or just words for suggestions
      const suggestions = buttonsContent.match(/["']([^"']+)["']|\b(\w+(?:\s+\w+){2,})\b/g);
      if (suggestions) {
        return suggestions.map(s => s.replace(/['"]/g, '').trim());
      }
    }
    
    // Try an alternative pattern
    const buttons = content.match(/\[(.*?)\]/g);
    if (buttons) {
      return buttons.map(b => b.replace(/[\[\]]/g, '').trim());
    }
    
    return [];
  };
  
  // Determine if content should include a SIP chart
  const shouldShowSIPChart = 
    role === "assistant" && 
    (content.includes("SIP") || content.includes("Systematic Investment Plan")) && 
    content.includes("Growth Visualization");
  
  // Determine if content should display mutual fund cards
  const shouldShowMutualFunds = 
    role === "assistant" && 
    content.includes("mutual fund") && 
    mutualFunds.length > 0;
  
  // Get suggested questions that might be present in the AI response
  const suggestions = getSuggestions();

  return (
    <div className={`mb-6 flex ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`w-9 h-9 rounded-full ${isUser ? 'bg-blue-500 text-white' : 'bg-primary text-white'} flex items-center justify-center flex-shrink-0 shadow-sm`}>
        <span className="material-icons text-sm">{isUser ? 'person' : 'support_agent'}</span>
      </div>
      <div 
        className={`
          ${isUser ? 'mr-3 bg-blue-500 text-white' : 'ml-3 bg-white text-gray-800 border border-gray-100'} 
          rounded-xl 
          ${isUser ? 'rounded-tr-none' : 'rounded-tl-none'} 
          p-4 max-w-3xl
          ${isUser ? 'shadow' : 'shadow-sm'}
        `}
      >
        <ReactMarkdown 
          components={{
            a: ({ node, ...props }) => <a className={`${isUser ? 'text-blue-100 underline' : 'text-primary underline'}`} {...props} />,
            h1: ({ node, ...props }) => <h1 className="text-xl font-bold mt-3 mb-2" {...props} />,
            h2: ({ node, ...props }) => <h2 className="text-lg font-bold mt-3 mb-2" {...props} />,
            h3: ({ node, ...props }) => <h3 className="text-md font-bold mt-3 mb-1" {...props} />,
            h4: ({ node, ...props }) => <h4 className="font-semibold mt-4" {...props} />,
            ul: ({ node, ...props }) => <ul className="list-disc pl-5 mt-2 mb-3 space-y-1" {...props} />,
            ol: ({ node, ...props }) => <ol className="list-decimal pl-5 mt-2 mb-3 space-y-1" {...props} />,
            li: ({ node, ...props }) => <li className="text-sm my-1" {...props} />,
            p: ({ node, ...props }) => <p className="mt-2 mb-2 leading-relaxed" {...props} />,
            code: ({ node, ...props }) => <code className={`px-1 py-0.5 rounded ${isUser ? 'bg-blue-400' : 'bg-gray-100'}`} {...props} />,
            pre: ({ node, ...props }) => (
              <pre className={`p-3 rounded-md my-3 overflow-x-auto text-sm ${isUser ? 'bg-blue-400' : 'bg-gray-100'}`} {...props} />
            ),
          }}
        >
          {content}
        </ReactMarkdown>
        
        {shouldShowSIPChart && (
          <div className="mt-4 p-4 bg-white rounded-lg shadow border border-gray-100">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">SIP Growth Visualization</h3>
            <SIPChart />
          </div>
        )}
        
        {shouldShowMutualFunds && (
          <div className="mt-4 mb-2">
            <h3 className="text-md font-semibold mb-3 text-gray-700">Recommended Mutual Funds</h3>
            <div className="scrolling-wrapper flex gap-3 pb-2 overflow-x-auto">
              {mutualFunds.slice(0, 3).map((fund) => (
                <MutualFundCard key={fund.id} fund={fund} />
              ))}
            </div>
          </div>
        )}
        
        {role === "assistant" && suggestions.length > 0 && (
          <div className="mt-4 pt-3 border-t border-gray-100">
            <p className="text-sm text-gray-500 mb-2">You might want to ask:</p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion, index) => (
                <QuickSuggestion 
                  key={index} 
                  text={suggestion} 
                  onClick={onSuggestionClick} 
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
