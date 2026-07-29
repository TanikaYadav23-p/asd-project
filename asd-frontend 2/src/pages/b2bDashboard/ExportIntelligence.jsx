// import { useState, useMemo } from "react";

// import {
//   FiMenu,
//   FiSearch,
//   FiBell,
//   FiMail,
//   FiSun,
//   FiMoon,
//   FiPlus,
//   FiUsers,
//   FiShield,
//   FiCreditCard,
//   FiDatabase,
//   FiFileText,
//   FiGlobe,
//   FiPackage,
//   FiTruck,
//   FiCpu,
//   FiPieChart,
//   FiLink,
//   FiMonitor,
//   FiHelpCircle,
//   FiGrid,
//   FiSettings,
//   FiChevronRight,
//   FiUserPlus,
//   FiUserCheck,
//   FiPlusCircle,
//   FiAlertCircle,
//   FiCheckCircle,
//   FiXCircle,
//   FiHome,
//   FiCamera,
//   FiLock,
//   FiSend,
// } from "react-icons/fi";
// import {
//   FaTrash,
//   FaAngleDown,
//   FaCheck,
//   FaBox,
//   FaBell,
//   FaChevronLeft,
//   FaFileLines,
//   FaListCheck,
//   FaGripVertical,
//   FaPlus,
//   FaSliders,
//   FaEye,
//   FaClock,
//   FaUser,
//   FaFloppyDisk,
//   FaPaperPlane,
//   FaUsers,
//   FaIndianRupeeSign,
//   FaRotate,
//   FaArrowUp,
//   FaStar,
//   FaChevronRight,
//   FaRobot,
// } from "react-icons/fa6";

// import {
//   FiEdit,
//   FiTrash2,
//   FiCheck,
//   FiDollarSign,
//   FiRefreshCw,
//   FiUser,
// } from "react-icons/fi";
// import {

//   FaDollarSign,
//   FaBoxOpen,
//   FaChartLine,
//   FaClipboardCheck,
// } from "react-icons/fa";
// import {
//   LineChart,
//   Line,
//   AreaChart,
//   Area,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
// } from "recharts";
// import { RxCross1 } from "react-icons/rx";
// import { FaCalendarAlt, FaTimes } from "react-icons/fa";
// import up from "../../assets/icon/up.png";
// import us from "../../assets/icon/us.png";

// import logo from "../../assets/Images/logo.png";

// import { BsCalendarCheck, BsPersonPlus, BsGraphUp } from "react-icons/bs";
// import { HiOutlineDocumentText } from "react-icons/hi";
// import { RiWhatsappLine } from "react-icons/ri";
// import { FiX } from "react-icons/fi";

// import map from "../../assets/Images/logo.png";
// import india from "../../assets/icon/india.png";
// import jpn from "../../assets/icon/jpn.png";

// import home from "../../assets/icon/home.png";
// import china from "../../assets/icon/china.png";

// import user from "../../assets/icon/user.png";
// import exportInt from "../../assets/icon/orders.png";
// import supplier from "../../assets/icon/suppliers.png";

// import analytical from "../../assets/icon/analytical.png";

// import document from "../../assets/icon/document.png";

// import payment from "../../assets/icon/payment.png";
// import ai from "../../assets/icon/ai.png";

// import support from "../../assets/icon/supportCenter.png";
// import setting from "../../assets/icon/setting.png";

// import report from "../../assets/icon/report.png";
// import insight from "../../assets/icon/insight.png";

// import germany from "../../assets/icon/germany.png";
// import risk from "../../assets/icon/risk.png";
// import settings from "../../assets/icon/settings.png";
// import cargo from '../../assets/icon/cargo.png'
// import world from '../../assets/icon/world.png'
// import port from '../../assets/icon/port.png'


// const statCards = [
//   {
//     label: "Total import Shipment",
//     value: "12,450",
//     change: "28.4%",
//     icon: cargo,
//     color: "bg-[#D1FAF5]",
//     text: "text-[#D1FAF5]",
//   },
//   {
//     label: "Active Importers",
//     value: "24,875",
//     change: "28.4%",
//     icon: FaUsers,
//     color: "bg-[#FDECCE]",
//     text: "text-[#935F06]",
//   },
//   {
//     label: "Import Trade Value [YTD]",
//     value: "4,320",
//     change: "28.4%",
//     icon: FaDollarSign,
//     color: "bg-[#D1FAF5]",
//     text: "text-[#14B8A6]",
//   },
//   {
//     label: "Top import country",
//     value: "$ 2.48B",
//     change: "28.4%",
//     icon: world,
//     color: "bg-[#FDECCE]",
//     text: "text-[#FDECCE]",
//   },
//   {
//     label: "Fast growing product",
//     value: "12420",
//     change: "28.4%",
//     icon: FaBoxOpen,
//     color: "bg-[#D1FAF5]",
//     text: "text-[#14B8A6]",
//   },
//   {
//     label: "Monthly import growth",
//     value: "15.62%",
//     change: "28.4%",
//     icon: FaChartLine,
//     color: "bg-[#FDECCE]",
//     text: "text-[#935F06]",
//   },
//   {
//     label: "Port Activity",
//     value: "2558",
//     change: "28.4%",
//     icon: port,
//     color: "bg-[#D1FAF5]",
//     text: "text-[#14B8A6]",
//   },
//   {
//     label: "Custom Clearance Rate",
//     value: "97%",
//     change: "28.4%",
//     icon: FaClipboardCheck,
//     color: "bg-[#FDECCE]",
//     text: "text-[#935F06]",
//   },
// ];

// const globalTrade = [
//   {
//     name: "Live Shipment",
//     color: "text-red-600",
//     no: "1246",
//   },
//   {
//     name: "In Transit",
//     color: "text-green-500",
//     no: "892",
//   },
//   {
//     name: "Port",
//     color: "text-black",
//     no: "184",
//   },
//   {
//     name: "Delivered",
//     color: "text-black",
//     no: "171",
//   },
// ];

// const countries = [
//   {
//     flag: us, 
//     country: "United States",
//     importValue: "₹ 300k",
//     growth: "28.4%",
//   },
//   {
//     flag: germany,
//     country: "Germany",
//     importValue: "₹ 500k",
//     growth: "22.1%",
//   },
//   {
//     flag: china,
//     country: "China",
//     importValue: "₹ 3.50k",
//     growth: "18.2%",
//   },
//   {
//     flag: india,
//     country: "India",
//     importValue: "₹ 800k",
//     growth: "16.3%",
//   },
//   {
//     flag: jpn,
//     country: "Japan",
//     importValue: "₹ 800k",
//     growth: "16.3%",
//   }, {
//     flag: jpn,
//     country: "Japan",
//     importValue: "₹ 800k",
//     growth: "16.3%",
//   },
//   {
//     flag: jpn,
//     country: "Japan",
//     importValue: "₹ 800k",
//     growth: "16.3%",
//   },];

