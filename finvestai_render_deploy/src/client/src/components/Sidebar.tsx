import React from "react";
import { Link, useLocation } from "wouter";

const Sidebar: React.FC = () => {
  const [location] = useLocation();

  const isActive = (path: string) => location === path;

  return (
    <aside className="hidden md:block w-60 p-4 bg-white border-r">
      <nav className="mt-4 space-y-1">
        <Link href="/">
          <div className={`flex items-center px-4 py-2 rounded-md ${isActive("/") ? "text-primary bg-blue-50" : "text-neutral-700 hover:bg-neutral-50"}`}>
            <span className={`material-icons mr-3 ${isActive("/") ? "text-primary" : "text-neutral-400"}`}>chat</span>
            <span className={isActive("/") ? "font-medium" : ""}>AI Assistant</span>
          </div>
        </Link>
        <Link href="/investments">
          <div className={`flex items-center px-4 py-2 rounded-md ${isActive("/investments") ? "text-primary bg-blue-50" : "text-neutral-700 hover:bg-neutral-50"}`}>
            <span className={`material-icons mr-3 ${isActive("/investments") ? "text-primary" : "text-neutral-400"}`}>trending_up</span>
            <span className={isActive("/investments") ? "font-medium" : ""}>Investments</span>
          </div>
        </Link>
        <Link href="/learn">
          <div className={`flex items-center px-4 py-2 rounded-md ${isActive("/learn") ? "text-primary bg-blue-50" : "text-neutral-700 hover:bg-neutral-50"}`}>
            <span className={`material-icons mr-3 ${isActive("/learn") ? "text-primary" : "text-neutral-400"}`}>school</span>
            <span className={isActive("/learn") ? "font-medium" : ""}>Learn</span>
          </div>
        </Link>
        <Link href="/profile">
          <div className={`flex items-center px-4 py-2 rounded-md ${isActive("/profile") ? "text-primary bg-blue-50" : "text-neutral-700 hover:bg-neutral-50"}`}>
            <span className={`material-icons mr-3 ${isActive("/profile") ? "text-primary" : "text-neutral-400"}`}>account_circle</span>
            <span className={isActive("/profile") ? "font-medium" : ""}>Profile</span>
          </div>
        </Link>
      </nav>
      
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-medium text-primary mb-2">New to investing?</h3>
        <p className="text-sm text-neutral-600">Take our beginner's course to learn the basics of investing in India.</p>
        <button className="mt-3 text-sm font-medium text-primary flex items-center">
          Start Learning
          <span className="material-icons text-sm ml-1">arrow_forward</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
