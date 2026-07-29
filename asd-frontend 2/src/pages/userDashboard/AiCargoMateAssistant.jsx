import   React, {useState} from 'react'
import {
  FiArrowLeft,
  FiSave,
  FiDownload,
  FiPlus,
  FiInfo,
  FiCopy,
  FiStar,
  FiDatabase,
  FiAlertCircle,
  FiAnchor,
  FiCpu,
  FiHash,
  FiGift,
  FiTruck,
  FiMap,
  FiPackage,
  FiRadio,
  FiFileText,
  FiUsers,
  FiBookmark,
  FiClipboard,
  FiBarChart2,
  FiCreditCard,
  FiBell,
  FiHelpCircle,
  FiSettings,
  FiChevronRight,
  FiShare2,
  FiSend,
  FiCheck,
  FiClock,
  FiDollarSign,
} from "react-icons/fi";
import { FiPhone } from "react-icons/fi";
import { BsAirplane } from "react-icons/bs";
import { MdOutlineRocketLaunch } from "react-icons/md";
import NeedHelp from '../../components/core/NeedHelp';
import chat from '../../assets/Images/webp/chat.webp';

const recCards = [
  {
    label: "HS Code",
    main: "6109.10.00",
    sub: "T-shirts, singlets and other vests, of cotton",
    rows: [
      ["IGST Rate (India)", "12%"],
      ["UAE Customs Duty", "5%"],
    ],
    link: "View HS Code Details",
  },
  {
    label: "Incentive (India)",
    main: "₹8,420",
    mainColor: "text-emerald-600",
    sub: "Total Incentive Value",
    rows: [
      ["RoDTEP", "₹3,420"],
      ["MEIS", "₹5,000"],
      ["State Incentive (TN)", "₹0"],
    ],
    link: "View Incentive Details",
  },
  {
    label: "Freight (Air)",
    routeLabel: "Route",
    route: "Tirupur → Dubai",
    rows: [
      ["Mode", "Air Freight"],
      ["Est. Freight Cost", ""],
    ],
    freightCost: "₹24,860",
    link: "View Freight Breakdown",
  },
  {
    label: "Landed Cost (Est.)",
    main: "₹1,24,680",
    sub: "Total Landed Cost",
    rows: [
      ["Product Cost", "₹76,230"],
      ["Freight & Insurance", "₹24,860"],
      ["Duties & Taxes", "₹13,590"],
      ["Other Charges", "₹9,99"],
    ],
    link: "View Cost Breakdown",
  },
];

const analysisTabs = [
  "HS Code Analysis",
  "Incentive Analysis",
  "Freight Analysis",
  "Landed Cost Breakdown",
  "Compliance & Documents",
  "Market Insights",
];


const resultSummary = [
  {
    icon: BsAirplane,
    label: "Best Mode",
    value: "Air Freight",
    iconColor: "text-teal-500",
  },
  {
    icon: BsAirplane,
    label: "Recommended Route",
    value: "Tirupur, India → Dubai, UAE",
    iconColor: "text-blue-500",
    small: true,
  },
  {
    icon: FiClock,
    label: "Est. Transit Time",
    value: "3 – 5 Days",
    iconColor: "text-yellow-500",
  },
  {
    icon: FiDollarSign,
    label: "Total Landed Cost (Est.)",
    value: "₹1,24,680",
    iconColor: "text-red-500",
  },
  {
    icon: FiGift,
    label: "Total Incentive (Est.)",
    value: "₹8,420",
    iconColor: "text-emerald-500",
    valueColor: "text-emerald-600",
  },
];

const auditLog = [
  {
    color: "bg-teal-500",
    time: "09:25 AM",
    text: "Query Submitted by Arjun Soni",
  },
  { color: "bg-blue-500", time: "09:25 AM", text: "AI Processing Started" },
  {
    color: "bg-yellow-500",
    time: "09:25 AM",
    text: "HS Code Identified: 6109.10.00",
  },
  {
    color: "bg-teal-500",
    time: "09:26 AM",
    text: "Incentives Calculated Successfully",
  },
  {
    color: "bg-teal-500",
    time: "09:26 AM",
    text: "Freight Rates Fetched (Air)",
  },
  {
    color: "bg-emerald-500",
    time: "09:26 AM",
    text: "Report Generated Successfully",
  },
];

