import React, { useState } from "react";
import {
  CalendarDays,
  Download,
  ChevronDown,
  Sliders,
  IndianRupee,
  Package,
  Globe2,
  ArrowUpRight,
  ArrowDownLeft,
  Tag,
  Flag,
  Plus,
  Minus,
  RotateCw,
  Link2,
  Building2,
  TrendingUp,
  PlusCircle,
  HelpCircle,
  Info,
} from "lucide-react";
import ReactCountryFlag from "react-country-flag";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const KPI_STATS = [
  { title: "Global Trade Value (INR)", value: "₹1,245.80 Cr", change: "▲ 16.6% vs last month", icon: IndianRupee },
  { title: "Total Shipments", value: "8,742", change: "▲ 16.8% vs last month", icon: Package },
  { title: "Countries Traded", value: "168", change: "▲ 6 vs last month", icon: Globe2 },
  { title: "Export Value (INR)", value: "₹620.45 Cr", change: "▲ 17.3% vs last month", icon: ArrowUpRight },
  { title: "Import Value (INR)", value: "₹625.35 Cr", change: "▲ 19.8% vs last month", icon: ArrowDownLeft },
  { title: "Top Product Category", value: "Electronics", change: "₹185.45 Cr", icon: Tag, plain: true },
  { title: "Top Trading Country", value: "USA", change: "₹185.45 Cr", icon: Flag, plain: true },
];

const TABS = ["Trade Flow", "Country Analysis", "Product Analysis"];

const TRADE_ROUTES = [
  { from: "China", to: "USA", fFlag: "CN", tFlag: "US", value: "₹185.45 Cr", share: "14.9%", width: "70%" },
  { from: "India", to: "UAE", fFlag: "IN", tFlag: "AE", value: "₹96.30 Cr", share: "7.7%", width: "38%" },
  { from: "Germany", to: "USA", fFlag: "DE", tFlag: "US", value: "₹74.20 Cr", share: "6.0%", width: "30%" },
  { from: "China", to: "India", fFlag: "CN", tFlag: "IN", value: "₹63.45 Cr", share: "5.1%", width: "26%" },
  { from: "USA", to: "Germany", fFlag: "US", tFlag: "DE", value: "₹52.18 Cr", share: "4.2%", width: "21%" },
  { from: "UAE", to: "India", fFlag: "AE", tFlag: "IN", value: "₹41.75 Cr", share: "3.4%", width: "17%" },
  { from: "Netherlands", to: "Germany", fFlag: "NL", tFlag: "DE", value: "₹38.60 Cr", share: "3.1%", width: "15%" },
  { from: "South Korea", to: "USA", fFlag: "KR", tFlag: "US", value: "₹34.25 Cr", share: "2.8%", width: "13%" },
];

const TOP_COUNTRIES = [
  { name: "USA", flag: "US", value: "₹185.45 Cr", share: "14.9%", width: "100%" },
  { name: "China", flag: "CN", value: "₹163.25 Cr", share: "13.1%", width: "88%" },
  { name: "Germany", flag: "DE", value: "₹98.70 Cr", share: "7.9%", width: "53%" },
  { name: "UAE", flag: "AE", value: "₹96.30 Cr", share: "7.7%", width: "52%" },
  { name: "India", flag: "IN", value: "₹79.45 Cr", share: "6.4%", width: "43%" },
  { name: "Netherlands", flag: "NL", value: "₹52.18 Cr", share: "4.2%", width: "28%" },
  { name: "UK", flag: "GB", value: "₹45.60 Cr", share: "3.7%", width: "25%" },
  { name: "France", flag: "FR", value: "₹38.75 Cr", share: "3.1%", width: "21%" },
];

