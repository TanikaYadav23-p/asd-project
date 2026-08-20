import React from "react";
import {
  X,
  ArrowLeft,
  Download,
  MapPin,
  Calendar,
  Clock,
  CheckCircle2,
  Circle,
  Maximize2,
  Plane,
} from "lucide-react";

const trackingSteps = [
  {
    title: "Shipment Planned",
    location: "Tirupur, India (IN)",
    date: "04 Apr 2025, 06:30 AM",
    status: "done",
  },
  {
    title: "Dispatched from Origin",
    location: "Tirupur, India (IN)",
    date: "24 Apr 2025, 08:15 AM",
    status: "done",
  },
  {
    title: "Arrival at Origin Airport",
    location: "Coimbatore Airport (CJB), India",
    date: "24 Apr 2025, 14:25 PM",
    note: "Shipment arrived at origin airport",
    status: "done",
  },
  {
    title: "Transit Custom Clearance",
    location: "IndiGo Cargo / Emirates SkyCargo",
    date: "26 Apr 2025, 09:00 AM",
    status: "done",
  },
  {
    title: "In Transit",
    location: "Dubai, UAE (DXB)",
    date: "28 Apr 2025, 05:40 am",
    status: "current",
  },
  {
    title: "Arrival at Destination Airport",
    location: "IndiGo Cargo / Emirates SkyCargo (ATC)",
    date: "Shipment arrived at destination airport",
    status: "pending",
  },
  {
    title: "Import Customs Clearance",
    location: "Dubai, UAE (DXB)",
    date: "30 Apr 2025, 09:30 AM",
    status: "pending",
  },
  {
    title: "Out for Delivery",
    location: "Dubai, UAE (DXB)",
    date: "30 Apr 2025, 11:00 AM",
    note: "Shipment out for final delivery",
    status: "pending",
  },
];

const shipmentInfo = [
  { label: "PO #", value: "PLN-2025-04-24-000123" },
  { label: "Type", value: "FOB - Free On Board" },
  { label: "Carrier", value: "IndiGo Cargo / Emirates SkyCargo" },
  { label: "Route", value: "T-shirts, specific goods" },
  { label: "Quantity", value: "500 Units" },
  { label: "Total Weight", value: "800 kg" },
  { label: "Volume", value: "4.5 CBM" },
];

const transportInfo = [
  { label: "Airway Bill", value: "AWB-9931234589" },
  { label: "Carrier", value: "IndiGo Cargo / Emirates SkyCargo" },
  { label: "Incoterm", value: "EXW (Ex Works)" },
  { label: "ETD", value: "28 Apr 2025, 10:00 AM" },
  { label: "ETA", value: "30 Apr 2025, 02:00 PM" },
  { label: "Transit Time", value: "3 - 5 Days" },
];

const notifications = [
  { text: "Shipment is in transit", date: "28 Apr 2025, 05:45 AM", tone: "blue" },
  { text: "Shipment dispatched from origin", date: "24 Apr 2025, 08:20 AM", tone: "green" },
  { text: "Export customs cleared", date: "26 Apr 2025, 11:15 AM", tone: "blue" },
];

const mapLabels = [
  { name: "BELARUS", top: "8%", left: "38%" },
  { name: "UKRAINE", top: "18%", left: "36%" },
  { name: "KAZAKHSTAN", top: "20%", left: "62%" },
  { name: "MOLDOVA", top: "22%", left: "31%" },
  { name: "ROMANIA", top: "24%", left: "28%" },
  { name: "GEORGIA", top: "28%", left: "42%" },
  { name: "UZBEKISTAN", top: "27%", left: "63%" },
  { name: "KYRGYZSTAN", top: "26%", left: "72%" },
  { name: "BULGARIA", top: "30%", left: "27%" },
  { name: "AZERBAIJAN", top: "32%", left: "48%" },
  { name: "TURKMENISTAN", top: "36%", left: "58%" },
  { name: "TAJIKISTAN", top: "35%", left: "68%" },
  { name: "GREECE", top: "34%", left: "22%" },
  { name: "TURKEY", top: "36%", left: "34%" },
  { name: "SYRIA", top: "42%", left: "38%" },
  { name: "AFGHANISTAN", top: "40%", left: "66%" },
  { name: "IRAQ", top: "46%", left: "42%" },
  { name: "IRAN", top: "44%", left: "52%" },
  { name: "PAKISTAN", top: "48%", left: "66%" },
  { name: "ISRAEL", top: "50%", left: "34%" },
  { name: "JORDAN", top: "52%", left: "37%" },
  { name: "KUWAIT", top: "54%", left: "45%" },
  { name: "EGYPT", top: "56%", left: "27%" },
  { name: "SAUDI ARABIA", top: "60%", left: "42%" },
  { name: "QATAR", top: "58%", left: "50%" },
  { name: "SUDAN", top: "70%", left: "27%" },
  { name: "ERITREA", top: "70%", left: "38%" },
  { name: "YEMEN", top: "68%", left: "48%" },
  { name: "OMAN", top: "62%", left: "58%" },
  { name: "DJIBOUTI", top: "76%", left: "42%" },
  { name: "ETHIOPIA", top: "80%", left: "40%" },
];

