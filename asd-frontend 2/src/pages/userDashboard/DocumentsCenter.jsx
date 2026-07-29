import { useState } from "react";
import {
  FiSearch,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiMoreVertical,
  FiDownload,
} from "react-icons/fi";
import { MdOutlineUpload, MdOutlineDescription } from "react-icons/md";
import {
  BsCircleFill,
  BsArrowUpShort,
  BsFileEarmarkPdf,
  BsFileEarmarkExcel,
  BsFileEarmark,
} from "react-icons/bs";
import { FaRegFileAlt } from "react-icons/fa";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import chart from "../../assets/Images/webp/chart.webp";
import invoice from "../../assets/Images/webp/invoice.webp";
import ImageIcon from "../../components/core/ImageIcon";

const stats = [
  { label: "Total Documents", value: "128", sub: "All shipments" },
  { label: "Required", value: "86", sub: "Pending / Required" },
  { label: "If Applicable", value: "18", sub: "Conditional" },
  { label: "Not Required", value: "24", sub: "Not needed" },
  { label: "Expiring Soon", value: "5", sub: "Within 15 days" },
  { label: "Uploaded This Month", value: "32", sub: "↑ 12% vs last month" },
];

const documents = [
  {
    name: "Commercial Invoice",
    fileType: "PDF",
    fileSize: "245 KB",
    iconType: "pdf",
    shipmentId: "PLN-2025-04-24-000123",
    shipmentRoute: "Tirupur to Dubai",
    docType: "Required",
    docTypeColor: "text-teal-700 bg-teal-50 border border-teal-200",
    status: "Uploaded",
    statusColor: "text-gray-900",
    statusDot: "text-green-500",
    uploadedOn: "24 Apr 2025, 09:25 AM",
    uploadedBy: "Arjun Soni",
    expiryDate: null,
    expiryNote: null,
    showDownload: true,
  },
  {
    name: "Packing List",
    fileType: "XLSX",
    fileSize: "180 KB",
    iconType: "xlsx",
    shipmentId: "PLN-2025-04-24-000123",
    shipmentRoute: "Tirupur to Dubai",
    docType: "Required",
    docTypeColor: "text-teal-700 bg-teal-50 border border-teal-200",
    status: "Uploaded",
    statusColor: "text-gray-900",
    statusDot: "text-green-500",
    uploadedOn: "24 Apr 2025, 09:28 AM",
    uploadedBy: "Arjun Soni",
    expiryDate: null,
    expiryNote: null,
    showDownload: true,
  },
  {
    name: "Certificate of Origin",
    fileType: "PDF",
    fileSize: "156 KB",
    iconType: "pdf",
    shipmentId: "PLN-2025-04-24-000123",
    shipmentRoute: "Tirupur to Dubai",
    docType: "If Applicable",
    docTypeColor: "text-blue-600 bg-blue-50 border border-blue-200",
    status: "Uploaded",
    statusColor: "text-gray-900",
    statusDot: "text-green-500",
    uploadedOn: "24 Apr 2025, 10:05 AM",
    uploadedBy: "Arjun Soni",
    expiryDate: "23 Oct 2025",
    expiryNote: "180 days left",
    showDownload: true,
  },
  {
    name: "Airway Bill",
    fileType: "PDF",
    fileSize: "312 KB",
    iconType: "pdf",
    shipmentId: "PLN-2025-04-24-000123",
    shipmentRoute: "Tirupur to Dubai",
    docType: "Required",
    docTypeColor: "text-teal-700 bg-teal-50 border border-teal-200",
    status: "Uploaded",
    statusColor: "text-gray-900",
    statusDot: "text-green-500",
    uploadedOn: "24 Apr 2025, 11:30 AM",
    uploadedBy: "Arjun Soni",
    expiryDate: null,
    expiryNote: null,
    showDownload: true,
  },
  {
    name: "Export License",
    fileType: "PDF",
    fileSize: "210 KB",
    iconType: "pdf",
    shipmentId: "PLN-2025-04-24-000123",
    shipmentRoute: "Tirupur to Dubai",
    docType: "Not Required",
    docTypeColor: "text-gray-500 bg-gray-100 border border-gray-200",
    status: "Not Required",
    statusColor: "text-gray-500",
    statusDot: "text-gray-400",
    uploadedOn: "–",
    uploadedBy: "–",
    expiryDate: null,
    expiryNote: null,
    showDownload: true,
  },
  {
    name: "Insurance Certificate",
    fileType: "PDF",
    fileSize: "198 KB",
    iconType: "pdf",
    shipmentId: "PLN-2025-04-24-000123",
    shipmentRoute: "Tirupur to Dubai",
    docType: "If Applicable",
    docTypeColor: "text-blue-600 bg-blue-50 border border-blue-200",
    status: "Pending Upload",
    statusColor: "text-orange-500",
    statusDot: "text-orange-400",
    uploadedOn: "–",
    uploadedBy: "–",
    expiryDate: null,
    expiryNote: null,
    showUpload: true,
  },
  {
    name: "Other Certificates",
    fileType: null,
    fileSize: null,
    iconType: "other",
    shipmentId: "PLN-2025-04-24-000123",
    shipmentRoute: "Tirupur to Dubai",
    docType: "Not Required",
    docTypeColor: "text-gray-500 bg-gray-100 border border-gray-200",
    status: "Not Required",
    statusColor: "text-gray-500",
    statusDot: "text-gray-400",
    uploadedOn: "–",
    uploadedBy: "–",
    expiryDate: null,
    expiryNote: null,
    showDownload: false,
  },
];

