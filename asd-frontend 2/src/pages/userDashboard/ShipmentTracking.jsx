import { useState, useEffect, useRef } from "react";
import {
  FiArrowLeft,
  FiDownload,
  FiMapPin,
  FiCalendar,
  FiClock,
  FiExternalLink,
} from "react-icons/fi";
import {
  MdOutlineLocalShipping,
  MdOutlineDescription,
  MdOutlineAttachMoney,
  MdOutlineNote,
  MdOutlineHistory,
  MdOutlineGridView,
  MdOutlineCheckCircle,
  MdOutlineInfo,
} from "react-icons/md";
import { BsCheckCircleFill, BsCircle, BsCircleFill } from "react-icons/bs";
import { FaPlane } from "react-icons/fa";
import { FaLocationDot, FaIndianRupeeSign } from "react-icons/fa6";

const trackingSteps = [
  {
    id: 1,
    label: "Shipment Planned",
    sub: "Tirupur, India (IN)",
    time: "04 Apr 2025, 06:30 AM",
    note: null,
    done: true,
    active: false,
  },
  {
    id: 2,
    label: "Dispatched from Origin",
    sub: "Tirupur, India (IN)",
    time: "24 Apr 2025, 08:15 AM",
    note: null,
    done: true,
    active: false,
  },
  {
    id: 3,
    label: "Arrival at Origin Airport",
    sub: "Coimbatore Airport (CJB), India",
    time: "24 Apr 2025, 14:25 PM",
    note: "Shipment arrived at origin airport",
    done: true,
    active: false,
  },
  {
    id: 4,
    label: "Transit Custom Clearance",
    sub: "IndiGo Cargo / Emirates SkyCargo",
    time: "26 Apr 2025, 09:00 AM",
    note: null,
    done: true,
    active: false,
  },
  {
    id: 5,
    label: "In Transit",
    sub: "Dubai, UAE (DXB)",
    time: "28 Apr 2025, 05:40 am",
    note: null,
    done: false,
    active: true,
  },
  {
    id: 6,
    label: "Arrival at Destination Airport",
    sub: "IndiGo Cargo / Emirates SkyCargo (ATC)",
    time: null,
    note: "Shipment arrived at destination airport",
    done: false,
    active: false,
  },
  {
    id: 7,
    label: "Import Customs Clearance",
    sub: "Dubai, UAE (DXB)",
    time: "30 Apr 2025, 09:30 AM",
    note: null,
    done: false,
    active: false,
  },
  {
    id: 8,
    label: "Out for Delivery",
    sub: "Dubai, UAE (DXB)",
    time: "30 Apr 2025, 11:00 AM",
    note: "Shipment out for final delivery",
    done: false,
    active: false,
  },
];

const tabs = [
  { id: "overview", label: "Overview", icon: <MdOutlineGridView size={15} /> },
  {
    id: "tracking",
    label: "Tracking",
    icon: <MdOutlineLocalShipping size={15} />,
  },
  {
    id: "documents",
    label: "Documents",
    icon: <MdOutlineDescription size={15} />,
  },
  {
    id: "cost",
    label: "Cost Breakdown",
    icon: <FaIndianRupeeSign size={15} />,
  },
  { id: "notes", label: "Notes", icon: <MdOutlineNote size={15} /> },
  {
    id: "activity",
    label: "Activity Log",
    icon: <MdOutlineHistory size={15} />,
  },
];

const notifications = [
  {
    icon: <MdOutlineCheckCircle size={16} className="text-teal-600" />,
    bg: "bg-teal-50",
    label: "Shipment is in transit",
    time: "28 Apr 2025, 05:45 AM",
  },
  {
    icon: <MdOutlineCheckCircle size={16} className="text-teal-600" />,
    bg: "bg-teal-50",
    label: "Shipment dispatched from origin",
    time: "24 Apr 2025, 08:20 AM",
  },
  {
    icon: <MdOutlineInfo size={16} className="text-blue-500" />,
    bg: "bg-blue-50",
    label: "Export customs cleared",
    time: "26 Apr 2025, 11:15 AM",
  },
];