function StatusBadge() {
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-orange-100 text-orange-600">
      In Transit
    </span>
  );
}

function TrackingStep({ step, isLast }) {
  const isDone = step.status === "done";
  const isCurrent = step.status === "current";

  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        {isDone ? (
          <span className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 -m-px" strokeWidth={2} fill="white" />
          </span>
        ) : isCurrent ? (
          <span className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0 ring-4 ring-orange-100">
            <span className="w-2 h-2 rounded-full bg-white" />
          </span>
        ) : (
          <Circle className="w-5 h-5 text-gray-300 flex-shrink-0" strokeWidth={2} />
        )}
        {!isLast && (
          <span
            className={`w-px flex-1 min-h-[28px] ${
              isDone ? "bg-emerald-300" : "bg-gray-200"
            }`}
          />
        )}
      </div>
      <div className="pb-5">
        <p
          className={`text-sm font-medium ${
            isCurrent ? "text-orange-600" : isDone ? "text-gray-900" : "text-gray-400"
          }`}
        >
          {step.title}
        </p>
        <p className={`text-xs mt-0.5 ${isDone || isCurrent ? "text-gray-500" : "text-gray-400"}`}>
          {step.location}
        </p>
        <p className={`text-xs mt-0.5 ${isDone || isCurrent ? "text-gray-400" : "text-gray-300"}`}>
          {step.date}
        </p>
        {step.note && (
          <p className={`text-xs italic mt-0.5 ${isDone || isCurrent ? "text-gray-400" : "text-gray-300"}`}>
            {step.note}
          </p>
        )}
      </div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
      <span className="text-xs text-gray-500">{label}</span>
      <span className="text-xs font-medium text-gray-900 text-right">{value}</span>
    </div>
  );
}

