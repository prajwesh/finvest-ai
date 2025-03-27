import { 
  users, type User, type InsertUser, 
  chatMessages, type ChatMessage, type InsertChatMessage,
  mutualFunds, type MutualFund, type InsertMutualFund,
  glossaryTerms, type GlossaryTerm, type InsertGlossaryTerm
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Chat message operations
  getChatMessagesByUserId(userId: number): Promise<ChatMessage[]>;
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  
  // Mutual fund operations
  getAllMutualFunds(): Promise<MutualFund[]>;
  getMutualFundById(id: number): Promise<MutualFund | undefined>;
  getMutualFundsByCategory(category: string): Promise<MutualFund[]>;
  createMutualFund(fund: InsertMutualFund): Promise<MutualFund>;
  
  // Glossary operations
  getAllGlossaryTerms(): Promise<GlossaryTerm[]>;
  getGlossaryTermByTerm(term: string): Promise<GlossaryTerm | undefined>;
  createGlossaryTerm(term: InsertGlossaryTerm): Promise<GlossaryTerm>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private chatMessages: Map<number, ChatMessage>;
  private mutualFunds: Map<number, MutualFund>;
  private glossaryTerms: Map<number, GlossaryTerm>;
  
  private userId: number;
  private chatMessageId: number;
  private mutualFundId: number;
  private glossaryTermId: number;

  constructor() {
    this.users = new Map();
    this.chatMessages = new Map();
    this.mutualFunds = new Map();
    this.glossaryTerms = new Map();
    
    this.userId = 1;
    this.chatMessageId = 1;
    this.mutualFundId = 1;
    this.glossaryTermId = 1;
    
    // Initialize with demo data
    this.initDefaultData();
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Chat message operations
  async getChatMessagesByUserId(userId: number): Promise<ChatMessage[]> {
    return Array.from(this.chatMessages.values()).filter(
      (message) => message.userId === userId,
    );
  }
  
  async createChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const id = this.chatMessageId++;
    const timestamp = new Date();
    // Ensure userId is null if it's undefined
    const userId = insertMessage.userId ?? null;
    const message: ChatMessage = { ...insertMessage, id, timestamp, userId };
    this.chatMessages.set(id, message);
    return message;
  }
  
  // Mutual fund operations
  async getAllMutualFunds(): Promise<MutualFund[]> {
    return Array.from(this.mutualFunds.values());
  }
  
  async getMutualFundById(id: number): Promise<MutualFund | undefined> {
    return this.mutualFunds.get(id);
  }
  
  async getMutualFundsByCategory(category: string): Promise<MutualFund[]> {
    return Array.from(this.mutualFunds.values()).filter(
      (fund) => fund.category === category,
    );
  }
  
  async createMutualFund(insertFund: InsertMutualFund): Promise<MutualFund> {
    const id = this.mutualFundId++;
    
    // Ensure optional fields have null values if undefined
    const returns1Y = insertFund.returns1Y ?? null;
    const returns3Y = insertFund.returns3Y ?? null;
    const returns5Y = insertFund.returns5Y ?? null;
    const description = insertFund.description ?? null;
    
    const fund: MutualFund = { 
      ...insertFund,
      id,
      returns1Y,
      returns3Y,
      returns5Y,
      description
    };
    
    this.mutualFunds.set(id, fund);
    return fund;
  }
  
  // Glossary operations
  async getAllGlossaryTerms(): Promise<GlossaryTerm[]> {
    return Array.from(this.glossaryTerms.values());
  }
  
  async getGlossaryTermByTerm(term: string): Promise<GlossaryTerm | undefined> {
    return Array.from(this.glossaryTerms.values()).find(
      (glossaryTerm) => glossaryTerm.term.toLowerCase() === term.toLowerCase(),
    );
  }
  
  async createGlossaryTerm(insertTerm: InsertGlossaryTerm): Promise<GlossaryTerm> {
    const id = this.glossaryTermId++;
    const term: GlossaryTerm = { ...insertTerm, id };
    this.glossaryTerms.set(id, term);
    return term;
  }
  
  // Initialize default data
  private initDefaultData() {
    // Add sample mutual funds
    this.createMutualFund({
      name: "Axis Bluechip Fund",
      category: "Large Cap",
      type: "Equity",
      risk: "Moderate",
      returns1Y: "12.8%",
      returns3Y: "14.2%",
      returns5Y: "15.1%",
      minSIP: 500,
      description: "A large cap equity fund that invests in blue chip companies with stable growth."
    });
    
    this.createMutualFund({
      name: "Mirae Asset Emerging Bluechip",
      category: "Mid Cap",
      type: "Equity",
      risk: "Moderately High",
      returns1Y: "15.3%",
      returns3Y: "16.8%",
      returns5Y: "17.9%",
      minSIP: 1000,
      description: "A mid cap fund focusing on emerging companies with high growth potential."
    });
    
    this.createMutualFund({
      name: "Parag Parikh Flexi Cap Fund",
      category: "Flexi Cap",
      type: "Equity",
      risk: "Moderate",
      returns1Y: "14.1%",
      returns3Y: "15.3%",
      returns5Y: "16.2%",
      minSIP: 1000,
      description: "A flexible portfolio that invests across large, mid, and small cap companies."
    });
    
    this.createMutualFund({
      name: "HDFC Index Fund - Nifty 50",
      category: "Index",
      type: "Equity",
      risk: "Moderate",
      returns1Y: "14.8%",
      returns3Y: "15.2%",
      returns5Y: "16.0%",
      minSIP: 500,
      description: "Tracks the NIFTY 50 index and mirrors its performance."
    });
    
    this.createMutualFund({
      name: "Mirae Asset Tax Saver Fund",
      category: "ELSS",
      type: "Equity",
      risk: "High",
      returns1Y: "15.8%",
      returns3Y: "16.7%",
      returns5Y: "17.5%",
      minSIP: 500,
      description: "Equity Linked Savings Scheme that offers tax benefits under Section 80C."
    });
    
    // Add financial glossary terms
    this.createGlossaryTerm({
      term: "SIP (Systematic Investment Plan)",
      definition: "A method of investing a fixed amount in mutual funds at regular intervals, typically monthly."
    });
    
    this.createGlossaryTerm({
      term: "Mutual Fund",
      definition: "An investment vehicle that pools money from multiple investors to invest in securities like stocks, bonds, etc."
    });
    
    this.createGlossaryTerm({
      term: "NAV (Net Asset Value)",
      definition: "The per unit value of a mutual fund, calculated by dividing the total value of all the assets by the number of units."
    });
    
    this.createGlossaryTerm({
      term: "ELSS (Equity Linked Savings Scheme)",
      definition: "A type of mutual fund that invests primarily in equities and offers tax benefits under Section 80C of the Income Tax Act."
    });
    
    this.createGlossaryTerm({
      term: "Expense Ratio",
      definition: "The annual fee charged by mutual funds to cover operating expenses, expressed as a percentage of the fund's assets."
    });
    
    this.createGlossaryTerm({
      term: "Rupee Cost Averaging",
      definition: "An investment strategy where you invest a fixed amount at regular intervals regardless of market price, reducing the impact of volatility."
    });
  }
}

export const storage = new MemStorage();
