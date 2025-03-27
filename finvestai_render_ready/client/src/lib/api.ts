import { apiRequest } from "./queryClient";
import { MutualFund, GlossaryTerm } from "@shared/schema";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type ChatResponse = {
  response: string;
  conversation: ChatMessage[];
};

// We're completely disabling WebSockets for Replit compatibility
// and using REST API exclusively for all communication
console.log('Using REST API exclusively for all communication (WebSockets disabled)');

// These are stub implementations that won't actually use WebSockets
// but will allow existing code to work without errors
export const connectWebSocket = (): Promise<WebSocket> => {
  return Promise.reject(new Error('WebSockets disabled for compatibility'));
};

export const subscribeToMessages = (callback: (data: any) => void) => {
  console.log('WebSocket subscription requested but WebSockets are disabled');
  return () => {}; // Return empty cleanup function
};

export const sendWebSocketMessage = (data: any) => {
  console.log('WebSocket message sending attempted but WebSockets are disabled');
  return false;
};

// Fallback REST API functions
export const sendMessage = async (
  message: string,
  conversation: ChatMessage[] = []
): Promise<ChatResponse> => {
  const res = await apiRequest("POST", "/api/chat", { message, conversation });
  return res.json();
};

export const getMutualFunds = async (): Promise<MutualFund[]> => {
  const res = await apiRequest("GET", "/api/mutual-funds");
  return res.json();
};

export const getMutualFundById = async (id: number): Promise<MutualFund> => {
  const res = await apiRequest("GET", `/api/mutual-funds/${id}`);
  return res.json();
};

export const getMutualFundsByCategory = async (category: string): Promise<MutualFund[]> => {
  const res = await apiRequest("GET", `/api/mutual-funds/category/${encodeURIComponent(category)}`);
  return res.json();
};

export const getGlossaryTerms = async (): Promise<GlossaryTerm[]> => {
  const res = await apiRequest("GET", "/api/glossary");
  return res.json();
};

export const getGlossaryTerm = async (term: string): Promise<GlossaryTerm> => {
  const res = await apiRequest("GET", `/api/glossary/${encodeURIComponent(term)}`);
  return res.json();
};

// Calculate SIP returns
export const calculateSipReturns = (
  monthlyAmount: number,
  annualInterestRate: number,
  years: number
): number => {
  const monthlyRate = annualInterestRate / 100 / 12;
  const months = years * 12;
  const futureValue = monthlyAmount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
  return Math.round(futureValue);
};

// Format currency in Indian format (e.g., 1,00,000)
export const formatIndianCurrency = (amount: number): string => {
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  
  return formatter.format(amount);
};

// Convert large numbers to shortened format with suffix (K, L, Cr)
export const shortenCurrency = (amount: number): string => {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(1)}Cr`;
  } else if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)}L`;
  } else if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(1)}K`;
  }
  return `₹${amount}`;
};
