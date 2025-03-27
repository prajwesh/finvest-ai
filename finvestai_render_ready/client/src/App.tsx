import { Switch, Route, useLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import ContextPanel from "@/components/ContextPanel";
import MobileNavigation from "@/components/MobileNavigation";

import HomePage from "@/pages/home";
import AssistantPage from "@/pages/assistant";
import InvestmentsPage from "@/pages/investments";
import LearnPage from "@/pages/learn";
import ProfilePage from "@/pages/profile";

// Link to Material Icons and Google Fonts
const ExternalLinks = () => (
  <>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
  </>
);

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/assistant" component={AssistantPage} />
      <Route path="/investments" component={InvestmentsPage} />
      <Route path="/learn" component={LearnPage} />
      <Route path="/profile" component={ProfilePage} />
      <Route path="/markets" component={() => <div className="p-8 flex-1">Markets page coming soon</div>} />
      <Route path="/tools" component={() => <div className="p-8 flex-1">Tools page coming soon</div>} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [location] = useLocation();
  const isHomePage = location === "/";
  
  return (
    <QueryClientProvider client={queryClient}>
      {/* External stylesheets */}
      <ExternalLinks />
      
      <div className="min-h-screen flex flex-col bg-neutral-50 font-['Inter',sans-serif]">
        {/* Header */}
        <Header />
        
        {/* Main Content */}
        {isHomePage ? (
          <Router />
        ) : (
          <main className="flex-1 flex flex-col md:flex-row container mx-auto">
            {/* Sidebar - Only show on app pages */}
            <Sidebar />
            
            {/* Router - Content Area */}
            <Router />
            
            {/* Context Panel - Only show on app pages */}
            <ContextPanel />
          </main>
        )}
        
        {/* Mobile Navigation - Only show on app pages */}
        {!isHomePage && <MobileNavigation />}
      </div>
      
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