function LiveMap() {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (mapInstanceRef.current) return;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";
    script.onload = () => {
      const L = window.L;
      const map = L.map(mapRef.current, {
        zoomControl: true,
        scrollWheelZoom: false,
      }).setView([23, 60], 4);
      mapInstanceRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(map);

      const dubaiIcon = L.divIcon({
        html: `<div style="background:#1f2937;color:white;border-radius:50% 50% 50% 0;width:28px;height:28px;transform:rotate(-45deg);display:flex;align-items:center;justify-content:center;border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3)"><span style="transform:rotate(45deg);font-size:14px;">📍</span></div>`,
        className: "",
        iconAnchor: [14, 28],
      });

      const originIcon = L.divIcon({
        html: `<div style="background:#ef4444;width:10px;height:10px;border-radius:50%;border:2px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.3)"></div>`,
        className: "",
        iconAnchor: [5, 5],
      });

      L.marker([25.2048, 55.2708], { icon: dubaiIcon })
        .addTo(map)
        .bindTooltip("Dubai, UAE (AE)", {
          permanent: true,
          direction: "top",
          className: "text-xs font-semibold",
        });

      L.marker([11.1085, 77.3411], { icon: originIcon })
        .addTo(map)
        .bindTooltip("Tirupur, India (IN)", {
          permanent: true,
          direction: "top",
          className: "text-xs",
        });

      const routePoints = [
        [11.1085, 77.3411],
        [13.0827, 80.2707],
        [15, 72],
        [20, 63],
        [23, 58],
        [25.2048, 55.2708],
      ];

      L.polyline(routePoints, {
        color: "#3b82f6",
        weight: 2,
        dashArray: "6 4",
        opacity: 0.8,
      }).addTo(map);
    };
    document.head.appendChild(script);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={mapRef}
      className="w-full h-full rounded-lg"
      style={{ minHeight: 320 }}
    />
  );
}

