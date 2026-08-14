import { useState } from "react";
import { Clock, FileText, FileClock, Timer, Search } from "lucide-react";
import {
  FaPlus, FaMagnifyingGlass, FaXmark, FaChevronDown,
  FaStar, FaTruck, FaBoxOpen, FaWarehouse, FaFileContract
} from "react-icons/fa6";
import ReviewShipment from "./ReviewShipment"
const initialRequests = [
  {
    id: "REQ-2505-0012",
    company: "Global Exports Pvt. Ltd.",
    email: "info@globalexports.com",
    phone: "+91 98765 43210",
    route: "India ---- USA",
    submittedOn: "16 May 2025, 10:30 AM",
    shipmentType: "Export",
    status: "Pending Review",
    documentsUploaded: 7,
    riskScore: "Low (18/100)",
    compliance: "Eligible (2.5%)",
  },
];

const stats = [
  { icon: FileText, iconColor: "text-orange-500", bg: "bg-orange-50", label: "Total Pending", value: "8", sub: "Requests" },
  { icon: FileClock, iconColor: "text-blue-500", bg: "bg-blue-50", label: "New Today", value: "3", sub: "Requests" },
  { icon: Timer, iconColor: "text-red-500", bg: "bg-red-50", label: "Due for review", value: "5", sub: "Requests" },
  { icon: Clock, iconColor: "text-green-500", bg: "bg-green-50", label: "Avg. Review time", value: "3.5 Hours", sub: "Approx." },
];

export default function PendingReviews({setPendingReview,}) {
  const [requests, setRequests] = useState(
    Array.from({ length: 8 }, (_, i) => ({ ...initialRequests[0], key: i }))
  );
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(requests[0]);
  const [reviews, setReviews] = useState(false)
  const filtered = requests.filter((r) => {
    const term = search.toLowerCase();
    return (
      r.id.toLowerCase().includes(term) ||
      r.company.toLowerCase().includes(term) ||
      r.email.toLowerCase().includes(term)
    );
  });

  const handleDecision = async (decision) => {
    try {
      await fetch(`/api/requests/${selected.id}/${decision}`, { method: "POST" });
    } catch (err) {}
  };

  return (
   <><div className="w-full  mx-auto grid lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-4 sm:p-6">
        <div className="flex  justify-between items-start"> 
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-full bg-yellow-50 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5 text-yellow-500" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Pending Reviews</h2>
            <p className="text-sm text-gray-500">Review and verify shipment requests submitted by users.</p>
          </div>
        </div>
        <div> <button onClick={() => setPendingReview(false)}> <FaXmark className="text-lg"/></button></div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="border border-gray-100 rounded-lg p-3">
                <div className={`w-8 h-8 rounded-lg ${s.bg} flex items-center justify-center mb-2`}>
                  <Icon className={`w-4 h-4 ${s.iconColor}`} />
                </div>
                <p className="text-xs text-gray-500">{s.label}</p>
                <p className="text-lg font-bold text-gray-900">{s.value}</p>
                <p className="text-xs text-gray-400">{s.sub}</p>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by Request ID, Company, Email..."
              className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2.5 text-sm"
            />
          </div>
          <button className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-700 whitespace-nowrap">
            Select Data Range
          </button>
        </div>

        <div className="overflow-x-auto border border-gray-100 rounded-xl">
          <div className="min-w-[900px]">
            <div className="grid grid-cols-7 bg-gray-50 px-4 py-3 text-xs font-bold text-gray-900">
              <span>Request ID</span>
              <span>Company / User</span>
              <span className="text-center">Route</span>
              <span>Submitted On</span>
              <span className="text-center">Shipment Type</span>
              <span className="text-center"> Status</span>
              <span className="text-right">Actions</span>
            </div>
            {filtered.map((r) => (
              <div
                key={r.key}
                onClick={() => setSelected(r)}
                className="grid grid-cols-7 items-center px-4 py-3 border-t border-gray-100 cursor-pointer hover:bg-gray-50"
              >
                <span className="text-xs text-blue-600 font-medium">{r.id}</span>
                <div>
                  <p className="text-xs text-gray-800">{r.company}</p>
                  <p className="text-xs text-gray-400">{r.email}</p>
                </div>
                <span className="text-xs text-gray-500 text-center">{r.route}</span>
                <span className="text-xs text-gray-500">{r.submittedOn}</span>
                <span className="text-xs text-center text-gray-500">{r.shipmentType}</span>
                <span className="text-xs text-left text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full w-fit">
                  {r.status}
                </span>
                <button onClick={() => {  
                  setReviews(true)}} className="text-xs border border-gray-300 rounded-lg px-3 py-1.5">
                  Review
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selected && (
        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 h-fit">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Request Details</h3>
            <span className="text-xs text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full">
              {selected.status}
            </span>
          </div>
          <p className="text-xs text-gray-400">Request ID</p>
          <p className="font-bold text-gray-900 mb-1">{selected.id}</p>
          <p className="text-xs text-gray-400 mb-4">Submitted on {selected.submittedOn}</p>

          <p className="text-xs text-gray-400">User/ Company</p>
          <p className="font-semibold text-gray-900">{selected.company}</p>
          <p className="text-xs text-gray-500">{selected.email}</p>
          <p className="text-xs text-gray-500 mb-4">{selected.phone}</p>

          <p className="text-xs text-gray-400">Route</p>
          <p className="text-sm text-gray-800 mb-4">{selected.route}</p>

          <p className="text-xs text-gray-400">Shipment Type</p>
          <p className="text-sm text-gray-800 mb-4">{selected.shipmentType}</p>

          <p className="text-xs text-gray-400">Status</p>
          <span className="text-xs text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full inline-block mb-4">
            {selected.status}
          </span>

          <p className="text-sm text-gray-500 mb-4">
            Review the shipment details and approve or request more information.
          </p>

          <button
            onClick={() => handleDecision("reject")}
            className="w-full py-2.5 rounded-lg bg-red-50 text-red-500 font-medium text-sm mb-3"
          >
            Reject Request
          </button>
          <button
            onClick={() => handleDecision("accept")}
            className="w-full py-2.5 rounded-lg bg-green-100 text-green-700 font-medium text-sm mb-4"
          >
            Accept Request
          </button>

          <div className="border border-gray-100 rounded-lg p-3">
            <p className="text-sm font-semibold text-gray-900 mb-2">Quick Information</p>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div>
                <p className="text-gray-400">Documents Uploaded</p>
                <p className="font-bold text-gray-900">{selected.documentsUploaded}</p>
              </div>
              <div>
                <p className="text-gray-400">All risk score</p>
                <p className="font-bold text-green-600">{selected.riskScore}</p>
              </div>
              <div>
                <p className="text-gray-400">Compliance</p>
                <p className="font-bold text-green-600">{selected.compliance}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      
      
    </div>
     {reviews && 
       <ReviewShipment onClose={() => setReviews(false)} />
       }

     </> 
  );
}