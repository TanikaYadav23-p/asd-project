import { useState } from "react";
import {
  CalendarDays,
  Download,
  Search,
  ChevronDown,
  Sliders,
  Building2,
  TrendingUp,
  Globe,
  Truck,
  Users,
  MapPin,
  CheckCircle2,
  Briefcase,
  Hash,
  Clock,
  IndianRupee,
  ArrowUpRight,
  Package,
} from "lucide-react";
import ReactCountryFlag from "react-country-flag";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const KPI_STATS = [
  { title: "Total Shipment", value: "8,742", change: "▲ 18.6% vs last month", isUp: true, icon: Truck, bg: "bg-blue-50", color: "text-blue-500" },
  { title: "Total Trade Value (INR)", value: "₹3,203.45 Cr", change: "▲ 18.6% vs last month", isUp: true, icon: IndianRupee, bg: "bg-emerald-50", color: "text-emerald-500" },
  { title: "Total Shipments", value: "2.45 L", change: "▲ 12.3% vs last month", isUp: true, icon: Users, bg: "bg-purple-50", color: "text-purple-500" },
  { title: "Total Trade Value (INR)", value: "₹3,203.45 Cr", change: "▲ 14.7% vs last month", isUp: true, icon: Truck, bg: "bg-orange-50", color: "text-orange-500" },
  { title: "Countries Covered", value: "68", change: "▲ 9.4% vs last month", isUp: true, icon: Globe, bg: "bg-purple-50", color: "text-purple-500" },
  { title: "Avg. Shipment Value (INR)", value: "₹14.26 L", change: "▼ 3.2% vs last month", isUp: false, icon: IndianRupee, bg: "bg-orange-50", color: "text-orange-500" },
  { title: "Avg. Lead Time (Days)", value: "18.6", change: "▼ 3.2% vs last month", isUp: false, icon: Clock, bg: "bg-rose-50", color: "text-rose-500" },
];

const HS_CODES = [
  { code: "8536", desc: "Electrical apparatus for switching", value: "₹125.45 Cr" },
  { code: "8542", desc: "Integrated circuits & micro assemblies", value: "₹98.76 Cr" },
  { code: "8504", desc: "Electric transformers", value: "₹76.32 Cr" },
  { code: "8537", desc: "Boards, panels, consoles", value: "₹54.23 Cr" },
  { code: "9031", desc: "Measuring & testing instruments", value: "₹42.18 Cr" },
];

const TRADING_PARTNERS = [
  { country: "USA", flag: "US", value: "₹185.45 Cr", shipments: 2145 },
  { country: "UAE", flag: "AE", value: "₹96.30 Cr", shipments: 1025 },
  { country: "Germany", flag: "DE", value: "₹74.20 Cr", shipments: 985 },
  { country: "China", flag: "CN", value: "₹63.45 Cr", shipments: 812 },
  { country: "Netherlands", flag: "NL", value: "₹52.18 Cr", shipments: 642 },
];

const TREND_DATA = [
  { date: "01 Apr", value: 1500 },
  { date: "04 Apr", value: 1380 },
  { date: "08 Apr", value: 1560 },
  { date: "11 Apr", value: 1300 },
  { date: "14 Apr", value: 1250 },
  { date: "16 Apr", value: 1470 },
  { date: "18 Apr", value: 1610 },
  { date: "21 Apr", value: 1560 },
  { date: "24 Apr", value: 1876 },
];

const IMPORT_EXPORT_DATA = [
  { name: "Import", value: 312.45, color: "#3B82F6" },
  { name: "Export", value: 346.29, color: "#10B981" },
];

const SHIPMENTS_TREND_DATA = [
  { date: "01 Apr", value: 850 },
  { date: "06 Apr", value: 1180 },
  { date: "11 Apr", value: 750 },
  { date: "16 Apr", value: 1220 },
  { date: "25 Apr", value: 1150 },
];

const TOP_PRODUCTS = [
  { name: "Electrical Components", value: "₹185.45 Cr", pct: 28.1, color: "bg-blue-500" },
  { name: "Integrated Circuits", value: "₹142.36 Cr", pct: 21.6, color: "bg-emerald-500" },
  { name: "Industrial Automation", value: "₹96.30 Cr", pct: 14.6, color: "bg-purple-500" },
  { name: "Power Supplies", value: "₹74.20 Cr", pct: 11.3, color: "bg-orange-500" },
  { name: "Other Products", value: "₹160.43 Cr", pct: 24.4, color: "bg-pink-500" },
];