// const insightt = [
//   { label: "Delivered", percent: 34.58, color: "#1FBC95" },
//   { label: "In Transit", percent: 34.58, color: "#3F88FC" },
//   { label: "Verified", percent: 34.58, color: "#8054E8" },
//   { label: "Custom hold ", percent: 34.58, color: "#F3846E" },
//   { label: "Priority", percent: 34.58, color: "#B8B8B8" },
// ];

// const trendData = [
//     {date: 1, month: "May", val: 2.5 }, { date: 8,month: "May", val: 4 }, {date: 15, month: "May", val: 3 },
//     {date: 22, month: "May", val: 7 }, { date: 29,month: "May", val: 5.5 }, {date: 1, month: "June", val: 4 },
   
//   ];


//   const shipmentData = [
//     { label: "01 May", shipment: 4200, tradeValue: 15 },
//     { label: "04 May", shipment: 4800, tradeValue: 35 },
//     { label: "08 May", shipment: 9500, tradeValue: 20 },
//     { label: "15 May", shipment: 11200, tradeValue: 55 },
//     { label: "22 May", shipment: 7800, tradeValue: 26 },
//     { label: "29 May", shipment: 10500, tradeValue: 23 },
//     { label: "1 june", shipment: 8200, tradeValue: 58 },
//     { label: "5 june", shipment: 8200, tradeValue: 48 },
  
//   ];
  
//   function smoothPath(points, xScale, yScale) {
//     const pts = points.map((p, i) => ({ x: xScale(i), y: yScale(p) }));
//     let d = `M ${pts[0].x} ${pts[0].y}`;
//     for (let i = 0; i < pts.length - 1; i++) {
//       const cp1x = pts[i].x + (pts[i + 1].x - pts[i].x) * 0.5;
//       const cp2x = cp1x;
//       d += ` C ${cp1x} ${pts[i].y}, ${cp2x} ${pts[i + 1].y}, ${pts[i + 1].x} ${pts[i + 1].y}`;
//     }
//     return d;
//   }

//   function TradeActivityChart() {
//     const [period, setPeriod] = useState("Monthly");
  
//     const W = 1000, H = 180;
//     const padL = 48, padR = 52, padT = 14, padB = 32;
//     const chartW = W - padL - padR;
//     const chartH = H - padT - padB;
//     const maxShipment = 15000;
//     const maxTrade = 60;
  
//     const xScale = (i) => padL + (i / (shipmentData.length - 1)) * chartW;
//     const yScaleShipment = (v) => padT + chartH - (v / maxShipment) * chartH;
//     const yScaleTrade = (v) => padT + chartH - (v / maxTrade) * chartH;
  
//     const tradeLine = smoothPath(shipmentData.map(d => d.tradeValue), xScale, yScaleTrade);
//     const tradeArea = tradeLine + ` L ${xScale(shipmentData.length - 1)} ${padT + chartH} L ${xScale(0)} ${padT + chartH} Z`;
  
//     const yLabelsLeft = [0, 5000, 10000, 15000];
//     const yLabelsRight = [0, 20, 40, 60];
  
//     return (
//       <div className="bg-white rounded-2xl border border-slate-100 shadow-md  sm:p-5 py-3 w-full ">
//         <div className="px-5 ">
//           <h1 className="text-sm md:text-2xl sm:px-2 py-2 font-medium">Trade Activity (This Month) </h1>
//         </div>

//         <div className="flex gap-4 mb-3 px-5 sm:px-8">
//           <div className="flex items-center gap-1.5">
//             <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
//             <span className="text-xs sm:text-lg text-slate-500">Shipment</span>
//           </div>
//           <div className="flex items-center gap-1.5">
//             <div className="w-2.5 h-2.5 rounded-full bg-teal-400" />
//             <span className="text-xs sm:text-lg text-slate-500">Trade Value</span>
//           </div>
//         </div>
  
//         <div className="w-full overflow-x-auto">
//           <svg viewBox={`0 0 ${W} ${H}`} className="w-full min-w-[300px] h-auto" preserveAspectRatio="xMidYMid meet">
//             <defs>
//               <linearGradient id="tradeGrad" x1="0" y1="0" x2="0" y2="1">
//                 <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.35" />
//                 <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0.02" />
//               </linearGradient>
//             </defs>
  
//             {yLabelsLeft.map((v, i) => (
//               <g key={i}>
//                 <line x1={padL} x2={W - padR} y1={yScaleShipment(v)} y2={yScaleShipment(v)} stroke="#f1f5f9" strokeWidth="1" />
//                 <text className="text-sm sm:text-lg text-[#3D3D3D] " x={padL - 6} y={yScaleShipment(v) + 4} textAnchor="end" fontSize="10" fill="#94a3b8">
//                   {v === 0 ? "0" : `${v / 1000}k`}
//                 </text>
//               </g>
//             ))}
  
//             {yLabelsRight.map((v, i) => (
//               <text className="text-sm sm:text-lg text-[#3D3D3D] " key={i} x={W - padR + 8} y={yScaleTrade(v) + 4} textAnchor="start" fontSize="10" fill="#2dd4bf" fontWeight="600">
//                 {v === 0 ? "0" : `${v}B`}
//               </text>
//             ))}
  
//             <path d={tradeArea} fill="url(#tradeGrad)" />
//             <path d={tradeLine} fill="none" stroke="#2dd4bf" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  
//             {shipmentData.map((d, i) => (
//               <circle key={i} cx={xScale(i)} cy={yScaleTrade(d.tradeValue)}  r="4" fill="white" stroke="#2dd4bf" strokeWidth="2" />
//             ))}
  
//             {shipmentData.map((d, i) => (
//               <text className="text-xs sm:text-sm" key={i} x={xScale(i)} y={H - 4} textAnchor="middle" fontSize="10" fill="#94a3b8">{d.label}</text>
//             ))}
//           </svg>
//         </div>
//       </div>
//     );
//   }
 
 

// function WorldMap() {
//   return (
//     <div className="relative w-full h-44 flex justify-center bg-blue-50 rounded-xl overflow-hidden">
//       <img src="https://res.cloudinary.com/dhuabv2it/image/upload/v1778229817/Map_hhooem.webp" />
//     </div>
//   );
// }

