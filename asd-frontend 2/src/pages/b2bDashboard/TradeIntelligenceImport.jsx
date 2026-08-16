
import React, { useState, useMemo, useEffect } from "react";
import {
  getDashboard,
  getFilterOptions,
  getImportTrend,
  getCountryDistribution,
  getTopProducts,
  getTopSuppliers,
  getTopImporters,
  getPortWiseImports,
  getRecentShipments
} from '../../api/ImportIntelApi';
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
// 1. RAW DATA (यह डेटा API से आ सकता है)
// ==========================================

/*const INITIAL_PRODUCTS = [
  { hsCode: "85", desc: "Electrical Machinery & Equipment", shipments: "2,145", value: 412.50, share: "33.1%", barWidth: "w-[33%]" },
  { hsCode: "84", desc: "Machinery & Mechanical Appliances", shipments: "1,745", value: 286.40, share: "23.0%", barWidth: "w-[23%]" },
  { hsCode: "90", desc: "Optical, Medical & Precision Instruments", shipments: "1,055", value: 201.20, share: "16.1%", barWidth: "w-[16%]" },
  { hsCode: "72", desc: "Iron & Steel", shipments: "955", value: 178.10, share: "14.3%", barWidth: "w-[14%]" },
  { hsCode: "39", desc: "Plastics & Articles", shipments: "882", value: 167.60, share: "13.5%", barWidth: "w-[13.5%]" },
];

const INITIAL_LINE_DATA = [
  { date: "15 Apr", value: 1100 }, { date: "16 Apr", value: 1150 }, { date: "17 Apr", value: 1120 },
  { date: "18 Apr", value: 1220 }, { date: "19 Apr", value: 1245 }, { date: "20 Apr", value: 1210 },
  { date: "21 Apr", value: 1230 }, { date: "22 Apr", value: 1260 }, { date: "23 Apr", value: 1280 },
  { date: "24 Apr", value: 1320 },
];

const INITIAL_PIE_DATA = [
  { name: "USA", value: 512.35, percent: "27.3%", color: "#2563EB" },
  { name: "UAE", value: 302.80, percent: "16.1%", color: "#10B981" },
  { name: "China", value: 268.40, percent: "14.3%", color: "#8B5CF6" },
  { name: "Germany", value: 208.40, percent: "11.1%", color: "#F59E0B" },
  { name: "Bangladesh", value: 268.40, percent: "14.3%", color: "#6366F1" },
  { name: "Netherland", value: 268.40, percent: "14.3%", color: "#94A3B8" },
  { name: "Other", value: 148.10, percent: "7.6%", color: "#EC4899" },
];

const INITIAL_SUPPLIERS = [
  { name: "ABC Trading Co. Ltd.", shipments: "845", value: "₹120.45 Cr", growth: "▲ 18.2%", country: "USA" },
  { name: "Global Industries Inc.", shipments: "712", value: "₹88.75 Cr", growth: "▲ 12.2%", country: "UAE" },
  { name: "Omega Suppliers", shipments: "655", value: "₹76.20 Cr", growth: "▲ 11.4%", country: "China" },
  { name: "Prime Exports Ltd.", shipments: "582", value: "₹64.10 Cr", growth: "▲ 9.5%", country: "Germany" },
];

const INITIAL_IMPORTERS = [
  { name: "ABC Imports Pvt. Ltd.", shipments: "1,245", value: "₹182.45 Cr", growth: "▲ 18.2%", country: "USA" },
  { name: "Global Enterprises", shipments: "1,021", value: "₹138.75 Cr", growth: "▲ 15.2%", country: "UAE" },
  { name: "Omega Traders", shipments: "812", value: "₹96.20 Cr", growth: "▲ 11.4%", country: "China" },
  { name: "Shiva Trades", shipments: "755", value: "₹84.10 Cr", growth: "▲ 9.5%", country: "Germany" },
];

const INITIAL_PORTS = [
  { name: "Nhava Sheva (Mumbai)", shipments: "2,895", value: "₹ 412.50 Cr", share: "33.1%" },
  { name: "Mundra (Gujarat)", shipments: "1,745", value: "₹ 286.40 Cr", share: "23.0%" },
  { name: "Chennai", shipments: "1,055", value: "₹ 201.20 Cr", share: "16.1%" },
  { name: "Kolkata", shipments: "955", value: "₹ 124.10 Cr", share: "10.0%" },
];

const INITIAL_SHIPMENTS = [
  { id: "EXP-2025-2845", hsCode: "85", desc: "Electrical Machinery & Equipment", exporter: "ABC Exports Pvt. Ltd.", buyer: "Global Retail Inc.", country: "USA", port: "Nhava Sheva (Mumbai)", date: "24 Apr 2025", value: "₹ 45.80 Cr", status: "DELIVERED" },
  { id: "EXP-2025-2844", hsCode: "84", desc: "Machinery & Mechanical Appliances", exporter: "Global Trade Solutions", buyer: "TechMart USA", country: "UAE", port: "Mundra (Gujarat)", date: "23 Apr 2025", value: "₹ 38.75 Cr", status: "DELIVERED" },
  { id: "EXP-2025-2843", hsCode: "90", desc: "Optical, Medical & Precision Instruments", exporter: "Prime Exports Ltd.", buyer: "Mega Traders LLC", country: "Germany", port: "Chennai", date: "22 Apr 2025", value: "₹ 28.50 Cr", status: "IN TRANSIT" },
  { id: "EXP-2025-2842", hsCode: "72", desc: "Iron & Steel", exporter: "Shiva Exports", buyer: "Euro International GmbH", country: "China", port: "Nhava Sheva (Mumbai)", date: "21 Apr 2025", value: "₹ 18.10 Cr", status: "DELIVERED" },
  { id: "EXP-2025-2841", hsCode: "39", desc: "Plastics & Articles", exporter: "Omega Exports Pvt. Ltd.", buyer: "Domestic Distributors", country: "Bangladesh", port: "Kolkata", date: "20 Apr 2025", value: "₹ 16.20 Cr", status: "PENDING" },
];*/

