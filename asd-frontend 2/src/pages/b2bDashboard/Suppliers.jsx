import React, { useState,useEffect } from "react";
import ReactCountryFlag from "react-country-flag";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ExportReport from "../../components/b2bComponent/ExportReport";
import {
  getSuppliers,
  getSuppliersByCountry,
  getTopSuppliers,
  getSupplierPerformance,
  getVerificationStatus,
  getNewSuppliers,
  getSupplierInsights,
  getFilterOptions,
} from "../../api/SupplierApi";
import {
  CalendarDays,
  Download,
  Plus,
  Search,
  ChevronDown,
  BarChart3,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Settings,
  Wrench,
  FlaskConical,
  Package,
  Box,
  ShieldCheck,
  AlertTriangle,
  CircleSlash,
  Ban,
  Lightbulb,
  MapPin,
  LineChart as LineChartIcon,
  Info,
  HelpCircle,
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import AddSupplier from "../../components/b2bComponent/AddSupplier";
import AllSuppliers from "../../components/b2bComponent/AllSupplier";

const HEADING = "text-[#07156B]";

const COUNTRY_CODES = {
  China: "CN",
  Germany: "DE",
  Japan: "JP",
  India: "IN",
  "South Korea": "KR",
  UAE: "AE",
  USA: "US",
  Vietnam: "VN",
  Sweden: "SE",
};

function Flag({ country, size = 13 }) {
  return (
    <ReactCountryFlag
      countryCode={COUNTRY_CODES[country] || "US"}
      svg
      style={{ width: size, height: size, borderRadius: "2px" }}
    />
  );
}

const SUPPLIER_STYLES = {
  "Shenzhen Tech Components Co.": { icon: Cpu, bg: "bg-slate-800" },
  "Global Industrial Parts Ltd.": { icon: Settings, bg: "bg-slate-500" },
  "Tokyo Precision Tools": { icon: Wrench, bg: "bg-slate-600" },
  "Bhagwati Chemicals Pvt. Ltd.": { icon: FlaskConical, bg: "bg-teal-600" },
  "Korean Fiber Industries": { icon: Package, bg: "bg-indigo-900" },
  "Omega Plastics LLC": { icon: Box, bg: "bg-emerald-600" },
  "Delta Trading Co.": { icon: Package, bg: "bg-blue-600" },
  "Pacific Exports": { icon: Box, bg: "bg-orange-500" },
  "Nordic Components AB": { icon: Settings, bg: "bg-slate-500" },
  "Apex Solutions LLC": { icon: FlaskConical, bg: "bg-indigo-500" },
  "Samudra Textiles": { icon: Package, bg: "bg-teal-700" },
};

function SupplierIcon({ name, size = 26 }) {
  const s = SUPPLIER_STYLES[name] || { icon: Package, bg: "bg-slate-500" };
  const Icon = s.icon;
  return (
    <div className={`rounded-lg flex items-center justify-center shrink-0 text-white ${s.bg}`} style={{ width: size, height: size }}>
      <Icon size={size * 0.5} />
    </div>
  );
}

/*const SUPPLIERS = [
  { name: "Shenzhen Tech Components Co.", country: "China", category: "Electronics", codes: "8517,8536,8471", value: "₹18.45 Cr", score: 92, status: "ACTIVE" },
  { name: "Global Industrial Parts Ltd.", country: "Germany", category: "Machinery", codes: "8421,8431,8482", value: "₹15.32 Cr", score: 88, status: "ACTIVE" },
  { name: "Tokyo Precision Tools", country: "Japan", category: "Tools & Hardware", codes: "8207,8208,8203", value: "₹12.78 Cr", score: 85, status: "ACTIVE" },
  { name: "Bhagwati Chemicals Pvt. Ltd.", country: "India", category: "Chemicals", codes: "2902,2905,2915", value: "₹9.65 Cr", score: 78, status: "ACTIVE" },
  { name: "Korean Fiber Industries", country: "South Korea", category: "Textiles", codes: "5205,5402,5506", value: "₹8.21 Cr", score: 75, status: "ACTIVE" },
  { name: "Omega Plastics LLC", country: "UAE", category: "Plastic Raw Materials", codes: "3901,3902,3903", value: "₹6.90 Cr", score: 72, status: "PENDING" },
];*/

/*const SUPPLIERS_BY_COUNTRY = [
  { name: "China", value: 642, percent: "26.1%", color: "#2563EB" },
  { name: "India", value: 512, percent: "20.8%", color: "#10B981" },
  { name: "Germany", value: 286, percent: "11.6%", color: "#F59E0B" },
  { name: "USA", value: 248, percent: "10.1%", color: "#EF4444" },
  { name: "UAE", value: 186, percent: "7.6%", color: "#38BDF8" },
  { name: "Others", value: 584, percent: "23.8%", color: "#CBD5E1" },
]; */

/*const TOP_SUPPLIERS_BY_VALUE = [
  { rank: 1, name: "Shenzhen Tech Components", value: "₹18.45 Cr" },
  { rank: 2, name: "Global Industrial Parts Ltd.", value: "₹15.32 Cr" },
  { rank: 3, name: "Tokyo Precision Tools", value: "₹12.78 Cr" },
  { rank: 4, name: "Bhagwati Chemicals Pvt. Ltd.", value: "₹9.65 Cr" },
  { rank: 5, name: "Korean Fiber Industries", value: "₹8.21 Cr" },
];*/


/*const PERFORMANCE_METRICS = [
  { name: "On-time Delivery", value: 89, color: "#10B981" },
  { name: "Quality", value: 82, color: "#10B981" },
  { name: "Response Time", value: 76, color: "#F59E0B" },
  { name: "Compliance", value: 91, color: "#10B981" },
  { name: "Service", value: 74, color: "#F43F5E" },
];*/



/*const VERIFICATION_STATUS = [
  { icon: ShieldCheck, bg: "bg-emerald-50", color: "text-emerald-500", label: "Verified Suppliers", value: "2,154", percent: "87.6%" },
  { icon: AlertTriangle, bg: "bg-amber-50", color: "text-amber-500", label: "Pending Verification", value: "128", percent: "5.2%" },
  { icon: CircleSlash, bg: "bg-rose-50", color: "text-rose-500", label: "Verification Expired", value: "74", percent: "3.0%" },
  { icon: Ban, bg: "bg-rose-50", color: "text-rose-500", label: "Rejected", value: "102", percent: "4.2%" },
];*/

/* const NEW_SUPPLIERS = [
  { name: "Delta Trading Co.", country: "India", date: "23 Apr 2025" },
  { name: "Pacific Exports", country: "Vietnam", date: "21 Apr 2025" },
  { name: "Nordic Components AB", country: "Sweden", date: "19 Apr 2025" },
  { name: "Apex Solutions LLC", country: "USA", date: "18 Apr 2025" },
  { name: "Samudra Textiles", country: "India", date: "16 Apr 2025" },
]; */

/*const SUPPLIER_INSIGHTS = [
  { icon: Lightbulb, bg: "bg-blue-50", color: "text-blue-500", text: "Electronics category has the highest number of active suppliers." },
  { icon: MapPin, bg: "bg-rose-50", color: "text-rose-500", text: "China contributes to 26.1% of total trade value." },
  { icon: LineChartIcon, bg: "bg-emerald-50", color: "text-emerald-500", text: "Average supplier score improved by 6.3 pts this month." },
];*/

function SectionCard({ children, className = "" }) {
  return (
    <div className={`bg-white border border-slate-100 rounded-2xl p-4 shadow-xs ${className}`}>
      {children}
    </div>
  );
}

function ViewAllHeader({ title, extra , onClick}) {
  return (
    <div className="flex justify-between items-center mb-3">
      <h3 className={`font-bold text-sm ${HEADING}`}>{title} {extra}</h3>
      <button className="text-blue-600 text-[11px] font-bold shrink-0"  onClick={onClick} >View All</button>
    </div>
  );
}

export default function SuppliersDashboard() {

  const [suppliers, setSuppliers] = useState([]);
  const [suppliersByCountry, setSuppliersByCountry] = useState([]);
  const [topSuppliers, setTopSuppliers] = useState([]);
  const [supplierPerformance, setSupplierPerformance] = useState({});
  const [verificationStatus, setVerificationStatus] = useState({});
  const [newSuppliers, setNewSuppliers] = useState([]);
  const [supplierInsights, setSupplierInsights] = useState({});
  const [filterOptions, setFilterOptions] = useState({});
  const [loading, setLoading] = useState(true);
  const [addSupplier, setAddSupplier] = useState(false);
  const [shipmentStartDate, setShipmentStartDate] = useState(null);
  const [shipmentEndDate, setShipmentEndDate] = useState(null);
  const [dateRange, setDateRange] = useState(false);
  const [exportReport, setExportReport] = useState(false);
  const [allSupplier, setAllSupplier] = useState(false)


  const fetchSuppliers = async () => {
    try {
      const [suppliers, suppliersByCountryRes, topSuppliersRes, supplierPerformanceRes, verificationStatusRes, newSuppliersRes, supplierInsightsRes, filterOptionsRes] = await Promise.all([
        getSuppliers(),
        getSuppliersByCountry(),
        getTopSuppliers(),
        getSupplierPerformance(),
        getVerificationStatus(),
        getNewSuppliers(),
        getSupplierInsights(),
        getFilterOptions()
      ]);

      setSuppliers(suppliers.data.data || []);
      setSuppliersByCountry(suppliersByCountryRes.data.data || []);
      setTopSuppliers(topSuppliersRes.data.data || []);
      setSupplierPerformance(supplierPerformanceRes.data.data || {});
      setVerificationStatus(verificationStatusRes.data.data || {});
      setNewSuppliers(newSuppliersRes.data.data || []);
      setSupplierInsights(supplierInsightsRes.data.data || {});
      setFilterOptions(filterOptionsRes.data.data || {});
    } catch (error) {
      console.error("Error fetching supplier data:", error);
    } finally {
      setLoading(false);
    }
  };

  const totalSuppliers = suppliersByCountry.reduce((sum, item) => sum + item.count,0);
  const colors = ["#2563EB","#10B981","#F59E0B","#EF4444","#38BDF8","#CBD5E1",];
  const SUPPLIERS_BY_COUNTRY = suppliersByCountry.map((item, index) => ({name: item._id, value: item.count, percent: totalSuppliers > 0 ? ((item.count / totalSuppliers) * 100).toFixed(1) + "%" : "0%", color: colors[index % colors.length],}));
  const TOP_SUPPLIERS_BY_VALUE = topSuppliers.map((item, index) => ({rank: index + 1, name: item.companyName, value: `₹${(item.totalTradeValue / 10000000).toFixed(2)} Cr`,}));
  const PERFORMANCE_METRICS = [
  {name: "Total Suppliers", value: supplierPerformance.totalSuppliers || 0, color: "#2563EB",},
  {name: "Active Suppliers", value: supplierPerformance.activeSuppliers || 0, color: "#10B981",},
  {name: "Pending Suppliers", value: supplierPerformance.pendingSuppliers || 0, color: "#F59E0B",},
  {name: "Average Score", value: Number(supplierPerformance.averageScore || 0).toFixed(1), color: "#8B5CF6",},];
  const totalVerification =
  (verificationStatus.verified || 0) +
  (verificationStatus.pending || 0) +
  (verificationStatus.rejected || 0) +
  (verificationStatus.expired || 0);
  const VERIFICATION_STATUS = [
    {icon: ShieldCheck, bg: "bg-emerald-50", color: "text-emerald-500", label: "Verified Suppliers", value: verificationStatus.verified || 0,percent: totalVerification > 0 ? ((verificationStatus.verified / totalVerification) * 100).toFixed(1) + "%" : "0%",},
    {icon: AlertTriangle, bg: "bg-amber-50", color: "text-amber-500", label: "Pending Verification", value: verificationStatus.pending || 0, percent: totalVerification > 0 ? ((verificationStatus.pending / totalVerification) * 100).toFixed(1) + "%" : "0%", },
    {icon: CircleSlash, bg: "bg-rose-50", color: "text-rose-500", label: "Verification Expired", value: verificationStatus.expired || 0, percent: totalVerification > 0 ? ((verificationStatus.expired / totalVerification) * 100).toFixed(1) + "%" : "0%",},
    {icon: Ban, bg: "bg-rose-50", color: "text-rose-500", label: "Rejected", value: verificationStatus.rejected || 0, percent: totalVerification > 0 ? ((verificationStatus.rejected / totalVerification) * 100).toFixed(1) + "%" : "0%",},
  ];
  const NEW_SUPPLIERS = newSuppliers.map((item) => ({name: item.companyName, country: item.country, 
    date: new Date(item.joinedOn).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
  }));
  const SUPPLIER_INSIGHTS = [
    {icon: Lightbulb, bg: "bg-blue-50", color: "text-blue-500", text: `${supplierInsights.topCategory?._id || "N/A"} category has the highest number of suppliers.`,},
    {icon: MapPin, bg: "bg-rose-50", color: "text-rose-500", text: `${supplierInsights.topCountry?._id || "N/A"} has the highest number of suppliers than (${supplierInsights.topCountry?.count || 0}).`,},
    {icon: LineChartIcon, bg: "bg-emerald-50", color: "text-emerald-500", text: `Average supplier score is improved by ${(supplierInsights.averageScore || 0).toFixed(1)}.`,},
  ];
  
  useEffect(() => {
    fetchSuppliers();
  }, []);

  return (
    <div className="min-h-screen w-full overflow-y-auto bg-[#F8FAFC] text-slate-600 font-sans antialiased py-7">
      <div className="max-w-[1500px] mx-auto p-3 sm:p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-4">
          <div>
            <h1 className={`text-xl sm:text-2xl font-bold tracking-tight ${HEADING}`}>Suppliers</h1>
            <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">
              Manage your global supplier network and performance.
            </p>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto flex-wrap">
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
                className={`bg-white border border-slate-200 text-[11px] sm:text-xs font-semibold pl-3 pr-9 py-2 rounded-xl shadow-xs hover:bg-slate-50 transition whitespace-nowrap outline-none cursor-pointer ${HEADING}`}
              />
              <CalendarDays
                size={14}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
            </div>
            <button onClick={() => setExportReport(true)} className={`flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border border-slate-200 text-[11px] sm:text-xs font-semibold px-3 sm:px-4 py-2 rounded-xl shadow-xs hover:bg-slate-50 transition whitespace-nowrap ${HEADING}`}>
              <Download size={14} className="text-slate-400" />
              Export Report
            </button>
            <button onClick={() => setAddSupplier(true)} className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-[11px] sm:text-xs font-semibold px-3 sm:px-4 py-2 rounded-xl text-white shadow-xs transition whitespace-nowrap">
              <Plus size={14} />
              Add Supplier
            </button>
          </div>
        </div>

        <SectionCard className="mb-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 items-end">
            <div>
              <label className="text-[10px] #05155F font-bold block mb-1.5 uppercase">Search Supplier</label>
              <div className="relative">
                <input
                  placeholder="Search by name, HS Code, Cat."
                  className="w-full bg-slate-50/70 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs focus:outline-none placeholder-slate-400"
                />
                <Search size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </div>
            <div>
              <label className="text-[10px] #05155F font-bold block mb-1.5 uppercase">Country / Region</label>
              <div className="relative">
                <select className="w-full bg-slate-50/70 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs appearance-none focus:outline-none">
                  <option value="">All Countries</option>
                     {filterOptions.countries?.map((country, index) => (
                        <option key={index} value={country}>{country} </option>
                      ))}
                </select>
                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="text-[10px] #05155F font-bold block mb-1.5 uppercase">Product / HS Code</label>
              <div className="relative">
                <select className="w-full bg-slate-50/70 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs appearance-none focus:outline-none">
                  <option value="">All Products</option>
                     {filterOptions.products?.map((product, index) => (
                       <option key={index} value={product}>{product}</option>
                     ))}
                </select>
                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="text-[10px] #05155F font-bold block mb-1.5 uppercase">Supplier Type</label>
              <div className="relative">
                <select className="w-full bg-slate-50/70 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs appearance-none focus:outline-none">
                  <option value="">All Type</option>
                      {filterOptions.supplierTypes?.map((type, index) => (
                        <option key={index} value={type}>{type}</option>
                      ))}
                </select>
                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="text-[10px] #05155F font-bold block mb-1.5 uppercase">Status</label>
              <div className="relative">
                <select className="w-full bg-slate-50/70 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs appearance-none focus:outline-none">
                  <option value="">This Status</option>
                    {filterOptions.statuses?.map((status, index) => (
                      <option key={index} value={status}>{status}</option>
                    ))}
                </select>
                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-1.5 bg-slate-50/80 border border-slate-200 text-slate-600 rounded-xl py-2 px-3 text-xs font-semibold hover:bg-slate-100 transition whitespace-nowrap">
                More Filters
              </button>
              <button className="text-slate-400 hover:text-slate-600 text-xs font-medium px-1 whitespace-nowrap">Reset</button>
            </div>
          </div>
        </SectionCard>

        <div className="border border-blue-400 rounded-2xl p-4 mb-5 bg-white">
          <div className="flex justify-between items-center mb-3 flex-wrap gap-2">
            <h3 className={`font-bold text-base ${HEADING}`}>
              Supplier List <span className="text-slate-400 font-medium">({totalSuppliers})</span>
            </h3>
            <button className="flex items-center gap-1.5 text-blue-600 text-[12px] font-bold">
              <BarChart3 size={14} /> Customize Columns
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[11px] min-w-[920px]">
              <thead>
                <tr className="text-[10px] text-slate-400 uppercase font-bold border-b border-slate-100">
                  <th className="text-left py-2 pr-2"><input type="checkbox" className="accent-blue-600" /></th>
                  <th className="text-left py-2 font-bold">Supplier Name</th>
                  <th className="text-left py-2 font-bold">Country</th>
                  <th className="text-left py-2 font-bold">Category</th>
                  <th className="text-left py-2 font-bold">Products / HS Codes</th>
                  <th className="text-right py-2 font-bold">Trade Value (INR)</th>
                  <th className="text-center py-2 font-bold">Supplier Score</th>
                  <th className="text-left py-2 font-bold">Status</th>
                  <th className="text-right py-2 font-bold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {suppliers.map((s, i) => (
                  <tr key={i}>
                    <td className="py-3 pr-2"><input type="checkbox" className="accent-blue-600" /></td>
                    <td className="py-3 whitespace-nowrap">
                      <div className="flex items-center gap-2.5">
                        <SupplierIcon name={s.companyName} />
                        <span className={`font-semibold ${HEADING}`}>{s.companyName}</span>
                      </div>
                    </td>
                    <td className="py-3 whitespace-nowrap">
                      <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                        <Flag country={s.country} /> {s.country}
                      </span>
                    </td>
                    <td className="py-3 text-slate-600 whitespace-nowrap">{s.category}</td>
                    <td className="py-3 text-slate-400 whitespace-nowrap">{s.hsCodes.join(", ")}</td>
                    <td className="py-3 text-right font-bold text-slate-800 whitespace-nowrap">₹{(s.totalTradeValue / 10000000).toFixed(2)} Cr</td>
                    <td className="py-3 text-center">
                      <span className="bg-green-100 text-green-700 font-bold text-[11px] px-2.5 py-0.5 rounded-md">{s.supplierScore}</span>
                    </td>
                    <td className={`py-3 font-bold whitespace-nowrap ${s.status === "Active" ? "text-green-600" : "text-orange-500"}`}>
                      {s.status}
                    </td>
                    <td className="py-3 text-right">
                      <button className="text-slate-400 hover:text-slate-600">
                        <MoreVertical size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-4 pt-3 border-t border-slate-100">
            <span className="text-[11px] text-slate-400 font-medium">Showing 1 to 10 of 2,458 suppliers</span>
            <div className="flex items-center gap-1.5">
              <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400">
                <ChevronLeft size={14} />
              </button>
              <button className="w-7 h-7 flex items-center justify-center rounded-lg bg-blue-600 text-white text-[11px] font-bold">1</button>
              <button className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-500 text-[11px] font-bold">2</button>
              <button className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-500 text-[11px] font-bold">3</button>
              <span className="text-slate-400 text-[11px]">...</span>
              <button className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-500 text-[11px] font-bold">246</button>
              <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400">
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-5">
          <SectionCard>
            <ViewAllHeader title="Suppliers by Country" onClick={() => setAllSupplier(true)} />
            <div className="flex items-center gap-3">
              <div className="relative w-[120px] h-[120px] shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={SUPPLIERS_BY_COUNTRY} innerRadius={36} outerRadius={56} dataKey="value" stroke="none">
                      {SUPPLIERS_BY_COUNTRY.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className={`font-black text-base ${HEADING}`}>{totalSuppliers}</span>
                  <span className="text-[8px] text-slate-400 font-bold uppercase leading-none">Total</span>
                </div>
              </div>
              <div className="space-y-5  flex-1  items-center text-[11px]">
                {SUPPLIERS_BY_COUNTRY.map((r, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: r.color }} />
                      <span className="text-slate-600 font-semibold">{r.name}</span>
                    </div>
                    <span className={`font-bold whitespace-nowrap ${HEADING}`}>{r.value} ({r.percent})</span>
                  </div>
                ))}
              </div>
            </div>
          </SectionCard>

          <SectionCard>
            <ViewAllHeader title="Top Suppliers by Trade Value" onClick={() => setAllSupplier(true)} />
            <div className="space-y-6">
              {TOP_SUPPLIERS_BY_VALUE.map((s, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-slate-400 font-bold text-[11px] w-3">{s.rank}</span>
                    <SupplierIcon name={s.name} size={24} />
                    <span className="text-[12px] font-semibold text-slate-700">{s.name}</span>
                  </div>
                  <span className={`text-[12px] font-bold whitespace-nowrap ${HEADING}`}>{s.value}</span>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard>
            <div className="flex justify-between items-center mb-3">
              <h3 className={`font-bold text-sm ${HEADING}`}>Supplier Performance Overview</h3>
              <button className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg px-2 py-1 text-[10px] font-semibold text-slate-600 shrink-0">
                This Month <ChevronDown size={11} className="text-slate-400" />
              </button>
            </div>
            <div className="relative w-full   flex flex-col  items-center justify-between mb-2.5">
                <div className="absolut top-0 w-full h-[120px] "> 
              <ResponsiveContainer width="100%"  height={200}>
                <PieChart>
                  <Pie
                    data={[  { value: supplierPerformance.averageScore || 0 },
                             { value: 100 - (supplierPerformance.averageScore || 0) } 
                          ]}
                    startAngle={180}
                    endAngle={0}
                    innerRadius="70%"
                    outerRadius="100%"
                    dataKey="value"
                    stroke="none"
                    cy="50%"
                  >
                    <Cell fill="#10B981" />
                    <Cell fill="#E2E8F0" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              </div>
              <div className="absolute bottom-0 flex flex-col items-center text-center">
                <span className={`font-black text-lg ${HEADING}`}>{Number(supplierPerformance.averageScore || 0).toFixed(1)} / 100</span>
                <span className="text-[9px] text-slate-400 font-semibold">Average Supplier Score</span>
                <span className="text-[9px] text-emerald-500 font-bold">▲ 6.3 pts vs last month</span>
              </div>
            </div>
            <div className="space-y-2.5 mt-2">
              {PERFORMANCE_METRICS.map((m, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-500 font-semibold w-24 shrink-0">{m.name}</span>
                  <div className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: m.name === "Average Score"? `${m.value}%`: `${supplierPerformance.totalSuppliers ? (m.value / supplierPerformance.totalSuppliers) * 100: 0}%`, backgroundColor: m.color }} />
                  </div>
                  <span className={`text-[10px] font-bold w-9 text-right ${HEADING}`}>{m.name === "Average Score"  ? `${m.value}%` : m.value}</span>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-4">
          <SectionCard>
            <ViewAllHeader title="Supplier Verification Status"  onClick={() => setAllSupplier(true)} />
            <div className="space-y-2.5">
              {VERIFICATION_STATUS.map((v, i) => {
                const Icon = v.icon;
                return (
                  <div key={i} className="flex items-center justify-between border border-slate-100 rounded-xl p-2.5">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${v.bg} ${v.color}`}>
                        <Icon size={16} />
                      </div>
                      <span className={`text-[12px] font-bold ${HEADING}`}>{v.label}</span>
                    </div>
                    <span className={`text-[12px] font-bold whitespace-nowrap ${HEADING}`}>
                      {v.value} <span className="text-slate-400 font-medium">({v.percent})</span>
                    </span>
                  </div>
                );
              })}
            </div>
          </SectionCard>

          <SectionCard>
            <ViewAllHeader title="New Suppliers" onClick={() => setAllSupplier(true)} extra={<span className="text-slate-400 font-normal">(This Month)</span> } />
            <div className="overflow-x-auto">
              <table className="w-full text-[11px] min-w-[280px]">
                <thead>
                  <tr className="text-[9px] text-slate-400 uppercase font-bold">
                    <th className="text-left pb-2 font-bold">Supplier</th>
                    <th className="text-left pb-2 font-bold">Country</th>
                    <th className="text-right pb-2 font-bold">Joined On</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {NEW_SUPPLIERS.map((n, i) => (
                    <tr key={i}>
                      <td className="py-2.5">
                        <div className="flex items-center gap-2">
                          <SupplierIcon name={n.name} size={22} />
                          <span className={`font-semibold whitespace-nowrap ${HEADING}`}>{n.name}</span>
                        </div>
                      </td>
                      <td className="py-2.5 whitespace-nowrap">
                        <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                          <Flag country={n.country} /> {n.country}
                        </span>
                      </td>
                      <td className="py-2.5 text-right text-slate-500 whitespace-nowrap">{n.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>

          <SectionCard>
            <h3 className={`font-bold text-sm mb-3 ${HEADING}`}>Supplier Insights</h3>
            <div className="space-y-8">
              {SUPPLIER_INSIGHTS.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={i} className="flex items-start   gap-2.5">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${s.bg} ${s.color}`}>
                      <Icon size={14} />
                    </div>
                    <p className="text-[11px] text-slate-600 font-medium leading-snug">{s.text}</p>
                  </div>
                );
              })}
            </div>
            <button className="text-blue-600 text-xs font-bold mt-10">View Detailed Insights →</button>
          </SectionCard>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-t border-slate-200 pt-3 pb-2">
          <span className="flex items-center gap-1.5 text-[10px] text-slate-400 font-medium">
            <Info size={12} /> All data is updated daily. Last updated on 24 Apr 2025, 09:30 AM
          </span>
          <span className="flex items-center gap-1.5 text-[10px] text-slate-500 font-semibold cursor-pointer">
            <HelpCircle size={12} /> Help Center
          </span>
        </div>
      </div>

      {addSupplier && (
        <AddSupplier onClose={() => setAddSupplier(false)} />
      )}

      {exportReport && (
        <ExportReport onClose={() => setExportReport(false)} />
      )}

      {allSupplier && (
        <AllSuppliers onClose={() => setAllSupplier(false)} />

      )}
    </div>
  );
}