const recentUploads = [
  {
    name: "Commercial Invoice",
    id: "PLN-2025-04-24-000123",
    time: "24 Apr 2025, 09:25 AM",
    iconType: invoice,
  },
  {
    name: "Packing List",
    id: "PLN-2025-04-24-000123",
    time: "24 Apr 2025, 09:28 AM",
    iconType: chart,
  },
  {
    name: "Certificate of Origin",
    id: "PLN-2025-04-24-000123",
    time: "24 Apr 2025, 10:05 AM",
    iconType: invoice,
  },
];

const templates = [
  "Commercial Invoice Template",
  "Packing List Template",
  "Certificate of Origin Template",
  "Airway Bill Template",
];

const helpLinks = [
  "How to upload documents",
  "Document guidelines",
  "Supported file formats",
  "FAQs",
];

const storageData = [
  { name: "Invoices", value: 1.2, color: "#3b82f6" },
  { name: "Certificates", value: 0.7, color: "#93c5fd" },
  { name: "Others", value: 0.5, color: "#d1d5db" },
];

const docTabs = [
  "All Documents",
  "Required",
  "If Applicable",
  "Not Required",
  "Expiring Soon",
];

function DocIcon({ type }) {
  if (type === "pdf")
    return (
      <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0">
        <BsFileEarmarkPdf size={16} className="text-red-500" />
      </div>
    );
  if (type === "xlsx")
    return (
      <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
        <BsFileEarmarkExcel size={16} className="text-green-600" />
      </div>
    );
  return (
    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
      <BsFileEarmark size={16} className="text-gray-500" />
    </div>
  );
}

