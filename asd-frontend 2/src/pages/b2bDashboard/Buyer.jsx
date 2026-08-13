import React,{ useEffect,useState } from 'react';
import {
  getDashboard,
  getBuyersList,
  getBuyersByCountry,
  getTopBuyers,
  getPerformance,
  getTopProducts,
  getRecentActivity,
  getInsights,
  getFilterOptions
} from "../../api/BuyerApi";
import DateRangeModal from "../../components/b2bComponent/DateRange";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ExportReport from "../../components/b2bComponent/ExportReport";
import BuyerList from '../../components/b2bComponent/BuyerList';

import { 
  Users, UserPlus, Globe, BarChart3, TrendingUp, Search, ChevronDown, 
  SlidersHorizontal, LayoutGrid, Sliders, Download, Plus, MoreVertical, 
  ChevronLeft, ChevronRight, ArrowUpRight, ArrowRight, ShoppingBag, 
  RefreshCw, Eye, Truck, CheckCircle, Clock, ShieldCheck, Info, HelpCircle, CalendarDays
} from 'lucide-react';

import ReactCountryFlag from "react-country-flag";
import RecentBuyerActivityModal from '../../components/b2bComponent/RecentBuyerActivity';

export default function BuyersDashboard() {

  const [dashboardData, setDashboardData] = useState({});
  const [buyersList, setBuyersList] = useState([]);
  const [buyersByCountry, setBuyersByCountry] = useState([]);
  const [topBuyers, setTopBuyers] = useState([]);
  const [performanceData, setPerformanceData] = useState({});
  const [topProducts, setTopProducts] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [insights, setInsights] = useState({});
  const [filterOptions, setFilterOptions] = useState({});
  const [loading, setLoading] = useState(true);
  const [shipmentStartDate, setShipmentStartDate] = useState(null);
  const [shipmentEndDate, setShipmentEndDate] = useState(null);
  const [dateRange, setDateRange] = useState(false);
  const [exportReport, setExportReport] = useState(false);
   const [recentBuyer, setRecentBuyer] = useState(false)
  const [showBuyerList, setShowBuyerList] = useState(false);
  
  const fetchDashboard = async () => {
    try {
      const res = await getDashboard();
      console.log("Dashboard:", res.data);
      setDashboardData(res.data.data || {});
    } catch (err) {
       console.error(err);
      }
  };
  const fetchBuyers = async () => {
    try {
      const res = await getBuyersList();
      console.log("Buyers:", res.data);
      setBuyersList(res.data.data || []);
    } catch (err) {
       console.error(err);
      }
  };
  const fetchBuyersByCountry = async () => {
    try {
      const res = await getBuyersByCountry();
      console.log("Country:", res.data);
      setBuyersByCountry(res.data.data || []);
    } catch (err) {
       console.error(err);
      }
  };
  const fetchTopBuyers = async () => {
    try {
      const res = await getTopBuyers();
      console.log("Top Buyers:", res.data);
      setTopBuyers(res.data.data || []);
    } catch (err) {
        console.error(err);
      }
  };
  const fetchPerformance = async () => {
    try {
      const res = await getPerformance();
      console.log("Performance:", res.data);
      setPerformanceData(res.data.data || {});
    } catch (err) {
       console.error(err);
      }
  };
  const fetchTopProducts = async () => {
    try {
      const res = await getTopProducts();
      console.log("Products:", res.data);
      setTopProducts(res.data.data || []);
    } catch (err) {
        console.error(err);
      }
  };
  const fetchRecentActivity = async () => {
    try {
      const res = await getRecentActivity();
      const formattedActivity = res.data.data.map((item) => ({
        text: `${item.companyName} completed a trade`,
        time: item.lastTrade ? new Date(item.lastTrade).toLocaleDateString() : "N/A",
        bg: "bg-emerald-50",
        iconColor: "text-emerald-600",
        icon: CheckCircle
      }));
      setRecentActivity(formattedActivity);
    } catch (err) {
        console.error(err);
      }
  };
  const fetchInsights = async () => {
    try {
      const res = await getInsights();
      console.log("Insights:", res.data);
      setInsights(res.data.data || {});
    } catch (err) {
       console.error(err);
      }
  };
  const fetchFilterOptions = async () => {
    try {
      const res = await getFilterOptions();
      console.log("Filters:", res.data);
      setFilterOptions(res.data.data || {});
    } catch (err) {
        console.error(err);
      }
  };
  const stats = [
    {label: "Total Buyers", value: dashboardData.totalBuyers || 0, change: "", icon: Users, color: "text-blue-600", bg: "bg-blue-50",},
    {label: "Active Buyers", value: dashboardData.activeBuyers || 0, change: "", icon: UserPlus, color: "text-emerald-600", bg: "bg-emerald-50",},
    {label: "New Buyers", value: dashboardData.newBuyers || 0, change: "", icon: UserPlus, color: "text-indigo-600", bg: "bg-indigo-50",},
    {label: "Countries Covered", value: dashboardData.countriesCovered || 0, change: "", icon: Globe, color: "text-sky-600", bg: "bg-sky-50",},
    {label: "Total Trade Value (INR)", value: `₹${Number(dashboardData.totalTradeValue || 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2,})} Cr`, change: "", icon: BarChart3, color: "text-orange-600", bg: "bg-orange-50",},
    {label: "Avg. Buyer Growth", value: `${Number(dashboardData.averageGrowth || 0).toFixed(2)}%`, change: "", icon: TrendingUp, color: "text-blue-600", bg: "bg-blue-50",},
  ];
  const totalBuyers = dashboardData.totalBuyers || 0;
  const countryColors = ["bg-blue-500","bg-cyan-500","bg-amber-500","bg-orange-500","bg-rose-500","bg-emerald-500","bg-indigo-500",];
  const maxTradeValue = topBuyers.length > 0 ? topBuyers[0].tradeVolume : 1;
  const score = performanceData.averageScore || 0;
  const totalShipments = performanceData.totalShipments || 0;
  const averageGrowth = performanceData.averageGrowth || 0;
  const totalBuyerss = performanceData.totalBuyerss || 0;
  const colors = ["bg-blue-600","bg-emerald-600","bg-indigo-600","bg-rose-400","bg-amber-500",];
  
  useEffect(() => {
    fetchDashboard();
    fetchBuyers();
    fetchBuyersByCountry();
    fetchTopBuyers();
    fetchPerformance();
    fetchTopProducts();
    fetchRecentActivity();
    fetchInsights();
    fetchFilterOptions();
    setLoading(false);
  }, []);

  // --- MOCK DATA MATCHING IMAGE_F0C3F9.PNG EXACTLY ---
  /*const stats = [
    { label: "Total Buyers", value: "3,145", change: "▲ 14.8% vs last month", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Active Buyers", value: "2,521", change: "▲ 11.6% vs last month", icon: UserPlus, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "New Buyers", value: "268", change: "▲ 18.7% vs last month", icon: UserPlus, color: "text-indigo-600", bg: "bg-indigo-50" },
    { label: "Countries Covered", value: "92", change: "▲ 4 vs last month", icon: Globe, color: "text-sky-600", bg: "bg-sky-50" },
    { label: "Total Trade Value (INR)", value: "₹2,845.60 Cr", change: "▲ 20.4% vs last month", icon: BarChart3, color: "text-orange-600", bg: "bg-orange-50" },
    { label: "Avg. Buyer Growth", value: "12.6%", change: "▲ 2.3 pts vs last month", icon: TrendingUp, color: "text-blue-600", bg: "bg-blue-50" },
  ]*/

  /*const buyersList = [
    { name: "Amazon Europe S.à r.l.", country: "Distributor", flag: "IND", type: "Electronics, Home Appliances", tradeValue: "₹ 125.45 Cr", shipments: 124, score: 92, status: "Active" },
    { name: "Walmart Inc.", country: "Retailer", flag: "US", type: "Apparel, Footwear", tradeValue: "₹ 98.76 Cr", shipments: 96, score: 88, status: "Active" },
    { name: "Carrefour SA", country: "Retailer", flag: "IND", type: "Food Products, Beverages", tradeValue: "₹ 78.32 Cr", shipments: 78, score: 85, status: "Active" },
    { name: "Alibaba Group", country: "E-commerce", flag: "CN", type: "Electronics, Machinery", tradeValue: "₹ 64.18 Cr", shipments: 62, score: 83, status: "Active" },
    { name: "Target Corporation", country: "Retailer", flag: "US", type: "Home & Kitchen, Toys", tradeValue: "₹ 52.09 Cr", shipments: 54, score: 80, status: "Active" },
    { name: "Costco Wholesale", country: "Wholesaler", flag: "US", type: "Electronics, Furniture", tradeValue: "₹ 47.28 Cr", shipments: 49, score: 78, status: "Active" },
    { name: "Tesco PLC", country: "Retailer", flag: "IND", type: "Food Products, Personal Care", tradeValue: "₹ 36.75 Cr", shipments: 38, score: 72, status: "Active" },
    { name: "Metro AG", country: "Wholesaler", flag: "DE", type: "Machinery, Tools", tradeValue: "₹ 32.10 Cr", shipments: 34, score: 70, status: "Active" },
  ];*/

  /*const topBuyersByValue = [
    { rank: 1, name: "Amazon Europe S.à r.l.", value: "₹ 125.45 Cr", width: "w-full" },
    { rank: 2, name: "Walmart Inc.", value: "₹ 98.76 Cr", width: "w-[78%]" },
    { rank: 3, name: "Carrefour SA", value: "₹ 78.32 Cr", width: "w-[62%]" },
  ];*/

  /*const topProducts = [
    { name: "Electronics", value: "₹ 542.12 Cr", width: "w-[85%]", color: "bg-blue-600" },
    { name: "Machinery", value: "₹ 412.38 Cr", width: "w-[68%]", color: "bg-emerald-600" },
    { name: "Apparel & Clothing", value: "₹ 321.75 Cr", width: "w-[55%]", color: "bg-indigo-600" },
    { name: "Chemical Products", value: "₹ 285.40 Cr", width: "w-[48%]", color: "bg-rose-400" },
    { name: "Food & Beverages", value: "₹ 256.18 Cr", width: "w-[42%]", color: "bg-amber-500" },
  ];*/

  /*const recentActivity = [
    { text: <><strong>Amazon Europe S.à r.l.</strong> placed a new order <span className="text-blue-600 font-medium">SHP-2025-1045</span></>, time: "2h ago", icon: ShoppingBag, bg: "bg-blue-50", iconColor: "text-blue-600" },
    { text: <><strong>Walmart Inc.</strong> updated product interest in <span className="text-blue-600 font-medium">Electronics category</span></>, time: "4h ago", icon: Eye, bg: "bg-emerald-50", iconColor: "text-emerald-600" },
    { text: <><strong>Carrefour SA</strong> imported new shipment <span className="text-blue-600 font-medium">SHP-2025-1037</span></>, time: "6h ago", icon: Truck, bg: "bg-purple-50", iconColor: "text-purple-600" },
    { text: <>New buyer <strong>Delta Trading Co.</strong> from <span className="font-semibold text-slate-700">Vietnam</span> registered</>, time: "1d ago", icon: UserPlus, bg: "bg-orange-50", iconColor: "text-orange-600" },
    { text: <><strong>Metro AG</strong> increased import volume by <span className="text-emerald-600 font-bold">15%</span></>, time: "2d ago", icon: BarChart3, bg: "bg-blue-50", iconColor: "text-blue-600" },
  ];*/

 /* const insights = [
    "Electronics category has the highest demand among buyers this month.",
    "USA buyers increased their import value by 18.6% vs last month.",
    "268 new buyers added this month, 62% are from Emerging Markets.",
    "Top 10 buyers contribution is 28.7% of total trade value."
  ];
  const score = 78.6;*/
  const radius = 40;
  const circumference = Math.PI * radius; 
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="overflow-y-auto bg-[#f8fafc] text-slate-800 p-6 font-sans antialiased selection:bg-blue-100">
      
      {/* --- TOP HEADER BAR --- */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 mt-7">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Buyers</h1>
          <p className="text-xs text-slate-500 mt-0.5">Discover and analyze global buyers and their buying behavior.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative flex-1 md:flex-none">
            <DatePicker
              selected={shipmentStartDate}
              onChange={(dates) => {
                const [start, end] = dates;
                setShipmentStartDate(start);
                setShipmentEndDate(end);
              }}
              startDate={shipmentStartDate}
              endDate={shipmentEndDate}
              selectsRange
              dateFormat="dd MMM yyyy"
              placeholderText="01 Apr 2025 - 24 Apr 2025"
              className="bg-white border border-slate-200 text-[11px] sm:text-xs font-semibold pl-3 pr-9 py-1.5 rounded-xl shadow-xs hover:bg-slate-50 transition whitespace-nowrap outline-none cursor-pointer"
            />
            <CalendarDays
              size={14}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
          </div>
          <button onClick={() => setExportReport(true)} className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50">
            <Download size={14} className="text-slate-500" />
            Export Report
          </button>
          <button className="flex items-center gap-1 bg-blue-600 text-white rounded-lg px-3 py-1.5 text-xs font-semibold shadow-sm hover:bg-blue-700">
            <Plus size={14} />
            Add Buyer
          </button>
        </div>
      </div>

      {/* --- SIX STATS CARDS --- */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        {stats.map((card, idx) => (
          <div key={idx} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[10px] font-bold text-[#06155F] uppercase tracking-wide leading-tight">{card.label}</span>
              <div className={`p-1.5 rounded-lg shrink-0 ${card.bg} ${card.color}`}>
                <card.icon size={14} />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">{card.value}</h3>
             {card.change && (
               <p className="text-[10px] font-semibold text-emerald-600 mt-0.5 flex items-center gap-0.5">
                {card.change}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* --- FILTERS PANEL --- */}
      <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm mb-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 items-end">
        <div>
          <label className="text-[10px] font-bold text-[#06155F] uppercase tracking-wider block mb-1">Search Buyer</label>
          <div className="relative">
            <Search size={13} className="absolute left-2.5 top-2.5 text-slate-400" />
            <input type="text" placeholder="Search by name, Company, Cou..." className="w-full bg-[#f8fafc] pl-8 pr-2 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none placeholder:text-slate-400" />
          </div>
        </div>
        {/* Country */}
        <div>
          <label className="text-[10px] font-bold text-[#06155F] uppercase tracking-wider block mb-1">Country / Region</label>
          <select className="w-full bg-[#f8fafc] border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-600">
            <option value="">All Countries</option>
            {filterOptions.countries?.map((country, index) => (
              <option key={index} value={country}>{country}</option>
            ))}
          </select>
        </div>
        {/* Product */}
        <div>
          <label className="text-[10px] font-bold text-[#06155F] uppercase tracking-wider block mb-1">Product / HS Code</label>
          <select className="w-full bg-[#f8fafc] border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-600">
            <option value="">All Products</option>
            {filterOptions.products?.map((product, index) => (
              <option key={index} value={product}>{product}</option>
            ))}
          </select>
        </div>
        {/* Buyer Type */}
        <div>
          <label className="text-[10px] font-bold text-[#06155F] uppercase tracking-wider block mb-1">Buyer Type</label>
          <select className="w-full bg-[#f8fafc] border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-600">
            <option value="">All Type</option>
            {filterOptions.buyerTypes?.map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
         </select>
        </div>
        {/* Buyer Status */}
        <div>
          <label className="text-[10px] font-bold text-[#06155F] uppercase tracking-wider block mb-1">Buyer Status</label>
          <select className="w-full bg-[#f8fafc] border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-600">
            <option value="">All Status</option>
            {filterOptions.statuses?.map((status, index) => (
              <option key={index} value={status}>{status}</option>
            ))}
          </select>
        </div>
        <div className="flex gap-2 h-8">
          <button className="flex-1 flex items-center justify-center gap-1 bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-semibold text-slate-600 hover:bg-slate-100">
            <SlidersHorizontal size={12} /> More Filters
          </button>
          <button className="text-[11px] font-semibold text-slate-400 hover:text-slate-600 px-1">Reset</button>
        </div>
      </div>

      {/* --- MIDDLE MAIN GRID (TABLE + MAP/TOP BUYERS) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6 items-start">
        
        {/* BUYER LIST TABLE (8 COLS) */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm lg:col-span-8 overflow-hidden">
          <div className="p-4 flex items-center justify-between border-b border-slate-50">
            <h2 className="text-sm font-bold text-slate-900">Buyer List <span className="text-slate-400 font-medium">(3,145)</span></h2>
            <button className="flex items-center gap-1 text-blue-600 border border-blue-100 rounded-lg px-3 py-1 text-xs font-semibold hover:bg-blue-50/50">
              <Sliders size={12} /> Customize Columns
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#f8fafc] text-[#06155F] font-bold text-[10px] uppercase tracking-wider border-b border-slate-100">
                  <th className="p-3 pl-4 w-8"><input type="checkbox" className="rounded border-slate-300 accent-blue-600" /></th>
                  <th className="p-3 font-bold">Buyer Name</th>
                  <th className="p-3 font-bold">Country</th>
                  <th className="p-3 font-bold">Type</th>
                  <th className="p-3 font-bold">Top Products</th>
                  <th className="p-3 font-bold text-right">Trade Value (INR)</th>
                  <th className="p-3 font-bold text-center">Shipments</th>
                  <th className="p-3 font-bold text-center">Buyer Score</th>
                  <th className="p-3 font-bold text-center">Status</th>
                  <th className="p-3 pr-4 text-center font-bold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                {buyersList.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/40 transition-colors">
                    <td className="p-3 pl-4"><input type="checkbox" className="rounded border-slate-300 accent-blue-600" /></td>
                    <td className="p-3 font-medium text-[#06155F max-w-[140px] truncate">{row.companyName}</td>
                    <td className="p-3 text-[#06155F font-semibold whitespace-nowrap">
                      <span className="mr-1">
                      <ReactCountryFlag
                            countryCode={row.location?.country || "US"}
                            svg
                            style={{ width: "14px", height: "14px", }}
                          />
                     </span> {row.location?.country}</td>
                    <td className="p-3 text-[#06155F font-semibold">{row.buyerType}</td>
                    <td className="p-3 text-[#06155F font-semibold max-w-[150px] truncate">{row.products?.join(", ") || "N/A"}</td>
                    <td className="p-3 font-semibold text-[#06155F] text-right whitespace-nowrap">₹{Number(row.tradeVolume || 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || "0.00"} Cr</td>
                    <td className="p-3 text-center text-[#06155F] font-medium">{row.totalShipments}</td>
                    <td className="p-3 text-center">
                      <span className={`inline-block px-1.5 py-0.5 rounded font-bold text-[11px] ${row.buyerScore >= 85 ? 'bg-emerald-50 text-emerald-600' : 'bg-emerald-50/70 text-emerald-500'}`}>
                        {row.buyerScore}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <span className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-semibold text-[10px]">
                        {row.status}
                      </span>
                    </td>
                    <td className="p-3 pr-4 text-center">
                      <MoreVertical size={14} className="text-slate-400 mx-auto cursor-pointer hover:text-slate-600" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* PAGINATION PANEL */}
          <div className="p-3 border-t border-slate-100 bg-[#f8fafc]/50 flex items-center justify-between text-xs text-slate-500">
            <span> Showing 1 to {buyersList.length} of {dashboardData.totalBuyers || 0} buyers</span>
            <div className="flex items-center gap-1">
              <button className="p-1 rounded border bg-white hover:bg-slate-50 text-slate-400 disabled:opacity-50" disabled><ChevronLeft size={14} /></button>
              <button className="px-2.5 py-1 rounded font-semibold bg-blue-600 text-white">1</button>
              <button className="px-2.5 py-1 rounded font-semibold bg-white border hover:bg-slate-50">2</button>
              <button className="px-2.5 py-1 rounded font-semibold bg-white border hover:bg-slate-50">3</button>
              <span className="px-1 text-slate-400">...</span>
              <button className="px-2 py-1 rounded font-semibold bg-white border hover:bg-slate-50">246</button>
              <button className="p-1 rounded border bg-white hover:bg-slate-50 text-slate-600"><ChevronRight size={14} /></button>
            </div>
          </div>
        </div>

        {/* RIGHT ANALYTICS COLUMN (4 COLS) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* BUYERS BY COUNTRY MAP WIDGET */}
          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-bold text-slate-900">Buyers by Country</h3>
              <button className="text-xs font-semibold text-blue-600 cursor-pointer hover:underline" 
              onClick={() => setShowBuyerList(true)}
              >View All</button>
            </div>
   
            <div className="h-32 bg-slate-50 rounded-lg relative overflow-hidden mb-3 border border-slate-100 flex items-center justify-center">
              <span className="text-[10px] text-slate-400">Global Coverage Visualization</span>
         
              <div className="absolute right-4 top-4 w-12 h-8 bg-red-500/20 rounded-full blur-sm"></div>
              <div className="absolute left-12 top-6 w-8 h-6 bg-blue-500/20 rounded-full blur-sm"></div>
            </div>
           <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[11px] text-slate-500">
               {buyersByCountry.map((country, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${countryColors[index % countryColors.length]}`}/>{country._id}</span>
                    <span className="font-semibold text-slate-700">{country.count} ({totalBuyers ? ((country.count / totalBuyers) * 100).toFixed(1) : 0} %)
                  </span>
                </div> ))}
            </div>
          </div>

          {/* TOP BUYERS BY TRADE VALUE */}
          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-slate-900">Top Buyers by Trade Value</h3>
              <span className="text-xs font-semibold text-blue-600 cursor-pointer hover:underline" onClick={() => setRecentBuyer(true)}>View All</span>
            </div>
            <div className="space-y-4">
              {topBuyers.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="text-xs font-bold text-slate-400 mt-0.5">{idx + 1}</span>
                  <div className="flex-1">
                    <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                      <span>{item.companyName}</span>
                      <span>₹{Number(item.tradeVolume|| 0).toLocaleString("en-IN")} Cr</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-blue-600 h-full rounded-full" style={{ width: `${(item.tradeVolume / maxTradeValue) * 100}%` }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* --- BOTTOM GRID: THREE RECTANGULAR PANELS --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        
        {/* PANEL 1: BUYER PERFORMANCE OVERVIEW */}
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-slate-900">Buyer Performance Overview</h3>
              <div onClick={() => setDateRange(true)} className="flex items-center gap-1 bg-slate-50 border px-2 py-1 rounded-md text-[11px] text-slate-500 cursor-pointer">
                <span>This Month</span> <ChevronDown size={12} />
              </div>
            </div>

            <div className="relative flex flex-col items-center justify-center my-4 h-24">
              <svg className="w-30 h-20 overflow-visible" viewBox="0 10 100 50">
                <path d="M 10,50 A 40,40 0 0,1 90,50" fill="none" stroke="#e2e8f0" strokeWidth="8" strokeLinecap="round" />
                <path d="M 10,50 A 40,40 0 0,1 82,25" fill="none" stroke="#059669" strokeWidth="8" strokeLinecap="round" />
              </svg>
              <div className="absolute top-8 text-center">
                <span className="text-lg font-black text-slate-800">{score.toFixed(1)} / 100</span>
                <p className="text-[8px] uppercase tracking-wider font-bold text-slate-400">Average Buyer Score</p>
                <span className="text-[9px] font-semibold text-emerald-600 flex items-center justify-center gap-0.5 mt-0.5">▲ {averageGrowth.toFixed(1)}%</span>
              </div>
            </div>

            <div className="space-y-2 mt-4">
              {[{label: "Total Buyers", value: totalBuyerss,path: "M0,6 L15,3 L30,8 L45,2 L60,5"},
                {label: "Buyer Score", value: score.toFixed(1), path: "M0,8 L15,5 L30,4 L45,7 L60,3"},
                {label: "Shipments", value: totalShipments, path: "M0,7 L15,8 L30,4 L45,2 L60,4"},
                {label: "Avg Growth",value: `${averageGrowth.toFixed(1)}%`,path: "M0,5 L15,7 L30,6 L45,4 L60,5"}
              ].map((row, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <span className="text-[#0A146E] font-bold w-24">{row.label}</span>
                  <div className="w-16 h-4 shrink-0 mx-2">
                    <svg className="w-full h-full stroke-emerald-500" fill="none" strokeWidth="1.5">
                      <path d={row.path} />
                    </svg>
                  </div>
                  <span className="text-emerald-600 font-bold text-right text-[11px] w-12">{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* PANEL 2: TOP PRODUCTS BY BUYERS */}
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-slate-900">Top Products by Buyers</h3>
              <div  onClick={() => setDateRange(true)} className="flex items-center gap-1 bg-slate-50 border px-2 py-1 rounded-md text-[11px] text-slate-500 cursor-pointer">
                <span>This Month</span> <ChevronDown size={12} />
              </div>
            </div>
            
            <div className="space-y-3.5">
              {topProducts.map((p, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-[10px] shadow-sm">📦</div>
                  <div className="flex-1">
                    <div className="flex justify-between text-[13px] font-bold text-[#0A146E] mb-0.5">
                      <span>{p._id}</span>
                      <span>₹ {(p.tradeValue / 10000000).toFixed(2)} Cr</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div className={`h-full ${colors[i % colors.length]} rounded-full`} style={{width: `${Math.min((p.tradeValue / topProducts[0]?.tradeValue) * 100, 100)}%`}}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button className="w-full mt-4 text-center text-xs font-bold text-blue-600 hover:text-blue-700 inline-flex items-center justify-center gap-1 pt-3 border-t border-slate-50">
            View All Products <ArrowRight size={13} />
          </button>
        </div>

        {/* PANEL 3: RECENT BUYER ACTIVITY */}
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-slate-900">Recent Buyer Activity</h3>
            <span className="text-xs font-semibold text-emerald-600 cursor-pointer hover:underline" onClick={() => setRecentBuyer(true)}>View All</span>
          </div>
          
          <div className="space-y-3.5">
            {recentActivity.map((act, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`p-1.5 rounded-xl ${act.bg} ${act.iconColor} shrink-0`}>
                  <act.icon size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#0A146E] leading-normal">{act.text}</p>
                </div>
                <span className="text-xs text-slate-400 font-medium shrink-0 whitespace-nowrap ml-1">{act.time}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* --- FOOTER CARD: BUYER INSIGHTS PANEL --- */}
      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-bold text-slate-900">Buyer Insights</h3>
          <span className="text-xs font-bold text-blue-600 cursor-pointer hover:underline inline-flex items-center gap-1">
            View Detailed Insights <ArrowUpRight size={14} />
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         <div className="flex items-start gap-3 bg-[#f8fafc]/60 p-2.5 rounded-xl border border-slate-50">
         <div className="p-1 bg-blue-50 text-blue-600 rounded-lg shrink-0 mt-0.5">
          <Info size={14} />
          </div>
          <p className="text-base font-medium text-slate-600 leading-relaxed">Top Country: <strong>{insights.topCountry?._id}</strong> ({insights.topCountry?.count || 0} buyers)</p>
          </div>
          <div className="flex items-start gap-3 bg-[#f8fafc]/60 p-2.5 rounded-xl border border-slate-50">
          <div className="p-1 bg-blue-50 text-blue-600 rounded-lg shrink-0 mt-0.5">
          <Info size={14} />
          </div>
          <p className="text-base font-medium text-slate-600 leading-relaxed">Top Product: <strong>{insights.topProduct?._id}</strong> ({insights.topProduct?.count || 0} buyers)</p>
          </div>
          <div className="flex items-start gap-3 bg-[#f8fafc]/60 p-2.5 rounded-xl border border-slate-50">
          <div className="p-1 bg-blue-50 text-blue-600 rounded-lg shrink-0 mt-0.5">
          <Info size={14} />
          </div>
          <p className="text-base font-medium text-slate-600 leading-relaxed">Average Growth: <strong>{Number(insights.averageGrowth || 0).toFixed(1)}%</strong></p>
        </div>
        </div>
      </div>

      {/* --- UTILITY SYSTEM BOTTOM METADATA --- */}
      <div className="pt-3 border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-between text-[10px] font-medium text-slate-400 gap-2">
        <div className="flex items-center gap-1.5">
          <Clock size={12} className="text-blue-500" />
          <span>All data is updated daily. Last updated on 24 Apr 2025, 09:30 AM</span>
        </div>
        <div className="flex items-center gap-1 cursor-pointer hover:text-slate-600 transition-colors">
          <HelpCircle size={12} className="text-slate-400" />
          <span>Help Center</span>
        </div>
      </div>

      {exportReport && (
        <ExportReport onClose={() => setExportReport(false)} />
      )}

      <BuyerList
        isOpen={showBuyerList}
        onClose={() => setShowBuyerList(false)}
      />

       {dateRange && (
                  <DateRangeModal onClose={() => setDateRange(false)}/>
                )}

                 {recentBuyer && ( <RecentBuyerActivityModal onClose={() => setRecentBuyer(false)} />
          ) }
      

    </div>
  );
}