const RECENT_SHIPMENTS = [
  { id: "SHP-2025-1045", date: "24 Apr 2025", hsCode: "8536", desc: "Electrical Switchgear", partner: "Techno Trade LLC", country: "US", value: "₹45.60 Cr", status: "Delivered" },
  { id: "SHP-2025-1044", date: "23 Apr 2025", hsCode: "8542", desc: "Microcontroller Units", partner: "Electro GmbH", country: "DE", value: "₹38.75 Cr", status: "Delivered" },
  { id: "SHP-2025-1043", date: "22 Apr 2025", hsCode: "8504", desc: "Power Transformers", partner: "Gulf Power FZE", country: "AE", value: "₹28.30 Cr", status: "In Transit" },
  { id: "SHP-2025-1042", date: "21 Apr 2025", hsCode: "8537", desc: "Control Panels", partner: "BJ Components B.V.", country: "NL", value: "₹18.90 Cr", status: "Delivered" },
  { id: "SHP-2025-1041", date: "20 Apr 2025", hsCode: "9031", desc: "Testing Instruments", partner: "Shanghai Tech Co.", country: "CN", value: "₹16.20 Cr", status: "Pending" },
];

const STATUS_STYLES = {
  Delivered: "bg-emerald-50 text-emerald-600",
  "In Transit": "bg-blue-50 text-blue-600",
  Pending: "bg-orange-50 text-orange-600",
};

const GROWTH_COUNTRIES = [
  { country: "USA", flag: "US", value: "₹185.45 Cr", growth: "32.6%" },
  { country: "Germany", flag: "DE", value: "₹74.20 Cr", growth: "28.3%" },
  { country: "UAE", flag: "AE", value: "₹96.30 Cr", growth: "24.7%" },
  { country: "UK", flag: "GB", value: "₹38.20 Cr", growth: "21.5%" },
  { country: "Australia", flag: "AU", value: "₹22.40 Cr", growth: "19.8%" },
];

const FINANCIALS = {
  turnover: "₹1,245.60 Cr",
  exportTurnover: "₹856.30 Cr",
  netProfit: "₹98.45 Cr",
  exportRatio: "68.7%",
};

const TABS = ["Overview", "Shipment Analysis", "Partner Analysis", "Product Analysis", "Country Analysis", "Financials", "News & Insights", "Documents"];

