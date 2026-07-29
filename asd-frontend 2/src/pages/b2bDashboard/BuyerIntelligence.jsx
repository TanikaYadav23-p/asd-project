import React, { useState, useMemo } from "react";
import {
  CalendarDays,
  Download,
  Users,
  Activity,
  Truck ,
  Package,
  Building2,
  Globe,
  IndianRupee,
  Clock,
  ChevronDown,
  Sliders,
  LayoutGrid,
  List,
  HelpCircle,
  MoreVertical,
  Search,
  Percent,
  TrendingUp,
  ShieldAlert,
  Anchor,
  ArrowUpRight
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  Tooltip,
} from "recharts";

// ==========================================
// 1. RAW DATA (Directly Mapped from {8ABBEB5E-27BB-4C42-A081-1CA877D4B260}.png)
// ==========================================

const tabs = [
  "Overview",
  "HS Code List",
  "Trade Flow",
  "Top Products",
  "Countries",
  "Importers",
  "Exporters",
  "Trends & Insights",
];

const KPI_STATS = [
  { title: "Total Buyers", value: "8,742", change: "▲ 16.8% vs last month", isUp: true, color: "text-blue-600", bg: "bg-blue-50", icon: Users },
  { title: "Active Buyers", value: "12,245", change: "▲ 13.6% vs last month", isUp: true, color: "text-emerald-600", bg: "bg-emerald-50", icon: Activity },
  { title: "Total Shipments", value: "2.45 L", change: "▲ 12.3% vs last month", isUp: true, color: "text-indigo-600", bg: "bg-indigo-50", icon: Package },
  { title: "Total Trade Value (INR)", value: "₹3,203.45 Cr", change: "▲ 14.7% vs last month", isUp: true, color: "text-amber-600", bg: "bg-amber-50", icon: IndianRupee },
  { title: "Countries Covered", value: "68", change: "▲ 9.4% vs last month", isUp: true, color: "text-purple-600", bg: "bg-purple-50", icon: Globe },
  { title: "Avg. Shipment Value (INR)", value: "₹14.26 L", change: "▼ 3.2% vs last month", isUp: false, color: "text-rose-600", bg: "bg-rose-50", icon: TrendingUp },
  { title: "Avg. Lead Time (Days)", value: "18.6", change: "▼ 3.2% vs last month", isUp: false, color: "text-cyan-600", bg: "bg-cyan-50", icon: Clock },
];

const TOP_BUYERS_VALUE = [
  { name: "Walmart Inc.", country: "USA", value: "₹ 856.40 Cr", share: "8.70%", width: "w-[87%]" },
  { name: "Amazon.com Inc.", country: "USA", value: "₹ 652.35 Cr", share: "6.62%", width: "w-[66%]" },
  { name: "Costco Wholesale Corp.", country: "USA", value: "₹ 489.75 Cr", share: "4.97%", width: "w-[50%]" },
  { name: "Carrefour S.A.", country: "France", value: "₹ 356.20 Cr", share: "3.62%", width: "w-[36%]" },
  { name: "Lidl Stiftung & Co. KG", country: "Germany", value: "₹ 298.40 Cr", share: "3.03%", width: "w-[30%]" },
];

const TREND_DATA = [
  { date: "01 Apr", value: 600 }, { date: "06 Apr", value: 850 }, { date: "11 Apr", value: 780 },
  { date: "16 Apr", value: 1100 }, { date: "21 Apr", value: 1020 }, { date: "24 Apr", value: 1245 },
];

const COUNTRY_CHART_DATA = [
  { name: "USA", value: 512.35, percent: "27.3%", color: "#2563EB" },
  { name: "UAE", value: 302.80, percent: "16.1%", color: "#10B981" },
  { name: "China", value: 268.40, percent: "14.3%", color: "#8B5CF6" },
  { name: "Germany", value: 208.40, percent: "10.3%", color: "#F59E0B" },
  { name: "Bangladesh", value: 268.40, percent: "14.3%", color: "#EC4899" },
  { name: "Netherland", value: 268.40, percent: "14.3%", color: "#6366F1" },
  { name: "Other", value: 268.40, percent: "14.3%", color: "#94A3B8" },
];

const TOP_GROWTH_BUYERS_1 = [
  { name: "Alibaba Group", value: "₹ 152.40 Cr", growth: "▲ 38.8%" },
  { name: "Target Corporation", value: "₹ 98.75 Cr", growth: "▲ 32.4%" },
  { name: "Mercadona S.A.", value: "₹ 76.30 Cr", growth: "▲ 27.8%" },
  { name: "Reliance Retail", value: "₹ 64.20 Cr", growth: "▲ 25.1%" },
  { name: "Coupang Corp.", value: "₹ 45.90 Cr", growth: "▲ 23.3%" },
];

