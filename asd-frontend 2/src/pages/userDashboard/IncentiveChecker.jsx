import { useState } from "react";
import {
  FiArrowLeft, FiSave, FiDownload, FiPlus, FiCopy,
  FiChevronRight, FiExternalLink, FiDatabase, FiPhone,
  FiMail, FiCheckCircle, FiXCircle, FiShare2, FiBookmark,
  FiMessageSquare, FiInfo, FiAlertTriangle, FiAlertCircle,
  FiBell, FiGrid
} from "react-icons/fi";
import { MdOutlineAccountBalance, MdOutlineLocationOn, MdOutlineOpenInNew } from "react-icons/md";
import { BsGraphUpArrow } from "react-icons/bs";

const breakdownRows = [
  {
    scheme: "RoDTEP",
    fullName: "Remission of Duties or Taxes on Exported Products",
    type: "Central",
    typeColor: "bg-emerald-100 text-emerald-700",
    applicableOn: "Export Value",
    rate: "4%",
    benefit: "₹4,992",
    eligibility: "Eligible",
    eligible: true,
  },
  {
    scheme: "MEIS",
    fullName: "Merchandise Exports from India Scheme",
    type: "Central",
    typeColor: "bg-emerald-100 text-emerald-700",
    applicableOn: "Export Value",
    rate: "0.5%",
    benefit: "₹624",
    eligibility: "Eligible",
    eligible: true,
  },
  {
    scheme: "State Incentive – Tamil Nadu",
    fullName: "Export Promotion Policy",
    type: "State",
    typeColor: "bg-orange-100 text-orange-600",
    applicableOn: "Export Value",
    rate: "2%",
    benefit: "₹2,496",
    eligibility: "Eligible",
    eligible: true,
  },
  {
    scheme: "IGST Refund (on Exports)",
    fullName: "",
    type: "Central",
    typeColor: "bg-emerald-100 text-emerald-700",
    applicableOn: "Tax Paid",
    rate: "0%",
    benefit: "₹0",
    eligibility: "Not Applicable",
    eligible: false,
  },
];

const auditLog = [
  { color: "bg-teal-500", time: "09:25 AM", text: "Search Submitted by Arjun Soni" },
  { color: "bg-teal-500", time: "09:25 AM", text: "Data Validated" },
  { color: "bg-teal-500", time: "09:25 AM", text: "Incentives Matched" },
  { color: "bg-teal-500", time: "09:25 AM", text: "Result Generated" },
  { color: "bg-teal-500", time: "09:25 AM", text: "Report Saved" },
];

const assumptions = [
  "Product is 100% cotton, knitted, for men.",
  "Shipment value and details provided are correct.",
  "Export under HS code 6109.10.00.",
  "Input Tax Credit is available.",
  "Rates are as per current notifications and may change.",
];

const dataSources = [
  { icon: FiDatabase, label: "DGFT (India)" },
  { icon: FiDatabase, label: "Trade APIs" },
  { icon: FiDatabase, label: "ICEGATE" },
  { icon: FiBell, label: "Notifications" },
  { icon: FiGrid, label: "State Export Policies" },
  { icon: FiDatabase, label: "Public Schemes Database" },
];

