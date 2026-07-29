import { useState } from "react";
import {
  FiArrowLeft, FiSave, FiDownload, FiPlus, FiSearch, FiX,
  FiChevronDown, FiFilter, FiEye, FiCheckCircle, FiAlertCircle,
  FiAlertTriangle, FiDatabase, FiChevronRight, FiPhone, FiMail,
  FiWifi, FiInfo
} from "react-icons/fi";
import { BsShieldCheck } from "react-icons/bs";
import { MdOutlineVerified } from "react-icons/md";
import NeedHelp from "../../components/core/NeedHelp";

const otherMatches = [
  { code: "6109.90.00", desc: "Other T-shirts, singlets and other vests, of cotton", score: 78, type: "8 Digit", duty: "5%" },
  { code: "6109.20.00", desc: "T-shirts, singlets and other vests, of synthetic fibers", score: 45, type: "8 Digit", duty: "5%" },
  { code: "6105.00.00", desc: "Shirts of cotton, knitted or crocheted", score: 35, type: "8 Digit", duty: "5%" },
];

const detailTabs = ["HS Code Details", "Description & Notes", "Legal Text", "Explanatory Notes", "Related Products", "History"];

const hsDetails = [
  ["HS Code", "6109.10.00"],
  ["Description", "T-shirts, singlets and other vests, of cotton"],
  ["Chapter", "61 - Articles of apparel and clothing accessories, knitted or crocheted"],
  ["Heading", "6109 - T-shirts, singlets and other vests, knitted or crocheted"],
  ["Sub Heading", "6109.10 - Of cotton"],
  ["HS Code Type", "8 Digit"],
  ["Classification Year", "2022"],
  ["WCO Version", "HS 2022"],
];

const assumptions = [
  "Product is 100% cotton.",
  "Product is knitted.",
  "Product is for men (general usage).",
  "Not specially designed for infants.",
];

const docReqs = [
  "Commercial Invoice",
  "Packing List",
  "Certificate of Origin",
  "Bill of Lading / Airway Bill",
  "Import Declaration",
];

const dataSources = [
  { icon: FiDatabase, label: "DGFT (India)" },
  { icon: FiDatabase, label: "ICEGATE" },
  { icon: FiDatabase, label: "UAE Customs" },
  { icon: FiDatabase, label: "WCO HS" },
  { icon: FiDatabase, label: "Trade APIs" },
  { icon: FiDatabase, label: "Market Data" },
];

function ScoreBar({ score, color = "bg-emerald-500" }) {
  return (
    <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
      <div className={`h-full ${color} rounded-full`} style={{ width: `${score}%` }} />
    </div>
  );
}