export default function CompanyIntelligence() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [searchCompany, setSearchCompany] = useState("");

  return (
    <div className="min-h-screen overflow-y-auto bg-[#F8FAFC] p-4 sm:p-6 text-slate-600 font-sans antialiased">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Company Intelligence</h1>
          <p className="text-xs text-slate-400 mt-0.5">Get complete insights about any company's global trade activities, performance and partnerships.</p>
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

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3 mb-6">
        {KPI_STATS.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white border border-slate-100 p-3.5 rounded-2xl shadow-xs flex flex-col justify-between hover:shadow-md transition duration-200">
              <div className="flex justify-between items-start">
                <span className="text-[13px] font-semibold text-slate-600 tracking-wider">{stat.title}</span>
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${stat.bg} ${stat.color}`}>
                  <Icon size={14} />
                </div>
              </div>
              <div className="mt-2.5">
                <h4 className="text-base font-extrabold text-slate-800 tracking-tight">{stat.value}</h4>
                <span className={`text-[9px] font-bold block mt-0.5 ${stat.isUp ? "text-emerald-500" : "text-rose-500"}`}>{stat.change}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-xs mb-6">
        <div className="flex flex-col lg:flex-row gap-5">
          <div className="lg:w-2/5 flex items-start gap-3">
            <div className="w-11 h-11 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-sm shrink-0">GT</div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <p className="font-bold text-xs text-slate-800">Global Tech Industries Pvt. Ltd.</p>
                <span className="flex items-center gap-1 text-[10px] font-bold text-blue-600">
                  <CheckCircle2 size={12} /> Verified
                </span>
              </div>
              <div className="flex flex-wrap gap-3 text-[10px] text-slate-400 font-semibold mt-1.5">
                <span className="flex items-center gap-1"><MapPin size={11} /> New Delhi, India</span>
                <span className="flex items-center gap-1"><Hash size={11} /> CIN: U74899DL2012PTC225478</span>
                <span className="flex items-center gap-1"><Briefcase size={11} /> Private Limited</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">Global Tech Industries Pvt. Ltd. is engaged in the manufacturing and export of electronic components and industrial automation products.</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3 pt-3 border-t border-slate-100">
                <div>
                  <p className="text-[9px] text-slate-400 font-bold uppercase">Established Year</p>
                  <p className="text-[11px] font-bold text-slate-700 mt-0.5">2012</p>
                </div>
                <div>
                  <p className="text-[9px] text-slate-400 font-bold uppercase">Employees</p>
                  <p className="text-[11px] font-bold text-slate-700 mt-0.5">250-500</p>
                </div>
                <div>
                  <p className="text-[9px] text-slate-400 font-bold uppercase">Website</p>
                  <p className="text-[11px] font-bold text-blue-600 mt-0.5">www.globaltech.com</p>
                </div>
                <div>
                  <p className="text-[9px] text-slate-400 font-bold uppercase">Industry</p>
                  <p className="text-[11px] font-bold text-slate-700 mt-0.5">Electronics & Electrical</p>
                </div>
                <div>
                  <p className="text-[9px] text-slate-400 font-bold uppercase">Business Type</p>
                  <p className="text-[11px] font-bold text-slate-700 mt-0.5">Manufacturer, Exporter</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-[30%] lg:border-l lg:border-slate-100 lg:pl-5">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-xs text-slate-800">Top HS Codes</h3>
              <button className="text-[10px] font-bold text-blue-600">View All</button>
            </div>
            <div className="space-y-3">
              {HS_CODES.map((h) => (
                <div key={h.code} className="flex items-center justify-between gap-3 text-[11px]">
                  <div>
                    <p className="font-bold text-slate-800">{h.code}</p>
                    <p className="text-slate-400 font-semibold">{h.desc}</p>
                  </div>
                  <p className="font-bold text-slate-700 whitespace-nowrap">{h.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-[30%] lg:border-l lg:border-slate-100 lg:pl-5">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-xs text-slate-800">Top Trading Partners</h3>
              <button className="text-[10px] font-bold text-blue-600">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-[11px]">
                <thead>
                  <tr className="text-[9px] text-slate-400 uppercase font-bold">
                    <th className="text-left pb-2">Country</th>
                    <th className="text-right pb-2">Trade Value</th>
                    <th className="text-right pb-2">Shipments</th>
                  </tr>
                </thead>
                <tbody>
                  {TRADING_PARTNERS.map((p) => (
                    <tr key={p.country} className="border-t border-slate-50">
                      <td className="py-1.5 flex items-center gap-1.5 font-bold text-slate-700">
                        <ReactCountryFlag countryCode={p.flag} svg style={{ width: "14px", height: "14px" }} />
                        {p.country}
                      </td>
                      <td className="py-1.5 text-right font-semibold text-slate-600">{p.value}</td>
                      <td className="py-1.5 text-right font-semibold text-slate-600">{p.shipments}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-xs mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-3 items-end">
          <div className="xl:col-span-1">
            <label className="text-[10px] text-slate-400 font-bold block mb-1.5 uppercase">Search Company</label>
            <div className="relative">
              <input
                type="text"
                value={searchCompany}
                onChange={(e) => setSearchCompany(e.target.value)}
                placeholder="Search by company name"
                className="w-full bg-slate-50/70 border border-slate-200 rounded-xl py-2 pl-8 pr-3 text-xs focus:outline-none focus:border-blue-500 placeholder-slate-400"
              />
              <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
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
            <label className="text-[10px] text-slate-400 font-bold block mb-1.5 uppercase">Company Type</label>
            <div className="relative">
              <select className="w-full bg-slate-50/70 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs appearance-none focus:outline-none">
                <option>All Types</option>
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="text-[10px] text-slate-400 font-bold block mb-1.5 uppercase">Business Type</label>
            <div className="relative">
              <select className="w-full bg-slate-50/70 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs appearance-none focus:outline-none">
                <option>All</option>
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="text-[10px] text-slate-400 font-bold block mb-1.5 uppercase">Turnover (INR)</label>
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
          <div className="flex gap-2 w-full xl:col-span-2">
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl py-2 transition shadow-xs">Apply Filters</button>
            <button className="text-slate-400 hover:text-slate-600 text-xs font-medium px-2">Reset</button>
          </div>
        </div>
      </div>

      <div className="flex border-b border-slate-200 gap-6 mb-6 overflow-x-auto whitespace-nowrap scrollbar-none">
        {TABS.map((tab) => (
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

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                <TrendingUp size={14} className="text-emerald-500" /> Trade Value Trend (INR)
              </h3>
              <span className="text-[9px] text-slate-400 bg-slate-50 border border-slate-150 px-2 py-0.5 rounded font-medium">This Month</span>
            </div>
            <div className="mb-3">
              <span className="text-lg font-black text-slate-800 tracking-tight">₹1,876.45 Cr</span>
              <span className="text-[10px] text-emerald-500 font-bold ml-2">▲ 17.6% vs last month</span>
            </div>
            <div className="h-[130px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={TREND_DATA}>
                  <defs>
                    <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10B981" stopOpacity={0.25} />
                      <stop offset="100%" stopColor="#10B981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" tick={{ fill: "#94a3b8", fontSize: 9 }} tickLine={false} axisLine={false} />
                  <YAxis hide />
                  <Tooltip />
                  <Area type="monotone" dataKey="value" stroke="#10B981" strokeWidth={2} fill="url(#trendFill)" dot={{ fill: "#10B981", r: 2.5 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-2 pt-2.5 border-t border-slate-50">
            <div className="bg-slate-50/60 p-1.5 rounded-xl border border-slate-100 flex items-center justify-between px-3">
              <span className="text-[9px] text-slate-400 font-bold uppercase">Export Value (INR)</span>
              <span className="text-xs font-bold text-slate-700">₹1,876.45 Cr</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-xs text-slate-800 mb-3">Import vs Export Value</h3>
            <div className="relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie data={IMPORT_EXPORT_DATA} dataKey="value" innerRadius={50} outerRadius={72} startAngle={90} endAngle={450} stroke="none">
                    {IMPORT_EXPORT_DATA.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute text-center">
                <span className="text-[8px] text-slate-400 font-bold uppercase block">Total Value</span>
                <span className="font-black text-xs text-slate-800">₹658.74 Cr</span>
              </div>
            </div>
          </div>
          <div className="space-y-2 pt-2.5 border-t border-slate-50 text-[11px]">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-bold text-slate-600"><span className="w-1.5 h-1.5 rounded-full bg-blue-500" />Import</span>
              <span className="font-semibold text-slate-500">₹ 312.45 Cr (47.4%)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-bold text-slate-600"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />Export</span>
              <span className="font-semibold text-slate-500">₹ 346.29 Cr (52.6%)</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                <Package size={14} className="text-blue-500" /> Shipments Trend
              </h3>
              <span className="text-[9px] text-slate-400 bg-slate-50 border border-slate-150 px-2 py-0.5 rounded font-medium">This Month</span>
            </div>
            <div className="h-[150px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={SHIPMENTS_TREND_DATA}>
                  <XAxis dataKey="date" tick={{ fill: "#94a3b8", fontSize: 9 }} tickLine={false} axisLine={false} />
                  <YAxis hide />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3B82F6" radius={[6, 6, 0, 0]} barSize={22} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-slate-50/60 p-1.5 rounded-xl border border-slate-100 flex items-center justify-between px-3 mt-2.5">
            <div>
              <span className="text-[9px] text-slate-400 font-bold uppercase block">Total Shipments</span>
              <span className="text-xs font-bold text-slate-700">12,458</span>
            </div>
            <span className="text-[9px] text-emerald-500 font-bold">▲ 14.6%</span>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-xs text-slate-800">Top Products by Trade Value</h3>
              <button className="text-[10px] font-bold text-blue-600">View All</button>
            </div>
            <div className="space-y-3">
              {TOP_PRODUCTS.map((p) => (
                <div key={p.name}>
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="font-bold text-slate-700">{p.name}</span>
                    <span className="font-semibold text-slate-500">{p.value} ({p.pct}%)</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${p.color}`} style={{ width: `${p.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 mb-6">
        <div className="xl:col-span-2 bg-white border border-slate-100 rounded-2xl p-4 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-xs text-slate-800 mb-3 flex items-center gap-1.5">
              <Building2 size={14} className="text-blue-500" /> Recent Shipments
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-[11px] min-w-[650px]">
                <thead>
                  <tr className="text-[9px] text-slate-400 uppercase font-bold">
                    <th className="text-left pb-2">Shipment ID</th>
                    <th className="text-left pb-2">Date</th>
                    <th className="text-left pb-2">HS Code</th>
                    <th className="text-left pb-2">Product</th>
                    <th className="text-left pb-2">Partner</th>
                    <th className="text-left pb-2">Country</th>
                    <th className="text-right pb-2">Value</th>
                    <th className="text-right pb-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {RECENT_SHIPMENTS.map((s) => (
                    <tr key={s.id} className="border-t border-slate-50">
                      <td className="py-2 font-bold text-blue-600">{s.id}</td>
                      <td className="py-2 font-semibold text-slate-500">{s.date}</td>
                      <td className="py-2 font-semibold text-slate-500">{s.hsCode}</td>
                      <td className="py-2 font-semibold text-slate-600">{s.desc}</td>
                      <td className="py-2 font-semibold text-slate-600">{s.partner}</td>
                      <td className="py-2 flex items-center gap-1.5 font-semibold text-slate-600">
                        <ReactCountryFlag countryCode={s.country} svg style={{ width: "13px", height: "13px" }} />
                        {s.country}
                      </td>
                      <td className="py-2 text-right font-bold text-slate-700">{s.value}</td>
                      <td className="py-2 text-right">
                        <span className={`text-[9px] font-bold px-2 py-1 rounded-full ${STATUS_STYLES[s.status]}`}>{s.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <button className="text-blue-600 text-xs font-bold text-center mt-3 pt-2 border-t border-slate-50 flex items-center justify-center gap-1 hover:text-blue-700">
            View All Shipments <ArrowUpRight size={13} />
          </button>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                <TrendingUp size={14} className="text-emerald-500" /> Top Growth Countries
              </h3>
              <button className="text-[10px] font-bold text-blue-600">View All</button>
            </div>
            <div className="divide-y divide-slate-100">
              {GROWTH_COUNTRIES.map((g) => (
                <div key={g.country} className="flex items-center justify-between py-2.5 text-[11px]">
                  <span className="flex items-center gap-1.5 font-bold text-slate-800">
                    <ReactCountryFlag countryCode={g.flag} svg style={{ width: "13px", height: "13px" }} />
                    {g.country}
                  </span>
                  <span className="font-semibold text-slate-500">{g.value}</span>
                  <span className="text-emerald-500 font-black">▲ {g.growth}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-xs text-slate-800">Company Financial Snapshot</h3>
            <p className="text-[9px] text-slate-400 font-bold uppercase mb-3">FY 2023-24</p>
            <div className="flex items-center justify-between gap-3">
              <div className="space-y-2.5 text-[11px]">
                <div>
                  <p className="text-[9px] text-slate-400 font-bold uppercase">Annual Turnover</p>
                  <p className="font-extrabold text-slate-800">{FINANCIALS.turnover}</p>
                </div>
                <div>
                  <p className="text-[9px] text-slate-400 font-bold uppercase">Export Turnover</p>
                  <p className="font-extrabold text-slate-800">{FINANCIALS.exportTurnover}</p>
                </div>
                <div>
                  <p className="text-[9px] text-slate-400 font-bold uppercase">Net Profit</p>
                  <p className="font-extrabold text-slate-800">{FINANCIALS.netProfit}</p>
                </div>
                <div>
                  <p className="text-[9px] text-slate-400 font-bold uppercase">Export Ratio</p>
                  <p className="font-extrabold text-slate-800">{FINANCIALS.exportRatio}</p>
                </div>
              </div>
              <ResponsiveContainer width={100} height={100}>
                <PieChart>
                  <Pie data={[{ value: 68.7 }, { value: 31.3 }]} dataKey="value" innerRadius={32} outerRadius={46} stroke="none">
                    <Cell fill="#2563EB" />
                    <Cell fill="#E2E8F0" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <button className="text-blue-600 text-xs font-bold text-center mt-3 pt-2 border-t border-slate-50 flex items-center justify-center gap-1 hover:text-blue-700">
            View Financials <ArrowUpRight size={13} />
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl p-3 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-[10px] text-slate-400 font-semibold">
        <span>All data is updated daily. Last updated on 24 Apr 2025, 09:30 AM</span>
        <span className="text-blue-600 font-bold">Help Center</span>
      </div>
    </div>
  );
}