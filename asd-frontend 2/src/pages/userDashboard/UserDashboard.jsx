import React, { useState, useRef, useEffect } from "react";
import logo from "../../assets/Images/logo.png";
import axios from "axios";
// import { FiAlertCircle } from "react-icons/fi";
import {
  FiX,
  FiAlertTriangle,
  FiEdit3,
  FiLink2,
} from "react-icons/fi";
import { FaRupeeSign } from "react-icons/fa";

import {
  FiArrowLeft,
  FiSave,
  FiDownload,
  FiPlus,
  FiInfo,
  FiCopy,
  FiStar,
  FiDatabase,
  FiAlertCircle,
  FiAnchor,
  FiCpu,
  FiHash,
  FiGift,
  FiTruck,
  FiMap,
  FiPackage,
  FiRadio,
  FiFileText,
  FiUsers,
  FiBookmark,
  FiClipboard,
  FiBarChart2,
  FiCreditCard,
  FiBell,
  FiHelpCircle,
  FiSettings,
  FiChevronRight,
  FiShare2,
  FiSend,
  FiCheck,
  FiClock,
  FiDollarSign,

} from "react-icons/fi";
import Shipment from "../../components/ShipmentForm"
import calculator from "../../assets/Images/webp/calculator.webp"
import checker from "../../assets/Images/webp/checker.webp"
import shipment from "../../assets/Images/webp/shipment.webp"

import { FiPhone } from "react-icons/fi";
import { BsAirplane } from "react-icons/bs";
import { MdOutlineRocketLaunch } from "react-icons/md";
import HSCodeLookup from "./HsCodeLookUp";
import IncentiveChecker from "./IncentiveChecker";
import ShipmentPlanning from "./ShipmentPlanning";
import FreightCalculator from "./FreightCalculator";
import AiCargoMateAssistant from "./AiCargoMateAssistant";
import ShipmentTracking from "./ShipmentTracking";
import robot from "../../assets/Images/webp/robot.webp";

import {
  MdMenu,
  MdLocalShipping,
  MdDescription,
  MdPsychology,
  MdPayments,
  MdDoubleArrow,
  MdBolt,
  MdAdd,
  MdForum,
  MdCloudUpload,
  MdMyLocation,
  MdCalculate,
  MdSavings,
  MdHelp,
  MdDownload,
  MdTrendingFlat,
  MdCheckCircle,
  MdStorage,
  MdApi,
  MdSync,
  MdDashboard,
  MdSettings,
  MdArrowUpward,
  MdQrCode2,
  MdCheckroom,
  MdPerson,
} from "react-icons/md";
import {
  FiAward,
  FiShoppingCart,
  FiFolder,
  FiPercent,
  FiZap,
  FiEye,
  FiCheckCircle,
  FiExternalLink,
  FiCalendar,
} from "react-icons/fi";

import { FiChevronDown,
  FiUploadCloud,
  FiWifi,
  FiMapPin,
}
 from "react-icons/fi";
import { FaAnchor, FaShip } from "react-icons/fa";

import { MdMonitor } from "react-icons/md";
import { FiSearch, FiMail, FiSun } from "react-icons/fi";
import SavedReports from "./SavedReport";
import AuditLogs from "./AuditLogs";
import AnalyticsTrends from "./Analysis&Trends";
import VendorRecommendations from "./VendorRecommendations";
import DocumentsCenter from "./DocumentsCenter";
import MyShipment from "./MyShipments";
import UpgradePlan from "./UpgradePlan";
import Subscription from "./Subscription";
import NotificationDashboard from "./Notification";
import HelpSupportDashboard from "./Help&Support";
import ProfileSettingsDashboard from "./ProfileSettings";
import { useNavigate } from "react-router-dom";


const notifications = [
  {
    id: 1,
    icon: FiCheck,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    title: "Shipment PLN-2025-04-24-000123 updated",
    time: "2m ago",
    desc: "Your shipment is now in Transit to Dubai, UAE.",
    tag: "Shipment Update",
    tagBg: "bg-green-100",
    tagColor: "text-green-700",
    dot: "bg-green-500",
  },
  {
    id: 2,
    icon: FiFileText,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    title: "New document uploaded successfully",
    time: "15m ago",
    desc: "Commercial Invoice for shipment PLN-2025-04-24-000123",
    tag: "Document",
    tagBg: "bg-blue-100",
    tagColor: "text-blue-700",
    dot: "bg-blue-500",
  },
  {
    id: 3,
    icon: FaRupeeSign,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    title: "Incentive eligibility verified",
    time: "45m ago",
    desc: "You are eligible for RoDTEP benefit for shipment",
    tag: "Incentive",
    tagBg: "bg-purple-100",
    tagColor: "text-purple-700",
    dot: "bg-purple-500",
  },
  {
    id: 4,
    icon: FiAlertTriangle,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    title: "Action required: Missing document",
    time: "1h ago",
    desc: "Packing List is missing for shipment PLN-2025-04-20-000112",
    tag: "Action Required",
    tagBg: "bg-orange-100",
    tagColor: "text-orange-700",
    dot: "bg-orange-500",
  },
  {
    id: 5,
    icon: FiSend,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    title: "Freight quote received",
    time: "2h ago",
    desc: "New freight quote received for Mumbai → Dubai",
    tag: "Freight Update",
    tagBg: "bg-blue-100",
    tagColor: "text-blue-700",
    dot: "bg-blue-500",
  },
];
 
const messages = [
  {
    id: 1,
    initials: "IC",
    name: "IndiGo Cargo",
    subject: "Freight Confirmation - PLN - 2025 - 04 - 24 - 000123",
    preview: "Dear Team, Your Booking has been confirmed for shipment",
    time: "10:30 AM",
    link: true,
    star: true,
    dot: true,
    active: true,
  },
  {
    id: 2,
    initials: "SC",
    name: "Sea Connect Logistics",
    subject: "Update Freight Quote",
    preview: "Please fing the updated freight quote for your refrence",
    time: "Yesterday",
    link: false,
    star: true,
    dot: true,
  },
  {
    id: 3,
    initials: "CB",
    name: "Custom Broker",
    subject: "Document Verification Update",
    preview: "Your documents for shipment PLN - 2025 - 04 - 24 - 0012...",
    time: "Yesterday",
    link: true,
    star: true,
    dot: true,
  },
  {
    id: 4,
    initials: "RD",
    name: "RoDTEP Department",
    subject: "Incentive Claim Approved",
    preview: "Your RoDTEP claim has been updated. Please find the details....",
    time: "23 Apr, 2025",
    link: false,
    star: true,
    dot: false,
  },
  {
    id: 5,
    initials: "EX",
    name: "Export Support Team",
    subject: "Export compliance update",
    preview: "important update regarding export compliance guidelines",
    time: "23 Apr, 2025",
    link: false,
    star: false,
    dot: false,
  },
];

const C = {
  primary: "#00685f",
  secondary: "#006398",
  tertiary: "#a33900",
  bg: "#f8f9ff",
  surface: "#f8f9ff",
  onSurface: "#0d1c2e",
  onSurfaceVariant: "#3d4947",
  outlineVariant: "#bcc9c6",
  scLowest: "#ffffff",
  scLow: "#eff4ff",
  sc: "#e6eeff",
  scHigh: "#dce9ff",
  scHighest: "#d5e3fc",
  error: "#ba1a1a",
  errorContainer: "#ffdad6",
  tertiaryFixed: "#ffdbce",
  tertiaryContainer: "#cc4900",
  primaryFixed: "#89f5e7",
  secondaryFixed: "#cce5ff",
};

function StatCard({ label, value, change, iconBg, icon: Icon, iconColor }) {
  return (
    <div
      className=" flex-1 min-w-0 p-3 rounded-xl border shadow-sm"
      style={{ backgroundColor: C.scLowest, borderColor: C.outlineVariant }}
    >
      <div className="flex justify-between items-start mb-2">
        <span
          className="text-sm  font-semibold  leading-4"
          // style={{ color: C.onSurfaceVariant }}
        >
          {label}
        </span>
      </div>
      <div className="flex justify-between " style={{ color: C.onSurface }}>
        <div className="text-2xl font-bold  "> {value}</div>
        <div className="p-1 rounded-lg" style={{ backgroundColor: iconBg }}>
          <Icon size={22} style={{ color: iconColor }} />
        </div>
      </div>
      <div className="flex items-center gap-1 mt-1 text-[#00A63E]">
        <MdArrowUpward size={10} className="" />
        <span className="text-[10px] font-normal">{change}</span>
      </div>
    </div>
  );
}

