import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getMutualFunds } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FUND_CATEGORIES } from "@/lib/constants";
import MutualFundCard from "@/components/Chat/MutualFundCard";

const InvestmentsPage: React.FC = () => {
  const { data: mutualFunds = [], isLoading } = useQuery({
    queryKey: ["/api/mutual-funds"],
    queryFn: getMutualFunds,
  });

  return (
    <div className="flex-1 p-4 md:p-6">
      <h1 className="text-2xl font-semibold mb-6">Investment Products</h1>
      
      <Card>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7">
            <TabsTrigger value="all">All</TabsTrigger>
            {FUND_CATEGORIES.slice(0, 6).map((category) => (
              <TabsTrigger key={category} value={category.toLowerCase().replace(/\s/g, '-')}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value="all" className="p-4">
            <h2 className="text-lg font-medium mb-4">All Investment Products</h2>
            
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-white rounded-lg border border-neutral-200 p-4 animate-pulse">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-md bg-neutral-200"></div>
                      <div className="ml-3 space-y-2">
                        <div className="h-4 bg-neutral-200 rounded w-36"></div>
                        <div className="h-3 bg-neutral-200 rounded w-24"></div>
                      </div>
                    </div>
                    <div className="mt-3 flex justify-between">
                      <div className="space-y-2">
                        <div className="h-3 bg-neutral-200 rounded w-16"></div>
                        <div className="h-3 bg-neutral-200 rounded w-12"></div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-3 bg-neutral-200 rounded w-16"></div>
                        <div className="h-3 bg-neutral-200 rounded w-12"></div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-3 bg-neutral-200 rounded w-16"></div>
                        <div className="h-3 bg-neutral-200 rounded w-12"></div>
                      </div>
                    </div>
                    <div className="mt-3 h-8 bg-neutral-200 rounded"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mutualFunds.map((fund) => (
                  <MutualFundCard key={fund.id} fund={fund} />
                ))}
              </div>
            )}
          </TabsContent>
          
          {FUND_CATEGORIES.slice(0, 6).map((category) => (
            <TabsContent key={category} value={category.toLowerCase().replace(/\s/g, '-')} className="p-4">
              <h2 className="text-lg font-medium mb-4">{category} Funds</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mutualFunds
                  .filter((fund) => fund.category === category)
                  .map((fund) => (
                    <MutualFundCard key={fund.id} fund={fund} />
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </Card>
    </div>
  );
};

export default InvestmentsPage;
