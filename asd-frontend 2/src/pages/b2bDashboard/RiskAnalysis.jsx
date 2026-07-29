import React, { useState } from "react";
import ReactCountryFlag from "react-country-flag";
import {
  CalendarDays,
  Download,
  ChevronDown,
  Search,
  Sliders,
  Gauge,
  AlertTriangle,
  ShieldCheck,
  Target,
  PackageSearch,
  ListChecks,
  Plus,
  Minus,
  RotateCw,
  Info,
  HelpCircle,
  ChevronRight,
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

const HEADING = "text-[#07156B]";

const COUNTRY_CODES = {
  China: "CN",
  USA: "US",
  Russia: "RU",
  India: "IN",
  UAE: "AE",
  Germany: "DE",
  Iran: "IR",
  Turkey: "TR",
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

function RiskBadge({ level }) {
  const styles = {
    "Very High": "bg-rose-100 text-rose-600",
    High: "bg-orange-100 text-orange-600",
    Medium: "bg-amber-50 text-amber-600",
    Low: "bg-green-100 text-green-600",
  };
  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${styles[level]}`}>
      {level}
    </span>
  );
}

function StatusBadge({ status }) {
  const styles = {
    "In Transit": "bg-blue-100 text-blue-600",
    Delayed: "bg-amber-100 text-amber-600",
    "At Risk": "bg-rose-100 text-rose-600",
    Pending: "bg-orange-100 text-orange-600",
  };
  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${styles[status]}`}>
      {status}
    </span>
  );
}

const KPI_STATS = [
  { title: "Overall Risk Score", value: "56 / 100", change: "Moderate Risk", icon: Gauge, bg: "bg-amber-50", color: "text-amber-500", tag: true },
  { title: "High Risk Alerts", value: "18", change: "▲ 12 vs last month", icon: AlertTriangle, bg: "bg-rose-50", color: "text-rose-500" },
  { title: "Medium Risk Alerts", value: "32", change: "▲ 6 vs last month", icon: AlertTriangle, bg: "bg-amber-50", color: "text-amber-500" },
  { title: "Low Risk Alerts", value: "54", change: "▲ 8 vs last month", icon: ShieldCheck, bg: "bg-emerald-50", color: "text-emerald-500" },
  { title: "Countries at High Risk", value: "7", change: "▲ 2 vs last month", icon: Target, bg: "bg-blue-50", color: "text-blue-500" },
  { title: "Shipments Affected", value: "124", change: "₹98.75 Cr", icon: PackageSearch, bg: "bg-orange-50", color: "text-orange-500", plain: true },
  { title: "Watchlist Entities", value: "26", change: "▲ 5 vs last month", icon: ListChecks, bg: "bg-blue-50", color: "text-blue-500" },
];

const MAP_LEGEND = [
  { label: "Very High", color: "#EF4444" },
  { label: "High", color: "#F87171" },
  { label: "Medium", color: "#F59E0B" },
  { label: "Low", color: "#10B981" },
  { label: "Very Low / Stable", color: "#3B82F6" },
  { label: "No Data", color: "#CBD5E1" },
];

const MAP_BLOBS = [
  { top: "18%", left: "45%", w: "26%", h: "20%", color: "#EF4444", rotate: "-6deg" },
  { top: "26%", left: "12%", w: "9%", h: "8%", color: "#10B981", rotate: "10deg" },
  { top: "37%", left: "63%", w: "13%", h: "14%", color: "#F59E0B", rotate: "0deg" },
  { top: "38%", left: "55%", w: "4%", h: "5%", color: "#F87171", rotate: "0deg" },
  { top: "56%", left: "26%", w: "8%", h: "12%", color: "#3B82F6", rotate: "-8deg" },
];