//  function ShipmentTable({ shipments = [] }) {
//   const [currentPage, setCurrentPage] = useState(1);

//   const itemsPerPage = 10;

//   const totalPages = Math.ceil(shipments.length / itemsPerPage);

//   const paginatedData = useMemo(() => {
//     const start = (currentPage - 1) * itemsPerPage;

//     return shipments.slice(start, start + itemsPerPage);
//   }, [currentPage, shipments]);

//   return (
//     <div className="bg-white rounded-2xl border overflow-hidden shadow-lg">
//       <div className="p-4 sm:p-6">
//         <h2 className="text-lg sm:text-xl text-[#404040]  font-semibold">
//           Global Import Shipment
//         </h2>

//         <div className="grid grid-cols-2 lg:flex gap-3 mt-5 text-[#7D7D7D] text-sm">
//           <select className="border rounded-lg px-3 py-2 w-full lg:w-44">
//             <option>All Countries</option>
//             <option>Australia</option>
//             <option>USA</option>
//             <option>China</option>
//           </select>

//           <select className="border rounded-lg px-3 py-2 w-full lg:w-44">
          
//             <option>Active</option>
//             <option>Inactive</option>
//           </select>

//           <select className="border rounded-lg px-3 py-2 w-full lg:w-44">
//             <option>All Modes</option>\
//             <option>Online</option>
//             <option>Offline</option>
//           </select>

//           <select className="border rounded-lg px-3 py-2 w-full lg:w-44">
//             <option>This Month</option>
//           </select>
//         </div>
//       </div>
      

//       <div className=" block overflow-x-auto h-96">
//         <table className="w-full min-w-[1400px] text-[#868686] text-xs">
//           <thead className="bg-[#DEDEDE] border-y ">
//             <tr>
//               <th className="px-4 py-3 text-left   ">Shipment Date</th>
//               <th className="px-4 py-3 text-left ">HS Code</th>
//               <th className="px-4 py-3 text-left ">Product</th>
//               <th className="px-4 py-3 text-left ">Importer</th>
//               <th className="px-4 py-3 text-left ">Exporter</th>
//               <th className="px-4 py-3 text-left ">Quantity</th>
//               <th className="px-4 py-3 text-left ">Value</th>
//               <th className="px-4 py-3 text-left ">Origin</th>
//               <th className="px-4 py-3 text-left ">Destination</th>
//               <th className="px-4 py-3 text-left ">Port</th>
//               <th className="px-4 py-3 text-left ">Type</th>
//               <th className="px-4 py-3 text-left ">AI Risk</th>
//               <th className="px-4 py-3 text-left ">Status</th>
//             </tr>
//           </thead>

//           <tbody>
//             {paginatedData.map((item) => (
//               <tr key={item.id} className="border-b">
//                 <td className="px-4 py-4">{item.shipmentDate}</td>
//                 <td className="px-4 py-4">{item.hsCode}</td>
//                 <td className="px-4 py-4">{item.product}</td>
//                 <td className="px-4 py-4">{item.importer}</td>
//                 <td className="px-4 py-4">{item.exporter}</td>
//                 <td className="px-4 py-4">{item.quantity}</td>
//                 <td className="px-4 py-4">{item.value}</td>
//                 <td className="px-4 py-4">{item.origin}</td>
//                 <td className="px-4 py-4">{item.destination}</td>
//                 <td className="px-4 py-4">{item.port}</td>
//                 <td className="px-4 py-4">{item.type}</td>
//                 <td className="px-4 py-4">{item.aiRisk}</td>
//                 <td className="px-4 py-4">{item.status}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <Pagination
//         currentPage={currentPage}
//         totalPages={totalPages}
//         onPageChange={setCurrentPage}
//         totalRecords={shipments.length}
//         start={(currentPage - 1) * itemsPerPage + 1}
//         end={Math.min(currentPage * itemsPerPage, shipments.length)}
//       />
//     </div>
//   );
// }

// function Pagination({
//   currentPage,
//   totalPages,
//   onPageChange,
//   totalRecords,
//   start,
//   end,
// }) {
//   const pages = [];

//   for (let i = 1; i <= totalPages; i++) {
//     pages.push(i);
//   }

//   return (
//     <div className="border-t p-4 flex flex-row gap-4 justify-between items-center">
//       <p className="text-xs text-[#868686]">
//         Showing {start} to {end} of {totalRecords} results
//       </p>

//       <div className="flex items-center gap-2">
//         <button
//           disabled={currentPage === 1}
//           onClick={() => onPageChange(currentPage - 1)}
//           className="border rounded-lg text-xs px-3 py-2 disabled:opacity-40"
//         >
//           Prev
//         </button>

//         {pages.map((page) => (
//           <button
//             key={page}
//             onClick={() => onPageChange(page)}
//             className={`h-8 w-8 text-xs rounded-lg ${
//               currentPage === page
//                 ? "bg-teal-500 text-white"
//                 : "border"
//             }`}
//           >
//             {page}
//           </button>
//         ))}

//         <button
//           disabled={currentPage === totalPages}
//           onClick={() => onPageChange(currentPage + 1)}
//           className="border rounded-lg text-xs px-3 py-2 disabled:opacity-40"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }

// const shipmentsData = [
//   {
//     id: 1,
//     shipmentDate: "20 May 2024",
//     hsCode: "85171200",
//     product: "Smartphone",
//     importer: "Apple Inc",
//     exporter: "Foxconn Ltd",
//     quantity: "25445 PCS",
//     value: "$25445",
//     origin: "China",
//     destination: "USA",
//     port: "Shanghai",
//     type: "Sea",
//     aiRisk: "Low",
//     status: "Completed",
//   },
//   {
//     id: 2,
//     shipmentDate: "21 May 2024",
//     hsCode: "12345678",
//     product: "Laptop",
//     importer: "Dell",
//     exporter: "ABC Ltd",
//     quantity: "100 PCS",
//     value: "$50000",
//     origin: "India",
//     destination: "USA",
//     port: "Mumbai",
//     type: "Air",
//     aiRisk: "Medium",
//     status: "Pending",
//   }]



// export default function ExportIntelligence() {
//   const [openTrade, setOpenTrade] = useState(false);
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [activeNav, setActiveNav] = useState("Dashboard");
//   const { activeSubTab, setActiveSubTab } = useState("");
//   const [trendPeriod, setTrendPeriod] = useState("Monthly");

