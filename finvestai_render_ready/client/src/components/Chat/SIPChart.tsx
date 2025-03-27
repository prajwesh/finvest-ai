import React, { useEffect, useState } from "react";
import { SIP_YEARS, DEFAULT_MONTHLY_AMOUNT, DEFAULT_ANNUAL_RETURN } from "@/lib/constants";
import { calculateSipReturns, shortenCurrency } from "@/lib/api";

interface SIPChartProps {
  monthlyAmount?: number;
  annualReturn?: number;
}

const SIPChart: React.FC<SIPChartProps> = ({ 
  monthlyAmount = DEFAULT_MONTHLY_AMOUNT, 
  annualReturn = DEFAULT_ANNUAL_RETURN 
}) => {
  const [chartData, setChartData] = useState<{ year: number; value: number; height: string }[]>([]);
  const [animated, setAnimated] = useState(false);
  
  useEffect(() => {
    // Calculate SIP values for each year
    const values = SIP_YEARS.map(year => ({
      year,
      value: calculateSipReturns(monthlyAmount, annualReturn, year)
    }));
    
    // Calculate proportional heights
    const maxValue = Math.max(...values.map(item => item.value));
    const data = values.map(item => ({
      ...item,
      height: `${Math.round((item.value / maxValue) * 100)}%`
    }));
    
    setChartData(data);
    
    // Trigger animation after a short delay
    setTimeout(() => {
      setAnimated(true);
    }, 500);
  }, [monthlyAmount, annualReturn]);

  // Calculate total investment and returns
  const maxYears = Math.max(...SIP_YEARS);
  const totalInvestment = monthlyAmount * 12 * maxYears;
  const finalValue = calculateSipReturns(monthlyAmount, annualReturn, maxYears);
  const totalReturns = finalValue - totalInvestment;

  return (
    <div className="mt-5 p-4 bg-white border border-neutral-200 rounded-lg">
      <h4 className="font-medium text-neutral-800">SIP Growth Visualization</h4>
      <p className="text-xs text-neutral-500 mt-1">
        Monthly investment of ₹{monthlyAmount.toLocaleString()} at {annualReturn}% estimated annual returns
      </p>
      
      <div className="mt-3 flex items-end h-32 gap-1">
        {chartData.map((data, index) => (
          <div key={index} className="flex flex-col items-center flex-grow">
            <div 
              className={`w-full bg-primary-light rounded-t chart-bar transition-all duration-1000 ease-out`} 
              style={{ height: animated ? data.height : '0%' }}
            ></div>
            <p className="text-xs mt-1">{data.year}Y</p>
            <p className="text-xs font-medium">{shortenCurrency(data.value)}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-3 pt-3 border-t flex text-xs">
        <div className="flex-1">
          <p className="text-neutral-500">Total Investment</p>
          <p className="font-medium">{shortenCurrency(totalInvestment)}</p>
        </div>
        <div className="flex-1">
          <p className="text-neutral-500">Est. Returns</p>
          <p className="font-medium text-success">{shortenCurrency(totalReturns)}</p>
        </div>
        <div className="flex-1">
          <p className="text-neutral-500">Final Value</p>
          <p className="font-medium">{shortenCurrency(finalValue)}</p>
        </div>
      </div>
    </div>
  );
};

export default SIPChart;