export default function ImportIntelligence() {

  const [dashboard, setDashboard] = useState({});
  const [filterOptions, setFilterOptions] = useState({});
  const [importTrend, setImportTrend] = useState([]);
  const [countryDistribution, setCountryDistribution] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [topSuppliers, setTopSuppliers] = useState([]);
  const [topImporters, setTopImporters] = useState([]);
  const [portWiseImports, setPortWiseImports] = useState([]);
  const [recentShipments, setRecentShipments] = useState([]);
  // ==========================================
  // 2. DYNAMIC STATES (फ़िल्टर स्टेट्स)
  // ==========================================
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedHsCode, setSelectedHsCode] = useState("All HsCode");
  const [selectedPort, setSelectedPort] = useState("All Ports");
  const [selectedCountry, setSelectedCountry] = useState("All Countries");
  const [selectedExporter, setSelectedExporter] = useState("All Exporters");
  const [selectedBuyer, setSelectedBuyer] = useState("All Buyers");

  // Filter Active State (ताकि 'Apply Filters' पर ही बड़े बदलाव दिखें)
  const [appliedFilters, setAppliedFilters] = useState({
    search: "", hsCode: "All", port: "All Ports", country: "All Countries", exporter: "All Exporters", buyer: "All Buyers"
  });

  const fetchDashboard = async () => {
  try {
    const res = await getDashboard();
    setDashboard(res.data.data || {});
  } catch (err) {
    console.error(err);
  }
};

const fetchFilterOptions = async () => {
  try {
    const res = await getFilterOptions();
    setFilterOptions(res.data.data || {});
  } catch (err) {
    console.error(err);
  }
};

const fetchImportTrend = async () => {
  try {
    const res = await getImportTrend();
    setImportTrend(res.data.data || []);
  } catch (err) {
    console.error(err);
  }
};

const fetchCountryDistribution = async () => {
  try {
    const res = await getCountryDistribution();
    setCountryDistribution(res.data.data || []);
  } catch (err) {
    console.error(err);
  }
};

const fetchTopProducts = async () => {
  try {
    const res = await getTopProducts();
    setTopProducts(res.data.data || []);
  } catch (err) {
    console.error(err);
  }
};

const fetchTopSuppliers = async () => {
  try {
    const res = await getTopSuppliers();
    setTopSuppliers(res.data.data || []);
  } catch (err) {
    console.error(err);
  }
};

