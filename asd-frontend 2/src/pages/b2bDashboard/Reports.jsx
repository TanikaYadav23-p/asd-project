import React from 'react';
import { 
  FileText, Download, MoreVertical, Plus, Calendar, ArrowRight,
  ChevronDown, BarChart2, TrendingUp, Users, MapPin, 
  Briefcase, ShoppingCart, HelpCircle, CheckCircle2, Info, AlertCircle
} from 'lucide-react';

// Data Arrays
const recentReports = [
  { name: "Trade Summary Report - Apr 2025", type: "Summary", mod: "Trade", date: "24 Apr 2025, 09:15 AM", by: "Abhishek B.", fmt: "PDF", isPdf: true },
  { name: "Shipment Performance Report", type: "Operational", mod: "Shipments", date: "24 Apr 2025, 08:45 AM", by: "Abhishek B.", fmt: "Excel", isPdf: false },
  { name: "Top Suppliers Report", type: "Analytics", mod: "Suppliers", date: "23 Apr 2025, 07:30 PM", by: "Neha Sharma", fmt: "PDF", isPdf: true },
  { name: "Invoice Aging Report", type: "Financial", mod: "Invoices", date: "23 Apr 2025, 06:20 PM", by: "Neha Sharma", fmt: "Excel", isPdf: false },
  { name: "Contracts Expiry Report", type: "Compliance", mod: "Contracts", date: "23 Apr 2025, 05:10 PM", by: "Amit Verma", fmt: "PDF", isPdf: true },
];

const popularReports = [
  { title: "Trade Summary Report", desc: "Summary of import & export trade activities.", icon: FileText, iconColor: "text-blue-500", bgColor: "bg-blue-50" },
  { title: "Shipment Performance Report", desc: "Detailed shipment volume and performance.", icon: MapPin, iconColor: "text-indigo-500", bgColor: "bg-indigo-50" },
  { title: "Supplier Performance Report", desc: "Analyze supplier contribution and reliability.", icon: Users, iconColor: "text-purple-500", bgColor: "bg-purple-50" },
  { title: "Buyer Performance Report", desc: "Analyze buyer activity and trends.", icon: Briefcase, iconColor: "text-sky-500", bgColor: "bg-sky-50" },
  { title: "Invoice Aging Report", desc: "Track outstanding invoices and aging details.", icon: TrendingUp, iconColor: "text-blue-500", bgColor: "bg-blue-50" },
  { title: "Contract Expiry Report", desc: "Contracts nearing expiry and renewal insights.", icon: FileText, iconColor: "text-indigo-500", bgColor: "bg-indigo-50" }
];

// Tailwind classes mapping configuration to bypass dynamic class constraints
const colorMapping = {
  blue: { bg: "bg-blue-50", text: "text-blue-600" },
  emerald: { bg: "bg-emerald-50", text: "text-emerald-600" },
  purple: { bg: "bg-purple-50", text: "text-purple-600" },
  red: { bg: "bg-red-50", text: "text-red-600" },
  orange: { bg: "bg-orange-50", text: "text-orange-600" }
};