export default function DocumentsCenter() {
  const [activeTab, setActiveTab] = useState("All Documents");
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="min-h-screen bg-gray-50 font-sans pt-14">
      <div className="max-w-[1400px] mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
          <div>
            <p className="text-xs text-gray-400 mb-1">
              Dashboard &gt; Documents Center
            </p>
            <h1 className="text-xl  font-bold text-[#16213E]">
              Documents Center
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              Manage, view, and organize all your shipment documents in one
              place.
            </p>
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

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-5">
          {stats.map((s, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-200 p-3 sm:p-4 shadow-sm"
            >
              <p className="text-xs text-gray-500 font-bold mb-1">{s.label}</p>
              <p className="text-lg  font-bold text-gray-900 leading-tight">
                {s.value}
              </p>
              <p className="text-xs font-bold text-[#7B88A8] mt-1">{s.sub}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-2 flex-wrap mb-4">
          <div className="relative flex-1 min-w-[200px]">
            <FiSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={14}
            />
            <input
              className="w-full border border-gray-200 rounded-lg pl-8 pr-3 py-2 text-xs sm:text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-teal-400 bg-white"
              placeholder="Search document by name, type or shipment ID..."
            />
          </div>
          {["All Shipments", "All Types", "All Status", "All Users"].map(
            (f, i) => (
              <button
                key={i}
                className="flex items-center gap-1 text-xs font-medium text-gray-700 border border-gray-200 rounded-lg px-3 py-2 bg-white hover:bg-gray-50 whitespace-nowrap"
              >
                {f} <FiChevronDown size={11} />
              </button>
            ),
          )}
          <button className="text-xs font-medium text-gray-500 border border-gray-200 rounded-lg px-3 py-2 bg-white hover:bg-gray-50 whitespace-nowrap">
            More Filters
          </button>
          <button className="text-xs font-medium text-gray-500 border border-gray-200 rounded-lg px-3 py-2 bg-white hover:bg-gray-50 whitespace-nowrap">
            Clear All
          </button>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm mb-5">
          <div className="flex items-center gap-0 border-b border-gray-100 overflow-x-auto">
            {docTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-xs   font-semibold px-4 py-3 whitespace-nowrap border-b-2 transition-colors ${activeTab === tab ? "border-teal-500 text-[#14B7AD]" : "border-transparent text-[#7180A5]"}`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="border-b border-gray-100">
                  {[
                    "Document Name",
                    "Shipment ID",
                    "Document Type",
                    "Status",
                    "Uploaded On",
                    "Uploaded By",
                    "Expiry Date",
                    "Actions",
                  ].map((h, i) => (
                    <th
                      key={i}
                      className="text-left text-[10px] font-semibold text-gray-500 px-4 py-3 whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {documents.map((doc, i) => (
                  <tr
                    key={i}
                    className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <DocIcon type={doc.iconType} />
                        <div>
                          <p className="text-xs font-bold text-[#16213E]">
                            {doc.name}
                          </p>
                          {doc.fileType && (
                            <p className="text-[10px]  text-gray-400">
                              {doc.fileType} – {doc.fileSize}
                            </p>
                          )}
                          {!doc.fileType && (
                            <p className="text-[10px] text-gray-400">–</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-xs font-bold text-[#16213E]">
                        {doc.shipmentId}
                      </p>
                      <p className="text-[10px] text-gray-400">
                        {doc.shipmentRoute}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-[10px] font-bold px-2 py-1 rounded-full ${doc.docTypeColor} whitespace-nowrap`}
                      >
                        {doc.docType}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <BsCircleFill size={7} className={doc.statusDot} />
                        <span
                          className={`text-xs font-bold ${doc.statusColor}`}
                        >
                          {doc.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-700 whitespace-nowrap">
                      {doc.uploadedOn}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-700">
                      {doc.uploadedBy}
                    </td>
                    <td className="px-4 py-3">
                      {doc.expiryDate ? (
                        <div>
                          <p className="text-xs font-bold text-[#16213E]">
                            {doc.expiryDate}
                          </p>
                          <p className="text-[10px] text-teal-600">
                            {doc.expiryNote}
                          </p>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400">–</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        {doc.showUpload && (
                          <button className="text-[10px] font-semibold text-[#11AA8F] border border-gray-200 rounded-lg px-2.5 py-1.5 hover:bg-gray-50 whitespace-nowrap">
                            Upload
                          </button>
                        )}
                        {doc.showDownload && (
                          <button className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-600 rounded border border-gray-200 hover:bg-gray-50">
                            <FiDownload size={12} />
                          </button>
                        )}
                        <button className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-600 rounded">
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
            <p className="text-xs text-gray-500">
              Showing 1 to 7 of 128 documents
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 text-gray-500 hover:bg-gray-50"
              >
                <FiChevronLeft size={13} />
              </button>
              {[1, 2, 3].map((p) => (
                <button
                  key={p}
                  onClick={() => setCurrentPage(p)}
                  className={`w-7 h-7 flex items-center justify-center rounded text-xs font-medium ${currentPage === p ? "bg-teal-500 text-white border border-teal-500" : "border border-gray-200 text-gray-600 hover:bg-gray-50"}`}
                >
                  {p}
                </button>
              ))}
              <span className="text-xs text-gray-400 px-1">...</span>
              <button
                onClick={() => setCurrentPage(18)}
                className={`w-7 h-7 flex items-center justify-center rounded text-xs font-medium ${currentPage === 18 ? "bg-teal-500 text-white border border-teal-500" : "border border-gray-200 text-gray-600 hover:bg-gray-50"}`}
              >
                18
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.min(18, p + 1))}
                className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 text-gray-500 hover:bg-gray-50"
              >
                <FiChevronRight size={13} />
              </button>
              <div className="flex items-center gap-1 ml-2">
                <span className="text-xs text-gray-500">Rows per page:</span>
                <button className="flex items-center gap-1 text-xs font-semibold text-gray-700 border border-gray-200 rounded px-2 py-1">
                  10 <FiChevronDown size={10} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-2">
          <div className="bg-white rounded-xl border flex flex-col gap-5 border-gray-100 shadow-sm p-4 sm:p-5">
            <h3 className="text-sm sm:text-[15px] font-bold text-gray-900 mb-4">
              Document Storage
            </h3>
            <div className="flex items-center gap-4 flex-1">
              <div className="relative flex-shrink-0">
                <ResponsiveContainer width={90} height={90}>
                  <PieChart>
                    <Pie
                      data={storageData}
                      cx="50%"
                      cy="50%"
                      innerRadius={28}
                      outerRadius={42}
                      dataKey="value"
                      paddingAngle={2}
                    >
                      {storageData.map((e, i) => (
                        <Cell key={i} fill={e.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-sm font-bold text-gray-900">
                    2.4 GB
                  </span>
                  <span className="text-[9px] text-gray-400">
                    of 10 GB used
                  </span>
                </div>
              </div>
              <div className="space-y-1.5">
                {storageData.map((d, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ background: d.color }}
                      ></span>
                      <span className="text-xs font-bold text-[#41506F]">
                        {d.name}
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-gray-800">
                      {d.value} GB
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <button className="mt-4 w-full text-center text-xs font-bold text-teal-600 hover:text-teal-700 pt-3 border-t border-gray-100">
              View Storage Details
            </button>
          </div>

          <div className="bg-white rounded-xl border flex flex-col gap-5 border-gray-100 shadow-sm p-4 sm:p-5">
            <h3 className="text-sm sm:text-[15px] font-bold text-gray-900 mb-4">
              Recent Uploads
            </h3>
            <div className="space-y-3">
              {recentUploads.map((r, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  {/* <DocIcon type={r.iconType} /> */}
                  <div className="w-6 h-6 rounded-md">
                    <ImageIcon icon={r.iconType} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-gray-900 truncate">
                      {r.name}
                    </p>
                    <p className="text-[10px] text-gray-400">{r.id}</p>
                    <p className="text-[10px] text-gray-400">{r.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-4 w-full text-center text-xs  font-bold text-teal-600 hover:text-teal-700 pt-3 border-t border-gray-100">
              View All
            </button>
          </div>

          <div className="bg-white rounded-xl border flex flex-col gap-5 border-gray-100 shadow-sm p-4 sm:p-5">
            <h3 className="text-sm sm:text-[15px] font-bold text-gray-900 mb-1">
              Document Templates
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              Use our ready templates to create documents faster.
            </p>
            <div className="space-y-3">
              {templates.map((t, i) => (
                <div key={i} className="flex items-center gap-2">
                  <MdOutlineDescription
                    size={15}
                    className="text-[#2373FF] flex-shrink-0"
                  />
                  <span className="text-xs font-medium text-[#2373FF] hover:underline cursor-pointer">
                    {t}
                  </span>
                </div>
              ))}
            </div>
            <button className="mt-4 w-full text-center text-xs  font-bold text-teal-600 hover:text-teal-700 pt-3 border-t border-gray-100">
              View All Templates
            </button>
          </div>

          <div className="bg-white rounded-xl border flex flex-col gap-5 border-gray-100 shadow-sm p-4 sm:p-5">
            <h3 className="text-sm sm:text-[15px] font-bold text-gray-900 mb-1">
              Need Help?
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              Learn how to manage your documents efficiently.
            </p>
            <div className="space-y-3">
              {helpLinks.map((h, i) => (
                <div key={i} className="flex items-center gap-2">
                  <MdOutlineDescription
                    size={15}
                    className="text-[#2373FF] flex-shrink-0"
                  />
                  <span className="text-xs font-medium text-[#2373FF] hover:underline cursor-pointer">
                    {h}
                  </span>
                </div>
              ))}
            </div>
            <button className="mt-4 w-full text-center text-xs font-bold text-teal-600 hover:text-teal-700 pt-3 border-t border-gray-100">
              Visit Help Center
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
