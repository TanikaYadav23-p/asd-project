import React, { useState,useEffect,useMemo } from "react";
import ReactCountryFlag from "react-country-flag";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//changes//
import {
  getShipments,
  getDashboard,
  getShipmentStatusOverview,
  getShipmentTracker,
  getShipmentsByMode,
  getTopOriginCountries,
  getRecentAlerts,
  getTopDestinationCountries,
  getFilterOptions,
  getShipmentDetails,
} from "../../api/ShipmentApi";
import {
  CalendarDays,
  Download,
  Plus,
  Search,
  ChevronDown,
  Square,
  RectangleHorizontal,
  CheckCircle2,
  Clover,
  ArrowUpCircle,
  Gem,
  MoreVertical,
  Anchor,
  Plane,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  AlertCircle,
  Info,
  Clock,
  Check,
  MapPin,
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const HEADING = "text-[#07156B]";
import ShipmentForm from "../../components/ShipmentForm";
import RecentHighRiskAlertsModal from "../../components/b2bComponent/RecentHighRisk";
import DateRangeModal from "../../components/b2bComponent/DateRange";
import ExportReport from "../../components/b2bComponent/ExportReport";
const COUNTRY_CODES = {
  China: "CN",
  India: "IN",
  "South Korea": "KR",
  Netherlands: "NL",
  Germany: "DE",
  UAE: "AE",
  USA: "US",
  Japan: "JP",
  Australia: "AU",
  Singapore: "SG",
  Indonesia: "ID",
  Belgium: "BE",
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

function StatusBadge({ status }) {
  const styles = {
    "In Transit": "bg-blue-100 text-blue-600",
    Pending: "bg-amber-100 text-amber-600",
    Delayed: "bg-rose-100 text-rose-600",
    Exception: "bg-purple-100 text-purple-600",
    Delivered: "bg-green-100 text-green-600",
  };
  return <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg whitespace-nowrap ${styles[status]}`}>{status}</span>;
}

 
const TABS = ["All Shipments", "In Transit", "Pending", "Delivered", "Delayed", "Exception"];

/*   const SHIPMENTS = [
  { id: "SHP-2025-1045", bl: "MAEU123456789", origin: "China", originCity: "Shanghai, China", dest: "India", destCity: "Nhava Sheva, India", status: "In Transit", etd: "10 Apr 2025", atd: "11 Apr 2025", eta: "28 Apr 2025", etaNote: "In 4 days", noteColor: "text-blue-500", mode: "Sea", commodity: "Electrical Transformers", hs: "8504", value: "₹12.45 Cr" },
  { id: "SHP-2025-1044", bl: "OOLU765432189", origin: "South Korea", originCity: "Busan, South Korea", dest: "Netherlands", destCity: "Rotterdam, Netherlands", status: "In Transit", etd: "09 Apr 2025", atd: "10 Apr 2025", eta: "02 May 2025", etaNote: "In 8 days", noteColor: "text-blue-500", mode: "Sea", commodity: "Automotive Parts", hs: "8708", value: "₹8.75 Cr" },
  { id: "SHP-2025-1043", bl: "TKCU987654321", origin: "Germany", originCity: "Hamburg, Germany", dest: "UAE", destCity: "Dubai, UAE", status: "Pending", etd: "24 Apr 2025", atd: "—", eta: "05 May 2025", etaNote: "In 11 days", noteColor: "text-blue-500", mode: "Sea", commodity: "Machinery Parts", hs: "8482", value: "₹5.32 Cr" },
  { id: "SHP-2025-1042", bl: "MEDU456789123", origin: "USA", originCity: "Los Angeles, USA", dest: "India", destCity: "Mumbai, India", status: "Delayed", etd: "05 Apr 2025", atd: "06 Apr 2025", eta: "26 Apr 2025", etaNote: "Delayed", noteColor: "text-rose-500", mode: "Sea", commodity: "Plastic Raw Materials", hs: "3901", value: "₹3.15 Cr" },
  { id: "SHP-2025-1041", bl: "AIR897654123", origin: "Germany", originCity: "Frankfurt, Germany", dest: "India", destCity: "Bengaluru, India", status: "In Transit", etd: "12 Apr 2025", atd: "13 Apr 2025", eta: "24 Apr 2025", etaNote: "Arriving today", noteColor: "text-emerald-500", mode: "Air", commodity: "Medical Devices", hs: "9018", value: "₹4.60 Cr" },
  { id: "SHP-2025-1040", bl: "SUDU112233445", origin: "Singapore", originCity: "Singapore, Singapore", dest: "Indonesia", destCity: "Jakarta, Indonesia", status: "In Transit", etd: "11 Apr 2025", atd: "11 Apr 2025", eta: "23 Apr 2025", etaNote: "Arrived", noteColor: "text-emerald-500", mode: "Sea", commodity: "Electronic Components", hs: "8535", value: "₹2.28 Cr" },
  { id: "SHP-2025-1039", bl: "ONEYS54433221", origin: "Japan", originCity: "Tokyo, Japan", dest: "Australia", destCity: "Sydney, Australia", status: "Exception", etd: "08 Apr 2025", atd: "09 Apr 2025", eta: "—", etaNote: "", noteColor: "", mode: "Sea", commodity: "Textile Yarn", hs: "5205", value: "₹1.75 Cr" },
  { id: "SHP-2025-1038", bl: "MAEU998877665", origin: "Belgium", originCity: "Antwerp, Belgium", dest: "India", destCity: "Chennai, India", status: "Delivered", etd: "28 Mar 2025", atd: "29 Mar 2025", eta: "08 Apr 2025", etaNote: "Delivered", noteColor: "text-emerald-500", mode: "Sea", commodity: "Chemicals", hs: "2905", value: "₹6.10 Cr" },
]; 

const STATUS_OVERVIEW = [
  { name: "In Transit", value: 642, percent: "51.6%", color: "#6366F1" },
  { name: "Delivered", value: 523, percent: "42.0%", color: "#10B981" },
  { name: "Pending", value: 98, percent: "7.7%", color: "#F59E0B" },
  { name: "Delayed", value: 58, percent: "4.7%", color: "#EF4444" },
  { name: "Exception", value: 22, percent: "1.8%", color: "#A855F7" },
];*/
/*const TOP_DESTINATIONS = [
  { country: "India", value: "512", percent: "41.1%", width: "100%" },
  { country: "Netherlands", value: "180", percent: "14.5%", width: "36%" },
  { country: "UAE", value: "150", percent: "12.0%", width: "30%" },
  { country: "USA", value: "130", percent: "10.4%", width: "26%" },
  { country: "Australia", value: "95", percent: "7.6%", width: "19%" },
];*/
/*
const SHIPMENTS_BY_MODE = [
  { name: "Sea", value: 892, percent: "71.7%", color: "#6366F1" },
  { name: "Air", value: 218, percent: "17.5%", color: "#10B981" },
  { name: "Road", value: 98, percent: "7.9%", color: "#F59E0B" },
  { name: "Rail", value: 37, percent: "3.0%", color: "#A855F7" },
]; */

/*const TOP_ORIGINS = [
  { country: "China", value: "420", percent: "33.7%", width: "100%" },
  { country: "Germany", value: "210", percent: "16.9%", width: "50%" },
  { country: "USA", value: "165", percent: "13.3%", width: "39%" },
  { country: "South Korea", value: "120", percent: "9.6%", width: "29%" },
  { country: "Singapore", value: "98", percent: "7.9%", width: "23%" },
];*/

/*const RECENT_ALERTS = [
  { icon: AlertTriangle, color: "text-orange-500", bg: "bg-orange-50", text: "Delay expected for SHP-2025-1042.", sub: "ETA updated to 26 Apr 2025.", time: "1h ago" },
  { icon: AlertTriangle, color: "text-orange-500", bg: "bg-orange-50", text: "Customs clearance delayed for SHP-2025-1039.", sub: "Additional documents required.", time: "3h ago" },
  { icon: Clock, color: "text-blue-500", bg: "bg-blue-50", text: "Shipment SHP-2025-1041 arriving today.", sub: "ETA 24 Apr 2025.", time: "5h ago" },
  { icon: Check, color: "text-emerald-500", bg: "bg-emerald-50", text: "Shipment SHP-2025-1038 delivered.", sub: "Delivered on 08 Apr 2025.", time: "1d ago" },
];*/

function SectionCard({ children, className = "" }) {
  return (
    <div className={`bg-white border border-slate-100 rounded-2xl p-4 shadow-xs ${className}`}>
      {children}
    </div>
  );
}

function DropdownButton({ text, onClick }) {
  return (
    <button   onClick={onClick} className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg px-2 py-1 text-[10px] font-semibold text-slate-600 shrink-0">
      {text} <ChevronDown size={11} className="text-slate-400" />
    </button>
  );
}

export default function Shipment({setActiveTab:setParentTab, activeTab:parentTab, currectTab}) {
  const [activeTab, setActiveTab] = useState("All Shipments");
  //changes//
  const [dashboard, setDashboard] = useState({});
  const [shipments, setShipments] = useState([]);
  const [statusOverview, setStatusOverview] = useState([]);
  const [shipmentModes, setShipmentModes] = useState([]);
  const [originCountries, setOriginCountries] = useState([]);
  const [shipmentTracker, setShipmentTracker] = useState(null);
  const [destinationCountries, setDestinationCountries] = useState([]);
  const [recentAlerts, setRecentAlerts] = useState([]);
  const [filters, setFilters] = useState({status: ["All Status", "Active", "Inactive" , "Pending", "Approved", "Completed","Expired", "Draft", "Under Review"], origins: ["India", "USA" , "China"], destinations: ["India", "USA" , "China"], modes: ["Sea freight", "Air Freight", "Rail Freight", "Road Freight", "Multimodal", "Express"],});
  const [loading, setLoading] = useState(false);
  const [shipment, setShipment] = useState("")
  const [highRisk, setHighRisk] = useState(false)
    const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null)
  const [shipmentStartDate, setShipmentStartDate] = useState(null);
  const [shipmentEndDate, setShipmentEndDate] = useState(null);
   const [dateRange, setDateRange] = useState(false)
   const [exportReport, setExportReport] = useState(false)

   const [searchQuery, setSearchQuery] = useState("");
const [selectedStatus, setSelectedStatus] = useState("");
const [selectedOrigin, setSelectedOrigin] = useState("");
const [selectedDestination, setSelectedDestination] = useState("");
const [selectedMode, setSelectedMode] = useState("");

const [appliedFilters, setAppliedFilters] = useState({
  search: "",
  status: "",
  origin: "",
  destination: "",
  mode: "",
  startDate: null,
  endDate: null,
});
  const fetchShipments = async () => {
  try {
    setLoading(true);

    const res = await getShipments();

    console.log("Shipment Response", res.data);

    setShipments(res.data.data || []);
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};

const fetchDashboard = async () => {
  try {
    const res = await getDashboard();

    console.log("Dashboard Response", res.data);

    setDashboard(res.data.data);
  } catch (err) {
    console.log(err);
  }
};

const fetchStatusOverview = async () => {
  try {
    const res = await getShipmentStatusOverview();

    setStatusOverview(res.data.data || []);
  } catch (error) {
    console.error(error);
  }
};

const fetchShipmentModes = async () => {
  try {
    const res = await getShipmentsByMode();
    setShipmentModes(res.data.data || []);
  } catch (error) {
    console.error(error);
  }
};

const fetchTopOriginCountries = async () => {
  try {
    const res = await getTopOriginCountries();
    setOriginCountries(res.data.data || []);
  } catch (error) {
    console.error(error);
  }
};

const fetchTopDestinationCountries = async () => {
  try {
    const res = await getTopDestinationCountries();
    setDestinationCountries(res.data.data || []);
  } catch (error) {
    console.error(error);
  }
};

const fetchRecentAlerts = async () => {
  try {
    const res = await getRecentAlerts();
    setRecentAlerts(res.data.data || []);
  } catch (error) {
    console.error(error);
  }
};

const fetchShipmentTracker = async (id) => {
  try {
    const res = await getShipmentTracker(id);
    setShipmentTracker(res.data.data);
  } catch (error) {
    console.error(error);
  }
};

const fetchFilterOptions = async () => {
  try {
    const res = await getFilterOptions();
    setFilters(res.data.data || []);
  } catch (error) {
    console.error(error);
  }
};

const handleApplyFilters = () => {
  setAppliedFilters({
    search: searchQuery,
    status: selectedStatus,
    origin: selectedOrigin,
    destination: selectedDestination,
    mode: selectedMode,
    startDate: startDate,
    endDate: endDate,
  });
};
const handleResetFilters = () => {
  setSearchQuery("");
  setSelectedStatus("");
  setSelectedOrigin("");
  setSelectedDestination("");
  setSelectedMode("");
  setStartDate(null);
  setEndDate(null);

  setAppliedFilters({
    search: "",
    status: "",
    origin: "",
    destination: "",
    mode: "",
    startDate: null,
    endDate: null,
  });
};
const filteredShipments = useMemo(() => {
  return shipments.filter((s) => {
    const shipmentId =
      s.referenceNumber ||
      s.sbNumber ||
      "";

    const awbNumber =
      s.additionalInformation?.awbNumber ||
      "";

    const product =
      s.cargo?.productName ||
      "";

    const hsCode =
      s.cargo?.hsCode?.hsCode ||
      "";

    const status =
      s.status ||
      s.shipmentStatus ||
      "";

    const origin =
      s.route?.origin ||
      s.route?.originCountry ||
      "";

    const destination =
      s.route?.destination ||
      s.route?.destinationCountry ||
      "";

    const mode =
      s.route?.mode ||
      "";

    const shipmentDate = s.shipmentDate
      ? new Date(s.shipmentDate)
      : null;

    const searchText = `
      ${shipmentId}
      ${awbNumber}
      ${product}
      ${hsCode}
      ${origin}
      ${destination}
    `.toLowerCase();

    // Search
    if (
      appliedFilters.search &&
      !searchText.includes(
        appliedFilters.search.toLowerCase()
      )
    ) {
      return false;
    }

    // Status
    if (
      appliedFilters.status &&
      status !== appliedFilters.status
    ) {
      return false;
    }

    // Origin
    if (
      appliedFilters.origin &&
      origin !== appliedFilters.origin
    ) {
      return false;
    }

    // Destination
    if (
      appliedFilters.destination &&
      destination !== appliedFilters.destination
    ) {
      return false;
    }

    // Mode
    if (
      appliedFilters.mode &&
      mode !== appliedFilters.mode
    ) {
      return false;
    }

    // Date range
    if (
      appliedFilters.startDate &&
      shipmentDate < new Date(
        new Date(appliedFilters.startDate).setHours(0, 0, 0, 0)
      )
    ) {
      return false;
    }

    if (
      appliedFilters.endDate &&
      shipmentDate > new Date(
        new Date(appliedFilters.endDate).setHours(23, 59, 59, 999)
      )
    ) {
      return false;
    }

    return true;
  });
}, [shipments, appliedFilters]);
const KPI_STATS = [
  { title: "Total Shipments", value: dashboard.totalShipments || 0, change: "▲ 16.8% vs last month", icon: Square, bg: "bg-blue-50", color: "text-blue-500", up: true },
  { title: "In Transit", value: dashboard.inTransit || 0, change: "▲ 5.4% vs last month", icon: RectangleHorizontal, bg: "bg-blue-50", color: "text-blue-500", up: true },
  { title: "Delivered", value: dashboard.delivered || 0, change: "▲ 22.6% vs last month", icon: CheckCircle2, bg: "bg-emerald-50", color: "text-emerald-500", up: true },
  { title: "Delayed", value: dashboard.delayed || 0, change: "▼ 12.5% vs last month", icon: Clover, bg: "bg-rose-50", color: "text-rose-500", up: false },
  { title: "Exception", value: dashboard.exception || 0, change: "▼ 4.3% vs last month", icon: ArrowUpCircle, bg: "bg-rose-50", color: "text-rose-500", up: false },
  { title: "Total Shipment Value (INR)", value: `₹${(dashboard.shipmentValue / 10000000).toFixed(2)} Cr`, change: "▲ 16.7% vs last month", icon: Gem, bg: "bg-purple-50", color: "text-purple-500", up: true },
];

const STATUS_OVERVIEW = statusOverview.map((item) => ({
  name: item._id,
  value: item.count,
   percent:
    dashboard.totalShipments > 0
      ? ((item.count / dashboard.totalShipments) * 100).toFixed(1) + "%"
      : "0%",
  color:
    item._id === "In Transit"
      ? "#6366F1"
      : item._id === "Delivered"
      ? "#10B981"
      : item._id === "Pending"
      ? "#F59E0B"
      : item._id === "Delayed"
      ? "#EF4444"
      : "#A855F7",
}));

const TOP_DESTINATIONS = destinationCountries.map((item) => ({
  country: item._id,
  value: item.shipments,
  percent:
    dashboard.totalShipments > 0
      ? ((item.shipments / dashboard.totalShipments) * 100).toFixed(1) + "%"
      : "0%",
  width:
    dashboard.totalShipments > 0
      ? `${((item.shipments / dashboard.totalShipments) * 100).toFixed(1)}%`
      : "0%",
}));

const SHIPMENTS_BY_MODE = shipmentModes.map((item) => ({
  name: item._id,
  value: item.count,
   percent:
    dashboard.totalShipments > 0
      ? ((item.count / dashboard.totalShipments) * 100).toFixed(1) + "%"
      : "0%",
  color:
    item._id === "Sea"
      ? "#6366F1"
      : item._id === "Air"
      ? "#10B981"
      : item._id === "Road"
      ? "#F59E0B"
      : "#A855F7",
}));

const TOP_ORIGINS = originCountries.map((item) => ({
  country: item._id,
  value: item.shipments,
  percent:
    dashboard.totalShipments > 0
      ? ((item.shipments / dashboard.totalShipments) * 100).toFixed(1) + "%"
      : "0%",
  width:
    dashboard.totalShipments > 0
      ? `${(item.shipments / dashboard.totalShipments) * 100}%`
      : "0%",
}));
/*const RECENT_ALERTS = recentAlerts.map((item) => ({
  icon: AlertTriangle,
   color:
    item.type === "Critical"
      ? "text-red-500"
      : item.type === "Warning"
      ? "text-orange-500"
      : "text-blue-500",
   bg:
    item.type === "Critical"
      ? "bg-red-50"
      : item.type === "Warning"
      ? "bg-orange-50"
      : "bg-blue-50",
   text: item.title,
   sub: item.message,
   time: new Date(item.createdAt).toLocaleTimeString(),
}));*/

const TRACKER_STEPS = shipmentTracker?.statusHistory?.map((item) => ({label: item.status, date: item.updatedAt ? new Date(item.updatedAt).toLocaleDateString() : "-", done: true,})) || [];

useEffect(() => {
  fetchShipments();
  fetchDashboard();
  fetchStatusOverview();
  fetchShipmentModes();
  fetchTopOriginCountries();
  fetchTopDestinationCountries();
  fetchRecentAlerts();
  fetchFilterOptions();
}, []);

useEffect(() => {
  if (shipments.length > 0) {
    fetchShipmentTracker(shipments[0]._id);
  }
}, [shipments]);

  return (
    <div className="min-h-screen w-full overflow-y-auto bg-[#F8FAFC] text-slate-600 font-sans antialiased pt-5">
  {!shipment && ( <div className="max-w-[1500px] mx-auto p-3 sm:p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-4">
          <div>
            <h1 className={`text-xl sm:text-2xl font-bold tracking-tight ${HEADING}`}>Shipment</h1>
            <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">
              Track, manage and analyze your global shipments in real-time.
            </p>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto flex-wrap">
            {/* <button className={`flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border border-slate-200 text-[11px] sm:text-xs font-semibold px-3 sm:px-4 py-2 rounded-xl shadow-xs hover:bg-slate-50 transition whitespace-nowrap ${HEADING}`}>
              <CalendarDays size={14} className="text-slate-400" />
              01 Apr 2025 - 24 Apr 2025
            </button> */}
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
            <button  onClick={() => {
              //  console.log("heelo")
                setShipment("shipment")
                  
              }} className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-[11px] sm:text-xs font-semibold px-3 sm:px-4 py-2 rounded-xl text-white shadow-xs transition whitespace-nowrap">
              <Plus size={14} />
              Shipment
            </button>
          </div>
        </div>

        {/*<div className="border-b border-slate-200 mb-5">
          <div className="flex gap-5 sm:gap-7 overflow-x-auto scrollbar-none">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2.5 text-xs sm:text-sm font-bold whitespace-nowrap transition-colors relative ${
                  activeTab === tab ? "text-blue-600" : "text-[#081B6B] hover:text-slate-700"
                }`}
              >
                {tab}
                {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-600 rounded-full" />}
              </button>
            ))}
          </div>
        </div>*/}

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-5">
          {KPI_STATS.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="bg-white border border-slate-100 p-3 sm:p-3.5 rounded-2xl shadow-xs flex flex-col justify-between hover:shadow-md transition duration-200">
                <div className="flex justify-between items-start gap-2">
                  <span className={`text-[10px] sm:text-[13px] font-bold leading-tight ${HEADING}`}>{stat.title}</span>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${stat.bg} ${stat.color}`}>
                    <Icon size={15} />
                  </div>
                </div>
                <div className="mt-2.5">
                  <h4 className={`text-sm sm:text-base font-extrabold tracking-tight ${HEADING}`}>{stat.value}</h4>
                  <span className={`text-[9px] font-bold block mt-0.5 ${stat.up ? "text-green-500" : "text-rose-500"}`}>
                    {stat.change}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <SectionCard className="mb-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-3 items-end">
            <div>
              <label className="text-[10px] text-[#081B6B] font-bold block mb-1.5 uppercase">Search Shipment</label>
              <div className="relative">
                <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by B/L, Container, Ref. No."
                  className="w-full bg-slate-50/70 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs focus:outline-none placeholder-slate-400"
                />
                <Search size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </div>
           <div>
          <label className="text-[10px] text-[#081B6B] font-bold block mb-1.5 uppercase">
            Date Range
          </label>

          <div className="relative">
            <DatePicker
              selected={startDate}
              onChange={(dates) => {
                const [start, end] = dates;
                setStartDate(start);
                setEndDate(end);
              }}
              startDate={startDate}
              endDate={endDate}
              selectsRange
              dateFormat="dd MMM yyyy"
              placeholderText="Select Date Range"
              className="w-full bg-slate-50/70 border border-slate-200 rounded-xl py-2 pl-3 pr-9 text-xs focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
            <CalendarDays
              size={13}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
          </div>
        </div>
            <div>
              <label className="text-[10px] text-[#081B6B] font-bold block mb-1.5 uppercase">Shipment Status</label>
              <div className="relative">
                <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} className="w-full bg-slate-50/70 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs appearance-none focus:outline-none">
                  <option value="">All Status</option>
                  {filters.status?.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="text-[10px] text-[#081B6B] font-bold block mb-1.5 uppercase">Origin Country</label>
              <div className="relative">
                <select  value={selectedOrigin} onChange={(e) => setSelectedOrigin(e.target.value)} className="w-full bg-slate-50/70 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs appearance-none focus:outline-none">
                  <option value="">All Countries</option>
                  {filters.origins?.map((country) => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="text-[10px] text-[#081B6B] font-bold block mb-1.5 uppercase">Destination Country</label>
              <div className="relative">
                <select value={selectedDestination} onChange={(e) => setSelectedDestination(e.target.value)} className="w-full bg-slate-50/70 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs appearance-none focus:outline-none">
                  <option value="">All Countries</option>
                  {filters.destinations?.map((country) => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="text-[10px] text-[#081B6B] font-bold block mb-1.5 uppercase">Transport Mode</label>
              <div className="relative">
                <select  value={selectedMode} onChange={(e) => setSelectedMode(e.target.value)} className="w-full bg-slate-50/70 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs appearance-none focus:outline-none">
                  <option value="">All Modes</option>
                  {filters.modes?.map((mode) => (
                    <option key={mode} value={mode}>{mode}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 mt-3">
            <button onClick={handleApplyFilters} className=" flex bg-blue-100 border border-slate-200 text-slate-600 rounded-xl py-2 px-4 text-xs font-semibold hover:bg-slate-100 transition">
              Apply Filters
            </button>
            <button onClick={handleResetFilters} className="  flex-1 text-slate-400 hover:text-slate-600 text-xs font-medium px-1">Reset</button>
          </div>
          </div>
          
        </SectionCard>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-5 mb-5">
          <SectionCard>
            <div className="overflow-x-auto">
              <table className="w-full text-[11px] min-w-[820px]">
                <thead>
                  <tr className="text-[9px] text-[#081B6B] uppercase font-bold border-b border-slate-100">
                    <th className="text-left py-2 pr-2"><input type="checkbox" className="accent-blue-600" /></th>
                    <th className="text-left py-2 font-bold">Shipment / B.L No.</th>
                    <th className="text-left py-2 font-bold">Origin → Destination</th>
                    <th className="text-left py-2 font-bold">Status</th>
                    <th className="text-left py-2 font-bold">ETD / ATD</th>
                    <th className="text-left py-2 font-bold">ETA</th>
                    <th className="text-left py-2 font-bold">Mode</th>
                    <th className="text-left py-2 font-bold">Commodity</th>
                    <th className="text-right py-2 font-bold">Value</th>
                    <th className="text-right py-2 font-bold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredShipments.map((s, i) => (
                    <tr key={i}>
                      <td className="py-3 pr-2"><input type="checkbox" className="accent-blue-600" /></td>
                      <td className="py-3 whitespace-nowrap">
                        <div className={`font-bold ${HEADING}`}>{s.referenceNumber || s.sbNumber}</div>
                        <div className="text-[10px] text-slate-400">{s.additionalInformation?.awbNumber}</div>
                      </td>
                      <td className="py-3 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 font-medium text-slate-600">
                          <Flag country={s.route?.originCountry} /> {s.route?.originCity}
                        </div>
                        <div className="flex items-center gap-1.5 font-medium text-slate-600 mt-0.5">
                          → <Flag country={s.route?.destinationCountry} /> {s.route?.destinationCity}
                        </div>
                      </td>
                      <td className="py-3"><StatusBadge status={s.shipmentStatus} /></td>
                      <td className="py-3 font-medium whitespace-nowrap text-slate-500">
                        <div>{s.etd ? new Date(s.etd).toLocaleDateString() : "-"}</div>
                        <div>{s.atd ? new Date(s.atd).toLocaleDateString() : "-"}</div>
                      </td>
                      <td className="py-3  font-medium whitespace-nowrap text-slate-500">
                        <div>{s.eta ? new Date(s.eta).toLocaleDateString() : "-"}</div>
                        {s.etaNote && <div className={`font-semibold ${s.noteColor}`}>({s.etaNote})</div>}
                      </td>
                      <td className="py-3">
                        {s.route?.mode === "Sea" ? (
                          <Anchor size={14} className="text-slate-400" />
                        ) : (
                          <Plane size={14} className="text-slate-400" />
                        )}
                      </td>
                      <td className="py-3 whitespace-nowrap">
                        <div className="font-semibold text-slate-700">{s.cargo?.productName}</div>
                        <div className="text-[10px] text-slate-400">{s.cargo?.hsCode?.hsCode}</div>
                      </td>
                      <td className="py-3 text-right font-bold text-slate-800 whitespace-nowrap">₹{(s.cargo?.value / 10000000).toFixed(2)} Cr</td>
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
              <span className="text-[11px] text-slate-400 font-medium">Showing 1 to{shipments.length} of {shipments.length}  shipments</span>
              <div className="flex items-center gap-1.5">
                <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400">
                  <ChevronLeft size={14} />
                </button>
                <button className="w-7 h-7 flex items-center justify-center rounded-lg bg-blue-600 text-white text-[11px] font-bold">1</button>
                <button className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-500 text-[11px] font-bold">2</button>
                <button className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-500 text-[11px] font-bold">3</button>
                <span className="text-slate-400 text-[11px]">...</span>
                <button className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-500 text-[11px] font-bold">156</button>
                <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400">
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>

                    </SectionCard>

          <div className="flex flex-col gap-5">
             <SectionCard>
            <div className="flex justify-between items-center mb-3">
              <h3 className={`font-bold text-sm ${HEADING}`}>Recent Alerts</h3>
              <button className="text-blue-600 text-[11px] font-bold" onClick={() => setHighRisk(true)}>View All →</button>
            </div>
            <div className="space-y-2.5">
              {recentAlerts.map((a, i) => {
                const Icon = AlertTriangle;
                const color = a.type === "Critical" ? "text-red-500" : alert.type === "Warning" ? "text-orange-500" : "text-blue-500";
                const bg = a.type === "Critical" ? "bg-red-50" : alert.type === "Warning" ? "bg-orange-50" : "bg-blue-50";
                return (
                  <div key={a._id || i} className="flex items-start gap-2.5">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${bg} ${color}`}>
                      <Icon size={13} />
                    </div>
                    <div className="flex-1">
                      <p className={`text-[11px] font-semibold leading-snug ${HEADING}`}>{a.title || "-"}</p>
                      <p className="text-[10px] text-slate-400">{a.message || "-"}</p>
                    </div>
                    <span className="text-[9px] text-slate-400 font-medium whitespace-nowrap"> {a.createdAt ? new Date(a.createdAt).toLocaleTimeString() : "-"}</span>
                  </div>
                );
              })}
            </div>
          </SectionCard>
            <SectionCard>
              <div className="flex justify-between items-center mb-3">
                <h3 className={`font-bold text-sm ${HEADING}`}>Shipment Tracker</h3>
               {/* <button className="text-blue-600 text-[11px] font-bold shrink-0">View All Trackers →</button>*/}
              </div>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className={`font-bold text-xs ${HEADING}`}>{shipmentTracker?.referenceNumber || shipmentTracker?.sbNumber}</div>
                  <div className="text-[10px] text-slate-400 flex items-center gap-1">
                    {shipmentTracker?.route?.originCity},{" "}{shipmentTracker?.route?.originCountry} <Flag country={shipmentTracker?.route?.originCountry} size={11} /> → <Flag country={shipmentTracker?.route?.destinationCountry} size={11} />{shipmentTracker?.route?.destinationCity},{" "}{shipmentTracker?.route?.destinationCountry}
                  </div>
                </div>
                <StatusBadge status={shipmentTracker?.shipmentStatus} />
              </div>

              <div className="relative h-[150px] rounded-xl overflow-hidden border border-slate-100" style={{ backgroundColor: "#CFE8CF" }}>
                <svg viewBox="0 0 300 150" className="absolute inset-0 w-full h-full">
                  <path d="M50,50 C90,30 110,80 150,70 C190,60 200,110 250,100" fill="none" stroke="#60A5FA" strokeWidth="4" strokeLinecap="round" />
                  <circle cx="50" cy="50" r="6" fill="#4338CA" stroke="white" strokeWidth="2" />
                  <circle cx="250" cy="100" r="6" fill="#EF4444" stroke="white" strokeWidth="2" />
                </svg>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-3 text-center">
                <div>
                  <span className="text-[9px] text-slate-400 font-semibold block">Current Location</span>
                  <span className={`text-[11px] font-bold ${HEADING}`}>{shipmentTracker?.currentLocation?.city || shipmentTracker?.currentLocation?.country || "-"}</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 font-semibold block">Last Updated</span>
                  <span className={`text-[11px] font-bold ${HEADING}`}>{shipmentTracker?.lastStatusUpdatedAt? new Date(shipmentTracker.lastStatusUpdatedAt).toLocaleString() : "-"}</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 font-semibold block">ETA</span>
                  <span className={`text-[11px] font-bold ${HEADING}`}>{shipmentTracker?.eta ? new Date(shipmentTracker.eta).toLocaleDateString() : "-"}{shipmentTracker?.eta && (
                    <span className="text-blue-500"> {" "} ( {Math.ceil((new Date(shipmentTracker.eta) - new Date()) / (1000 * 60 * 60 * 24) )}{" "} days) </span> )}</span>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4">
                {TRACKER_STEPS.map((step, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center relative">
                    {i !== 0 && (
                      <div
                        className={`absolute top-2.5 right-1/2 w-full h-[2px] -z-10 ${
                          TRACKER_STEPS[i - 1].done ? "bg-purple-500" : "bg-slate-200"
                        }`}
                      />
                    )}
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        step.done ? "bg-purple-600" : "bg-slate-200"
                      }`}
                    >
                      {step.done && <Check size={11} className="text-white" />}
                    </div>
                    <span className={`text-[8px] font-bold mt-1 text-center leading-tight ${step.current ? "text-purple-600" : "text-slate-400"}`}>
                      {step.label}
                    </span>
                    <span className="text-[8px] text-slate-300">{step.date}</span>
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard>
              <div className="flex justify-between items-center mb-3">
                <h3 className={`font-bold text-sm ${HEADING}`}>Shipment Status Overview</h3>
                <DropdownButton text="This Month"   onClick={() => setDateRange(true)}/>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative w-[110px] h-[110px] shrink-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={STATUS_OVERVIEW} innerRadius={32} outerRadius={50} dataKey="value" stroke="none">
                        {STATUS_OVERVIEW.map((entry, index) => (
                          <Cell key={index} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className={`font-black text-sm ${HEADING}`}> {dashboard.totalShipments || 0}</span>
                    <span className="text-[7px] text-slate-400 font-bold uppercase leading-none">Total Shipments</span>
                  </div>
                </div>
                <div className="space-y-1.5 flex-1 text-[10px]">
                  {STATUS_OVERVIEW.map((r, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: r.color }} />
                        <span className="text-slate-600 font-semibold">{r.name}</span>
                      </div>
                      <span className={`font-bold ${HEADING}`}>{r.value} ({r.percent})</span>
                    </div>
                  ))}
                </div>
              </div>
            </SectionCard>

            <SectionCard>
              <div className="flex justify-between items-center mb-3">
                <h3 className={`font-bold text-sm ${HEADING}`}>Top Destination Countries</h3>
                <DropdownButton text="This Month"  onClick={() => setDateRange(true)} />
              </div>
              <div className="space-y-2.5">
                {TOP_DESTINATIONS.map((c, i) => (
                  <div key={i} className="text-[11px]">
                    <div className="flex justify-between mb-1">
                      <span className="font-semibold text-slate-700 flex items-center gap-1.5"><Flag country={c.country} /> {c.country}</span>
                      <span className={`font-bold ${HEADING}`}>{c.value} <span className="text-slate-400 font-semibold">({c.percent})</span></span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-full rounded-full" style={{ width: c.width }} />
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>
            
          <SectionCard>
            <div className="flex justify-between items-center mb-3">
              <h3 className={`font-bold text-sm ${HEADING}`}>Shipments by Mode</h3>
              <DropdownButton text="This Month" onClick={() => setDateRange(true)} />
            </div>
            <div className="flex items-center gap-3">
              <div className="relative w-[110px] h-[110px] shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={SHIPMENTS_BY_MODE} innerRadius={32} outerRadius={50} dataKey="value" stroke="none">
                      {SHIPMENTS_BY_MODE.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-1.5 flex-1 text-[10px]">
                {SHIPMENTS_BY_MODE.map((r, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: r.color }} />
                      <span className="text-slate-600 font-semibold">{r.name}</span>
                    </div>
                    <span className={`font-bold ${HEADING}`}>{r.value} ({r.percent})</span>
                  </div>
                ))}
              </div>
            </div>
          </SectionCard>

          <SectionCard>
            <div className="flex justify-between items-center mb-3">
              <h3 className={`font-bold text-sm ${HEADING}`}>Top Origin Countries</h3>
              <DropdownButton text="This Month"   onClick={() => setDateRange(true)}/>
            </div>
            <div className="space-y-2.5">
              {TOP_ORIGINS.map((c, i) => (
                <div key={i} className="text-[11px]">
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold text-slate-700 flex items-center gap-1.5"><Flag country={c.country} /> {c.country}</span>
                    <span className={`font-bold ${HEADING}`}>{c.value} <span className="text-slate-400 font-semibold">({c.percent})</span></span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full rounded-full" style={{ width: c.width }} />
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

         
        </div>

          </div>
        </div>

       
       )}
 
 
        {shipment === "shipment" && (
            <ShipmentForm setActiveTab={setActiveTab} setShipment={setShipment} currentTab={"Shipments"} />
          )}
      
        {highRisk && (<RecentHighRiskAlertsModal onClose={() => setHighRisk(false)}/>)}

          {dateRange && (
            <DateRangeModal onClose={() => setDateRange(false)}/>
          )}

          {exportReport && (
            <ExportReport onClose={() => setExportReport(false)} />
          )}
      
    </div>
  );
}