export default function ReportsDashboard() {
  return (
    <div className="overflow-y-auto bg-slate-50 text-slate-800 font-sans p-6 selection:bg-blue-100">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 mt-10">
        <div>
          <h1 className="text-2xl font-bold text-blue-900">Reports</h1>
          <p className="text-xs text-slate-500 mt-1">Explore key insights and generate customized reports to drive your trade decisions.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 border border-slate-200 rounded-md text-xs shadow-sm text-slate-600">
            <Calendar size={14} className="text-slate-400" />
            <span>01 Apr 2025 - 24 Apr 2025</span>
          </div>
          <button className="flex items-center gap-2 bg-white px-3 py-1.5 border border-slate-200 rounded-md text-xs font-medium shadow-sm text-slate-700 hover:bg-slate-50 transition-colors">
            <Download size={14} className="text-slate-500" />
            Export Report
          </button>
          <button className="flex items-center gap-1.5 bg-blue-600 text-white px-3 py-1.5 rounded-md text-xs font-medium shadow-sm hover:bg-blue-700 transition-colors">
            <Plus size={14} />
            Create Invoice
          </button>
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        {[
          { title: "Total Trade Value (INR)", value: "₹2,845.60 Cr", trend: "14.8% vs last month", color: "blue", icon: BarChart2 },
          { title: "Total Shipments", value: "2,521", trend: "11.8% vs last month", color: "emerald", icon: TrendingUp },
          { title: "Total Invoices", value: "268", trend: "11.6% vs last month", color: "purple", icon: FileText },
          { title: "Active Suppliers", value: "1,892", trend: "11.8% vs last month", color: "red", icon: Briefcase },
          { title: "Total Contract Value (INR)", value: "₹2,845.60 Cr", trend: "20.4% vs last month", color: "orange", icon: ShoppingCart },
          { title: "Active Buyers", value: "2,521", trend: "3.2% vs last month", color: "blue", icon: Users },
        ].map((card, idx) => {
          const colors = colorMapping[card.color] || { bg: "bg-slate-100", text: "text-slate-600" };
          return (
            <div key={idx} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2 gap-2">
                <span className="text-[10px] font-semibold tracking-wide text-slate-500 uppercase leading-tight">
                  {card.title}
                </span>
                <div className={`p-1.5 rounded shrink-0 ${colors.bg} ${colors.text}`}>
                  <card.icon size={14} />
                </div>
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-800">{card.value}</h3>
                <p className="text-[10px] font-medium text-emerald-600 flex items-center gap-0.5 mt-0.5">
                  ▲ {card.trend}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* FILTERS PANEL */}
      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm mb-6 flex flex-wrap items-end gap-4">
        <div className="flex-1 min-w-[150px]">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Report Type</label>
          <div className="flex items-center justify-between border border-slate-200 rounded-lg px-3 py-2 text-xs bg-slate-50 text-slate-700 cursor-pointer">
            <span>All Reports</span>
            <ChevronDown size={14} className="text-slate-400" />
          </div>
        </div>
        <div className="flex-1 min-w-[150px]">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Module</label>
          <div className="flex items-center justify-between border border-slate-200 rounded-lg px-3 py-2 text-xs bg-slate-50 text-slate-700 cursor-pointer">
            <span>All Modules</span>
            <ChevronDown size={14} className="text-slate-400" />
          </div>
        </div>
        <div className="flex-1 min-w-[150px]">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Country / Region</label>
          <div className="flex items-center justify-between border border-slate-200 rounded-lg px-3 py-2 text-xs bg-slate-50 text-slate-700 cursor-pointer">
            <span>All Countries</span>
            <ChevronDown size={14} className="text-slate-400" />
          </div>
        </div>
        <div className="flex-1 min-w-[180px]">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Date Range</label>
          <div className="flex items-center justify-between border border-slate-200 rounded-lg px-3 py-2 text-xs bg-white text-slate-700 cursor-pointer">
            <span>01 Apr 2025 - 24 Apr 2025</span>
            <Calendar size={14} className="text-slate-400" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">Reset</button>
          <button className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm">Apply Filters</button>
        </div>
      </div>

      {/* REPORTS OVERVIEW & CHARTS */}
      <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-3 mb-5">
          <h2 className="text-sm font-bold text-slate-800">Reports Overview</h2>
          <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
            <div className="flex gap-4 text-xs font-semibold text-slate-400 overflow-x-auto pb-1">
              <span className="text-blue-600 border-b-2 border-blue-600 pb-1 cursor-pointer">Overview</span>
              <span className="hover:text-slate-600 cursor-pointer transition-colors">Trade</span>
              <span className="hover:text-slate-600 cursor-pointer transition-colors">Operations</span>
              <span className="hover:text-slate-600 cursor-pointer transition-colors">Finance</span>
              <span className="hover:text-slate-600 cursor-pointer transition-colors">Compliance</span>
              <span className="hover:text-slate-600 cursor-pointer transition-colors">Performance</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-600 bg-slate-50 border border-slate-200 rounded px-2 py-1">
              <span className="text-slate-400">View By:</span>
              <span className="font-medium">Month</span>
              <ChevronDown size={12} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart 1 - Trade Value */}
          <div className="border border-slate-100 rounded-xl p-4 bg-slate-50/50 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-xs font-bold text-slate-700">Trade Value Over Time (INR)</h4>
                <span className="text-[10px] text-slate-400 border px-1.5 py-0.5 rounded bg-white">This Month</span>
              </div>
              <div className="flex gap-4 text-[10px] mb-4">
                <span className="flex items-center gap-1"><span className="w-2 h-2 bg-blue-600 rounded-full"></span> Import Value</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 bg-teal-400 rounded-full"></span> Export Value</span>
              </div>
            </div>
            <div className="h-40 relative flex items-end justify-between px-2 pt-4 border-b border-l border-slate-200">
              {/* Fake Line Chart paths recreated using vectors */}
              <svg className="absolute inset-0 w-full h-full p-2" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0,70 Q25,40 50,65 T100,30" fill="none" stroke="#2563eb" strokeWidth="2" />
                <path d="M0,85 Q25,70 50,80 T100,60" fill="none" stroke="#2dd4bf" strokeWidth="2" />
                <path d="M0,70 Q25,40 50,65 T100,30 L100,100 L0,100 Z" fill="#2563eb" fillOpacity="0.05" />
              </svg>
              <span className="text-[8px] text-slate-400 absolute left-1 top-2">1,000 Cr</span>
              <span className="text-[8px] text-slate-400 absolute left-1 top-1/2">500 Cr</span>
              <div className="w-full flex justify-between text-[8px] text-slate-400 translate-y-4">
                <span>01 Apr</span><span>08 Apr</span><span>15 Apr</span><span>22 Apr</span>
              </div>
            </div>
          </div>

          {/* Chart 2 - Shipments */}
          <div className="border border-slate-100 rounded-xl p-4 bg-slate-50/50 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-xs font-bold text-slate-700">Shipments Over Time</h4>
                <span className="text-[10px] text-slate-400 border px-1.5 py-0.5 rounded bg-white">This Month</span>
              </div>
            </div>
            <div className="h-40 relative flex items-end justify-between px-2 pt-4 border-b border-l border-slate-200">
              <svg className="absolute inset-0 w-full h-full p-2" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0,60 L20,45 L40,35 L60,55 L80,30 L100,40" fill="none" stroke="#3b82f6" strokeWidth="2" />
                <path d="M0,60 L20,45 L40,35 L60,55 L80,30 L100,40 L100,100 L0,100 Z" fill="#3b82f6" fillOpacity="0.1" />
              </svg>
              <span className="text-[8px] text-slate-400 absolute left-1 top-2">1,000</span>
              <span className="text-[8px] text-slate-400 absolute left-1 top-1/2">500</span>
              <div className="w-full flex justify-between text-[8px] text-slate-400 translate-y-4">
                <span>01 Apr</span><span>08 Apr</span><span>15 Apr</span><span>22 Apr</span>
              </div>
            </div>
            <div className="flex justify-center gap-1 items-center text-[10px] text-slate-500 mt-4">
              <span className="w-2 h-2 bg-blue-600 rounded-full"></span> Shipments
            </div>
          </div>

          {/* Chart 3 - Top Countries */}
          <div className="border border-slate-100 rounded-xl p-4 bg-slate-50/50">
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-xs font-bold text-slate-700">Top 5 Countries by Trade Value</h4>
              <span className="text-[10px] text-slate-400 border px-1.5 py-0.5 rounded bg-white">This Month</span>
            </div>
            <div className="space-y-3 mt-4">
              {[
                { name: "China", value: "₹ 1,245.60 Cr", width: "w-[85%]" },
                { name: "India", value: "₹ 842.30 Cr", width: "w-[65%]" },
                { name: "Germany", value: "₹ 456.70 Cr", width: "w-[45%]" },
                { name: "USA", value: "₹ 325.80 Cr", width: "w-[30%]" },
                { name: "UAE", value: "₹ 215.20 Cr", width: "w-[20%]" },
              ].map((c, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <span className="w-16 text-slate-600 font-medium shrink-0">{c.name}</span>
                  <div className="flex-1 mx-3 bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className={`bg-blue-600 h-full ${c.width} rounded-full`}></div>
                  </div>
                  <span className="font-semibold text-slate-700 text-right w-24 shrink-0">{c.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 1. RECENT REPORTS TABLE */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm mb-6 overflow-hidden">
        <div className="p-4 flex justify-between items-center border-b border-slate-100">
          <h2 className="text-sm font-bold text-[#1e293b]">Recent Reports</h2>
          <span className="text-xs font-semibold text-blue-600 cursor-pointer hover:underline">View All</span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#f8fafc] text-slate-400 font-bold text-[11px] uppercase tracking-wider border-b border-slate-100">
                <th className="p-3 pl-5 font-semibold">Report Name</th>
                <th className="p-3 font-semibold">Type</th>
                <th className="p-3 font-semibold">Module</th>
                <th className="p-3 font-semibold">Date Generated</th>
                <th className="p-3 font-semibold">Generated By</th>
                <th className="p-3 font-semibold">Format</th>
                <th className="p-3 pr-5 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              {recentReports.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-3 pl-5 text-blue-600 font-medium cursor-pointer hover:underline">{row.name}</td>
                  <td className="p-3 text-slate-500">{row.type}</td>
                  <td className="p-3 text-blue-500 cursor-pointer hover:underline">{row.mod}</td>
                  <td className="p-3 text-slate-500">{row.date}</td>
                  <td className="p-3 text-slate-700">{row.by}</td>
                  <td className="p-3">
                    <span className="inline-flex items-center gap-1.5 font-semibold">
                      {row.isPdf ? (
                        <>
                          <span className="w-2 h-2 bg-red-500 rounded-sm inline-block"></span>
                          <span className="text-slate-700 text-[11px]">PDF</span>
                        </>
                      ) : (
                        <>
                          <span className="w-2 h-2 bg-emerald-500 rounded-sm inline-block"></span>
                          <span className="text-slate-700 text-[11px]">Excel</span>
                        </>
                      )}
                    </span>
                  </td>
                  <td className="p-3 pr-5 text-right">
                    <div className="flex items-center justify-end gap-3 text-blue-500">
                      <Download size={15} className="cursor-pointer hover:text-blue-700 transition-colors" />
                      <MoreVertical size={15} className="text-slate-400 cursor-pointer hover:text-slate-600 transition-colors" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. BOTTOM THREE PANELS SECTIONS */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        
        {/* Popular Reports Card */}
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm md:col-span-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-[#1e293b]">Popular Reports</h3>
            <span className="text-xs font-semibold text-blue-600 cursor-pointer hover:underline">View All</span>
          </div>
          <div className="space-y-1">
            {popularReports.map((item, i) => (
              <div key={i} className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50/80 cursor-pointer group transition-all duration-200">
                <div className="flex items-center gap-3">
                  <div className={`p-2 ${item.bgColor} ${item.iconColor} rounded-lg`}>
                    <item.icon size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-700 group-hover:text-blue-600 transition-colors">{item.title}</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">{item.desc}</p>
                  </div>
                </div>
                <ArrowRight size={14} className="text-blue-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
              </div>
            ))}
          </div>
        </div>

        {/* Report Insights Card */}
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm md:col-span-4 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#1e293b] mb-4">Report Insights</h3>
            <div className="space-y-4">
              <div className="flex gap-3 items-start">
                <div className="p-0.5 bg-emerald-50 text-emerald-500 rounded-full mt-0.5 shrink-0">
                  <CheckCircle2 size={16} />
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Total trade value increased by <span className="text-blue-600 font-bold">20.4%</span> compared to previous period.
                </p>
              </div>
              <div className="flex gap-3 items-start">
                <div className="p-0.5 bg-blue-50 text-blue-500 rounded-full mt-0.5 shrink-0">
                  <Info size={16} />
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  China contributes <span className="text-blue-600 font-bold">38.3%</span> of total trade value.
                </p>
              </div>
              <div className="flex gap-3 items-start">
                <div className="p-0.5 bg-indigo-50 text-indigo-500 rounded-full mt-0.5 shrink-0">
                  <Info size={16} />
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Average shipment value increased by <span className="text-blue-600 font-bold">12.7%</span>.
                </p>
              </div>
              <div className="flex gap-3 items-start">
                <div className="p-0.5 bg-red-50 text-red-500 rounded-full mt-0.5 shrink-0">
                  <AlertCircle size={16} />
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  <span className="text-red-500 font-bold">642</span> invoices are still pending for payment.
                </p>
              </div>
            </div>
          </div>
          <div className="text-xs font-bold text-blue-600 cursor-pointer pt-4 border-t border-slate-100 inline-flex items-center gap-1 hover:underline transition-all">
            View All Insights →
          </div>
        </div>

        {/* Right Utility Column */}
        <div className="md:col-span-4 flex flex-col justify-between gap-4">
          
          {/* Custom Report Builder */}
          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex-1">
            <h4 className="text-xs font-bold text-[#1e293b] mb-1">Custom Report Builder</h4>
            <p className="text-[11px] text-slate-400 mb-4 leading-normal">
              Create custom reports by selecting the data fields and filters that matter to you.
            </p>
            <button className="w-full py-2 border border-blue-500 text-blue-600 text-xs font-bold rounded-lg hover:bg-blue-50/50 transition-colors shadow-sm">
              Create Custom Report
            </button>
          </div>

          {/* Scheduled Reports */}
          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex-1">
            <h4 className="text-xs font-bold text-[#1e293b] mb-1">Scheduled Reports</h4>
            <p className="text-[11px] text-slate-400 leading-normal">
              Automate your reports and receive them on email at regular intervals.
            </p>
          </div>

          {/* Data Export */}
          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex-1 flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-bold text-[#1e293b] mb-1">Data Export</h4>
              <p className="text-[11px] text-slate-400 mb-3">Export your data in bulk for offline analysis.</p>
            </div>
            <button className="w-max flex items-center gap-2 px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 transition-colors shadow-sm">
              <Download size={13} className="text-slate-500" />
              <span>Export Data</span>
              <ChevronDown size={12} className="text-slate-400" />
            </button>
          </div>

        </div>
      </div>

      {/* 3. SYNC FOOTER */}
      <div className="mt-8 pt-4 border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-between text-[10px] text-slate-400 gap-2">
        <div className="flex items-center gap-1.5">
          <Info size={12} className="text-blue-500" />
          <span>All data is updated daily. Last updated on 24 Apr 2025, 09:30 AM</span>
        </div>
        <div className="flex items-center gap-1 cursor-pointer hover:text-slate-600 transition-colors">
          <HelpCircle size={12} className="text-blue-500" />
          <span>Help Center</span>
        </div>
      </div>

    </div>
  );
}

