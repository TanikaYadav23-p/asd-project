import React, { useState, useMemo } from "react";
import {
  CalendarDays,
  Download,
  Package,
  IndianRupee,
  Users,
  Truck,
  Globe,
  Clock3,
  ChevronDown,
  Sliders,
  LayoutGrid,
  List,
  HelpCircle,
  Clock,
  MoreVertical
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
// STATIC RAW DATA (As per Image {2BE9DE08-E6B8-4112-B604-497638DB5188}.png)
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

const INITIAL_STATS = [
  { title: "Total Export Shipments", value: "8,742", change: "▲ 16.8% vs last month", icon: Package, color: "text-blue-500", bg: "bg-blue-50", isUp: true },
  { title: "Total Export Value (INR)", value: "₹1,245.80 Cr", change: "▲ 18.6% vs last month", icon: IndianRupee, color: "text-green-500", bg: "bg-green-50", isUp: true },
  { title: "Total Exporters", value: "1,865", change: "▲ 12.3% vs last month", icon: Users, color: "text-cyan-500", bg: "bg-cyan-50", isUp: true },
  { title: "Total Suppliers", value: "320", change: "▲ 14.7% vs last month", icon: Truck, color: "text-emerald-500", bg: "bg-emerald-50", isUp: true },
  { title: "Countries of Origin", value: "68", change: "▲ 9.4% vs last month", icon: Globe, color: "text-purple-500", bg: "bg-purple-50", isUp: true },
  { title: "Avg. Shipment Value (INR)", value: "₹14.26 L", change: "▼ 3.2% vs last month", icon: IndianRupee, color: "text-orange-500", bg: "bg-orange-50", isUp: false },
  { title: "Avg. Lead Time (Days)", value: "18.6", change: "▼ 3.2% vs last month", icon: Clock3, color: "text-red-500", bg: "bg-red-50", isUp: false },
];

const INITIAL_TOP_CODES_VALUE = [
  { hsCode: "85", desc: "Electrical Machinery & Equipment", value: "₹ 320.45 Cr", share: "9.87%", width: "w-[9.87%]" },
  { hsCode: "84", desc: "Machinery & Mechanical Appliances", value: "₹ 285.70 Cr", share: "8.79%", width: "w-[8.79%]" },
  { hsCode: "84", desc: "Machinery & Mechanical Appliances", value: "₹ 285.70 Cr", share: "8.79%", width: "w-[8.79%]" },
  { hsCode: "84", desc: "Machinery & Mechanical Appliances", value: "₹ 285.70 Cr", share: "8.79%", width: "w-[8.79%]" },
  { hsCode: "84", desc: "Machinery & Mechanical Appliances", value: "₹ 285.70 Cr", share: "8.79%", width: "w-[8.79%]" },
];

const INITIAL_CODES_GROWTH = [
  { hsCode: "30", desc: "Pharmaceutical Products", value: "₹ 11.30 Cr", growth: "▲ 28.4%" },
  { hsCode: "88", desc: "Aircraft, Spacecraft & Parts", value: "₹ 26.45 Cr", growth: "▲ 24.7%" },
  { hsCode: "29", desc: "Organic Chemicals", value: "₹ 98.60 Cr", growth: "▲ 21.3%" },
  { hsCode: "87", desc: "Vehicles other than Railway", value: "₹ 74.20 Cr", growth: "▲ 19.6%" },
  { hsCode: "76", desc: "Aluminium & Articles", value: "₹ 42.75 Cr", growth: "▲ 18.1%" },
];

const INITIAL_CODES_SHIPMENTS = [
  { hsCode: "85", desc: "Electrical Machinery & Equipment", count: "2,145", share: "11.4%", width: "w-[11.4%]" },
  { hsCode: "84", desc: "Machinery & Mechanical Appliances", count: "1,896", share: "10.1%", width: "w-[10.1%]" },
  { hsCode: "39", desc: "Plastics & Articles", count: "1,256", share: "0.7%", width: "w-[7%]" },
  { hsCode: "72", desc: "Iron & Steel", count: "1,102", share: "5.9%", width: "w-[5.9%]" },
  { hsCode: "90", desc: "Optical, Medical & Precision Instruments", count: "987", share: "5.3%", width: "w-[5.3%]" },
];

const INITIAL_TREND_DATA = [
  { date: "01 Apr", value: 600 }, { date: "06 Apr", value: 850 }, { date: "11 Apr", value: 780 },
  { date: "16 Apr", value: 1100 }, { date: "21 Apr", value: 1020 }, { date: "24 Apr", value: 1245 },
];

const INITIAL_FLOW_DATA = [
  { name: "Import", value: 1876.45, percent: "57.8%", color: "#10B981" },
  { name: "Export", value: 1369.35, percent: "42.2%", color: "#2563EB" },
];

const INITIAL_COUNTRY_DATA = [
  { name: "USA", value: 512.35, percent: "27.3%", color: "#2563EB" },
  { name: "UAE", value: 302.80, percent: "16.1%", color: "#10B981" },
  { name: "China", value: 268.40, percent: "14.3%", color: "#8B5CF6" },
  { name: "Germany", value: 208.40, percent: "10.3%", color: "#F59E0B" },
  { name: "Bangladesh", value: 268.40, percent: "14.3%", color: "#6366F1" },
  { name: "Netherland", value: 268.40, percent: "14.3%", color: "#94A3B8" },
  { name: "Other", value: 268.40, percent: "14.3%", color: "#EC4899" },
];

const INITIAL_DETAILS_TABLE = [
  { hsCode: "85", desc: "Electrical Machinery & Equipment", heading: "Chapter 85 / Heading 8501-8548", flow: "Import", value: "₹ 320.45 Cr", shipments: "2,145", avgValue: "₹ 14.93 L", country: "China", growth: "▲ 14.6%", isUp: true },
  { hsCode: "84", desc: "Machinery & Mechanical Appliances", heading: "Chapter 84 / Heading 8401-8466", flow: "Import", value: "₹ 285.70 Cr", shipments: "1,896", avgValue: "₹ 15.08 L", country: "Germany", growth: "▲ 12.2%", isUp: true },
  { hsCode: "90", desc: "Optical, Medical & Precision Instruments", heading: "Chapter 90 / Heading 9001-9033", flow: "Import", value: "₹ 168.20 Cr", shipments: "1,256", avgValue: "₹ 13.41 L", country: "USA", growth: "▲ 10.5%", isUp: true },
  { hsCode: "39", desc: "Plastics & Articles", heading: "Chapter 39 / Heading 3901-3926", flow: "Import", value: "₹ 125.35 Cr", shipments: "1,102", avgValue: "₹ 11.37 L", country: "UAE", growth: "▲ 9.8%", isUp: true },
  { hsCode: "72", desc: "Iron & Steel", heading: "Chapter 72 / Heading 7201-7229", flow: "Export", value: "₹ 98.60 Cr", shipments: "987", avgValue: "₹ 9.99 L", country: "India", growth: "▲ 8.7%", isUp: true },
];

export default function HSCodeIntelligence() {
  // ==========================================
  // 2. STATE MANAGEMENT
  // ==========================================
  const [activeTab, setActiveTab] = useState("Overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("All Chapter");
  const [selectedHeading, setSelectedHeading] = useState("All headings");
  const [selectedSubHeading, setSelectedSubHeading] = useState("All Sub-headings");
  const [selectedCountry, setSelectedCountry] = useState("All Countries");
  const [selectedFlow, setSelectedFlow] = useState("All Flow");

  // Applied filter state
  const [filters, setFilters] = useState({
    search: "", chapter: "All Chapter", heading: "All headings", country: "All Countries", flow: "All Flow"
  });

  const handleApply = () => {
    setFilters({
      search: searchQuery, chapter: selectedChapter, heading: selectedHeading, country: selectedCountry, flow: selectedFlow
    });
  };

  const handleReset = () => {
    setSearchQuery(""); setSelectedChapter("All Chapter"); setSelectedHeading("All headings");
    setSelectedSubHeading("All Sub-headings"); setSelectedCountry("All Countries"); setSelectedFlow("All Flow");
    setFilters({ search: "", chapter: "All Chapter", heading: "All headings", country: "All Countries", flow: "All Flow" });
  };

  // ==========================================
  // 3. DYNAMIC FILTERING LOGIC
  // ==========================================
  const filteredTableData = useMemo(() => {
    return INITIAL_DETAILS_TABLE.filter(item => {
      const matchSearch = item.desc.toLowerCase().includes(filters.search.toLowerCase()) || item.hsCode.includes(filters.search);
      const matchChapter = filters.chapter === "All Chapter" || item.heading.includes(filters.chapter.replace("All ", ""));
      const matchCountry = filters.country === "All Countries" || item.country === filters.country;
      const matchFlow = filters.flow === "All Flow" || item.flow === filters.flow;
      return matchSearch && matchChapter && matchCountry && matchFlow;
    });
  }, [filters]);

  return (
    <div className="overflow-y-auto bg-[#f8fafc] p-5 font-sans text-slate-600 antialiased flex flex-col justify-between pt-14">
      
      {/* TOP HEADER */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-5">
        <div>
          <h1 className="text-2xl font-bold text-[#1e293b]">HS Code Intelligence</h1>
          <p className="text-xs text-slate-400 mt-0.5">Explore detailed global shipment records with advanced search and filters.</p>
        </div>
        <div className="flex items-center gap-2 w-full lg:w-auto">
          <button className="flex items-center justify-center gap-2 bg-white border border-slate-200 text-xs font-semibold px-4 py-2 rounded-xl text-slate-600 shadow-sm">
            <CalendarDays size={14} className="text-slate-400" /> 01 Apr 2025 - 24 Apr 2025
          </button>
          <button className="flex items-center justify-center gap-2 bg-white border border-slate-200 text-xs font-semibold px-4 py-2 rounded-xl text-slate-600 shadow-sm">
            <Download size={14} className="text-slate-400" /> Export Report
          </button>
        </div>
      </div>

      {/* METRICS METERS ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-3 mb-5">
        {INITIAL_STATS.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white border border-slate-100 p-3.5 rounded-2xl shadow-sm flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <span className="text-[13px] font-semibold text-slate-600 leading-tight block max-w-[100%]  tracking-tight">{stat.title}</span>
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${stat.bg} ${stat.color}`}><Icon size={14} /></div>
              </div>
              <div className="mt-2.5">
                <h4 className="text-base font-bold text-slate-800 tracking-tight">{stat.value}</h4>
                <span className={`text-[9px] font-bold block mt-0.5 ${stat.isUp ? "text-green-500" : "text-red-500"}`}>{stat.change}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* SEARCH AND FILTERS PANEL */}
      <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm mb-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-3 items-end">
          <div>
            <label className="text-[10px] text-slate-400 font-bold block mb-1 uppercase">HS Code / Product</label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search HS Code or Product"
              className="w-full bg-slate-50/60 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="text-[10px] text-slate-400 font-bold block mb-1 uppercase">Chapter</label>
            <div className="relative">
              <select value={selectedChapter} onChange={(e) => setSelectedChapter(e.target.value)} className="w-full bg-slate-50/60 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs appearance-none focus:outline-none focus:border-blue-500">
                <option>All Chapter</option>
                <option>Chapter 85</option>
                <option>Chapter 84</option>
                <option>Chapter 90</option>
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="text-[10px] text-slate-400 font-bold block mb-1 uppercase">Heading</label>
            <div className="relative">
              <select value={selectedHeading} onChange={(e) => setSelectedHeading(e.target.value)} className="w-full bg-slate-50/60 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs appearance-none focus:outline-none focus:border-blue-500">
                <option>All headings</option>
                <option>Heading 8501</option>
                <option>Heading 8401</option>
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="text-[10px] text-slate-400 font-bold block mb-1 uppercase">Sub-heading</label>
            <div className="relative">
              <select value={selectedSubHeading} onChange={(e) => setSelectedSubHeading(e.target.value)} className="w-full bg-slate-50/60 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs appearance-none focus:outline-none focus:border-blue-500">
                <option>All Sub-headings</option>
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="text-[10px] text-slate-400 font-bold block mb-1 uppercase">Country</label>
            <div className="relative">
              <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)} className="w-full bg-slate-50/60 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs appearance-none focus:outline-none focus:border-blue-500">
                <option>All Countries</option>
                <option>China</option>
                <option>Germany</option>
                <option>USA</option>
                <option>UAE</option>
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="text-[10px] text-slate-400 font-bold block mb-1 uppercase">Flow</label>
            <div className="relative">
              <select value={selectedFlow} onChange={(e) => setSelectedFlow(e.target.value)} className="w-full bg-slate-50/60 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs appearance-none focus:outline-none focus:border-blue-500">
                <option>All Flow</option>
                <option>Import</option>
                <option>Export</option>
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>
          
           <div className="relative">
                      <select className="w-full bg-slate-50/60 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs text-slate-600 appearance-none focus:outline-none focus:border-blue-500">
                        <option>More Filters</option>
                      </select>
                      <ChevronDown
                        size={14}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                      />
            </div>
          
          <div className="flex gap-2 w-full">
            <button onClick={handleApply} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs rounded-xl py-2 transition shadow-sm">Apply Filters</button>
            <button onClick={handleReset} className="text-slate-400 hover:text-slate-600 text-xs font-semibold px-2 border border-slate-200 rounded-xl bg-white">Reset</button>
          </div>
        </div>
      </div>

      {/* TABS NAVIGATION BAR */}
      <div className="flex border-b border-slate-200 gap-6 mb-5 overflow-x-auto whitespace-nowrap scrollbar-none">
        {["Overview", "HS Code List", "Trade Flow", "Top Products", "Countries", "Importers", "Exporters", "Trends & Insights"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2.5 text-xs font-bold transition-all relative ${
              activeTab === tab ? "text-emerald-600 font-extrabold" : "text-slate-500 hover:text-slate-800"
            }`}
          >
            {tab}
            {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-emerald-500 rounded-full" />}
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
                    ? "text-[#33cc99]"
                    : "text-[#071A5B] hover:text-[#33cc99]"
                }`}
              >
                {tab}

                {activeTab === tab && (
                  <span className="absolute left-0 bottom-0 h-[3px] w-full rounded-full bg-[#33cc99]" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>

      {/* CORE CHARTS QUAD GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
        
        {/* PANEL 1: TOP HS CODES BY TRADE VALUE */}
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-xs text-slate-800">Top HS Codes by Trade Value</h3>
              <button className="text-blue-600 text-[11px] font-bold">View All</button>
            </div>
            <div className="space-y-3">
              {INITIAL_TOP_CODES_VALUE.map((item, idx) => (
                <div key={idx} className="text-[11px]">
                  <div className="flex justify-between text-slate-700 font-medium mb-1 gap-2">
                    <span className="text-emerald-600 font-bold shrink-0">• {item.hsCode}</span>
                    <span className="truncate flex-1 text-slate-500">{item.desc}</span>
                    <span className="font-bold text-slate-800 shrink-0">{item.value}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                      <div className={`bg-teal-500 h-full ${item.width}`} />
                    </div>
                    <span className="text-[9px] font-bold text-slate-400 w-8 text-right">{item.share}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button className="text-blue-600 text-xs font-bold text-center mt-3 pt-2 border-t border-slate-50">View All HS Codes →</button>
        </div>

        {/* PANEL 2: TRADE VALUE TREND */}
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-bold text-xs text-slate-800">Trade Value Trend (INR)</h3>
              <span className="text-[9px] text-slate-400 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded font-medium">This Month</span>
            </div>
            <div className="mb-3">
              <span className="text-lg font-bold text-slate-800">₹1,876.45 Cr</span>
              <span className="text-[10px] text-green-500 font-semibold ml-2">▲ 17.6% vs last month</span>
            </div>
            <div className="h-[120px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={INITIAL_TREND_DATA}>
                  <XAxis dataKey="date" tick={{ fill: '#94a3b8', fontSize: 9 }} tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#10B981" strokeWidth={2} dot={{ fill: '#10B981', r: 2.5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-50 text-center">
            <div className="bg-slate-50/60 p-1.5 rounded-xl border border-slate-100">
              <span className="text-[9px] text-slate-400 block font-medium">Export Value (INR)</span>
              <span className="text-xs font-bold text-slate-700">₹1,876.45 Cr</span>
            </div>
            <div className="bg-slate-50/60 p-1.5 rounded-xl border border-slate-100">
              <span className="text-[9px] text-slate-400 block font-medium">Export Shipments</span>
              <span className="text-xs font-bold text-slate-700">6,240</span>
            </div>
          </div>
        </div>

        {/* PANEL 3: TRADE VALUE BY FLOW */}
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-xs text-slate-800 mb-3">Trade Value by Flow</h3>
            <div className="flex items-center justify-around gap-2 h-[150px]">
              <div className="relative w-[110px] h-[110px] shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={INITIAL_FLOW_DATA} innerRadius={38} outerRadius={50} dataKey="value" stroke="none">
                      {INITIAL_FLOW_DATA.map((item, index) => <Cell key={index} fill={item.color} />)}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-[8px] text-slate-400 font-bold uppercase">Total Value</span>
                  <span className="font-bold text-[10px] text-slate-800 leading-none mt-0.5">₹3,245.80 Cr</span>
                </div>
              </div>
              <div className="space-y-2">
                {INITIAL_FLOW_DATA.map((flow, i) => (
                  <div key={i} className="flex items-center gap-4 text-[11px]">
                    <div className="flex items-center gap-1.5 font-bold">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: flow.color }} />
                      <span className="text-slate-700">{flow.name}</span>
                    </div>
                    <span className="text-slate-500 font-semibold">₹{flow.value.toLocaleString()} Cr ({flow.percent})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DOUBLE GRAPH SLOT LAYER */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
        {/* Top HS Codes by Growth */}
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-xs text-slate-800">Top HS Codes by Growth <span className="text-[10px] text-slate-400 font-normal">(vs last month)</span></h3>
            <button className="text-blue-600 text-[11px] font-bold">View All</button>
          </div>
          <div className="divide-y divide-slate-50">
            {INITIAL_CODES_GROWTH.map((item, i) => (
              <div key={i} className="flex justify-between items-center py-2 text-[11px]">
                <div>
                  <div className="flex items-center gap-2"><span className="font-bold text-slate-700">{item.hsCode}</span><span className="text-slate-400 font-medium truncate max-w-[150px]">{item.desc}</span></div>
                </div>
                <div className="text-right flex items-center gap-4">
                  <span className="font-semibold text-slate-500">{item.value}</span>
                  <span className="text-green-500 font-bold w-12">{item.growth}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top HS Codes by Shipments */}
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-xs text-slate-800">Top HS Codes by Shipments</h3>
            <button className="text-blue-600 text-[11px] font-bold">View All</button>
          </div>
          <div className="space-y-2.5">
            {INITIAL_CODES_SHIPMENTS.map((item, i) => (
              <div key={i} className="text-[11px]">
                <div className="flex justify-between text-slate-600 font-medium mb-1">
                  <div className="flex items-center gap-2"><span className="font-bold text-slate-700">{item.hsCode}</span><span className="truncate max-w-[160px]">{item.desc}</span></div>
                  <span className="font-bold text-slate-800">{item.count}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className={`bg-blue-600 h-full ${item.width}`} />
                  </div>
                  <span className="text-[9px] font-bold text-slate-400 w-8 text-right">{item.share}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trade Value by Top Countries */}
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-xs text-slate-800">Trade Value by Top Countries</h3>
              <button className="text-blue-600 text-[11px] font-bold">View All</button>
            </div>
            <div className="flex items-center justify-between gap-2 h-[140px]">
              <div className="relative w-[100px] h-[100px] shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={INITIAL_COUNTRY_DATA} innerRadius={32} outerRadius={45} dataKey="value" stroke="none">
                      {INITIAL_COUNTRY_DATA.map((item, index) => <Cell key={index} fill={item.color} />)}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-[7px] uppercase text-slate-400 font-bold">Total Value</span>
                  <span className="font-bold text-[9px] text-slate-800 leading-none">₹1,876.45 Cr</span>
                </div>
              </div>
              <div className="flex-1 space-y-1 pl-1 max-h-[130px] overflow-y-auto scrollbar-none">
                {INITIAL_COUNTRY_DATA.map((country, idx) => (
                  <div key={idx} className="flex items-center justify-between text-[10px]">
                    <div className="flex items-center gap-1 truncate">
                      <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: country.color }} />
                      <span className="text-slate-600 font-semibold truncate">{country.name}</span>
                    </div>
                    <span className="text-slate-500 font-bold ml-1">₹{country.value.toFixed(2)} Cr ({country.percent})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DYNAMIC METADATA GRID DATA TABLE */}
      <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm ">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
          <h3 className="font-bold text-sm text-slate-800">HS Code Details</h3>
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <button className="flex items-center gap-1.5 bg-white border border-slate-200 text-xs font-bold py-1.5 px-3 rounded-xl text-slate-700 shadow-sm">
              <Sliders size={13} className="text-slate-400" /> Customize Columns
            </button>
            <div className="flex items-center border border-slate-200 rounded-xl bg-white p-0.5 shadow-sm">
              <button className="p-1 text-slate-400 hover:text-slate-600"><LayoutGrid size={14} /></button>
              <button className="p-1 bg-slate-100 rounded-lg text-blue-600"><List size={14} /></button>
            </div>
            <div className="relative">
              <select className="bg-white border border-slate-200 rounded-xl py-1.5 pl-3 pr-7 text-xs font-bold text-slate-700 appearance-none shadow-sm focus:outline-none">
                <option>50 per page</option>
              </select>
              <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto -mx-4">
          <div className="inline-block min-w-full align-middle px-4">
            <table className="min-w-full divide-y divide-slate-100 text-xs text-left">
              <thead>
                <tr className="text-slate-400 font-semibold border-b border-slate-100">
                  <th className="pb-3 font-medium">HS Code</th>
                  <th className="pb-3 font-medium">Description</th>
                  <th className="pb-3 font-medium">Chapter / Heading</th>
                  <th className="pb-3 font-medium">Flow</th>
                  <th className="pb-3 font-medium">Trade Value (INR)</th>
                  <th className="pb-3 font-medium">Shipments</th>
                  <th className="pb-3 font-medium">Avg. Shipment Value (INR)</th>
                  <th className="pb-3 font-medium">Top Country</th>
                  <th className="pb-3 font-medium">Growth (vs last month)</th>
                  <th className="pb-3 font-medium text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-slate-600 font-medium">
                {filteredTableData.length > 0 ? (
                  filteredTableData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/60 transition">
                      <td className="py-3 text-slate-800 font-bold">{row.hsCode}</td>
                      <td className="py-3 font-bold text-slate-700 max-w-[200px] truncate">{row.desc}</td>
                      <td className="py-3 text-slate-400 font-semibold">{row.heading}</td>
                      <td className="py-3 text-slate-500">{row.flow}</td>
                      <td className="py-3 font-bold text-slate-800">{row.value}</td>
                      <td className="py-3 text-slate-500">{row.shipments}</td>
                      <td className="py-3 text-slate-500">{row.avgValue}</td>
                      <td className="py-3 text-slate-700 font-semibold">{row.country}</td>
                      <td className="py-3 text-green-500 font-bold">{row.growth}</td>
                      <td className="py-3 text-center text-slate-400 cursor-pointer hover:text-slate-600"><MoreVertical size={14} className="mx-auto" /></td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10" className="py-8 text-center text-slate-400 font-bold">
                      No matching HS Code records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* FOOTER METADATA TIMESTAMP */}
      <div className="mt-5 pt-3 border-t border-slate-200/60 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 gap-2">
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