const REGION_DATA = [
  { name: "USA", value: 512.35, percent: "27.3%", color: "#2563EB" },
  { name: "UAE", value: 302.8, percent: "16.1%", color: "#10B981" },
  { name: "China", value: 268.4, percent: "14.3%", color: "#A855F7" },
  { name: "Germany", value: 208.4, percent: "10.3%", color: "#F59E0B" },
  { name: "Bangladesh", value: 268.4, percent: "14.3%", color: "#1E293B" },
  { name: "Netherland", value: 268.4, percent: "14.3%", color: "#C084FC" },
  { name: "Other", value: 268.4, percent: "14.3%", color: "#94A3B8" },
];

const TRADE_OVERVIEW = [
  { from: "China", fFlag: "CN", to: "USA", tFlag: "US", type: "Export", value: "₹185.45 Cr", shipments: "2,145", product: "Electrical Machinery", growth: "16.2%", share: "14.9%", trend: [4, 6, 5, 8, 7, 10, 9] },
  { from: "India", fFlag: "IN", to: "UAE", tFlag: "AE", type: "Export", value: "₹96.30 Cr", shipments: "1,025", product: "Petroleum Products", growth: "21.8%", share: "7.7%", trend: [3, 4, 4, 6, 5, 7, 8] },
  { from: "Germany", fFlag: "DE", to: "USA", tFlag: "US", type: "Export", value: "₹74.20 Cr", shipments: "985", product: "Machinery & Parts", growth: "10.9%", share: "6.0%", trend: [5, 5, 6, 5, 7, 6, 7] },
  { from: "USA", fFlag: "US", to: "Germany", tFlag: "DE", type: "Export", value: "₹52.18 Cr", shipments: "642", product: "Aircraft Parts", growth: "8.4%", share: "4.2%", trend: [4, 5, 4, 6, 5, 6, 6] },
  { from: "UAE", fFlag: "AE", to: "India", tFlag: "IN", type: "Export", value: "₹41.75 Cr", shipments: "541", product: "Precious Metals", growth: "15.3%", share: "3.4%", trend: [3, 4, 5, 4, 6, 7, 7] }
];

const MAP_DOTS = [
  { top: "34%", left: "18%", color: "#7C3AED" },
  { top: "30%", left: "39%", color: "#10B981" },
  { top: "35%", left: "55%", color: "#2563EB", big: true },
  { top: "55%", left: "40%", color: "#F59E0B" },
  { top: "72%", left: "58%", color: "#06B6D4" },
];

const MAP_LINES = [
  { top: "34%", left: "18%", w: 22, angle: -6 },
  { top: "30%", left: "39%", w: 17, angle: 4 },
  { top: "35%", left: "55%", w: 16, angle: -18 },
  { top: "55%", left: "40%", w: 15, angle: 24 },
];

function SectionCard({ children, className = "" }) {
  return (
    <div className={`bg-white border border-slate-100 rounded-2xl p-4 shadow-xs ${className}`}>
      {children}
    </div>
  );
}