//   const [chatInput, setChatInput] = useState("");
//   const riskColor = {
//     Low: "bg-teal-100 text-teal-600",
//     Medium: "bg-orange-100 text-orange-500",
//     High: "bg-red-100 text-red-500",
//   };

//   const size = 160;
//   const cx = size / 2, cy = size / 2;
//   const R = 60, r = 40;
//   const gap = 0;
//   const total = insightt.reduce((s, d) => s + parseFloat(d.percent), 0);
//   let angle = -90;

//   const slices = insightt.map(d => {
//     const val = parseFloat(d.percent);
//     const sweep = (val / total) * 360;
//     const startAngle = angle;
//     angle += sweep + gap;
//     return { ...d, startAngle, sweep: sweep - gap };
//   });

//   const toRad = deg => (deg * Math.PI) / 180;
//   const arcPath = (start, sweep) => {
//     const x1 = cx + R * Math.cos(toRad(start));
//     const y1 = cy + R * Math.sin(toRad(start));
//     const x2 = cx + R * Math.cos(toRad(start + sweep));
//     const y2 = cy + R * Math.sin(toRad(start + sweep));
//     const ix1 = cx + r * Math.cos(toRad(start + sweep));
//     const iy1 = cy + r * Math.sin(toRad(start + sweep));
//     const ix2 = cx + r * Math.cos(toRad(start));
//     const iy2 = cy + r * Math.sin(toRad(start));
//     const large = sweep > 180 ? 1 : 0;
//     return `M ${x1} ${y1} A ${R} ${R} 0 ${large} 1 ${x2} ${y2} L ${ix1} ${iy1} A ${r} ${r} 0 ${large} 0 ${ix2} ${iy2} Z`;
//   };

//   return (
//     <div className="flex h-screen bg-gray-100 overflow-hidden font-sans  ">
//       <main className="flex-1 overflow-y-auto bg-gray-50  sm:px-10 px-1">
//         <div
//           className="min-h-screen bg-gray-50 p-4 lg:p-1 xl:p-6 "
//           style={{ fontFamily: "'Poppins', sans-serif" }}
//         >
//           <link
//             href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap"
//             rel="stylesheet"
//           />
//           <div className="max-w-7xl mx-auto ">
//             <div className="mb-5">
//               <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 ">
//                Global Export Intelligence
//               </h1>
//               <p className="text-xs sm:text-lg text-gray-600 mt-0.5">
//                 AI powered export shipment Analytics and trade intelligence
//               </p>
//             </div>

//             {/* STAT CARDS */}
//             <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mb-5">
//               {statCards.map((s, ) => (

//                    <div
//                   key={s.label}
//                   className="bg-white  flex w-full  max-w-72 gap-3 rounded-2xl  shadow-md p-3"
//                 >
//                 <div className={` ${s.color} w-8 h-8 hidden sm:flex items-center justify-center   rounded-md`}>  
//                 {
//                     typeof s.icon === "string" ? (
//                       <img src={s.icon} alt="" className="w-5 h-5" />
//                     ) : (
//                       s.icon && <s.icon size={18} className={` ${s.text} `} />
//                     )
//                   }
//                  </div>
//                  <div className="flex flex-col gap-3 p-1 sm:p-0 w-full">
//                   <p className="text-xs sm:text-sm text-[#787B7F] leading-tight">
//                     {s.label}
//                   </p>
//                   <div className="flex items-end justify-between w-full gap-2">
//                     <p className="text-xs md:text-sm xl:text-xl font-semibold text-gray-800">
//                       {s.value}
//                     </p>
//                     <p className="text-xs text-[#31FF07] flex items-center gap-0.5 font-medium">
//                       <img src={up} alt="arrow" className="w-3 h-3" />
//                       {s.change}
//                     </p>
//                   </div>
//                 </div>
//                 </div>
//               ))}
//             </div>

//             <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-4  ">
//               <div className="bg-white rounded-3xl  max-h-96 xl:max-h-fit shadow-md p-5 ">
//                 <h2 className="text-lg sm:text-xl font-medium text-black mb-4">
//                   Global Trade Intelligence Map
//                 </h2>

//                 <WorldMap />

//                 <div className="grid grid-cols-4 gap-3 mt-6">
//                   {globalTrade.map((val, id) => (
//                     <div
//                       key={id}
//                       className="border border-gray-200 rounded-xl p-2"
//                     >
//                       <p
//                         className={`text-[0.4rem] sm:text-[0.5rem] whitespace-nowrap font-medium ${val.color}`}
//                       >
//                         {val.name}
//                       </p>

//                       <p className="text-xs sm:text-[0.8rem] font-bold text-black">
//                         {val.no}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="lg:col-span-2 col-span-1 flex flex-col   ">
//                 <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] h-full md:max-h-full xl:max-h-full gap-4  py-5  sm:py-0">
//                   <div className="bg-white rounded-3xl border border-gray-200 shadow-md sm:p-3 py-5">
//                     <div className="flex flex-col items-center gap-3 mb-2">
//                       <h2 className="text-sm sm:text-lg lg:text-xl font-semibold text-black">
//                         Top Exporting Countries
//                       </h2>

//                       <div className="px-5 sm:gap-10 w-full">
//                         <div className="grid grid-cols-3 gap-2 pb-2 border-b">
//                           <p className="text-sm sm:text-lg font-medium text-[#353535]">
//                             Country
//                           </p>
//                           <p className="text-sm sm:text-lg text-center font-medium text-[#353535]">
//                             Import Value
//                           </p>
//                           <p className="text-sm sm:text-lg font-medium text-[#353535] text-right">
//                             Growth
//                           </p>
//                         </div>

//                         {countries.map((item, index) => (
//                           <div
//                             key={index}
//                             className="grid grid-cols-3 gap-4 py-1 items-center"
//                           >
//                             <div className="flex items-center gap-2">
//                               <img
//                                 src={item.flag}
//                                 alt={item.country}
//                                 className="w-6 h-6 object-cover rounded"
//                               />
//                               <p className="text-xs sm:text-sm font-normal text-black">
//                                 {item.country}
//                               </p>
//                             </div>

//                             <p className="text-xs font-normal text-center text-black">
//                               {item.importValue}
//                             </p>

//                             <div className="flex items-center justify-end gap-2">
//                               <p className="text-xs text-[#31FF07] flex items-center gap-0.5 mt-0.5 font-medium">
//                                 <img src={up} alt="arrow" className="text-xs" />
//                               </p>{" "}
//                               <p className="text-xs font-normal text-center text-[#31FF07]">
//                                 {item.growth}
//                               </p>
//                             </div>
//                           </div>
//                         ))}