const tabContent = {
  "HS Code Analysis": {
    left: [
      ["HS Code", "6109.10.00"],
      ["Description", "T-shirts, singlets and other vests, of cotton"],
      ["Classification Basis", "Chapter 61, Note 7, Section XI"],
      ["IGST (India)", "12%"],
      ["UAE Customs Duty", "5%"],
      ["Applicable Cess", "NA"],
    ],
    insight:
      "This HS code covers cotton T-shirts. Ensure accurate declaration of fabric composition and HS classification to avoid customs delays.",
    assumption:
      "Product is 100% cotton, knitted. Shipment weight is 500kg. Prices and duties are based on current available data and may change.",
    disclaimer:
      "All results are for reference only. Please verify with official government and customs sources before making business decisions.",
    tariffLink: "View Official Tariff Page",
    buttonText: "Create Shipment from this Result",
  },
  "Incentive Analysis": {
    left: [
      ["RoDTEP", "₹3,420"],
      ["MEIS", "₹5,000"],
      ["State Incentive (TN)", "₹0"],
      ["Total Incentive", "₹8,420"],
    ],
    insight:
      "RoDTEP scheme replaces MEIS for most textile exports. Verify eligibility and current rates before filing.",
    assumption:
      "Product is 100% cotton, knitted. Shipment weight is 500kg. Prices and duties are based on current available data and may change.",
    disclaimer:
      "All results are for reference only. Please verify with official government and customs sources before making business decisions.",
    tariffLink: "View Official Tariff Page",
    buttonText: "Create Shipment from this Result",
  },
  "Freight Analysis": {
    left: [
      ["Route", "Tirupur → Dubai, UAE"],
      ["Mode", "Air Freight"],
      ["Est. Freight Cost", "₹24,860"],
      ["Transit Time", "3–5 Days"],
    ],
    insight:
      "Air freight is fastest but costlier. Consider sea freight for large volumes to reduce landed cost significantly.",
    assumption:
      "Product is 100% cotton, knitted. Shipment weight is 500kg. Prices and duties are based on current available data and may change.",
    disclaimer:
      "All results are for reference only. Please verify with official government and customs sources before making business decisions.",
    tariffLink: "View Official Tariff Page",
    buttonText: "Create Shipment from this Result",
  },
  "Landed Cost Breakdown": {
    left: [
      ["Product Cost", "₹76,230"],
      ["Freight & Insurance", "₹24,860"],
      ["Duties & Taxes", "₹13,590"],
      ["Other Charges", "₹9,99"],
      ["Total Landed Cost", "₹1,24,680"],
    ],
    insight:
      "Total landed cost is ₹1,24,680. Duties and taxes account for ~11% of landed cost.",
    assumption:
      "Product is 100% cotton, knitted. Shipment weight is 500kg. Prices and duties are based on current available data and may change.",
    disclaimer:
      "All results are for reference only. Please verify with official government and customs sources before making business decisions.",
    tariffLink: "View Official Tariff Page",
    buttonText: "Create Shipment from this Result",
  },
  "Compliance & Documents": {
    left: [
      ["Certificate of Origin", "Required"],
      ["GSP Form A", "Recommended"],
      ["Packing List", "Required"],
      ["Commercial Invoice", "Required"],
      ["Airway Bill", "Required"],
    ],
    insight:
      "Ensure all documents are prepared and verified before shipment to avoid customs clearance delays at Dubai port.",
    assumption:
      "Product is 100% cotton, knitted. Shipment weight is 500kg. Prices and duties are based on current available data and may change.",
    disclaimer:
      "All results are for reference only. Please verify with official government and customs sources before making business decisions.",
    tariffLink: "View Official Tariff Page",
    buttonText: "Create Shipment from this Result",
  },
  "Market Insights": {
    left: [
      ["UAE Market Demand", "High"],
      ["Avg. Selling Price (UAE)", "AED 18–24 / piece"],
      ["Key Competitors", "Bangladesh, China"],
      ["India Market Share", "14.2%"],
    ],
    insight:
      "India's textile exports to UAE are growing. Leverage FTA benefits and competitive pricing to gain market share.",
    assumption:
      "Product is 100% cotton, knitted. Shipment weight is 500kg. Prices and duties are based on current available data and may change.",
    disclaimer:
      "All results are for reference only. Please verify with official government and customs sources before making business decisions.",
    tariffLink: "View Official Tariff Page",
    buttonText: "Create Shipment from this Result",
  },
};

