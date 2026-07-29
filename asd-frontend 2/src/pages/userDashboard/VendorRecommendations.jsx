import { useState } from "react";
import { FiSearch, FiChevronDown, FiChevronLeft, FiChevronRight, FiMoreVertical, FiPhone, FiMail, FiClock, FiMessageSquare } from "react-icons/fi";
import { MdOutlineLocalShipping, MdOutlineUpload, MdOutlineDescription, MdOutlineWarehouse, MdOutlineInventory } from "react-icons/md";
import { BsStarFill, BsStarHalf, BsStar, BsCircleFill, BsArrowUpShort } from "react-icons/bs";
import { FaPlane, FaTruck, FaFileAlt, FaLink, FaBox } from "react-icons/fa";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const stats = [
{ label: "Total Documents", value: "128", sub: "All shipments", subColor: "text-[#7B88A8]" },
{ label: "Required", value: "86", sub: "Pending / Required", subColor: "text-[#7B88A8]" },
{ label: "If Applicable", value: "18", sub: "Conditional", subColor: "text-[#7B88A8]" },
{ label: "Not Required", value: "24", sub: "Not needed", subColor: "text-[#7B88A8]" },
{ label: "Expiring Soon", value: "5", sub: "Within 15 days", subColor: "text-[#7B88A8]" },
{ label: "Uploaded This Month", value: "32", sub: "↑ 12% vs last month", subColor: "text-[#7B88A8]" },
];

const vendors = [
  {
    id: 1, name: "IndiGo Cargo", type: "Freight Forwarder", location: "Mumbai, India", location2: "Dubai, UAE",
    rating: 4.8, reviews: 128, matchScore: 92, bestMatch: true,
    cost: "₹24,200", costNote: "All Inclusive", transit: "3 - 5 Days", responseTime: "35 mins", responseStatus: "Responded",
    icons: ["plane", "doc", "truck"], avatarBg: "bg-blue-100", avatarColor: "text-blue-600", avatarIcon: "plane",
  },
  {
    id: 2, name: "Emirates SkyCargo", type: "Freight Forwarder", location: "New Delhi, India", location2: "Dubai, UAE",
    rating: 4.6, reviews: 96, matchScore: 88, bestMatch: false,
    cost: "₹25,450", costNote: "All Inclusive", transit: "3 - 5 Days", responseTime: "1 hr 10 mins", responseStatus: "Responded",
    icons: ["plane", "doc"], avatarBg: "bg-red-100", avatarColor: "text-red-500", avatarIcon: "plane",
  },
  {
    id: 3, name: "DHL Global Forwarding", type: "Freight Forwarder", location: "Bangalore, India", location2: "Dubai, UAE",
    rating: 4.5, reviews: 210, matchScore: 85, bestMatch: false,
    cost: "₹26,800", costNote: "All Inclusive", transit: "3 - 6 Days", responseTime: "2 hrs", responseStatus: "Responded",
    icons: ["plane", "truck"], avatarBg: "bg-yellow-100", avatarColor: "text-yellow-600", avatarIcon: "plane",
  },
  {
    id: 4, name: "Gati Express", type: "Transporter (Local)", location: "Tirupur, India", location2: "Coimbatore, India",
    rating: 4.3, reviews: 76, matchScore: 78, bestMatch: false,
    cost: "₹4,500", costNote: "Per Shipment", transit: "1 Day", responseTime: "45 mins", responseStatus: "Responded",
    icons: ["truck"], avatarBg: "bg-purple-100", avatarColor: "text-purple-600", avatarIcon: "truck",
  },
  {
    id: 5, name: "AAA Customs Brokers", type: "Customs Broker", location: "Mumbai, India", location2: "Dubai, UAE",
    rating: 4.2, reviews: 54, matchScore: 75, bestMatch: false,
    cost: "₹3,200", costNote: "Per Shipment", transit: "–", responseTime: "3 hrs", responseStatus: "Responded",
    icons: ["plane", "doc", "link"], avatarBg: "bg-gray-200", avatarColor: "text-gray-700", avatarText: "AA",
  },
  {
    id: 6, name: "SafePack Solutions", type: "Packing & Handling", location: "Tirupur, India", location2: "–",
    rating: 4.1, reviews: 39, matchScore: 72, bestMatch: false,
    cost: "₹2,800", costNote: "Per Shipment", transit: "–", responseTime: "5 hrs", responseStatus: "Pending",
    icons: ["box"], avatarBg: "bg-teal-100", avatarColor: "text-teal-600", avatarIcon: "box",
  },
  {
    id: 7, name: "DTDC Logistics", type: "Transporter (Local)", location: "Tirupur, India", location2: "Coimbatore, India",
    rating: 3.9, reviews: 32, matchScore: 68, bestMatch: false,
    cost: "₹5,200", costNote: "Per Shipment", transit: "1 - 2 Days", responseTime: "8 hrs", responseStatus: "Pending",
    icons: ["truck"], avatarBg: "bg-red-100", avatarColor: "text-red-500", avatarText: "D",
  },
];