//                         <button className="w-full mt-4 border rounded-xl py-2 text-blue-600 text-sm font-medium">
//                           View All Countries
//                         </button>
//                       </div>
//                     </div>
//                   </div>

                
//                   <div className="bg-white h-full rounded-3xl border border-gray-200 shadow-md p-3 flex flex-col justify-evenly">
//                   <div className="flex justify-center">
//                       <div className="relative" style={{ width: size, height: size }}>
//                         <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
//                           {slices.map((s, i) => (
//                             <path key={i} d={arcPath(s.startAngle, s.sweep)} fill={s.color} />
//                           ))}
//                         </svg>
//                         <div className="absolute inset-0 flex flex-col items-center justify-center">
//                           <span className="text-sm sm:text-base font-medium text-slate-800">7.45M</span>
//                           <span className="text-xs text-slate-400">Total</span>
//                         </div>
//                       </div>
//                     </div>
//                             <div>
//                                 <div className="flex flex-col gap-4 mb-2">
//                                 {insightt.map((item, index) => (
//                                     <div
//                                     key={index}
//                                     className="flex items-center justify-between"
//                                     >
//                                     <div className="flex items-center gap-2">
//                                         <span style={{ backgroundColor: item.color }}
//                                         className={`w-2 h-2  rounded-full flex-shrink-0`}
//                                         ></span>

//                                         <p className="text-xs font-normal text-black">
//                                         {item.label}
//                                         </p>
//                                     </div>

//                                     <p className="text-xs font-normal text-[#666666]">
//                                         {item.percent}
//                                     </p>
//                                     </div>
//                                 ))}
//                                 </div>
//                             </div>

//                             <div className="border border-gray-200 rounded-xl px-3 py-2 mt-4">
//                                 <button className="w-full text-[#1F73C6] text-xs sm:text-sm font-medium text-center">
//                                 Explore All Insights
//                                 </button>
//                             </div>
//                     </div>
//                 </div>
//               </div>
//             </div>


//                  <TradeActivityChart />
            
//           </div>

//           <div className="mt-10">
//              <ShipmentTable  shipments={shipmentsData}/>
//           </div>

//         </div>
//       </main>
//     </div>
//   );
// }

















import React, { useState, useMemo } from "react";
import {
  CalendarDays,
  Download,
  Package,
  IndianRupee,
  Users,
  Truck,
  Globe,
  Clock3,
  ChevronDown,
  HelpCircle,
  Clock,
} from "lucide-react";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

// ==========================================
// 1. RAW EXPORT DATA (Image {B06B6444-DD0A-4D01-9B45-F1AF036CA639}.png के अनुसार)
// ==========================================
const INITIAL_STATS = [
  { title: "Total Export Shipments", value: "8,742", change: "▲ 16.8% vs last month", icon: Package, color: "text-blue-500", bg: "bg-blue-50", isUp: true },
  { title: "Total Export Value (INR)", value: "₹1,245.80 Cr", change: "▲ 18.6% vs last month", icon: IndianRupee, color: "text-green-500", bg: "bg-green-50", isUp: true },
  { title: "Total Exporters", value: "1,865", change: "▲ 12.3% vs last month", icon: Users, color: "text-cyan-500", bg: "bg-cyan-50", isUp: true },
  { title: "Total Suppliers", value: "320", change: "▲ 14.7% vs last month", icon: Truck, color: "text-emerald-500", bg: "bg-emerald-50", isUp: true },
  { title: "Countries of Origin", value: "68", change: "▲ 9.4% vs last month", icon: Globe, color: "text-purple-500", bg: "bg-purple-50", isUp: true },
  { title: "Avg. Shipment Value (INR)", value: "₹14.26 L", change: "▼ 3.2% vs last month", icon: IndianRupee, color: "text-orange-500", bg: "bg-orange-50", isUp: false },
  { title: "Avg. Lead Time (Days)", value: "18.6", change: "▼ 3.2% vs last month", icon: Clock3, color: "text-red-500", bg: "bg-red-50", isUp: false },
];

const INITIAL_PRODUCTS = [
  { hsCode: "85", desc: "Electrical Machinery & Equipment", shipments: "1,985", value: 412.35, share: "21.0%", barWidth: "w-[21%]" },
  { hsCode: "84", desc: "Machinery & Mechanical Appliances", shipments: "1,542", value: 352.80, share: "18.1%", barWidth: "w-[18.1%]" },
  { hsCode: "90", desc: "Optical, Medical & Precision Instruments", shipments: "895", value: 231.40, share: "11.7%", barWidth: "w-[11.7%]" },
  { hsCode: "72", desc: "Iron & Steel", shipments: "724", value: 165.70, share: "8.5%", barWidth: "w-[8.5%]" },
  { hsCode: "39", desc: "Plastics & Articles", shipments: "628", value: 128.90, share: "6.5%", barWidth: "w-[6.5%]" },
];

const INITIAL_LINE_DATA = [
  { date: "01 Apr", value: 600 }, { date: "06 Apr", value: 850 }, { date: "11 Apr", value: 780 },
  { date: "16 Apr", value: 1100 }, { date: "21 Apr", value: 1020 }, { date: "24 Apr", value: 1245 },
];

const INITIAL_PIE_DATA = [
  { name: "USA", value: 512.35, percent: "27.3%", color: "#2563EB" },
  { name: "UAE", value: 302.80, percent: "16.1%", color: "#10B981" },
  { name: "China", value: 268.40, percent: "14.3%", color: "#8B5CF6" },
  { name: "Germany", value: 208.40, percent: "10.3%", color: "#F59E0B" },
  { name: "Bangladesh", value: 268.40, percent: "14.3%", color: "#6366F1" },
  { name: "Netherland", value: 268.40, percent: "14.3%", color: "#94A3B8" },
  { name: "Other", value: 268.40, percent: "14.3%", color: "#EC4899" },
];

const INITIAL_EXPORTERS = [
  { name: "ABC Trading Co. Ltd.", shipments: "845", value: "₹125.40 Cr", growth: "▲ 18.9%", isUp: true, country: "USA" },
  { name: "Global Industrial Inc.", shipments: "712", value: "₹96.75 Cr", growth: "▲ 15.2%", isUp: true, country: "UAE" },
  { name: "Omega Supplies", shipments: "588", value: "₹76.30 Cr", growth: "▲ 11.4%", isUp: true, country: "China" },
  { name: "Prime Exports Ltd.", shipments: "502", value: "₹64.20 Cr", growth: "▲ 9.8%", isUp: true, country: "Germany" },
];

