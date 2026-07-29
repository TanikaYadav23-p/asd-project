import { useState } from "react";
import {
  FiArrowLeft,
  FiDownload,
  FiShare2,
  FiEdit,
  FiExternalLink,
  FiEdit2,
} from "react-icons/fi";
import ImageIcon from "../../components/core/ImageIcon"
import cost from "../../assets/Images/webp/cost.webp"
import {
  MdOutlineDescription,
  MdOutlineLocalShipping,
  MdOutlineAttachMoney,
  MdOutlineNote,
  MdOutlineHistory,
  MdOutlineGridView,
  MdOutlineCancel,
  MdOutlineFileCopy,
} from "react-icons/md";
import {
  BsCheckCircleFill,
  BsCircle,
  BsCircleFill,
  BsExclamationCircle,
} from "react-icons/bs";
import { HiDocumentArrowDown } from "react-icons/hi2";
import { FaPlane } from "react-icons/fa";
import { FaLocationDot, FaIndianRupeeSign  } from "react-icons/fa6";

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
    icon: <FaIndianRupeeSign  size={15} />,
  },
  { id: "notes", label: "Notes", icon: <MdOutlineNote size={15} /> },
  {
    id: "activity",
    label: "Activity Log",
    icon: <MdOutlineHistory size={15} />,
  },
];

const trackingSteps = [
  {
    label: "Shipment Planned",
    time: "24 Apr 2025, 09:35 AM",
    status: "completed",
  },
  {
    label: "Dispatched from Origin",
    time: "24 Apr 2025, 11:30 AM",
    status: "completed",
  },
  { label: "In Transit", time: "26 Apr 2025, 08:48 AM", status: "current" },
  {
    label: "Arrived at Destination",
    time: "Expected: 27 Apr 2025, 09:00 AM",
    status: "pending",
  },
  {
    label: "Out for Delivery",
    time: "Expected: 28 Apr 2025, 10:00 AM",
    status: "pending",
  },
  {
    label: "Delivered",
    time: "Expected: 28 Apr 2025, 06:00 PM",
    status: "pending",
  },
];

const documents = [
  {
    name: "Commercial Invoice",
    status: "Required",
    statusColor: "text-red-500",
    icon: <BsExclamationCircle size={14} className="text-red-500" />,
  },
  {
    name: "Packing List",
    status: "Required",
    statusColor: "text-teal-600",
    icon: <BsCheckCircleFill size={14} className="text-teal-500" />,
  },
  {
    name: "Certificate of Origin",
    status: "Not Required",
    statusColor: "text-gray-400",
    icon: <BsCircle size={14} className="text-gray-300" />,
  },
  {
    name: "Airway Bill",
    status: "Required",
    statusColor: "text-teal-600",
    icon: <BsCheckCircleFill size={14} className="text-teal-500" />,
  },
  {
    name: "Export License",
    status: "Not Required",
    statusColor: "text-gray-400",
    icon: <BsCircle size={14} className="text-gray-300" />,
  },
  {
    name: "Other Certificates",
    status: "Not Required",
    statusColor: "text-gray-400",
    icon: <BsCircle size={14} className="text-gray-300" />,
  },
];

const activityLog = [
  {
    time: "26 Apr 2025, 08:48 AM",
    title: "Shipment is in transit and on route to destination.",
    by: "System",
  },
  {
    time: "24 Apr 2025, 11:30 AM",
    title: "Shipment dispatched from origin.",
    by: "System",
  },
  {
    time: "24 Apr 2025, 09:35 AM",
    title: "Shipment planning created.",
    by: "Arjun Sen",
  },
];