export default function ShipmentTracking() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className=" bg-gray-50   w-full pt-14 -z-40">
      <div className="   px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
          <div>
            <p className="text-xs text-gray-400 mb-1">
              Dashboard &gt; My Shipments &gt; Shipment Tracking
            </p>
            <h1 className="text-xl  font-semibold text-gray-900">
              Shipment Tracking
            </h1>
            <p className="text-xs  text-gray-500 mt-0.5">
              Track your shipment in real-time and get the latest update.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="flex items-center gap-1.5 text-xs  font-medium text-gray-700 border border-gray-300 rounded-lg px-3 py-2 bg-white hover:bg-gray-50 whitespace-nowrap">
              <FiArrowLeft size={13} /> Back to My Shipments
            </button>
            <button className="flex items-center gap-1.5 text-xs  font-medium text-gray-700 border border-gray-300 rounded-lg px-3 py-2 bg-white hover:bg-gray-50 whitespace-nowrap">
              <FiDownload size={13} /> Download Documents
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-5 overflow-x-auto">
          <div className="flex items-center gap-3 sm:gap-6 px-4 py-3 min-w-[700px]">
            <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap">
              In Transit
            </span>
            <div className="border-l border-gray-200 pl-4">
              <p className="text-xs text-[#4A5565]">Air Freight</p>
              <p className="text-xs font-bold text-gray-900">
                PLN-2025-04-24-000123
              </p>
            </div>
            <div className="border-l border-gray-200 pl-4">
              <p className="text-xs text-[#4A5565]">Route</p>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-gray-900">
                  Tirupur, India (IN)
                </span>
                <FaPlane size={11} className="text-gray-400" />
                <span className="text-xs font-bold text-gray-900">
                  Dubai, UAE (AE)
                </span>
              </div>
            </div>
            <div className="border-l border-gray-200 pl-4">
              <p className="text-xs text-[#4A5565]">ETD</p>
              <p className="text-xs font-bold text-gray-900">26 Apr 2025</p>
            </div>
            <div className="border-l border-gray-200 pl-4">
              <p className="text-xs text-[#4A5565]">ETA</p>
              <p className="text-xs font-bold text-gray-900">30 Apr 2025</p>
            </div>
            <div className="border-l border-gray-200 pl-4">
              <p className="text-xs text-[#4A5565]">Transit Time</p>
              <p className="text-xs font-bold text-gray-900">3 - 5 Days</p>
            </div>
            <div className="border-l border-gray-200 pl-4">
              <p className="text-xs text-[#4A5565]">Total Estimated Cost</p>
              <p className="text-xs font-bold text-gray-900">₹24,860</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-0 border-b border-gray-200 mb-5 overflow-x-auto bg-white rounded-t-xl">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 text-xs sm:text-sm font-semibold px-3 sm:px-5 py-3 whitespace-nowrap border-b-2 transition-colors ${activeTab === tab.id ? "border-teal-500 text-teal-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-5">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sm:p-5">
            <h3 className="text-sm sm:text-[15px] font-bold text-gray-900 mb-4">
              Shipment Status &amp; Tracking
            </h3>
            <div className="relative">
              {trackingSteps.map((step, i) => (
                <div
                  key={step.id}
                  className="flex gap-3 mb-4 last:mb-0 relative"
                >
                  <div className="flex flex-col items-center flex-shrink-0">
                    {step.done ? (
                      <BsCheckCircleFill
                        size={18}
                        className="text-teal-500 flex-shrink-0"
                      />
                    ) : step.active ? (
                      <div
                        className="w-4.5 h-4.5 rounded-full border-2 border-orange-500 bg-orange-100 flex items-center justify-center flex-shrink-0"
                        style={{ width: 18, height: 18 }}
                      >
                        <BsCircleFill size={7} className="text-orange-500" />
                      </div>
                    ) : (
                      <BsCircle
                        size={18}
                        className="text-gray-300 flex-shrink-0"
                      />
                    )}
                    {i < trackingSteps.length - 1 && (
                      <div
                        className={`w-0.5 flex-1 mt-1 ${step.done ? "bg-teal-400" : "bg-gray-200"}`}
                        style={{ minHeight: 24 }}
                      ></div>
                    )}
                  </div>
                  <div className="pb-1">
                    <p
                      className={`text-xs font-bold leading-snug ${step.active ? "text-orange-500" : step.done ? "text-gray-900" : "text-gray-400"}`}
                    >
                      {step.label}
                    </p>
                    <p
                      className={`text-xs mt-0.5 ${step.done || step.active ? "text-gray-500" : "text-gray-300"}`}
                    >
                      {step.sub}
                    </p>
                    {step.time && (
                      <p
                        className={`text-xs mt-0.5 ${step.done || step.active ? "text-gray-500" : "text-gray-300"}`}
                      >
                        {step.time}
                      </p>
                    )}
                    {step.note && (
                      <p className="text-xs italic text-gray-400 mt-0.5">
                        {step.note}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-4 w-full border border-teal-500 text-teal-600 text-xs sm:text-sm font-semibold rounded-lg py-2.5 hover:bg-teal-50 transition-colors">
              View Full Tracking History
            </button>
          </div>

          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <h3 className="text-sm sm:text-[15px] font-bold text-gray-900">
                Live Tracking Map
              </h3>
              <button className="flex items-center gap-1 text-xs font-semibold text-teal-600 hover:underline">
                View Fullscreen <FiExternalLink size={12} />
              </button>
            </div>
            <div className="w-full h-[100vh] lg:h-[80%]  p-4 z-0 ">
              <LiveMap />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 border-t border-gray-100 items-center    mt-4">
              <div className="flex items-start gap-2.5 px-4 py-3 border-b sm:border-b-0 sm:border-r border-gray-100">
                <FiMapPin
                  size={16}
                  className="text-teal-500 mt-0.5 flex-shrink-0"
                />
                <div>
                  <p className="text-[10px] text-gray-400 font-">
                    Current Location
                  </p>
                  <p className="text-xs font-semibold text-gray-900">
                    Dubai, UAE (DXB)
                  </p>
                  <p className="text-[10px] text-gray-400">Over Arabian Sea</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 px-4 py-3 border-b sm:border-b-0 sm:border-r border-gray-100">
                <FiCalendar
                  size={16}
                  className="text-teal-500 mt-0.5 flex-shrink-0"
                />
                <div>
                  <p className="text-[10px] text-gray-400 font-">Last Update</p>
                  <p className="text-xs font-semibold text-gray-900">
                    26 Apr 2026, 08:45 AM
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 px-4 py-3">
                <FiClock
                  size={16}
                  className="text-teal-500 mt-0.5 flex-shrink-0"
                />
                <div>
                  <p className="text-[10px] text-gray-400 font-">Next Update</p>
                  <p className="text-xs font-semibold text-gray-900">
                    Estimated in 2h 15m
                  </p>
                  <p className="text-[10px] text-gray-400">Automatic update</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1  md:grid-cols-2 xl:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sm:p-5">
            <h3 className="text-sm sm:text-[15px] font-bold text-gray-900 mb-4">
              Shipment Information
            </h3>
            <div className="space-y-2.5">
              {[
                { label: "PO #", value: "PLN-2025-04-24-000123" },
                { label: "Type", value: "FOB - Free On Board" },
                { label: "Carrier", value: "IndiGo Cargo / Emirates SkyCargo" },
                { label: "Route", value: "T-shirts, specific goods" },
                { label: "Quantity", value: "500 Units" },
                { label: "Total Weight", value: "800 kg" },
                { label: "Volume", value: "4.5 CBM" },
              ].map((item, i) => (
                <div key={i} className="flex items-start justify-between gap-2">
                  <span className="text-xs text-gray-400 flex-shrink-0">
                    {item.label}
                  </span>
                  <span className="text-xs font-semibold text-gray-800 text-right">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
            <button className="mt-4 w-full border border-teal-500 text-teal-600 text-xs  font-bold rounded-lg py-2.5 hover:bg-teal-50 transition-colors">
              View Shipment Details
            </button>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sm:p-5">
            <h3 className="text-sm sm:text-[15px] font-bold text-gray-900 mb-4">
              Transport Information
            </h3>
            <div className="space-y-2.5 flex-1 mb-12">
              {[
                { label: "Airway Bill", value: "AWB-9931234589" },
                { label: "Carrier", value: "IndiGo Cargo / Emirates SkyCargo" },
                { label: "Incoterm", value: "EXW (Ex Works)" },
                { label: "ETD", value: "28 Apr 2025, 10:00 AM" },
                { label: "ETA", value: "30 Apr 2025, 02:00 PM" },
                { label: "Transit Time", value: "3 - 5 Days" },
              ].map((item, i) => (
                <div key={i} className="flex items-start justify-between gap-2">
                  <span className="text-xs text-gray-400 flex-shrink-0">
                    {item.label}
                  </span>
                  <span className="text-xs font-semibold text-gray-800 text-right">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
            <button className="mt-4 w-full border border-teal-500 text-teal-600 text-xs  font-bold rounded-lg py-2.5 hover:bg-teal-50 transition-colors flex items-center justify-center gap-1.5">
              Track on Carrier Website <FiExternalLink size={12} />
            </button>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sm:p-5">
            <h3 className="text-sm sm:text-[15px] font-bold text-gray-900 mb-4">
              Parties Information
            </h3>
            <div className="mb-4">
              <p className="text-[10px] text-gray-400 font-medium mb-1">
                Exporter / Ship From
              </p>
              <p className="text-sm font-semibold text-[#1E2939]">
                ASD Exports Pvt. Ltd.
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                Tirupur, Tamil Nadu, India
              </p>
              <p className="text-xs font-semibold text-teal-600 mt-1">
                GSTIN: 33AABCA1234B1Z5
              </p>
            </div>
            <div className="pt-3 border-t border-gray-100">
              <p className="text-[10px] text-gray-400 font-medium mb-1">
                Importer / Ship To
              </p>
              <p className="text-sm font-semibold text-gray-900">AYZ Trading LLC</p>
              <p className="text-xs text-gray-500 mt-0.5">
                Dubai, United Arab Emirates
              </p>
              <p className="text-xs font-semibold text-teal-600 mt-1">
                TRN: 100234567890001
              </p>
            </div>
            <button className="mt-4 w-full border border-teal-500 text-teal-600 text-xs  font-bold rounded-lg py-2.5 hover:bg-teal-50 transition-colors">
              View All Party Details
            </button>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sm:p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm sm:text-[15px] font-bold text-gray-900">
                Notifications &amp; Alerts
              </h3>
              <button className="text-xs font-semibold text-teal-600 hover:underline whitespace-nowrap">
                View All Alerts
              </button>
            </div>
            <div className="space-y-3">
              {notifications.map((n, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-2.5 rounded-lg p-2.5 ${n.bg}`}
                >
                  <div className="flex-shrink-0 mt-0.5">{n.icon}</div>
                  <div>
                    <p className="text-xs font-semibold text-gray-900">
                      {n.label}
                    </p>
                    <p className="text-[10px] text-gray-500 mt-0.5">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-4 w-full border border-teal-500 text-teal-600 text-xs  font-bold rounded-lg py-2.5 hover:bg-teal-50 transition-colors">
              Manage Notifications
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