function TrackingMap() {
  return (
    <div className="relative w-full h-56 sm:h-72 md:h-80 rounded-lg overflow-hidden bg-[#eef3f7] border border-gray-100">
      {/* sea */}
      <div className="absolute inset-0 bg-[#dbeafe]" />

      {/* landmass */}
      <div className="absolute inset-0">
        <div className="absolute top-[2%] left-[10%] w-[80%] h-[55%] bg-[#f2f4f6] rounded-[40%] rotate-[6deg]" />
        <div className="absolute top-[40%] left-[15%] w-[65%] h-[55%] bg-[#f2f4f6] rounded-[35%] -rotate-3" />
        <div className="absolute top-[55%] left-[55%] w-[45%] h-[45%] bg-[#f2f4f6] rounded-[30%] rotate-6" />
      </div>

      {/* country labels */}
      {mapLabels.map((c) => (
        <span
          key={c.name}
          className="hidden sm:inline-block absolute text-[8px] tracking-wide text-gray-400 font-medium select-none"
          style={{ top: c.top, left: c.left }}
        >
          {c.name}
        </span>
      ))}

      {/* flight path */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
        <line
          x1="58"
          y1="60"
          x2="88"
          y2="78"
          stroke="#f97316"
          strokeWidth="0.6"
          strokeDasharray="2 2"
        />
      </svg>

      {/* current location marker (Dubai) */}
      <div className="absolute" style={{ top: "58%", left: "56%" }}>
        <div className="relative flex flex-col items-center -translate-x-1/2 -translate-y-full">
          <div className="bg-gray-900 text-white rounded-full p-1.5 shadow-lg">
            <MapPin className="w-3.5 h-3.5" fill="white" />
          </div>
          <span className="mt-1 text-[9px] bg-white px-1.5 py-0.5 rounded shadow text-gray-700 whitespace-nowrap">
            Dubai, UAE
          </span>
        </div>
      </div>

      {/* destination marker (India) */}
      <div className="absolute" style={{ top: "76%", left: "88%" }}>
        <div className="w-2.5 h-2.5 rounded-full bg-red-500 ring-4 ring-red-100" />
        <span className="mt-1 text-[9px] text-gray-500 whitespace-nowrap block">Tirupur, India</span>
      </div>

      <button className="absolute top-3 right-3 bg-white rounded-md px-2 py-1.5 shadow text-gray-600 hover:bg-gray-50">
        <Maximize2 className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

export default function ShipmentTrackingModal({ open = true, onClose = () => {} }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/50">
      <div className="bg-white w-full max-w-6xl rounded-xl shadow-2xl flex flex-col max-h-[80vh]">
        {/* header */}
        <div className="flex items-start justify-between px-4 sm:px-6 pt-5 pb-4 border-b border-gray-100 flex-shrink-0">
          <div>
            <p className="text-xs text-gray-400 flex items-center gap-1.5 flex-wrap">
              <span>Dashboard</span>
              <span>›</span>
              <span>My Shipments</span>
              <span>›</span>
              <span className="text-gray-600">Shipment Tracking</span>
            </p>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mt-2">Shipment Tracking</h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Track your shipment in real-time and get the latest update.
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button className="hidden sm:inline-flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50">
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to My Shipments
            </button>
            <button className="hidden sm:inline-flex items-center gap-1.5 bg-gray-900 text-white rounded-lg px-3 py-2 text-xs font-medium hover:bg-gray-800">
              <Download className="w-3.5 h-3.5" />
              Download Documents
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* scrollable body */}
        <div className="overflow-y-auto px-4 sm:px-6 py-4 space-y-4">
          {/* summary strip */}
          <div className="border border-gray-100 rounded-xl px-4 py-3 flex flex-wrap gap-4 sm:gap-8 items-center">
            <StatusBadge />
            <div className="min-w-[110px]">
              <p className="text-[10px] text-gray-400">Air Freight</p>
              <p className="text-xs font-semibold text-gray-900">PLN-2025-04-24-000123</p>
            </div>
            <div className="min-w-[140px] flex items-center gap-2">
              <div>
                <p className="text-[10px] text-gray-400">Route</p>
                <p className="text-xs font-semibold text-gray-900">Tirupur, India (IN)</p>
              </div>
              <Plane className="w-3.5 h-3.5 text-gray-300 rotate-90" />
              <div>
                <p className="text-[10px] text-gray-400 invisible">Route</p>
                <p className="text-xs font-semibold text-gray-900">Dubai, UAE (AE)</p>
              </div>
            </div>
            <div className="min-w-[90px]">
              <p className="text-[10px] text-gray-400">ETD</p>
              <p className="text-xs font-semibold text-gray-900">26 Apr 2025</p>
            </div>
            <div className="min-w-[90px]">
              <p className="text-[10px] text-gray-400">ETA</p>
              <p className="text-xs font-semibold text-gray-900">30 Apr 2025</p>
            </div>
            <div className="min-w-[90px]">
              <p className="text-[10px] text-gray-400">Transit Time</p>
              <p className="text-xs font-semibold text-gray-900">3 - 5 Days</p>
            </div>
            <div className="min-w-[110px]">
              <p className="text-[10px] text-gray-400">Total Estimated Cost</p>
              <p className="text-xs font-semibold text-gray-900">₹24,860</p>
            </div>
          </div>

          {/* tabs */}
          <div className="flex items-center gap-5 sm:gap-6 border-b border-gray-100 overflow-x-auto text-xs sm:text-sm">
            <span className="flex items-center gap-1.5 text-gray-900 font-medium border-b-2 border-emerald-500 pb-2.5 whitespace-nowrap">
              Overview
            </span>
            <span className="text-gray-400 pb-2.5 whitespace-nowrap">Tracking</span>
            <span className="text-gray-400 pb-2.5 whitespace-nowrap">Documents</span>
            <span className="text-gray-400 pb-2.5 whitespace-nowrap">Cost Breakdown</span>
            <span className="text-gray-400 pb-2.5 whitespace-nowrap">Notes</span>
            <span className="text-gray-400 pb-2.5 whitespace-nowrap">Activity Log</span>
          </div>

          {/* main grid: tracking + map */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-1 border border-gray-100 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Shipment Status &amp; Tracking</h3>
              <div>
                {trackingSteps.map((step, idx) => (
                  <TrackingStep key={step.title} step={step} isLast={idx === trackingSteps.length - 1} />
                ))}
              </div>
              <button className="w-full text-center text-xs font-medium text-gray-600 border border-gray-200 rounded-lg py-2 mt-2 hover:bg-gray-50">
                View Full Tracking History
              </button>
            </div>

            <div className="lg:col-span-2 border border-gray-100 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-900">Live Tracking Map</h3>
                <button className="text-xs font-medium text-emerald-600 flex items-center gap-1">
                  View Fullscreen
                  <Maximize2 className="w-3 h-3" />
                </button>
              </div>
              <TrackingMap />
              <div className="grid grid-cols-3 gap-2 mt-3 text-center">
                <div className="border border-gray-100 rounded-lg py-2">
                  <p className="text-[10px] text-gray-400 flex items-center justify-center gap-1">
                    <MapPin className="w-3 h-3" /> Current Location
                  </p>
                  <p className="text-xs font-semibold text-gray-900 mt-0.5">Dubai, UAE (DXB)</p>
                  <p className="text-[10px] text-gray-400">Over Arabian Sea</p>
                </div>
                <div className="border border-gray-100 rounded-lg py-2">
                  <p className="text-[10px] text-gray-400 flex items-center justify-center gap-1">
                    <Calendar className="w-3 h-3" /> Last Update
                  </p>
                  <p className="text-xs font-semibold text-gray-900 mt-0.5">26 Apr 2026, 08:45 AM</p>
                </div>
                <div className="border border-gray-100 rounded-lg py-2">
                  <p className="text-[10px] text-gray-400 flex items-center justify-center gap-1">
                    <Clock className="w-3 h-3" /> Next Update
                  </p>
                  <p className="text-xs font-semibold text-gray-900 mt-0.5">Estimated in 2h 15m</p>
                  <p className="text-[10px] text-gray-400">Automatic update</p>
                </div>
              </div>
            </div>
          </div>

          {/* bottom info grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="border border-gray-100 rounded-xl p-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-2">Shipment Information</h4>
              {shipmentInfo.map((r) => (
                <InfoRow key={r.label} {...r} />
              ))}
              <button className="w-full text-center text-xs font-medium text-gray-600 border border-gray-200 rounded-lg py-2 mt-3 hover:bg-gray-50">
                View Shipment Details
              </button>
            </div>

            <div className="border border-gray-100 rounded-xl p-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-2">Transport Information</h4>
              {transportInfo.map((r) => (
                <InfoRow key={r.label} {...r} />
              ))}
              <button className="w-full text-center text-xs font-medium text-gray-600 border border-gray-200 rounded-lg py-2 mt-3 hover:bg-gray-50">
                Track on Carrier Website
              </button>
            </div>

            <div className="border border-gray-100 rounded-xl p-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-2">Parties Information</h4>
              <div className="space-y-3">
                <div>
                  <p className="text-[10px] text-gray-400">Exporter / Ship From</p>
                  <p className="text-xs font-semibold text-gray-900">ASD Exports Pvt. Ltd.</p>
                  <p className="text-[10px] text-gray-400">Tirupur, Tamil Nadu, India</p>
                  <p className="text-[10px] text-gray-400">GSTIN: 33AABCA1234B1Z5</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400">Importer / Ship To</p>
                  <p className="text-xs font-semibold text-gray-900">AYZ Trading LLC</p>
                  <p className="text-[10px] text-gray-400">Dubai, United Arab Emirates</p>
                  <p className="text-[10px] text-gray-400">TRN: 100234567890001</p>
                </div>
              </div>
              <button className="w-full text-center text-xs font-medium text-gray-600 border border-gray-200 rounded-lg py-2 mt-3 hover:bg-gray-50">
                View All Party Details
              </button>
            </div>

            <div className="border border-gray-100 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold text-gray-900">Notifications &amp; Alerts</h4>
                <span className="text-xs font-medium text-emerald-600">View All Alerts</span>
              </div>
              <div className="space-y-3">
                {notifications.map((n, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span
                      className={`w-4 h-4 mt-0.5 rounded-full flex items-center justify-center flex-shrink-0 ${
                        n.tone === "green" ? "bg-emerald-100" : "bg-blue-100"
                      }`}
                    >
                      <CheckCircle2
                        className={`w-3 h-3 ${
                          n.tone === "green" ? "text-emerald-600" : "text-blue-600"
                        }`}
                      />
                    </span>
                    <div>
                      <p className="text-xs text-gray-700">{n.text}</p>
                      <p className="text-[10px] text-gray-400">{n.date}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full text-center text-xs font-medium text-gray-600 border border-gray-200 rounded-lg py-2 mt-3 hover:bg-gray-50">
                Manage Notifications
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}