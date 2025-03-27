import React, { useState, useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { sendMessage } from "@/lib/api";
import { QUICK_SUGGESTIONS, WELCOME_MESSAGE } from "@/lib/constants";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import QuickSuggestion from "./QuickSuggestion";
import DotFlashing from "@/components/ui/dotFlashing";

// Define the ChatMessage type here to match the API
type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

interface ChatContainerProps {
  initialMessages?: { role: "user" | "assistant"; content: string }[];
}

const ChatContainer: React.FC<ChatContainerProps> = ({ initialMessages = [] }) => {
  const [messages, setMessages] = useState(() => 
    initialMessages.length ? initialMessages : [WELCOME_MESSAGE]
  );
  const [isTyping, setIsTyping] = useState(false);
  const [wsConnected, setWsConnected] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  // Skip WebSocket connection for now since we're having issues with it in Replit
  // We'll just use the REST API fallback which is more reliable
  useEffect(() => {
    console.log('Using REST API for communication instead of WebSocket');
    setWsConnected(false);
  }, []);
  
  // Use REST API for chat communication
  const sendMessageMutation = useMutation({
    mutationFn: async (userMessage: string) => {
      setIsTyping(true);
      // Cast messages to the expected type
      const chatMessages = messages.map(msg => ({
        role: msg.role as "user" | "assistant",
        content: msg.content
      }));
      const result = await sendMessage(userMessage, chatMessages);
      setIsTyping(false);
      return result;
    },
    onSuccess: (data) => {
      setMessages(data.conversation);
    },
    onError: (error) => {
      console.error("Error sending message:", error);
      setIsTyping(false);
      setMessages([
        ...messages,
        {
          role: "assistant" as const,
          content: "I'm sorry, I encountered an error processing your request. Please try again later."
        }
      ]);
    }
  });
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);
  
  const handleSendMessage = (text: string) => {
    const userMessage = { role: "user" as const, content: text };
    
    // Add user message to state immediately
    setMessages([...messages, userMessage]);
    
    // Always use the REST API - more reliable on Replit
    sendMessageMutation.mutate(text);
  };

  return (
    <section className="flex-1 flex flex-col bg-white md:border-r md:rounded-lg md:shadow-sm md:m-4 overflow-hidden">
      {/* Welcome Header */}
      <div className="p-5 border-b bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white flex-shrink-0 mr-3">
            <span className="material-icons">support_agent</span>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Financial Assistant</h2>
            <p className="text-sm text-gray-600">Ask me anything about investing or financial planning in India</p>
          </div>
        </div>
      </div>

      {/* Quick Suggestions */}
      <div className="p-4 bg-gray-50 border-b flex items-center overflow-x-auto">
        <span className="text-sm font-medium text-gray-500 mr-3 flex-shrink-0">Try asking:</span>
        <div className="flex space-x-2">
          {QUICK_SUGGESTIONS.slice(0, 4).map((suggestion, index) => (
            <QuickSuggestion 
              key={index} 
              text={suggestion} 
              onClick={handleSendMessage} 
            />
          ))}
        </div>
      </div>

      {/* Chat Container */}
      <div 
        className="flex-1 p-5 overflow-y-auto bg-gradient-to-b from-gray-50 to-white" 
        ref={chatContainerRef}
        style={{ minHeight: '400px' }}
      >
        {/* Render all messages */}
        {messages.map((message, index) => (
          <ChatMessage 
            key={index} 
            role={message.role as "user" | "assistant"} 
            content={message.content} 
            onSuggestionClick={handleSendMessage}
          />
        ))}
        
        {/* Typing indicator */}
        {isTyping && (
          <div className="flex mt-4 items-center">
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white flex-shrink-0">
              <span className="material-icons text-sm">smart_toy</span>
            </div>
            <div className="ml-3 bg-primary/5 rounded-lg rounded-tl-none py-3 px-4">
              <DotFlashing />
            </div>
          </div>
        )}
      </div>

      {/* Input Section */}
      <div className="border-t p-4 bg-white shadow-sm">
        <ChatInput 
          onSendMessage={handleSendMessage} 
          disabled={isTyping || sendMessageMutation.isPending}
        />
      </div>
    </section>
  );
};

export default ChatContainer;
