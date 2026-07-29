import React,{ useState,useEffect } from 'react';
import {
  getDashboard,
  getContracts,
  getStatusSummary,
  getTypeSummary,
  getTopParties,
  getInsights,
  getValueTrend,
  getExpiringContracts,
  getFilterOptions
} from '../../api/ContractApi';
import { 
  Search, Calendar, ChevronDown, FileText,  SlidersHorizontal,
  CheckCircle, AlertTriangle, XCircle, DollarSign, 
  Percent, Download, Plus, MoreVertical, ChevronLeft, ChevronRight 
} from 'lucide-react';
import ReactCountryFlag from "react-country-flag";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function ContractDashboard() {

  const [dashboardData, setDashboardData] = useState({});
  const [contracts, setContracts] = useState([]);
  const [statusSummary, setStatusSummary] = useState([]);
  const [typeSummary, setTypeSummary] = useState([]);
  const [topParties, setTopParties] = useState([]);
  const [insights, setInsights] = useState({});
  const [valueTrend, setValueTrend] = useState([]);
  const [expiringContracts, setExpiringContracts] = useState([]);
  const [filterOptions, setFilterOptions] = useState({});
  const [loading, setLoading] = useState(true);
  
  const fetchDashboard = async () => {
    try {
      const res = await getDashboard();
      console.log("Dashboard:", res.data);
      setDashboardData(res.data.data || {});
    } catch (err) {
      console.error(err);
    }
  };
  const fetchContracts = async () => {
    try {
      const res = await getContracts();
      console.log("Contracts:", res.data);
      setContracts(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };
  const fetchStatusSummary = async () => {
    try {
      const res = await getStatusSummary();
      console.log("Status Summary:", res.data);
      setStatusSummary(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };
  const fetchTypeSummary = async () => {
    try {
      const res = await getTypeSummary();
      console.log("Type Summary:", res.data);
      setTypeSummary(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };
  const fetchTopParties = async () => {
    try {
      const res = await getTopParties();
      console.log("Top Parties:", res.data);
      setTopParties(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };
  const fetchInsights = async () => {
    try {
      const res = await getInsights();
      console.log("Insights:", res.data);
      setInsights(res.data.data || {});
    } catch (err) {
      console.error(err);
    }
  };
  const fetchValueTrend = async () => {
    try {
      const res = await getValueTrend();
      console.log("Value Trend:", res.data);
      setValueTrend(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };
  const fetchExpiringContracts = async () => {
    try {
      const res = await getExpiringContracts();
      console.log("Expiring Contracts:", res.data);
      setExpiringContracts(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };
  const fetchFilterOptions = async () => {
    try {
      const res = await getFilterOptions();
      console.log("Filter Options:", res.data);
      setFilterOptions(res.data.data || {});
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDashboard();
    fetchContracts();
    fetchStatusSummary();
    fetchTypeSummary();
    fetchTopParties();
    fetchInsights();
    fetchValueTrend();
    fetchExpiringContracts();
    fetchFilterOptions();
  },[]);


  // Mock Data for Table
 /* const contracts = [
    { id: "CTR-2025-1045", name: "Electronics Supply Agreement", party: "Shenzhen Tech Co.", type: "Purchase",flag: "CN",  country: "China", start: "01 Apr 2025", end: "31 Mar 2026", value: "₹ 125.45 Cr", status: "Active" },
    { id: "CTR-2025-1044", name: "Machinery Import Contract", party: "KraussMaffei GmbH", type: "Purchase",flag: "DE",  country: "Germany", start: "15 Mar 2025", end: "14 Mar 2026", value: "₹ 98.76 Cr", status: "Active" },
    { id: "CTR-2025-1043", name: "Raw Materials Supply", party: "Reliance Industries", type: "Supply",flag: "IN",  country: "India", start: "10 Feb 2025", end: "09 Feb 2026", value: "₹ 76.32 Cr", status: "Active" },
    { id: "CTR-2025-1042", name: "Automotive Parts Agreement", party: "Toyota Tsusho", type: "Purchase",flag: "JP",  country: "Japan", start: "20 Jan 2025", end: "19 Jan 2026", value: "₹ 64.15 Cr", status: "Active" },
    { id: "CTR-2025-1041", name: "Packaging Material Supply", party: "Uflex Ltd.", type: "Supply",flag: "IN",  country: "India", start: "05 Feb 2025", end: "04 Feb 2026", value: "₹ 52.09 Cr", status: "Expiring Soon" },
    { id: "CTR-2025-1040", name: "Chemical Import Contract", party: "BASF SE", type: "Purchase",flag: "DE",  country: "Germany", start: "12 Jan 2025", end: "11 Jan 2026", value: "₹ 47.32 Cr", status: "Expiring Soon" },
    { id: "CTR-2025-1039", name: "Textile Fabric Supply", party: "Texhong Textiles", type: "Supply",flag: "CN",  country: "China", start: "01 Jan 2025", end: "31 Dec 2025", value: "₹ 38.75 Cr", status: "Active" },
    { id: "CTR-2025-1038", name: "Metals & Alloys Supply", party: "Jindal Steel", type: "Supply",flag: "IN",  country: "India", start: "08 Dec 2024", end: "07 Dec 2025", value: "₹ 32.10 Cr", status: "Expired" },
    { id: "CTR-2025-1045", name: "Electronics Supply Agreement", party: "Shenzhen Tech Co.", type: "Purchase",flag: "CN",  country: "China", start: "01 Apr 2025", end: "31 Mar 2026", value: "₹ 125.45 Cr", status: "Active" },
    { id: "CTR-2025-1044", name: "Machinery Import Contract", party: "KraussMaffei GmbH", type: "Purchase",flag: "DE",  country: "Germany", start: "15 Mar 2025", end: "14 Mar 2026", value: "₹ 98.76 Cr", status: "Active" },
    { id: "CTR-2025-1043", name: "Raw Materials Supply", party: "Reliance Industries", type: "Supply",flag: "IN",  country: "India", start: "10 Feb 2025", end: "09 Feb 2026", value: "₹ 76.32 Cr", status: "Active" },
    { id: "CTR-2025-1042", name: "Automotive Parts Agreement", party: "Toyota Tsusho", type: "Purchase",flag: "JP",  country: "Japan", start: "20 Jan 2025", end: "19 Jan 2026", value: "₹ 64.15 Cr", status: "Active" },
    { id: "CTR-2025-1041", name: "Packaging Material Supply", party: "Uflex Ltd.", type: "Supply",flag: "IN",  country: "India", start: "05 Feb 2025", end: "04 Feb 2026", value: "₹ 52.09 Cr", status: "Expiring Soon" },
    { id: "CTR-2025-1040", name: "Chemical Import Contract", party: "BASF SE", type: "Purchase",flag: "DE",  country: "Germany", start: "12 Jan 2025", end: "11 Jan 2026", value: "₹ 47.32 Cr", status: "Expiring Soon" },
    { id: "CTR-2025-1039", name: "Textile Fabric Supply", party: "Texhong Textiles", type: "Supply",flag: "CN",  country: "China", start: "01 Jan 2025", end: "31 Dec 2025", value: "₹ 38.75 Cr", status: "Active" },
    { id: "CTR-2025-1038", name: "Metals & Alloys Supply", party: "Jindal Steel", type: "Supply",flag: "IN",  country: "India", start: "08 Dec 2024", end: "07 Dec 2025", value: "₹ 32.10 Cr", status: "Expired" },
  ];*/

  const maxValue = valueTrend?.length > 0 ? Math.max(...valueTrend.map(item => item.totalValue || item.value || 0)) : 0;

  return (
    <div className="overflow-y-auto bg-slate-50 text-slate-800 font-sans p-6">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-200 pb-5 mb-6 mt-10">
        <div>
          <h1 className="text-2xl font-bold text-[#0A146E]">Contracts</h1>
          <p className="text-sm text-slate-500 mt-1">Manage, monitor and analyze all your trade contracts in one place.</p>
        </div>
        <div className="flex items-center text-[#0A146E] gap-3 mt-4 md:mt-0">
          <div className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-2 rounded-lg text-sm text-slate-600 shadow-sm">
            <Calendar size={16} />
            <span>01 Apr 2025 - 24 Apr 2025</span>
          </div>
          <button className="flex items-center gap-2  border border-slate-200 bg-white hover:bg-slate-50 px-4 py-2 rounded-lg text-sm font-medium shadow-sm">
            <Download size={16} /> Export Report
          </button>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition">
            <Plus size={16} /> Add Contracts
          </button>
        </div>
      </div>

      {/* TOP STATS CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        <StatCard title="Total Contracts" value={dashboardData.totalContracts || 0} change="" isPositive={true} icon={<FileText className="text-blue-600" />} />
        <StatCard title="Active Contracts" value={dashboardData.activeContracts || 0} change="" isPositive={true} icon={<CheckCircle className="text-green-600" />} />
        <StatCard title="Expiring Soon" value={dashboardData.expiringSoon || 0} change="" isPositive={false} icon={<AlertTriangle className="text-amber-500" />} />
        <StatCard title="Expired Contracts" value={dashboardData.expiredContracts || 0} change="" isPositive={false} icon={<XCircle className="text-red-500" />} />
        <StatCard title="Total Contract Value (INR)" value={`₹ ${Number(dashboardData.totalContractValue || 0).toLocaleString("en-IN",{maximumFractionDigits: 2,})} Cr`} change="" isPositive={true} icon={<DollarSign className="text-emerald-600" />} />
        <StatCard title="Avg. Contract Value" value={`₹ ${Number(dashboardData.averageContractValue || 0).toLocaleString("en-IN",{maximumFractionDigits: 2,})} Cr`} change="" isPositive={true} icon={<Percent className="text-indigo-600" />} />
      </div>

      {/* FILTERS BAR */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 items-center shadow-sm">
        <div className="mb-3">
            <span className="text-[10px] text-[#06155F] uppercase font-bold tracking-wider">Search contacts</span>
            <div className='relative lg:col-span-2'>  
               <Search className="absolute left-3 top-1.5 text-slate-400" size={18} />
          <input type="text" placeholder="Search by contract no., party, ref..." className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500" /> </div>
       
        </div>
        <FilterSelect label="Date Range" value="01 Apr 2025 - 24 Apr 2025" />
        <FilterSelect label="Contract Type" value="All Types" options={filterOptions.types || []}/>
        <FilterSelect label="Country / Region" value="All Countries" options={filterOptions.countries || []}/>
        <FilterSelect label="Party Type" value="All Parties" options={filterOptions.partyTypes || []}/>
        <FilterSelect label="Status" value="All Status" options={filterOptions.status || []}/>
        <div className="flex mt-3 gap-3">
          <button className="sm:flex-1 flex items-center justify-center gap-4 py-1.5 px-3 bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-semibold text-slate-600 hover:bg-slate-100">
            <SlidersHorizontal size={12} /> More Filters
          </button>
          <button className="text-[11px] font-semibold text-slate-400 py-2 hover:text-slate-600 px-1">Reset</button>
        </div>
      </div>

      {/* MAIN CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        
     <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
          <div className="p-4 border-b border-slate-100 flex justify-between items-center">
            <h2 className="font-semibold text-[#06155F]">Contract List ({contracts.length})</h2>
            <button className="text-xs font-medium text-slate-600 border border-slate-200 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50">Customize Columns</button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <th className="p-4 w-4"><input type="checkbox" className="rounded border-slate-300" /></th>
                  <th className="p-4">Contract No.</th>
                  <th className="p-4">Contract Name</th>
                  <th className="p-4">Party</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Country</th>
                  <th className="p-4">Value (INR)</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 w-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {contracts.map((item, index) => (
                  <tr key={index} className="hover:bg-slate-50/50 transition">
                    <td className="p-4"><input type="checkbox" className="rounded border-slate-300" /></td>
                    <td className="p-4 font-semibold text-emerald-600 cursor-pointer hover:underline">{item.contractNo}</td>
                    <td className="p-4 font-medium text-slate-900 max-w-[180px] truncate">{item.contractName}</td>
                    <td className="p-4 text-slate-600">{item.party}</td>
                    <td className="p-4 text-slate-500">{item.type}</td>
                 
                    
                    <td className="p-4 text-slate-700 items-center"><ReactCountryFlag className='text-center'
                                 countryCode={item.countryCode}
                                   svg
                                   style={{ width: "18px", height: "13px" }}
                         />{item.country}</td>
                    <td className="p-4 font-semibold text-slate-900">{`₹ ${(item.value / 10000000).toFixed(2)} Cr`}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        item.status === 'Active' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4 text-center text-slate-400 cursor-pointer hover:text-slate-600"><MoreVertical size={16} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Showing 1 to {contracts.length} of {contracts.length} contracts</span>
            <div className="flex items-center gap-1">
              <button className="p-1 border border-slate-200 rounded hover:bg-slate-50"><ChevronLeft size={16} /></button>
              <button className="px-2.5 py-1 bg-blue-600 text-white rounded font-medium">1</button>
              <button className="px-2.5 py-1 border border-slate-200 rounded hover:bg-slate-50">2</button>
              <button className="px-2.5 py-1 border border-slate-200 rounded hover:bg-slate-50">3</button>
              <span className="px-1">...</span>
              <button className="px-2.5 py-1 border border-slate-200 rounded hover:bg-slate-50">127</button>
              <button className="p-1 border border-slate-200 rounded hover:bg-slate-50"><ChevronRight size={16} /></button>
            </div>
          </div>
        </div>
        {/* RIGHT COLUMN: CHARTS & SIDEBAR */}
        <div className="space-y-6">
          
          {/* CONTRACTS BY STATUS */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
            <h3 className="font-bold text-sm text-[#06155F] mb-4">Contracts by Status</h3>
            <div className="flex items-center justify-between gap-2">
              <div className="relative w-28 h-28 flex-shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15.91" fill="none" stroke="#E2E8F0" strokeWidth="3.5" />
                  <circle cx="18" cy="18" r="15.91" fill="none" stroke="#2563EB" strokeWidth="3.5" strokeDasharray="66 100" strokeDashoffset="0" />
                  <circle cx="18" cy="18" r="15.91" fill="none" stroke="#FBBF24" strokeWidth="3.5" strokeDasharray="8 100" strokeDashoffset="-66" />
                  <circle cx="18" cy="18" r="15.91" fill="none" stroke="#EF4444" strokeWidth="3.5" strokeDasharray="4 100" strokeDashoffset="-74" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-base font-bold text-slate-800">{dashboardData.totalContracts || 0}</span>
                  <span className="text-[9px] text-slate-400 uppercase tracking-wider font-semibold">Total</span>
                </div>
              </div>
              <div className="text-xs space-y-1.5 flex-1 pl-2">
                {statusSummary.map((item, index) => {
                  const total = statusSummary.reduce((sum, i) => sum + i.count, 0);
                  const colors = {
                    Active: "bg-blue-600",
                    "Expiring Soon": "bg-amber-400",
                    Expired: "bg-red-500",
                    Terminated: "bg-red-400",
                    Draft: "bg-slate-300",
                  };
                  const percent = dashboardData.totalContracts > 0 ? ((item.count / dashboardData.totalContracts) * 100).toFixed(1) : 0;
                  return (
                  <StatusLegend key={index} color={colors[item._id] || "bg-slate-400"} label={item._id} value={`${item.count} (${percent}%)`}/>);
                  })}
              </div>
            </div>
            <button className="w-full text-center text-xs font-semibold text-blue-600 mt-4 pt-3 border-t border-slate-100 hover:underline">View All Status →</button>
          </div>

          {/* CONTRACTS BY TYPE */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
            <h3 className="font-bold text-sm text-[#06155F] mb-4">Contracts by Type</h3>
            <div className="flex items-center justify-between gap-2">
              <div className="relative w-28 h-28 flex-shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15.91" fill="none" stroke="#E2E8F0" strokeWidth="3.5" />
                  <circle cx="18" cy="18" r="15.91" fill="none" stroke="#3B82F6" strokeWidth="3.5" strokeDasharray="48 100" strokeDashoffset="0" />
                  <circle cx="18" cy="18" r="15.91" fill="none" stroke="#10B981" strokeWidth="3.5" strokeDasharray="32 100" strokeDashoffset="-48" />
                  <circle cx="18" cy="18" r="15.91" fill="none" stroke="#F59E0B" strokeWidth="3.5" strokeDasharray="12 100" strokeDashoffset="-80" />
                  <circle cx="18" cy="18" r="15.91" fill="none" stroke="#6366F1" strokeWidth="3.5" strokeDasharray="8 100" strokeDashoffset="-92" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-base font-bold text-slate-800">{dashboardData.totalContracts || 0}</span>
                  <span className="text-[9px] text-slate-400 uppercase tracking-wider font-semibold">Total</span>
                </div>
              </div>
              <div className="text-xs space-y-1.5 flex-1 pl-2">
                {typeSummary.map((item, index) => {
                  const colors = {
                    Purchase: "bg-blue-500",
                    Supply: "bg-emerald-500",
                    Service: "bg-amber-500",
                    Other: "bg-indigo-500",
                  };
                  const percent = dashboardData.totalContracts > 0 ? ((item.count / dashboardData.totalContracts) * 100).toFixed(1) : 0;
                  return (
                  <StatusLegend key={index} color={colors[item._id] || "bg-slate-400"} label={item._id} value={`${item.count} (${percent}%)`}/>);
                })}
              </div>
            </div>
            <button className="w-full text-center text-xs font-semibold text-blue-600 mt-4 pt-3 border-t border-slate-100 hover:underline">View All Types →</button>
          </div>

          {/* TOP CONTRACTING PARTIES */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
            <h3 className="font-bold text-sm text-[#06155F] mb-4">Top Contracting Parties by Value</h3>
            <div className="space-y-3">
             {topParties.map((party, index) => (
              <PartyRow key={index} name={party._id} value={`₹ ${(party.totalValue / 10000000).toFixed(2)} Cr`}
              progress={`${
                index === 0 ? "w-full bg-blue-600"
                : index === 1 ? "w-[78%] bg-blue-500"
                : index === 2 ? "w-[60%] bg-blue-400"
                : index === 3 ? "w-[51%] bg-blue-300" 
                : "w-[40%] bg-blue-200" }`}/>
              ))}
            </div>
            <button className="w-full text-center text-xs font-semibold text-blue-600 mt-4 pt-3 border-t border-slate-100 hover:underline">View All Parties →</button>
          </div>

          {/* CONTRACT INSIGHTS */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
            <h3 className="font-bold text-sm text-[#06155F] mb-3">Contract Insights</h3>
            <div className="space-y-3 text-xs">
              <div className="flex gap-2 items-start">
                <div className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 flex-shrink-0" />
                <p className="text-slate-600"><strong className="text-slate-900 font-semibold">{insights.activeContract}</strong>{" "} are currently active.</p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 flex-shrink-0" />
                <p className="text-slate-600"><strong className="text-slate-900 font-semibold">₹ {(insights.totalContractValue / 10000000).toFixed(2)} Cr</strong>{" "}  is the total value of active contracts.</p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                <p className="text-slate-600"><strong className="text-slate-900 font-semibold">{insights.expiringSoon}</strong>{" "} will expire in the next 60 days.</p>
              </div>
            </div>
            <button className="w-full text-center text-xs font-semibold text-blue-600 mt-4 pt-3 border-t border-slate-100 hover:underline">View Detailed Insights →</button>
          </div>

        </div>
      </div>

      {/* BOTTOM SECTION: TREND CHART & EXPIRING SOON */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* CONTRACT VALUE TREND (LINE CHART) */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-sm text-[#06155F]">Contract Value Trend (INR)</h3>
            <div className="flex items-center gap-1 text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 bg-slate-50 cursor-pointer text-slate-700 font-medium">
              <span>This Month</span>
              <ChevronDown size={14} className="text-slate-400" />
            </div>
          </div>
          
          {/* Custom SVG Line Chart */}
          <div className="relative h-48 w-full">
            <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-[10px] text-slate-400 font-medium pb-6">
               <span>{Math.round(maxValue)}</span>
               <span>{Math.round(maxValue * 0.75)}</span>
               <span>{Math.round(maxValue * 0.5)}</span>
               <span>{Math.round(maxValue * 0.25)}</span>
               <span>0</span>
            </div>
            <div className="h-full pl-8 pb-6">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 600 120" preserveAspectRatio="none">
                {/* Grid Lines */}
                <line x1="0" y1="0" x2="600" y2="0" stroke="#F1F5F9" strokeWidth="1" />
                <line x1="0" y1="30" x2="600" y2="30" stroke="#F1F5F9" strokeWidth="1" />
                <line x1="0" y1="60" x2="600" y2="60" stroke="#F1F5F9" strokeWidth="1" />
                <line x1="0" y1="90" x2="600" y2="90" stroke="#F1F5F9" strokeWidth="1" />
                <line x1="0" y1="120" x2="600" y2="120" stroke="#E2E8F0" strokeWidth="1" />

                {/* Area Gradient */}
                <path d="M 0 80 Q 100 40 200 90 T 400 40 T 600 20 L 600 120 L 0 120 Z" fill="url(#blue-gradient)" opacity="0.1" />
                
                {/* Smooth Chart Line */}
                <path d="M 0 80 Q 100 40 200 90 T 400 40 T 600 20" fill="none" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" />
                
                {/* Chart Dots */}
                <circle cx="100" cy="55" r="4" fill="#2563EB" />
                <circle cx="250" cy="85" r="4" fill="#2563EB" />
                <circle cx="330" cy="75" r="4" fill="#2563EB" />
                <circle cx="480" cy="60" r="4" fill="#2563EB" />
                <circle cx="575" cy="22" r="4" fill="#2563EB" />

                <defs>
                  <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
              {/* X-Axis Labels *
              <div className="flex justify-between text-[10px] text-slate-400 font-medium mt-2">
                 {valueTrend.map((item, index) => (
                  <span key={index}>{new Date(2025, item._id.month - 1).toLocaleString("default", {month: "short",})}</span>
                  ))}
              </div>*/}
            </div>
          </div>
          <div className="flex justify-center items-center gap-1.5 text-xs text-slate-600 font-medium mt-3">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
            <span>Total Contract Value</span>
          </div>
        </div>

        {/* EXPIRING SOON LIST */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-sm text-[#06155F] mb-4">Expiring Soon</h3>
            <div className="space-y-3.5">
             {expiringContracts.map((item, index) => {
              const daysLeft = Math.ceil((new Date(item.endDate) - new Date()) / (1000 * 60 * 60 * 24));
              return (
              <ExpiringItem key={index} title={item.contractName} code={item.contractNo} date={new Date(item.endDate).toLocaleDateString("en-GB", {day: "2-digit", month: "short", year: "numeric",})}
              badgeText={`${daysLeft} days left`}
              badgeColor={ daysLeft <= 30 ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-green-50 text-green-700 border-green-200"}/>);
              })}
            </div>
          </div>
          <button className="w-full text-center text-xs font-semibold text-blue-600 mt-4 pt-3 border-t border-slate-100 hover:underline">View All Expiring Soon →</button>
        </div>

      </div>

      {/* FOOTER TIMESTAMPS */}
      <div className="flex justify-between items-center text-[11px] text-slate-400 font-medium mt-6 pt-4 border-t border-slate-200">
        <span>© All data is updated daily. Last updated on 24 Apr 2025, 08:30 AM</span>
        <span className="hover:underline cursor-pointer">Help Center</span>
      </div>

    </div>
  );
}

{/* --- REUSABLE HELPER SUB-COMPONENTS --- */}

function StatCard({ title, value, change, isPositive, icon }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col justify-between">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold text-[#0A146E]">{title}</span>
        <div className="p-1.5 bg-slate-50 rounded-lg">{icon}</div>
      </div>
      <div>
        <h4 className="text-xl font-bold text-[#0A146E] tracking-tight">{value}</h4>
        <span className={`text-[10px] font-bold flex items-center gap-1 mt-0.5 ${isPositive ? 'text-green-600' : 'text-red-500'}`}>
          {change} <span className="text-slate-400 font-normal">vs last month</span>
        </span>
      </div>
    </div>
  );
}

function FilterSelect({ label, value, options = [] }) {
  return (
    <div className='flex flex-col'
    >  
     <span className="text-[10px] text-[#06155F] uppercase font-bold tracking-wider">{label}</span>
     
     <select className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-700 focus:outline-none">
        <option>{value}</option>

        {options.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}

function StatusLegend({ color, label, value }) {
  return (
    <div className="flex items-center justify-between w-full text-[11px]">
      <div className="flex items-center gap-1.5 min-w-0">
        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${color}`} />
        <span className="text-slate-500 truncate">{label}</span>
      </div>
      <span className="font-bold text-slate-800 ml-2 whitespace-nowrap">{value}</span>
    </div>
  );
}

function PartyRow({ name, value, progress }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs font-medium">
        <span className="text-slate-700">{name}</span>
        <span className="text-slate-900 font-bold">{value}</span>
      </div>

      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-600 rounded-full"
          style={{ width: progress }}
        />
      </div>
    </div>
  );
}

function ExpiringItem({ title, code, date, badgeText, badgeColor }) {
  return (
    <div className="flex justify-between items-start gap-2 text-xs">
      <div>
        <h4 className="font-bold text-slate-900">{title} <span className="text-[#6B7280] font-bold">({code})</span></h4>
        <p className="text-[11px] text-[#6B7280] mt-0.5">{date}</p>
      </div>
      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border whitespace-nowrap ${badgeColor}`}>
        {badgeText}
      </span>
    </div>
  );
}