const AiCargoMateAssistant = () => {

    const [activeTab, setActiveTab] = useState("AI CargoMate Assistant");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [analysisTab, setAnalysisTab] = useState("HS Code Analysis");
    const content = tabContent[analysisTab];

  return (
     <div className="flex-1 flex flex-col min-w-0 overflow-hidden pt-14">
              <header className="bg-white border-b border-gray-200 px-4 py-2.5 flex items-center gap-3 flex-shrink-0">
                {/* <button
                  className="lg:hidden p-1.5 rounded-md hover:bg-gray-100 text-gray-600"
                  onClick={() => setSidebarOpen(true)}
                >
                  <FiSettings size={18} />
                </button> */}
                <div className="flex items-center gap-1.5 text-sm text-gray-500">
                  <span>Dashboard</span>
                  <FiChevronRight size={12} />
                  <h1 className="">AI CargoMate Assistant</h1>
                  <FiChevronRight size={12} />
                  <span className=" font-medium">AI Result</span>
                </div>
              </header>
    
              <main className="flex-1 overflow-y-auto bg-gray-50 p-3 sm:p-4 lg:p-5">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h1 className="text-sm sm:text-lg font-bold text-gray-900">
                        AI CargoMate Assistant
                      </h1>
                      <span className="flex items-center gap-1 bg-[#EEF2FF] text-[#4338CA] text-[10px] font-semibold px-2 py-0.5 rounded-full border border-[#EEF2FF]">
                        <FiStar size={10} className="text-[#4338CA]" /> Core Module
                      </span>
                    </div>
                    <p className="text-xs font-normal  text-gray-500 mt-0.5">
                      Your AI trade assistant for smarter decisions
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button className="flex items-center gap-1.5 border border-gray-200 bg-white text-gray-700 text-xs  font-bold  px-3 py-1.5 rounded-lg hover:bg-gray-50">
                      <FiArrowLeft size={13} /> New Query
                    </button>
                    <button className="flex items-center gap-1.5 border border-gray-200 bg-white text-gray-700 text-xs  font-bold  px-3 py-1.5 rounded-lg hover:bg-gray-50">
                      <FiSave size={13} /> Save Report
                    </button>
                    <button className="flex items-center gap-1.5 border border-gray-200 bg-white text-gray-700 text-xs  font-bold  px-3 py-1.5 rounded-lg hover:bg-gray-50">
                      <FiDownload size={13} /> Download Report (PDF)
                    </button>
                    <button className="flex items-center gap-1.5 bg-[#0D9488] text-white text-xs  font-bold px-3 py-1.5 rounded-lg">
                      <FiPlus size={13} /> Create Shipment from this Result
                    </button>
                  </div>
                </div>
    
                <div className="flex items-start gap-2 bg-blue-50 border border-blue-200 rounded-lg px-3 py-2.5 mb-4 text-xs font-medium text-blue-800">
                  <FiInfo
                    size={14}
                    className="text-blue-500 flex-shrink-0 mt-0.5"
                  />
                  This result is AI-generated based on the data sources and
                  assumptions listed below. Please review before making any trade
                  decisions.
                </div>
    
                <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-4">
                  <div className="flex flex-col gap-4">
                    <div className="bg-white rounded-xl border border-gray-200 p-4">
                      <p className="text-xs font-bold text-gray-900 mb-3 flex items-center gap-2">
                        Your Query
                      </p>
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                        <div className="flex items-start gap-3">
                          <div className="w-9 h-9 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                            <FiMap className="text-blue-500 text-base" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-gray-800 leading-relaxed">
                              Best shipment option for exporting 500kg of cotton
                              t-shirt (100% cotton, knitted) from Tirupur, India to
                              Dubai, UAE by air. Include HS code, duty, incentives,
                              and total landed cost.
                            </p>
                            <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2 text-xs font-medium  text-gray-400">
                              <span className="">
                                Query ID:{" "}
                                <span className="t">
                                  {" "}
                                  AIQ-2025-04-24-000123
                                </span>{" "}
                              </span>
                              <span>• 24 Apr 2025, 09:25 AM</span>
                              <span>• User: Arjun Soni</span>
                            </div>
                          </div>
                          <button className="flex-shrink-0 flex items-center text-xs gap-1 border border-gray-200 bg-white text-gray-500 text-[10px] px-2 py-1 rounded-md hover:bg-gray-50">
                            <FiCopy size={14} /> Copy Query
                          </button>
                        </div>
                      </div>
                    </div>
    
                    <div className="bg-white rounded-xl border border-gray-200 p-4">
                      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                        <p className="text-xs sm:text-sm  font-bold text-gray-900 flex items-center gap-2">
                          <FiStar className="text-teal-500 text-base" /> AI Recommended Summary
                        </p>
                        <div className="flex gap-3">
                          <button className="flex items-center  gap-1 text-xs text-blue-500 font-medium">
                            <FiDatabase size={12} /> Data Sources (6)
                          </button>
                          <button className="flex items-center gap-1 text-xs font-medium text-gray-400">
                            <FiAlertCircle size={12} /> Disclaimer
                          </button>
                        </div>
                      </div>
    
                      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
                        {recCards.map((card, i) => (
                          <div
                            key={i}
                            className="bg-gray-50 border border-gray-200 rounded-xl p-3 flex flex-col"
                          >
                            <p className="text-xs text-[#222222] font-medium mb-1">
                              {card.label}
                            </p>
                            {card.route ? (
                              <>
                                <p className="text-[11px] font-bold text-gray-800 mb-0.5">
                                  Route
                                </p>
                                <p className="text-sm font-bold text-gray-900 mb-2">
                                  {card.route}
                                </p>
                              </>
                            ) : (
                              <>
                                <p
                                  className={`text-base font-bold mb-1 ${
                                    card.mainColor || "text-gray-900"
                                  }`}
                                >
                                  {card.main}
                                </p>
                                <p className="text-xs font-medium  text-gray-500 mb-2 leading-tight">
                                  {card.sub}
                                </p>
                              </>
                            )}
                            <div className="flex flex-col gap-1 flex-1">
                              {card.rows.map(([k, v], j) => (
                                <div
                                  key={j}
                                  className="flex justify-between text-xs"
                                >
                                  <span className="text-gray-500 text-xs font-medium">
                                    {k}
                                  </span>
                                  <span className="text-gray-800   text-xs font-medium">
                                    {v}
                                  </span>
                                </div>
                              ))}
                              {card.freightCost && (
                                <p className="text-base font-bold text-gray-900 mt-1">
                                  {card.freightCost}
                                </p>
                              )}
                            </div>
                            <button className="text-teal-500 text-xs  font-medium text-left mt-2 hover:underline">
                              {card.link}
                            </button>
                            <button className="mt-2 w-full border border-teal-500 text-teal-500 text-xs    font-semibold py-1.5 rounded-lg hover:bg-teal-50">
                              Create Shipment from this Result
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
    
                    <div className="bg-white rounded-xl border border-gray-200 p-4">
                      <p className="text-sm  font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <FiClipboard className="text-teal-500 text-base" /> Detailed AI Analysis
                      </p>
    
                      <div className="flex overflow-x-auto border-b border-gray-200 mb-5 sm:mb-8 gap-1 pb-0">
                        {analysisTabs.map((tab) => (
                          <button
                            key={tab}
                            onClick={() => setAnalysisTab(tab)}
                            className={`px-3 py-2 text-xs font-bold  whitespace-nowrap border-b-2 -mb-px transition-colors
                            ${
                              analysisTab === tab
                                ? "border-teal-500 text-teal-500"
                                : "border-transparent text-gray-500 hover:text-gray-700"
                            }`}
                          >
                            {tab}
                          </button>
                        ))}
                      </div>
  
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                        <div>
                          {content.left.map(([k, v], i) => (
                            <div
                              key={i}
                              className="flex justify-between space-y-2 py-2 border-b border-gray-100 last:border-0 text-xs"
                            >
                              <span className="text-gray-500  font-medium text-xs">
                                {k}
                              </span>
    
                              <span
                                className={`font-medium text-xs text-right max-w-[55%] ${
                                  k === "Total Landed Cost" ||
                                  k === "Total Incentive"
                                    ? "text-teal-600"
                                    : "text-gray-800"
                                }`}
                              >
                                {v}
                              </span>
                            </div>
                          ))}
    
                          <button className="mt-3 xl:mb-16 text-xs font-semibold text-blue-600 hover:text-blue-700">
                            {content.tariffLink}
                          </button>
    
                        
                        </div>
    
                        <div className="space-y-5">
                          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                            <p className="flex items-center gap-1.5 text-sm font-bold text-emerald-800 mb-2">
                              <FiStar size={12} className="text-emerald-500" />
                              AI Insight
                            </p>
    
                            <p className="text-xs font-normal text-emerald-900 leading-relaxed">
                              {content.insight}
                            </p>
                          </div>
    
                          <div className="bg-[#DBDBDB] border border-gray-200 rounded-lg p-3">
                            <p className="flex items-center gap-1.5 t text-sm font-bold text-gray-700 mb-2">
                              <FiClipboard size={12} />
                              Assumptions
                            </p>
    
                            <p className="text-xs font-normal text-gray-600 leading-relaxed">
                              {content.assumption}
                            </p>
                          </div>
    
                          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                            <p className="flex items-center gap-1.5 text-sm font-bold text-orange-700 mb-2">
                              <FiAlertCircle size={12} />
                              Disclaimer
                            </p>
    
                            <p className="text-xs font-normal text-orange-800 leading-relaxed">
                              {content.disclaimer}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
    
                  <div className="flex flex-col gap-4">
                    <div className="bg-white rounded-xl border border-gray-200 p-4">
                      <p className="text-sm sm:text-base font-bold text-gray-900 mb-3">
                        Result Summary
                      </p>
                      {resultSummary.map(
                        (
                          {
                            icon: Icon,
                            label,
                            value,
                            iconColor,
                            small,
                            valueColor,
                          },
                          i,
                        ) => (
                          <div
                            key={i}
                            className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0 text-xs font-medium"
                          >
                            <div
                              className={`flex items-center text-xs font-medium gap-2 text-gray-500`}
                            >
                              <Icon size={14} className={iconColor} /> {label}
                            </div>
                            <span
                              className={`font-medium text-right max-w-[50%] ${
                                valueColor || "text-gray-900"
                              } ${small ? "text-xs font-medium " : "text-xs font-medium"}`}
                            >
                              {value}
                            </span>
                          </div>
                        ),
                      )}
                      <button className="mt-3 w-full bg-[#0D9488] text-white text-sm   font-semibold py-2.5 rounded-xl">
                        Create Shipment from this Result
                      </button>
                    </div>
    
                    <div className="bg-white rounded-xl border border-gray-200 p-4">
                      <p className="text-sm  font-bold   text-gray-900 mb-3">
                        Report Information
                      </p>
                      {[
                        ["Report ID", "AIR-2025-04-24-000123"],
                        ["Generated On", "24 Apr 2025, 09:25 AM"],
                        ["Generated By", "Arjun Soni"],
                        ["Plan", "Pro Plan"],
                        ["AI Model Version", "v2.1.0"],
                      ].map(([k, v]) => (
                        <div
                          key={k}
                          className="flex justify-between py-1.5 text-[11px]"
                        >
                          <span className="text-gray-500 text-xs  font-medium">
                            {k}
                          </span>
                          <span className="text-gray-800  text-xs font-medium">
                            {v}
                          </span>
                        </div>
                      ))}
                      <button className="mt-3 w-full flex items-center justify-center gap-2 border text-sm  border-gray-200 bg-white text-gray-700 t s font-medium py-2 rounded-lg hover:bg-gray-50">
                        <FiDownload size={13} /> Download Report (PDF)
                      </button>
                    </div>
    
                    <div className="bg-white rounded-xl border border-gray-200 p-4">
                      <p className="text-sm font-bold text-gray-900 mb-3">
                        Save & Share
                      </p>
                      <div className="grid grid-cols-1 gap-2 pz">
                       
                        <button className="flex items-center justify-center gap-1.5 border border-gray-200 bg-white text-gray-700 text-sm font-medium py-2 rounded-lg hover:bg-gray-50">
                          <FiShare2 size={16} /> Share Report
                        </button>
                         <button className="flex items-center justify-center whitespace-nowrap  gap-1.5 border border-gray-200 bg-white text-gray-700 text-sm font-medium py-2 rounded-lg hover:bg-gray-50">
                          <FiBookmark size={16} /> Save  Reports
                        </button>
                      </div>
                    </div>
    
                    <div className="bg-white rounded-xl border border-gray-200 p-4">
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-sm  font-bold text-gray-900">
                          Audit Log (This Query)
                        </p>
                        <button className="text-teal-500 text-xs font-medium hover:underline">
                          View All
                        </button>
                      </div>
                      {auditLog.map((entry, i) => (
                        <div
                          key={i}
                          className="flex  gap-2 py-1.5 border-b border-gray-100 last:border-0"
                        >
                          <span
                            className={`w-2 h-2 rounded-full bg-green-500 flex-shrink-0 mt-1`}
                          />
                          
                          <span className=" flex-1 text-xs font-medium   text-gray-600">
                            {entry.text}
                          </span>
                          <span className="text-xs text-left text-gray-400 whitespace-nowrap">
                            {entry.time}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-3">
                  <div className="bg-white  flex flex-col justify-center gap-10 rounded-xl border border-gray-200  px-3 py-4">
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
              </main>

               <div className='] fixed right-5 bottom-5'>
                 <img src={chat} />
               </div>
       </div>
  )
}

export default AiCargoMateAssistant