const RISK_DISTRIBUTION = [
  { name: "Very High (0-25)", value: 12, percent: "11.5%", color: "#2563EB" },
  { name: "High (26-50)", value: 24, percent: "23.1%", color: "#EF4444" },
  { name: "Medium (51-75)", value: 36, percent: "34.6%", color: "#F59E0B" },
  { name: "Low (76-100)", value: 20, percent: "19.2%", color: "#10B981" },
  { name: "Very Low / Stable", value: 12, percent: "11.5%", color: "#7DD3FC" },
];

const TOP_RISKY_COUNTRIES = [
  { country: "Iran", score: 18, level: "Very High", trend: "↑ 5" },
  { country: "Russia", score: 22, level: "Very High", trend: "—" },
  { country: "Syria", score: 25, level: "Very High", trend: "↑ 3" },
  { country: "Ukraine", score: 32, level: "High", trend: "↑ 4" },
  { country: "Yemen", score: 35, level: "High", trend: "—" },
  { country: "Venezuela", score: 38, level: "High", trend: "↑ 2" },
  { country: "Myanmar", score: 42, level: "High", trend: "↑ 1" },
  { country: "Sudan", score: 45, level: "High", trend: "↑ 3" },
];

const RISK_BY_CATEGORY = [
  { name: "Political Risk", value: 64, level: "High" },
  { name: "Regulatory Risk", value: 52, level: "Medium" },
  { name: "Economic Risk", value: 48, level: "Medium" },
  { name: "Security Risk", value: 60, level: "High" },
  { name: "Supply Chain Risk", value: 55, level: "Medium" },
  { name: "Compliance Risk", value: 50, level: "Medium" },
  { name: "Natural Disaster Risk", value: 38, level: "Low" },
];

const RECENT_ALERTS = [
  { text: "New sanctions imposed on Russia. US adds 120+ entities to sanction list.", tag: "Country: Russia", date: "24 Apr 2025", level: "Very High" },
  { text: "Red Sea shipping disruptions. Multiple attacks reported near Bab el-Mandeb.", tag: "Region: Red Sea", date: "23 Apr 2025", level: "High" },
  { text: "Export restrictions on rare earth materials. China tightens export controls.", tag: "Country: China", date: "22 Apr 2025", level: "High" },
  { text: "Banking restrictions in Iran. International transactions may be affected.", tag: "Country: Iran", date: "21 Apr 2025", level: "Very High" },
  { text: "Port congestion in Rotterdam. Delays expected due to labor strikes.", tag: "Country: Netherlands", date: "20 Apr 2025", level: "Medium" },
];

const RISK_TREND = [
  { date: "01 Apr", score: 68 },
  { date: "06 Apr", score: 70 },
  { date: "11 Apr", score: 66 },
  { date: "16 Apr", score: 74 },
  { date: "21 Apr", score: 72 },
  { date: "24 Apr", score: 78.6 },
];

const TOP_RISKY_HS = [
  { code: "8703", desc: "Motor Cars", score: 72, level: "High" },
  { code: "8517", desc: "Telephones", score: 68, level: "High" },
  { code: "8708", desc: "Parts of Motor Vehicles", score: 65, level: "High" },
  { code: "8471", desc: "Auto Data Processing Units", score: 62, level: "High" },
  { code: "8525", desc: "Transmission Apparatus", score: 58, level: "Medium" },
  { code: "3917", desc: "Plastic Tubes & Pipes", score: 54, level: "Medium" },
  { code: "3004", desc: "Medicaments", score: 52, level: "Medium" },
];

const SHIPMENTS_AT_RISK = [
  { id: "SHP-2025-1045", date: "24 Apr 2025", from: "China", to: "USA", hs: "8517", desc: "Telephones", level: "High", score: 68, factors: "Regulatory, Supply Chain", impact: "₹12.45 Cr", status: "In Transit" },
  { id: "SHP-2025-1038", date: "23 Apr 2025", from: "Russia", to: "India", hs: "8703", desc: "Motor Cars", level: "Very High", score: 72, factors: "Political, Compliance", impact: "₹8.75 Cr", status: "Delayed" },
  { id: "SHP-2025-1027", date: "22 Apr 2025", from: "UAE", to: "Germany", hs: "7208", desc: "Flat Rolled Products", level: "High", score: 60, factors: "Economic, Supply Chain", impact: "₹5.32 Cr", status: "At Risk" },
  { id: "SHP-2025-1019", date: "21 Apr 2025", from: "Iran", to: "Turkey", hs: "3917", desc: "Plastic Tubes & Pipes", level: "High", score: 58, factors: "Regulatory, Compliance", impact: "₹3.15 Cr", status: "Pending" },
];

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
      <h3 className={`font-bold text-sm ${HEADING}`}>{title}</h3>
      <button className="text-blue-600 text-[11px] font-bold shrink-0">View All</button>
    </div>
  );
}

