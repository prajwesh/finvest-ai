import React from "react";
import { Link, useLocation } from "wouter";

const MobileNavigation: React.FC = () => {
  const [location] = useLocation();

  const isActive = (path: string) => location === path;

  return (
    <nav className="md:hidden bg-white border-t flex justify-between px-2">
      <Link href="/">
        <div className={`flex flex-col items-center py-2 px-4 ${isActive("/") ? "text-primary" : "text-neutral-400"}`}>
          <span className="material-icons">chat</span>
          <span className="text-xs mt-1">Assistant</span>
        </div>
      </Link>
      <Link href="/investments">
        <div className={`flex flex-col items-center py-2 px-4 ${isActive("/investments") ? "text-primary" : "text-neutral-400"}`}>
          <span className="material-icons">trending_up</span>
          <span className="text-xs mt-1">Invest</span>
        </div>
      </Link>
      <Link href="/learn">
        <div className={`flex flex-col items-center py-2 px-4 ${isActive("/learn") ? "text-primary" : "text-neutral-400"}`}>
          <span className="material-icons">school</span>
          <span className="text-xs mt-1">Learn</span>
        </div>
      </Link>
      <Link href="/profile">
        <div className={`flex flex-col items-center py-2 px-4 ${isActive("/profile") ? "text-primary" : "text-neutral-400"}`}>
          <span className="material-icons">account_circle</span>
          <span className="text-xs mt-1">Profile</span>
        </div>
      </Link>
    </nav>
  );
};

export default MobileNavigation;