function QuickActionBtn({ id,icon: Icon, label, bgcolor, textColor }) {
   
  const [active, setActive] = useState("")

  return (
    <> 
     <button
      className="flex flex-col items-center gap-1 group"
      style={{ backgroundColor: bgcolor }}
    >
      <div onClick={() => setActive(id)} className="w-full  aspect-square rounded-xl flex  flex-col items-center justify-center transition-colors">
        <Icon size={24} style={{ color: textColor }} />
        <span className="text-[10px] text-center font-bold px-2 py-1 rounded-md">
          {label}
        </span>
      </div>
    </button>
   
      {active === "freight" && (
        <FreightCalculatorModal onClose={() => setActive(null)} />
      )}

       {active === "upload" && (
        <UploadDocumentationModal onClose={() => setActive(null)} />
      )}
      {active === "track" && (
        <TrackShipmentModal onClose={() => setActive(null)} />
      )}
      {active === "incentives" && (
        <IncentivesCheckerModal onClose={() => setActive(null)} />
      )} 
      
    </>
   
  );
}

function ActivityItem({
  dotColor,
  iconBg,
  icon: Icon,
  iconColor,
  title,
  subtitle,
  time,
  tag,
}) {
  return (
    <div
      className="flex gap-3 sm:gap-4 pb-4 sm:px-0 px-5 relative items-center  justify-around"
      style={{ borderColor: C.outlineVariant }}
    >
      <div className="p-2  rounded-lg h-fit" style={{ backgroundColor: iconBg }}>
         {typeof Icon === "string" ? (
        <img src={Icon || null} alt="icon" className="w-5 h-5" />
      ) : (
        React.createElement(Icon, {
          size: 22,
          style: { color: iconColor },
        })
      )}

      </div>
      <div className="flex-1 justify-">
        <div className="font-normal text-sm" style={{ color: C.onSurface }}>
          {title}
        </div>
        {subtitle && (
          <p className="text-[11px]" style={{ color: C.onSurfaceVariant }}>
            {subtitle}
          </p>
        )}
        <div className="text-[10px] mt-1" style={{ color: C.onSurfaceVariant }}>
          {time}
        </div>
        {tag && (
          <div className="flex items-center gap-1 mt-1 text-[10px] font-bold text-[#00A63E]">
            <MdCheckCircle size={12} />
            {tag}
          </div>
        )}
      </div>
    </div>
  );
}

function DetailCard({ tag, title, children }) {
  const [active ,setActive ] = useState("")
  const [value, setValue] = useState("")

  return (
    <div
      className="p-4 rounded-xl border flex flex-col justify-between"
      style={{ backgroundColor: C.scLowest, borderColor: C.outlineVariant }}
    >
      <div className="flex flex-col    mb-4">
        <div className="flex  justify-between">
          <h4 className="text-sm font-bold">{title}</h4>
          <button className="text-[10px] font-bold uppercase text-[#00A896]">
            View All
          </button>
        </div>
        <div className="flex justify-start">
          <span className="text-[10px] font-bold uppercase text-[#94A3B8]">
            {tag}
          </span>
        </div>
      </div>
      <div> 
      {children}</div>
     <div> 
      <button className="w-full py-2 mb-2  font-bold rounded-lg text-[9px] text-white bg-[#0FB5A9]">
        Create Shipment from this result
      </button>
      <button  onClick={() => setActive("report")} className="w-full text-xs flex items-center text-[#2563EB] justify-center gap-2 font-bold  ">
        <MdDownload size={16} className="" /> Download Report (PDF)
      </button>
      </div>


      {active === "report" && (
        <DownloadReportModal onClose={() => setActive(null)} setValue={setValue}  value={value}/>
      )}

    </div>
  );
}

const statCards = [
  {
    label: "Active Shipments",
    value: "18",
    change: "12% vs last month",
    iconBg: C.scHigh,
    icon: MdStorage,
    iconColor: C.primary,
  },
  {
    label: "Pending Documents",
    value: "7",
    change: "8% vs last month",
    iconBg: C.secondaryFixed,
    icon: MdDescription,
    iconColor: C.secondary,
  },
  {
    label: "AI Queries Left",
    value: "42 /100",
    change: "8% vs last month",
    iconBg: C.primaryFixed,
    icon: MdBolt,
    iconColor: C.primary,
  },
  {
    label: "Estimated Incentive Savings",
    value: "₹86,420",
    change: "10% vs last month",
    iconBg: "#dcfce7",
    icon: MdCheckCircle,
    iconColor: "#00A63E",
  },
];

const quickActions = [
  {
    icon: MdBolt,
    label: "Create Shipment",
    bgcolor: C.scHigh,
    textColor: C.primary,
  },
  {
    icon: MdPsychology,
    label: "Ask CargoMate AI",
    bgcolor: C.primaryFixed,
    textColor: C.primary,
  },
  {
    icon: MdDescription,
    label: "Upload Documents",
    bgcolor: C.secondaryFixed,
    textColor: C.secondary,
  },
  {
    icon: MdQrCode2,
    label: "Track Shipment",
    bgcolor: C.tertiaryFixed,
    textColor: C.tertiary,
  },
  {
    icon: MdTrendingFlat,
    label: "Freight Calculator",
    bgcolor: C.scHigh,
    textColor: C.primary,
  },
  {
    icon: MdCheckroom,
    label: "Incentive Checker",
    bgcolor: "#fce7f3",
    textColor: "#be185d",
  },
];

const shipments = [
  {
    id: "AS0-202$-104",
    route: "Nhava Sheva - Dubai",
    status: "Transit",
    statusBg: "#dcfce7",
    statusColor: "#15803d",
    eta: "29 Apr 2025",
    mode: "Sea",
    vendor: "Oceanic Logistics",
    amount: "₹1,24,860",
  },
  {
    id: "A$D-202$-103",
    route: "Delhi New York",
    status: "Delayed",
    statusBg: "#fee2e2",
    statusColor: "#dc2626",
    eta: "27 Apr 2025",
    mode: "Air",
    vendor: "SkyFreight Global",
    amount: "₹2,48,600",
  },
  {
    id: "A$D-202$-102",
    route: "Mumbaia London",
    status: "Pending",
    statusBg: "#fef9c3",
    statusColor: "#ca8a04",
    eta: "30 Apr 2025",
    mode: "Sea",
    vendor: "SwiftLogix",
    amount: "₹98,450",
  },
  {
    id: "AS0-202$-101",
    route: "Tirupur Sinpipore",
    status: "Delivered",
    statusBg: "#dcfce7",
    statusColor: "#15803d",
    eta: "20 Apr 2025",
    mode: "Sea",
    vendor: "Oceanic Logistics",
    amount: "₹76,230",
  },
];


const sidebarSections = [
  {
    title: "Dashboard",
    items: [],
  },
  {
    title: "AI & Trade Tools",
    items: [
      {
        icon: FiCpu,
        label: "AI CargoMate Assistant",
        badge: "Core",
        badgeColor: "bg-teal-500",
      },
      { icon: FiHash, label: "HS Code Lookup" },
      { icon: FiGift, label: "Incentive Checker" },
      { icon: FiTruck, label: "Freight Calculator" },
      { icon: FiMap, label: "Shipment Planning" },
    ],
  },
  {
    title: "Shipment Operations",
    items: [
      { icon: FiPackage, label: "My Shipments" },
      { icon: FiRadio, label: "Shipment Tracking" },
      { icon: FiFileText, label: "Documents Center" },
      { icon: FiUsers, label: "Vendor Recommendations" },
    ],
  },
  {
    title: "Reports & Insights",
    items: [
      {
        icon: FiBookmark,
        label: "Saved Reports",
        badge: "New",
        badgeColor: "bg-[#2B7FFF]",
      },
      { icon: FiClipboard, label: "Audit Logs" },
      { icon: FiBarChart2, label: "Analytics & Trends" },
    ],
  },
  {
    title: "Account & Support",
    items: [
      {
        icon: FiCreditCard,
        label: "Subscription",
        badge: "Pro Plan",
        badgeColor: "bg-[#00BBA7]",
      },
      {
        icon: FiBell,
        label: "Notifications",
        badge: "",
        badgeColor: "bg-red-500",
      },
      { icon: FiHelpCircle, label: "Help & Support" },
      { icon: FiSettings, label: "Profile Settings" },
    ],
  },
];

function NotificationsModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 p-3 sm:p-6 overflow-y-auto">
      <div className="w-full max-w-md sm:max-w-lg bg-white rounded-2xl shadow-2xl mt-4 sm:mt-10">
        <div className="p-4 sm:p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center shrink-0">
                <FiBell size={20} />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                  Notifications
                </h2>
                <p className="text-xs sm:text-sm text-gray-500">
                  Stay updated with the latest activities.
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 shrink-0"
            >
              <FiX size={22} />
            </button>
          </div>
 
          <div className="mt-4">
            <span className="inline-flex items-center gap-2 bg-teal-50 text-teal-700 text-sm font-medium px-3 py-1.5 rounded-full">
              All
              <span className="bg-teal-600 text-white text-xs font-semibold w-5 h-5 rounded-full flex items-center justify-center">
                12
              </span>
            </span>
          </div>
 
          <div className="mt-4 space-y-3">
            {notifications.map((n) => {
              const Icon = n.icon;
              return (
                <div
                  key={n.id}
                  className="border border-gray-100 rounded-xl p-3 flex gap-3"
                >
                  <div
                    className={`w-9 h-9 rounded-full ${n.iconBg} ${n.iconColor} flex items-center justify-center shrink-0`}
                  >
                    <Icon size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-semibold text-gray-900">
                        {n.title}
                      </p>
                      <span className="text-xs text-gray-400 whitespace-nowrap shrink-0">
                        {n.time}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                      {n.desc}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span
                        className={`${n.tagBg} ${n.tagColor} text-xs font-medium px-2.5 py-1 rounded-full`}
                      >
                        {n.tag}
                      </span>
                      <span className={`w-2 h-2 rounded-full ${n.dot}`} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
 
function MessagesModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 p-3 sm:p-6 overflow-y-auto">
      <div className="w-full max-w-md sm:max-w-2xl bg-white rounded-2xl shadow-2xl mt-4 sm:mt-10">
        <div className="p-4 sm:p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center shrink-0">
                <FiMail size={20} />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                  Messages
                </h2>
                <p className="text-xs sm:text-sm text-gray-500">
                  View and manage your emails.
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 shrink-0"
            >
              <FiX size={22} />
            </button>
          </div>
 
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <span className="inline-flex items-center gap-2 text-teal-600 font-semibold text-sm sm:text-base">
              Inbox
              <span className="bg-teal-600 text-white text-xs font-semibold w-5 h-5 rounded-full flex items-center justify-center">
                8
              </span>
            </span>
            <button className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium px-4 py-2 rounded-full w-full sm:w-auto justify-center">
              <FiEdit3 size={16} />
              Compose Mail
            </button>
          </div>
 
          <div className="mt-4 relative">
            <input
              type="text"
              placeholder="Search emails..."
              className="w-full border border-gray-200 rounded-xl pl-4 pr-10 py-3 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <FiSearch
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
          </div>
 
          <div className="mt-4 space-y-3">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`border border-gray-100 rounded-xl p-3 sm:p-4 flex gap-3 ${
                  m.active ? "bg-gray-50" : ""
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-teal-50 text-teal-700 font-bold text-sm flex items-center justify-center shrink-0">
                  {m.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm sm:text-base font-bold text-gray-900 truncate">
                      {m.name}
                    </p>
                    <span className="text-xs text-gray-400 whitespace-nowrap shrink-0">
                      {m.time}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-gray-800 truncate">
                    {m.subject}
                  </p>
                  <div className="flex items-center justify-between gap-2 mt-0.5">
                    <p className="text-xs sm:text-sm text-gray-500 truncate">
                      {m.preview}
                    </p>
                    <div className="flex items-center gap-2 shrink-0">
                      {m.link && (
                        <FiLink2 size={14} className="text-gray-400" />
                      )}
                      <FiStar
                        size={14}
                        className={
                          m.star
                            ? "text-gray-900 fill-current"
                            : "text-gray-300"
                        }
                      />
                      {m.dot && (
                        <span className="w-2 h-2 rounded-full bg-green-500" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


function ModalShell({ children, width = "max-w-md" }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 sm:p-6 overflow-y-auto">
      <div className={`w-full ${width} bg-white rounded-2xl shadow-2xl mt-4 sm:mt-10`}>
        <div className="p-4 sm:p-6">{children}</div>
      </div>
    </div>
  );
}
 
function Field({ label, placeholder, select }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-900 mb-1.5">
        {label}
      </label>
      {select ? (
        <div className="relative">
          <select className="w-full appearance-none border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500">
            <option>{placeholder}</option>
          </select>
          <FiChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
        </div>
      ) : (
        <input
          type="text"
          placeholder={placeholder}
          className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-400 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      )}
    </div>
  );
}
 
function DownloadReportModal({ onClose,setValue , value }) {


  return (
    <ModalShell>
      <div className="flex items-start justify-between">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900">
          Download Report
        </h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <FiX size={20} />
        </button>
      </div>
      <p className="text-sm text-gray-500 mt-1">
        Your report is ready to download as a PDF.
      </p>
 
      <div className="mt-5">
        <label className="block text-sm font-semibold text-gray-900 mb-1.5">
          File Name
        </label>
        <input 
         type="text"
         onChange={(e) => setValue(e.target.value)}
         value={value}
         placeholder="Enter file name"
         className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-500 bg-gray-50" />
         
      </div>
 
      <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:justify-end">
        <button onClick={onClose} className="order-2 sm:order-1 border border-gray-200 text-gray-700 text-sm font-medium px-5 py-2.5 rounded-full">
          Cancel
        </button>
        <button className="order-1 sm:order-2 bg-teal-500 hover:bg-teal-600 text-white text-sm font-medium px-5 py-2.5 rounded-full">
          Download PDF
        </button>
      </div>
    </ModalShell>
  );
}
 
function FreightCalculatorModal({ onClose }) {
  return (
    <ModalShell width="max-w-lg ">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FiTruck size={20} className="text-gray-900" />
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">
            Freight Calculator
          </h2>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <FiX size={20} />
        </button>
      </div>
      <p className="text-sm text-gray-500 mt-1">
        Calculate estimated freight cost for your shipment.
      </p>
 
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Origin" placeholder="Enter origin city or port" />
        <Field label="Destination" placeholder="Enter destination city or port" />
        <Field label="Select shipment type" placeholder="Select shipment type" select />
        <Field label="Weight (kg)" placeholder="Enter weight in kg" />
        <Field label="Volume (CBM)" placeholder="Enter volume in CBM" />
        <Field label="Incoterms" placeholder="Select Incoterms" select />
      </div>
 
      <div className="mt-5 bg-cyan-50 rounded-xl p-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-teal-600">
            Estimated Freight Cost
          </p>
          <p className="text-2xl font-bold text-gray-900 mt-1">₹0.00</p>
        </div>
        <FiTruck size={32} className="text-gray-400" />
      </div>
 
      <div className="mt-3 flex items-start gap-1.5 text-xs text-gray-500">
        <FiInfo size={14} className="mt-0.5 shrink-0" />
        <p>
          This is an estimated cost. Actual cost may vary based on carrier and
          market conditions.
        </p>
      </div>
 
      <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:justify-end">
        <button onClick={onClose} className="order-2 sm:order-1 border border-gray-200 text-gray-700 text-sm font-medium px-5 py-2.5 rounded-full">
          Cancel
        </button>
        <button className="order-1 sm:order-2 bg-teal-500 hover:bg-teal-600 text-white text-sm font-medium px-5 py-2.5 rounded-full">
          Calculate
        </button>
      </div>
    </ModalShell>
  );
}
 
function UploadDocumentationModal({ onClose }) {
  const fileInputRef = useRef(null);

const [image, setImage] = useState(null);
const [preview, setPreview] = useState("");
const [dragging, setDragging] = useState(false);
const [loading, setLoading] = useState(false);

const handleFile = (file) => {
  if (!file) return;

  const allowedTypes = [
    "image/png",
    "image/jpg",
    "image/jpeg",
  ];

  if (!allowedTypes.includes(file.type)) {
    alert("Only PNG, JPG and JPEG files are allowed.");
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    alert("File size should be less than 5MB.");
    return;
  }

  setImage(file);
  setPreview(URL.createObjectURL(file));
};

const handleChange = (e) => {
  handleFile(e.target.files[0]);
};

const handleDrop = (e) => {
  e.preventDefault();
  setDragging(false);

  const file = e.dataTransfer.files[0];
  handleFile(file);
};

const handleDragOver = (e) => {
  e.preventDefault();
};

const handleDragEnter = (e) => {
  e.preventDefault();
  setDragging(true);
};

const handleDragLeave = (e) => {
  e.preventDefault();
  setDragging(false);
};

const removeImage = () => {
  setImage(null);
  setPreview("");

  if (fileInputRef.current) {
    fileInputRef.current.value = "";
  }
};

const uploadImage = async () => {
  if (!image) {
    alert("Please select image");
    return;
  }

  try {
    setLoading(true);
    const formData = new FormData();
    formData.append("image", image);
    const res = await axios.post(
      "/api/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    alert("Uploaded Successfully");
    console.log(res.data.image);
  } catch (err) {
    console.log(err);
    alert("Upload Failed");
  } finally {
    setLoading(false);
  }
};
  return (
    <ModalShell>
     <div className="flex items-start justify-between">
  <h2 className="text-base sm:text-lg font-bold text-gray-900">
    Upload documentation (optional)
  </h2>

  <button
    onClick={onClose}
    className="text-gray-400 hover:text-gray-600"
  >
    <FiX size={20} />
  </button>
</div>

<div
  onClick={() => fileInputRef.current.click()}
  onDrop={handleDrop}
  onDragOver={handleDragOver}
  onDragEnter={handleDragEnter}
  onDragLeave={handleDragLeave}
  className="mt-4 border-2 border-dashed border-gray-200 rounded-xl py-8 flex flex-col items-center justify-center text-center px-4 cursor-pointer"
>
  <input
    ref={fileInputRef}
    type="file"
    accept=".png,.jpg,.jpeg"
    hidden
    onChange={handleChange}
  />

  {!preview ? (
    <>
      <FiUploadCloud size={26} className="text-gray-700 mb-2" />

      <p className="text-sm font-medium text-gray-700">
        Drag &amp; Drop files here or browse
      </p>

      <p className="text-xs text-gray-400 mt-1">
        Supported formats: PDF, JPG, PNG (Max 5 MB)
      </p>
    </>
  ) : (
    <>
      <img
        src={preview}
        alt="Preview"
        className="w-40 h-40 object-cover rounded-lg"
      />

      <p className="text-sm mt-3 font-medium text-gray-700">
        {image.name}
      </p>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          removeImage();
        }}
        className="mt-3 text-red-500 text-sm"
      >
        Remove
      </button>
    </>
  )}
</div>

<div className="mt-6 flex flex-col sm:flex-row gap-3 sm:justify-end">
  <button className="order-2 sm:order-1 border border-gray-200 text-gray-700 text-sm font-medium px-5 py-2.5 rounded-full">
    Cancel
  </button>

  <button
    onClick={uploadImage}
    disabled={loading}
    className="order-1 sm:order-2 bg-teal-500 hover:bg-teal-600 text-white text-sm font-medium px-5 py-2.5 rounded-full"
  >
    {loading ? "Uploading..." : "Apply for license"}
  </button>
</div>
    </ModalShell>
  );
}
 
function TrackShipmentModal({ onClose }) {
  const steps = [
    { label: "Booked", date: "24 Apr 2025", icon: FiMapPin, state: "done" },
    { label: "In Transit", date: "25 Apr 2025", icon: FaShip, state: "done" },
    { label: "Arriving", date: "02 May 2025", icon: FaShip, state: "pending" },
    { label: "Delivered", date: "05 May 2025", icon: FiCheck, state: "pending" },
  ];
 
  const details = [
    { label: "Carrier", value: "Maersk Line" },
    { label: "Vessel / Flight", value: "MAERSK HOUSTON / 2506W" },
    { label: "Container / BL No.", value: "MSKU1234567 / BOL-2025-0424" },
    { label: "ETD", value: "25 Apr 2025" },
    { label: "ETA", value: "02 May 2025" },
    { label: "Current Location", value: "Arabian Sea" },
  ];
 
  return (
    <ModalShell width="max-w-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
            <FiWifi size={16} />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-gray-900">
              Track Shipment
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">
              View real-time updates and shipment status.
            </p>
          </div>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <FiX size={20} />
        </button>
      </div>
 
      <div className="mt-4 bg-gray-50 rounded-xl px-4 py-3 flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-500">Shipment ID</p>
          <p className="text-sm font-bold text-gray-900">
            PLN-2025-04-24-000123
          </p>
        </div>
        <span className="bg-teal-100 text-teal-700 text-xs font-semibold px-3 py-1 rounded-full">
          In Transit
        </span>
      </div>
 
      <div className="mt-5 flex items-start justify-between">
        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="flex items-center flex-1">
              <div className="flex flex-col items-center text-center flex-1">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center ${
                    s.state === "done"
                      ? "bg-teal-500 text-white"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  <Icon size={14} />
                </div>
                <p
                  className={`text-xs font-semibold mt-1.5 ${
                    s.state === "done" ? "text-teal-600" : "text-gray-400"
                  }`}
                >
                  {s.label}
                </p>
                <p className="text-[10px] text-gray-400">{s.date}</p>
              </div>
              {i < steps.length - 1 && (
                <span className="text-gray-300 text-xs mb-6">→</span>
              )}
            </div>
          );
        })}
      </div>
 
      <div className="mt-5">
        <p className="text-sm font-bold text-gray-900 mb-2">Latest Update</p>
        <div className="bg-teal-50 rounded-xl p-3 flex gap-3">
          <div className="w-8 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center shrink-0">
            <FaAnchor size={13} />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-bold text-gray-900">
                Vessel Departed
              </p>
              <span className="bg-teal-100 text-teal-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                Sea Freight
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              Vessel has departed from Nhava Sheva Port, India.
            </p>
            <p className="text-xs sm:text-sm font-semibold text-gray-700 mt-1">
              25 Apr 2025, 08:30 AM
            </p>
          </div>
        </div>
      </div>
 
      <div className="mt-5">
        <p className="text-sm font-bold text-gray-900 mb-2">
          Shipment Details
        </p>
        <div className="space-y-2">
          {details.map((d) => (
            <div key={d.label} className="flex items-center justify-between">
              <span className="text-xs sm:text-sm text-gray-500">
                {d.label}
              </span>
              <span className="text-xs sm:text-sm font-semibold text-gray-900 text-right">
                {d.value}
              </span>
            </div>
          ))}
        </div>
      </div>
 
      <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:justify-between sm:items-center">
        <button className="inline-flex items-center justify-center gap-2 border border-teal-500 text-teal-600 text-sm font-medium px-5 py-2.5 rounded-full">
          <FiDownload size={16} />
          Download Documents
        </button>
        <button
          onClick={onClose}
          className="bg-teal-500 hover:bg-teal-600 text-white text-sm font-medium px-6 py-2.5 rounded-full"
        >
          Close
        </button>
      </div>
    </ModalShell>
  );
}
 
function IncentivesCheckerModal({ onClose }) {

  return (
    <ModalShell width="max-w-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FiGift size={20} className="text-gray-900" />
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">
            Incentives Checker
          </h2>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <FiX size={20} />
        </button>
      </div>
      <p className="text-sm text-gray-500 mt-1">
        Check available incentives for your shipment.
      </p>
 
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Origin" placeholder="Enter origin city or port" />
        <Field label="Destination" placeholder="Enter destination city or port" />
        <Field label="Select shipment type" placeholder="Select shipment type" select />
        <Field label="Cargo Type" placeholder="Select cargo type" select />
        <Field label="Weight" placeholder="Enter weight in kg" />
        <Field label="Value (₹)" placeholder="Enter value" select />
      </div>
 
      <div className="mt-5 bg-cyan-50 rounded-xl p-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-teal-600">
            Eligible Incentives
          </p>
          <p className="text-2xl font-bold text-gray-900 mt-1">₹0.00</p>
        </div>
        <FiGift size={32} className="text-gray-400" />
      </div>
 
      <div className="mt-3 flex items-start gap-1.5 text-xs text-gray-500">
        <FiInfo size={14} className="mt-0.5 shrink-0" />
        <p>Incentives are subject to terms and conditions.</p>
      </div>
 
      <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:justify-end">
        <button onClick={onClose} className="order-2 sm:order-1 border border-gray-200 text-gray-700 text-sm font-medium px-5 py-2.5 rounded-full">
          Cancel
        </button>
        <button  className="order-1 sm:order-2 bg-teal-500 hover:bg-teal-600 text-white text-sm font-medium px-5 py-2.5 rounded-full">
          Check Incentives
        </button>
      </div>
    </ModalShell>
  );
}


function SectionCard({ number, title, subtitle, children }) {
  return (
    <div className="bg-white grid grid-cols-1 border border-gray-200 rounded-xl p-2 shadow-sm">
      <div className="flex items-center gap-2">
        <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
          {number}
        </span>
        <h3 className="text-sm font-bold  text-gray-900">{title}</h3>
      </div>
      {subtitle && (
        <p className="text-xs text-gray-500 whitespace-nowrap mt-1 ml-7">{subtitle}</p>
      )}
      <div className="mt-4 space-y-4">{children}</div>
    </div>
  );
}
 
function Label({ children }) {
  return (
    <label className="block text-xs xl:text-[11px]  font-semibold text-gray-700 mb-1">
      {children}
      <span className="text-red-500 ml-0.5">*</span>
    </label>
  );
}
 
function Input({ label, placeholder, value, required = true }) {
  return (
    <div>
      {required ? (
        <Label>{label}</Label>
      ) : (
        <label className="block text-xs whitespace-nowrap font-semibold text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        type="text"
        defaultValue={value}
        placeholder={placeholder}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
 
function DateInput({ label }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          type="text"
          placeholder="Select date"
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-400 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <FiCalendar
          size={14}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
      </div>
    </div>
  );
}
 
function Select({ label, placeholder, required = true }) {
  return (
    <div>
      {required ? (
        <Label>{label}</Label>
      ) : (
        <label className="block text-xs font-semibold text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <select className="w-full appearance-none border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>{placeholder}</option>
        </select>
        <FiChevronDown
          size={14}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
        />
      </div>
    </div>
  );
}
 
function RadioGroup({ label, defaultValue = "no" }) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="flex items-center gap-4 mt-2">
        <label className="flex items-center gap-1.5 text-sm text-gray-700">
          <input
            type="radio"
            className="accent-blue-600"
            defaultChecked={defaultValue === "yes"}
          />
          Yes
        </label>
        <label className="flex items-center gap-1.5 text-sm text-gray-700">
          <input
            type="radio"
            className="accent-blue-600"
            defaultChecked={defaultValue === "no"}
          />
          No
        </label>
      </div>
    </div>
  );
}
 
function Grid2({ children }) {
  return <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">{children}</div>;
}
 
const docTypes = [
  { label: "Commercial Invoice", icon: FiFileText, color: "text-blue-600 bg-blue-50" },
  { label: "Packing List", icon: FiClipboard, color: "text-orange-600 bg-orange-50" },
  { label: "MSDS", icon: FiAward, color: "text-purple-600 bg-purple-50" },
  { label: "COO", icon: FiAward, color: "text-green-600 bg-green-50" },
  { label: "IEC / GST", icon: FiCreditCard, color: "text-blue-600 bg-blue-50" },
  { label: "Purchase Order", icon: FiShoppingCart, color: "text-orange-600 bg-orange-50" },
  { label: "Product Certificate", icon: FiAward, color: "text-purple-600 bg-purple-50" },
  { label: "Other Documents", icon: FiFolder, color: "text-gray-500 bg-gray-100" },
];

 
const aiTopStats = [
  { label: "Suggested HS Code", value: "8517.12.00", color: "bg-blue-50 text-blue-700" },
  { label: "Required Documents", value: "7 Documents", color: "bg-green-50 text-green-700" },
  { label: "Freight Estimate", value: "₹24,860", color: "bg-orange-50 text-orange-700" },
  { label: "RoDTEP / Incentive", value: "Eligible (2.5%)", color: "bg-purple-50 text-purple-700" },
];
 
const aiBottomStats = [
  { label: "Compliance Requirements", value: "12", sub: "Requirements" },
  { label: "Risk Score", value: "Low Risk", sub: "(18/100)", green: true },
  { label: "Estimated Timeline", value: "8-10 Days" },
  { label: "Recommended Action", value: "Proceed with Booking", green: true },
];
 


export default function UserDashboard() {
  const navigate = useNavigate();
   
    const [active, setActive] = useState(null);
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [analysisTab, setAnalysisTab] = useState("HS Code Analysis");
  // const content = tabContent[analysisTab];
    const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [activeNav, setActiveNav] = useState(0);
   const [shipment, setShipment] = useState("")

    const modals = [
    { key: "report", label: "Download Report" },
    { key: "freight", label: "Freight Calculator" },
    { key: "upload", label: "Upload Documentation" },
    { key: "track", label: "Track Shipment" },
    { key: "incentives", label: "Incentives Checker" },
  ];

  const navItems = [
    { icon: MdDashboard, label: "Dashboard" },
    { icon: MdLocalShipping, label: "Shipments" },
    { icon: MdDescription, label: "Documents" },
    { icon: MdMonitor, label: "Analytics" },
    { icon: MdSettings, label: "Settings" },
  ];

  const statCards = [
    {
      label: "Active Shipments",
      value: "18",
      change: "12% vs last month",
      iconBg: C.scHigh,
      icon: MdLocalShipping,
      iconColor: C.primary,
    },
    {
      label: "Pending Docs",
      value: "7",
      change: "8% vs last month",
      iconBg: C.tertiaryFixed,
      icon: MdDescription,
      iconColor: C.tertiary,
    },
    {
      label: "AI Queries Left",
      value: "42/100",
      change: "8% vs last month",
      iconBg: C.scHighest,
      icon: MdPsychology,
      iconColor: C.secondary,
    },
    {
      label: "Incentives",
      value: "₹86,420",
      change: "10% vs last month",
      iconBg: C.primaryFixed,
      icon: MdPayments,
      iconColor: C.primary,
    },
  ];

  const quickActions = [
    // {
    //   id: "shipment",
    //   icon: MdAdd,
    //   label: "Create Shipment",
    //   bgcolor: "#F0FDFA",
    //   textColor: "#00A896",
    // },
    {
      id:"cargo",
      icon: MdForum,
      label: "Ask CargoMate",
      bgcolor: "#F0FDFA",
      textColor: "#2563EB",
    },
    {
      id:"upload",
      icon: MdCloudUpload,
      label: "Upload Docs",
      bgcolor: "#FFF7ED",
      textColor: "#F97316",
    },
    {
      id: "track",
      icon: MdMyLocation,
      label: "Track Shipment",
      bgcolor: "#F0FDFA",
      textColor: "#4F46E5",
    },
    {
      id:"freight",
      icon: MdCalculate,
      label: "Freight Calculation",
      bgcolor: "#F0FDFA",
      textColor: "#0891B2",
    },
    {
      id:"incentives",
      icon: MdSavings,
      label: "Incentive Checker",
      bgcolor: "#FDF2F8",
      textColor: "#DB2777",
    },
  ];

  const shipments = [
    {
      id: "AS0-2025-104",
      route: "Nhava Sheva - Dubai",
      status: "Transit",
      statusBg: C.scHigh,
      statusColor: C.secondary,
      eta: "29 Apr 2025",
      mode: "Sea",
      vendor: "Oceanic Logistics",
      amount: "₹1,24,860",
    },
    {
      id: "ASD-2025-103",
      route: "Delhi - New York",
      status: "Delayed",
      statusBg: C.errorContainer,
      statusColor: C.error,
      eta: "27 Apr 2025",
      mode: "Air",
      vendor: "SkyFreight Global",
      amount: "₹2,48,600",
    },
    {
      id: "ASD-2025-102",
      route: "Mumbai - London",
      status: "Pending",
      statusBg: C.tertiaryFixed,
      statusColor: C.tertiary,
      eta: "30 Apr 2025",
      mode: "Sea",
      vendor: "SwiftLogix",
      amount: "₹98,450",
    },
    {
      id: "ASD-2025-101",
      route: "Mumbai - London",
      status: "Delivered",
      statusBg: C.tertiaryFixed,
      statusColor: C.tertiary,
      eta: "30 Apr 2025",
      mode: "Sea",
      vendor: "SwiftLogix",
      amount: "₹98,450",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100  font-sans">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <header className="fixed top-0 w-full z-[9999] pr-3 bg-white border-b border-gray-200     py-0 flex items-center gap-3  ">
        <button
          className="lg:hidden p-1.5 pl-4 rounded-md hover:bg-gray-100 text-gray-600"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <MdMenu size={18} />
        </button>

        <div className="lg:flex  items-center sm:w-60 hidden  justify-center gap-2 px-4 py-2   ">
          <img src={logo} className="h-10" onClick={() => navigate("/")} />
        </div>

        <div className="flex-1 w-full sm:max-w-sm md:max-w-md">
          <div className="relative sm:w-full w-20">
            <FiSearch
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"
              size={14}
            />
            <input
              type="text"
              placeholder="Search"
              className="sm:w-full w-14 pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-teal-400"
            />
          </div>
        </div>

        <div className="flex items-center gap-1.5 ml-auto">
          <button    onClick={() => setShowNotifications(true)} className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600 relative">
            <FiBell size={16} />
            <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
          </button>
          <button   onClick={() => setShowMessages(true)} className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600">
            <FiMail size={16} />
          </button>
          <button className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600">
            <FiSun size={16} />
          </button>
          <div className="flex items-center gap-2 ml-1 pl-2 py-2 border-l border-gray-200">
            <div className="hidden sm:block leading-tight">
              <p className="text-xs sm:text-sm font-semibold text-gray-800">
                Arjun Soni
              </p>
              <p className="text-gray-400 text-xs sm:text-sm">
                Exporter go plan
              </p>
            </div>
            <div className=" h-8 w-8 sm:w-10 sm:h-10 bg-teal-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              A
            </div>
          </div>
        </div>
      </header>

      <aside
        className={`
          fixed lg:sticky top-14 bottom-0 lg:top-16   left-0  z-20 w-60  
           bg-white text-white flex flex-col sm:h-[calc(104vh-5rem)]  h-[calc(105vh-5rem)]
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 flex-shrink-0
        `}
      >
        <nav className="flex-1 overflow-y-auto py-3  bg-gray-900 pr-2">
          {sidebarSections.map((section) => (
            <div key={section.title} className="  ">
              <p
                onClick={() => {
                  if (section.items.length === 0) {
                    setActiveTab(section.title);
                  }
                }}
                className={`px-4 py-2 text-[0.7rem] font-normal cursor-pointer uppercase tracking-widest
                    ${section.items.length === 0 && activeTab === "Dashboard" ? " bg-teal-500 rounded-r-lg text-white" : "text-white hover:bg-teal-500 rounded-r-lg hover:text-white"}
                  `}
              >
                {section.title}
              </p>
              {section.items.map(({ icon: Icon, label, badge, badgeColor }) => (
                <button
                  key={label}
                  className={`w-full   flex items-center gap-2  rounded-r-lg text-xs text-left transition-colors
                    ${
                      activeTab === label
                        ? "bg-teal-500 text-white rounded-r-lg "
                        : "text-[#8aa0bc] hover:bg-teal-500 hover:text-white rounded-r-lg"
                    }`}
                >
                  <div className=" flex gap-3 px-4 py-2">
                    <Icon className="text-base  flex-shrink-0" />
                    <span
                      onClick={() => {
                        setActiveTab(label);
                        setSidebarOpen(false);
                      }}
                      className="flex-1 font-normal text-xs  truncate  "
                    >
                      {label}
                    </span>
                    {badge && (
                      <span
                        className={`${badgeColor} text-white text-[9px] px-1.5 py-0.5 rounded-full font-normal`}
                      >
                        {badge}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          ))}
          <div className="bg-[##152A4E] rounded-xl p-4 text-white flex flex-col">
            <h3 className="text-sm font-semibold mb-4">AI Queries Left</h3>

            {/* <div className="flex-1 flex items-center justify-center rounded-lg bg-[#15253d] min-h-[100px]">
              <img
                src={"/ai-query-placeholder.png"}
                alt="AI Queries"
                className=" object-contain"
              />
            </div> */}

            <div className="text-center mt-4">
              <p className="text-lg font-bold">42 / 100</p>
              <p className="text-xs text-slate-300 mt-1">
                Monthly Queries Remaining
              </p>
            </div>

            <button
              onClick={() => setActiveTab("UpgradePlan")}
              className="mt-4 bg-teal-500 hover:bg-teal-600 text-white text-xs font-semibold py-2 rounded-lg"
            >
              Upgrade Plan
            </button>
          </div>
        </nav>
      </aside>

      <main className=" w-full overflow-auto  ">
        {activeTab === "Dashboard" && (
          <div
            className="relative flex-1 flex flex-col min-w-0 pb-5 pt-20  overflow-y-auto"
            style={{
              backgroundColor: C.bg,
              color: C.onSurface,
              fontFamily: "sans-serif",
            }}
          >
            <div className="px-5 pb-4">
              <section className="space-y-1">
                <h1 className="text-lg font-semibold text-black">
                  Welcome back, Arjun!
                </h1>
                <p className="text-xs font-normal text-[#A2AABF]">
                  Here's what's happening with your trade operations today.
                </p>
              </section>{" "}
            </div>

            <div className="flex xl:flex-row flex-col sm:gap-0 gap-4  ">
              <div className="flex flex-col gap-5  px-4 ">
                <div className="max-w-7xl w-full ">
                  <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4  w-full gap-4 pb-4 ">
                    {statCards.map((card) => (
                      <StatCard key={card.label} {...card} />
                    ))}
                  </section>

                  <div className="flex lg:flex-row flex-col gap-5 ">
                    <div className="lg:max-w-2xl flex flex-col gap-4 justify-start ">
                      <section
                        className="p-4 rounded-xl border relative overflow-hidden  "
                        style={{
                          backgroundColor: C.scLowest,
                          borderColor: C.outlineVariant,
                        }}
                      >
                        <div className="flex justify-between items-center mb-4   ">
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h2 className="text-sm  font-semibold">
                                AI CargoMate Assistant
                              </h2>
                              <span className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase text-white">
                                Core Module
                              </span>
                            </div>
                            <p className="text-xs font-normal text-[#64748B] mt-0.5">
                              Your AI trade assistant for smarter decisions
                            </p>
                          </div>
                          <div className="hidden sm:flex items-center gap-1 text-[#94A3B8] text-[10px]">
                            <MdBolt size={14} />
                            Powered by AI
                          </div>
                        </div>

                        <div className="relative flex items-center mb-4 ">
                          <input
                            className="w-full h-10 pl-3 pr-10 rounded-lg border focus:outline-none focus:ring-2 text-sm"
                            style={{
                              borderColor: C.outlineVariant,
                              backgroundColor: C.scLowest,
                              color: C.onSurface,
                            }}
                            placeholder="Ask anything about HS code, freight, incentives..."
                            type="text"
                          />
                          <button
                            className="absolute right-1 w-8 h-8 rounded-lg flex items-center justify-center text-white"
                            style={{ backgroundColor: C.primary }}
                          >
                            <MdDoubleArrow size={20} />
                          </button>
                        </div>

                        <div className="flex lg:flex-row w-full justify-center  sm:justify-between items-center gap-2 sm:gap-x-4">
                          <div className="">
                            <div>
                              <span className="text-[#94A3B8] text-sm">
                                {" "}
                                Try asking{" "}
                              </span>{" "}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-4 ">
                              <button
                                className="flex items-center gap-4 p-2 w-full rounded-lg text-left border transition-colors hover:opacity-80"
                                style={{
                                  backgroundColor: C.scLowest,
                                  borderColor: C.outlineVariant,
                                }}
                              >
                                <MdBolt
                                  size={22}
                                  style={{ color: C.primary }}
                                />
                                <span className="text-sm">
                                  Best shipment mode for UAE
                                </span>
                              </button>
                              <button
                                className="flex items-center gap-4 p-2 rounded-lg text-left border transition-colors hover:opacity-80"
                                style={{
                                  backgroundColor: C.scLowest,
                                  borderColor: C.outlineVariant,
                                }}
                              >
                                <MdCheckroom
                                  size={22}
                                  style={{ color: C.primary }}
                                />
                                <span
                                  className="text-sm"
                                  style={{ color: C.onSurface }}
                                >
                                  HS code for cotton t-shirt
                                </span>
                              </button>

                              <button
                                className="flex items-center gap-4 p-2 rounded-lg text-left border transition-colors hover:opacity-80"
                                style={{
                                  backgroundColor: C.scLowest,
                                  borderColor: C.outlineVariant,
                                }}
                              >
                                <MdBolt
                                  size={22}
                                  style={{ color: C.primary }}
                                />
                                <span className="text-sm">
                                  RoDTEP benefit for textiles
                                </span>
                              </button>

                              <button
                                className="flex items-center gap-4 p-2 rounded-lg text-left border transition-colors hover:opacity-80"
                                style={{
                                  backgroundColor: C.scLowest,
                                  borderColor: C.outlineVariant,
                                }}
                              >
                                <MdBolt
                                  size={22}
                                  style={{ color: C.primary }}
                                />
                                <span className="text-sm">
                                  Sea vs Air cost for 500kg
                                </span>
                              </button>
                            </div>
                          </div>

                          <div className="hidden md:block">
                            <img src={robot} />
                          </div>
                        </div>
                        <div className="flex sm:flex-row flex-col gap-4 items-center justify-between ">
                          <div className="flex flex-col text-[#64748B] font-normal">
                            <span className="text-[10px]">
                              ⓘ Data Sources: DGFT, ICEGATE, Shipping Lines,
                              Customs, Trade APIs
                            </span>
                            <span className="text-[10px]">
                              ⓘ Disclaimer: AI results are for reference only.
                              Please verify before making decisions.
                            </span>
                          </div>
                          <div className="">
                            <button className="w-full  text-xs bg-[#00A896] px-4 py-3 rounded-lg text font-bold  text-white active:scale-95 transition-transform">
                              Create Shipment from this Result
                            </button>
                          </div>
                        </div>
                      </section>

                      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <DetailCard title="HS Code Lookup" tag="HS CODE">
                          <div className="flex flex-col justify-around ">
                            <div className="flex items-center gap-2 text-lg font-bold mb-1">
                              6109.10.00
                              <MdHelp size={18} />
                            </div>
                            <p className="text-[9px] italic mb-4">
                              T-shirts, singlets and other vests, of cotton
                            </p>
                            <div className="grid grid-cols-2 gap-2 mb-4">
                              <div>
                                <div className="text-[8px] uppercase">
                                  IGST Rate
                                </div>
                                <div className="font-bold text-sm">12%</div>
                              </div>
                              <div>
                                <div className="text-[8px] uppercase">
                                  Customs Duty
                                </div>
                                <div className="font-bold text-sm">10%</div>
                              </div>
                            </div>
                          </div>
                        </DetailCard>

                        <DetailCard
                          title="Incentive Checker"
                          tag="TOTAL INCENTIVE"
                        >
                          <div className="text-xl font-bold mb-4">₹8,420</div>
                          <div className="space-y-2 mb-4">
                            {[
                              { label: "RoDTEP", val: "3,420" },
                              { label: "MEIS", val: "5,000" },
                              { label: "State Incentive", val: "-" },
                            ].map(({ label, val }) => (
                              <div
                                key={label}
                                className="flex justify-between text-xs text-[#64748B]"
                              >
                                <span>{label}</span>
                                <span className="font-bold">{val}</span>
                              </div>
                            ))}
                          </div>
                        </DetailCard>

                        <DetailCard title="Freight Calculator" tag="ROUTE">
                          <div className="mb-2">
                            <div className="text-sm font-bold flex items-center gap-2">
                              Mumbai <MdTrendingFlat size={18} /> Dubai
                            </div>
                            <div className="text-[10px] uppercase mt-1 text-[#94A3B8]">
                              MODE
                            </div>
                            <div className="font-bold text-sm">
                              Sea Freight (FCL)
                            </div>
                          </div>
                          <div className="text-[10px] uppercase mb-1 text-[#94A3B8] ">
                            EST. FREIGHT
                          </div>
                          <div className="text-lg font-bold mb-4">₹24,860</div>
                        </DetailCard>
                      </section>
                    </div>

                    <div className="grid  grid-cols-1 sm:grid-cols-3 lg:grid-cols-1  lg:max-w-lg gap-4   h-full  ">
                      <section
                        className="p-4 rounded-xl border shadow-sm  "
                        style={{
                          backgroundColor: C.scLowest,
                          borderColor: C.outlineVariant,
                        }}
                      >
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-sm  font-semibold">
                            Shipment Overview
                          </h3>
                          <button
                            className="text-[10px] font-bold uppercase"
                            style={{ color: C.primary }}
                          >
                            View All
                          </button>
                        </div>
                        <div className="flex flex-col xl:flex-row items-center  gap-6 ">
                          <div
                            className="relative flex-shrink-0"
                            style={{
                              width: 120,
                              height: 120,
                              borderRadius: "50%",
                              background: `conic-gradient(${C.secondary} 0% 44%, ${C.error} 44% 61%, ${C.tertiaryContainer} 61% 83%, ${C.primary} 83% 100%)`,
                            }}
                          >
                            <div
                              className="absolute flex flex-col items-center justify-center"
                              style={{
                                top: "20%",
                                left: "20%",
                                width: "60%",
                                height: "60%",
                                backgroundColor: C.scLowest,
                                borderRadius: "50%",
                                zIndex: 1,
                              }}
                            >
                              <span
                                className="text-2xl font-bold leading-none"
                                style={{ color: C.onSurface }}
                              >
                                18
                              </span>
                              <span
                                className="text-[10px] uppercase"
                                style={{ color: C.onSurfaceVariant }}
                              >
                                Total
                              </span>
                            </div>
                          </div>
                          <div className="flex-1 w-full max-w-sm  space-y-2">
                            {[
                              {
                                dot: C.secondary,
                                label: "In Transit",
                                val: "8 (44%)",
                              },
                              {
                                dot: C.error,
                                label: "Delayed",
                                val: "3 (17%)",
                              },
                              {
                                dot: C.tertiaryContainer,
                                label: "Pending",
                                val: "4 (22%)",
                              },
                              {
                                dot: C.primary,
                                label: "Delivered",
                                val: "3 (17%)",
                              },
                            ].map(({ dot, label, val }) => (
                              <div
                                key={label}
                                className="flex justify-between items-center"
                              >
                                <div className="flex items-center gap-2">
                                  <span className="w-2 h-2 rounded-full" />
                                  <span className="text-xs text-[#1E293B] font-medium">
                                    {label}
                                  </span>
                                </div>
                                <span
                                  className="text-sm"
                                  style={{ color: C.onSurfaceVariant }}
                                >
                                  {val}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </section>

                      <section
                        className="p-4 rounded-xl border shadow-sm  "
                        style={{
                          backgroundColor: C.scLowest,
                          borderColor: C.outlineVariant,
                        }}
                      >
                        <h3 className="text-sm  font-semibold mb-4">
                          Quick Actions
                        </h3>
                        <div className="grid lg:grid-cols-3 grid-cols-2 gap-10 sm:gap-4 ">
                           <button
                                  className="flex flex-col items-center gap-1 group"
                                  style={{ backgroundColor: "#F0FDFA" }}
                                >
                                  <div onClick={() => {
                                    setShipment('shipment')
                                     setActiveTab("")
                                  }
                                  } className="w-full  aspect-square rounded-xl flex  flex-col items-center justify-center transition-colors">
                                  <MdAdd size={24} style={{ color: "#00A896" }} />
                                    <span className="text-[10px] text-center font-bold px-2 py-1 rounded-md">
                                      Create Shipment
                                    </span>
                                  </div>
                                </button>
                            
                          {quickActions.map((action) => (
                            <QuickActionBtn key={action.label} {...action} />
                          ))}
                        </div>
                      </section>

                      <section
                        className="p-4 rounded-xl h-full border shadow-sm flex flex-col gap-4"
                        style={{
                          backgroundColor: C.scLowest,
                          borderColor: C.outlineVariant,
                        }}
                      >
                        <h3 className="text-sm  font-bold mb-4">
                          System Status
                        </h3>
                        <div className="space-y-1">
                          {[
                            {
                              icon: MdStorage,
                              label: "Database Connection",
                              val: "Connected",
                              valColor: C.primary,
                            },
                            {
                              icon: MdApi,
                              label: "API Services",
                              val: "Operational",
                              valColor: C.primary,
                            },
                            {
                              icon: MdSync,
                              label: "Last Data Sync",
                              val: "24 Apr 2025, 09:30 AM",
                              valColor: C.onSurfaceVariant,
                            },
                          ].map(({ icon: Icon, label, val, valColor }) => (
                            <div
                              key={label}
                              className="flex justify-between items-center"
                            >
                              <div
                                className="flex items-center gap-2"
                                style={{ color: C.onSurfaceVariant }}
                              >
                                <Icon className="text-xs" />
                                <span className="text-xs text-[#64748B]">
                                  {label}
                                </span>
                              </div>
                              <span className="font-bold text-xs text-[#10B981]">
                                {val}
                              </span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-2 pt-1 flex items-center justify-center gap-2 text-xs font-bold text-[#10B981]">
                          All modules are connected to live backend.
                        </div>
                      </section>
                    </div>
                  </div>
                </div>

                <section
                  className="rounded-xl border shadow-sm overflow-hidden"
                  style={{
                    backgroundColor: C.scLowest,
                    borderColor: C.outlineVariant,
                  }}
                >
                  <div
                    className="p-4 flex justify-between items-center border-b"
                    style={{ borderColor: C.outlineVariant }}
                  >
                    <h3 className="text-sm lg:text-lg  font-bold">
                      Recent Shipments
                    </h3>
                    <button
                      className="text-[10px] font-bold uppercase"
                      style={{ color: C.primary }}
                    >
                      View All
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[700px]">
                      <thead>
                        <tr style={{ backgroundColor: C.scLow }}>
                          {[
                            "Shipment ID",
                            "Route",
                            "Status",
                            "ETA",
                            "Mode",
                            "Vendor",
                            "Amount",
                          ].map((h) => (
                            <th
                              key={h}
                              className="px-4 py-2 text-sm  font-semibold"
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {shipments.map((s) => (
                          <tr
                            key={s.id}
                            className="border-t transition-colors hover:opacity-90"
                          >
                            <td className="px-4 py-3 font-normal text-sm">
                              {s.id}
                            </td>
                            <td className="px-4 py-3 text-sm">{s.route}</td>
                            <td className="px-4 py-3">
                              <span
                                className="px-2 py-1 rounded text-xs  "
                                style={{
                                  backgroundColor: s.statusBg,
                                  color: s.statusColor,
                                }}
                              >
                                {s.status}
                              </span>
                            </td>
                            <td
                              className="px-4 py-3 text-sm"
                              style={{ color: C.onSurface }}
                            >
                              {s.eta}
                            </td>
                            <td
                              className="px-4 py-3 text-sm"
                              style={{ color: C.onSurface }}
                            >
                              {s.mode}
                            </td>
                            <td
                              className="px-4 py-3 text-sm"
                              style={{ color: C.onSurface }}
                            >
                              {s.vendor}
                            </td>
                            <td
                              className="px-4 py-3 font-normal text-sm"
                              style={{ color: C.onSurface }}
                            >
                              {s.amount}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              </div>

              <div className="flex  flex-col sm:flex-col md:flex-row  xl:flex-col gap-4 h-full items-start p-4 xl:p-0 ">
                <section
                  className="lg:col-span-3 p-4 rounded-xl border shadow-sm w-full "
                  style={{
                    backgroundColor: C.scLowest,
                    borderColor: C.outlineVariant,
                  }}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3
                      className="text-base font-semibold"
                      style={{ color: C.onSurface }}
                    >
                      Recent Activity & History
                    </h3>
                    <button className="text-[10px] font-bold uppercase text-[#00A896]">
                      View All
                    </button>
                  </div>

                  <div className="lg:space-y-2 xl:space-y-4  grid xl:grid-cols-1 grid-cols-1 
                   items-center mx-auto  sm:grid-cols-2  gap-5">
                    <ActivityItem
                      dotColor={C.primary}
                      iconBg={C.scHigh}
                      icon={MdPsychology}
                      iconColor={C.primary}
                      title="AI Query"
                      subtitle="Best Shipment mode for UAE"
                      time="24 Apr 2025, 09:42 AM"
                      tag="Report Generated"
                    />
                    <ActivityItem
                      dotColor={C.outlineVariant}
                      iconBg={C.secondaryFixed}
                      icon={MdDescription}
                      iconColor={C.secondary}
                      title="Report Generated"
                      time="24 Apr 2025, 09:40 AM"
                      tag="Report Generated"
                    />
                    <ActivityItem
                      dotColor={C.outlineVariant}
                      iconBg={C.tertiaryFixed}
                      icon={MdQrCode2}
                      iconColor={C.tertiary}
                      title="HS Code Lookup"
                      subtitle="6109.10.00"
                      time="24 Apr 2025, 08:40 AM"
                      tag="Report Generated"
                    />
                    <ActivityItem
                      dotColor={C.outlineVariant}
                      iconBg={"#FCE7F3"}
                      icon={checker}
                      iconColor={"C.tertiary"}
                      title="Incentive Checker"
                      subtitle="MEIS check done"
                      time="24 Apr 2025, 08:40 AM"
                      tag="Report Generated"
                    />
                    <ActivityItem
                      dotColor={C.outlineVariant}
                      iconBg={"#D0FAE5"}
                      icon={calculator}
                      iconColor={C.tertiary}
                      title="Frieght Calculator"
                      subtitle="Mumbai -> dubai"
                      time="24 Apr 2025, 08:40 AM"
                      tag="Report Generated"
                    />
                    <ActivityItem
                      dotColor={C.outlineVariant}
                      iconBg={"#D0FAE5"}
                      icon={shipment}
                      iconColor={C.tertiary}
                      title="Shipment created"
                      subtitle="ASD-2025-104"
                      time="24 Apr 2025, 08:40 AM"
                      tag="Report Generated"
                    />
                  </div>
                  <div className="mt-4 text-center">
                    <button className="text-xs font-bold underline text-[#2563EB]">
                      View All History & Audit Logs
                    </button>
                  </div>
                </section>

                <section
                  className="p-4 rounded-xl shadow-sm border text-white w-full "
                  style={{
                    backgroundColor: C.scLowest,
                    borderColor: C.outlineVariant,
                  }}
                >
                  <h3 className="text-sm font-bold mb-4 text-black">
                    Why Choose ASD CargoMate?
                  </h3>
                  <ul className="space-y-4">
                    {[
                      "AI-Powered Trade Intelligence",
                      "Real-time Data from Trusted Sources",
                      "Compliant, Secure & Reliable",
                      "Mobile, Tablet & Desktop Ready",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <MdCheckCircle
                          size={20}
                          style={{ color: "#10B981", flexShrink: 0 }}
                        />
                        <span className="text-xs text-[#475569]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </div>

          </div>
        )}

        {activeTab === "AI CargoMate Assistant" && <AiCargoMateAssistant />}

        {activeTab === "HS Code Lookup" && <HSCodeLookup />}
        {activeTab === "Incentive Checker" && <IncentiveChecker />}
        {activeTab === "Shipment Planning" && <ShipmentPlanning />}
        {activeTab === "Freight Calculator" && <FreightCalculator />}

        {activeTab === "Saved Reports" && <SavedReports />}

        {activeTab === "Audit Logs" && <AuditLogs />}
        {activeTab === "Analytics & Trends" && <AnalyticsTrends />}

        {activeTab === "My Shipments" && <MyShipment />}
        {activeTab === "Shipment Tracking" && <ShipmentTracking />}
        {activeTab === "Documents Center" && <DocumentsCenter />}
        {activeTab === "Vendor Recommendations" && <VendorRecommendations />}

        {activeTab === "Subscription" && <Subscription />}
        {activeTab === "Notifications" && <NotificationDashboard />}
        {activeTab === "Help & Support" && <HelpSupportDashboard />}
        {activeTab === "Profile Settings" && <ProfileSettingsDashboard />}

        {activeTab === "UpgradePlan" && <UpgradePlan />}

         {showNotifications && (
        <NotificationsModal onClose={() => setShowNotifications(false)} />
        )}
      {showMessages && <MessagesModal onClose={() => setShowMessages(false)} />}


       {
        shipment === "shipment" && (
          <div>
            <Shipment setActiveTab={setActiveTab} setShipment={setShipment} />
          </div>
        )
       }
      

      </main>
    </div>
  );
}

