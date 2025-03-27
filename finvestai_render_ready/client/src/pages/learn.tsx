import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FinancialCalculator from "@/components/Calculator/FinancialCalculator";
import LearningVideos from "@/components/Learning/LearningVideos";

const LearnPage: React.FC = () => {
  return (
    <div className="flex-1 p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Learn Financial Concepts</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <FinancialCalculator />
        <LearningVideos />
      </div>
      
      <h2 className="text-xl font-semibold mb-4 text-gray-800 mt-8">Learning Paths</h2>
      <Tabs defaultValue="beginner" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="beginner">Beginner</TabsTrigger>
          <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>
        
        <TabsContent value="beginner">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            <Card>
              <CardHeader className="bg-blue-50 rounded-t-lg">
                <CardTitle className="flex items-center">
                  <span className="material-icons text-primary mr-2">school</span>
                  Investment Basics
                </CardTitle>
                <CardDescription>Learn the foundations of investing in India</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="material-icons text-primary text-sm mr-2">play_circle</span>
                    <span>Introduction to Investing</span>
                  </li>
                  <li className="flex items-center">
                    <span className="material-icons text-primary text-sm mr-2">play_circle</span>
                    <span>Understanding Risk & Return</span>
                  </li>
                  <li className="flex items-center">
                    <span className="material-icons text-primary text-sm mr-2">play_circle</span>
                    <span>Setting Investment Goals</span>
                  </li>
                </ul>
                <button className="mt-4 w-full py-2 text-sm bg-primary text-white rounded-md font-medium">
                  Start Learning
                </button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="bg-green-50 rounded-t-lg">
                <CardTitle className="flex items-center">
                  <span className="material-icons text-green-600 mr-2">savings</span>
                  Mutual Funds 101
                </CardTitle>
                <CardDescription>Everything you need to know about mutual funds</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="material-icons text-green-600 text-sm mr-2">play_circle</span>
                    <span>What are Mutual Funds?</span>
                  </li>
                  <li className="flex items-center">
                    <span className="material-icons text-green-600 text-sm mr-2">play_circle</span>
                    <span>Types of Mutual Funds</span>
                  </li>
                  <li className="flex items-center">
                    <span className="material-icons text-green-600 text-sm mr-2">play_circle</span>
                    <span>How to Invest in Mutual Funds</span>
                  </li>
                </ul>
                <button className="mt-4 w-full py-2 text-sm bg-green-600 text-white rounded-md font-medium">
                  Start Learning
                </button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="bg-amber-50 rounded-t-lg">
                <CardTitle className="flex items-center">
                  <span className="material-icons text-amber-600 mr-2">calculate</span>
                  SIP Fundamentals
                </CardTitle>
                <CardDescription>Master Systematic Investment Plans</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="material-icons text-amber-600 text-sm mr-2">play_circle</span>
                    <span>SIP vs Lump Sum Investing</span>
                  </li>
                  <li className="flex items-center">
                    <span className="material-icons text-amber-600 text-sm mr-2">play_circle</span>
                    <span>Power of Compounding</span>
                  </li>
                  <li className="flex items-center">
                    <span className="material-icons text-amber-600 text-sm mr-2">play_circle</span>
                    <span>Rupee Cost Averaging</span>
                  </li>
                </ul>
                <button className="mt-4 w-full py-2 text-sm bg-amber-600 text-white rounded-md font-medium">
                  Start Learning
                </button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="intermediate">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            <Card>
              <CardHeader className="bg-purple-50 rounded-t-lg">
                <CardTitle className="flex items-center">
                  <span className="material-icons text-purple-600 mr-2">show_chart</span>
                  Technical Analysis
                </CardTitle>
                <CardDescription>Learn to read charts and market trends</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="material-icons text-purple-600 text-sm mr-2">play_circle</span>
                    <span>Understanding Chart Patterns</span>
                  </li>
                  <li className="flex items-center">
                    <span className="material-icons text-purple-600 text-sm mr-2">play_circle</span>
                    <span>Technical Indicators</span>
                  </li>
                  <li className="flex items-center">
                    <span className="material-icons text-purple-600 text-sm mr-2">play_circle</span>
                    <span>Trend Analysis</span>
                  </li>
                </ul>
                <button className="mt-4 w-full py-2 text-sm bg-purple-600 text-white rounded-md font-medium">
                  Start Learning
                </button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="bg-blue-50 rounded-t-lg">
                <CardTitle className="flex items-center">
                  <span className="material-icons text-primary mr-2">description</span>
                  Fundamental Analysis
                </CardTitle>
                <CardDescription>Evaluate company performance and value</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="material-icons text-primary text-sm mr-2">play_circle</span>
                    <span>Financial Statements Analysis</span>
                  </li>
                  <li className="flex items-center">
                    <span className="material-icons text-primary text-sm mr-2">play_circle</span>
                    <span>Key Financial Ratios</span>
                  </li>
                  <li className="flex items-center">
                    <span className="material-icons text-primary text-sm mr-2">play_circle</span>
                    <span>Company Valuation Methods</span>
                  </li>
                </ul>
                <button className="mt-4 w-full py-2 text-sm bg-primary text-white rounded-md font-medium">
                  Start Learning
                </button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="advanced">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            <Card>
              <CardHeader className="bg-red-50 rounded-t-lg">
                <CardTitle className="flex items-center">
                  <span className="material-icons text-red-600 mr-2">trending_up</span>
                  Options Trading
                </CardTitle>
                <CardDescription>Learn advanced derivative strategies</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="material-icons text-red-600 text-sm mr-2">play_circle</span>
                    <span>Options Basics</span>
                  </li>
                  <li className="flex items-center">
                    <span className="material-icons text-red-600 text-sm mr-2">play_circle</span>
                    <span>Option Greeks</span>
                  </li>
                  <li className="flex items-center">
                    <span className="material-icons text-red-600 text-sm mr-2">play_circle</span>
                    <span>Trading Strategies</span>
                  </li>
                </ul>
                <button className="mt-4 w-full py-2 text-sm bg-red-600 text-white rounded-md font-medium">
                  Start Learning
                </button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="bg-green-50 rounded-t-lg">
                <CardTitle className="flex items-center">
                  <span className="material-icons text-green-600 mr-2">account_balance</span>
                  Portfolio Management
                </CardTitle>
                <CardDescription>Advanced techniques for managing investments</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="material-icons text-green-600 text-sm mr-2">play_circle</span>
                    <span>Asset Allocation Strategies</span>
                  </li>
                  <li className="flex items-center">
                    <span className="material-icons text-green-600 text-sm mr-2">play_circle</span>
                    <span>Portfolio Rebalancing</span>
                  </li>
                  <li className="flex items-center">
                    <span className="material-icons text-green-600 text-sm mr-2">play_circle</span>
                    <span>Risk Management Techniques</span>
                  </li>
                </ul>
                <button className="mt-4 w-full py-2 text-sm bg-green-600 text-white rounded-md font-medium">
                  Start Learning
                </button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LearnPage;