export default function TradeMapDashboard() {
  const [activeTab, setActiveTab] = useState("Trade Flow");
  const [flowType, setFlowType] = useState("Total Trade");

  const totalRegionValue = REGION_DATA.reduce((a, b) => a + b.value, 0).toFixed(2);

  return (
    <div className="h-screen w-full bg-[#F8FAFC] text-slate-600 font-sans antialiased overflow-y-auto py-5">
      <div className="max-w-[1400px] mx-auto p-3 sm:p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">Trade Map</h1>
            <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">
              Visualize global trade flows, analyze markets and discover new opportunities.
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

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3 mb-5">
          {KPI_STATS.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-100 p-3 sm:p-3.5 rounded-2xl shadow-xs flex flex-col justify-between hover:shadow-md transition duration-200"
              >
                <div className="flex justify-between items-start gap-2">
                  <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 leading-tight">
                    {stat.title}
                  </span>
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 bg-teal-50 text-teal-600">
                    <Icon size={14} />
                  </div>
                </div>
                <div className="mt-2.5">
                  <h4 className="text-sm sm:text-base font-extrabold text-[#07156B] tracking-tight">
                    {stat.value}
                  </h4>
                  <span
                    className={`text-[9px] font-bold block mt-0.5 ${
                      stat.plain ? "text-slate-400" : "text-green-500"
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

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
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-600 rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>

        <SectionCard className="mb-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-5 items-end">
            <div>
              <label className="text-[10px] text-[#07156B] font-bold block mb-1.5 uppercase">Trade Type</label>
              <div className="relative">
                <select className="w-full bg-slate-50/70 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs appearance-none focus:outline-none">
                  <option>All (Import/Export)</option>
                  <option>Import</option>
                  <option>Export</option>
                </select>
                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="text-[10px] text-[#07156B] font-bold block mb-1.5 uppercase">Time Period</label>
              <div className="relative">
                <select className="w-full bg-slate-50/70 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs appearance-none focus:outline-none">
                  <option>This Month</option>
                  <option>Last Month</option>
                  <option>This Year</option>
                </select>
                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="text-[10px] text-[#07156B] font-bold block mb-1.5 uppercase">From Country</label>
              <div className="relative">
                <select className="w-full bg-slate-50/70 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs appearance-none focus:outline-none">
                  <option>All Countries</option>
                </select>
                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="text-[10px] text-[#07156B] font-bold block mb-1.5 uppercase">To Country</label>
              <div className="relative">
                <select className="w-full bg-slate-50/70 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs appearance-none focus:outline-none">
                  <option>All Countries</option>
                </select>
                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="text-[10px] text-[#07156B] font-bold block mb-1.5 uppercase">Product / HS Code</label>
              <div className="relative">
                <select className="w-full bg-slate-50/70 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs appearance-none focus:outline-none">
                  <option>All Products</option>
                </select>
                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>

              <div>
                 <button className="flex items-center justify-center gap-1.5 bg-slate-50/80 border border-slate-200 text-slate-600 rounded-xl py-2 px-3 text-xs font-semibold hover:bg-slate-100 transition whitespace-nowrap">
                 More Filters  <ChevronDown size={16} className="text-slate-400" /> 
              </button>
              </div>

             {/* <button className="w-full bg-slate-50/80 border border-slate-200 text-slate-600 rounded-xl py-2 text-xs font-semibold flex items-center justify-between px-3 hover:bg-slate-100 transition">
                  <span className="flex items-center gap-1.5"><Sliders size={13} className="text-slate-400" /> More Filters</span> <ChevronDown size={13} className="text-slate-400" />
             </button> */}
             
            <div className="flex gap-5 items-center justify-between ">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl py-2 px-3 transition shadow-xs whitespace-nowrap">
                Apply Filters
              </button>
              <button className="text-slate-400 hover:text-slate-600 text-xs font-medium px-3 whitespace-nowrap">
                Reset
              </button>
            </div>
          </div>
        </SectionCard>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-5">
          <SectionCard className="xl:col-span-2">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-sm text-[#07156B]">Global Trade Flow</h3>
              <button className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-[11px] font-semibold text-slate-600">
                World Map <ChevronDown size={12} className="text-slate-400" />
              </button>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="sm:w-36 shrink-0 space-y-4">
                <div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase block mb-1.5">
                    Trade Flow (INR)
                  </span>
                  <div className="space-y-1.5">
                    {["Total Trade", "Export", "Import"].map((opt) => (
                      <label key={opt} className="flex items-center gap-1.5 text-[11px] text-slate-500 cursor-pointer">
                        <input
                          type="radio"
                          checked={flowType === opt}
                          onChange={() => setFlowType(opt)}
                          className="accent-blue-600 w-3 h-3"
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase block mb-1.5">
                    Trade Value (INR)
                  </span>
                  <div className="space-y-1.5 text-[10px] text-slate-500">
                    <div className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-emerald-500 inline-block" /> Above ₹100 Cr</div>
                    <div className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-blue-500 inline-block" /> ₹50 Cr - ₹100 Cr</div>
                    <div className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-amber-400 inline-block" /> ₹10 Cr - ₹50 Cr</div>
                    <div className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-rose-400 inline-block" /> Below ₹10 Cr</div>
                  </div>
                </div>
                <p className="text-[9px] text-slate-400 hidden sm:block">Line thickness represents trade value</p>
              </div>

              <div className="relative flex-1 h-[220px] sm:h-[260px] bg-slate-50 rounded-xl overflow-hidden border border-slate-100">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg"
                  alt="world map"
                  className="absolute inset-0 w-full h-full object-cover opacity-40"
                />
                {MAP_LINES.map((l, i) => (
                  <div
                    key={i}
                    className="absolute h-[2px] bg-emerald-400/70 origin-left"
                    style={{ top: l.top, left: l.left, width: `${l.w}%`, transform: `rotate(${l.angle}deg)` }}
                  />
                ))}
                {MAP_DOTS.map((d, i) => (
                  <div
                    key={i}
                    className={`absolute rounded-full border-2 border-white shadow ${d.big ? "w-4 h-4" : "w-3 h-3"}`}
                    style={{ top: d.top, left: d.left, backgroundColor: d.color }}
                  />
                ))}
                <div className="absolute bottom-2 right-2 flex flex-col gap-1">
                  <button className="w-6 h-6 bg-white rounded-md shadow flex items-center justify-center text-slate-500">
                    <Plus size={12} />
                  </button>
                  <button className="w-6 h-6 bg-white rounded-md shadow flex items-center justify-center text-slate-500">
                    <Minus size={12} />
                  </button>
                  <button className="w-6 h-6 bg-white rounded-md shadow flex items-center justify-center text-slate-500">
                    <RotateCw size={11} />
                  </button>
                </div>
              </div>
            </div>
            <p className="text-[9px] text-slate-400 mt-2 sm:hidden">Line thickness represents trade value</p>
          </SectionCard>

          <SectionCard>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-sm text-[#07156B]">Top Trade Routes <span className="text-slate-400 font-normal text-xs">(by Trade Value)</span></h3>
              <button className="text-blue-600 text-[11px] font-bold shrink-0">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-[11px] min-w-[280px]">
                <thead>
                  <tr className="text-[9px] text-slate-400 uppercase font-bold">
                    <th className="text-left pb-2 font-bold">From</th>
                    <th className="text-left pb-2 font-bold">To</th>
                    <th className="text-right pb-2 font-bold">Value</th>
                    <th className="text-right pb-2 font-bold">Share</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {TRADE_ROUTES.map((r, i) => (
                    <tr key={i}>
                      <td className="py-2 font-semibold text-slate-700 whitespace-nowrap flex items-center gap-1">
                          <ReactCountryFlag countryCode={r.fFlag} svg style={{ width: "14px", height: "14px" }} />
                        {r.from}</td>
                      <td className="py-2 font-semibold text-slate-700 whitespace-nowrap ">
                          <ReactCountryFlag countryCode={r.tFlag} svg style={{ width: "14px", height: "14px" }} />
                       {r.to}</td>
                      <td className="py-2 text-right font-bold text-slate-800 whitespace-nowrap">{r.value}</td>
                      <td className="py-2 text-right w-20">
                        <div className="flex items-center justify-end gap-1.5">
                          <div className="w-10 h-1 bg-slate-100 rounded-full overflow-hidden hidden sm:block">
                            <div className="h-full bg-emerald-500" style={{ width: r.width }} />
                          </div>
                          <span className="font-bold text-slate-500">{r.share}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                  <tr className="border-t border-slate-100">
                    <td className="py-2 font-bold text-slate-800" colSpan={2}>Total</td>
                    <td className="py-2 text-right font-bold text-slate-800">₹620.45 Cr</td>
                    <td className="py-2 text-right font-bold text-slate-500">49.2%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </SectionCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
          <SectionCard>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-sm text-[#07156B]">Top Countries by Trade Value</h3>
              <button className="text-blue-600 text-[10px] font-bold">View All</button>
            </div>
            <div className="space-y-2.5">
              {TOP_COUNTRIES.map((c, i) => (
                <div key={i} className="text-[11px]">
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold text-slate-700 flex items-center gap-1">
                         <ReactCountryFlag
                           countryCode={c.flag}
                            svg
                            style={{ width: "12px", height: "12px" }}
                         />
                         {c.name}
                         </span>
                    <span className="font-bold text-slate-700">{c.value} <span className="text-slate-400 font-semibold">{c.share}</span></span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: c.width }} />
                  </div>
                </div>
              ))}
            </div>
            <button className="text-blue-600 text-xs font-bold text-center mt-3 pt-2 border-t border-slate-50 w-full">
              View All Countries →
            </button>
          </SectionCard>

          <SectionCard>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-sm text-[#07156B]">Trade Value by Region</h3>
              <button className="text-blue-600 text-[10px] font-bold">View All</button>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative w-[110px] h-[110px] shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={REGION_DATA} innerRadius={32} outerRadius={50}    dataKey="value" stroke="none">
                      {REGION_DATA.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-[6px] text-slate-400 font-bold uppercase leading-none">Total Value</span>
                  <span className="font-black text-[10px] text-slate-800 mt-0.5">₹{totalRegionValue} Cr</span>
                </div>
              </div>
              <div className="space-y-8 flex-1 text-[10px] ">
                {REGION_DATA.map((r, i) => (
                  <div key={i} className="flex items-center justify-between  ">
                    <div className="flex items-center gap-1.5 ">
                      <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: r.color }} />
                      <span className="text-slate-600 font-semibold">{r.name}</span>
                    </div>
                    <span className="text-slate-500 font-semibold text-right whitespace-nowrap">
                      ₹{r.value.toFixed(2)} Cr ({r.percent})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </SectionCard>

          <SectionCard>
            <h3 className="font-bold text-sm text-[#07156B] mb-3">Trade Flow Summary</h3>
            <div className="grid grid-cols-2 gap-2.5">
              <div className="bg-slate-50/60 border flex flex-col space-y-3 border-slate-100 rounded-xl p-2.5">
                <div className="flex items-center gap-1 text-[9px] text-[#07156B] font-bold uppercase mb-1">
                  <Link2 size={10} /> Inter-Regional Trade
                </div>
                <div className="text-base font-black text-[#07156B]">₹845.60 Cr</div>
                <div className="text-[10px] text-[#07156B] font-semibold">67.9%</div>
              </div>
              <div className="bg-slate-50/60 flex flex-col space-y-3 border border-slate-100 rounded-xl p-2.5">
                <div className="flex items-center gap-1 text-[9px] text-[#07156B] font-bold uppercase mb-1">
                  <Building2 size={10} /> Intra-Regional Trade
                </div>
                <div className="text-base font-black text-[#07156B]">₹400.20 Cr</div>
                <div className="text-[10px] text-[#07156B] font-semibold">32.1%</div>
              </div>
              <div className="bg-slate-50/60 flex flex-col space-y-3 border border-slate-100 rounded-xl p-2.5">
                <div className="flex items-center gap-1 text-[9px] text-[#07156B] font-bold uppercase mb-1">
                  <TrendingUp size={10} /> Top Growing Route
                </div>
                <div className="text-[11px] flex items-center justify-between font-bold text-slate-800">India →  <ReactCountryFlag
                            countryCode={"US"}
                            svg
                            style={{ width: "12px", height: "12px" }}
                            /> USA <span className="text-emerald-500">▲ 32.6%</span></div>
                <div className="text-[10px] text-[#07156B] font-semibold">Trade Value: ₹28.60 Cr</div>
              </div>
              <div className="bg-slate-50/60 flex flex-col space-y-3 border border-slate-100 rounded-xl p-2.5">
                <div className="flex items-center gap-1 text-[9px] text-[#07156B] font-bold uppercase mb-1">
                  <PlusCircle size={10} /> New Trade Route Added
                </div>
                <div className="text-[11px]  flex  items-center justify-between font-bold text-slate-800">Brazil →
                         <ReactCountryFlag
                            countryCode={"IN"}
                            svg
                            style={{ width: "12px", height: "12px" }}
                            />
                             India</div>
                <div className="text-[10px] text-[#07156B] font-semibold">Trade Value: ₹2.35 Cr</div>
              </div>
            </div>
          </SectionCard>
        </div>

        <SectionCard className="mb-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-sm text-[#07156B]">Country to Country Trade Overview</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[11px] min-w-[760px]">
              <thead>
                <tr className="text-[10px] text-[#07156B]  uppercase font-bold border-b border-slate-100">
                  <th className="text-left py-2 font-bold">From Country</th>
                  <th className="text-left py-2 font-bold">To Country</th>
                  <th className="text-left py-2 font-bold">Trade Type</th>
                  <th className="text-center py-2  font-bold">Trade Value (INR)</th>
                  <th className="text-center py-2 font-bold">Shipments</th>
                  <th className="text-center py-2 font-bold">Top Product</th>
                  <th className="text-left py-2 font-bold">Growth</th>
                  <th className="text-left py-2 font-bold">Share</th>
                  <th className="text-right py-2 font-bold">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50  ">
                {TRADE_OVERVIEW.map((r, i) => (
                  <tr key={i}>
                    <td className="py-2.5 font-semibold text-[#07156B] whitespace-nowrap flex items-center gap-1">
                          <div className="flex items-center gap-1">
                            <ReactCountryFlag
                            countryCode={r.fFlag}
                            svg
                            style={{ width: "12px", height: "12px" }}
                            />
                            <span>{r.from}</span>
                    </div> </td>
                    <td className="py-2.5 font-semibold text-[#07156B] whitespace-nowrap  ">
                          <div className="flex items-center gap-1">
                            <ReactCountryFlag
                            countryCode={r.tFlag}
                            svg
                            style={{ width: "12px", height: "12px" }}
                            />
                            <span>{r.to}</span>
                        </div>
                    </td>
                    <td className="py-2.5 text-[#07156B] whitespace-nowrap">{r.type}</td>
                    <td className="py-2.5 text-center font-bold text-[#07156B] whitespace-nowrap">{r.value}</td>
                    <td className="py-2.5 text-center text-[#07156B] whitespace-nowrap">{r.shipments}</td>
                    <td className="py-2.5  text-center text-[#07156B] whitespace-nowrap">{r.product}</td>
                    <td className="py-2.5 text-left font-bold text-emerald-500 whitespace-nowrap">▲ {r.growth}</td>
                    <td className="py-2.5 text-left font-semibold text-[#07156B] whitespace-nowrap">{r.share}</td>
                    <td className="py-2.5 w-20 h-8">
                      <ResponsiveContainer width="100%" height={24}>
                        <LineChart data={r.trend.map((v) => ({ v }))}>
                          <Line type="monotone" dataKey="v" stroke="#10B981" strokeWidth={1.5} dot={false} />
                        </LineChart>
                      </ResponsiveContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="text-blue-600 text-xs font-bold text-right mt-3 pt-2 border-t border-slate-50 w-full block">
            View All Trade Routes →
          </button>
        </SectionCard>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-t border-slate-200 pt-3 pb-2">
          <span className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
            <Info size={12} /> All data is updated daily. Last updated on 24 Apr 2025, 09:30 AM
          </span>
          <span className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold cursor-pointer">
            <HelpCircle size={12} /> Help Center
          </span>
        </div>
      </div>
    </div>
  );
}