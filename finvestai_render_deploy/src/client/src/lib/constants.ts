// Financial Product Types
export const FUND_CATEGORIES = [
  "Large Cap",
  "Mid Cap",
  "Small Cap",
  "Flexi Cap",
  "ELSS",
  "Index",
  "Debt"
];

export const RISK_LEVELS = [
  "Low",
  "Moderate",
  "Moderately High",
  "High"
];

// Sample questions for quick suggestions
export const QUICK_SUGGESTIONS = [
  "What are mutual funds?",
  "How to start investing?",
  "Compare SIP vs lump sum",
  "Explain SIP in detail",
  "Tax benefits of investments",
  "What is an ELSS fund?",
  "Best investment for beginners",
  "How to create an emergency fund?"
];

// SIP Calculator constants
export const SIP_YEARS = [1, 3, 5, 10, 20];
export const DEFAULT_MONTHLY_AMOUNT = 5000;
export const DEFAULT_ANNUAL_RETURN = 12;

// Sample market data
export const MARKET_DATA = {
  nifty: { current: 21380, change: 0.8 },
  sensex: { current: 70830, change: 0.7 }
};

// Learning resources
export const LEARNING_RESOURCES = [
  {
    title: "Investing Basics",
    description: "5-minute video series",
    icon: "play_circle",
    iconBg: "bg-blue-100",
    iconColor: "text-primary"
  },
  {
    title: "Understanding Mutual Funds",
    description: "Beginner's guide",
    icon: "article",
    iconBg: "bg-green-100",
    iconColor: "text-success"
  },
  {
    title: "Investment Calculators",
    description: "Plan your financial goals",
    icon: "calculate",
    iconBg: "bg-amber-100", 
    iconColor: "text-amber-600"
  }
];

// Default system welcome message
export const WELCOME_MESSAGE = {
  role: "assistant",
  content: "Hello! I'm your AI financial assistant. I can help you understand investments, find suitable products, and improve your financial literacy. What would you like to know today?"
};
