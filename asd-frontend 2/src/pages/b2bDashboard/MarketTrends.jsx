import React, { useState,useMemo,useEffect } from "react";
import {
  getDashboard,
  getTradeTrend,
  getTradeValueByType,
  getMarketSummary,
  getTopCategories,
  getGrowingCountries,
  getDecliningCountries,
  getRisingHSCodes,
  getDecliningHSCodes,
  getInsights,
  getGrowthOpportunities,
  getFilterOptions
} from '../../api/MarketTrendApi';
import {
  CalendarDays,
  Download,
  ChevronDown,
  ChevronRight,
  Sliders,
  IndianRupee,
  Package,
  TrendingUp,
  TrendingDown,
  Globe2,
  Sparkles,
  BarChart3,
  ClipboardList,
  Box,
  Info,
  Tag,
  HelpCircle,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import ReactCountryFlag from "react-country-flag";
const countryCodes = {
  India: "IN",
  USA: "US",
  Germany: "DE",
  UAE: "AE",
  China: "CN",
  Japan: "JP",
  Singapore: "SG",
  France: "FR",
  UK: "GB",
};
const TABS = ["Overview", "Product Trends", "Country Trends", "HS Code Trends", "Rising Opportunities", "Price Trends", "Trends & Insights"];

/*const TREND_DATA = [
  { date: "01 Apr", thisMonth: 600, lastMonth: 500 },
  { date: "06 Apr", thisMonth: 780, lastMonth: 540 },
  { date: "11 Apr", thisMonth: 700, lastMonth: 570 },
  { date: "16 Apr", thisMonth: 880, lastMonth: 620 },
  { date: "21 Apr", thisMonth: 830, lastMonth: 680 },
  { date: "24 Apr", thisMonth: 950, lastMonth: 720 },
];

const TYPE_DATA = [
  { name: "Import", value: 625.35, color: "#10B981" },
  { name: "Export", value: 620.45, color: "#2563EB" },
];

const SUMMARY_INSIGHTS = [
  { icon: BarChart3, bg: "bg-emerald-50", color: "text-emerald-600", text: "Electronics & Electrical category is the top growing sector with 28.4% growth." },
  { icon: Globe2, bg: "bg-blue-50", color: "text-blue-600", text: "USA, UAE and Germany are the top growing markets." },
  { icon: ClipboardList, bg: "bg-purple-50", color: "text-purple-600", text: "HS Code 8542 (Integrated Circuits) shows highest growth of 34.6%." },
  { icon: Box, bg: "bg-orange-50", color: "text-orange-600", text: "Average shipment value increased by 9.8% compared to last month." },
];

const TOP_GROWING_CATEGORIES = [
  { name: "Electronics & Electrical", value: "₹185.45 Cr", growth: "28.4%" },
  { name: "Machinery & Parts", value: "₹142.36 Cr", growth: "22.1%" },
  { name: "Pharmaceuticals", value: "₹98.75 Cr", growth: "18.7%" },
  { name: "Automotive Parts", value: "₹76.30 Cr", growth: "17.3%" },
  { name: "Organic Chemicals", value: "₹65.40 Cr", growth: "15.6%" },
];

const TOP_GROWING_COUNTRIES = [
  { name: "USA", flag: "US", value: "₹185.45 Cr", growth: "32.6%" },
  { name: "UAE", flag: "AE", value: "₹96.30 Cr", growth: "24.7%" },
  { name: "Germany", flag: "DE", value: "₹74.20 Cr", growth: "21.5%" },
  { name: "India", flag: "IN", value: "₹79.45 Cr", growth: "18.9%" },
  { name: "Netherlands", flag: "NL", value: "₹52.18 Cr", growth: "15.8%" },
];

const TOP_DECLINING_COUNTRIES = [
  { name: "China", flag: "CN", value: "₹63.45 Cr", decline: "-12.4%" },
  { name: "UK", flag: "GB", value: "₹38.20 Cr", decline: "-9.6%" },
  { name: "Japan", flag: "JP", value: "₹26.10 Cr", decline: "-7.8%" },
  { name: "Russia", flag: "RU", value: "₹18.35 Cr", decline: "-6.4%" },
  { name: "South Korea", flag: "KR", value: "₹14.80 Cr", decline: "-5.7%" },
];

const TOP_RISING_HS = [
  { code: "8542", desc: "Integrated Circuits", growth: "34.6%" },
  { code: "8504", desc: "Electric Transformers", growth: "29.8%" },
  { code: "8528", desc: "Monitors & Projectors", growth: "26.3%" },
  { code: "8471", desc: "Auto Data Processing Units", growth: "24.5%" },
  { code: "8708", desc: "Parts of Motor Vehicles", growth: "21.6%" },
];

const TOP_DECLINING_HS = [
  { code: "7210", desc: "Flat Rolled Products", decline: "-11.3%" },
  { code: "5201", desc: "Cotton (Not Carded)", decline: "-8.7%" },
  { code: "1001", desc: "Wheat", decline: "-7.1%" },
  { code: "4703", desc: "Wood Pulp", decline: "-6.2%" },
  { code: "1511", desc: "Palm Oil", decline: "-5.5%" },
];

const INSIGHTS = [
  { icon: Info, text: "Global trade value increased by 16.6% compared to last month." },
  { icon: BarChart3, text: "Electronics & Electrical and Machinery & Parts are showing strong growth." },
  { icon: Globe2, text: "USA and UAE are the fastest growing markets this month." },
  { icon: Tag, text: "HS Code 8542 (Integrated Circuits) shows highest growth in trade value." },
  { icon: Box, text: "Average shipment value increased by 9.8% compared to last month." },
];

const OPPORTUNITIES = [
  { code: "8542", desc: "Integrated Circuits", markets: "USA, UAE, Germany", value: "₹125.45 Cr", growth: "34.6%", score: 95 },
  { code: "8504", desc: "Electric Transformers", markets: "India, USA, Bangladesh", value: "₹76.32 Cr", growth: "29.8%", score: 92 },
  { code: "8528", desc: "Monitors & Projectors", markets: "UAE, Saudi Arabia, Germany", value: "₹48.75 Cr", growth: "26.3%", score: 90 },
  { code: "8471", desc: "Auto Data Processing Units", markets: "USA, Netherlands, UK", value: "₹64.20 Cr", growth: "24.5%", score: 87 },
  { code: "8708", desc: "Parts of Motor Vehicles", markets: "Mexico, Brazil, UAE", value: "₹58.10 Cr", growth: "21.6%", score: 85 },
]*/

function SectionCard({ children, className = "" }) {
  return (
    <div className={`bg-white border border-slate-100 rounded-2xl p-4 shadow-xs ${className}`}>
      {children}
    </div>
  );
}

function ViewAllHeader({ title }) {
  return (
    <div className="flex justify-between items-center mb-3">
      <h3 className="font-bold text-sm text-[#07156B]">{title}</h3>
      <button className="text-blue-600 text-[11px] font-bold shrink-0">View All</button>
    </div>
  );
}

export default function MarketTrendsDashboard() {

  const [dashboard, setDashboard] = useState({});
  const [tradeTrend, setTradeTrend] = useState([]);
  const [tradeValueByType, setTradeValueByType] = useState([]);
  const [marketSummary, setMarketSummary] = useState({});
  const [topCategories, setTopCategories] = useState([]);
  const [growingCountries, setGrowingCountries] = useState([]);
  const [decliningCountries, setDecliningCountries] = useState([]);
  const [risingHSCodes, setRisingHSCodes] = useState([]);
  const [decliningHSCodes, setDecliningHSCodes] = useState([]);
  const [insights, setInsights] = useState([]);
  const [growthOpportunities, setGrowthOpportunities] = useState([]);
  const [filterOptions, setFilterOptions] = useState({});

  const [activeTab, setActiveTab] = useState("Overview");
  const [filters, setFilters] = useState({
  tradeType: "All",
  country: "All",
  product: "All",
  hsCode: "All",
  timePeriod: "This Month",
  compareWith: "Last Month",
});

const [appliedFilters, setAppliedFilters] = useState({
  tradeType: "All",
  country: "All",
  product: "All",
  hsCode: "All",
  timePeriod: "This Month",
  compareWith: "Last Month",
});
  const totalTypeValue = TYPE_DATA.reduce((a, b) => a + b.value, 0).toFixed(2);

  const fetchDashboard = async () => {
  try {
    const res = await getDashboard();
    setDashboard(res.data.data || {});
  } catch (err) {
    console.log(err);
  }
};

const fetchTradeTrend = async () => {
  try {
    const res = await getTradeTrend();
    setTradeTrend(res.data.data || []);
  } catch (err) {
    console.log(err);
  }
};

const fetchTradeValueByType = async () => {
  try {
    const res = await getTradeValueByType();
    setTradeValueByType(res.data.data || []);
  } catch (err) {
    console.log(err);
  }
};

const fetchMarketSummary = async () => {
  try {
    const res = await getMarketSummary();
    setMarketSummary(res.data.data || {});
  } catch (err) {
    console.log(err);
  }
};

const fetchTopCategories = async () => {
  try {
    const res = await getTopCategories();
    setTopCategories(res.data.data || []);
  } catch (err) {
    console.log(err);
  }
};

const fetchGrowingCountries = async () => {
  try {
    const res = await getGrowingCountries();
    setGrowingCountries(res.data.data || []);
  } catch (err) {
    console.log(err);
  }
};

const fetchDecliningCountries = async () => {
  try {
    const res = await getDecliningCountries();
    setDecliningCountries(res.data.data || []);
  } catch (err) {
    console.log(err);
  }
};

const fetchRisingHSCodes = async () => {
  try {
    const res = await getRisingHSCodes();
    setRisingHSCodes(res.data.data || []);
  } catch (err) {
    console.log(err);
  }
};

const fetchDecliningHSCodes = async () => {
  try {
    const res = await getDecliningHSCodes();
    setDecliningHSCodes(res.data.data || []);
  } catch (err) {
    console.log(err);
  }
};

const fetchInsights = async () => {
  try {
    const res = await getInsights();
    setInsights(res.data.data || []);
  } catch (err) {
    console.log(err);
  }
};

const fetchGrowthOpportunities = async () => {
  try {
    const res = await getGrowthOpportunities();
    setGrowthOpportunities(res.data.data || []);
  } catch (err) {
    console.log(err);
  }
};

const fetchFilterOptions = async () => {
  try {
    const res = await getFilterOptions();
    setFilterOptions(res.data.data || {});
  } catch (err) {
    console.log(err);
  }
};

useEffect(() => {
  fetchDashboard();
  fetchTradeTrend();
  fetchTradeValueByType();
  fetchMarketSummary();
  fetchTopCategories();
  fetchGrowingCountries();
  fetchDecliningCountries();
  fetchRisingHSCodes();
  fetchDecliningHSCodes();
  fetchInsights();
  fetchGrowthOpportunities();
  fetchFilterOptions();
}, []);

const handleApplyFilters = () => {
  setAppliedFilters(filters);
};
const handleResetFilters = () => {
  const reset = {
    tradeType: "All",
    country: "All",
    product: "All",
    hsCode: "All",
    timePeriod: "This Month",
    compareWith: "Last Month",
  };

  setFilters(reset);
  setAppliedFilters(reset);
};
  const KPI_STATS = [
  { title: "Total Trade Value (INR)", value: `₹${((dashboard.tradeValue || 0) / 10000000).toFixed(2)} Cr`, change: "", icon: IndianRupee, bg: "bg-teal-50", color: "text-teal-600", up: true },
  { title: "Total Shipments", value: (dashboard.shipments || 0).toLocaleString(), change: "", icon: Package, bg: "bg-slate-100", color: "text-slate-500", up: true },
  { title: "Growing HS Codes", value: (dashboard.growingHSCodes || 0).toLocaleString(), change: "", icon: TrendingUp, bg: "bg-teal-50", color: "text-teal-600", up: true },
  { title: "Declining HS Codes", value: (dashboard.decliningHSCodes || 0).toLocaleString(), change: "", icon: TrendingDown, bg: "bg-rose-50", color: "text-rose-500", up: false },
  { title: "New Markets Entered", value: (dashboard.newMarkets || 0).toLocaleString(), change: "", icon: Globe2, bg: "bg-purple-50", color: "text-purple-500", up: true },
  { title: "High Growth Products", value: (dashboard.highGrowthProducts || 0).toLocaleString(), change: "", icon: Sparkles, bg: "bg-orange-50", color: "text-orange-500", up: true },
];

  return (
    <div className="overflow-y-auto w-full bg-[#F8FAFC] text-slate-600 font-sans antialiased pt-5 ">
      <div className="max-w-[1400px] mx-auto p-3 sm:p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">Market Trends</h1>
            <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">
              Track market movements, identify emerging opportunities and stay ahead of global trade trends.
            </p>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border border-slate-200 text-[11px] sm:text-xs font-semibold px-3 sm:px-4 py-2 rounded-xl text-slate-700 shadow-xs hover:bg-slate-50 transition whitespace-nowrap">
              <CalendarDays size={14} className="text-slate-400" />
              01 Apr 2025 - 24 Apr 2025
            </button>
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-[11px] sm:text-xs font-semibold px-3 sm:px-4 py-2 rounded-xl text-white shadow-xs transition whitespace-nowrap">
              <Download size={14} />
              Export Report
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-5">
          {KPI_STATS.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-100 p-3 sm:p-3.5 rounded-2xl shadow-xs flex flex-col justify-between hover:shadow-md transition duration-200"
              >
                <div className="flex justify-between items-start gap-2">
                  <span className="text-[10px] sm:text-[11px] font-semibold text-[#07156B] leading-tight">
                    {stat.title}
                  </span>
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${stat.bg} ${stat.color}`}>
                    <Icon size={14} />
                  </div>
                </div>
                <div className="mt-2.5">
                  <h4 className="text-sm sm:text-base font-extrabold text-slate-800 tracking-tight">
                    {stat.value}
                  </h4>
                  <span className={`text-[9px] font-bold block mt-0.5 ${stat.up ? "text-green-500" : "text-rose-500"}`}>
                    {stat.change}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <SectionCard className="mb-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-3 items-end">
            <div>
              <label className="text-[10px] text-[#07156B] font-bold block mb-1.5 uppercase">Time Period</label>
              <div className="relative">
                <select value={filters.timePeriod}  onChange={(e) => setFilters({...filters,timePeriod: e.target.value,})} className="w-full bg-slate-50/70 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs appearance-none focus:outline-none">
                  <option value="This Month">This Month</option>
                  {filterOptions.periods?.map((period) => (
                    <option key={period} value={period}>{period}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="text-[10px] text-[#07156B] font-bold block mb-1.5 uppercase">Compare With</label>
              <div className="relative">
                <select value={filters.compareWith} onChange={(e) => setFilters({...filters,compareWith: e.target.value,})} className="w-full bg-slate-50/70 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs appearance-none focus:outline-none">
                  <option value="Last Month">Last Month</option>
                  {filterOptions.compareWith?.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="text-[10px] text-[#07156B] font-bold block mb-1.5 uppercase">Trade Type</label>
              <div className="relative">
                <select value={filters.tradeType} onChange={(e) => setFilters({...filters,tradeType: e.target.value,})} className="w-full bg-slate-50/70 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs appearance-none focus:outline-none">
                  <option value="All">All ( Import/Export)</option>
                  {filterOptions.tradeTypes?.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="text-[10px] text-[#07156B] font-bold block mb-1.5 uppercase">Country</label>
              <div className="relative">
                <select value={filters.country} onChange={(e) =setFilters({...filters,country: e.target.value,})} className="w-full bg-slate-50/70 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs appearance-none focus:outline-none">
                  <option value="All">All Countries</option>
                  {filterOptions.countries?.map((country) => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="text-[10px] text-[#07156B] font-bold block mb-1.5 uppercase">Products</label>
              <div className="relative">
                <select  value={filters.product} onChange={(e) => setFilters({...filters,product: e.target.value,})} className="w-full bg-slate-50/70 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs appearance-none focus:outline-none">
                  <option value="All">All Products</option>
                  {filterOptions.products?.map((product) => (
                    <option key={product} value={product}>{product}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="text-[10px] text-[#07156B] font-bold block mb-1.5 uppercase">HS Codes</label>
              <div className="relative">
                <select value={filters.hsCode} onChange={(e) => setFilters({...filters,hsCode: e.target.value,})} className="w-full bg-slate-50/70 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs appearance-none focus:outline-none">
                  <option value="All">All HS Codes</option>
                  {filterOptions.hsCodes?.map((item) => (
                    <option key={item._id} value={item._id}>{item.hsCode} - {item.description}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <div className="flex gap-2">
              {/* <button className="flex items-center justify-center gap-1.5 bg-slate-50/80 border border-slate-200 text-slate-600 rounded-xl py-2 px-3 text-xs font-semibold hover:bg-slate-100 transition whitespace-nowrap">
                <Sliders size={13} className="text-slate-400" /> More Filters
              </button> */}
         <button  onClick={handleApplyFilters} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl py-2 px-3 transition shadow-xs whitespace-nowrap">
                Apply Filters
              </button>
              <button  onClick={handleResetFilters} className="text-slate-400 hover:text-slate-600 text-xs font-medium px-1 whitespace-nowrap">
                Reset
              </button>
            </div>
          </div>
        </SectionCard>

        <div className="border-b border-slate-200 mb-5">
          <div className="flex gap-5 sm:gap-7 overflow-x-auto scrollbar-none">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2.5 text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors relative ${
                  activeTab === tab ? "text-blue-600" : "text-[#07156B] "
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-600 rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="border-2 border-blue-500 rounded-2xl p-4 mb-5 bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
            <div className="lg:pr-4 lg:border-r border-slate-100">
              <h3 className="font-bold text-sm text-[#07156B] mb-1">Trade Value Trend (INR)</h3>
              <div className="mb-2">
                <span className="text-lg font-black text-slate-800">₹{(tradeTrend.reduce((sum, item) => sum + (item.tradeValue || 0), 0) / 10000000).toFixed(2)} Cr</span>
                <span className="text-[10px] text-green-500 font-bold ml-2">↑ Updated</span>
              </div>
              <div className="h-[160px] w-full -ml-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={tradeTrend} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
                    <CartesianGrid stroke="#F1F5F9" vertical={false} />
                    <XAxis dataKey="_id" tick={{ fill: "#94a3b8", fontSize: 9 }} tickLine={false} axisLine={false} />
                    <YAxis tick={{ fill: "#94a3b8", fontSize: 9 }} tickLine={false} axisLine={false} width={28} />
                    <Tooltip formatter={(value) => [`₹${(value / 10000000).toFixed(2)} Cr`,"Trade Value",]}labelFormatter={(label) => `Date: ${label}`}/>
                    <Line type="monotone" dataKey="tradeValue" stroke="#10B981" strokeWidth={2} dot={{ fill: "#10B981", r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="bg-emerald-50/60 border border-emerald-100 rounded-xl p-2">
                  <span className="text-[9px] text-slate-500 font-semibold block">This Month</span>
                  <span className="text-xs font-bold text-slate-800">₹{(tradeTrend.reduce((sum, item) => sum + (item.tradeValue || 0), 0) / 10000000).toFixed(2)} Cr</span>
                </div>
                <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-2">
                  <span className="text-[9px] text-slate-500 font-semibold block">Last Month</span>
                  <span className="text-xs font-bold text-slate-800">₹{(tradeTrend.reduce((sum, item) => sum + (item.tradeValue || 0), 0) / 10000000).toFixed(2)} Cr</span>
                </div>
              </div>
            </div>

            <div className="lg:pr-4 lg:border-r border-slate-100">
              <h3 className="font-bold text-sm text-[#07156B] mb-3">Trade Value by Type</h3>
              <div className="relative w-[140px] h-[140px] mx-auto">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={tradeValueByType} innerRadius={45} outerRadius={65} dataKey="tradeValue" stroke="none">
                      {tradeValueByType.map((entry, index) => (
                        <Cell key={index} fill={entry.tradeType === "Export" ? "#10B981" : "#2563EB"} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-[8px] text-slate-400 font-bold uppercase leading-none">Total Value</span>
                  <span className="font-black text-[12px] text-slate-800 mt-1">₹{(tradeValueByType.reduce((sum, item) => sum + item.tradeValue, 0) / 10000000).toFixed(2)}{" "}Cr</span>
                </div>
              </div>
              <div className="space-y-1.5 mt-4 text-[11px]">
                {tradeValueByType.map((t, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor:  t.tradeType === "Export" ? "#10B981" : "#2563EB" }} />
                      <span className="text-slate-600 font-semibold">{t.tradeType}</span>
                    </div>
                    <span className="text-slate-700 font-bold">
                      ₹{(t.tradeValue / 10000000).toFixed(2)} Cr ({t.percentage}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:pr-4 lg:border-r border-slate-100">
              <h3 className="font-bold text-sm text-[#07156B] mb-3">Market Trend Summary</h3>
              <div className="space-y-2.5">
                {/* Top Category */}
    {marketSummary.topCategory && (
      <div className="flex items-center gap-2.5 border border-slate-100 rounded-xl p-2.5">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-emerald-50 text-emerald-600">
          <BarChart3 size={15} />
        </div>

        <p className="text-[11px] text-[#07156B] font-medium leading-snug flex-1">
          {marketSummary.topCategory.topProduct || "N/A"} category
          is the top growing sector with{" "}
          {marketSummary.topCategory.growth || 0}% growth.
        </p>

        <ChevronRight size={14} className="text-slate-300 shrink-0" />
      </div>
    )}

    {/* Top Country */}
    {marketSummary.topCountry && (
      <div className="flex items-center gap-2.5 border border-slate-100 rounded-xl p-2.5">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-blue-50 text-blue-600">
          <Globe2 size={15} />
        </div>

        <p className="text-[11px] text-[#07156B] font-medium leading-snug flex-1">
          {marketSummary.topCountry.toCountry || "N/A"} is the top
          market with trade value of ₹
          {((marketSummary.topCountry.tradeValue || 0) / 10000000).toFixed(2)} Cr.
        </p>

        <ChevronRight size={14} className="text-slate-300 shrink-0" />
      </div>
    )}

    {/* Top HS Code */}
    {marketSummary.topHS && (
      <div className="flex items-center gap-2.5 border border-slate-100 rounded-xl p-2.5">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-purple-50 text-purple-600">
          <ClipboardList size={15} />
        </div>

        <p className="text-[11px] text-[#07156B] font-medium leading-snug flex-1">
          HS Code {marketSummary.topHS.hsCode || "-"}{" "}
          {marketSummary.topHS.description
            ? `(${marketSummary.topHS.description})`
            : ""}{" "}
          is currently active.
        </p>

        <ChevronRight size={14} className="text-slate-300 shrink-0" />
      </div>
    )}

              </div>
            </div>

            <div>
              <ViewAllHeader title="Top Growing Categories" />
              <table className="w-full text-[11px]">
                <thead>
                  <tr className="text-[9px] text-[#07156B] uppercase font-bold">
                    <th className="text-left  text-[#07156B] pb-2 font-bold">Category</th>
                    <th className="text-left text-[#07156B] pb-2 font-bold">TradeValue (INR)</th>
                    <th className="text-right text-[#07156B] pb-2 font-bold">Growth</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {topCategories.map((c, i) => (
                    <tr key={i}>
                      <td className="py-2.5 font-semibold text-[#07156B]">{c._id || "N/A"}</td>
                      <td className="py-2.5 font-bold text-[#07156B] whitespace-nowrap">₹{((c.tradeValue || 0) / 10000000).toFixed(2)} Cr</td>
                      <td className="py-2.5 text-right font-bold text-emerald-500 whitespace-nowrap">▲ {Number(c.growth || 0).toFixed(1)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-5">
          <SectionCard>
            <ViewAllHeader title="Top Growing Countries" />
            <table className="w-full text-[11px]">
              <thead>
                <tr className="text-[9px] text-slate-400 uppercase font-bold">
                  <th className="text-left text-[#07156B] pb-2 font-bold">Country</th>
                  <th className="text-left text-[#07156B] pb-2 font-bold">Trade Value</th>
                  <th className="text-right text-[#07156B] pb-2 font-bold">Growth</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {growingCountries.map((c, i) => (
                  <tr key={i}>
                    <td className="py-2.5 font-semibold text-slate-700 whitespace-nowrap">
                      <ReactCountryFlag countryCode={countryCodes[c._id]}  svg style={{ width: "14px", height: "14px" }} />{c._id || "N/A"}</td>
                    <td className="py-2.5 font-bold text-[#07156B] whitespace-nowrap">₹{((c.tradeValue || 0) / 10000000).toFixed(2)} Cr</td>
                    <td className="py-2.5 text-right font-bold text-emerald-500 whitespace-nowrap">▲ {Number(c.growth || 0).toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </SectionCard>

          <SectionCard>
            <ViewAllHeader title="Top Declining Countries" />
            <table className="w-full text-[11px]">
              <thead>
                <tr className="text-[9px] text-[#07156B] uppercase font-bold">
                  <th className="text-left  text-[#07156B] pb-2 font-bold">Country</th>
                  <th className="text-left  text-[#07156B] pb-2 font-bold">Trade Value</th>
                  <th className="text-right  text-[#07156B] pb-2 font-bold">Decline</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {decliningCountries.map((c, i) => (
                  <tr key={i}>
                    <td className="py-2.5 font-semibold text-slate-700 whitespace-nowrap">
                   <ReactCountryFlag countryCode={countryCodes[c._id]} svg style={{ width: "14px", height: "14px" }} />{c._id || "N/A"}</td>
                    <td className="py-2.5 font-bold text-[#07156B] whitespace-nowrap">₹{((c.tradeValue || 0) / 10000000).toFixed(2)} Cr</td>
                    <td className="py-2.5 text-right font-bold text-rose-500 whitespace-nowrap">▼ {Math.abs(Number(c.growth || 0)).toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </SectionCard>

          <SectionCard>
            <ViewAllHeader title="Top Rising HS Codes" />
            <table className="w-full text-[11px]">
              <thead>
                <tr className="text-[9px] text-[#07156B] uppercase font-bold">
                  <th className="text-left  text-[#07156B] pb-2 font-bold">HS Code</th>
                  <th className="text-left  text-[#07156B] pb-2 font-bold">Description</th>
                  <th className="text-right  text-[#07156B] pb-2 font-bold">Growth</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {risingHSCodes.map((c, i) => (
                  <tr key={i}>
                    <td className="py-2.5 font-semibold text-[#07156B] whitespace-nowrap">{c._id || "N/A"}</td>
                    <td className="py-2.5 text-[#07156B]">{c.description || "N/A"}</td>
                    <td className="py-2.5 text-right font-bold text-emerald-500 whitespace-nowrap"> ▲ {Number(c.growth || 0).toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </SectionCard>

          <SectionCard>
            <ViewAllHeader title="Top Declining HS Codes" />
            <table className="w-full text-[11px]">
              <thead>
                <tr className="text-[9px] text-[#07156B] uppercase font-bold">
                  <th className="text-left  text-[#07156B] pb-2 font-bold">HS Code</th>
                  <th className="text-left  text-[#07156B] pb-2 font-bold">Description</th>
                  <th className="text-right  text-[#07156B] pb-2 font-bold">Decline</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {decliningHSCodes.map((c, i) => (
                  <tr key={i}>
                    <td className="py-2.5 font-semibold text-[#07156B] whitespace-nowrap">{c._id || "N/A"}</td>
                    <td className="py-2.5 text-[#07156B]">{c.description || "N/A"}</td>
                    <td className="py-2.5 text-right font-bold text-rose-500 whitespace-nowrap">▼ ▼ {Math.abs(Number(c.growth || 0)).toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </SectionCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-4">
          <SectionCard>
            <h3 className="font-bold text-sm text-[#07156B] mb-3">Market Trend Insights</h3>
            <div className="space-y-2.5">
              {insights.map((text, i) => {
                const Icon =
                text.includes("trade value") ? TrendingUp :
                text.includes("product category") ? BarChart3 :
                text.includes("growing market") ? Globe2 :
                text.includes("HS Code") ? ClipboardList :
                TrendingUp;
                return (
                  <div key={i} className="flex items-center gap-2.5 border border-slate-100 rounded-xl p-3">
                    <Icon size={14} className="text-slate-400 shrink-0" />
                    <p className="text-[11px] text-slate-600 font-medium leading-snug">{text}</p>
                  </div>
                );
              })}
            </div>
          </SectionCard>

          <SectionCard>
            <ViewAllHeader title="High Growth Opportunities" />
            <div className="overflow-x-auto">
              <table className="w-full text-[11px] min-w-[560px]">
                <thead>
                  <tr className="text-[9px] text-[#07156B] uppercase font-bold">
                    <th className="text-left  text-[#07156B] pb-2 font-bold">HS Code</th>
                    <th className="text-left  text-[#07156B] pb-2 font-bold">Product Description</th>
                    <th className="text-left  text-[#07156B] pb-2 font-bold">Top Growing Markets</th>
                    <th className="text-right  text-[#07156B] pb-2 font-bold">Trade Value</th>
                    <th className="text-right  text-[#07156B] pb-2 font-bold">Growth</th>
                    <th className="text-right  text-[#07156B] pb-2 font-bold">Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {growthOpportunities.map((o, i) => (
                    <tr key={i}>
                      <td className="py-2.5 font-semibold text-[#07156B] whitespace-nowrap">{o.hsCode?.hsCode || "N/A"}</td>
                      <td className="py-2.5 text-[#07156B] whitespace-nowrap">{o.hsCode?.description || "N/A"}</td>
                      <td className="py-2.5 text-[#07156B] whitespace-nowrap">{o.toCountry || "N/A"}</td>
                      <td className="py-2.5 text-right font-bold text-[#07156B] whitespace-nowrap">₹{Number(o.tradeValue || 0).toFixed(2)}</td>
                      <td className="py-2.5 text-right font-bold text-emerald-500 whitespace-nowrap">{Number(o.growth || 0).toFixed(1)}</td>
                      <td className="py-2.5 text-right">
                        <span className="bg-emerald-100 text-emerald-700 font-bold text-[10px] px-2 py-0.5 rounded-full">
                          {o.score}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-t border-slate-200 pt-3 pb-2">
          <span className="flex items-center gap-1.5 text-[10px] text-slate-400 font-medium">
            <Info size={12} /> All data is updated daily. Last updated on 24 Apr 2025, 09:30 AM
          </span>
          <span className="flex items-center gap-1.5 text-[10px] text-slate-500 font-semibold cursor-pointer">
            <HelpCircle size={12} /> Help Center
          </span>
        </div>
      </div>
    </div>
  );
}