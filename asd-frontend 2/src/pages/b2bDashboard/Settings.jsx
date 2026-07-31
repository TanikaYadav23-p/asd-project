import React, { useState,useEffect } from 'react';
import {
  getAccountSummary,
  getActivity,
  getSettings,
  updatePreferences,
  updateGeneral,
  updateNotifications,
  updateSecurity,
  updateTheme,
  updateBilling,
  changePassword
} from '../../api/SettingsApi'; 
import { 
  Globe, Calendar, DollarSign, Sun, LayoutGrid, Ruler, 
  MapPin, Sliders, ChevronRight, Key, Eye, Download, 
  LogOut, ShieldAlert, Bell, ChevronDown, Check, HelpCircle
} from 'lucide-react';

export default function SettingsDashboard() {
  const [activeTab, setActiveTab] = useState('General');
  const [settings, setSettings] = useState({});
  const [activity, setActivity] = useState([]);
  const [accountSummary, setAccountSummary] = useState({});

  const fetchSettings = async () => {
    try {
      const res = await getSettings();
     console.log("Settings:", res.data);
     setSettings(res.data.data || {});
    } catch (err) {
        console.error(err);
      }
  };
  const fetchActivity = async () => {
    try {
      const res = await getActivity();
      console.log("Activity:", res.data);
      setActivity(res.data.data || []);
    } catch (err) {
        console.error(err);
      }
  };
  const fetchAccountSummary = async () => {
    try {
      const res = await getAccountSummary();
      console.log("Account Summary:", res.data);
      setAccountSummary(res.data.data || {});
    } catch (err) {
        console.error(err);
      }
  };
  
  useEffect(() => {
    fetchSettings();
    fetchActivity();
    fetchAccountSummary();
  }, []);
  
  const getActivityIcon = (type) => {
    switch (type) {
      case "SHIPMENT_CREATED":
        return "📦";
      
      case "SHIPMENT_UPDATED":
        return "✏️";

      case "SHIPMENT_SUBMITTED":
        return "📤";

      case "SHIPMENT_APPROVED":
        return "✅";

      case "SHIPMENT_REJECTED":
        return "❌";

      case "SHIPMENT_ON_HOLD":
        return "⏸️";

      case "SHIPMENT_STATUS_CHANGED":
        return "🚚";

      case "DOCUMENT_UPLOADED":
        return "📄";

      case "DOCUMENT_VERIFIED":
        return "✔️";

      case "DOCUMENT_REJECTED":
        return "⚠️";

      case "TRACKING_UPDATED":
        return "📍";

      case "PAYMENT_RECEIVED":
        return "💰";

      case "PAYMENT_FAILED":
        return "💸";

      case "AI_QUERY":
        return "🤖";

      case "INCENTIVE_CHECKED":
        return "🎯";

      case "FREIGHT_CALCULATED":
        return "🚛";

      default:
        return "ℹ️";
    }
  };
  const tabs = ['General', 'Company Profile', 'Preferences', 'Notifications', 'Security', 'Integrations', 'Data & Privacy', 'Billing'];

  return (
    <div className="overflow-y-auto bg-slate-50 text-slate-800 font-sans p-6">
      
      {/* HEADER */}
      <div className="mb-6 mt-10">
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="text-sm text-slate-500 mt-1">Manage your account, preferences and system configuration.</p>
      </div>

      {/* NAVIGATION TABS */}
      <div className="border-b border-slate-200 mb-6 overflow-x-auto flex whitespace-nowrap scrollbar-none">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 px-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab 
                ? 'border-blue-600 text-blue-600 font-semibold' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* TWO COLUMN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: SETTINGS FORMS */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* GENERAL SETTINGS */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <h2 className="text-base font-bold text-slate-900 mb-5">General Settings</h2>
            
            <div className="divide-y divide-slate-100">
              <SettingRow 
                icon={<Globe className="text-blue-600" size={18} />} 
                title="Language" 
                desc="Choose your preferred language for the platform."
                control={
                  <select value={settings.language || ""} className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-700 outline-none cursor-pointer hover:border-slate-300">
                    <option value={settings.language}>{settings.language}</option>
                  </select>
                }
              />

              <SettingRow 
                icon={<Calendar className="text-amber-600" size={18} />} 
                title="Date & Time" 
                desc="Set your preferred date, time and time zone."
                control={
                  <div className="flex items-center gap-1 text-xs font-semibold text-slate-700 cursor-pointer hover:text-slate-900">
                    <span> {settings.updatedAt ? `${new Date(settings.updatedAt).toLocaleDateString("en-GB")}, ${new Date(settings.updatedAt).toLocaleTimeString("en-IN", {
                      hour: "2-digit", minute: "2-digit",})} (${settings.timezone})`: settings.timezone}</span>
                    <ChevronRight size={16} className="text-slate-400" />
                  </div>
                }
              />

              <SettingRow 
                icon={<DollarSign className="text-emerald-600" size={18} />} 
                title="Currency" 
                desc="Select the default currency for all financial data."
                control={
                  <select value={settings.currency || ""} className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-700 outline-none cursor-pointer hover:border-slate-300">
                    <option value={settings.currency}>{settings.currency}</option>
                  </select>
                }
              />

              <SettingRow 
                icon={<Sun className="text-indigo-600" size={18} />} 
                title="Theme" 
                desc="Choose your preferred theme."
                control={
                  <div className="bg-slate-100 p-1 rounded-lg flex items-center gap-1 text-xs font-medium text-slate-600">
                    <button className={`px-3 py-1 rounded-md ${settings.theme === "Light" ? "bg-white text-blue-600 shadow-sm font-semibold" 
                    : "hover:bg-slate-200"}`}>Light</button>
                    <button className={`px-3 py-1 rounded-md ${settings.theme === "Dark" ? "bg-white text-blue-600 shadow-sm font-semibold"
                    : "hover:bg-slate-200"}`}>Dark</button>
                    <button className={`px-3 py-1 rounded-md ${settings.theme === "System" ? "bg-white text-blue-600 shadow-sm font-semibold"
                    : "hover:bg-slate-200"}`}>System</button>
                  </div>
                }
              />

              <SettingRow 
                icon={<LayoutGrid className="text-purple-600" size={18} />} 
                title="Dashboard Settings" 
                desc="Customize your dashboard view and default widgets."
                control={ 
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium">{settings.dashboardLayout}</span>
                  <ChevronRight size={16} className="text-slate-400 cursor-pointer hover:text-slate-600"/>
                </div>
                }
              />

              <SettingRow 
                icon={<Ruler className="text-cyan-600" size={18} />} 
                title="Units & Formats" 
                desc="Set measurement units and number formatting."
                control={
                  <select value={settings.units || ""} className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-700 outline-none cursor-pointer hover:border-slate-300">
                    <option value={settings.units}>{settings.units}</option>
                  </select>
                }
              />
            </div>
          </div>

          {/* SYSTEM PREFERENCES */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <h2 className="text-base font-bold text-slate-900 mb-5">System Preferences</h2>
            
            <div className="divide-y divide-slate-100">
              <SettingRow 
                icon={<MapPin className="text-blue-600" size={18} />} 
                title="Default Country / Region" 
                desc="Select the default country or region for data."
                control={
                  <select className="bg-white border border-slate-200 rounded-lg px-4 py-1.5 text-xs font-medium text-slate-700 outline-none cursor-pointer hover:border-slate-300 min-w-[120px]">
                    <option>India</option>
                  </select>
                }
              />

              <SettingRow 
                icon={<Calendar className="text-amber-600" size={18} />} 
                title="Default Page" 
                desc="Choose the page you want to see after login."
                control={
                  <select className="bg-white border border-slate-200 rounded-lg px-4 py-1.5 text-xs font-medium text-slate-700 outline-none cursor-pointer hover:border-slate-300 min-w-[120px]">
                    <option>Dashboard</option>
                  </select>
                }
              />

              <SettingRow 
                icon={<FileTextIcon className="text-slate-600" />} 
                title="Items Per Page" 
                desc="Set the default number of items in tables."
                control={
                  <select className="bg-white border border-slate-200 rounded-lg px-4 py-1.5 text-xs font-medium text-slate-700 outline-none cursor-pointer hover:border-slate-300">
                    <option>25</option>
                  </select>
                }
              />

              <SettingRow 
                icon={<Sliders className="text-emerald-600" size={18} />} 
                title="Advanced Preferences" 
                desc="Manage advanced system preferences."
                control={<ChevronRight size={16} className="text-slate-400 cursor-pointer hover:text-slate-600" />}
              />
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: ACCOUNT SUMMARY & METRICS */}
        <div className="space-y-6">
          
          {/* ACCOUNT SUMMARY */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <h3 className="font-bold text-sm text-slate-900 mb-5">Account Summary</h3>
            <div className="flex items-center gap-4 border-b border-slate-100 pb-5 mb-5">
              <div className="w-14 h-14 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {accountSummary?.user?.name ?.split(" ").map(word => word[0]).join("").toUpperCase()}
              </div>
              <div>
                <h4 className="font-bold text-base text-slate-900">{accountSummary?.user?.name}</h4>
                <p className="text-xs text-slate-400 font-medium">{accountSummary?.user?.roleId?.name}</p>
                <p className="text-xs text-blue-600 mt-0.5 font-medium hover:underline cursor-pointer">{accountSummary?.user?.email}</p>
              </div>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 font-medium flex items-center gap-1.5"><Sliders size={14}/> User ID</span>
                <span className="font-bold text-slate-800">{accountSummary?.user?._id?.slice(-6)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 font-medium flex items-center gap-1.5"><ShieldAlert size={14}/> Role</span>
                <span className="font-bold text-slate-800">{accountSummary?.user?.roleId?.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 font-medium flex items-center gap-1.5"><Calendar size={14}/> Last Login</span>
                <span className="font-bold text-slate-800">{accountSummary?.user?.lastLogin ? new Date(accountSummary.user.lastLogin).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short",}) : "Never Logged In"}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-50">
                <span className="text-slate-400 font-medium flex items-center gap-1.5"><Key size={14}/> Password</span>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-slate-800 tracking-widest">••••••••</span>
                  <button className="text-blue-600 font-bold hover:underline">Change</button>
                </div>
              </div>
            </div>
          </div>

          {/* RECENT ACTIVITY */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-sm text-slate-900">Recent Activity</h3>
              <button className="text-xs font-bold text-blue-600 hover:underline">View All</button>
            </div>
            
            <div className="space-y-4">
              {activity.length > 0 ? ( activity.map((item) => (
                <ActivityItem key={item._id} icon={getActivityIcon(item.type)} title={item.message} 
                time={new Date(item.createdAt).toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",})}/>
              ))
            ) : (<p className="text-center text-slate-400 text-sm py-4">No recent activity found.</p>)}
            </div>
          </div>

          {/* QUICK ACTIONS */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <h3 className="font-bold text-sm text-slate-900 mb-4">Quick Actions</h3>
            <div className="space-y-1">
              <QuickActionRow icon={<Key size={16} className="text-slate-500" />} label="Change Password" />
              <QuickActionRow icon={<LayoutGrid size={16} className="text-slate-500" />} label="Manage API Keys" />
              <QuickActionRow icon={<Download size={16} className="text-slate-500" />} label="Download Data" />
              <QuickActionRow icon={<LogOut size={16} className="text-rose-500" />} label="Log Out" isDanger={true} />
            </div>
          </div>

        </div>
      </div>

      {/* FOOTER TIMESTAMPS */}
      <div className="flex justify-between items-center text-[11px] text-slate-400 font-medium mt-8 pt-4 border-t border-slate-200">
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
          All changes are automatically saved.
        </span>
        <button className="flex items-center gap-1 hover:text-slate-600 font-semibold">
          <HelpCircle size={14} /> Help Center
        </button>
      </div>

    </div>
  );
}

{/* --- HELPER COMPONENTS FOR PERFECT DESIGN --- */}

function SettingRow({ icon, title, desc, control }) {
  return (
    <div className="flex items-center justify-between py-4 first:pt-0 last:pb-0 gap-4">
      <div className="flex items-start gap-3.5 min-w-0">
        <div className="p-2 bg-slate-50 rounded-xl border border-slate-100 flex-shrink-0 mt-0.5">
          {icon}
        </div>
        <div className="min-w-0">
          <h4 className="text-sm font-bold text-slate-900">{title}</h4>
          <p className="text-xs text-slate-400 mt-0.5 font-medium truncate max-w-[250px] sm:max-w-md">{desc}</p>
        </div>
      </div>
      <div className="flex-shrink-0">
        {control}
      </div>
    </div>
  );
}

function ActivityItem({ icon, title, time }) {
  return (
    <div className="flex items-center justify-between text-xs group cursor-pointer">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-8 h-8 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center text-sm flex-shrink-0">
          {icon}
        </div>
        <div className="min-w-0">
          <h4 className="font-bold text-slate-800 truncate group-hover:text-blue-600 transition-colors">{title}</h4>
          <p className="text-[11px] text-slate-400 mt-0.5 font-medium">{time}</p>
        </div>
      </div>
      <ChevronRight size={14} className="text-slate-300 group-hover:text-slate-500 transition-colors flex-shrink-0 ml-1" />
    </div>
  );
}

function QuickActionRow({ icon, label, isDanger = false }) {
  return (
    <div className="flex items-center justify-between py-2.5 px-2 rounded-lg hover:bg-slate-50 cursor-pointer group transition-colors">
      <div className="flex items-center gap-3">
        <div className={`p-1.5 rounded-md ${isDanger ? 'bg-rose-50' : 'bg-slate-50 border border-slate-100'}`}>
          {icon}
        </div>
        <span className={`text-xs font-bold ${isDanger ? 'text-rose-600' : 'text-slate-700'}`}>{label}</span>
      </div>
      <ChevronRight size={14} className="text-slate-300 group-hover:text-slate-500 transition-colors" />
    </div>
  );
}

// Custom simple icon for items per page
function FileTextIcon({ className }) {
  return (
    <div className={`w-4 h-4 border border-current rounded-sm relative ${className}`}>
      <span className="absolute top-1 left-0.5 right-0.5 h-0.5 bg-current" />
      <span className="absolute top-2 left-0.5 right-1 h-0.5 bg-current" />
    </div>
  );
}