const INITIAL_BUYERS = [
  { name: "ABC Imports Pvt. Ltd.", shipments: "1,245", value: "₹152.45 Cr", growth: "▲ 18.9%", isUp: true, country: "USA" },
  { name: "Global Enterprises", shipments: "1,021", value: "₹128.75 Cr", growth: "▲ 15.2%", isUp: true, country: "UAE" },
  { name: "Omega Traders", shipments: "812", value: "₹98.60 Cr", growth: "▲ 11.4%", isUp: true, country: "China" },
  { name: "Shree Impex", shipments: "708", value: "₹86.20 Cr", growth: "▲ 9.8%", isUp: true, country: "Germany" },
];

const INITIAL_PORTS = [
  { name: "Nhava Sheva (Mumbai)", shipments: "2,856", value: "₹412.40 Cr", share: "33.1%" },
  { name: "Mundra (Gujarat)", shipments: "1,745", value: "₹286.40 Cr", share: "23.0%" },
  { name: "Chennai", shipments: "1,256", value: "₹181.20 Cr", share: "14.5%" },
  { name: "Kolkata", shipments: "986", value: "₹134.80 Cr", share: "10.8%" },
];

const INITIAL_SHIPMENTS = [
  { id: "EXP-2025-2045", hsCode: "85", desc: "Electrical Machinery & Equipment", exporter: "ABC Exports Pvt. Ltd.", buyer: "Global Retail Inc.", country: "USA", port: "Nhava Sheva", date: "24 Apr 2025", value: "₹ 45.80 Cr", status: "DELIVERED" },
  { id: "EXP-2025-2044", hsCode: "84", desc: "Machinery & Mechanical Appliances", exporter: "Global Trade Solutions", buyer: "TechMart USA", country: "UAE", port: "Mundra", date: "23 Apr 2025", value: "₹ 38.75 Cr", status: "DELIVERED" },
  { id: "EXP-2025-2043", hsCode: "90", desc: "Optical, Medical & Precision Instruments", exporter: "Prime Exports Ltd.", buyer: "Mega Traders LLC", country: "Germany", port: "Chennai", date: "22 Apr 2025", value: "₹ 28.30 Cr", status: "IN TRANSIT" },
  { id: "EXP-2025-2042", hsCode: "72", desc: "Iron & Steel", exporter: "Shree Exports", buyer: "Euro International GmbH", country: "China", port: "Nhava Sheva", date: "21 Apr 2025", value: "₹ 18.90 Cr", status: "DELIVERED" },
  { id: "EXP-2025-2041", hsCode: "39", desc: "Plastics & Articles", exporter: "Omega Exports Pvt. Ltd.", buyer: "Oceanic Distributors", country: "Bangladesh", port: "Kolkata", date: "20 Apr 2025", value: "₹ 16.20 Cr", status: "PENDING" },
];

