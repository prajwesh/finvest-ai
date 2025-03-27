import React from "react";

interface QuickSuggestionProps {
  text: string;
  onClick: (text: string) => void;
}

const QuickSuggestion: React.FC<QuickSuggestionProps> = ({ text, onClick }) => {
  return (
    <button 
      className="bg-white border border-gray-200 rounded-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:border-primary hover:text-primary transition-all shadow-sm flex items-center whitespace-nowrap"
      onClick={() => onClick(text)}
    >
      <span className="material-icons text-xs mr-1">add_circle</span>
      {text.length > 25 ? `${text.substring(0, 25)}...` : text}
    </button>
  );
};

export default QuickSuggestion;