const fetchTopImporters = async () => {
  try {
    const res = await getTopImporters();
    setTopImporters(res.data.data || []);
  } catch (err) {
    console.error(err);
  }
};

const fetchPortWiseImports = async () => {
  try {
    const res = await getPortWiseImports();
    setPortWiseImports(res.data.data || []);
  } catch (err) {
    console.error(err);
  }
};

const fetchRecentShipments = async () => {
  try {
    const res = await getRecentShipments();
    setRecentShipments(res.data.data || []);
  } catch (err) {
    console.error(err);
  }
};
  const handleApplyFilters = () => {
    setAppliedFilters({
      search: searchQuery,
      hsCode: selectedHsCode,
      port: selectedPort,
      country: selectedCountry,
      exporter: selectedExporter,
      buyer: selectedBuyer
    });
  };

  const handleResetFilters = () => {
  setSearchQuery("");
  setSelectedHsCode("All");
  setSelectedPort("All Ports");
  setSelectedCountry("All Countries");
  setSelectedExporter("All Exporters");
  setSelectedBuyer("All Buyers");

  setAppliedFilters({
    search: "",
    hsCode: "All",
    port: "All Ports",
    country: "All Countries",
    exporter: "All Exporters",
    buyer: "All Buyers"
  });
};

  useEffect(() => {
  fetchDashboard();
  fetchFilterOptions();
  fetchImportTrend();
  fetchCountryDistribution();
  fetchTopProducts();
  fetchTopSuppliers();
  fetchTopImporters();
  fetchPortWiseImports();
  fetchRecentShipments();
}, []);
const INITIAL_STATS = [
  { title: "Total Import Shipments", value: dashboard.totalShipments || 0, change: "-", icon: Package, color: "text-blue-500", bg: "bg-blue-50", isUp: true },
  { title: "Total Import Value (INR)", value: `₹${((dashboard.totalImportValue || 0) / 10000000).toFixed(2)} Cr`, change: "-", icon: IndianRupee, color: "text-green-500", bg: "bg-green-50", isUp: true },
  { title: "Total Importers", value: dashboard.totalImporters || 0, change: "-", icon: Users, color: "text-cyan-500", bg: "bg-cyan-50", isUp: true },
  { title: "Total Suppliers", value: dashboard.totalSuppliers || 0, change: "-", icon: Truck, color: "text-emerald-500", bg: "bg-emerald-50", isUp: true },
  { title: "Countries of Origin", value: dashboard.countries || 0, change: "-", icon: Globe, color: "text-purple-500", bg: "bg-purple-50", isUp: true },
  { title: "Avg. Shipment Value (INR)", value: `₹${((dashboard.avgShipmentValue || 0) / 100000).toFixed(2)} L`, change: "▼ 3.2% vs last month", icon: IndianRupee, color: "text-orange-500", bg: "bg-orange-50", isUp: false },
  { title: "Avg. Lead Time (Days)", value: dashboard.avgLeadTime || 0, change: "-", icon: Clock3, color: "text-red-500", bg: "bg-red-50", isUp: false },
];