const insightData = [
  { name: "Freight Forwarder", value: 12, pct: "50%", color: "#3b82f6" },
  { name: "Transporter (Local)", value: 6, pct: "25%", color: "#8b5cf6" },
  { name: "Customs Broker", value: 3, pct: "13%", color: "#10b981" },
  { name: "Others", value: 3, pct: "12%", color: "#d1d5db" },
];

function StarRating({ rating }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <div className="flex items-center gap-0.5">
      {Array(full).fill(0).map((_, i) => <BsStarFill key={i} size={11} className="text-yellow-400" />)}
      {half && <BsStarHalf size={11} className="text-yellow-400" />}
      {Array(empty).fill(0).map((_, i) => <BsStar key={i} size={11} className="text-gray-300" />)}
    </div>
  );
}

function VendorIcon({ type }) {
  if (type === "plane") return <FaPlane size={12} className="text-teal-500" />;
  if (type === "truck") return <FaTruck size={12} className="text-teal-500" />;
  if (type === "doc") return <FaFileAlt size={12} className="text-teal-500" />;
  if (type === "link") return <FaLink size={12} className="text-teal-500" />;
  if (type === "box") return <FaBox size={12} className="text-teal-500" />;
  return null;
}

function AvatarCell({ v }) {
  return (
    <div className={`w-9 h-9 rounded-lg ${v.avatarBg} flex items-center justify-center flex-shrink-0`}>
      {v.avatarText ? (
        <span className={`text-xs font-bold ${v.avatarColor}`}>{v.avatarText}</span>
      ) : v.avatarIcon === "plane" ? (
        <FaPlane size={16} className={v.avatarColor} />
      ) : v.avatarIcon === "truck" ? (
        <FaTruck size={16} className={v.avatarColor} />
      ) : v.avatarIcon === "box" ? (
        <FaBox size={16} className={v.avatarColor} />
      ) : null}
    </div>
  );
}