const quickActions = [
  {
    icon: <FaLocationDot size={22} className="text-gray-600" />,
    label: "Track Shipment",
  },
  {
    icon: <HiDocumentArrowDown size={22} className="text-gray-600" />,
    label: "Download Documents",
  },
  {
    icon: <FiShare2 size={22} className="text-gray-600" />,
    label: "Share Shipment",
  },
  {
    icon: cost,
    label: "View Cost Breakdown",
  },
  {
    icon: <MdOutlineFileCopy size={22} className="text-gray-600" />,
    label: "Create Similar",
  },
  {
    icon: <MdOutlineCancel size={22} className="text-red-500" />,
    label: "Cancel Shipment",
    red: true,
  },
];

function StepIcon({ status }) {
  if (status === "completed")
    return (
      <BsCheckCircleFill size={20} className="text-teal-500 flex-shrink-0" />
    );
  if (status === "current")
    return (
      <div className="w-5 h-5 rounded-full border-2 border-orange-500 bg-white flex items-center justify-center flex-shrink-0">
        <BsCircleFill size={8} className="text-orange-500" />
      </div>
    );
  return <BsCircle size={20} className="text-gray-300 flex-shrink-0" />;
}

function InfoRow({ label, value, bold }) {
  return (
    <div className="flex flex-col gap-0.5 mb-4">
      <p className="text-xs font-semibold flex-1 text-[#909090] ">{label}</p>
      <p
        className={`text-xs ${bold ? "font-bold" : "font-semibold"} text-gray-900`}
      >
        {value}
      </p>
    </div>
  );
}