const maxValue = topProducts.length > 0 ? Math.max(...topProducts.map((p) => p.value)) : 1;
const PRODUCTS = topProducts.map((item) => ({
  hsCode: item._id?.hsCode || "-",
  desc: item._id?.product || "-",
  shipments: item.shipments,
  value: item.value,
  share: `${((item.value / maxValue) * 100).toFixed(0)}%`,
  barWidth: `${(item.value / maxValue) * 100}%`,
}));
const LINE_DATA = importTrend.map(item => ({
  date: new Date(item._id).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
  }),
  value: item.totalValue / 10000000, // Crores
}));
const totalImportValue = importTrend.reduce(
  (sum, item) => sum + item.totalValue,
  0
);
const PIE_COLORS = ["#2563EB", "#10B981", "#8B5CF6", "#F59E0B", "#6366F1", "#94A3B8", "#EC4899",];
  // ==========================================
  // 3. DYNAMIC FILTERING LOGIC (useMemo से परफॉर्मेंस बूस्ट)
  // ==========================================
  
  // Dynamic Shipments Table
  const filteredShipments = useMemo(() => {
  return recentShipments.filter((ship) => {

    const hsCode =
      ship.cargo?.hsCode?.hsCode?.toString() || "";

    const exporter =
      ship.exporter?.companyName || "";

    const buyer =
      ship.buyer?.companyName || "";

    const country =
      ship.route?.destinationCountry || "";

    const port =
      ship.route?.originCity || "";

    const search =
      `${ship.sbNumber}
       ${ship.cargo?.productName}
       ${hsCode}
       ${exporter}
       ${buyer}
       ${country}
       ${port}`
        .toLowerCase();

    return (
      (appliedFilters.search === "" ||
        search.includes(appliedFilters.search.toLowerCase())) &&

      (appliedFilters.hsCode === "All" ||
        hsCode === appliedFilters.hsCode) &&

      (appliedFilters.port === "All Ports" ||
       port === appliedFilters.port) &&

      (appliedFilters.country === "All Countries" ||
        country === appliedFilters.country) &&

      (appliedFilters.exporter === "All Exporters" ||
        exporter === appliedFilters.exporter) &&

      (appliedFilters.buyer === "All Buyers" ||
        buyer === appliedFilters.buyer)
    );
  });
}, [recentShipments, appliedFilters]);
  // Dynamic Pie/Donut Chart Data
  const dynamicPieData = useMemo(() => {
    let data = countryDistribution.map((item, index) => 
      ({
        name: item.country,
        value: item.value / 10000000, // Crores
        percent: `${item.percentage}%`,
        color: PIE_COLORS[index % PIE_COLORS.length],
      }));

      if (appliedFilters.country !== "All Countries") {
        data = data.filter(
        item => item.name === appliedFilters.country
      );
    }
    return data;
  }, [countryDistribution, appliedFilters.country]);

  // Dynamic Total Pie Value Calculation
  const totalPieValue = useMemo(() => {
    const total = dynamicPieData.reduce((sum, item) => sum + item.value, 0);
    return `₹${total.toLocaleString('en-IN', { maximumFractionDigits: 2 })} Cr`;
  }, [dynamicPieData]);

  return (
    <div className="min-h-screen overflow-y-auto bg-[#f8fafc] p-6 text-slate-700 antialiased font-sans pt-14">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1e293b]">Import Intelligence</h1>
          <p className="text-xs text-slate-500 mt-0.5 font-semibold">Get actionable insights on global imports, products, suppliers and markets.</p>
        </div>

        <div className="flex items-center gap-3 w-full lg:w-auto">
          <button className="flex-1 lg:flex-none bg-white border border-slate-200 px-4 py-2 rounded-xl flex items-center justify-center gap-2 text-sm font-medium text-slate-600 shadow-sm hover:bg-slate-50 transition">
            <CalendarDays size={16} className="text-slate-400" /> 01 Apr 2025 - 24 Apr 2025
          </button>
          <button className="flex-1 lg:flex-none bg-white border border-slate-200 px-4 py-2 rounded-xl flex items-center justify-center gap-2 text-sm font-medium text-slate-600 shadow-sm hover:bg-slate-50 transition">
            <Download size={16} className="text-slate-400" /> Export Report
          </button>
        </div>
      </div>

      {/* STATS CARD GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-7 gap-4 mb-6">
        {INITIAL_STATS.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex flex-col justify-between">
              <div className="flex justify-between items-start gap-1">
                
                <span className="text-[13px] font-medium text-slate-600 leading-tight block max-w-[85%]">{item.title}</span>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${item.bg} ${item.color}`}><Icon size={16} /></div>
              </div>
              <div className="mt-3">
                <h3 className="font-bold text-lg text-slate-800 tracking-tight">{item.value}</h3>
                <span className={`text-[10px] font-medium block mt-0.5 ${item.isUp ? "text-green-500" : "text-red-500"}`}>{item.change}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* DYNAMIC FILTERS PANEL */}
      <div className="bg-white border border-slate-100 rounded-2xl p-3 shadow-sm mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-3">
          
          {/* Search Bar Input */}
          <div className="relative flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search HS Code or Product"
              className="w-full bg-slate-50/60 border border-slate-200 rounded-xl py-2 px-3 text-xs text-slate-600 placeholder-slate-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Port Dropdown */}
          <div className="w-full relative">
            <select value={selectedPort} onChange={(e) => setSelectedPort(e.target.value)} className="w-full bg-slate-50/60 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs text-slate-600 appearance-none focus:outline-none focus:border-blue-500">
              <option value="All Ports">All Ports</option>
               {filterOptions.ports?.map((port, index) => (
                <option key={index} value={port}>{port}</option>
               ))}
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>

          {/* Country Dropdown */}
          <div className="w-full relative">
            <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)} className="w-full bg-slate-50/60 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs text-slate-600 appearance-none focus:outline-none focus:border-blue-500">
              <option value="All Countries">All Countries</option>
              {countryDistribution.map((item, i) => (<option key={i} value={item.country}>{item.country}</option>))}
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>

          {/* Exporters Dropdown */}
          <div className="w-full relative">
            <select value={selectedExporter} onChange={(e) => setSelectedExporter(e.target.value)} className="w-full bg-slate-50/60 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs text-slate-600 appearance-none focus:outline-none focus:border-blue-500">
              <option value="All Exporters">All Exporters</option>
               {filterOptions.exporters?.map((exporter, index) => (
                <option key={index} value={exporter}>{exporter}</option>
               ))}
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>

          {/* Buyers Dropdown */}
          <div className="w-full relative">
            <select value={selectedBuyer} onChange={(e) => setSelectedBuyer(e.target.value)} className="w-full bg-slate-50/60 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs text-slate-600 appearance-none focus:outline-none focus:border-blue-500">
              <option value="All Buyers">All Buyers</option>
               {filterOptions.buyers?.map((buyer, index) => (
                <option key={index} value={buyer}>{buyer}</option>
               ))}
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
          
          <div className="relative">
            <select className="w-full bg-slate-50/60 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs text-slate-600 appearance-none focus:outline-none focus:border-blue-500">
              <option>More Filters</option>
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>

          <div className="flex gap-2">
            <button onClick={handleApplyFilters} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs rounded-xl py-2 px-3 transition shadow-sm">
              Apply Filters
            </button>
            <button onClick={handleResetFilters} className="text-slate-400 hover:text-slate-600 font-medium text-xs rounded-xl py-2 px-2 transition border border-slate-200 bg-white">
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* MIDDLE SECTION: CHARTS & PRODUCTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        
        {/* TOP IMPORTED PRODUCTS */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-sm text-slate-800">Top Imported Products</h3>
              <button className="text-blue-600 text-xs font-semibold">View All</button>
            </div>
            <div className="space-y-3.5">
              {PRODUCTS.map((prod, i) => (
                <div key={i} className="text-xs">
                  <div className="flex justify-between items-start text-slate-600 mb-1.5 gap-2">
                    <span className="font-medium text-slate-400 shrink-0">{prod.hsCode}</span>
                    <span className="truncate flex-1 font-medium text-slate-700">{prod.desc}</span>
                    <span className="font-semibold text-slate-800 shrink-0"> ₹ {(prod.value / 10000000).toFixed(2)} Cr</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-full rounded-full"  style={{ width: prod.barWidth }} />
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium shrink-0 w-8 text-right">{prod.share}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button className="text-blue-600 text-xs font-semibold text-center mt-4 pt-2 border-t border-slate-50">View All Products →</button>
        </div>

        {/* IMPORT VALUE TREND */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-sm text-slate-800">Import Value Trend (INR)</h3>
            <span className="text-[11px] font-bold text-slate-700 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">Top Ports</span>
          </div>
          <div className="mb-4">
            <span className="text-xl font-bold text-slate-800">₹{(totalImportValue / 10000000).toFixed(2)} Cr</span>
            <span className="text-xs text-green-500 font-medium ml-2"> {importTrend.length > 0 ? "-" : ""}</span>
          </div>
          <div className="h-[180px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={LINE_DATA}>
                <XAxis dataKey="date" tick={{ fill: '#94a3b8', fontSize: 10 }} tickLine={false} axisLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#10B981" strokeWidth={2.5} dot={{ fill: '#10B981', r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* IMPORTS BY COUNTRY (DONUT) */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-sm text-slate-800">Imports by Country of Destination</h3>
              <button className="text-blue-600 text-xs font-semibold">View All</button>
            </div>
            <div className="flex items-center justify-between gap-2">
              <div className="relative w-[130px] h-[130px] shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={dynamicPieData} innerRadius={42} outerRadius={60} dataKey="value" stroke="none">
                      {dynamicPieData.map((item, index) => <Cell key={index} fill={item.color} />)}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-[9px] uppercase text-slate-400 font-semibold">Total Value</span>
                  <span className="font-bold text-xs text-slate-800">{totalPieValue}</span>
                </div>
              </div>
              <div className="flex-1 space-y-1.5 pl-2 max-h-[140px] overflow-y-auto">
                {dynamicPieData.slice(0, 6).map((country, idx) => (
                  <div key={idx} className="flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-1.5 truncate">
                      <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: country.color }} />
                      <span className="text-slate-600 font-medium truncate">{country.name}</span>
                    </div>
                    <span className="text-slate-500 font-semibold ml-1">₹{country.value.toFixed(2)} Cr</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button className="text-blue-600 text-xs font-semibold text-center mt-4 pt-2 border-t border-slate-50">View All Countries →</button>
        </div>
      </div>
      
      {/* DYNAMIC SHIPMENTS TABLE */}
      <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm pb-10 ">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-sm text-slate-800">Recent Import Shipments</h3>
          <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-md font-medium">
            Showing {filteredShipments.length} Records
          </span>
        </div>

        <div className="overflow-x-auto -mx-5">
          <div className="inline-block min-w-full align-middle px-5">
            <table className="min-w-full divide-y divide-slate-100 text-xs">
              <thead>
                <tr className="text-left text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-100">
                  <th className="pb-3 font-medium">Shipment ID</th>
                  <th className="pb-3 font-medium">HS Code</th>
                  <th className="pb-3 font-medium">Product Description</th>
                  <th className="pb-3 font-medium">Exporter</th>
                  <th className="pb-3 font-medium">Buyer</th>
                  <th className="pb-3 font-medium">Destination Country</th>
                  <th className="pb-3 font-medium">Port of Exit</th>
                  <th className="pb-3 font-medium">Ship Date</th>
                  <th className="pb-3 font-medium">Value (INR)</th>
                  <th className="pb-3 font-medium text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-slate-600 font-medium">
                {filteredShipments.length > 0 ? (
                  filteredShipments.map((ship, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80 transition">
                      <td className="py-3.5 text-blue-600 font-semibold">{ship.sbNumber}</td>
                      <td className="py-3.5 text-slate-400 font-bold">{ship.cargo?.hsCode?.hsCode || "-"}</td>
                      <td className="py-3.5 max-w-[180px] truncate font-semibold text-slate-700">{ship.cargo?.productName || ship.cargo?.description || "-"}</td>
                      <td className="py-3.5 truncate text-slate-500">{ship.exporter?.companyName || "-"}</td>
                      <td className="py-3.5 truncate text-slate-500">{ship.buyer?.companyName || "-"}</td>
                      <td className="py-3.5 text-slate-700">{ship.route?.destinationCountry || "-"}</td>
                      <td className="py-3.5 text-slate-500">{ship.route?.originCity || "-"}</td>
                      <td className="py-3.5 text-slate-400 whitespace-nowrap">{new Date(ship.shipmentDate).toLocaleDateString("en-GB", {day: "2-digit", month: "short", year: "numeric",})}</td>
                      <td className="py-3.5 font-bold text-slate-800">₹ {(ship.cargo?.value / 10000000).toFixed(2)} Cr</td>
                      <td className="py-3.5 text-center">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-bold ${
                          ship.shipmentStatus === "Delivered" ? "bg-green-100 text-green-700" :
                          ship.shipmentStatus === "In Transit" ? "bg-blue-100 text-blue-700" : "bg-orange-100 text-orange-700"
                        }`}>{ship.shipmentStatus}</span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10" className="py-8 text-center text-slate-400 font-medium">
                      No matching records found. Try changing filters!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

          <div className="text-center ">
             <button className="text-blue-600 text-xs font-semibold text-center mt-4 pt-2 border-t border-slate-50">View All Shipments →</button>
           </div>
      </div>

    </div>
  );
}








