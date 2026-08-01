import React, { useState,useEffect } from 'react';
import {
  getAuditDashboard,
  activitiesByModule,
  activityTimeline,
  getFilterOptions,
  getAuditLogs,
  getAuditLogDetails,
  deleteAuditLog,
  clearAuditLogs
} from '../../api/AuditLogsApi';
import { 
  FileSpreadsheet, CheckCircle2, XCircle, Users, LogIn, Calendar, 
  Download, Filter, ChevronDown, Search, ChevronLeft, ChevronRight, 
  Monitor, Shield, Eye, RefreshCw, FileText, Trash2, HelpCircle, Info
} from 'lucide-react';

export default function AuditLogsDashboard() {
  const [dashboard, setDashboard] = useState({});
  const [auditLogs, setAuditLogs] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);

  const [moduleData, setModuleData] = useState([]);
  const [timelineData, setTimelineData] = useState([]);

  const [filterOptions, setFilterOptions] = useState({users: [], modules: [], actions: [], statuses: [],});
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedModule, setSelectedModule] = useState("");
  const [selectedAction, setSelectedAction] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [search, setSearch] = useState("");
  
  const [selectedLog, setSelectedLog] = useState(null);
  
  const fetchDashboard = async () => {
  try {
    const res = await getAuditDashboard();
    console.log("Dashboard:", res.data);
    setDashboard(res.data.data || {});
  } catch (err) {
    console.error(err);
  }
};

const fetchAuditLogs = async () => {
  try {
  const res = await getAuditLogs({
      page,
      limit,
      search,
      user: selectedUser,
      module: selectedModule,
      action: selectedAction,
      status: selectedStatus,
    });
    console.log("Audit Logs:", res.data);
    setAuditLogs(res.data.data || []);
    setTotal(res.data.pagination.total);
  } catch (err) {
    console.error(err);
  }
};

const fetchActivitiesByModule = async () => {
  try {
    const res = await activitiesByModule();
    console.log("Activities By Module:", res.data);
    setModuleData(res.data.data || []);
  } catch (err) {
    console.error(err);
  }
};

