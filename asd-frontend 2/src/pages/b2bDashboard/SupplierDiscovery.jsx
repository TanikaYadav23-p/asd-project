import React, { useState, useMemo } from "react";
import {
  Calendar,
  LayoutDashboard,
  Search,
  ChevronDown,
  SlidersHorizontal,
  Globe,
  Building2,
  Package,
  Clock,
  HelpCircle,
  TrendingUp,
  UserCheck,
  Cpu,
  BadgeCheck,
  ExternalLink,
  Award,
  Eye
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

// ==========================================
// 1. EXACT MAPPED DATA FROM {65F36CC2-3D40-4FBC-88F1-0061C6F7D952}.png
// ==========================================

const KPI_DATA = [
  { title: "Total Suppliers", value: "8,742", change: "▲ 16.8% vs last month", isUp: true, color: "text-blue-600", bg: "bg-blue-50", icon: Building2 },
  { title: "Active Suppliers", value: "18,742", change: "▲ 18.8% vs last month", isUp: true, color: "text-emerald-600", bg: "bg-emerald-50", icon: UserCheck },
  { title: "Countries Covered", value: "65", change: "▲ 12.3% vs last month", isUp: true, color: "text-cyan-600", bg: "bg-cyan-50", icon: Globe },
  { title: "Products Covered", value: "12,856", change: "▲ 14.7% vs last month", isUp: true, color: "text-amber-600", bg: "bg-amber-50", icon: Cpu },
  { title: "Total Shipments", value: "14.26 L", change: "▲ 9.4% vs last month", isUp: true, color: "text-orange-600", bg: "bg-orange-50", icon: Package },
  { title: "Total Trade Value (INR)", value: "₹8,452.65 Cr", change: "▼ 2.3% vs last month", isUp: false, color: "text-emerald-700", bg: "bg-emerald-50", icon: TrendingUp },
];

const COUNTRY_DATA = [
  { name: "USA", value: 512.35, percent: "27.3%", color: "#3B82F6" },
  { name: "UAE", value: 302.80, percent: "16.1%", color: "#10B981" },
  { name: "China", value: 268.40, percent: "14.3%", color: "#8B5CF6" },
  { name: "Germany", value: 208.40, percent: "10.3%", color: "#F59E0B" },
  { name: "Bangladesh", value: 268.40, percent: "14.3%", color: "#EC4899" },
  { name: "Netherland", value: 268.40, percent: "14.3%", color: "#6366F1" },
  { name: "Other", value: 268.40, percent: "14.3%", color: "#94A3B8" },
];

const TYPE_DATA = [
  { name: "Manufacturer", value: 14256, percent: "55.5%", color: "#3B82F6" },
  { name: "Exporter", value: 7856, percent: "30.6%", color: "#10B981" },
  { name: "Trader", value: 2145, percent: "8.3%", color: "#06B6D4" },
  { name: "Wholesaler", value: 1432, percent: "5.6%", color: "#1E293B" },
];

const QUALITY_SCORE_DATA = [
  { range: "0-20", percentage: 8.5 },
  { range: "21-40", percentage: 18.2 },
  { range: "41-60", percentage: 28.6 },
  { range: "61-80", percentage: 31.7 },
  { range: "81-100", percentage: 15.0 },
];

const TOP_CERTIFICATIONS = [
  { name: "ISO 9001", count: "8,945" },
  { name: "CE", count: "6,732" },
  { name: "ISO 14001", count: "4,215" },
  { name: "RoHS", count: "3,809" },
  { name: "ISO 45001", count: "2,654" },
  { name: "BSCI", count: "2,153" },
];

const SUPPLIERS_MASTER_LIST = [
  {
    name: "Shenzhen Tech Co. Ltd.", country: "China", type: "Manufacturer", products: 125, shipments: "2,458", value: "₹ 152.45 Cr", score: 92, verified: true,
    topProducts: ["Electrical Components", "Connectors", "Cable Assemblies", "LED Lighting", "Circuit Boards"],
    certifications: ["ISO 9001", "ISO 14001", "RoHS Compliant", "CE Mark"],
    recentShipments: [
      { code: "85369090", date: "24 Apr 2025", val: "₹ 45.60 Cr" },
      { code: "85444290", date: "23 Apr 2025", val: "₹ 38.75 Cr" },
      { code: "85366990", date: "22 Apr 2025", val: "₹ 28.30 Cr" },
      { code: "85371090", date: "21 Apr 2025", val: "₹ 18.90 Cr" },
      { code: "94054090", date: "20 Apr 2025", val: "₹ 16.20 Cr" },
    ]
  },
  {
    name: "Global Industries Pvt. Ltd.", country: "India", type: "Exporter", products: 86, shipments: "1,896", value: "₹ 98.75 Cr", score: 88, verified: true,
    topProducts: ["Industrial Pipes", "Steel Valves", "Flanges", "Fasteners"],
    certifications: ["ISO 9001", "CE Mark"],
    recentShipments: [
      { code: "73072100", date: "24 Apr 2025", val: "₹ 30.10 Cr" },
      { code: "84818030", date: "22 Apr 2025", val: "₹ 25.40 Cr" },
    ]
  },
  {
    name: "Auto Parts GmbH", country: "Germany", type: "Manufacturer", products: 64, shipments: "1,245", value: "₹ 76.30 Cr", score: 85, verified: false,
    topProducts: ["Brake Pads", "Rotors", "Filters", "Spark Plugs"],
    certifications: ["ISO 9001", "IATF 16949"],
    recentShipments: [{ code: "87083000", date: "18 Apr 2025", val: "₹ 42.15 Cr" }]
  },
  {
    name: "Precision Supplies Inc.", country: "USA", type: "Exporter", products: 72, shipments: "1,102", value: "₹ 64.20 Cr", score: 83, verified: true,
    topProducts: ["CNC Machined Parts", "Fasteners", "Brackets"],
    certifications: ["AS9100D", "ISO 9001"],
    recentShipments: [{ code: "73181500", date: "15 Apr 2025", val: "₹ 18.20 Cr" }]
  },
  {
    name: "Istanbul Trade Co.", country: "Turkey", type: "Trader", products: 58, shipments: "987", value: "₹ 52.80 Cr", score: 80, verified: false,
    topProducts: ["Textiles", "Yarn", "Fabrics"],
    certifications: ["OEKO-TEX"],
    recentShipments: [{ code: "52051200", date: "12 Apr 2025", val: "₹ 12.40 Cr" }]
  },
  {
    name: "Nippon Components Ltd.", country: "Japan", type: "Manufacturer", products: 49, shipments: "876", value: "₹ 48.65 Cr", score: 79, verified: true,
    topProducts: ["Capacitors", "Resistors", "Sensors"],
    certifications: ["ISO 9001", "RoHS"],
    recentShipments: [{ code: "85322400", date: "10 Apr 2025", val: "₹ 22.30 Cr" }]
  },
  {
    name: "UAE Industrial FZE", country: "UAE", type: "Exporter", products: 61, shipments: "765", value: "₹ 41.90 Cr", score: 77, verified: false,
    topProducts: ["Aluminum Sheets", "Extrusions"],
    certifications: ["ISO 9001"],
    recentShipments: [{ code: "76061200", date: "09 Apr 2025", val: "₹ 15.10 Cr" }]
  },
  {
    name: "Prime Exports", country: "India", type: "Exporter", products: 53, shipments: "712", value: "₹ 38.60 Cr", score: 76, verified: true,
    topProducts: ["Hand Tools", "Hardware"],
    certifications: ["ISO 9001"],
    recentShipments: [{ code: "82032000", date: "05 Apr 2025", val: "₹ 9.80 Cr" }]
  }
];

export default function SupplierDiscovery() {
  // States for Live Filtering
  const [searchQuery, setSearchQuery] = useState("");
  const [countryFilter, setCountryFilter] = useState("All Countries");
  const [typeFilter, setTypeFilter] = useState("All Type");
  
  // Applied filter state triggered on "Apply Filters" button click
  const [appliedFilters, setAppliedFilters] = useState({ search: "", country: "All Countries", type: "All Type" });

  // Selected Supplier for Spotlight Section (Defaults to first item)
  const [selectedSupplier, setSelectedSupplier] = useState(SUPPLIERS_MASTER_LIST[0]);

  const handleApplyFilters = () => {
    setAppliedFilters({ search: searchQuery, country: countryFilter, type: typeFilter });
  };

  const handleReset = () => {
    setSearchQuery("");
    setCountryFilter("All Countries");
    setTypeFilter("All Type");
    setAppliedFilters({ search: "", country: "All Countries", type: "All Type" });
  };

  // Filtered List Logic
  const filteredSuppliers = useMemo(() => {
    return SUPPLIERS_MASTER_LIST.filter(sup => {
      const matchesSearch = sup.name.toLowerCase().includes(appliedFilters.search.toLowerCase()) ||
                            sup.topProducts.some(p => p.toLowerCase().includes(appliedFilters.search.toLowerCase()));
      const matchesCountry = appliedFilters.country === "All Countries" || sup.country === appliedFilters.country;
      const matchesType = appliedFilters.type === "All Type" || sup.type === appliedFilters.type;
      return matchesSearch && matchesCountry && matchesType;
    });
  }, [appliedFilters]);

  return (
    <div className="overflow-y-auto bg-[#F8FAFC] p-5 text-slate-600 font-sans antialiased selection:bg-blue-500 selection:text-white pt-14">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Supplier Discovery</h1>
          <p className="text-xs text-slate-400 mt-0.5">Find and evaluate global suppliers for your products with advanced insights and filters.</p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="flex items-center gap-2 bg-white border border-slate-200 text-xs font-semibold px-3 py-2 rounded-xl text-slate-700 shadow-2xs">
            <Calendar size={14} className="text-slate-400" />
            <span>01 Apr 2025 - 24 Apr 2025</span>
          </div>
          <button className="flex items-center gap-2 bg-white border border-slate-200 text-xs font-semibold px-3 py-2 rounded-xl text-slate-700 shadow-2xs hover:bg-slate-50 transition">
            <LayoutDashboard size={14} className="text-slate-400" />
            <span>Customize Dashboard</span>
          </button>
        </div>
      </div>

      {/* KPI METRICS GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 mb-5">
        {KPI_DATA.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div key={idx} className="bg-white border border-slate-100 p-3 rounded-2xl shadow-2xs flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${kpi.bg} ${kpi.color}`}>
                <Icon size={16} />
              </div>
              <div>
                <span className="text-[13px] font-semibold text-slate-600 block tracking-wide">{kpi.title}</span>
                <h3 className="text-base font-bold text-slate-800 tracking-tight mt-0.5">{kpi.value}</h3>
                <span className={`text-[9px] font-bold block mt-0.5 ${kpi.isUp ? "text-green-500" : "text-rose-500"}`}>
                  {kpi.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* FILTERS BAR */}
      <div className="bg-white border border-slate-100 rounded-2xl p-3 shadow-2xs mb-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2.5 items-end">
          <div>
            <label className="text-[10px] text-slate-400 font-bold block mb-1 uppercase tracking-wider">HS Code / Product</label>
            <div className="relative">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search HS Code or Product" 
                className="w-full bg-slate-50/60 border border-slate-200 rounded-xl py-1.5 pl-7 pr-3 text-xs focus:outline-none focus:border-blue-500 transition placeholder:text-slate-300"
              />
              <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
          </div>

          <div>
            <label className="text-[10px] text-slate-400 font-bold block mb-1 uppercase tracking-wider">Country</label>
            <div className="relative">
              <select value={countryFilter} onChange={(e) => setCountryFilter(e.target.value)} className="w-full bg-slate-50/60 border border-slate-200 rounded-xl py-1.5 pl-2.5 pr-8 text-xs appearance-none focus:outline-none">
                <option>All Countries</option>
                <option>China</option>
                <option>India</option>
                <option>Germany</option>
                <option>USA</option>
                <option>UAE</option>
              </select>
              <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="text-[10px] text-slate-400 font-bold block mb-1 uppercase tracking-wider">Minimum Shipment</label>
            <div className="relative">
              <select className="w-full bg-slate-50/60 border border-slate-200 rounded-xl py-1.5 pl-2.5 pr-8 text-xs appearance-none focus:outline-none"><option>All</option></select>
              <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="text-[10px] text-slate-400 font-bold block mb-1 uppercase tracking-wider">Minimum Trade Value(INR)</label>
            <div className="relative">
              <select className="w-full bg-slate-50/60 border border-slate-200 rounded-xl py-1.5 pl-2.5 pr-8 text-xs appearance-none focus:outline-none"><option>All</option></select>
              <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="text-[10px] text-slate-400 font-bold block mb-1 uppercase tracking-wider">Supplier Type</label>
            <div className="relative">
              <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="w-full bg-slate-50/60 border border-slate-200 rounded-xl py-1.5 pl-2.5 pr-8 text-xs appearance-none focus:outline-none">
                <option>All Type</option>
                <option>Manufacturer</option>
                <option>Exporter</option>
                <option>Trader</option>
              </select>
              <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="text-[10px] text-slate-400 font-bold block mb-1 uppercase tracking-wider">Certification</label>
            <div className="relative">
              <select className="w-full bg-slate-50/60 border border-slate-200 rounded-xl py-1.5 pl-2.5 pr-8 text-xs appearance-none focus:outline-none"><option>All Certifications</option></select>
              <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
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
          <div className="flex gap-1.5">
          
            <button onClick={handleApplyFilters} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-3 py-2 rounded-lg transition shadow-2xs">
              Apply Filters
            </button>
            <button onClick={handleReset} className="text-slate-400 hover:text-slate-600 text-xs font-medium px-1">
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* CHARTS LAYER (Hoo-bahoo Layout Mapped) */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-5">
        
        {/* Top Supplier Countries Donut */}
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-2xs flex flex-col justify-between">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-sm text-slate-800">Top Supplier Countries</h3>
            <button className="text-blue-600 text-[11px] font-bold hover:underline">View All</button>
          </div>
          <div className="flex items-center justify-between gap-2 h-[180px]">
            <div className="relative w-[150px] h-[100px] shrink-0">
              <ResponsiveContainer width="100%" height="110%">
                <PieChart>
                  <Pie data={COUNTRY_DATA} innerRadius={40} outerRadius={54} dataKey="value" stroke="none">
                    {COUNTRY_DATA.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-[8px] text-slate-400 font-bold uppercase leading-none">Total Suppliers</span>
                <span className="font-bold text-[10px] text-slate-800 mt-0.5">25,689</span>
              </div>
            </div>
            <div className="space-y-0.5 flex-1 pl-2 max-h-[125px] overflow-y-auto scrollbar-none text-[10px]">
              {COUNTRY_DATA.map((c, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: c.color }} />
                    <span className="text-slate-600 font-semibold">{c.name}</span>
                  </div>
                  <span className="text-slate-400 font-medium">₹{c.value.toFixed(2)} Cr ({c.percent})</span>
                </div>
              ))}
            </div>
          </div>
          <button className="text-blue-500 text-[10px] font-bold text-center mt-2 hover:underline">View All Countries →</button>
        </div>

        {/* Suppliers by Type Donut */}
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-2xs flex flex-col justify-between">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-xs text-slate-800">Suppliers by Type</h3>
          </div>
          <div className="flex items-center justify-between gap-2 h-[130px]">
            <div className="relative w-[100px] h-[100px] shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={TYPE_DATA} innerRadius={32} outerRadius={44} dataKey="value" stroke="none">
                    {TYPE_DATA.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-[7px] text-slate-400 font-bold uppercase leading-none">Total Suppliers</span>
                <span className="font-bold text-[10px] text-slate-800 mt-0.5">25,689</span>
              </div>
            </div>
            <div className="space-y-1 flex-1 pl-2 text-[9px]">
              {TYPE_DATA.map((t, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: t.color }} />
                    <span className="text-slate-600 font-semibold">{t.name}</span>
                  </div>
                  <span className="text-slate-500 font-medium">{t.value.toLocaleString()} ({t.percent})</span>
                </div>
              ))}
            </div>
          </div>
          <button className="text-blue-500 text-[10px] font-bold text-center mt-2 hover:underline">View All Types →</button>
        </div>

        {/* Supplier Quality Score Distribution Chart */}
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-2xs flex flex-col justify-between">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-xs text-slate-800">Supplier Quality Score Distribution</h3>
          </div>
          <div className="h-[120px] w-full mt-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={QUALITY_SCORE_DATA} margin={{ top: 10, right: 5, left: -25, bottom: 0 }}>
                <XAxis dataKey="range" tick={{ fill: '#94a3b8', fontSize: 9 }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 9 }} unit="%" axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: 'transparent' }} />
                <Bar dataKey="percentage" fill="#2563EB" radius={[4, 4, 0, 0]} barSize={22} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <button className="text-blue-500 text-[10px] font-bold text-center mt-2 hover:underline">View Quality Score Guide →</button>
        </div>

        {/* Top Certifications Bar List */}
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-2xs flex flex-col justify-between">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-xs text-slate-800">Top Certifications</h3>
          </div>
          <div className="space-y-1.5 max-h-[130px] overflow-y-auto scrollbar-none">
            {TOP_CERTIFICATIONS.map((cert, i) => (
              <div key={i} className="flex justify-between items-center text-[10px] bg-slate-50/60 px-2 py-1 rounded-lg border border-slate-100">
                <span className="text-slate-700 font-semibold">{cert.name}</span>
                <span className="font-bold text-slate-500">{cert.count}</span>
              </div>
            ))}
          </div>
          <button className="text-blue-500 text-[10px] font-bold text-center mt-2 hover:underline">View All</button>
        </div>

      </div>

      {/* DYNAMIC TWO COLUMN SPLIT LAYOUT (TABLE + SPOTLIGHT PANEL) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-5">
        
        {/* LEFT COLUMN: Top Suppliers Live DataGrid (7 Cols) */}
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-2xs lg:col-span-7  flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-sm text-slate-900">Top Suppliers</h3>
              <button className="text-blue-600 text-xs font-bold hover:underline">View All</button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-xs">
                <thead>
                  <tr className="text-slate-400 font-bold border-b border-slate-100">
                    <th className="pb-2 font-medium">Supplier Name</th>
                    <th className="pb-2 font-medium">Country</th>
                    <th className="pb-2 font-medium">Supplier Type</th>
                    <th className="pb-2 font-medium text-center">Products</th>
                    <th className="pb-2 font-medium text-center">Shipments</th>
                    <th className="pb-2 font-medium">Trade Value (INR)</th>
                    <th className="pb-2 font-medium text-center">Quality Score</th>
                    <th className="pb-2 font-medium text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-slate-600">
                  {filteredSuppliers.map((sup, idx) => (
                    <tr 
                      key={idx} 
                      onClick={() => setSelectedSupplier(sup)}
                      className={`cursor-pointer transition group ${selectedSupplier.name === sup.name ? "bg-blue-50/60" : "hover:bg-slate-50/50"}`}
                    >
                      <td className="py-2.5 font-bold text-slate-800 flex items-center gap-1">
                        {sup.name}
                        {sup.verified && <BadgeCheck size={13} className="text-emerald-500 shrink-0" />}
                      </td>
                      <td className="py-2.5 font-semibold text-slate-500">{sup.country}</td>
                      <td className="py-2.5 text-slate-500">{sup.type}</td>
                      <td className="py-2.5 text-center font-bold text-slate-700">{sup.products}</td>
                      <td className="py-2.5 text-center font-semibold text-slate-600">{sup.shipments}</td>
                      <td className="py-2.5 font-bold text-slate-800">{sup.value}</td>
                      <td className="py-2.5 text-center">
                        <span className={`px-1.5 py-0.5 rounded font-bold text-[10px] ${
                          sup.score >= 85 ? "bg-green-50 text-green-600 border border-green-100" : "bg-emerald-50 text-emerald-600 border border-emerald-100"
                        }`}>
                          {sup.score}
                        </span>
                      </td>
                      <td className="py-2.5 text-center">
                        <button className="text-slate-400 group-hover:text-blue-600 transition p-1">
                          <Eye size={13} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <button className="text-blue-600 text-xs font-bold text-center mt-3 pt-2 border-t border-slate-50 w-full hover:underline">
            View All Suppliers →
          </button>
        </div>

        {/* RIGHT COLUMN: Supplier Spotlight Panel (5 Cols - Dynamically Updates) */}
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-2xs lg:col-span-5 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider">Supplier Spotlight</h3>
            </div>

            {/* Core Info Row */}
            <div className="flex items-center justify-between gap-4 bg-slate-50/60 border border-slate-100 p-3 rounded-2xl mb-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full border-2 border-green-500 flex items-center justify-center bg-white shrink-0 text-center">
                  <span className="text-[10px] font-black text-green-600 block">100%</span>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                    {selectedSupplier.name}
                    {selectedSupplier.verified && <span className="text-[9px] bg-green-100 text-green-600 font-black px-1 py-0.2 rounded uppercase">Verified</span>}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5 font-medium">📍 {selectedSupplier.country} • 🏢 {selectedSupplier.type}</p>
                </div>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[11px] px-3 py-1.5 rounded-xl transition shadow-xs flex items-center gap-1 whitespace-nowrap">
                View Full Profile <ExternalLink size={11} />
              </button>
            </div>

            {/* Quick Metrics Multi-Grid */}
            <div className="grid grid-cols-4 gap-2 text-center mb-4">
              <div className="bg-slate-50 border border-slate-150 rounded-xl p-2">
                <span className="text-[8px] font-bold text-slate-400 block uppercase">Quality Score</span>
                <span className="text-xs font-black text-slate-800 mt-1 block">{selectedSupplier.score} / 100</span>
              </div>
              <div className="bg-slate-50 border border-slate-150 rounded-xl p-2">
                <span className="text-[8px] font-bold text-slate-400 block uppercase">Total Shipments</span>
                <span className="text-xs font-black text-slate-800 mt-1 block">{selectedSupplier.shipments}</span>
              </div>
              <div className="bg-slate-50 border border-slate-150 rounded-xl p-2">
                <span className="text-[8px] font-bold text-slate-400 block uppercase">Trade Value (INR)</span>
                <span className="text-xs font-black text-slate-800 mt-1 block">{selectedSupplier.value}</span>
              </div>
              <div className="bg-slate-50 border border-slate-150 rounded-xl p-2">
                <span className="text-[8px] font-bold text-slate-400 block uppercase">Products</span>
                <span className="text-xs font-black text-slate-800 mt-1 block">{selectedSupplier.products}</span>
              </div>
            </div>

            {/* Top Products Tags */}
            <div className="mb-4">
              <span className="text-[10px] text-slate-400 font-bold block mb-1.5 uppercase">Top Products</span>
              <div className="flex flex-wrap gap-1.5">
                {selectedSupplier.topProducts.map((p, idx) => (
                  <span key={idx} className="bg-blue-50 text-blue-600 border border-blue-100/50 rounded-lg px-2 py-0.5 text-[10px] font-bold">
                    {p}
                  </span>
                ))}
              </div>
            </div>

            {/* Certifications and Recent Shipments Row Split */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 pt-1">
              
              {/* Left Check-List */}
              <div className="sm:col-span-4">
                <span className="text-[10px] text-slate-400 font-bold block mb-2 uppercase">Certifications</span>
                <div className="space-y-1.5">
                  {selectedSupplier.certifications.map((c, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-[10px] text-slate-600 font-bold">
                      <Award size={12} className="text-emerald-500 shrink-0" />
                      <span>{c}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Recent Micro Shipments List */}
              <div className="sm:col-span-8 border-l border-slate-100 pl-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Recent Shipments</span>
                  <button className="text-blue-500 text-[9px] font-bold hover:underline">View All</button>
                </div>
                <div className="space-y-1.5">
                  {selectedSupplier.recentShipments?.map((s, idx) => (
                    <div key={idx} className="flex justify-between items-center text-[10px] font-medium text-slate-500">
                      <span className="font-bold text-slate-700">HS Code: {s.code}</span>
                      <span>{s.date}</span>
                      <span className="font-bold text-slate-800">{s.val}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>

      {/* SYSTEM META FOOTER */}
      <div className="pt-3 border-t border-slate-200/60 flex flex-col sm:flex-row justify-between items-center text-[11px] text-slate-400 gap-2">
        <div className="flex items-center gap-1.5 font-medium">
          <Clock size={12} className="text-slate-300" />
          <span>All data is updated daily. Last updated on 24 Apr 2025, 09:30 AM</span>
        </div>
        <div className="flex items-center gap-1 cursor-pointer hover:text-slate-600 transition font-bold">
          <HelpCircle size={12} className="text-slate-300" />
          <span>Help Center</span>
        </div>
      </div>

    </div>
  );
}