const SHIPMENT_TABLE_DATA = [
  { id: "SHP-2025-1045", buyer: "Walmart Inc.", country: "USA", desc: "Electric Fans", hscode: "8414", supplier: "ABC Exports Pvt. Ltd.", origin: "India", port: "Los Angeles", date: "24 Apr 2025", value: "₹ 45.60 Cr", status: "Delivered" },
  { id: "SHP-2025-1044", buyer: "Amazon.com Inc.", country: "USA", desc: "Stainless Steel Kitchenware", hscode: "7323", supplier: "Global Industries", origin: "India", port: "New York", date: "23 Apr 2025", value: "₹ 38.75 Cr", status: "Delivered" },
  { id: "SHP-2025-1043", buyer: "Costco Wholesale Corp.", country: "USA", desc: "LED Bulbs", hscode: "8539", supplier: "Prime Exports", origin: "China", port: "Long Beach", date: "22 Apr 2025", value: "₹ 28.30 Cr", status: "In Transit" },
  { id: "SHP-2025-1042", buyer: "Carrefour S.A.", country: "France", desc: "Basmati Rice", hscode: "1006", supplier: "Delta Impex", origin: "India", port: "Marseille", date: "21 Apr 2025", value: "₹ 18.90 Cr", status: "Delivered" },
  { id: "SHP-2025-1041", buyer: "Lidl Stiftung & Co. KG", country: "Germany", desc: "Cotton T-Shirts", hscode: "6109", supplier: "Shree Textiles", origin: "Bangladesh", port: "Hamburg", date: "20 Apr 2025", value: "₹ 16.20 Cr", status: "Pending" },
];

