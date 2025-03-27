import React from "react";
import { Link } from "wouter";

const HomePage: React.FC = () => {
  return (
    <div className="flex-1 w-full">
      {/* Hero Section with Blue Gradient Background */}
      <div className="bg-blue-gradient text-white min-h-[550px] flex flex-col justify-center px-6 md:px-12 lg:px-20 relative overflow-hidden">
        {/* Background circles decoration */}
        <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-blue-400/20 blur-xl"></div>
        <div className="absolute bottom-20 left-40 w-48 h-48 rounded-full bg-blue-300/20 blur-xl"></div>
        <div className="absolute top-40 left-10 w-36 h-36 rounded-full bg-blue-200/10 blur-lg"></div>
        
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between w-full py-12 z-10">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <div className="flex items-center mb-8">
              <div className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center mr-3">
                <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 9L12 3L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 21V11H16V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h2 className="text-2xl font-bold">FinBuddy</h2>
            </div>
            
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold mb-6 leading-tight">
              Your AI <span className="text-blue-200">Financial Partner</span> for <span className="text-white">Smarter Investments</span>
            </h1>
            
            <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-xl">
              Get personalized investment advice, learn financial concepts, and build wealth with confidence. Powered by advanced AI analysis.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link href="/assistant">
                <div className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-6 py-3 rounded-md flex items-center cursor-pointer shadow-md hover:shadow-lg transition-all">
                  <span className="material-icons mr-2 text-xl">account_balance</span>
                  Start Investing
                </div>
              </Link>
              <Link href="/learn">
                <div className="bg-blue-600 text-white border border-blue-300 hover:bg-blue-700 font-semibold px-6 py-3 rounded-md flex items-center cursor-pointer shadow-md hover:shadow-lg transition-all">
                  <span className="material-icons mr-2 text-xl">school</span>
                  Learn More
                </div>
              </Link>
            </div>
          </div>
          
          <div className="md:w-2/5">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 shadow-lg">
              <svg className="w-full h-auto" viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 180L120 120L180 160L260 80L350 140" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="120" cy="120" r="6" fill="#ffffff" />
                <circle cx="180" cy="160" r="6" fill="#ffffff" />
                <circle cx="260" cy="80" r="6" fill="#ffffff" />
                <circle cx="350" cy="140" r="6" fill="#ffffff" />
                <line x1="50" y1="200" x2="350" y2="200" stroke="rgba(255,255,255,0.3)" strokeWidth="2"/>
                <line x1="50" y1="50" x2="50" y2="200" stroke="rgba(255,255,255,0.3)" strokeWidth="2"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800">How FinBuddy Helps You Invest Smarter</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg p-8 shadow-sm border border-gray-100 flex flex-col items-center text-center hover-card-effect">
              <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-6">
                <span className="material-icons text-3xl">chat</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">AI-Powered Assistant</h3>
              <p className="text-gray-600">Get instant answers to all your financial questions from our intelligent AI assistant.</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-8 shadow-sm border border-gray-100 flex flex-col items-center text-center hover-card-effect">
              <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-6">
                <span className="material-icons text-3xl">analytics</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Investment Analysis</h3>
              <p className="text-gray-600">Discover the best mutual funds and investment options based on your goals.</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-8 shadow-sm border border-gray-100 flex flex-col items-center text-center hover-card-effect">
              <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-6">
                <span className="material-icons text-3xl">school</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Financial Education</h3>
              <p className="text-gray-600">Learn important financial concepts with simple explanations and practical examples.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Call to Action Section */}
      <div className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Ready to start your investment journey?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of investors who are building their financial future with FinBuddy's AI-powered guidance.
          </p>
          <Link href="/assistant">
            <div className="btn-primary inline-flex items-center py-3 px-8 text-lg mx-auto">
              <span className="material-icons mr-2">trending_up</span>
              Get Started Now
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;