import { useState } from "react";
import {
  MapPin,
  Pencil,
  FileText,
  FileSignature,
  Share2,
  RefreshCcw,
} from "lucide-react";

const tabs = ["Shipment Details", "Parties & Contacts", "Cargo Details", "Documents", "Charges"];

const actions = [
  { icon: Pencil, bg: "bg-purple-50", color: "text-purple-600", title: "Edit Shipment", desc: "Make changes to shipment details." },
  { icon: FileText, bg: "bg-green-50", color: "text-green-600", title: "Create Invoice", desc: "Create invoice for this shipment." },
  { icon: FileSignature, bg: "bg-blue-50", color: "text-blue-600", title: "Create quotation", desc: "Generate and share quotation" },
  { icon: Share2, bg: "bg-orange-50", color: "text-orange-500", title: "Share Quotation", desc: "Share quotation with client." },
  { icon: RefreshCcw, bg: "bg-blue-50", color: "text-blue-500", title: "Change Status", desc: "Change Shipment status." },
];

export default function ReviewShipment() {
  const [activeTab, setActiveTab] = useState("Shipment Details");

  const handleProceed = async () => {
    try {
      await fetch("/api/shipments/SHP-250520-0001/proceed", { method: "POST" });
    } catch (err) {}
  };

  return (
    <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-4 sm:p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-full bg-purple-50 flex items-center justify-center shrink-0">
            <MapPin className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Review Shipment</h2>
            <p className="text-sm text-gray-500">Review, edit shipment details, create invoice or share quotation.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 border border-gray-100 rounded-lg p-3 mb-4 text-xs">
          <div>
            <p className="text-gray-400">Shipment ID</p>
            <p className="font-semibold text-gray-900">SHP-250520-0001</p>
          </div>
          <div>
            <p className="text-gray-400">Submitted By</p>
            <p className="font-semibold text-gray-900">Aarav Sharma</p>
          </div>
          <div>
            <p className="text-gray-400">Company</p>
            <p className="font-semibold text-gray-900">ABC Pvt. Ltd.</p>
          </div>
          <div>
            <p className="text-gray-400">Submitted On</p>
            <p className="font-semibold text-gray-900">20 May 2025, 10:30 PM</p>
          </div>
          <div>
            <p className="text-gray-400">Current Status</p>
            <p className="font-semibold text-orange-500">Under Review</p>
          </div>
        </div>

        <div className="flex gap-4 overflow-x-auto border-b border-gray-200 mb-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap text-sm pb-2 border-b-2 ${
                activeTab === tab
                  ? "text-purple-600 border-purple-600 font-medium"
                  : "text-gray-500 border-transparent"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "Shipment Details" && (
          <div className="space-y-4">
            <div className="border border-gray-100 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="font-semibold text-gray-900 text-sm">Basic Information</p>
                <button className="text-xs text-blue-600 border border-blue-200 rounded-lg px-3 py-1.5">
                  Edit Section
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                <div>
                  <p className="text-xs text-gray-400">Shipment Type</p>
                  <p className="font-medium text-gray-900">Export</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Mode of Transport</p>
                  <p className="font-medium text-gray-900">Sea</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Incoterm</p>
                  <p className="font-medium text-gray-900">FOB</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Priority</p>
                  <p className="font-medium text-orange-500">Medium</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Reference No.</p>
                  <p className="font-medium text-gray-900">REF-2025-789</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Booking No.</p>
                  <p className="font-medium text-gray-900">BK-4587</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">ETD(expected)</p>
                  <p className="font-medium text-gray-900">25 May,2025</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">ETA(expected)</p>
                  <p className="font-medium text-gray-900">05 June,2025</p>
                </div>
              </div>
            </div>

            <div className="border border-gray-100 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="font-semibold text-gray-900 text-sm">Route</p>
                <button className="text-xs text-blue-600 border border-blue-200 rounded-lg px-3 py-1.5">
                  Edit Section
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                <div>
                  <p className="text-xs text-gray-400">From (Origin)</p>
                  <p className="font-medium text-gray-900">Nhava Sheva Port,India</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">To (Destination)</p>
                  <p className="font-medium text-gray-900">Rotterdam Port, Netherlands</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Place of receipt</p>
                  <p className="font-medium text-gray-900">Indore, Madhya Pradesh</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Final Delivery</p>
                  <p className="font-medium text-gray-900">Rotterdam Warehouse,NL</p>
                </div>
              </div>
            </div>

            <div className="border border-gray-100 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="font-semibold text-gray-900 text-sm">Cargo Information</p>
                <button className="text-xs text-blue-600 border border-blue-200 rounded-lg px-3 py-1.5">
                  Edit Section
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                <div>
                  <p className="text-xs text-gray-400">Product Name</p>
                  <p className="font-medium text-gray-900">Allnonds (Blached)</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">HS Code</p>
                  <p className="font-medium text-gray-900">0802.12.00</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Packaging Type</p>
                  <p className="font-medium text-gray-900">Cartons</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Total Packages</p>
                  <p className="font-medium text-gray-900">120</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Net weight</p>
                  <p className="font-medium text-gray-900">1500.00 KG</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Gross Weight</p>
                  <p className="font-medium text-gray-900">1650.00 KG</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Volume (CBM)</p>
                  <p className="font-medium text-gray-900">3.250 CBM</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Cargo Description</p>
                  <p className="font-medium text-gray-900">Food Products</p>
                </div>
              </div>
            </div>

            <div className="border border-gray-100 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="font-semibold text-gray-900 text-sm">Additional Information</p>
                <button className="text-xs text-blue-600 border border-blue-200 rounded-lg px-3 py-1.5">
                  Edit Section
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                <div>
                  <p className="text-xs text-gray-400">Special Instructions</p>
                  <p className="font-medium text-gray-900">Handle with care, keep away from moisture</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Insurance Required</p>
                  <p className="font-medium text-gray-900">Yes</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Inspection required</p>
                  <p className="font-medium text-gray-900">Yes</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Remarks</p>
                  <p className="font-medium text-gray-900">Please ensure time delivery</p>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <p className="font-semibold text-gray-900 text-sm">Ready To Proceed?</p>
                <p className="text-xs text-gray-500">
                  You can edit shipment details, create invoice, or share quotation with your client.
                </p>
              </div>
              <button
                onClick={handleProceed}
                className="px-5 py-2 rounded-full bg-purple-600 text-white text-sm font-medium whitespace-nowrap"
              >
                Proceed to next step
              </button>
            </div>
          </div>
        )}

        {activeTab !== "Shipment Details" && (
          <p className="text-sm text-gray-500">{activeTab} content goes here.</p>
        )}
      </div>

      <div className="space-y-4">
        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6">
          <p className="font-bold text-gray-900 mb-4">Actions</p>
          <div className="space-y-3">
            {actions.map((a) => {
              const Icon = a.icon;
              return (
                <button
                  key={a.title}
                  className={`w-full flex items-center gap-3 rounded-lg p-3 text-left ${a.bg}`}
                >
                  <Icon className={`w-4 h-4 ${a.color} shrink-0`} />
                  <div>
                    <p className={`text-sm font-semibold ${a.color}`}>{a.title}</p>
                    <p className="text-xs text-gray-500">{a.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6">
          <p className="font-bold text-gray-900 mb-4">Shipment Summary</p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Total cargo value</span>
              <span className="text-gray-900">₹8,75,000.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Total Charges</span>
              <span className="text-gray-900">₹1,24,500.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Insurance Value</span>
              <span className="text-gray-900">₹50,000.00</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-gray-100">
              <span className="text-gray-900 font-semibold">Total Payable</span>
              <span className="text-purple-600 font-bold">₹1,74,500.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Payment Status</span>
              <span className="text-blue-600 font-medium">Pending</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6">
          <p className="font-bold text-gray-900 mb-4">Client Details</p>
          <div className="flex items-center gap-3 mb-1">
            <span className="w-10 h-10 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold shrink-0">
              AS
            </span>
            <div>
              <p className="font-semibold text-gray-900 text-sm">Aarav Sharma</p>
              <p className="text-xs text-gray-500">ABC Export Pvt. Ltd.</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">aarav.sharma@gmail.com</p>
          <p className="text-xs text-gray-500 mb-4">+91 74833 65549</p>
          <button className="w-full py-2.5 rounded-lg border border-gray-300 text-gray-800 text-sm font-medium">
            View Full Details
          </button>
        </div>
      </div>
    </div>
  );
}