const fetchTimeline = async () => {
  try {
    const res = await activityTimeline();
    console.log("Timeline:", res.data);
    setTimelineData(res.data.data || []);
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

const fetchAuditLogDetails = async (id) => {
  try {
    const res = await getAuditLogDetails(id);
    console.log("Audit Log Details:", res.data);
    setSelectedLog(res.data.data || null);
  } catch (err) {
    console.error(err);
  }
};

useEffect(() => {
  fetchDashboard();
  fetchAuditLogs();
  fetchActivitiesByModule();
  fetchTimeline();
  fetchFilterOptions();
}, []);
useEffect(() => {
  fetchAuditLogs();
}, [page, limit]);

const getActionStyle = (action) => {
  switch (action) {
    case "Login":
      return "bg-emerald-50 text-emerald-600";

    case "Logout":
      return "bg-slate-100 text-slate-600";

    case "Created":
      return "bg-blue-50 text-blue-600";

    case "Updated":
      return "bg-amber-50 text-amber-600";

    case "Deleted":
      return "bg-rose-50 text-rose-600";

    case "Downloaded":
      return "bg-teal-50 text-teal-600";

    case "Uploaded":
      return "bg-cyan-50 text-cyan-600";

    case "Viewed":
      return "bg-purple-50 text-purple-600";

    case "Shared":
      return "bg-indigo-50 text-indigo-600";

    case "Failed Login":
      return "bg-red-50 text-red-600";

    case "Auto Generated":
      return "bg-slate-100 text-slate-600";

    default:
      return "bg-slate-100 text-slate-600";
  }
};
const getActionIcon = (action) => {
  switch (action) {
    case "Login":
    case "Logout":
    case "Failed Login":
      return Monitor;

    case "Created":
      return FileSpreadsheet;

    case "Updated":
      return RefreshCw;

    case "Deleted":
      return Trash2;

    case "Downloaded":
      return Download;

    case "Uploaded":
      return Upload;

    case "Viewed":
      return Eye;

    case "Shared":
      return Share2;

    case "Auto Generated":
      return Shield;

    default:
      return FileSpreadsheet;
  }
};

  // --- TOP SUMMARY CARDS DATA ---
  const metrics = [
    { label: "Total Activities", value: dashboard.totalActivities || 0, change: "", icon: FileSpreadsheet, color: "text-blue-600", bg: "bg-blue-50/80", border: "border-blue-100" },
    { label: "Successful Activities", value: dashboard.successfulActivities || 0, change: "", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50/80", border: "border-emerald-100" },
    { label: "Failed Activities", value: dashboard.failedActivities || 0, change: "", icon: XCircle, color: "text-rose-600", bg: "bg-rose-50/80", border: "border-rose-100" },
    { label: "Active Users", value: dashboard.activeUsers || 0, change: "", icon: Users, color: "text-orange-500", bg: "bg-orange-50/80", border: "border-orange-100" },
    { label: "Login Activities", value:  dashboard.loginActivities || 0, change: "", icon: LogIn, color: "text-purple-600", bg: "bg-purple-50/80", border: "border-purple-100" },
  ];

  // --- MAIN AUDIT EVENTS TABLE LIST ---
  /*const auditEvents = [
    { time: "24 Apr 2025, 09:15 AM", user: "Abhishek B.", role: "Admin", action: "Login", actionStyle: "bg-emerald-50 text-emerald-600", module: "Authentication", details: "User logged in successfully", ip: "103.21.45.67", status: "Success", icon: Monitor },
    { time: "24 Apr 2025, 09:12 AM", user: "Neha Sharma", role: "Manager", action: "Create", actionStyle: "bg-blue-50 text-blue-600", module: "Shipment", details: "Created shipment SHP-2025-1045", ip: "103.21.45.68", status: "Success", icon: FileSpreadsheet },
    { time: "24 Apr 2025, 08:58 AM", user: "Rohit Verma", role: "Analyst", action: "View", actionStyle: "bg-purple-50 text-purple-600", module: "Invoice", details: "Viewed invoice INV-2025-1041", ip: "103.21.45.69", status: "Success", icon: Eye },
    { time: "24 Apr 2025, 08:45 AM", user: "Neha Sharma", role: "Manager", action: "Update", actionStyle: "bg-amber-50 text-amber-600", module: "Supplier", details: "Updated supplier Globex Corporation", ip: "103.21.45.68", status: "Success", icon: RefreshCw },
    { time: "24 Apr 2025, 08:30 AM", user: "Amit Kumar", role: "Analyst", action: "Download", actionStyle: "bg-teal-50 text-teal-600", module: "Report", details: "Downloaded Trade Summary Report", ip: "103.21.45.70", status: "Success", icon: Download },
    { time: "24 Apr 2025, 08:20 AM", user: "System", role: "", action: "System", actionStyle: "bg-slate-100 text-slate-600", module: "System", details: "Password policy updated", ip: "-", status: "Success", icon: Shield },
    { time: "24 Apr 2025, 07:50 AM", user: "Priya Singh", role: "Manager", action: "Delete", actionStyle: "bg-rose-50 text-rose-600", module: "Document", details: "Deleted document BL-2025-0987", ip: "103.21.45.71", status: "Success", icon: Trash2 },
  ];*/

  return (
    <div className="overflow-y-auto bg-[#f8fafc] text-slate-700 p-6 font-sans text-xs antialiased selection:bg-blue-100">
      
      {/* --- TOP ROW HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 mt-10">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Audit Logs</h1>
          <p className="text-slate-500 text-[11px] mt-0.5">Track user activities and system events for security, compliance and accountability.</p>
        </div>
        
        <div className="flex items-center gap-2.5 self-end md:self-auto">
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 border border-slate-200 rounded-lg font-medium text-blue-600 shadow-sm text-[11px]">
            <Calendar size={13} className="text-blue-500" />
            <span className="font-semibold">01 Apr 2025 - 24 Apr 2025</span>
          </div>
          <button className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg px-3 py-1.5 font-semibold text-blue-600 shadow-sm hover:bg-slate-50 transition-colors text-[11px]">
            <Download size={13} />
            Export Logs
          </button>
          <button className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg px-3 py-1.5 font-semibold text-blue-600 shadow-sm hover:bg-slate-50 transition-colors text-[11px]">
            <Filter size={13} />
            Filters
          </button>
        </div>
      </div>

      {/* --- 5 SUMMARY CARDS GRID --- */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        {metrics.map((card, idx) => (
          <div key={idx} className={`bg-white p-4 rounded-xl border ${card.border} shadow-sm flex items-center gap-3.5`}>
            <div className={`p-2.5 rounded-xl shrink-0 ${card.bg} ${card.color}`}>
              <card.icon size={18} />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{card.label}</span>
              <h3 className="text-lg font-black text-slate-900 leading-tight mt-0.5">{card.value}</h3>
              {card.change && (<p className={`text-[10px] font-semibold mt-0.5 ${ card.color.includes("rose") ? "text-rose-600" : "text-emerald-600" }`}>
                {card.change}</p>)}
            </div>
          </div>
        ))}
      </div>

      {/* --- CONTROLS / FILTERS BAR --- */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200/60 shadow-sm mb-6 grid grid-cols-2 md:grid-cols-6 gap-3.5 items-end">
       <div>
        <label className="text-[10px] font-bold text-slate-900 block mb-1">User</label>
        <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)} className="w-full border border-slate-200 rounded-lg px-2 py-1.5 text-xs">
          <option value="">All Users</option>
          {filterOptions.users?.map((user, index) => (
            <option key={index} value={user}>{user}</option>))}
        </select>
       </div>
       <div>
        <label className="text-[10px] font-bold text-slate-900 block mb-1">Module</label>
        <select value={selectedModule} onChange={(e) => setSelectedModule(e.target.value)} className="w-full border border-slate-200 rounded-lg px-2 py-1.5 text-xs">
          <option value="">All Modules</option>
          {filterOptions.modules?.map((module, index) => (
            <option key={index} value={module}>{module}</option>))}
        </select>
       </div>
       <div>
        <label className="text-[10px] font-bold text-slate-900 block mb-1">Action</label>
        <select value={selectedAction} onChange={(e) => setSelectedAction(e.target.value)} className="w-full border border-slate-200 rounded-lg px-2 py-1.5 text-xs">
          <option value="">All Actions</option>
          {filterOptions.actions?.map((action, index) => (
            <option key={index} value={action}>{action}</option>))}
        </select>
       </div>
       <div>
        <label className="text-[10px] font-bold text-slate-900 block mb-1">Status</label>
        <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} className="w-full border border-slate-200 rounded-lg px-2 py-1.5 text-xs">
          <option value="">All Status</option>
          {filterOptions.statuses?.map((status, index) => (
            <option key={index} value={status}>{status}</option>))}
        </select>
       </div>
        <div className="col-span-2 md:col-span-1">
          <label className="text-[10px] font-bold text-slate-900 block mb-1">Search</label>
          <div className="relative">
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by keyword, ID, details..." className="w-full bg-white pl-3 pr-2 py-1.5 rounded-lg border border-slate-200 text-xs"/>
          </div>
        </div>
        <div className="flex gap-3 h-8 items-center justify-end">
          <button className="text-[11px] font-bold text-blue-600 hover:underline px-2">Reset</button>
          <button className="bg-blue-600 text-white rounded-lg px-4 py-1.5 font-bold shadow-sm hover:bg-blue-700 transition-colors whitespace-nowrap">Apply Filters</button>
        </div>
      </div>

      {/* --- CONTENT WORKSPACE SPLIT (Table + Detail View Side-by-Side) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* === LEFT MAIN AREA: EVENTS TABLE (8 COLS) === */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100">
            <h2 className="text-sm font-bold text-slate-900">Audit Log Events <span className="text-slate-400 font-medium">({total})</span></h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#f8fafc] text-slate-900 font-bold text-[10px] uppercase tracking-wider border-b border-slate-200/60">
                  <th className="p-3 pl-4 font-bold">Date & Time</th>
                  <th className="p-3 font-bold">User</th>
                  <th className="p-3 font-bold">Action</th>
                  <th className="p-3 font-bold">Module</th>
                  <th className="p-3 font-bold">Details</th>
                  <th className="p-3 font-bold">IP Address</th>
                  <th className="p-3 pr-4 font-bold text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600 font-medium">
                {auditLogs.map((row, idx) => (
                  <tr key={idx} onClick={() => fetchAuditLogDetails(row._id)} className={`hover:bg-slate-50/60 transition-colors cursor-pointer ${idx === 0 ? 'bg-blue-50/20' : ''}`}>
                    <td className="p-3 pl-4 text-slate-500 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {React.createElement(getActionIcon(row.action), {size: 13, className: "text-slate-400 shrink-0",})}
                        <span>{row?.createdAt && !isNaN(new Date(row.createdAt))
    ? new Date(row.createdAt).toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    : "-"}
                       </span>
                      </div>
                    </td>
                    <td className="p-3 text-slate-900">
                      <div className="font-bold">{row.userName}</div>
                      {row.role && <div className="text-[10px] text-slate-400 font-medium font-mono">({row.role || "-"})</div>}
                    </td>
                    <td className="p-3">
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold tracking-wide ${getActionStyle(row.action)}`}>
                        {row.action}
                      </span>
                    </td>
                    <td className="p-3 text-slate-900 font-semibold">{row.module}</td>
                    <td className="p-3 text-slate-500 max-w-[180px] break-words">{row.entityReference || row.remarks || "-"}</td>
                    <td className="p-3 font-mono text-[11px] text-slate-500">{row.ipAddress || "-"}</td>
                    <td className="p-3 pr-4 text-center">
                      <span className="inline-block px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-full font-bold text-[10px]">
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* TABLE PAGINATION ROW */}
          <div className="p-3.5 border-t border-slate-100 bg-[#f8fafc]/40 flex items-center justify-between text-[11px] text-slate-500 font-semibold">
            <span>Showing {(page - 1) * limit + 1} to{" "} {Math.min(page * limit, total)} of {total} events</span>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <button className="p-1 rounded border border-slate-200 bg-white text-slate-400 opacity-50 cursor-not-allowed"><ChevronLeft size={13} /></button>
                <button className="px-2.5 py-0.5 rounded font-bold bg-blue-600 text-white shadow-sm">1</button>
                <button className="px-2.5 py-0.5 rounded font-semibold bg-white border border-slate-200 hover:bg-slate-50 text-slate-700">2</button>
                <button className="px-2.5 py-0.5 rounded font-semibold bg-white border border-slate-200 hover:bg-slate-50 text-slate-700">3</button>
                <span className="px-0.5 text-slate-300">...</span>
                <button className="px-2 py-0.5 rounded font-semibold bg-white border border-slate-200 hover:bg-slate-50 text-slate-700">1,246</button>
                <button className="p-1 rounded border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"><ChevronRight size={13} /></button>
              </div>
              <div className="flex items-center bg-white border border-slate-200 rounded-lg px-2 py-1 text-slate-700 cursor-pointer text-[11px]">
                <span>10 / page</span>
                <ChevronDown size={12} className="text-slate-400 ml-1" />
              </div>
            </div>
          </div>
        </div>

        {/* === RIGHT SIDEBAR PANEL: ACTIVITY DETAILS PREVIEW (4 COLS) === */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200/80 shadow-sm p-5 space-y-5">
          
          {/* Detail Panel Header Profile */}
          <div className="flex items-center justify-between border-b border-slate-50 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 font-bold text-sm border border-emerald-100">
                {selectedLog?.userName?.charAt(0) || "-"}
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-900 leading-tight">{selectedLog?.action || "-"}</h3>
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block mt-0.5">Event Preview</span>
              </div>
            </div>
            <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-600 rounded-md font-bold text-[10px] tracking-wide uppercase">
              {selectedLog?.status || "-"}
            </span>
          </div>

          {/* Primary Parameters Metadata List */}
          <div className="space-y-2.5 text-[11px]">
           {selectedLog && [
            {label: "Date & Time",
  val:
    selectedLog?.createdAt && !isNaN(new Date(selectedLog.createdAt))
      ? new Date(selectedLog.createdAt).toLocaleString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      : "-"},
            {label: "User", val: selectedLog.userName || "-"},
            {label: "User ID", val: selectedLog.userId || "-", isMono: true},
            {label: "Action", val: selectedLog.action || "-"},
            {label: "Module", val: selectedLog.module || "-"},
            {label: "IP Address", val: selectedLog.ipAddress || "-", isMono: true},
            {label: "Device / Browser", val: `${selectedLog.device || "-"} / ${selectedLog.browser || "-"}`},
            {label: "Request Method", val: selectedLog.requestMethod || "-"},
            {label: "Request URL", val: selectedLog.requestUrl || "-"},
            {label: "Details", val: selectedLog.entityReference || selectedLog.remarks || "-"},
            {label: "Status", val: selectedLog.status || "-", color: selectedLog.status === "Success" ? "text-emerald-600" : selectedLog.status === "Failed" ? "text-rose-600" : "text-amber-600"
            }].map((item, index) => (
              <div key={index} className="grid grid-cols-3 gap-2 py-0.5 items-start">
                <span className="text-slate-400 font-semibold">{item.label}</span>
                <span className={`col-span-2 text-right lg:text-left ${item.color || 'text-slate-900'} font-bold ${item.isMono ? "font-mono" : ""}`}>
                  {item.val}
                </span>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-slate-100 my-2"></div>

          {/* Additional Parameters Section */}
          <div>
            <h4 className="text-xs font-black text-slate-900 mb-3 tracking-tight">Additional Information</h4>
            <div className="space-y-2.5 text-[11px]">
              {selectedLog && [
                {label: "Request Method", val: selectedLog.requestMethod || "-"},
                {label: "Response Code", val: selectedLog.responseCode || "-"},
                {label: "Response Time", val: selectedLog.responseTime ? `${selectedLog.responseTime} ms` : "-"},
                {label: "Entity Type", val: selectedLog.entityType || "-"},
                {label: "Entity ID", val: selectedLog.entityId || "-"},
              ].map((info, idx) => (
                <div key={idx} className="grid grid-cols-3 gap-2 py-0.5">
                  <span className="text-slate-400 font-semibold">{info.label}</span>
                  <span className="col-span-2 text-right lg:text-left text-slate-900 font-bold">{info.val}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* --- SYSTEM FOOTER --- */}
      <div className="mt-8 pt-4 border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-between text-[10px] font-bold text-slate-400 gap-2">
        <div className="flex items-center gap-1.5">
          <Info size={12} className="text-blue-500" />
          <span className="text-blue-900">Audit logs are retained for 365 days. <span className="text-blue-600 hover:underline cursor-pointer">Learn more about audit log retention policy.</span></span>
        </div>
        <div className="flex items-center gap-1 cursor-pointer hover:text-slate-600 transition-colors">
          <HelpCircle size={12} className="text-slate-400" />
          <span>Help Center</span>
        </div>
      </div>

    </div>
  );
}