export default function IncentiveChecker() {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className=" bg-gray-50 font-sans flex-1 overflow-y-auto pt-14">
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3">
        <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3">
          <span>Dashboard</span>
          <FiChevronRight size={11} />
          <span>Incentive Checker</span>
          <FiChevronRight size={11} />
          <span className="text-gray-800 font-medium">Result</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Incentive Checker</h1>
            <p className="text-xs text-gray-500 mt-0.5">Find applicable incentives and estimated benefits for your shipment.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="flex items-center gap-1.5 border border-gray-200 bg-white text-gray-700 text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-gray-50">
              <FiArrowLeft size={12} /> New Search
            </button>
            <button className="flex items-center gap-1.5 border border-gray-200 bg-white text-gray-700 text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-gray-50">
              <FiSave size={12} /> Save Report
            </button>
            <button className="flex items-center gap-1.5 border border-gray-200 bg-white text-gray-700 text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-gray-50">
              <FiDownload size={12} /> Download Report (PDF)
            </button>
            <button className="flex items-center gap-1.5 bg-teal-500 hover:bg-teal-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg">
              <FiPlus size={12} /> Create Shipment from this Result
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-3 sm:px-4 lg:px-6 py-4 grid grid-cols-1 xl:grid-cols-[1fr_290px] gap-4">
        <div className="flex flex-col gap-4 min-w-0">

          <div className="flex items-start gap-2 bg-teal-50 border border-teal-200 rounded-lg px-3 py-2.5 text-xs text-teal-800">
            <FiInfo size={14} className="text-teal-500 flex-shrink-0 mt-0.5" />
            This result is based on the data sources and assumptions listed below. Please review before making any trade decisions.
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                <FiDatabase className="text-blue-500 text-base" />
              </div>
              <p className="text-sm font-semibold text-gray-900">Your Search</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-3">
              {[
                ["HS Code", "6109.10.00"],
                ["Product", "T-shirts, singlets and other vests, of cotton"],
                ["Origin Country", "India"],
                ["Destination Country", "United Arab Emirates (UAE)"],
                ["Shipment Value", "₹1,24,680"],
                ["Quantity", "500 kg"],
              ].map(([k, v]) => (
                <div key={k}>
                  <p className="text-[10px] text-gray-400 font-medium mb-0.5">{k}</p>
                  <p className="text-xs font-semibold text-gray-800 leading-tight">{v}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-2 border-t border-gray-100">
              <p className="text-[10px] text-gray-400">
                Search ID: INC-2025-04-24-000123 &nbsp;•&nbsp; 24 Apr 2025, 09:25 AM &nbsp;•&nbsp; User: Arjun Soni
              </p>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 border border-gray-200 bg-white text-gray-600 text-[11px] font-medium px-3 py-1.5 rounded-lg hover:bg-gray-50 w-fit"
              >
                <FiCopy size={11} /> {copied ? "Copied!" : "Copy Search"}
              </button>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <p className="text-sm font-semibold text-gray-800 mb-3">Estimated Total Incentive (INR)</p>
            <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-4 items-center">
              <div>
                <p className="text-2xl font-bold text-gray-900">₹8,420</p>
                <div className="mt-2 flex items-center gap-1.5">
                  <span className="text-[11px] text-gray-500 font-medium">Total Incentive Rate</span>
                  <span className="bg-teal-100 text-teal-700 text-[11px] font-semibold px-2 py-0.5 rounded-full">6.76%</span>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="border border-gray-100 rounded-xl p-3 flex items-start gap-3">
                  <div className="w-9 h-9 bg-teal-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <MdOutlineAccountBalance className="text-teal-500 text-2xl" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 font-medium">Central Incentives</p>
                    <p className="text-lg font-bold text-gray-900">₹5,420</p>
                    <p className="text-[10px] text-gray-400">4.36% of value</p>
                  </div>
                </div>
                <div className="border border-gray-100 rounded-xl p-3 flex items-start gap-3">
                  <div className="w-9 h-9 bg-red-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <MdOutlineLocationOn className="text-red-400 text-2xl" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 font-medium">State Incentives</p>
                    <p className="text-lg font-bold text-gray-900">₹3,000</p>
                    <p className="text-[10px] text-gray-400">2.40% of value</p>
                  </div>
                </div>
                <div className="border border-gray-100 rounded-xl p-3 flex items-start gap-3">
                  <div className="w-9 h-9 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <BsGraphUpArrow className="text-blue-400 text-2xl" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 font-medium">Export Benefits</p>
                    <p className="text-lg font-bold text-gray-900">₹0</p>
                    <p className="text-[10px] text-gray-400">0% of value</p>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-[10px] text-gray-400 mt-3">
              Incentives are subject to eligibility and compliance with applicable scheme conditions.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <p className="text-sm font-semibold text-gray-800 mb-3">Incentive Breakdown</p>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="bg-gray-50">
                    {["Scheme / Program", "Type", "Applicable On", "Rate / Benefit", "Estimated Benefit (INR)", "Eligibility"].map((h, i) => (
                      <th
                        key={h}
                        className={`text-left text-[11px] font-semibold text-gray-500 px-3 py-2.5 ${i === 0 ? "rounded-l-lg" : ""} ${i === 5 ? "rounded-r-lg" : ""}`}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {breakdownRows.map((row, i) => (
                    <tr key={i} className="border-t border-gray-100">
                      <td className="px-3 py-3">
                        <p className="text-xs font-semibold text-gray-800">{row.scheme}</p>
                        {row.fullName && <p className="text-[10px] text-gray-400 mt-0.5">{row.fullName}</p>}
                      </td>
                      <td className="px-3 py-3">
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${row.typeColor}`}>
                          {row.type}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-xs text-gray-600 font-medium">{row.applicableOn}</td>
                      <td className="px-3 py-3 text-xs text-gray-700 font-medium">{row.rate}</td>
                      <td className="px-3 py-3 text-xs font-semibold text-gray-900">{row.benefit}</td>
                      <td className="px-3 py-3">
                        <div className={`flex items-center gap-1 text-xs font-medium ${row.eligible ? "text-emerald-600" : "text-gray-400"}`}>
                          {row.eligible
                            ? <FiCheckCircle size={13} className="text-emerald-500" />
                            : <FiXCircle size={13} className="text-gray-400" />}
                          {row.eligibility}
                        </div>
                      </td>
                    </tr>
                  ))}
                  <tr className="border-t-2 border-gray-200">
                    <td colSpan={4} className="px-3 py-3 text-xs font-bold text-gray-800 text-right">Total Estimated Incentive</td>
                    <td className="px-3 py-3 text-sm font-bold text-emerald-600">₹8,420</td>
                    <td />
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-3 flex justify-center">
              <button className="flex items-center gap-1.5 border border-gray-200 text-teal-600 text-xs font-medium px-5 py-2 rounded-lg hover:bg-teal-50 w-full justify-center">
                View Scheme Details & Eligibility <MdOutlineOpenInNew size={13} />
              </button>
            </div>
          </div>

          
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <p className="text-sm font-semibold text-gray-900 mb-3">Result Summary</p>
            {[
              { icon: FiCheckCircle, iconColor: "text-teal-500", label: "Best Applicable Scheme", value: "RoDTEP", valueColor: "" },
              { icon: FiAlertCircle, iconColor: "text-teal-500", label: "Total Incentive (INR)", value: "₹8,420", valueColor: "" },
              { icon: FiAlertTriangle, iconColor: "text-orange-400", label: "Total Incentive Rate", value: "6.76%", valueColor: "" },
              { icon: FiInfo, iconColor: "text-blue-400", label: "Based On", value: "Export Value", valueColor: "" },
              { icon: FiCheckCircle, iconColor: "text-emerald-500", label: "Input Tax Credit", value: "Yes", valueColor: "" },
            ].map(({ icon: Icon, iconColor, label, value }, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0 text-xs gap-2">
                <div className="flex items-center gap-2 text-gray-500">
                  <Icon size={13} className={iconColor} /> {label}
                </div>
                <span className="font-semibold text-gray-900 text-right">{value}</span>
              </div>
            ))}
            <button className="mt-3 w-full bg-teal-500 hover:bg-teal-600 text-white text-xs font-semibold py-2.5 rounded-xl">
              Create Shipment from this Result
            </button>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <p className="text-sm font-semibold text-gray-900 mb-3">Report Information</p>
            {[
              ["Report ID", "INC-2025-04-24-000123"],
              ["Generated On", "24 Apr 2025, 09:25 AM"],
              ["Generated By", "Arjun Soni"],
              ["Plan", "Pro Plan"],
              ["AI Model Version", "v2.1.0"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between py-1.5 text-[11px] border-b border-gray-100 last:border-0">
                <span className="text-gray-500">{k}</span>
                <span className="text-gray-800 font-medium">{v}</span>
              </div>
            ))}
            <button className="mt-3 w-full flex items-center justify-center gap-2 border border-gray-200 bg-white text-teal-600 text-xs font-medium py-2 rounded-lg hover:bg-teal-50">
              <FiDownload size={12} /> Download Report (PDF)
            </button>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <p className="text-sm font-semibold text-gray-900 mb-1">Save & Share</p>
            <p className="text-[11px] text-gray-500 mb-3">Save this report for future reference or share with your team.</p>
            <div className="grid grid-cols-2 gap-2">
              <button className="flex items-center justify-center gap-1.5 border border-gray-200 bg-white text-gray-700 text-[11px] font-medium py-2 rounded-lg hover:bg-gray-50">
                <FiBookmark size={12} /> Save to Saved Reports
              </button>
              <button className="flex items-center justify-center gap-1.5 border border-gray-200 bg-white text-gray-700 text-[11px] font-medium py-2 rounded-lg hover:bg-gray-50">
                <FiShare2 size={12} /> Share Report
              </button>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-gray-900">Audit Log (This Search)</p>
              <button className="text-teal-500 text-[11px] font-medium hover:underline">View All</button>
            </div>
            {auditLog.map((entry, i) => (
              <div key={i} className="flex items-start gap-2 py-1.5 border-b border-gray-100 last:border-0">
                <span className={`w-2 h-2 rounded-full ${entry.color} flex-shrink-0 mt-1`} />
                <span className="text-[10px] text-gray-400 whitespace-nowrap">{entry.time}</span>
                <span className="text-[11px] text-gray-600">{entry.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <p className="text-sm font-semibold text-gray-800 mb-3">Data Sources Used</p>
              <div className="grid grid-cols-2 gap-y-2 gap-x-3">
                {dataSources.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-1.5 text-xs text-gray-600">
                    <Icon size={12} className="text-gray-400 flex-shrink-0" /> {label}
                  </div>
                ))}
              </div>
              <button className="mt-3 text-teal-500 text-xs font-medium hover:underline flex items-center gap-1">
                View All Sources <FiChevronRight size={12} />
              </button>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <p className="text-sm font-semibold text-gray-800 mb-3">Assumptions</p>
              <ul className="flex flex-col gap-1.5">
                {assumptions.map((a, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-xs text-gray-600">
                    <span className="text-gray-400 mt-0.5 flex-shrink-0">•</span> {a}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-800 mb-2">Disclaimer</p>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Incentives are subject to change as per government notifications. Please verify with official sources before making any business decisions.
                </p>
                <button className="mt-2 text-blue-500 text-xs font-medium hover:underline">Read Full Disclaimer</button>
              </div>
           
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-4">
                <p className="text-sm font-semibold text-gray-800 mb-1">Need Help?</p>
                <p className="text-xs text-gray-500 mb-2">Our trade experts are here to help you.</p>
                <div className="flex items-center gap-1.5 text-xs text-gray-600 mb-1">
                  <FiPhone size={11} className="text-teal-500" /> +91 22 1234 5678
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-600 mb-3">
                  <FiMail size={11} className="text-teal-500" /> support@asdcargomate.com
                </div>
                <button className="w-full border border-gray-200 text-gray-700 text-xs font-medium py-2 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-1.5">
                  <FiMessageSquare size={12} /> Chat with Expert
                </button>
              </div>
          </div>
    </div>
  );
}