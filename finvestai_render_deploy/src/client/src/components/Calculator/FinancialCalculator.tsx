import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { formatIndianCurrency } from "@/lib/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

const FinancialCalculator: React.FC = () => {
  const [calculatorType, setCalculatorType] = useState<"sip" | "lumpsum">("sip");
  
  // SIP Calculator states
  const [sipAmount, setSipAmount] = useState<number>(5000);
  const [sipYears, setSipYears] = useState<number>(10);
  const [sipRate, setSipRate] = useState<number>(12);
  const [sipResult, setSipResult] = useState<{
    totalInvestment: number;
    wealthGained: number;
    maturityValue: number;
    chartData: any[];
  }>({
    totalInvestment: 0,
    wealthGained: 0,
    maturityValue: 0,
    chartData: [],
  });

  // Lumpsum Calculator states
  const [lumpsumAmount, setLumpsumAmount] = useState<number>(100000);
  const [lumpsumYears, setLumpsumYears] = useState<number>(5);
  const [lumpsumRate, setLumpsumRate] = useState<number>(10);
  const [lumpsumResult, setLumpsumResult] = useState<{
    totalInvestment: number;
    wealthGained: number;
    maturityValue: number;
    chartData: any[];
  }>({
    totalInvestment: 0,
    wealthGained: 0,
    maturityValue: 0,
    chartData: [],
  });

  // Handle SIP calculations
  useEffect(() => {
    calculateSIP(sipAmount, sipYears, sipRate);
  }, [sipAmount, sipYears, sipRate]);

  // Handle Lumpsum calculations
  useEffect(() => {
    calculateLumpsum(lumpsumAmount, lumpsumYears, lumpsumRate);
  }, [lumpsumAmount, lumpsumYears, lumpsumRate]);

  const calculateSIP = (amount: number, years: number, rate: number) => {
    const months = years * 12;
    const monthlyRate = rate / 12 / 100;
    const maturityValue = amount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    const totalInvestment = amount * months;
    const wealthGained = maturityValue - totalInvestment;

    // Generate chart data
    const chartData = [];
    let runningTotal = 0;

    for (let year = 0; year <= years; year++) {
      const yearMonths = year * 12;
      if (year === 0) {
        chartData.push({
          year: 0,
          investment: 0,
          expectedReturns: 0,
        });
        continue;
      }

      const yearMaturityValue = amount * ((Math.pow(1 + monthlyRate, yearMonths) - 1) / monthlyRate) * (1 + monthlyRate);
      const yearInvestment = amount * yearMonths;
      const yearReturns = yearMaturityValue - yearInvestment;

      chartData.push({
        year,
        investment: Math.round(yearInvestment),
        expectedReturns: Math.round(yearReturns),
      });
    }

    setSipResult({
      totalInvestment,
      wealthGained,
      maturityValue,
      chartData,
    });
  };

  const calculateLumpsum = (amount: number, years: number, rate: number) => {
    const maturityValue = amount * Math.pow(1 + rate / 100, years);
    const totalInvestment = amount;
    const wealthGained = maturityValue - totalInvestment;

    // Generate chart data
    const chartData = [];
    for (let year = 0; year <= years; year++) {
      const yearValue = amount * Math.pow(1 + rate / 100, year);
      const yearReturns = yearValue - amount;

      chartData.push({
        year,
        investment: amount,
        expectedReturns: Math.round(yearReturns),
      });
    }

    setLumpsumResult({
      totalInvestment,
      wealthGained,
      maturityValue,
      chartData,
    });
  };

  const handleSipAmountChange = (value: number[]) => {
    setSipAmount(value[0]);
  };

  const handleSipYearsChange = (value: number[]) => {
    setSipYears(value[0]);
  };

  const handleSipRateChange = (value: number[]) => {
    setSipRate(value[0]);
  };

  const handleLumpsumAmountChange = (value: number[]) => {
    setLumpsumAmount(value[0]);
  };

  const handleLumpsumYearsChange = (value: number[]) => {
    setLumpsumYears(value[0]);
  };

  const handleLumpsumRateChange = (value: number[]) => {
    setLumpsumRate(value[0]);
  };

  const formatTooltipValue = (value: number) => {
    return formatIndianCurrency(value);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-5 bg-gradient-to-r from-blue-600 to-blue-500 text-white">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <span className="material-icons">calculate</span>
          Investment Calculator
        </h2>
        <p className="text-blue-50 text-sm mt-1">
          Plan your investments and see how your money can grow over time
        </p>
      </div>

      <div className="p-5">
        <Tabs defaultValue="sip" className="w-full" onValueChange={(value) => setCalculatorType(value as "sip" | "lumpsum")}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="sip">SIP Calculator</TabsTrigger>
            <TabsTrigger value="lumpsum">Lumpsum Calculator</TabsTrigger>
          </TabsList>

          <TabsContent value="sip" className="space-y-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <Label>Monthly Investment (₹)</Label>
                  <div className="text-right">
                    <span className="text-lg font-medium text-primary">₹{sipAmount.toLocaleString()}</span>
                  </div>
                </div>
                <Slider
                  value={[sipAmount]}
                  min={500}
                  max={100000}
                  step={500}
                  onValueChange={handleSipAmountChange}
                  className="mb-6"
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <Label>Investment Period</Label>
                  <div className="text-right">
                    <span className="text-lg font-medium text-primary">{sipYears} years</span>
                  </div>
                </div>
                <Slider
                  value={[sipYears]}
                  min={1}
                  max={30}
                  step={1}
                  onValueChange={handleSipYearsChange}
                  className="mb-6"
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <Label>Expected Annual Return (%)</Label>
                  <div className="text-right">
                    <span className="text-lg font-medium text-primary">{sipRate}%</span>
                  </div>
                </div>
                <Slider
                  value={[sipRate]}
                  min={1}
                  max={30}
                  step={0.5}
                  onValueChange={handleSipRateChange}
                  className="mb-6"
                />
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Invested Amount</p>
                  <p className="text-lg font-semibold">
                    ₹{formatIndianCurrency(sipResult.totalInvestment)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Estimated Returns</p>
                  <p className="text-lg font-semibold text-green-600">
                    ₹{formatIndianCurrency(sipResult.wealthGained)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Value</p>
                  <p className="text-lg font-semibold text-primary">
                    ₹{formatIndianCurrency(sipResult.maturityValue)}
                  </p>
                </div>
              </div>

              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={sipResult.chartData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" label={{ value: 'Years', position: 'insideBottomRight', offset: -5 }} />
                    <YAxis tickFormatter={(value) => `₹${value.toLocaleString()}`} />
                    <Tooltip formatter={formatTooltipValue} />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="investment"
                      stackId="1"
                      stroke="#8884d8"
                      fill="#8884d8"
                      name="Invested Amount"
                    />
                    <Area
                      type="monotone"
                      dataKey="expectedReturns"
                      stackId="1"
                      stroke="#82ca9d"
                      fill="#82ca9d"
                      name="Expected Returns"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="lumpsum" className="space-y-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <Label>One-time Investment (₹)</Label>
                  <div className="text-right">
                    <span className="text-lg font-medium text-primary">₹{lumpsumAmount.toLocaleString()}</span>
                  </div>
                </div>
                <Slider
                  value={[lumpsumAmount]}
                  min={1000}
                  max={5000000}
                  step={1000}
                  onValueChange={handleLumpsumAmountChange}
                  className="mb-6"
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <Label>Investment Period</Label>
                  <div className="text-right">
                    <span className="text-lg font-medium text-primary">{lumpsumYears} years</span>
                  </div>
                </div>
                <Slider
                  value={[lumpsumYears]}
                  min={1}
                  max={30}
                  step={1}
                  onValueChange={handleLumpsumYearsChange}
                  className="mb-6"
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <Label>Expected Annual Return (%)</Label>
                  <div className="text-right">
                    <span className="text-lg font-medium text-primary">{lumpsumRate}%</span>
                  </div>
                </div>
                <Slider
                  value={[lumpsumRate]}
                  min={1}
                  max={30}
                  step={0.5}
                  onValueChange={handleLumpsumRateChange}
                  className="mb-6"
                />
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Invested Amount</p>
                  <p className="text-lg font-semibold">
                    ₹{formatIndianCurrency(lumpsumResult.totalInvestment)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Estimated Returns</p>
                  <p className="text-lg font-semibold text-green-600">
                    ₹{formatIndianCurrency(lumpsumResult.wealthGained)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Value</p>
                  <p className="text-lg font-semibold text-primary">
                    ₹{formatIndianCurrency(lumpsumResult.maturityValue)}
                  </p>
                </div>
              </div>

              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={lumpsumResult.chartData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" label={{ value: 'Years', position: 'insideBottomRight', offset: -5 }} />
                    <YAxis tickFormatter={(value) => `₹${value.toLocaleString()}`} />
                    <Tooltip formatter={formatTooltipValue} />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="investment"
                      stackId="1"
                      stroke="#8884d8"
                      fill="#8884d8"
                      name="Invested Amount"
                    />
                    <Area
                      type="monotone"
                      dataKey="expectedReturns"
                      stackId="1"
                      stroke="#82ca9d"
                      fill="#82ca9d"
                      name="Expected Returns"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FinancialCalculator;