export default function VendorRecommendations() {
  const [currentPage, setCurrentPage] = useState(1);
  const [serviceFilters, setServiceFilters] = useState({ allServices: true, freightForwarder: false, customsBroker: false, transporter: false, warehouse: false, packing: false });
  const [ratingFilters, setRatingFilters] = useState({ r45: false, r40: false, r30: false });
  const [responseFilters, setResponseFilters] = useState({ r2: false, r6: false, r24: false, anytime: false });

  return (
    <div className="min-h-screen bg-gray-50 font-sans pt-14">
      <div className="max-w-[1400px] mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">

        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
          <div>
            <p className="text-xs text-gray-400 mb-1">Dashboard &gt; Vendor Recommendations</p>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Vendor Recommendations</h1>
            <p className="text-xs  text-gray-500 mt-0.5">Manage, view, and organize all your shipment documents in one place.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-gray-700 border border-gray-300 rounded-lg px-3 py-2 bg-white hover:bg-gray-50 whitespace-nowrap">
              <MdOutlineUpload size={14} /> Upload Document
            </button>
            <button className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-gray-700 border border-gray-300 rounded-lg px-3 py-2 bg-white hover:bg-gray-50 whitespace-nowrap">
              <MdOutlineDescription size={14} /> Document Templates
            </button>
            <button className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-white bg-teal-500 hover:bg-teal-600 rounded-lg px-3 py-2 whitespace-nowrap">
              + Add to Shipment
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-0 mb-5 bg-white rounded-xl border  overflow-hidden shadow-sm">
          {stats.map((s, i) => (
            <div key={i} className={`p-3 sm:p-4 ${i < stats.length - 1 ? "border-r border-gray-100" : ""}`}>
              <p className="text-xs text-[#16213E] font-medium mb-1">{s.label}</p>
              <p className="text-lg font-bold text-[#16213E] leading-tight">{s.value}</p>
              <p className={`text-xs font-medium mt-1 ${s.subColor}`}>{s.sub}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-2 flex-wrap mb-5">
          <div className="relative flex-1 min-w-[200px]">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            <input className="w-full border border-gray-200 rounded-lg pl-8 pr-3 py-2 text-xs sm:text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-teal-400 bg-white" placeholder="Search vendors by name, service type, or location..." />
          </div>
          {["All Shipments", "All Types", "All Status", "All Users"].map((f, i) => (
            <button key={i} className="flex items-center gap-1 text-xs font-medium text-gray-700 border border-gray-200 rounded-lg px-3 py-2 bg-white hover:bg-gray-50 whitespace-nowrap">
              {f} <FiChevronDown size={11} />
            </button>
          ))}
          <button className="text-xs font-medium text-gray-500 border border-gray-200 rounded-lg px-3 py-2 bg-white hover:bg-gray-50 whitespace-nowrap">More Filters</button>
          <button className="text-xs font-medium text-gray-500 border border-gray-200 rounded-lg px-3 py-2 bg-white hover:bg-gray-50 whitespace-nowrap">Clear All</button>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 mb-5">
          <div className="w-full lg:w-52 flex-shrink-0">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
              <h3 className="text-sm font-bold text-gray-900 mb-3">Filters</h3>
              <p className="text-xs font-semibold text-gray-700 mb-2">Service Type</p>
              <div className="space-y-2 mb-4">
                {[
                  { key: "allServices", label: "All Services", checked: serviceFilters.allServices },
                  { key: "freightForwarder", label: "Freight Forwarder", checked: serviceFilters.freightForwarder },
                  { key: "customsBroker", label: "Customs Broker", checked: serviceFilters.customsBroker },
                  { key: "transporter", label: "Transporter (Local)", checked: serviceFilters.transporter },
                  { key: "warehouse", label: "Warehouse", checked: serviceFilters.warehouse },
                  { key: "packing", label: "Packing & Handling", checked: serviceFilters.packing },
                ].map((f, i) => (
                  <label key={i} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={f.checked} onChange={() => setServiceFilters(p => ({ ...p, [f.key]: !p[f.key] }))}
                      className="w-3.5 h-3.5 accent-teal-500 rounded" />
                    <span className="text-xs text-gray-700">{f.label}</span>
                  </label>
                ))}
              </div>
              <p className="text-xs font-semibold text-gray-700 mb-2">Rating</p>
              <div className="space-y-2 mb-4">
                {[
                  { key: "r45", label: "4.5 & above", stars: 4.5 },
                  { key: "r40", label: "4.0 & above", stars: 4.0 },
                  { key: "r30", label: "3.0 & above", stars: 3.0 },
                ].map((f, i) => (
                  <label key={i} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={ratingFilters[f.key]} onChange={() => setRatingFilters(p => ({ ...p, [f.key]: !p[f.key] }))}
                      className="w-3.5 h-3.5 accent-teal-500 rounded" />
                    <StarRating rating={f.stars} />
                    <span className="text-xs text-gray-600">{f.label}</span>
                  </label>
                ))}
              </div>
              <p className="text-xs font-semibold text-gray-700 mb-2">Response Time</p>
              <div className="space-y-2 mb-4">
                {["Within 2 hrs", "Within 6 hrs", "Within 24 hrs", "Anytime"].map((f, i) => (
                  <label key={i} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-3.5 h-3.5 accent-teal-500 rounded" />
                    <span className="text-xs text-gray-700">{f}</span>
                  </label>
                ))}
              </div>
              <button className="w-full border border-gray-300 text-xs font-semibold text-gray-700 rounded-lg py-2 hover:bg-gray-50 transition-colors">Reset Filters</button>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4 accent-teal-500 rounded" />
                  <h3 className="text-sm font-bold text-gray-900">Recommended Vendors (24)</h3>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-gray-500">Sort by:</span>
                  <button className="flex items-center gap-1 text-xs font-semibold text-gray-800 hover:text-teal-600">Best Match <FiChevronDown size={12} /></button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px]">
                  <thead>
                    <tr className="border-b border-gray-100">
                      {["VENDOR NAME", "SERVICE TYPE", "LOCATION", "RATING", "MATCH SCORE", "EST. COST (INR)", "EST. TRANSIT TIME", "RESPONSE TIME", "ACTIONS"].map((h, i) => (
                        <th key={i} className="text-left text-[10px] font-semibold text-gray-500 px-3 py-2.5 whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {vendors.map((v, i) => (
                      <tr key={v.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-2.5">
                            <AvatarCell v={v} />
                            <div>
                              <p className="text-xs font-semibold text-gray-900">{v.name}</p>
                              <p className="text-[10px] text-gray-400">{v.type}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-1.5">
                            {v.icons.map((ic, idx) => <VendorIcon key={idx} type={ic} />)}
                          </div>
                        </td>
                        <td className="px-3 py-3">
                          <p className="text-xs text-gray-800">{v.location}</p>
                          <p className="text-[10px] text-gray-400">{v.location2}</p>
                        </td>
                        <td className="px-3 py-3">
                          <StarRating rating={v.rating} />
                          <p className="text-[10px] text-gray-400 mt-0.5">({v.reviews})</p>
                        </td>
                        <td className="px-3 py-3">
                          <p className="text-xs font-bold text-gray-900">{v.matchScore}%</p>
                          {v.bestMatch && (
                            <span className="text-[10px] font-semibold text-teal-700 bg-teal-50 border border-teal-200 px-1.5 py-0.5 rounded mt-0.5 inline-block">Best Match</span>
                          )}
                        </td>
                        <td className="px-3 py-3">
                          <p className="text-xs font-semibold text-gray-900">{v.cost}</p>
                          <p className="text-[10px] text-gray-400">{v.costNote}</p>
                        </td>
                        <td className="px-3 py-3">
                          <p className="text-xs text-gray-800">{v.transit}</p>
                        </td>
                        <td className="px-3 py-3">
                          <p className="text-xs text-gray-800">{v.responseTime}</p>
                          <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded mt-0.5 inline-block ${v.responseStatus === "Responded" ? "text-green-700 bg-green-50" : "text-gray-500 bg-gray-100"}`}>
                            {v.responseStatus}
                          </span>
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-1">
                            <button className="text-[10px] font-semibold text-gray-700 border border-gray-200 rounded-lg px-2.5 py-1.5 hover:bg-gray-50 whitespace-nowrap">View Profile</button>
                            <button className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 rounded">
                              <FiMoreVertical size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t border-gray-100">
                <p className="text-xs text-gray-500">Showing 1 to 7 of 24 vendors</p>
                <div className="flex items-center gap-1">
                  <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 text-gray-500 hover:bg-gray-50">
                    <FiChevronLeft size={13} />
                  </button>
                  {[1, 2, 3].map(p => (
                    <button key={p} onClick={() => setCurrentPage(p)} className={`w-7 h-7 flex items-center justify-center rounded text-xs font-medium ${currentPage === p ? "bg-teal-500 text-white border border-teal-500" : "border border-gray-200 text-gray-600 hover:bg-gray-50"}`}>{p}</button>
                  ))}
                  <button onClick={() => setCurrentPage(p => Math.min(3, p + 1))} className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 text-gray-500 hover:bg-gray-50">
                    <FiChevronRight size={13} />
                  </button>
                  <div className="flex items-center gap-1 ml-2">
                    <span className="text-xs text-gray-500">Rows per page:</span>
                    <button className="flex items-center gap-1 text-xs font-semibold text-gray-700 border border-gray-200 rounded px-2 py-1">10 <FiChevronDown size={10} /></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sm:p-5">
            <h3 className="text-sm sm:text-[15px] font-bold text-gray-900 mb-1">Cost Comparison</h3>
            <p className="text-xs text-gray-500 mb-3">Average Estimated Cost (INR)</p>
            <p className="text-sm font-bold text-teal-600 mb-4">₹24,860</p>
            <div className="flex justify-between mb-12">
              <div>
                <p className="text-[10px] text-gray-400 font-semibold mb-1">LOWEST</p>
                <p className="text-sm font-bold text-teal-600">₹22,400</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-gray-400 font-semibold mb-1">HIGHEST</p>
                <p className="text-sm font-bold text-red-500">₹31,200</p>
              </div>
            </div>
            <button className="w-full text-center text-sm font-semibold text-teal-600 hover:text-teal-700 pt-2 border-t border-gray-100">View Detailed Comparison</button>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sm:p-5">
            <h3 className="text-sm sm:text-[15px] font-bold text-gray-900 mb-1">Transit Time Comparison</h3>
            <p className="text-xs text-gray-500 mb-3">Average Transit Time</p>
            <p className="text-sm font-bold text-teal-600 mb-4">3 - 5 Days</p>
            <div className="flex justify-between mb-12 flex-1 ">
              <div>
                <p className="text-[10px] text-gray-400 font-semibold mb-1">FASTEST</p>
                <p className="text-sm font-bold text-teal-600">2 - 3 Days</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-gray-400 font-semibold mb-1">SLOWEST</p>
                <p className="text-sm font-bold text-red-500">5 - 7 Days</p>
              </div>
            </div>
            <button className="w-full text-center text-sm font-semibold text-teal-600 hover:text-teal-700 pt-2 border-t border-gray-100">View Detailed Comparison</button>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sm:p-5">
            <h3 className="text-sm sm:text-[15px] font-bold text-gray-900 mb-3">Vendor Insights</h3>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative flex-shrink-0">
                <ResponsiveContainer width={110} height={110}>
                  <PieChart>
                    <Pie data={insightData} cx="50%" cy="50%" innerRadius={32} outerRadius={50} dataKey="value" paddingAngle={2}>
                      {insightData.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-1.5 w-full">
                {insightData.map((d, i) => (
                  <div key={i} className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <BsCircleFill size={7} style={{ color: d.color }} />
                      <span className="text-xs  text-[#64748B]">{d.name}</span>
                    </div>
                    <span className="text-xs font-semibold text-gray-700 whitespace-nowrap">{d.value} ({d.pct})</span>
                  </div>
                ))}
              </div>
            </div>
            <button className="w-full text-center text-sm font-semibold text-teal-600 hover:text-teal-700 pt-3 mt-3 border-t border-gray-100">View All Insights</button>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sm:p-5">
            <h3 className="text-sm sm:text-[15px] font-bold text-gray-900 mb-1">Need Help?</h3>
            <p className="text-xs text-gray-500 mb-4">Our team is here to help you find the best vendors.</p>
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <FiPhone size={14} className="text-gray-500 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-gray-800 font-medium">+91 22 12345 6678</span>
              </div>
              <div className="flex items-center gap-2.5">
                <FiMail size={14} className="text-gray-500 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-gray-800 font-medium break-all">support@asdcargomate.com</span>
              </div>
              <div className="flex items-start gap-2.5">
                <FiClock size={14} className="text-gray-500 flex-shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-gray-800 font-medium">Mon - Sat, 9:00 AM - 6:00 PM</span>
              </div>
            </div>
            <button className="mt-4 w-full flex items-center justify-center gap-2 border border-gray-300 text-xs sm:text-sm font-bold text-gray-800 rounded-lg py-2.5 hover:bg-gray-50 transition-colors">
              Chat with Expert <FiMessageSquare size={14} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}