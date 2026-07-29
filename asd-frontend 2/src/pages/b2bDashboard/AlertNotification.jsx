import React, { useState } from 'react';
import { 
  Settings, Check, Search, ChevronDown, MoreVertical, ChevronLeft, 
  ChevronRight, AlertTriangle, Clock, ShieldAlert, Mail, FileText, 
  UserPlus, UploadCloud, BarChart3, HelpCircle, Info
} from 'lucide-react';

export default function AlertsNotificationsDashboard() {
  
  // --- STATE FOR TABS (For interactivity if needed) ---
  const [activeAlertTab, setActiveAlertTab] = useState('All');
  const [activeNotifTab, setActiveNotifTab] = useState('All');

  // --- ALERTS COLUMN DATA (Left Side) ---
  const alertsData = [
    {
      id: 1,
      type: "Overdue Invoice",
      desc: "Invoice INV-2025-1041 from Uflex Ltd. is overdue by 2 days.",
      date: "24 Apr 2025, 09:15 AM",
      severity: "Critical",
      tags: ["Invoice", "Overdue"],
      icon: ShieldAlert,
      iconColor: "text-rose-500 bg-rose-50 border-rose-100",
      severityColor: "text-rose-600 bg-rose-50"
    },
    {
      id: 2,
      type: "Payment Due Soon",
      desc: "Payment for INV-2025-1044 of ₹ 98,76,000 is due in 2 days.",
      date: "24 Apr 2025, 08:40 AM",
      severity: "Warning",
      tags: ["Invoice", "Payment"],
      icon: AlertTriangle,
      iconColor: "text-amber-500 bg-amber-50 border-amber-100",
      severityColor: "text-amber-600 bg-amber-50"
    },
    {
      id: 3,
      type: "New Shipment Update",
      desc: "Shipment SHP-2025-2048 status updated to 'In Transit'.",
      date: "24 Apr 2025, 08:20 AM",
      severity: "Info",
      tags: ["Shipment"],
      icon: Clock,
      iconColor: "text-emerald-500 bg-emerald-50 border-emerald-100",
      severityColor: "text-emerald-600 bg-emerald-50"
    },
    {
      id: 4,
      type: "High Risk Partner",
      desc: "Pacific Exports has been flagged as high risk based on recent activities.",
      date: "24 Apr 2025, 07:55 AM",
      severity: "Critical",
      tags: ["Risk", "Partner"],
      icon: ShieldAlert,
      iconColor: "text-rose-500 bg-rose-50 border-rose-100",
      severityColor: "text-rose-600 bg-rose-50"
    }
  ];

  // --- NOTIFICATIONS COLUMN DATA (Right Side) ---
  const notificationsData = [
    {
      id: 1,
      title: "Invoice INV-2025-1045 created successfully",
      meta: "Shenzhen Tech Co. • ₹ 1,25,45,000",
      date: "24 Apr 2025, 09:20 AM",
      icon: Mail,
      iconBg: "bg-blue-50 text-blue-500",
      unread: true
    },
    {
      id: 2,
      title: "Payment received for INV-2025-1043",
      meta: "Reliance Industries • ₹ 76,32,000",
      date: "24 Apr 2025, 08:50 AM",
      icon: Check,
      iconBg: "bg-emerald-50 text-emerald-500",
      unread: true
    },
    {
      id: 3,
      title: "New document uploaded",
      meta: "Bill of Lading for • SHP-2025-2047",
      date: "24 Apr 2025, 08:15 AM",
      icon: FileText,
      iconBg: "bg-purple-50 text-purple-500",
      unread: true
    },
    {
      id: 4,
      title: "New user added to your organization",
      meta: "Neha Sharma has been added as Finance Manager",
      date: "24 Apr 2025, 07:50 AM",
      icon: UserPlus,
      iconBg: "bg-orange-50 text-orange-500",
      unread: true
    },
    {
      id: 5,
      title: "Export shipment created",
      meta: "SHP-2025-2048 to Germany",
      date: "24 Apr 2025, 07:30 AM",
      icon: UploadCloud,
      iconBg: "bg-teal-50 text-teal-500",
      unread: true
    },
    {
      id: 6,
      title: "Weekly market report is ready",
      meta: "View latest insights and trends",
      date: "24 Apr 2025, 06:30 AM",
      icon: BarChart3,
      iconBg: "bg-slate-50 text-slate-500",
      unread: false
    }
  ];

  return (
    <div className="  overflow-y-auto bg-[#f8fafc] p-6 text-slate-700 font-sans text-xs antialiased selection:bg-blue-100">
      
      {/* TWO MAIN COLUMNS SPLIT */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mt-10">
        
        {/* ================= LEFT COLUMN: ALERTS ================= */}
        <div>
          {/* Section Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-lg font-bold text-slate-900 tracking-tight">Alerts</h1>
              <p className="text-[11px] text-slate-400 mt-0.5">Monitor critical events and take action before it impacts your business.</p>
            </div>
            <button className="flex items-center gap-1.5 text-blue-600 font-semibold hover:underline">
              <Settings size={13} />
              <span>Alert Settings</span>
            </button>
          </div>

          {/* Pill Filters */}
          <div className="flex items-center gap-2 mb-4">
            <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 border border-blue-200 rounded-lg font-semibold shadow-sm">
              All Alerts <span className="px-1.5 py-0.2 bg-blue-600 text-white text-[10px] rounded-full font-bold">24</span>
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-white text-slate-600 border border-slate-200 rounded-lg font-medium hover:bg-slate-50">
              Critical <span className="px-1.5 py-0.2 bg-rose-50 text-rose-600 text-[10px] rounded-full font-bold">6</span>
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-white text-slate-600 border border-slate-200 rounded-lg font-medium hover:bg-slate-50">
              Warning <span className="px-1.5 py-0.2 bg-amber-50 text-amber-600 text-[10px] rounded-full font-bold">10</span>
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-white text-slate-600 border border-slate-200 rounded-lg font-medium hover:bg-slate-50">
              Info <span className="px-1.5 py-0.2 bg-emerald-50 text-emerald-600 text-[10px] rounded-full font-bold">8</span>
            </button>
          </div>

          {/* Filter Controls Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
            <div className="relative">
              <Search size={13} className="absolute right-2.5 top-2.5 text-slate-400" />
              <input type="text" placeholder="Search alerts..." className="w-full bg-white px-3 py-1.5 rounded-lg border border-slate-200 focus:outline-none placeholder:text-slate-400 focus:border-blue-500" />
            </div>
            <div className="flex items-center justify-between bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-600 cursor-pointer hover:bg-slate-50">
              <span>All Categories</span>
              <ChevronDown size={13} className="text-slate-400" />
            </div>
            <div className="flex items-center justify-between bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-600 cursor-pointer hover:bg-slate-50">
              <span>All Status</span>
              <ChevronDown size={13} className="text-slate-400" />
            </div>
          </div>

          {/* Alerts White Main Container Box */}
          <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
            <div className="divide-y divide-slate-100">
              {alertsData.map((alert) => (
                <div key={alert.id} className="p-4 flex items-start gap-3 hover:bg-slate-50/40 transition-colors">
                  <div className={`p-1.5 rounded-lg border shrink-0 ${alert.iconColor}`}>
                    <alert.icon size={15} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="font-bold text-slate-900 text-xs">{alert.type}</h4>
                        <p className="text-[11px] text-slate-500 mt-1 leading-normal font-medium">{alert.desc}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-[10px] text-slate-400 font-medium block">{alert.date}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-1.5">
                        {alert.tags.map((tag, idx) => (
                          <span key={idx} className="px-2 py-0.5 border border-blue-100 bg-blue-50/40 rounded text-blue-600 text-[10px] font-semibold tracking-wide">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase ${alert.severityColor}`}>
                          {alert.severity}
                        </span>
                        <MoreVertical size={13} className="text-slate-400 cursor-pointer hover:text-slate-600" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Segment */}
            <div className="p-3 border-t border-slate-100 bg-[#f8fafc]/40 flex items-center justify-between text-[11px] text-slate-400 font-medium">
              <span>Showing 1 to 7 of 24 alerts</span>
              <div className="flex items-center gap-1">
                <button className="p-1 rounded border border-slate-200 bg-white text-slate-400 cursor-not-allowed opacity-50"><ChevronLeft size={13} /></button>
                <button className="px-2 py-0.5 rounded font-bold bg-blue-600 text-white shadow-sm">1</button>
                <button className="px-2 py-0.5 rounded font-semibold bg-white border border-slate-200 text-slate-600 hover:bg-slate-50">2</button>
                <button className="px-2 py-0.5 rounded font-semibold bg-white border border-slate-200 text-slate-600 hover:bg-slate-50">3</button>
                <span className="px-0.5 text-slate-300">...</span>
                <button className="p-1 rounded border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"><ChevronRight size={13} /></button>
              </div>
            </div>
          </div>
        </div>


        {/* ================= RIGHT COLUMN: NOTIFICATIONS ================= */}
        <div>
          {/* Section Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-lg font-bold text-slate-900 tracking-tight">Notifications</h1>
              <p className="text-[11px] text-slate-400 mt-0.5">Stay updated with important activities and system updates.</p>
            </div>
            <button className="flex items-center gap-1 text-blue-600 font-semibold hover:underline">
              <Check size={13} />
              <span>Mark all as read</span>
            </button>
          </div>

          {/* Pill Filters */}
          <div className="flex items-center gap-2 mb-4">
            <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 border border-blue-200 rounded-lg font-semibold shadow-sm">
              All <span className="px-1.5 py-0.2 bg-blue-600 text-white text-[10px] rounded-full font-bold">38</span>
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-white text-slate-600 border border-slate-200 rounded-lg font-medium hover:bg-slate-50">
              Unread <span className="px-1.5 py-0.2 bg-slate-100 text-slate-600 text-[10px] rounded-full font-bold">6</span>
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-white text-slate-600 border border-slate-200 rounded-lg font-medium hover:bg-slate-50">
              Read <span className="px-1.5 py-0.2 bg-slate-100 text-slate-600 text-[10px] rounded-full font-bold">32</span>
            </button>
          </div>

          {/* Filter Controls Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
            <div className="relative">
              <Search size={13} className="absolute right-2.5 top-2.5 text-slate-400" />
              <input type="text" placeholder="Search notifications..." className="w-full bg-white px-3 py-1.5 rounded-lg border border-slate-200 focus:outline-none placeholder:text-slate-400 focus:border-blue-500" />
            </div>
            <div className="flex items-center justify-between bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-600 cursor-pointer hover:bg-slate-50">
              <span>All Types</span>
              <ChevronDown size={13} className="text-slate-400" />
            </div>
            <div className="flex items-center justify-between bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-600 cursor-pointer hover:bg-slate-50">
              <span>All Time</span>
              <ChevronDown size={13} className="text-slate-400" />
            </div>
          </div>

          {/* Notifications White Main Container Box */}
          <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
            <div className="divide-y divide-slate-100">
              {notificationsData.map((notif) => (
                <div key={notif.id} className="p-4 flex items-center gap-3.5 hover:bg-slate-50/40 transition-colors">
                  <div className={`p-2 rounded-lg shrink-0 ${notif.iconBg}`}>
                    <notif.icon size={15} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <h4 className="font-bold text-slate-900 text-xs leading-snug">{notif.title}</h4>
                        <p className="text-[11px] text-slate-400 mt-0.5 font-semibold">{notif.meta}</p>
                      </div>
                      
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-[10px] text-slate-400 font-medium">{notif.date}</span>
                        {/* Status Blue/Gray Indicator Dot */}
                        <span className={`w-1.5 h-1.5 rounded-full ${notif.unread ? 'bg-blue-600' : 'bg-slate-200'}`}></span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Segment */}
            <div className="p-3 border-t border-slate-100 bg-[#f8fafc]/40 flex items-center justify-between text-[11px] text-slate-400 font-medium">
              <span>Showing 1 to 8 of 38 notifications</span>
              <div className="flex items-center gap-1">
                <button className="p-1 rounded border border-slate-200 bg-white text-slate-400 cursor-not-allowed opacity-50"><ChevronLeft size={13} /></button>
                <button className="px-2 py-0.5 rounded font-bold bg-blue-600 text-white shadow-sm">1</button>
                <button className="px-2 py-0.5 rounded font-semibold bg-white border border-slate-200 text-slate-600 hover:bg-slate-50">2</button>
                <button className="px-2 py-0.5 rounded font-semibold bg-white border border-slate-200 text-slate-600 hover:bg-slate-50">3</button>
                <span className="px-0.5 text-slate-300">...</span>
                <button className="px-2 py-0.5 rounded font-semibold bg-white border border-slate-200 text-slate-600 hover:bg-slate-50">5</button>
                <button className="p-1 rounded border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"><ChevronRight size={13} /></button>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* SYSTEM BOTTOM SUMMARY METADATA FOOTER */}
      <div className="mt-8 pt-4 border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-between text-[10px] font-semibold text-slate-400 gap-2">
        <div className="flex items-center gap-1.5">
          <Info size={12} className="text-blue-500" />
          <span>All data is updated daily. Last updated on 24 Apr 2025, 09:30 AM</span>
        </div>
        <div className="flex items-center gap-1 cursor-pointer hover:text-slate-600 transition-colors">
          <HelpCircle size={12} className="text-slate-400" />
          <span>Help Center</span>
        </div>
      </div>

    </div>
  );
}