export default function MyShipment() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gray-50 font-sans pt-20">
      <div className="max-w-[1400px] mx-auto px-3 sm:px-4 lg:px-6 ">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
          <div>
            <p className="text-sm text-gray-400 mb-1 space-x-3">
              Dashboard &gt; My Shipments &gt; Shipment Details
            </p>
            <h1 className="text-xl   font-semibold text-[#101828]">
              Shipment Details
            </h1>
            <p className="text-xs  text-gray-500 mt-0.5">
              Track, manage, and view real-time details of your shipment.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="flex items-center gap-1.5 text-xs  font-semibold text-gray-700 border border-gray-300 rounded-lg px-3 py-2 bg-white hover:bg-gray-50 whitespace-nowrap">
              <FiArrowLeft size={13} /> Back to My Shipments
            </button>
            <button className="flex items-center gap-1.5 text-xs  font-semibold text-gray-700 border border-gray-300 rounded-lg px-3 py-2 bg-white hover:bg-gray-50 whitespace-nowrap">
              <FiDownload size={13} /> Download Documents
            </button>
            <button className="flex items-center gap-1.5 text-xs  font-semibold text-gray-700 border border-gray-300 rounded-lg px-3 py-2 bg-white hover:bg-gray-50 whitespace-nowrap">
              <FiShare2 size={13} /> Share Shipment
            </button>
            <button className="flex items-center gap-1.5 text-xs  font-semibold text-white bg-[#009689] rounded-lg px-3 py-2 whitespace-nowrap">
              <FiEdit size={13} /> Edit Shipment
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-5 overflow-x-auto">
          <div className="flex items-center gap-3 sm:gap-5 px-4 py-3 min-w-[700px]">
            <span className="bg-orange-500 text-white text-xs font-normal px-3 py-1.5 rounded-full whitespace-nowrap">
              In Transit
            </span>
            <div className="border-l border-gray-200 pl-4">
              <p className="text-xs text-[#4A5565]">Shipment ID</p>
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
              <p className="text-xs text-[#4A5565]">Goods</p>
              <p className="text-xs font-bold text-gray-900">Cotton, 100%</p>
            </div>
            <div className="border-l border-gray-200 pl-4">
              <p className="text-xs text-[#4A5565]">Total Estimated Cost</p>
              <p className="text-xs font-bold text-gray-900">₹24,860</p>
            </div>
            <div className="border-l border-gray-200 pl-4">
              <p className="text-xs text-[#4A5565]">Transit Time</p>
              <p className="text-xs font-bold text-gray-900">3 - 5 Days</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-t-xl border-b border-gray-200 mb-5 overflow-x-auto">
          <div className="flex items-center gap-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 text-xs   font-semibold px-3 sm:px-5 py-3
                   whitespace-nowrap border-b-2 transition-colors ${activeTab === tab.id ? "border-teal-500 text-[#008B7D]" : "border-transparent text-gray-500 hover:text-gray-700"}`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-4 mb-4 "> 
          <div className="flex flex-col gap-4">
          <div className=" grid grid-cols-1 lg:grid-cols-[1fr_2fr]  gap-4 "> 
          <div className="bg-white flex-1 rounded-xl border h-full   border-gray-100 shadow-sm p-4 sm:p-5">
            <h3 className="text-sm  font-bold text-gray-900 mb-4">
              Shipment Status &amp; Tracking
            </h3>
            <div className="relative">
              {trackingSteps.map((step, i) => (
                <div key={i} className="flex gap-3 mb-3 last:mb-0">
                  <div className="flex flex-col items-center flex-shrink-0">
                    <StepIcon status={step.status} />
                    {i < trackingSteps.length - 1 && (
                      <div
                        className={`w-0.5 flex-1 mt-1 ${step.status === "completed" ? "bg-teal-400" : "bg-gray-200"}`}
                        style={{ minHeight: 20 }}
                      />
                    )}
                  </div>
                  <div className="flex-1 flex items-start justify-between pb-1">
                    <div>
                      <p
                        className={`text-xs font-bold leading-snug ${step.status === "current" ? "text-orange-500" : step.status === "completed" ? "text-gray-900" : "text-black"}`}
                      >
                        {step.label}
                      </p>
                      <p
                        className={`text-xs font-normal mt-0.5 ${step.status === "pending" ? "text-[#6A7282]" : "text-gray-500"}`}
                      >
                        {step.time}
                      </p>
                    </div>
                    <span
                      className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ml-2 flex-shrink-0 ${step.status === "completed" ? "text-teal-700 border-teal-300 bg-teal-50" : step.status === "current" ? "text-orange-600 border-orange-300 bg-orange-50" : "text-gray-400 border-gray-200 bg-gray-50"}`}
                    >
                      {step.status === "completed"
                        ? "Completed"
                        : step.status === "current"
                          ? "Current"
                          : "Pending"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-4 w-full flex items-center justify-center gap-1.5 border border-teal-400 text-teal-600 text-xs font-semibold rounded-lg py-2.5 hover:bg-teal-50 transition-colors">
              View Full Tracking Details <FiExternalLink size={13} />
            </button>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sm:p-5">
            <h3 className="text-sm  font-bold text-gray-900 mb-4">
              Shipment Information
            </h3>
            <div className="grid grid-cols-2 gap-x-6">
              <InfoRow label="Plan ID" value="PLN-2025-04-24-000123" />
              <InfoRow label="Mode" value="Air Freight" />
              <InfoRow label="Incoterm" value="FOB – Free On Board" />
              <InfoRow label="HS Code" value="HS 5208" />
              <InfoRow label="Goods" value="T-shirts, singlets and other vests, of cotton" />
              <InfoRow label="Quantity" value="500 Kilograms" />
              <InfoRow label="AWB / Packing No." value="AWB-92345678" />
              <InfoRow label="FTD (Departed)" value="26 Apr 2025, 10:00 AM" />
              <InfoRow label="Total Weight" value="500 KG" />
              <InfoRow label="ETA (Arrival)" value="30 Apr 2025, 06:00 AM" />
              <InfoRow label="Total Volume" value="0.8 CBM" />
              <InfoRow label="Transit Time" value="3 – 5 Days" />
              <InfoRow label="Last Updated" value="26 Apr 2025, 08:48 AM" />
              <InfoRow label="Origin" value="Tirupur, India (IN)" />
              <InfoRow label="Destination" value="Dubai, UAE (AE)" />
              <InfoRow
                label="Airline / Carrier"
                value="IndiGo Cargo / Emirates SkyCargo"
              />
            </div>
          </div>
       </div>

          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4 mb-4 ">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sm:p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm sm:text-[15px] font-bold text-gray-900">
                Parties Information
              </h3>
              <button className="text-xs font-semibold text-teal-600 hover:underline whitespace-nowrap">
                View All Party Details
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex flex-col space-y-6">
                <p className="text-xs text-[#4A5565] mb-1">Exporter (Shipper)</p>
                <p className="text-xs font-bold text-gray-900">
                  ABC Exports Pvt. Ltd.
                </p>
                <p className="text-xs text-[#4A5565] mt-1">Tirupur, India</p>
                <p className="text-xs text-[#4A5565]">contact@abcexports.in</p>
                <p className="text-xs text-[#4A5565] mt-1">
                  GST/IN: 29AAACB123456A1ZS
                </p>
              </div>
              <div className="flex flex-col space-y-6">
                <p className="text-xs text-[#4A5565] mb-1">
                  Importer (Consignee)
                </p>
                <p className="text-xs font-bold text-gray-900">
                  XYZ Trading LLC
                </p>
                <p className="text-xs text-gray-500 mt-1">Dubai, UAE</p>
                <p className="text-xs text-gray-500 mt-1">
                  TRN/UAE: 100123456789003
                </p>
              </div>
              <div className="flex flex-col space-y-6">
                <p className="text-xs text-gray-400 mb-1">Notify Party</p>
                <p className="text-xs font-bold text-gray-900">
                  XYZ Trading LLC
                </p>
                <p className="text-xs text-gray-500 mt-1">Dubai, UAE</p>
              </div>
            </div>
          </div>


               <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sm:p-5">
            <h3 className="text-base font-bold text-gray-900 mb-4">
              Cost Summary (INR)
            </h3>
            <div className="space-y-2.5 mb-4">
              {[
                { label: "Freight Charges", value: "₹16,000" },
                { label: "Surcharges & Fees", value: "₹6,200" },
                { label: "Insurance", value: "₹1,300" },
                { label: "Customs Duty & Taxes (Est.)", value: "—" },
                { label: "Other Charges", value: "₹750" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-600">{item.label}</span>
                  <span className="text-sm font-semibold text-gray-800">
                    {item.value}
                  </span>
                </div>
              ))}
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <span className="text-xs font-semibold text-gray-900">
                  Total Estimated Cost
                </span>
                <span className="text-sm font-bold text-teal-600">₹24,860</span>
              </div>
            </div>
            <button className="w-full border border-[#009689] text-xs font-semibold text-[#009689] rounded-lg py-2.5 hover:bg-gray-50 transition-colors">
              View Cost Breakdown
            </button>
          </div>

        </div>
 </div>
          <div className="flex flex-col gap-4 ">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sm:p-5">
              <h3 className="text-sm  font-bold text-gray-900 mb-4">
                Shipment Overview
              </h3>
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Status</span>
                  <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    In Transit
                  </span>
                </div>
                {[
                  {
                    label: "Total Estimated Cost",
                    value: "₹24,860",
                    bold: true,
                  },
                  { label: "Paid Amount", value: "₹0" },
                  { label: "Balance Amount", value: "₹24,860" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{item.label}</span>
                    <span
                      className={`text-xs ${item.bold ? "font-bold text-gray-900" : "font-semibold text-gray-800"}`}
                    >
                      {item.value}
                    </span>
                  </div>
                ))}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Payment Status</span>
                  <span className="text-xs font-semibold text-gray-600 bg-gray-100 border border-gray-200 px-2.5 py-1 rounded-full">
                    Unpaid
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Created On</span>
                  <span className="text-xs font-bold text-gray-900">
                    24 Apr 2025, 09:35 AM
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Created By</span>
                  <span className="text-xs font-bold text-gray-900">
                    Arjun Sen
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sm:p-5">
              <h3 className="text-sm sm:text-[15px] font-bold text-gray-900 mb-3">
                Documents
              </h3>
              <div className="space-y-4">
                {documents.map((doc, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between gap-2  "
                  >
                    <div className="flex items-center gap-2">
                      <MdOutlineDescription
                        size={15}
                        className="text-gray-400 flex-shrink-0"
                      />
                      <span className="text-xs text-gray-800">{doc.name}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`text-xs font-semibold ${doc.statusColor}`}
                      >
                        {doc.status}
                      </span>
                      {doc.icon}
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-3 w-full text-center text-xs sm:text-sm font-semibold text-teal-600 hover:text-teal-700 pt-2 border-t border-gray-100">
                View All Documents
              </button>
            </div>

             <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sm:p-5 space-y-10">
            <div className="flex items-center justify-between mb-3 ">
              <h3 className="text-sm sm:text-[15px] font-bold text-gray-900">
                Shipment Notes
              </h3>
              <button className="flex items-center gap-1 text-xs font-semibold text-teal-600 hover:underline">
                <FiEdit2 size={12} /> Edit Notes
              </button>
            </div>
            <p className="text-xs text-gray-700">
              Urgent shipment for new season launch.
            </p>
          </div>

          </div>
        </div>
      </div>


      
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-4  px-5">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sm:p-5">
            <h3 className="text-sm sm:text-[15px] font-bold text-gray-900 mb-4">
              Additional Information
            </h3>
            <div className="space-y-2.5">
              {[
                { label: "Packaging Type", value: "Carton Box" },
                { label: "No. of Packages", value: "25" },
                { label: "Marks & Numbers", value: "ASD/TRP/SET/500/2025" },
                { label: "Dangerous Goods", value: "No" },
                { label: "Special Handling", value: "No" },
                { label: "Temperature Control", value: "No" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-xs text-[#4A5565]">{item.label}</span>
                  <span className="text-xs font-bold text-gray-900">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
            <button className="mt-4 w-full border border-[#009689] text-xs font-semibold text-[#009689] rounded-lg py-2 hover:bg-gray-50 transition-colors">
              View More Details
            </button>
          </div>


           <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sm:p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm sm:text-[15px] font-bold text-gray-900">
                Activity Log
              </h3>
              <button className="text-xs font-semibold text-[#009689] hover:underline whitespace-nowrap">
                View All Activity
              </button>
            </div>
            <div className="space-y-4">
              {activityLog.map((log, i) => (
                <div key={i} className="flex gap-3">
                  <BsCircleFill
                    size={9}
                    className="text-teal-500 mt-1 flex-shrink-0"
                  />
                  <div>
                    <p className="text-xs text-[#4A5565] font-medium">{log.time}</p>
                    <p className="text-xs font-bold text-gray-900 mt-0.5">
                      {log.title}
                    </p>
                    <p className="text-xs text-[#4A5565] font-semibold mt-0.5">{log.by}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
         

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sm:p-5">
            <h3 className="text-sm sm:text-[15px] font-bold text-gray-900 mb-4">
              Quick Actions
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-3 gap-3">
              {quickActions.map((action, i) => (
                <button
                  key={i}
                  className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className="w-11 h-11 rounded-full fill-[#4B5563] bg-gray-100 flex items-center justify-center">
                    {/* {action.icon} */}
                      {/* {typeof action.icon === "string" ? (
                      <img src={icon} alt="icon" className="w-5 h-5" />
                    ) : (
                      React.createElement(icon, {
                        size: 22,
                        style: { color: iconColor },
                      })
                    )} */}
                    <ImageIcon icon={action.icon} iconColor={"text-gray-600"}/>
                  </div>
                  <span
                    className={`text-xs font-semibold text-center leading-tight ${action.red ? "text-red-500" : "text-gray-600"}`}
                  >
                    {action.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
    </div>
  );
}