export default function ExportIntelligenceDashboard() {
  // ==========================================
  // 2. STATE MANAGEMENT FOR DYNAMIC FILTERS
  // ==========================================
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPort, setSelectedPort] = useState("All Ports");
  const [selectedCountry, setSelectedCountry] = useState("All Countries");
  const [selectedExporter, setSelectedExporter] = useState("All Exporters");
  const [selectedBuyer, setSelectedBuyer] = useState("All Buyers");

  // Filter application triggers state
  const [appliedFilters, setAppliedFilters] = useState({
    search: "", port: "All Ports", country: "All Countries", exporter: "All Exporters", buyer: "All Buyers"
  });

  const handleApplyFilters = () => {
    setAppliedFilters({
      search: searchQuery,
      port: selectedPort,
      country: selectedCountry,
      exporter: selectedExporter,
      buyer: selectedBuyer
    });
  };

  const handleResetFilters = () => {
    setSearchQuery(""); setSelectedPort("All Ports"); setSelectedCountry("All Countries");
    setSelectedExporter("All Exporters"); setSelectedBuyer("All Buyers");
    setAppliedFilters({ search: "", port: "All Ports", country: "All Countries", exporter: "All Exporters", buyer: "All Buyers" });
  };

  // ==========================================
  // 3. MEMOIZED FILTERING LOGIC
  // ==========================================
  const filteredShipments = useMemo(() => {
    return INITIAL_SHIPMENTS.filter(ship => {
      const matchSearch = ship.desc.toLowerCase().includes(appliedFilters.search.toLowerCase()) || ship.hsCode.includes(appliedFilters.search);
      const matchPort = appliedFilters.port === "All Ports" || ship.port.includes(appliedFilters.port);
      const matchCountry = appliedFilters.country === "All Countries" || ship.country === appliedFilters.country;
      const matchExporter = appliedFilters.exporter === "All Exporters" || ship.exporter.includes(appliedFilters.exporter.split(" ")[0]);
      const matchBuyer = appliedFilters.buyer === "All Buyers" || ship.buyer.includes(appliedFilters.buyer.split(" ")[0]);
      
      return matchSearch && matchPort && matchCountry && matchExporter && matchBuyer;
    });
  }, [appliedFilters]);

  const dynamicPieData = useMemo(() => {
    if (appliedFilters.country !== "All Countries") {
      return INITIAL_PIE_DATA.filter(c => c.name === appliedFilters.country);
    }
    return INITIAL_PIE_DATA;
  }, [appliedFilters.country]);

  const computedTotalValue = useMemo(() => {
    if (appliedFilters.country !== "All Countries") {
      const match = INITIAL_PIE_DATA.find(c => c.name === appliedFilters.country);
      return match ? `₹${match.value.toFixed(2)} Cr` : "₹0.00 Cr";
    }
    return "₹1,876.45 Cr"; // Default Image Center Text
  }, [appliedFilters.country]);

  return (
    <div className="min-h-screen  overflow-y-auto bg-[#f8fafc] p-6 text-slate-700 antialiased font-sans flex flex-col justify-between pt-14">
      <div>
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#1e293b]">Export Intelligence</h1>
            <p className="text-sm text-slate-400 mt-0.5">
              Discover export performance, markets, buyers, and opportunities.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full lg:w-auto">
            <button className="flex-1 lg:flex-none bg-white border border-slate-200 px-4 py-2 rounded-xl flex items-center justify-center gap-2 text-sm font-medium text-slate-600 shadow-sm hover:bg-slate-50 transition">
              <CalendarDays size={16} className="text-slate-400" />
              01 Apr 2025 - 24 Apr 2025
            </button>
            <button className="flex-1 lg:flex-none bg-white border border-slate-200 px-4 py-2 rounded-xl flex items-center justify-center gap-2 text-sm font-medium text-slate-600 shadow-sm hover:bg-slate-50 transition">
              <Download size={16} className="text-slate-400" />
              Export Report
            </button>
          </div>
        </div>

        {/* METRICS STATS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-7 gap-4 mb-6">
          {INITIAL_STATS.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="text-[13px] font-medium text-slate-600 leading-tight block max-w-[85%]">
                    {item.title}
                  </span>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${item.bg} ${item.color}`}>
                    <Icon size={18} />
                  </div>
                </div>
                <div className="mt-3">
                  <h3 className="font-bold text-lg text-slate-800 tracking-tight">{item.value}</h3>
                  <span className={`text-[10px] font-medium block mt-0.5 ${item.isUp ? "text-green-500" : "text-red-500"}`}>
                    {item.change}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* FILTERS PANEL */}
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-7 gap-4 items-end">
            <div>
              <label className="text-[11px] text-slate-400 font-bold block mb-1.5 uppercase">HS Code / Product</label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search HS Code or Product"
                className="w-full bg-slate-50/60 border border-slate-200 rounded-xl py-2 px-3 text-xs text-slate-600 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-[11px] text-slate-400 font-bold block mb-1.5 uppercase">Port of Exit</label>
              <div className="relative">
                <select value={selectedPort} onChange={(e) => setSelectedPort(e.target.value)} className="w-full bg-slate-50/60 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs text-slate-600 appearance-none focus:outline-none focus:border-blue-500">
                  <option>All Ports</option>
                  <option>Nhava Sheva</option>
                  <option>Mundra</option>
                  <option>Chennai</option>
                  <option>Kolkata</option>
                </select>
                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="text-[11px] text-slate-400 font-bold block mb-1.5 uppercase">Country of Destination</label>
              <div className="relative">
                <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)} className="w-full bg-slate-50/60 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs text-slate-600 appearance-none focus:outline-none focus:border-blue-500">
                  <option>All Countries</option>
                  {INITIAL_PIE_DATA.map((c, i) => <option key={i}>{c.name}</option>)}
                </select>
                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="text-[11px] text-slate-400 font-bold block mb-1.5 uppercase">Exporter</label>
              <div className="relative">
                <select value={selectedExporter} onChange={(e) => setSelectedExporter(e.target.value)} className="w-full bg-slate-50/60 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs text-slate-600 appearance-none focus:outline-none focus:border-blue-500">
                  <option>All Exporters</option>
                  <option>ABC Trading</option>
                  <option>Global Industrial</option>
                  <option>Omega Supplies</option>
                </select>
                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="text-[11px] text-slate-400 font-bold block mb-1.5 uppercase">Buyer</label>
              <div className="relative">
                <select value={selectedBuyer} onChange={(e) => setSelectedBuyer(e.target.value)} className="w-full bg-slate-50/60 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs text-slate-600 appearance-none focus:outline-none focus:border-blue-500">
                  <option>All Buyers</option>
                  <option>ABC Imports</option>
                  <option>Global Enterprises</option>
                  <option>Omega Traders</option>
                </select>
                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <div className="relative">
              <select className="w-full bg-slate-50/60 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs text-slate-600 appearance-none focus:outline-none focus:border-blue-500">
                <option>More Filters</option>
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>

            <div className="flex gap-2 w-full">
              <button onClick={handleApplyFilters} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs rounded-xl py-2 px-3 transition shadow-sm">
                Apply Filters
              </button>
              <button onClick={handleResetFilters} className="text-slate-400 hover:text-slate-600 font-medium text-xs rounded-xl py-2 px-2 transition border border-slate-200 bg-white">
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* CHARTS LAYER */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          
          {/* TOP EXPORTED PRODUCTS */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-sm text-slate-800">Top Exported Products</h3>
                <button className="text-blue-600 text-xs font-semibold">View All</button>
              </div>
              <div className="space-y-3">
                {INITIAL_PRODUCTS.map((prod, i) => (
                  <div key={i} className="text-xs">
                    <div className="flex justify-between items-start text-slate-600 mb-1.5 gap-2">
                      <span className="font-medium text-slate-400 shrink-0">{prod.hsCode}</span>
                      <span className="truncate flex-1 font-medium text-slate-700">{prod.desc}</span>
                      <span className="font-semibold text-slate-800 shrink-0">₹ {prod.value.toFixed(2)} Cr</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div className={`bg-blue-500 h-full rounded-full ${prod.barWidth}`} />
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium shrink-0 w-8 text-right">{prod.share}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button className="text-blue-600 text-xs font-semibold text-center mt-4 pt-2 border-t border-slate-50">
              View All Products →
            </button>
          </div>

          {/* EXPORT VALUE TREND */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-sm text-slate-800">Export Value Trend (INR)</h3>
              <span className="text-[10px] text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-100 font-medium">This Month</span>
            </div>
            <div className="mb-4">
              <span className="text-xl font-bold text-slate-800">₹1,876.45 Cr</span>
              <span className="text-xs text-green-500 font-medium ml-2">▲ 17.6% vs last month</span>
            </div>
            <div className="h-[150px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={INITIAL_LINE_DATA}>
                  <XAxis dataKey="date" tick={{ fill: '#94a3b8', fontSize: 10 }} tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#10B981" strokeWidth={2.5} dot={{ fill: '#10B981', r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-3 pt-3 border-t border-slate-50 text-center">
              <div className="bg-slate-50/70 p-2 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 font-medium block">Export Value (INR)</span>
                <span className="text-xs font-bold text-slate-700">₹1,876.45 Cr</span>
              </div>
              <div className="bg-slate-50/70 p-2 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 font-medium block">Export Shipments</span>
                <span className="text-xs font-bold text-slate-700">6,240</span>
              </div>
            </div>
          </div>

          {/* EXPORTS BY COUNTRY OF DESTINATION */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-sm text-slate-800">Exports by Country of Destination</h3>
                <button className="text-blue-600 text-xs font-semibold">View All</button>
              </div>
              <div className="flex items-center justify-between gap-2">
                <div className="relative w-[120px] h-[120px] shrink-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={dynamicPieData} innerRadius={40} outerRadius={55} dataKey="value" stroke="none">
                        {dynamicPieData.map((item, index) => <Cell key={index} fill={item.color} />)}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-[8px] uppercase text-slate-400 font-semibold">Total Value</span>
                    <span className="font-bold text-[11px] text-slate-800 leading-none mt-0.5">{computedTotalValue}</span>
                  </div>
                </div>
                <div className="flex-1 space-y-1 pl-2 max-h-[130px] overflow-y-auto">
                  {dynamicPieData.slice(0, 6).map((country, idx) => (
                    <div key={idx} className="flex items-center justify-between text-[11px]">
                      <div className="flex items-center gap-1.5 truncate">
                        <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: country.color }} />
                        <span className="text-slate-600 font-medium truncate">{country.name}</span>
                      </div>
                      <span className="text-slate-500 font-semibold ml-1">₹{country.value.toFixed(2)} Cr</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <button className="text-blue-600 text-xs font-semibold text-center mt-4 pt-2 border-t border-slate-50">
              View All Countries →
            </button>
          </div>
        </div>

        {/* METADATA LISTING TABLES */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
          {/* Top Exporters */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-sm text-slate-800">Top Exporters</h3>
              <button className="text-blue-600 text-xs font-semibold">View All</button>
            </div>
            <div className="divide-y divide-slate-100">
              {INITIAL_EXPORTERS.map((sup, idx) => (
                <div key={idx} className="flex justify-between items-center py-2.5 text-xs">
                  <div>
                    <h4 className="font-semibold text-slate-700">{sup.name}</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">{sup.shipments} Shipments</p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-slate-800 block">{sup.value}</span>
                    <span className="text-[10px] text-green-500 font-medium">{sup.growth}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center ">
             <button className="text-blue-600 text-xs font-semibold text-center mt-4 pt-2 border-t border-slate-50">View All Exporters →</button>
           </div>

          </div>

          {/* Top Buyers */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-sm text-slate-800">Top Buyers</h3>
              <button className="text-blue-600 text-xs font-semibold">View All</button>
            </div>
            <div className="divide-y divide-slate-100">
              {INITIAL_BUYERS.map((imp, idx) => (
                <div key={idx} className="flex justify-between items-center py-2.5 text-xs">
                  <div>
                    <h4 className="font-semibold text-slate-700">{imp.name}</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">{imp.shipments} Shipments</p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-slate-800 block">{imp.value}</span>
                    <span className="text-[10px] text-green-500 font-medium">{imp.growth}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center ">
             <button className="text-blue-600 text-xs font-semibold text-center mt-4 pt-2 border-t border-slate-50">View All Buyers →</button>
           </div>
          </div>

          {/* Exports by Port of Arrival */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-sm text-slate-800">Exports by Port of Arrival</h3>
              <button className="text-blue-600 text-xs font-semibold">View All</button>
            </div>
            <div className="divide-y divide-slate-100">
              {INITIAL_PORTS.map((port, idx) => (
                <div key={idx} className="flex justify-between items-center py-2.5 text-xs">
                  <div>
                    <h4 className="font-semibold text-slate-700">{port.name}</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">{port.shipments} Shipments</p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-slate-800 block">{port.value}</span>
                    <span className="text-[10px] text-slate-400 font-medium">{port.share} Share</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center ">
             <button className="text-blue-600 text-xs font-semibold text-center mt-4 pt-2 border-t border-slate-50">View All Ports →</button>
           </div>
          </div>
        </div>

        {/* DATA TABLE LAYER */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm overflow-hidden">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-sm text-slate-800">Recent Export Shipments</h3>
            <span className="text-xs text-blue-600 font-semibold cursor-pointer hover:underline">Filter</span>
          </div>

          <div className="overflow-x-auto -mx-5">
            <div className="inline-block min-w-full align-middle px-5">
              <table className="min-w-full divide-y divide-slate-100 text-xs">
                <thead>
                  <tr className="text-left text-slate-400 font-semibold border-b border-slate-100">
                    <th className="pb-3 font-medium">Shipment ID</th>
                    <th className="pb-3 font-medium">HS Code</th>
                    <th className="pb-3 font-medium">Product Description</th>
                    <th className="pb-3 font-medium">Exporter</th>
                    <th className="pb-3 font-medium">Buyer</th>
                    <th className="pb-3 font-medium">Destination Country</th>
                    <th className="pb-3 font-medium">Port of Exit</th>
                    <th className="pb-3 font-medium">Ship Date</th>
                    <th className="pb-3 font-medium">Value (INR)</th>
                    <th className="pb-3 font-medium text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-slate-600 font-medium">
                  {filteredShipments.length > 0 ? (
                    filteredShipments.map((ship, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/80 transition">
                        <td className="py-3.5 text-blue-600 font-semibold">{ship.id}</td>
                        <td className="py-3.5 text-slate-400 font-bold">{ship.hsCode}</td>
                        <td className="py-3.5 max-w-[180px] truncate font-semibold text-slate-700">{ship.desc}</td>
                        <td className="py-3.5 truncate text-slate-500">{ship.exporter}</td>
                        <td className="py-3.5 truncate text-slate-500">{ship.buyer}</td>
                        <td className="py-3.5 text-slate-700">{ship.country}</td>
                        <td className="py-3.5 text-slate-500">{ship.port}</td>
                        <td className="py-3.5 text-slate-400 whitespace-nowrap">{ship.date}</td>
                        <td className="py-3.5 font-bold text-slate-800">{ship.value}</td>
                        <td className="py-3.5 text-center">
                          <span className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-bold ${
                            ship.status === "DELIVERED" ? "bg-green-100 text-green-700" :
                            ship.status === "IN TRANSIT" ? "bg-blue-100 text-blue-700" : "bg-orange-100 text-orange-700"
                          }`}>{ship.status}</span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="10" className="py-8 text-center text-slate-400 font-medium">
                        No matching export records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="text-center mt-4 pt-3 border-t border-slate-50">
            <button className="text-blue-600 hover:text-blue-700 text-xs font-semibold">
              View All Shipments →
            </button>
          </div>
        </div>
      </div>

      {/* FOOTER TIMESTAMPS BAR */}
      <div className="mt-6 pt-4 mb-10 border-t border-slate-200/60 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 gap-2">
        <div className="flex items-center gap-1.5">
          <Clock size={14} className="text-slate-300" />
          <span>All data is updated daily. Last updated on 24 Apr 2025, 09:30 AM</span>
        </div>
        <div className="flex items-center gap-1 cursor-pointer hover:text-slate-500">
          <HelpCircle size={14} className="text-slate-300" />
          <span>Help Center</span>
        </div>
      </div>
    </div>
  );
}