export default function BuyerIntelligence() {
  // ==========================================
  // 2. STATE MANAGEMENT & FILTERS
  // ==========================================
  const [activeTab, setActiveTab] = useState("Overview");
  const [searchBuyer, setSearchBuyer] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("All Countries");
  const [selectedProduct, setSelectedProduct] = useState("All Products");
  const [selectedBuyerType, setSelectedBuyerType] = useState("All Types");
  
  // Applied Filter State for Live Interactivity
  const [appliedFilters, setAppliedFilters] = useState({
    search: "", country: "All Countries", type: "All Types"
  });

  const handleApplyFilters = () => {
    setAppliedFilters({
      search: searchBuyer,
      country: selectedCountry,
      type: selectedBuyerType
    });
  };

  const handleResetFilters = () => {
    setSearchBuyer("");
    setSelectedCountry("All Countries");
    setSelectedProduct("All Products");
    setSelectedBuyerType("All Types");
    setAppliedFilters({ search: "", country: "All Countries", type: "All Types" });
  };

  // Dynamic Shipment Rows Filtering
  const filteredShipments = useMemo(() => {
    return SHIPMENT_TABLE_DATA.filter((row) => {
      const matchesSearch = row.buyer.toLowerCase().includes(appliedFilters.search.toLowerCase()) || 
                            row.desc.toLowerCase().includes(appliedFilters.search.toLowerCase());
      const matchesCountry = appliedFilters.country === "All Countries" || row.country === appliedFilters.country;
      return matchesSearch && matchesCountry;
    });
  }, [appliedFilters]);

  return (
    <div className="overflow-y-auto bg-[#F8FAFC] p-6 text-slate-600 font-sans antialiased flex flex-col justify-between pt-14">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
            Buyer Intelligence
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">Discover global buyers, analyze their sourcing patterns and identify business opportunities.</p>
        </div>
        <div className="flex items-center gap-2.5 w-full md:w-auto">
          <button className="flex items-center justify-center gap-2 bg-white border border-slate-200 text-xs font-semibold px-4 py-2 rounded-xl text-slate-700 shadow-xs hover:bg-slate-50 transition whitespace-nowrap">
            <CalendarDays size={14} className="text-slate-400" /> 01 Apr 2025 - 24 Apr 2025
          </button>
          <button className="flex items-center justify-center gap-2 bg-white border border-slate-200 text-xs font-semibold px-4 py-2 rounded-xl text-slate-700 shadow-xs hover:bg-slate-50 transition whitespace-nowrap">
            <Download size={14} className="text-slate-400" /> Export Report
          </button>
        </div>
      </div>

      {/* HORIZONTAL METERS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-3 mb-6">
        {KPI_STATS.map((stat, idx) => {
          const IconComponent = stat.icon;
          return (
            <div key={idx} className="bg-white border border-slate-100 p-3.5 rounded-2xl shadow-xs flex flex-col justify-between hover:shadow-md transition duration-200">
              <div className="flex justify-between items-start">
                <span className="text-[13px] font-semibold text-slate-600  tracking-wider">{stat.title}</span>
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${stat.bg} ${stat.color}`}>
                  <IconComponent size={14} />
                </div>
              </div>
              <div className="mt-2.5">
                <h4 className="text-base font-extrabold text-slate-800 tracking-tight">{stat.value}</h4>
                <span className={`text-[9px] font-bold block mt-0.5 ${stat.isUp ? "text-green-500" : "text-rose-500"}`}>{stat.change}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ADVANCED MULTI-FILTERS BAR */}
      <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-xs mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-3 items-end">
          <div className="xl:col-span-1">
            <label className="text-[10px] text-slate-400 font-bold block mb-1.5 uppercase">Buyer Name / Company</label>
            <div className="relative">
              <input
                type="text"
                value={searchBuyer}
                onChange={(e) => setSearchBuyer(e.target.value)}
                placeholder="Search Buyer or Company"
                className="w-full bg-slate-50/70 border border-slate-200 rounded-xl py-2 pl-8 pr-3 text-xs focus:outline-none focus:border-blue-500 placeholder-slate-400"
              />
              <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
          </div>
          <div>
            <label className="text-[10px] text-slate-400 font-bold block mb-1.5 uppercase">Country</label>
            <div className="relative">
              <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)} className="w-full bg-slate-50/70 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs appearance-none focus:outline-none">
                <option>All Countries</option>
                <option>USA</option>
                <option>France</option>
                <option>Germany</option>
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="text-[10px] text-slate-400 font-bold block mb-1.5 uppercase">Product / HS Code</label>
            <div className="relative">
              <select value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)} className="w-full bg-slate-50/70 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs appearance-none focus:outline-none">
                <option>All Products</option>
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="text-[10px] text-slate-400 font-bold block mb-1.5 uppercase">Buyer Type</label>
            <div className="relative">
              <select value={selectedBuyerType} onChange={(e) => setSelectedBuyerType(e.target.value)} className="w-full bg-slate-50/70 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs appearance-none focus:outline-none">
                <option>All Types</option>
                <option>Importer</option>
                <option>Distributor</option>
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="text-[10px] text-slate-400 font-bold block mb-1.5 uppercase">Minimum Shipments</label>
            <div className="relative">
              <select className="w-full bg-slate-50/70 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs appearance-none focus:outline-none">
                <option>All</option>
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="text-[10px] text-slate-400 font-bold block mb-1.5 uppercase">Minimum Trade Value (INR)</label>
            <div className="relative">
              <select className="w-full bg-slate-50/70 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs appearance-none focus:outline-none">
                <option>All</option>
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>
          <div>
            <button className="w-full bg-slate-50/80 border border-slate-200 text-slate-600 rounded-xl py-2 text-xs font-semibold flex items-center justify-between px-3 hover:bg-slate-100 transition">
              <span className="flex items-center gap-1.5"><Sliders size={13} className="text-slate-400" /> More Filters</span> <ChevronDown size={13} className="text-slate-400" />
            </button>
          </div>
          <div className="flex gap-2 w-full xl:col-span-1">
            <button onClick={handleApplyFilters} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl py-2 transition shadow-xs">Apply Filters</button>
            <button onClick={handleResetFilters} className="text-slate-400 hover:text-slate-600 text-xs font-medium px-1">Reset</button>
          </div>
        </div>
      </div>

      {/* NAVIGATION TABS SECTION */}
      <div className="flex border-b border-slate-200 gap-6 mb-6 overflow-x-auto whitespace-nowrap scrollbar-none">
        {["Overview", "Buyer List", "Sourcing Behavior", "Product Analysis", "Country Analysis", "Trends & Insights"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2.5 text-xs font-bold transition-all relative ${
              activeTab === tab ? "text-blue-600 font-extrabold" : "text-slate-400 hover:text-slate-700"
            }`}
          >
            {tab}
            {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-600 rounded-full" />}
          </button>
        ))}
      </div>


        <section className="w-full border-b border-gray-200 bg-white rounded-xl shadow-sm mb-3 px-2">
      <div className="mx-auto max-w-7xl">
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex min-w-max items-center gap-7 sm:gap-9 md:gap-10 px-4 sm:px-6 lg:px-0">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative whitespace-nowrap py-5 text-xs sm:text-sm font-semibold transition-colors duration-200 ${
                  activeTab === tab
                    ? "text-[#2563EB] border-b-2 border-[#2563EB]"
                    : "text-[#071A5B] hover:text-[#2563EB]"
                }`}
              >
                {tab}

               
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>

      {/* GRAPH CHART SECTION GRID 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        
        {/* PANEL 1: TOP BUYERS BY TRADE VALUE */}
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                <Building2 size={14} className="text-blue-500" /> Top Buyers by Trade Value <span className="text-slate-400 font-normal">(INR)</span>
              </h3>
            </div>
            <div className="space-y-3.5">
              <div className="flex justify-between text-[10px] text-slate-400 uppercase font-bold px-0.5">
                <span>Buyer</span>
                <div className="flex gap-16">
                  <span>Country</span>
                  <span className="w-20 text-right">Trade Value (INR)</span>
                  <span className="w-10 text-right">Share</span>
                </div>
              </div>
              {TOP_BUYERS_VALUE.map((item, idx) => (
                <div key={idx} className="text-[11px]">
                  <div className="flex justify-between text-slate-700 font-semibold mb-1">
                    <span className="text-slate-800 font-bold truncate max-w-[130px]">{item.name}</span>
                    <div className="flex gap-16 items-center">
                      <span className="text-slate-400 font-medium w-8 text-left">{item.country}</span>
                      <span className="font-bold text-slate-800 w-20 text-right">{item.value}</span>
                      <span className="text-[10px] font-bold text-slate-400 w-10 text-right">{item.share}</span>
                    </div>
                  </div>
                  {/* <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                    <div className={`bg-blue-500 h-full ${item.width}`} />
                  </div> */}
                </div>
              ))}
            </div>
          </div>
          <button className="text-blue-600 text-xs font-bold text-center mt-4 pt-2 border-t border-slate-50 flex items-center justify-center gap-1 hover:text-blue-700">
            View All Buyers <ArrowUpRight size={13} />
          </button>
        </div>

        {/* PANEL 2: TRADE VALUE TREND */}
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                <TrendingUp size={14} className="text-emerald-500" /> Trade Value Trend (INR)
              </h3>
              <span className="text-[9px] text-slate-400 bg-slate-50 border border-slate-150 px-2 py-0.5 rounded font-medium">This Month</span>
            </div>
            <div className="mb-4">
              <span className="text-lg font-black text-slate-800 tracking-tight">₹1,876.45 Cr</span>
              <span className="text-[10px] text-green-500 font-bold ml-2">▲ 17.6% vs last month</span>
            </div>
            <div className="h-[125px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={TREND_DATA}>
                  <XAxis dataKey="date" tick={{ fill: '#94a3b8', fontSize: 9 }} tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#10B981" strokeWidth={2} dot={{ fill: '#10B981', r: 2.5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 pt-2.5 border-t border-slate-50 text-center">
            <div className="bg-slate-50/60 p-1.5 rounded-xl border border-slate-100">
              <span className="text-[9px] text-slate-400 block font-medium uppercase">Export Value (INR)</span>
              <span className="text-xs font-bold text-slate-700">₹1,876.45 Cr</span>
            </div>
            <div className="bg-slate-50/60 p-1.5 rounded-xl border border-slate-100">
              <span className="text-[9px] text-slate-400 block font-medium uppercase">Export Shipments</span>
              <span className="text-xs font-bold text-slate-700">6,240</span>
            </div>
          </div>
        </div>

        {/* PANEL 3: BUYERS BY COUNTRY DONUT CHART */}
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                <Globe size={14} className="text-purple-500" /> Buyers by Country
              </h3>
              <button className="text-blue-600 text-[10px] font-bold">View All</button>
            </div>
            <div className="flex items-center justify-around gap-2 h-[145px]">
              <div className="relative w-[120px] h-[130px] shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={COUNTRY_CHART_DATA} innerRadius={35} outerRadius={50} dataKey="value" stroke="none">
                      {COUNTRY_CHART_DATA.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-[7px] text-slate-400 font-bold uppercase leading-none">Total Value</span>
                  <span className="font-black text-[9px] text-slate-800 mt-0.5">₹1,876.45 Cr</span>
                </div>
              </div>
              <div className="space-y-1 flex-1 pl-2 max-h-[140px] overflow-y-auto scrollbar-none">
                {COUNTRY_CHART_DATA.map((c, i) => (
                  <div key={i} className="flex items-center justify-between text-[10px]">
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
                      <span className="text-slate-600 font-bold">{c.name}</span>
                    </div>
                    <span className="text-slate-500 font-semibold text-right">₹{c.value.toFixed(2)} Cr ({c.percent})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button className="text-blue-500 text-[10px] font-bold text-center mt-2 flex items-center justify-center gap-1">View All Countries →</button>
        </div>
      </div>

      {/* GRID SECTION 2: TOP GROWTH AND BUYER CONCENTRATION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        
        {/* GRID SLOT 1: TOP GROWTH BUYERS 1 */}
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                <TrendingUp size={14} className="text-green-500" /> Top Growth Buyers <span className="text-slate-400 font-normal text-[10px]">(vs last month)</span>
              </h3>
            </div>
            <div className="divide-y divide-slate-100">
              <div className="flex justify-between text-[10px] text-slate-400 uppercase font-bold pb-1.5">
                <span>Buyer</span>
                <div className="flex gap-16"><span>Trade Value (INR)</span><span className="w-12 text-right">Growth</span></div>
              </div>
              {TOP_GROWTH_BUYERS_1.map((item, i) => (
                <div key={i} className="flex justify-between items-center py-2.5 text-[11px]">
                  <span className="font-bold text-slate-800 truncate max-w-[140px]">{item.name}</span>
                  <div className="flex gap-16 items-center">
                    <span className="font-semibold text-slate-500">{item.value}</span>
                    <span className="text-green-500 font-black w-12 text-right">{item.growth}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button className="text-blue-600 text-xs font-bold text-center mt-3 pt-2 border-t border-slate-50">View All Buyers →</button>
        </div>

        {/* GRID SLOT 2: TOP GROWTH BUYERS 2 */}
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                <TrendingUp size={14} className="text-green-500" /> Top Growth Buyers <span className="text-slate-400 font-normal text-[10px]">(vs last month)</span>
              </h3>
            </div>
            <div className="divide-y divide-slate-100">
              <div className="flex justify-between text-[10px] text-slate-400 uppercase font-bold pb-1.5">
                <span>Buyer</span>
                <div className="flex gap-16"><span>Trade Value (INR)</span><span className="w-12 text-right">Growth</span></div>
              </div>
              {TOP_GROWTH_BUYERS_1.map((item, i) => (
                <div key={i} className="flex justify-between items-center py-2.5 text-[11px]">
                  <span className="font-bold text-slate-800 truncate max-w-[140px]">{item.name}</span>
                  <div className="flex gap-16 items-center">
                    <span className="font-semibold text-slate-500">{item.value}</span>
                    <span className="text-green-500 font-black w-12 text-right">{item.growth}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button className="text-blue-600 text-xs font-bold text-center mt-3 pt-2 border-t border-slate-50">View All Buyers →</button>
        </div>

        {/* GRID SLOT 3: BUYER CONCENTRATION METERS */}
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-xs text-slate-800 mb-3 flex items-center gap-1.5">
              <ShieldAlert size={14} className="text-amber-500" /> Buyer Concentration
            </h3>
            <div className="grid grid-cols-3 gap-2 text-center mb-4">
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-2">
                <span className="text-[8px] font-bold text-slate-400 block uppercase leading-tight">Top 10 Buyers Share</span>
                <span className="text-xs font-black text-slate-800 mt-1 block">31.6%</span>
              </div>
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-2">
                <span className="text-[8px] font-bold text-slate-400 block uppercase leading-tight">Top 50 Buyers Share</span>
                <span className="text-xs font-black text-slate-800 mt-1 block">58.9%</span>
              </div>
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-2">
                <span className="text-[8px] font-bold text-slate-400 block uppercase leading-tight">Top 100 Buyers Share</span>
                <span className="text-xs font-black text-slate-800 mt-1 block">72.4%</span>
              </div>
            </div>

            {/* SEGMENTED HORIZONTAL PROGRESS TAPE */}
            <div className="mb-4">
              <span className="text-[10px] text-slate-400 font-bold block mb-1.5 uppercase flex items-center gap-1">
                <Percent size={11} /> Buyer Type Distribution
              </span>
              <div className="w-full h-2 rounded-full overflow-hidden flex">
                <div className="bg-blue-500 h-full w-[58%]" />
                <div className="bg-emerald-400 h-full w-[24%]" />
                <div className="bg-purple-500 h-full w-[11%]" />
                <div className="bg-orange-400 h-full w-[7%]" />
              </div>
            </div>

            {/* PILLS LEGEND */}
            <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-[10px] font-bold">
              <div className="flex items-center justify-between"><div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /><span className="text-slate-400">Importer</span></div><span className="text-slate-700">58.1%</span></div>
              <div className="flex items-center justify-between"><div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400" /><span className="text-slate-400">Distributor</span></div><span className="text-slate-700">24.6%</span></div>
              <div className="flex items-center justify-between"><div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-purple-500" /><span className="text-slate-400">Wholesaler</span></div><span className="text-slate-700">11.2%</span></div>
              <div className="flex items-center justify-between"><div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-orange-400" /><span className="text-slate-400">Retailer</span></div><span className="text-slate-700">6.1%</span></div>
            </div>
          </div>
          <button className="text-blue-600 text-xs font-bold text-center mt-3 flex items-center justify-center gap-1">View All Buyer Types →</button>
        </div>
      </div>

      {/* CORE RECENT SHIPMENTS DETAILS DATAGRID */}
      <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-xs ">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-extrabold text-sm text-slate-800 flex items-center gap-2">
            <Anchor size={15} className="text-blue-600" /> Recent Shipments by Buyers
          </h3>
        </div>

        <div className="overflow-x-auto -mx-4">
          <div className="inline-block min-w-full align-middle px-4">
            <table className="min-w-full divide-y divide-slate-100 text-xs text-left">
              <thead>
                <tr className="text-slate-400 font-bold border-b border-slate-100">
                  <th className="pb-3 font-semibold">Shipment ID</th>
                  <th className="pb-3 font-semibold">Buyer</th>
                  <th className="pb-3 font-semibold">Country</th>
                  <th className="pb-3 font-semibold">Product Description</th>
                  <th className="pb-3 font-semibold">HS Code</th>
                  <th className="pb-3 font-semibold">Supplier</th>
                  <th className="pb-3 font-semibold">Origin Country</th>
                  <th className="pb-3 font-semibold">Port of Arrival</th>
                  <th className="pb-3 font-semibold">Ship Date</th>
                  <th className="pb-3 font-semibold">Value (INR)</th>
                  <th className="pb-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-slate-600 font-medium">
                {filteredShipments.length > 0 ? (
                  filteredShipments.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition">
                      <td className="py-3.5 text-slate-400 font-semibold">{row.id}</td>
                      <td className="py-3.5 text-slate-800 font-bold">{row.buyer}</td>
                      <td className="py-3.5 text-slate-400 font-bold">{row.country}</td>
                      <td className="py-3.5 font-bold text-slate-700 max-w-[180px] truncate">{row.desc}</td>
                      <td className="py-3.5 text-slate-500 font-bold">{row.hscode}</td>
                      <td className="py-3.5 text-slate-500 font-semibold">{row.supplier}</td>
                      <td className="py-3.5 text-slate-600">{row.origin}</td>
                      <td className="py-3.5 text-slate-500">{row.port}</td>
                      <td className="py-3.5 text-slate-400 whitespace-nowrap">{row.date}</td>
                      <td className="py-3.5 font-bold text-slate-800">{row.value}</td>
                      <td className="py-3.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          row.status === "Delivered" ? "bg-green-50 text-green-600" :
                          row.status === "In Transit" ? "bg-blue-50 text-blue-600" : "bg-orange-50 text-orange-500"
                        }`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="11" className="py-8 text-center text-slate-400 font-bold">
                      No matching shipments records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* TABLE FOOTER BUTTON */}
        <div className="mt-2 pt-2 border-t border-slate-50 flex justify-end">
          <button className="text-blue-600 text-xs font-bold flex items-center gap-1">View All Shipments →</button>
        </div>
      </div>

      {/* METADATA SYSTEM TIMESTAMP FOOTER */}
      <div className="mt-6 pt-3 border-t border-slate-200/60 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 gap-2">
        <div className="flex items-center gap-1.5">
          <Clock size={13} className="text-slate-300" />
          <span>All data is updated daily. Last updated on 24 Apr 2025, 09:30 AM</span>
        </div>
        <div className="flex items-center gap-1 cursor-pointer hover:text-slate-500">
          <HelpCircle size={13} className="text-slate-300" />
          <span>Help Center</span>
        </div>
      </div>

    </div>
  );
}