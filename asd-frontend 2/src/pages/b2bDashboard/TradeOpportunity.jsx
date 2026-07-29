import React, { useState } from "react";
import { 
  TrendingUp, Anchor, ShieldAlert, Percent, Award, Globe, 
  BarChart3, Layers, Download, Calendar, Filter, ChevronDown, 
  Star, ArrowUpRight, HelpCircle, CheckCircle, Flame 
} from "lucide-react";
import ReactCountryFlag from "react-country-flag";

// --- MOCK DATA FOR DYNAMIC RENDERING ---
const kpiData = [
  { id: 1, title: "Total Opportunities", value: "1,248", change: "18.7%", up: true, icon: Globe, color: "text-emerald-500", bg: "bg-emerald-50" },
  { id: 2, title: "High Potential", value: "356", change: "22.4%", up: true, icon: Flame, color: "text-orange-500", bg: "bg-orange-50" },
  { id: 3, title: "Est. Trade Value (INR)", value: "₹1,245.80 Cr", change: "16.5%", up: true, icon: Layers, color: "text-amber-500", bg: "bg-amber-50" },
  { id: 4, title: "Avg. Opportunity Score", value: "78.6 / 100", change: "6.8 pts", up: true, icon: Star, color: "text-blue-500", bg: "bg-blue-50" },
  { id: 5, title: "New Opportunities", value: "152", change: "14.2%", up: true, icon: Award, color: "text-cyan-500", bg: "bg-cyan-50" },
  { id: 6, title: "Converted Opportunities", value: "68", change: "9.6%", up: true, icon: CheckCircle, color: "text-slate-500", bg: "bg-slate-50" },
];

const countriesData = [
  { code: "US", name: "USA", count: 184, value: "185.45 Cr", score: 82.6 },
  { code: "AE", name: "UAE", count: 142, value: "142.36 Cr", score: 80.3 },
  { code: "DE", name: "Germany", count: 118, value: "125.80 Cr", score: 79.4 },
  { code: "NL", name: "Netherlands", count: 96, value: "98.20 Cr", score: 77.1 },
  { code: "GB", name: "United Kingdom", count: 89, value: "85.60 Cr", score: 75.9 },
];

const opportunitiesData = [
  { id: "OPP-2025-1248", code: "8517", prod: "Smartphones", type: "Unmet Demand", typeBg: "bg-emerald-50 text-emerald-700", countryCode: "US", country: "USA", value: "98.45 Cr", score: 92, growth: "High", comp: "Medium", compColor: "bg-amber-50 text-amber-700" },
  { id: "OPP-2025-1247", code: "8504", prod: "Electric Transformers", type: "Supplier Gap", typeBg: "bg-blue-50 text-blue-700", countryCode: "AE", country: "UAE", value: "76.32 Cr", score: 89, growth: "High", comp: "Low", compColor: "bg-emerald-50 text-emerald-700" },
  { id: "OPP-2025-1246", code: "8421", prod: "Industrial Machinery", type: "Market Growth", typeBg: "bg-indigo-50 text-indigo-700", countryCode: "DE", country: "Germany", value: "64.20 Cr", score: 87, growth: "High", comp: "High", compColor: "bg-rose-50 text-rose-700" },
  { id: "OPP-2025-1245", code: "3926", prod: "Plastic Articles", type: "Price Advantage", typeBg: "bg-amber-50 text-amber-700", countryCode: "NL", country: "Netherlands", value: "48.75 Cr", score: 84, growth: "Medium", comp: "Low", compColor: "bg-emerald-50 text-emerald-700" },
  { id: "OPP-2025-1244", code: "7208", prod: "Flat Rolled Products", type: "Supplier Gap", typeBg: "bg-blue-50 text-blue-700", countryCode: "GB", country: "UK", value: "38.60 Cr", score: 82, growth: "Medium", comp: "Medium", compColor: "bg-amber-50 text-amber-700" },
];

const hsCodesData = [
  { code: "8517", desc: "Telephones for cellular networks", value: "132.45 Cr" },
  { code: "8504", desc: "Electric transformers", value: "112.36 Cr" },
  { code: "8421", desc: "Centrifuges, including dryers", value: "98.25 Cr" },
  { code: "3926", desc: "Plastic articles and fittings", value: "76.40 Cr" },
  { code: "7208", desc: "Flat rolled products of iron", value: "68.75 Cr" },
];