export default function RiskAnalysis() {
  const totalCountries = RISK_DISTRIBUTION.reduce((a, b) => a + b.value, 0);

  return (
    <div className="min-h-screen w-full overflow-y-auto bg-[#F8FAFC] text-slate-600 font-sans antialiased">
      <div className="max-w-[1400px] mx-auto p-3 sm:p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-4">
          <div>
            <h1 className={`text-xl sm:text-2xl font-bold tracking-tight ${HEADING}`}>Risk Analysis</h1>
            <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">
              Identify, assess and monitor risks that may impact your global trade operations.
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

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3 mb-5">
          {KPI_STATS.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="bg-white border border-slate-100 p-3 sm:p-3.5 rounded-2xl shadow-xs flex flex-col justify-between hover:shadow-md transition duration-200">
                <div className="flex justify-between items-start gap-2">
                  <span className={`text-[10px] sm:text-[11px] font-semibold leading-tight ${HEADING}`}>{stat.title}</span>
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${stat.bg} ${stat.color}`}>
                    <Icon size={14} />
                  </div>
                </div>
                <div className="mt-2.5">
                  <h4 className={`text-sm sm:text-base font-extrabold tracking-tight ${HEADING}`}>{stat.value}</h4>
                  {stat.tag ? (
                    <span className="text-[9px] font-bold inline-block mt-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-600">
                      {stat.change}
                    </span>
                  ) : (
                    <span className={`text-[9px] font-bold block mt-0.5 ${stat.plain ? "text-slate-400" : "text-green-500"}`}>
                      {stat.change}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <SectionCard className="mb-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 items-end">
            <div>
              <label className="text-[10px] text-slate-400 font-bold block mb-1.5 uppercase">Risk Type</label>
              <div className="relative">
                <input
                  defaultValue="All Risk Types"
                  className="w-full bg-slate-50/70 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs focus:outline-none"
                />
                <Search size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </div>
            <div>
              <label className="text-[10px] text-slate-400 font-bold block mb-1.5 uppercase">Country / Region</label>
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

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-5">
          <SectionCard>
            <h3 className={`font-bold text-sm mb-3 ${HEADING}`}>Global Risk Map</h3>
            <div className="relative h-[260px] sm:h-[300px] bg-slate-50 rounded-xl overflow-hidden border border-slate-100">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg"
                alt="world map"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ filter: "grayscale(1) brightness(0) invert(0.85)" }}
              />
              {MAP_BLOBS.map((b, i) => (
                <div
                  key={i}
                  className="absolute rounded-[40%] opacity-90"
                  style={{
                    top: b.top,
                    left: b.left,
                    width: b.w,
                    height: b.h,
                    backgroundColor: b.color,
                    transform: `rotate(${b.rotate})`,
                  }}
                />
              ))}
              <div className="absolute bottom-2 left-2 bg-white/95 rounded-lg p-2 shadow border border-slate-100">
                <span className="text-[9px] font-bold text-slate-400 uppercase block mb-1">Risk Level</span>
                <div className="space-y-0.5">
                  {MAP_LEGEND.map((l, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-[9px] text-slate-500 font-medium">
                      <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: l.color }} />
                      {l.label}
                    </div>
                  ))}
                </div>
              </div>
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
          </SectionCard>

          <SectionCard>
            <h3 className={`font-bold text-sm mb-3 ${HEADING}`}>Risk Score Distribution</h3>
            <div className="flex items-center gap-3">
              <div className="relative w-[130px] h-[130px] shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={RISK_DISTRIBUTION} innerRadius={38} outerRadius={58} dataKey="value" stroke="none">
                      {RISK_DISTRIBUTION.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-[8px] text-slate-400 font-bold uppercase leading-none">Total</span>
                  <span className={`font-black text-lg ${HEADING}`}>{totalCountries}</span>
                  <span className="text-[8px] text-slate-400 font-bold uppercase leading-none">Countries</span>
                </div>
              </div>
              <div className="space-y-2 flex-1 text-[10px]">
                {RISK_DISTRIBUTION.map((r, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: r.color }} />
                      <span className="text-slate-600 font-semibold">{r.name}</span>
                    </div>
                    <span className={`font-bold ${HEADING}`}>{r.value} ({r.percent})</span>
                  </div>
                ))}
              </div>
            </div>
          </SectionCard>

          <SectionCard>
            <ViewAllHeader title="Top Risky Countries" />
            <div className="overflow-x-auto">
              <table className="w-full text-[11px] min-w-[280px]">
                <thead>
                  <tr className="text-[9px] text-slate-400 uppercase font-bold">
                    <th className="text-left pb-2 font-bold">Country</th>
                    <th className="text-right pb-2 font-bold">Score</th>
                    <th className="text-left pb-2 pl-3 font-bold">Level</th>
                    <th className="text-right pb-2 font-bold">Trend</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {TOP_RISKY_COUNTRIES.map((c, i) => (
                    <tr key={i}>
                      <td className={`py-2 font-semibold whitespace-nowrap ${HEADING}`}>{c.country}</td>
                      <td className="py-2 text-right font-bold text-slate-700">{c.score}</td>
                      <td className="py-2 pl-3"><RiskBadge level={c.level} /></td>
                      <td className="py-2 text-right font-bold text-rose-500 whitespace-nowrap">{c.trend}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-5">
          <SectionCard>
            <h3 className={`font-bold text-sm mb-3 ${HEADING}`}>Risk by Category</h3>
            <div className="space-y-3">
              {RISK_BY_CATEGORY.map((c, i) => (
                <div key={i} className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-slate-700">{c.name}</span>
                  <div className="flex items-center gap-2">
                    <span className={`font-bold ${HEADING}`}>{c.value}</span>
                    <RiskBadge level={c.level} />
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard>
            <ViewAllHeader title="Recent High Risk Alerts" />
            <div className="space-y-2.5">
              {RECENT_ALERTS.map((a, i) => (
                <div key={i} className="flex items-start justify-between gap-2 border border-slate-100 rounded-xl p-2.5">
                  <div className="flex items-start gap-2">
                    <AlertTriangle size={13} className="text-rose-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[11px] text-slate-700 font-semibold leading-snug">{a.text}</p>
                      <p className="text-[10px] text-slate-400 font-medium mt-0.5">{a.tag} • {a.date}</p>
                    </div>
                  </div>
                  <RiskBadge level={a.level} />
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard>
            <div className="flex justify-between items-center mb-3">
              <h3 className={`font-bold text-sm ${HEADING}`}>Risk Trend <span className="text-slate-400 font-normal text-xs">(Overall Score)</span></h3>
              <button className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg px-2 py-1 text-[10px] font-semibold text-slate-600 shrink-0">
                This Month <ChevronDown size={11} className="text-slate-400" />
              </button>
            </div>
            <div className="h-[150px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={RISK_TREND} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <CartesianGrid stroke="#F1F5F9" vertical={false} />
                  <XAxis dataKey="date" tick={{ fill: "#94a3b8", fontSize: 8 }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fill: "#94a3b8", fontSize: 9 }} tickLine={false} axisLine={false} width={30} domain={[0, 100]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="score" stroke="#EF4444" strokeWidth={2} dot={{ fill: "#EF4444", r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-rose-50 border border-rose-100 rounded-xl p-2.5 mt-2">
              <span className="text-[10px] text-slate-500 font-semibold block">Average Risk Score</span>
              <div className="flex items-center gap-2">
                <span className={`text-base font-black ${HEADING}`}>78.6 / 100</span>
                <span className="text-[10px] text-rose-500 font-bold">▲ 6.8 pts vs last month</span>
              </div>
            </div>
          </SectionCard>

          <SectionCard>
            <ViewAllHeader title="Top Risky HS Codes" />
            <div className="overflow-x-auto">
              <table className="w-full text-[11px] min-w-[260px]">
                <thead>
                  <tr className="text-[9px] text-slate-400 uppercase font-bold">
                    <th className="text-left pb-2 font-bold">HS Code</th>
                    <th className="text-left pb-2 font-bold">Description</th>
                    <th className="text-right pb-2 font-bold">Score</th>
                    <th className="text-left pb-2 pl-2 font-bold">Level</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {TOP_RISKY_HS.map((h, i) => (
                    <tr key={i}>
                      <td className={`py-2 font-semibold whitespace-nowrap ${HEADING}`}>{h.code}</td>
                      <td className="py-2 text-slate-600">{h.desc}</td>
                      <td className="py-2 text-right font-bold text-slate-700">{h.score}</td>
                      <td className="py-2 pl-2"><RiskBadge level={h.level} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>
        </div>

        <SectionCard className="mb-4">
          <h3 className={`font-bold text-sm mb-3 ${HEADING}`}>Shipments at Risk</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-[11px] min-w-[980px]">
              <thead>
                <tr className="text-[9px] text-slate-400 uppercase font-bold border-b border-slate-100">
                  <th className="text-left py-2 font-bold">Shipment ID</th>
                  <th className="text-left py-2 font-bold">Date</th>
                  <th className="text-left py-2 font-bold">From</th>
                  <th className="text-left py-2 font-bold">To</th>
                  <th className="text-left py-2 font-bold">HS Code</th>
                  <th className="text-left py-2 font-bold">Product Description</th>
                  <th className="text-left py-2 font-bold">Risk Level</th>
                  <th className="text-right py-2 font-bold">Risk Score</th>
                  <th className="text-left py-2 font-bold">Risk Factors</th>
                  <th className="text-right py-2 font-bold">Est. Impact</th>
                  <th className="text-left py-2 font-bold">Status</th>
                  <th className="text-right py-2 font-bold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {SHIPMENTS_AT_RISK.map((s, i) => (
                  <tr key={i}>
                    <td className={`py-2.5 font-semibold whitespace-nowrap ${HEADING}`}>{s.id}</td>
                    <td className="py-2.5 text-slate-500 whitespace-nowrap">{s.date}</td>
                    <td className="py-2.5 whitespace-nowrap">
                      <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                        <Flag country={s.from} /> {s.from}
                      </span>
                    </td>
                    <td className="py-2.5 whitespace-nowrap">
                      <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                        <Flag country={s.to} /> {s.to}
                      </span>
                    </td>
                    <td className="py-2.5 text-slate-600 whitespace-nowrap">{s.hs}</td>
                    <td className="py-2.5 text-slate-600 whitespace-nowrap">{s.desc}</td>
                    <td className="py-2.5"><RiskBadge level={s.level} /></td>
                    <td className="py-2.5 text-right font-bold text-slate-700">{s.score}</td>
                    <td className="py-2.5 text-slate-500 whitespace-nowrap">{s.factors}</td>
                    <td className="py-2.5 text-right font-bold text-slate-800 whitespace-nowrap">{s.impact}</td>
                    <td className="py-2.5"><StatusBadge status={s.status} /></td>
                    <td className="py-2.5 text-right">
                      <button className={`flex items-center gap-1 border border-slate-200 rounded-lg px-2.5 py-1 text-[10px] font-bold ml-auto ${HEADING}`}>
                        View <ChevronRight size={11} />
                      </button>
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