export default function HSCodeLookup() {
  const [activeTab, setActiveTab] = useState("HS Code Details");
  const [query, setQuery] = useState("Cotton T-shirt 100% cotton, knitted, for men");

  return (
    <div className=" bg-gray-50 font-sans  flex-1 overflow-y-auto pt-14">
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3">
        <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3">
          <span>Dashboard</span>
          <FiChevronRight size={11} />
          <span className="text-gray-800 font-medium">HS Code Lookup</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-lg font-bold text-gray-900">HS Code Lookup</h1>
            <p className="text-xs font-normal text-gray-500 mt-0.5">Find the right HS code and get duty, tax, and trade insights.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="flex items-center gap-1.5 border border-gray-200 bg-white text-gray-700 text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-gray-50">
              <FiArrowLeft size={12} /> Back to Dashboard
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

      <div className="max-w-[1400px] mx-auto px-3 sm:px-4 lg:px-6 py-4 grid grid-cols-1 xl:grid-cols-[1fr_290px] gap-4 ">
        <div className="flex flex-col gap-4 min-w-0">

          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <p className="text-xs sm:text-sm font-bold   mb-2">Enter Product Description</p>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 pr-8 focus:outline-none focus:ring-1 focus:ring-teal-400"
                  placeholder="e.g. Cotton T-shirt 100% cotton, knitted, for men"
                />
                {query && (
                  <button onClick={() => setQuery("")} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    <FiX size={14} />
                  </button>
                )}
              </div>
              <button className="bg-[#008B7D] text-white text-sm font-semibold px-5 py-2 rounded-lg flex items-center gap-1.5">
                <FiSearch size={14} /> Search
              </button>
            </div>

            <div className="mt-3">
              <p className="text-xs sm:text-sm font-bold     mb-2">Additional Details (Optional)</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div>
                  <label className="text-xs text-[#9CA3AF] font-bold mb-1 block">Country of Export</label>
                  <div className="flex items-center justify-between border border-gray-200 rounded-lg px-3 py-2 text-sm text-[#1E293B] cursor-pointer hover:border-gray-300 bg-white">
                    🇮🇳 India <FiChevronDown size={12} className="text-gray-400" />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-[#9CA3AF] font-bold mb-1 block">Country of Import</label>
                  <div className="flex items-center justify-between border border-gray-200 rounded-lg px-3 py-2 text-sm text-[#1E293B] cursor-pointer hover:border-gray-300 bg-white">
                    🇦🇪 United Arab Emirates <FiChevronDown size={12} className="text-gray-400" />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-[#9CA3AF] font-bold mb-1 block">Quantity</label>
                  <div className="flex gap-1">
                    <input defaultValue="500" className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-teal-400" />
                    <div className="flex items-center gap-1 border border-gray-200 rounded-lg px-2 py-2 text-sm text-[#1E293B] cursor-pointer bg-white">
                      KG <FiChevronDown size={11} className="text-gray-400" />
                    </div>
                  </div>
                </div>
                <div className="flex items-end">
                  <button className="w-full flex items-center justify-center gap-1.5 border border-gray-200 rounded-lg px-2 py-2 text-sm font-bold text-[#008B7D] hover:bg-gray-50">
                    <FiFilter size={12} /> Advanced Filters <FiChevronDown size={11} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <p className="text-xs sm:text-sm font-bold text-gray-800 mb-3">Best HS Code Match</p>
            <div className="border border-gray-200 rounded-xl p-4 bg-[#F3FBF9]">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 ">
                <div>
                  <p className="text-xs text-[#22222299] font-bold mb-1">HS Code</p>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-gray-900">6109.10.00</span>
                    <span className="bg-emerald-50 text-emerald-600 text-[9px] font-bold px-1.5 py-0.5 rounded border border-emerald-200">Best Match</span>
                  </div>
                  <p className="text-[10px] text-[#22222299] font-medium mt-1">T-shirts, singlets and other vests, of cotton</p>
                </div>
                <div>
                  <p className="text-xs text-[#22222299] font-bold mb-1">Match Score</p>
                  <p className="text-sm font-bold text-gray-900">98%</p>
                  <ScoreBar score={98} />
                </div>
                <div>
                  <p className="text-xs text-[#22222299] font-bold mb-1">HS Code Type</p>
                  <p className="text-sm font-semibold text-gray-800">8 Digit</p>
                </div>
                <div>
                  <p className="text-xs text-[#22222299] font-bold mb-1">Classification Basis</p>
                  <p className="text-xs font-semibold text-gray-800">Chapter 61, Note 7, Section XI</p>
                </div>
                <div>
                  <p className="text-xs text-[#22222299] font-bold mb-1">Confidence</p>
                  <div className="flex items-center gap-1 text-emerald-500">
                    <MdOutlineVerified size={16} />
                    <span className="text-sm font-semibold">High</span>
                  </div>
                  <button className="mt-2 flex items-center gap-1 border border-teal-500 text-teal-500 text-[10px] font-medium px-2.5 py-1 rounded-lg hover:bg-teal-50">
                    <FiEye size={11} /> View Details
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <p className="text-xs sm:text-sm  font-bold text-gray-800 mb-3">Other Possible Matches</p>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[540px]">
                <thead>
                  <tr className="bg-gray-50">
                    {["HS Code", "Description", "Match Score", "HS Code Type", "Applicable Duty (UAE)", "Action"].map((h, i) => (
                      <th key={h} className={`text-left text-xs font-medium  px-3 py-2.5 ${i === 0 ? "rounded-l-lg" : ""} ${i === 5 ? "rounded-r-lg" : ""}`}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {otherMatches.map((row, i) => (
                    <tr key={i} className="border-t border-gray-100">
                      <td className="px-3 py-3 text-xs font-semibold text-gray-800">{row.code}</td>
                      <td className="px-3 py-3 text-xs text-gray-600 max-w-[180px]">{row.desc}</td>
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-700">{row.score}%</span>
                          <ScoreBar score={row.score} color={row.score > 70 ? "bg-emerald-500" : row.score > 40 ? "bg-yellow-400" : "bg-orange-400"} />
                        </div>
                      </td>
                      <td className="px-3 py-3 text-xs text-gray-600">{row.type}</td>
                      <td className="px-3 py-3 text-xs text-gray-600">{row.duty}</td>
                      <td className="px-3 py-3">
                        <button className="border border-gray-200 text-[#155DFC] text-[11px] font-medium px-3 py-1 rounded-lg hover:bg-gray-50">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between mt-3 gap-1">
              <p className="text-[10px] text-gray-400 flex items-center gap-1">
                <FiInfo size={11} /> Match score is calculated based on product description, keywords, and trade data.
              </p>
              <p className="text-[10px] text-gray-400">Data Sources: DGFT (India), UAE Customs, WCO HS</p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex overflow-x-auto border-b border-gray-200 mb-4 gap-0">
              {detailTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-2 text-xs  font-medium whitespace-nowrap border-b-2 -mb-px transition-colors
                    ${activeTab === tab ? "border-teal-500 text-[#0D9488]" : "border-transparent text-gray-700"}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-4">
              <div>
                {hsDetails.map(([k, v]) => (
                  <div key={k} className="flex py-2 border-b border-gray-100 last:border-0 text-xs gap-4">
                    <span className="text-[#64748B] font-medium w-36 flex-shrink-0">{k}</span>
                    <span className="text-gray-800 font-medium">{v}</span>
                  </div>
                ))}
                 <button className="mt-3 xl:mb-16 text-xs font-semibold text-blue-600 hover:text-blue-700">
                         View Official Tariff Page  
                  </button>
              </div>

              <div className="flex flex-col gap-3">
                <div className="bg-[#F2FAF8] border border-[#F2FAF8] rounded-xl p-3">
                  <p className="flex items-center gap-1.5 text-xs font-bold text-[#065F46] mb-1.5">
                    <FiAlertCircle size={13} className="text-[#047857]" /> AI Insight
                  </p>
                  <p className="text-xs text-[#047857] leading-relaxed">
                    This product falls under Chapter 61 as it is a knitted garment. Since it is made of 100% cotton and is a T-shirt, it classifies under 6109.10.00.
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
                  <p className="flex items-center gap-1.5 text-xs font-bold text-blue-800 mb-2">
                    <FiInfo size={13} className="text-blue-500" /> Assumptions
                  </p>
                  <ul className="flex flex-col gap-1">
                    {assumptions.map((a, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-xs text-blue-800">
                        <span className="mt-0.5 text-blue-400">•</span> {a}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-xl p-3">
                  <p className="flex items-center gap-1.5 text-xs font-bold text-orange-700 mb-1">
                    <FiAlertTriangle size={13} className="text-orange-500" /> Disclaimer
                  </p>
                  <p className="text-xs text-orange-800 leading-relaxed">
                    All results are for reference only. Please verify with official sources before making any business decisions.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <p className="text-sm font-semibold text-gray-800 mb-3">Data Sources Used</p>
              <div className="grid grid-cols-2 gap-y-2 gap-x-3">
                {dataSources.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2 text-xs text-gray-600">
                    <Icon size={13} className="text-gray-400" /> {label}
                  </div>
                ))}
              </div>
              <button className="mt-3 text-teal-500 text-xs font-medium hover:underline flex items-center gap-1">
                View All Sources <FiChevronRight size={12} />
              </button>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <p className="text-sm font-semibold text-gray-800 mb-2">Connects to Live Data</p>
              <p className="text-xs text-gray-500 leading-relaxed mb-3">
                All modules are connected to live backend systems and databases for real-time, accurate information.
              </p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-xs text-emerald-600 font-semibold">Connected</span>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <p className="text-sm font-semibold text-gray-800 mb-2">Need Help?</p>
              <p className="text-xs text-gray-500 mb-3">Our trade experts are here to help you.</p>
              <div className="flex items-center gap-2 text-xs text-gray-600 mb-1.5">
                <FiPhone size={12} className="text-teal-500" /> +91 22 1234 5678
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <FiMail size={12} className="text-teal-500" /> support@asdcargomate.com
              </div>
            </div>
          </div> */}
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <p className="text-sm font-semibold text-gray-800 mb-3">Query Summary</p>
            {[
              ["Product", "Cotton T-shirt 100% cotton, knitted, for men"],
              ["Export Country", "🇮🇳 India"],
              ["Import Country", "🇦🇪 United Arab Emirates"],
              ["Quantity", "500 KG"],
              ["Query ID", "HSQ-2025-04-24-000123"],
              ["Searched On", "24 Apr 2025, 09:25 AM"],
              ["Searched By", "Arjun Soni"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between py-1.5 border-b border-gray-100 last:border-0 text-xs gap-2">
                <span className="font-medium flex-shrink-0">{k}</span>
                <span className="text-gray-800 font-medium text-right">{v}</span>
              </div>
            ))}
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <p className="text-sm font-semibold text-gray-800 mb-3">Duty & Tax (UAE)</p>
            <div className="flex justify-between text-xs py-1.5 border-b border-gray-100">
              <span className="">Customs Duty</span>
              <span className="text-gray-800 font-medium">5%</span>
            </div>
            <div className="flex justify-between text-xs py-1.5 border-b border-gray-100">
              <span className="">VAT (5%)</span>
              <span className="text-gray-800 font-medium">5%</span>
            </div>
            <div className="flex justify-between text-xs py-2">
              <span className="text-gray-700 font-semibold">Total Duty & Tax</span>
              <span className="text-emerald-600 font-bold text-sm">10%</span>
            </div>
            <button className="text-[#008B7D] text-xs font-medium hover:underline flex items-center gap-1 mt-1">
              View Duty Calculation <FiChevronRight size={12} />
            </button>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <p className="text-sm font-semibold text-gray-800 mb-3">Trade Information</p>
            {[
              ["Import Permitted", "Yes", "text-emerald-500"],
              ["RCEP Benefit", "Not Applicable", "text-black"],
              ["FTA Preference", "Not Applicable", "text-black"],
              ["Import Restriction", "None", "text-red-500"],
            ].map(([k, v, color]) => (
              <div key={k} className="flex justify-between py-1.5 border-b border-gray-100 last:border-0 text-xs">
                <span className="">{k}</span>
                <span className={`font-medium ${color}`}>{v}</span>
              </div>
            ))}
            <button className="text-[#008B7D] text-xs font-medium hover:underline flex items-center gap-1 mt-2">
              View Trade Regulations <FiChevronRight size={12} />
            </button>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <p className="text-sm font-semibold text-[#1E293B] mb-3">Document Requirements</p>
            {docReqs.map((doc) => (
              <div key={doc} className="flex items-center gap-2 py-1.5 border-b border-gray-100 last:border-0 text-xs text-gray-700">
                <FiCheckCircle size={13} className="text-emerald-500 flex-shrink-0" /> {doc}
              </div>
            ))}
            <button className="text-[#008B7D] text-xs font-medium hover:underline flex items-center gap-1 mt-2">
              View All Documents <FiChevronRight size={12} />
            </button>
          </div>
        </div>

      </div>
   
     <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-3 mx-4">
                  <div className="bg-white  flex flex-col justify-center gap-10 rounded-xl border border-gray-200  px-3 py-4 ">
                    <div className=' flex flex-row items-center justify-between'>
                       <h3 className="text-xs  font-bold text-gray-900 ">
                      Data Sources Used
                    </h3>
                      <button className=" text-teal-500 text-xs  font-medium hover:underline">
                      View All Sources
                    </button>
                   </div>
                   
    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                      <div className="flex items-center gap-2  text-gray-700">
                        <FiDatabase size={14} />
                        DGFT (India)
                      </div>
    
                      <div className="flex items-center gap-2 text-gray-700">
                        <FiDatabase size={14} />
                        ICEGATE
                      </div>
    
                      <div className="flex items-center gap-2 text-gray-700">
                        <FiDatabase size={14} />
                        Shipping Lines
                      </div>
    
                      <div className="flex items-center gap-2 text-gray-700">
                        <FiDatabase size={14} />
                        Customs (UAE)
                      </div>
    
                      <div className="flex items-center gap-2 text-gray-700">
                        <FiDatabase size={14} />
                        Trade APIs
                      </div>
    
                      <div className="flex items-center gap-2 text-gray-700">
                        <FiDatabase size={14} />
                        Market Data
                      </div>
                    </div>
    
                  
                  </div>
    
                  <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <h3 className="text-xs  font-bold text-gray-900 mb-4">
                      Connected To Live Data
                    </h3>
    
                    <p className="text-xs  text-[#64748B] leading-relaxed mb-4">
                      All modules are connected to backend systems and databases for
                      real-time, accurate information.
                    </p>
    
                    <div className="inline-flex items-center gap-2 px-3 py-1.5    b0">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      <span className="text-xs sm:text-sm font-medium text-emerald-700">
                        Connected
                      </span>
                    </div>
                  </div>
    
                  <div className="bg-white flex rounded-xl border border-gray-200 px-4">

                    <NeedHelp mobile={"+91 22 1234 5678"} para={" Our trade experts are here to help you."} heading={"Need help ?"}  />
                  
                  </div>
                
                </div>

      
    </div>
  );
}