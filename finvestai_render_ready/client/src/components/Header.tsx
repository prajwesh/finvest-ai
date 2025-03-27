import React from "react";
import { Link } from "wouter";

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center cursor-pointer">
            <div className="bg-primary rounded-full w-9 h-9 flex items-center justify-center">
              <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 9L12 3L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 21V11H16V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h1 className="ml-2 text-xl font-bold text-neutral-800">FinBuddy</h1>
          </div>
        </Link>

        <nav className="hidden md:flex space-x-6">
          <Link href="/">
            <div className="font-medium text-gray-700 hover:text-primary transition cursor-pointer">Home</div>
          </Link>
          <Link href="/investments">
            <div className="font-medium text-gray-700 hover:text-primary transition cursor-pointer">Invest</div>
          </Link>
          <Link href="/learn">
            <div className="font-medium text-gray-700 hover:text-primary transition cursor-pointer">Learn</div>
          </Link>
          <Link href="/markets">
            <div className="font-medium text-gray-700 hover:text-primary transition cursor-pointer">Markets</div>
          </Link>
          <Link href="/tools">
            <div className="font-medium text-gray-700 hover:text-primary transition cursor-pointer">Tools</div>
          </Link>
        </nav>

        <div className="flex items-center">
          <button className="hidden md:block bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-md transition-colors">
            Sign Up
          </button>
          <button className="md:hidden p-2 text-neutral-600 hover:text-primary transition">
            <span className="material-icons">menu</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
