import React, { useState, FormEvent, useRef, useEffect } from "react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled = false }) => {
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Auto-focus the input on component mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="border-t p-4 bg-white">
      <form id="chat-form" className="flex items-center gap-2" onSubmit={handleSubmit}>
        <div className="flex-1 relative">
          <input 
            ref={inputRef}
            type="text" 
            id="user-input"
            placeholder="Ask about investing, financial terms, or specific products..." 
            className="w-full border border-gray-200 rounded-full pl-5 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={disabled}
          />
          <button 
            type="submit" 
            className={`absolute right-1 top-1 bottom-1 rounded-full p-2.5 focus:outline-none
              ${message.trim() && !disabled 
                ? 'bg-primary text-white hover:bg-primary/90' 
                : 'bg-gray-100 text-gray-400'
              }`}
            disabled={disabled || !message.trim()}
          >
            <span className="material-icons">send</span>
          </button>
        </div>
      </form>
      
      <div className="mt-3 flex items-center justify-center gap-2">
        <div className="bg-blue-50 p-1 rounded-full">
          <span className="material-icons text-blue-500 text-xs">smart_toy</span>
        </div>
        <p className="text-xs text-gray-500">Powered by Gemini AI • Not financial advice</p>
      </div>
    </div>
  );
};

export default ChatInput;
