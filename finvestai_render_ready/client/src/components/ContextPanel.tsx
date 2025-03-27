import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getGlossaryTerms } from "@/lib/api";
import { MARKET_DATA, LEARNING_RESOURCES } from "@/lib/constants";
import { GlossaryTerm } from "@shared/schema";

const ContextPanel: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const { data: glossaryTerms = [], isLoading } = useQuery({
    queryKey: ["/api/glossary"],
    queryFn: getGlossaryTerms,
  });
  
  const filteredTerms = glossaryTerms.filter((term: GlossaryTerm) => 
    term.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
    term.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <aside className="hidden lg:block w-80 bg-white p-4 overflow-y-auto" style={{ maxHeight: "calc(100vh - 65px)" }}>
      <h3 className="font-medium text-neutral-800">Financial Glossary</h3>
      
      <div className="mt-3">
        <input 
          type="text" 
          placeholder="Search financial terms..." 
          className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="mt-4 space-y-3">
        {isLoading ? (
          Array(3).fill(0).map((_, i) => (
            <div key={i} className="p-3 bg-neutral-50 rounded-lg border border-neutral-100 animate-pulse">
              <div className="h-5 bg-neutral-200 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-neutral-200 rounded w-full"></div>
              <div className="h-4 bg-neutral-200 rounded w-4/5 mt-1"></div>
            </div>
          ))
        ) : filteredTerms.length > 0 ? (
          filteredTerms.map((term: GlossaryTerm) => (
            <div key={term.id} className="p-3 bg-neutral-50 rounded-lg border border-neutral-100">
              <h4 className="font-medium text-neutral-800">{term.term}</h4>
              <p className="mt-1 text-sm text-neutral-600">{term.definition}</p>
            </div>
          ))
        ) : (
          <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-100">
            <p className="text-sm text-neutral-500">No matching terms found.</p>
          </div>
        )}
      </div>
      
      <h3 className="font-medium text-neutral-800 mt-6">Market Updates</h3>
      <div className="mt-3 p-3 bg-neutral-50 rounded-lg border border-neutral-100">
        <div className="flex justify-between items-center">
          <h4 className="font-medium text-neutral-800">NIFTY 50</h4>
          <span className={`font-medium ${MARKET_DATA.nifty.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {MARKET_DATA.nifty.current.toLocaleString()} <span className="text-xs">{MARKET_DATA.nifty.change >= 0 ? '+' : ''}{MARKET_DATA.nifty.change}%</span>
          </span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <h4 className="font-medium text-neutral-800">SENSEX</h4>
          <span className={`font-medium ${MARKET_DATA.sensex.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {MARKET_DATA.sensex.current.toLocaleString()} <span className="text-xs">{MARKET_DATA.sensex.change >= 0 ? '+' : ''}{MARKET_DATA.sensex.change}%</span>
          </span>
        </div>
        <div className="mt-3 text-xs text-neutral-500 text-right">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>
      
      <h3 className="font-medium text-neutral-800 mt-6">Learning Resources</h3>
      <div className="mt-3 space-y-2">
        {LEARNING_RESOURCES.map((resource, index) => (
          <a 
            key={index}
            href="#" 
            className="block p-3 bg-white rounded-lg border border-neutral-200 hover:border-primary-light transition"
          >
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-md ${resource.iconBg} flex items-center justify-center`}>
                <span className={`material-icons text-sm ${resource.iconColor}`}>{resource.icon}</span>
              </div>
              <div className="ml-2">
                <h4 className="font-medium text-sm">{resource.title}</h4>
                <p className="text-xs text-neutral-500">{resource.description}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </aside>
  );
};

export default ContextPanel;
