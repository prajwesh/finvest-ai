import React from "react";
import { MutualFund } from "@shared/schema";

interface MutualFundCardProps {
  fund: MutualFund;
}

const MutualFundCard: React.FC<MutualFundCardProps> = ({ fund }) => {
  const getIconByCategory = (category: string) => {
    switch(category) {
      case "Large Cap":
        return { icon: "trending_up", bg: "bg-blue-100", color: "text-primary" };
      case "Mid Cap":
        return { icon: "trending_up", bg: "bg-green-100", color: "text-success" };
      case "Flexi Cap":
        return { icon: "bar_chart", bg: "bg-amber-100", color: "text-amber-600" };
      case "ELSS":
        return { icon: "savings", bg: "bg-purple-100", color: "text-purple-600" };
      case "Index":
        return { icon: "show_chart", bg: "bg-blue-100", color: "text-primary" };
      default:
        return { icon: "account_balance", bg: "bg-blue-100", color: "text-primary" };
    }
  };

  const { icon, bg, color } = getIconByCategory(fund.category);

  return (
    <div className="bg-white rounded-lg border border-neutral-200 p-3 min-w-[260px] flex-shrink-0">
      <div className="flex items-center">
        <div className={`w-10 h-10 rounded-md ${bg} flex items-center justify-center`}>
          <span className={`material-icons ${color}`}>{icon}</span>
        </div>
        <div className="ml-3">
          <h5 className="font-medium text-sm">{fund.name}</h5>
          <p className="text-xs text-neutral-500">{fund.category} • {fund.type}</p>
        </div>
      </div>
      <div className="mt-3 flex justify-between text-xs">
        <div>
          <p className="text-neutral-500">3Y Returns</p>
          <p className="font-medium text-success">{fund.returns3Y}</p>
        </div>
        <div>
          <p className="text-neutral-500">Risk</p>
          <p className="font-medium">{fund.risk}</p>
        </div>
        <div>
          <p className="text-neutral-500">Min. SIP</p>
          <p className="font-medium">₹{fund.minSIP}</p>
        </div>
      </div>
      <button className="mt-3 w-full py-1.5 text-xs bg-primary text-white rounded-md font-medium">View Details</button>
    </div>
  );
};

export default MutualFundCard;
