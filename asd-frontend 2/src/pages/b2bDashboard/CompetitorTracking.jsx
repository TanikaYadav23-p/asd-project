import React, { useState } from "react";
import ReactCountryFlag from "react-country-flag";
import {
  CalendarDays,
  Download,
  ChevronDown,
  Sliders,
  Users,
  Package,
  IndianRupee,
  Boxes,
  Sprout,
  Eye,
  Truck,
  Clock,
  Info,
  HelpCircle,
} from "lucide-react";
import {
  BarChart,
  Bar,
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

const HEADING = "text-[#07156B]";

const COUNTRY_CODES = {
  USA: "US",
  India: "IN",
  UAE: "AE",
  Germany: "DE",
  China: "CN",
  Netherlands: "NL",
  Brazil: "BR",
};

function Flag({ country, size = 14 }) {
  return (
    <ReactCountryFlag
      countryCode={COUNTRY_CODES[country] || "US"}
      svg
      style={{ width: size, height: size, borderRadius: "2px" }}
    />
  );
}

const KPI_STATS = [
  { title: "Total Competitors Tracked", value: "12", change: "▲ 2 vs last month", icon: Users, bg: "bg-slate-100", color: "text-slate-500" },
  { title: "Total Shipments", value: "8,742", change: "▲ 15.6% vs last month", icon: Package, bg: "bg-blue-50", color: "text-blue-500" },
  { title: "Total Trade Value (INR)", value: "₹658.74 Cr", change: "▲ 18.7% vs last month", icon: IndianRupee, bg: "bg-teal-50", color: "text-teal-600" },
  { title: "Markets Covered", value: "68", change: "▲ 6 vs last month", icon: Boxes, bg: "bg-orange-50", color: "text-orange-500" },
  { title: "Products Handled", value: "1,256", change: "▲ 12.3% vs last month", icon: Sprout, bg: "bg-emerald-50", color: "text-emerald-500" },
  { title: "New Competitors Added", value: "2", change: "▲ 2 vs last month", icon: Eye, bg: "bg-purple-50", color: "text-purple-500" },
  { title: "Market Share (Avg.)", value: "24.6%", change: "▲ 3.4% vs last month", icon: Truck, bg: "bg-rose-50", color: "text-rose-500" },
];

const TABS = ["Overview", "Competitor Performance", "Market Share Analysis", "Product Analysis", "Country Analysis", "Trend Analysis", "Alerts & Insights"];

const TRADE_COMPARISON = [
  { name: "Global Tech Industries", value: 185.45 },
  { name: "Impexon Exports", value: 185.45 },
  { name: "Shree Enterprises", value: 185.45 },
  { name: "Trade India Pvt. Ltd.", value: 185.45 },
  { name: "Oceanic Solutions", value: 185.45 },
];

const MARKET_SHARE = [
  { name: "Global Tech Industries", value: 24.6, color: "#2563EB" },
  { name: "Impexon Exports", value: 18.9, color: "#10B981" },
  { name: "Shree Enterprises", value: 13.1, color: "#8B5CF6" },
  { name: "Trade India Pvt. Ltd.", value: 9.8, color: "#FBBF24" },
  { name: "Oceanic Solutions", value: 7.6, color: "#EF4444" },
  { name: "Others", value: 25.9, color: "#CBD5E1" },
];

const TREND_LINES_COLORS = {
  "Global Tech Industries": "#2563EB",
  "Impexon Exports": "#10B981",
  "Shree Enterprises": "#8B5CF6",
  "Trade India Pvt. Ltd.": "#F59E0B",
  "Oceanic Solutions": "#14B8A6",
};

const TREND_DATA = [
  { date: "01 Apr", "Global Tech Industries": 150, "Impexon Exports": 80, "Shree Enterprises": 60, "Trade India Pvt. Ltd.": 40, "Oceanic Solutions": 30 },
  { date: "06 Apr", "Global Tech Industries": 180, "Impexon Exports": 120, "Shree Enterprises": 90, "Trade India Pvt. Ltd.": 70, "Oceanic Solutions": 45 },
  { date: "11 Apr", "Global Tech Industries": 160, "Impexon Exports": 110, "Shree Enterprises": 70, "Trade India Pvt. Ltd.": 60, "Oceanic Solutions": 55 },
  { date: "16 Apr", "Global Tech Industries": 210, "Impexon Exports": 150, "Shree Enterprises": 100, "Trade India Pvt. Ltd.": 90, "Oceanic Solutions": 65 },
  { date: "21 Apr", "Global Tech Industries": 190, "Impexon Exports": 140, "Shree Enterprises": 95, "Trade India Pvt. Ltd.": 75, "Oceanic Solutions": 60 },
  { date: "24 Apr", "Global Tech Industries": 245, "Impexon Exports": 160, "Shree Enterprises": 110, "Trade India Pvt. Ltd.": 85, "Oceanic Solutions": 70 },
];

const TOP_SHIPMENTS = [
  { name: "Global Tech Industries", shipments: "2,145", change: "16.2%", up: true, share: "24.6%" },
  { name: "Impexon Exports", shipments: "1,658", change: "12.7%", up: true, share: "18.9%" },
  { name: "Shree Enterprises", shipments: "1,125", change: "9.3%", up: true, share: "13.1%" },
  { name: "Trade India Pvt. Ltd.", shipments: "845", change: "-2.6%", up: false, share: "9.8%" },
  { name: "Oceanic Solutions", shipments: "612", change: "6.8%", up: true, share: "7.6%" },
];

const TOP_PRODUCTS = [
  { code: "8517", desc: "Smartphones", competitor: "Global Tech Industries", value: "₹98.45 Cr" },
  { code: "8504", desc: "Electric Transformers", competitor: "Impexon Exports", value: "₹76.32 Cr" },
  { code: "8542", desc: "Integrated Circuits", competitor: "Shree Enterprises", value: "₹65.21 Cr" },
  { code: "8471", desc: "Auto Data Processing Units", competitor: "Global Tech Industries", value: "₹54.18 Cr" },
  { code: "8708", desc: "Parts of Motor Vehicles", competitor: "Trade India Pvt. Ltd.", value: "₹43.65 Cr" },
];

const COUNTRY_PRESENCE = [
  { country: "USA", count: 9 },
  { country: "India", count: 12 },
  { country: "UAE", count: 8 },
  { country: "Germany", count: 7 },
  { country: "China", count: 10 },
  { country: "Netherlands", count: 6 },
  { country: "Brazil", count: 5 },
];

const ACTIVITY_SNAPSHOT = [
  { name: "Global Tech Industries", country: "India", shipments: "2,145", value: "₹185.45 Cr", growth: "16.2%", up: true, product: "Smartphones (8517)", destination: "USA", share: "24.6%", active: "24 Apr 2025" },
  { name: "Impexon Exports", country: "UAE", shipments: "1,658", value: "₹142.36 Cr", growth: "12.7%", up: true, product: "Electric Transformers (8504)", destination: "UAE", share: "18.9%", active: "24 Apr 2025" },
  { name: "Shree Enterprises", country: "Germany", shipments: "1,125", value: "₹98.75 Cr", growth: "9.3%", up: true, product: "Integrated Circuits (8542)", destination: "Germany", share: "13.1%", active: "23 Apr 2025" },
  { name: "Trade India Pvt. Ltd.", country: "USA", shipments: "845", value: "₹76.30 Cr", growth: "-2.6%", up: false, product: "Auto Parts (8708)", destination: "USA", share: "9.8%", active: "23 Apr 2025" },
  { name: "Oceanic Solutions", country: "Netherlands", shipments: "612", value: "₹65.40 Cr", growth: "6.8%", up: true, product: "Industrial Machinery (8471)", destination: "Netherlands", share: "7.6%", active: "22 Apr 2025" },
];

function SectionCard({ children, className = "" }) {
  return (
    <div className={`bg-white border border-slate-100 rounded-2xl p-4 shadow-xs ${className}`}>
      {children}
    </div>
  );
}

function ViewAllLink({ text }) {
  return (
    <button className="text-blue-600 text-xs font-bold text-center mt-3 pt-2 border-t border-slate-50 w-full">
      {text} →
    </button>
  );
}

export default function CompetitorTrackingDashboard() {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="overflow-y-auto w-full bg-[#F8FAFC] text-slate-600 font-sans antialiased">
      <div className="max-w-[1400px] mx-auto p-3 sm:p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-4">
          <div>
            <h1 className={`text-xl sm:text-2xl font-bold tracking-tight ${HEADING}`}>Competitor Tracking</h1>
            <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">
              Monitor your competitors trade activities, performance and market presence.
            </p>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <button className={`flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border border-slate-200 text-[11px] sm:text-xs font-semibold px-3 sm:px-4 py-2 rounded-xl shadow-xs hover:bg-slate-50 transition whitespace-nowrap ${HEADING}`}>
              <CalendarDays size={14} className="text-slate-400" />
              01 Apr 2025 - 24 Apr 2025
            </button>
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-[11px] sm:text-xs font-semibold px-3 sm:px-4 py-2 rounded-xl text-white shadow-xs transition whitespace-nowrap">
              <Download size={14} />
              Export Report
            </button>
          </div>
        </div>

        <div className="border-2 border-blue-500 rounded-2xl p-3 mb-5 bg-white">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3">
            {KPI_STATS.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="p-2.5 flex flex-col justify-between">
                  <div className="flex justify-between items-start gap-2">
                    <span className={`text-[10px] sm:text-[11px] font-semibold leading-tight ${HEADING}`}>
                      {stat.title}
                    </span>
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${stat.bg} ${stat.color}`}>
                      <Icon size={14} />
                    </div>
                  </div>
                  <div className="mt-2.5">
                    <h4 className={`text-sm sm:text-base font-extrabold tracking-tight ${HEADING}`}>{stat.value}</h4>
                    <span className="text-[9px] font-bold block mt-0.5 text-green-500">{stat.change}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <SectionCard className="mb-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 items-end">
            <div>
              <label className="text-[10px] text-slate-400 font-bold block mb-1.5 uppercase">Competitor</label>
              <div className="relative">
                <select className="w-full bg-slate-50/70 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs appearance-none focus:outline-none">
                  <option>All Competitors</option>
                </select>
                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="text-[10px] text-slate-400 font-bold block mb-1.5 uppercase">Country</label>
              <div className="relative">
                <select className="w-full bg-slate-50/70 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs appearance-none focus:outline-none">
                  <option>All Countries</option>
                </select>
                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="text-[10px] text-slate-400 font-bold block mb-1.5 uppercase">Product / HS Code</label>
              <div className="relative">
                <select className="w-full bg-slate-50/70 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs appearance-none focus:outline-none">
                  <option>All Products</option>
                </select>
                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="text-[10px] text-slate-400 font-bold block mb-1.5 uppercase">Trade Type</label>
              <div className="relative">
                <select className="w-full bg-slate-50/70 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs appearance-none focus:outline-none">
                  <option>All (Import/Export)</option>
                </select>
                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="text-[10px] text-slate-400 font-bold block mb-1.5 uppercase">Time Period</label>
              <div className="relative">
                <select className="w-full bg-slate-50/70 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs appearance-none focus:outline-none">
                  <option>This Month</option>
                </select>
                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center justify-center gap-1.5 bg-slate-50/80 border border-slate-200 text-slate-600 rounded-xl py-2 px-3 text-xs font-semibold hover:bg-slate-100 transition whitespace-nowrap">
                <Sliders size={13} className="text-slate-400" /> More Filters
              </button>
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl py-2 px-3 transition shadow-xs whitespace-nowrap">
                Apply Filters
              </button>
              <button className="text-slate-400 hover:text-slate-600 text-xs font-medium px-1 whitespace-nowrap">
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
                  activeTab === tab ? "text-blue-600" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {tab}
                {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-600 rounded-full" />}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
          <SectionCard>
            <div className="flex justify-between items-center mb-4">
              <h3 className={`font-bold text-xs ${HEADING}`}>Competitor Trade Value Comparison</h3>
              <button className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg px-2 py-1 text-[10px] font-semibold text-slate-600">
                This Month <ChevronDown size={11} className="text-slate-400" />
              </button>
            </div>
            <div className="h-[220px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={TRADE_COMPARISON} margin={{ top: 20, right: 5, left: -10, bottom: 0 }}>
                  <CartesianGrid stroke="#F1F5F9" vertical={false} />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "#94a3b8", fontSize: 8 }}
                    tickLine={false}
                    axisLine={false}
                    interval={0}
                    tickFormatter={(v) => v.split(" ")[0]}
                  />
                  <YAxis
                    tick={{ fill: "#94a3b8", fontSize: 9 }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v) => `${v} Cr`}
                    width={45}
                  />
                  <Tooltip />
                  <Bar dataKey="value" fill="#2563EB" radius={[4, 4, 0, 0]} maxBarSize={38} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <ViewAllLink text="View All Competitors" />
          </SectionCard>

          <SectionCard>
            <h3 className={`font-bold text-xs mb-3 ${HEADING}`}>Market Share by Competitors</h3>
            <div className="flex items-center gap-3">
              <div className="relative w-[130px] h-[130px] shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={MARKET_SHARE} innerRadius={38} outerRadius={58} dataKey="value" stroke="none">
                      {MARKET_SHARE.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-[7px] text-slate-400 font-bold uppercase leading-none">Total Market Share</span>
                  <span className={`font-black text-[12px] mt-1 ${HEADING}`}>100%</span>
                </div>
              </div>
              <div className="space-y-1.5 flex-1 text-[11px]">
                {MARKET_SHARE.map((m, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: m.color }} />
                      <span className="text-slate-600 font-semibold truncate max-w-[110px]">{m.name}</span>
                    </div>
                    <span className={`font-bold ${HEADING}`}>{m.value}%</span>
                  </div>
                ))}
              </div>
            </div>
            <ViewAllLink text="View Market Share Details" />
          </SectionCard>

          <SectionCard>
            <div className="flex justify-between items-center mb-3">
              <h3 className={`font-bold text-xs ${HEADING}`}>Trade Value Trend <span className="text-slate-400 font-normal">(Top 5 Competitors)</span></h3>
              <button className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg px-2 py-1 text-[10px] font-semibold text-slate-600 shrink-0">
                This Month <ChevronDown size={11} className="text-slate-400" />
              </button>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="h-[190px] flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={TREND_DATA} margin={{ top: 5, right: 5, left: -15, bottom: 0 }}>
                    <CartesianGrid stroke="#F1F5F9" vertical={false} />
                    <XAxis dataKey="date" tick={{ fill: "#94a3b8", fontSize: 8 }} tickLine={false} axisLine={false} />
                    <YAxis tick={{ fill: "#94a3b8", fontSize: 9 }} tickLine={false} axisLine={false} tickFormatter={(v) => `${v} Cr`} width={40} />
                    <Tooltip />
                    {Object.entries(TREND_LINES_COLORS).map(([key, color]) => (
                      <Line key={key} type="monotone" dataKey={key} stroke={color} strokeWidth={2} dot={false} />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-1.5 text-[10px] sm:w-28 shrink-0">
                {Object.entries(TREND_LINES_COLORS).map(([key, color]) => (
                  <div key={key} className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: color }} />
                    <span className="text-slate-600 font-semibold leading-tight">{key}</span>
                  </div>
                ))}
              </div>
            </div>
            <ViewAllLink text="View Trend Analysis" />
          </SectionCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
          <SectionCard>
            <h3 className={`font-bold text-sm mb-3 ${HEADING}`}>Top Competitors by Shipments</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-[11px] min-w-[300px]">
                <thead>
                  <tr className="text-[9px] text-slate-400 uppercase font-bold">
                    <th className="text-left pb-2 font-bold">Competitor</th>
                    <th className="text-right pb-2 font-bold">Shipments</th>
                    <th className="text-right pb-2 font-bold">Change</th>
                    <th className="text-right pb-2 font-bold">Share</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {TOP_SHIPMENTS.map((c, i) => (
                    <tr key={i}>
                      <td className={`py-2.5 font-semibold whitespace-nowrap ${HEADING}`}>{c.name}</td>
                      <td className="py-2.5 text-right font-bold text-slate-700 whitespace-nowrap">{c.shipments}</td>
                      <td className={`py-2.5 text-right font-bold whitespace-nowrap ${c.up ? "text-emerald-500" : "text-rose-500"}`}>
                        {c.up ? "▲" : "▼"} {c.change}
                      </td>
                      <td className="py-2.5 text-right font-semibold text-slate-500 whitespace-nowrap">{c.share}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ViewAllLink text="View All Competitors" />
          </SectionCard>

          <SectionCard>
            <h3 className={`font-bold text-sm mb-3 ${HEADING}`}>Top Products Handled by Competitors</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-[11px] min-w-[300px]">
                <thead>
                  <tr className="text-[9px] text-slate-400 uppercase font-bold">
                    <th className="text-left pb-2 font-bold">HS Code</th>
                    <th className="text-left pb-2 font-bold">Description</th>
                    <th className="text-left pb-2 font-bold">Top Competitor</th>
                    <th className="text-right pb-2 font-bold">Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {TOP_PRODUCTS.map((p, i) => (
                    <tr key={i}>
                      <td className={`py-2.5 font-semibold whitespace-nowrap ${HEADING}`}>{p.code}</td>
                      <td className="py-2.5 text-slate-600">{p.desc}</td>
                      <td className="py-2.5 text-slate-500">{p.competitor}</td>
                      <td className="py-2.5 text-right font-bold text-slate-800 whitespace-nowrap">{p.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ViewAllLink text="View All Products" />
          </SectionCard>

          <SectionCard>
            <h3 className={`font-bold text-sm mb-3 ${HEADING}`}>Competitor Presence by Country</h3>
            <div className="flex items-center gap-2">
              <div className="relative flex-1 h-[170px] rounded-xl overflow-hidden bg-gradient-to-br from-blue-50 to-white">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg"
                  alt="world map"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ filter: "grayscale(1) brightness(0)" }}
                />
              </div>
              <div className="space-y-2 text-[11px] shrink-0">
                {COUNTRY_PRESENCE.map((c, i) => (
                  <div key={i} className="flex items-center gap-1.5 font-bold">
                    <Flag country={c.country} />
                    <span className={HEADING}>{c.country} {c.count}</span>
                  </div>
                ))}
              </div>
            </div>
            <ViewAllLink text="View Country Analysis" />
          </SectionCard>
        </div>

        <SectionCard className="mb-4">
          <h3 className={`font-bold text-sm mb-3 ${HEADING}`}>Competitor Activity Snapshot</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-[11px] min-w-[860px]">
              <thead>
                <tr className="text-[9px] text-slate-400 uppercase font-bold border-b border-slate-100">
                  <th className="text-left py-2 font-bold">Competitor</th>
                  <th className="text-left py-2 font-bold">Country</th>
                  <th className="text-right py-2 font-bold">Shipments</th>
                  <th className="text-right py-2 font-bold">Trade Value</th>
                  <th className="text-right py-2 font-bold">Growth</th>
                  <th className="text-left py-2 font-bold">Top Product</th>
                  <th className="text-left py-2 font-bold">Destination</th>
                  <th className="text-right py-2 font-bold">Share</th>
                  <th className="text-right py-2 font-bold">Last Active</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {ACTIVITY_SNAPSHOT.map((r, i) => (
                  <tr key={i}>
                    <td className={`py-2.5 font-semibold whitespace-nowrap ${HEADING}`}>{r.name}</td>
                    <td className="py-2.5 whitespace-nowrap">
                      <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                        <Flag country={r.country} /> {r.country}
                      </span>
                    </td>
                    <td className="py-2.5 text-right text-slate-600 whitespace-nowrap">{r.shipments}</td>
                    <td className="py-2.5 text-right font-bold text-slate-800 whitespace-nowrap">{r.value}</td>
                    <td className={`py-2.5 text-right font-bold whitespace-nowrap ${r.up ? "text-emerald-500" : "text-rose-500"}`}>
                      {r.up ? "▲" : "▼"} {r.growth}
                    </td>
                    <td className="py-2.5 text-slate-600 whitespace-nowrap">{r.product}</td>
                    <td className="py-2.5 text-slate-600 whitespace-nowrap">{r.destination}</td>
                    <td className="py-2.5 text-right font-semibold text-slate-500 whitespace-nowrap">{r.share}</td>
                    <td className="py-2.5 text-right whitespace-nowrap">
                      <span className="flex items-center justify-end gap-1 text-slate-500">
                        <Clock size={11} /> {r.active}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

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