export default function TradeOpportunity() {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="overflow-y-auto bg-slate-50/50 p-3 md:p-6 font-sans text-slate-700 antialiased">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col gap-4 border-b border-slate-200/60 pb-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-xl md:text-2xl font-black tracking-tight text-[#07156B]">
            Trade Opportunity Engine
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-1 font-medium">
            Discover high-potential trade opportunities powered by data, demand-supply gaps and market intelligence.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start lg:self-center">
          <button className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 shadow-xs hover:bg-slate-50 transition">
            <Calendar size={14} className="text-slate-400" />
            <span>01 Apr 2025 - 24 Apr 2025</span>
          </button>
          <button className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 shadow-xs hover:bg-slate-50 transition">
            <Download size={14} className="text-slate-400" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* FILTER BAR BAR */}
      <div className="bg-white border border-slate-100 rounded-2xl p-3 shadow-xs mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:flex lg:flex-wrap items-center gap-2">
        {[
          { label: "Opportunity", val: "All Types" },
          { label: "Trade Type", val: "All (Import/Export)" },
          { label: "Product / HS Code", val: "All Products" },
          { label: "Country", val: "All Countries" },
          { label: "Min. Opportunity Score", val: "All Scores" },
          { label: "Est. Trade Value (INR)", val: "All Values" }
        ].map((f, i) => (
          <div key={i} className="flex flex-col flex-1 min-w-[140px]">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{f.label}</span>
            <div className="flex items-center justify-between border border-slate-200 rounded-lg px-2.5 py-1.5 bg-white text-xs font-semibold text-slate-700 cursor-pointer">
              <span className="truncate">{f.val}</span>
              <ChevronDown size={14} className="text-slate-400 ml-1 shrink-0" />
            </div>
          </div>
        ))}
        <div className="flex items-center gap-2 pt-4 lg:pt-0 w-full lg:w-auto ml-auto">
          <button className="flex-1 lg:flex-none flex items-center justify-center gap-1 bg-white border border-slate-200 text-slate-600 font-bold text-xs px-3 py-2 rounded-xl hover:bg-slate-50">
            <Filter size={13} /> More Filters
          </button>
          <button className="flex-1 lg:flex-none bg-blue-600 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-xs hover:bg-blue-700 transition">
            Apply Filters
          </button>
          <button className="text-slate-400 font-bold text-xs hover:text-slate-600 px-1">Reset</button>
        </div>
      </div>

      {/* NAVIGATION TABS */}
      <div className="flex items-center gap-1 overflow-x-auto border-b border-slate-200/60 mt-5 no-scrollbar">
        {["Overview", "High Potential Opportunities", "By Product", "By Country", "Demand-Supply Gap", "Competitor Gap", "Saved Opportunities"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`whitespace-nowrap pb-2.5 px-3 text-xs md:text-sm font-bold border-b-2 transition-all ${
              activeTab === tab
                ? "border-blue-600 text-blue-600 font-extrabold"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* KPI METRICS GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mt-5">
        {kpiData.map((kpi) => {
          const IconComponent = kpi.icon;
          return (
            <div key={kpi.id} className="bg-white border border-slate-100 rounded-2xl p-3 shadow-xs flex items-start gap-2.5 relative overflow-hidden">
              <div className={`p-2 rounded-xl ${kpi.bg} ${kpi.color} shrink-0`}>
                <IconComponent size={16} />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-bold text-slate-400 block uppercase leading-tight truncate">{kpi.title}</span>
                <span className="text-base font-black text-slate-800 mt-1 block tracking-tight">{kpi.value}</span>
                <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5 mt-0.5">
                  <TrendingUp size={10} /> {kpi.change} <span className="text-slate-400 font-medium">vs last month</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* SECOND ROW: MAP CHART & DISTRIBUTION METERS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        
        {/* CARD 1: TOP COUNTRIES */}
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-extrabold text-sm text-[#07156B] mb-3 flex items-center gap-1.5">
              Top Opportunity Countries
            </h3>
            <div className="w-full text-left border-collapse">
              <div className="grid grid-cols-12 text-[10px] font-bold uppercase text-slate-400 pb-2 border-b border-slate-100">
                <span className="col-span-4">Country</span>
                <span className="col-span-3 text-right">Opps</span>
                <span className="col-span-3 text-right">Value (INR)</span>
                <span className="col-span-2 text-right">Score</span>
              </div>
              <div className="divide-y divide-slate-50">
                {countriesData.map((c) => (
                  <div key={c.code} className="grid grid-cols-12 text-xs py-2.5 font-semibold items-center">
                    <div className="col-span-4 flex items-center gap-1.5 font-bold text-slate-700">
                      <ReactCountryFlag countryCode={c.code} svg style={{ width: "14px", height: "10px", borderRadius: "2px", objectFit: "cover" }} />
                      <span className="truncate">{c.name}</span>
                    </div>
                    <span className="col-span-3 text-right text-slate-600 font-medium">{c.count}</span>
                    <span className="col-span-3 text-right text-slate-800 font-bold">₹{c.value}</span>
                    <span className="col-span-2 text-right text-blue-600 font-bold">{c.score}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button className="text-blue-600 text-xs font-bold text-center mt-3 pt-2 border-t border-slate-100 flex items-center justify-center gap-1 hover:text-blue-700">
            View All Countries →
          </button>
        </div>

        {/* CARD 2: DONUT / CIRCULAR CHART */}
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-extrabold text-sm text-[#07156B] mb-4 flex items-center gap-1.5">
              Opportunity Distribution
            </h3>
            <div className="relative flex justify-center items-center my-2">
              <div className="w-32 h-32 rounded-full border-[14px] border-slate-100 flex flex-col items-center justify-center relative">
                {/* Simulated Donut Segments with absolute clip borders */}
                <div className="absolute inset-0 rounded-full border-[14px] border-transparent border-t-emerald-500 border-r-emerald-500 rotate-45"></div>
                <div className="absolute inset-0 rounded-full border-[14px] border-transparent border-b-blue-500 border-l-blue-500 -rotate-45"></div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total</span>
                <span className="text-lg font-black text-slate-800">1,245</span>
              </div>
            </div>
            <div className="space-y-2 mt-4 text-xs font-bold">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-slate-500">High Potential</span>
                </div>
                <span className="text-slate-800">356 (28.5%)</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  <span className="text-slate-500">Medium Potential</span>
                </div>
                <span className="text-slate-800">542 (43.4%)</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span className="text-slate-500">Low Potential</span>
                </div>
                <span className="text-slate-800">350 (28.1%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 3: TREND SPARKLINE */}
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-extrabold text-sm text-[#07156B]">Opportunity Score Trend</h3>
              <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-md text-[10px] font-bold text-slate-500 cursor-pointer">
                <span>This Month</span> <ChevronDown size={10} />
              </div>
            </div>
            {/* Custom SVG Line Graph */}
            <div className="h-28 w-full relative mt-2">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 100 40" preserveAspectRatio="none">
                <path d="M 0 30 Q 20 22 40 25 T 80 18 T 100 12" fill="none" stroke="#10b981" strokeWidth="1.5" />
                <path d="M 0 30 Q 20 22 40 25 T 80 18 T 100 12 L 100 40 L 0 40 Z" fill="url(#grad)" opacity="0.06" />
                <defs>
                  <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <circle cx="20" cy="24" r="1" fill="#10b981" />
                <circle cx="40" cy="25" r="1" fill="#10b981" />
                <circle cx="60" cy="20" r="1" fill="#10b981" />
                <circle cx="80" cy="18" r="1" fill="#10b981" />
              </svg>
              <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[8px] font-bold text-slate-400 px-1">
                <span>01 Apr</span><span>06 Apr</span><span>11 Apr</span><span>16 Apr</span><span>21 Apr</span><span>24 Apr</span>
              </div>
            </div>
            <div className="bg-emerald-50/60 border border-emerald-100 rounded-xl p-2.5 mt-4 flex items-center justify-between">
              <div>
                <span className="text-[9px] font-bold text-slate-400 block uppercase">Avg Opportunity Score</span>
                <span className="text-sm font-black text-slate-800">78.6 / 100</span>
              </div>
              <span className="text-[10px] font-extrabold text-emerald-600 flex items-center gap-0.5">
                <TrendingUp size={11} /> 6.8 pts vs last month
              </span>
            </div>
          </div>
        </div>

        {/* CARD 4: OPPORTUNITY BY TYPE */}
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-extrabold text-sm text-[#07156B] mb-4">Opportunity by Type</h3>
            <div className="space-y-3">
              {[
                { title: "Unmet Demand", value: "512 (41.0%)", color: "bg-blue-50 text-blue-600" },
                { title: "Supplier Gap", value: "318 (25.5%)", color: "bg-indigo-50 text-indigo-600" },
                { title: "Price Advantage", value: "246 (19.7%)", color: "bg-emerald-50 text-emerald-600" },
                { title: "Market Growth", value: "172 (13.8%)", color: "bg-orange-50 text-orange-600" }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${item.color}`}>
                      <Percent size={13} />
                    </div>
                    <span className="text-xs font-bold text-slate-600">{item.title}</span>
                  </div>
                  <span className="text-xs font-extrabold text-slate-800">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
          <button className="text-blue-600 text-xs font-bold text-center mt-3 pt-2 border-t border-slate-100 flex items-center justify-center gap-1 hover:text-blue-700">
            View All Types →
          </button>
        </div>

      </div>

      {/* THIRD ROW: MAIN TABLE GRID AND HS CODES ASIDE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
        
        {/* TOP TRADE OPPORTUNITIES TABLE */}
        <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-xs lg:col-span-2 overflow-hidden flex flex-col justify-between">
          <div>
            <h3 className="font-extrabold text-sm text-[#07156B] mb-4 flex items-center gap-2">
              <Anchor size={15} className="text-blue-600" /> Top Trade Opportunities
            </h3>
            <div className="overflow-x-auto -mx-4 px-4 no-scrollbar">
              <table className="w-full text-left text-xs whitespace-nowrap">
                <thead>
                  <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                    <th className="pb-2.5 font-bold">Opportunity ID</th>
                    <th className="pb-2.5 font-bold">Product / HS Code</th>
                    <th className="pb-2.5 font-bold">Opportunity Type</th>
                    <th className="pb-2.5 font-bold">Country</th>
                    <th className="pb-2.5 font-bold text-right">Est. Trade Value (INR)</th>
                    <th className="pb-2.5 font-bold text-center">Score</th>
                    <th className="pb-2.5 font-bold text-center">Growth</th>
                    <th className="pb-2.5 font-bold text-center">Competition</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {opportunitiesData.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50/50 transition">
                      <td className="py-3 font-bold text-slate-800 flex items-center gap-1">
                        <Star size={12} className="text-slate-300 cursor-pointer hover:text-amber-400" />
                        <div className="flex flex-col">
                          <span>{row.id}</span>
                        </div>
                      </td>
                      <td className="py-3">
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-800">{row.code}</span>
                          <span className="text-[10px] text-slate-400 font-medium">{row.prod}</span>
                        </div>
                      </td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${row.typeBg}`}>
                          {row.type}
                        </span>
                      </td>
                      <td className="py-3 font-bold text-slate-700">
                        <div className="flex items-center gap-1.5">
                          <ReactCountryFlag countryCode={row.countryCode} svg style={{ width: "13px", height: "9px" }} />
                          <span>{row.country}</span>
                        </div>
                      </td>
                      <td className="py-3 font-black text-slate-800 text-right">₹{row.value}</td>
                      <td className="py-3 text-center">
                        <span className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-600 font-extrabold text-[11px]">
                          {row.score}
                        </span>
                      </td>
                      <td className="py-3 text-center">
                        <span className="text-emerald-600 font-bold">{row.growth}</span>
                      </td>
                      <td className="py-3 text-center">
                        <span className={`px-2 py-0.5 rounded-sm text-[10px] font-bold ${row.compColor}`}>
                          {row.comp}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <button className="text-blue-600 text-xs font-bold text-center mt-4 pt-2 border-t border-slate-100 flex items-center justify-center gap-1 hover:text-blue-700">
            View All Opportunities →
          </button>
        </div>

        {/* TOP HS CODES COLUMN */}
        <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-extrabold text-sm text-[#07156B] mb-4">Top HS Codes by Opportunity Value</h3>
            <div className="w-full">
              <div className="grid grid-cols-12 text-[10px] font-bold uppercase text-slate-400 pb-2 border-b border-slate-100">
                <span className="col-span-3">HS Code</span>
                <span className="col-span-6">Product Description</span>
                <span className="col-span-3 text-right">Est. Value</span>
              </div>
              <div className="divide-y divide-slate-100">
                {hsCodesData.map((item, i) => (
                  <div key={i} className="grid grid-cols-12 text-xs py-3 items-center">
                    <span className="col-span-3 font-black text-slate-800">{item.code}</span>
                    <span className="col-span-6 text-slate-500 font-semibold truncate pr-2">{item.desc}</span>
                    <span className="col-span-3 text-right font-black text-slate-800">₹{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button className="text-blue-600 text-xs font-bold text-center mt-3 pt-2 border-t border-slate-100 flex items-center justify-center gap-1 hover:text-blue-700">
            View All HS Codes →
          </button>
        </div>

      </div>

      {/* FOURTH ROW: GAP INSIGHTS, RECOMMENDATIONS, SAVED SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        
        {/* GAP INSIGHTS BOX */}
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-xs">
          <h3 className="font-extrabold text-sm text-[#07156B] mb-3">Demand-Supply Gap Insights</h3>
          <div className="space-y-2.5">
            {[
              { label: "Total Demand (INR)", val: "₹ 2,458.60 Cr", trend: "15.6% vs last month", border: "border-slate-100 bg-slate-50/50" },
              { label: "Total Supply (INR)", val: "₹ 1,245.80 Cr", trend: "10.2% vs last month", border: "border-slate-100 bg-slate-50/50" },
              { label: "Total Gap (INR)", val: "₹ 1,212.80 Cr", trend: "20.5% vs last month", border: "border-amber-100 bg-amber-50/20" }
            ].map((box, i) => (
              <div key={i} className={`border rounded-xl p-2.5 ${box.border}`}>
                <span className="text-[9px] font-bold text-slate-400 block uppercase">{box.label}</span>
                <span className="text-sm font-black text-slate-800 mt-0.5 block">{box.val}</span>
                <span className="text-[9px] font-bold text-emerald-600 flex items-center gap-0.5 mt-0.5">
                  <TrendingUp size={9} /> {box.trend}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* COUNTRY METRICS MINI-LIST */}
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-xs">
          <h3 className="font-extrabold text-sm text-[#07156B] mb-3">Top Opportunity Countries</h3>
          <div className="divide-y divide-slate-50">
            {countriesData.slice(0, 3).map((c) => (
              <div key={c.code} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-2 font-bold text-slate-700 text-xs">
                  <ReactCountryFlag countryCode={c.code} svg style={{ width: "14px", height: "10px" }} />
                  <span>{c.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-black text-slate-800 block">₹{c.value}</span>
                  <span className="text-[10px] text-slate-400 font-bold">{c.score} Score</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RECOMMENDED ACTIONS */}
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-extrabold text-sm text-[#07156B] mb-3">Recommended Actions</h3>
            <div className="space-y-2.5">
              {[
                { text: "Focus on 356 high potential opportunities", btn: "View Opportunities" },
                { text: "Explore untapped markets in Africa & LATAM", btn: "View Markets" },
                { text: "Strengthen position in 18 growing product categories", btn: "View Products" }
              ].map((act, i) => (
                <div key={i} className="flex items-start justify-between gap-2 border-b border-slate-50 pb-2 last:border-0">
                  <div className="flex items-start gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                    <p className="text-xs font-bold text-slate-600 leading-tight">{act.text}</p>
                  </div>
                  <button className="text-[10px] font-black text-blue-600 bg-blue-50 hover:bg-blue-100 px-2 py-1 rounded-md shrink-0 transition">
                    {act.btn}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SAVED OPPORTUNITIES METRIC */}
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-extrabold text-sm text-[#07156B] mb-2">Saved Opportunities</h3>
            <div className="flex items-center justify-between bg-slate-50 border border-slate-100 rounded-2xl p-4 mt-2">
              <div>
                <span className="text-3xl font-black text-slate-800">24</span>
                <span className="text-[10px] font-bold text-slate-400 block uppercase mt-0.5">opportunities saved</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                <BarChart3 size={18} />
              </div>
            </div>
          </div>
          <button className="text-blue-600 text-xs font-bold text-left mt-3 flex items-center gap-1 hover:text-blue-700">
            View Saved Opportunities <ArrowUpRight size={14} />
          </button>
        </div>

      </div>

      {/* FOOTER BAR */}
      <div className="mt-6 border-t border-slate-200/60 pt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] font-bold text-slate-400 gap-2">
        <div className="flex items-center gap-1">
          <HelpCircle size={13} />
          <span>All data is updated daily. Last updated on 24 Apr 2025, 09:30 AM</span>
        </div>
        <span className="hover:text-slate-600 cursor-pointer">Help Center</span>
      </div>

    </div>
  );
}