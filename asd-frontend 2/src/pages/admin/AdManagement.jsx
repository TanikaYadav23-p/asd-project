import { useState, useRef, useEffect } from "react";
import {
  FaPlus, FaEye, FaChartLine, FaThumbtack, FaEllipsisVertical,
  FaPen, FaCopy, FaPause, FaTrash, FaXmark, FaArrowLeft,
  FaCheck, FaCloudArrowUp, FaDownload, FaStar, FaArrowUp,
  FaArrowDown, FaChevronLeft, FaChevronRight, FaFilter,
  FaCircleCheck, FaLightbulb, FaChevronDown
} from "react-icons/fa6";
import API from "../../api/axios";

const Toggle = ({ checked, onChange }) => (
  <div onClick={() => onChange(!checked)}
    className={`relative w-10 h-6 rounded-full cursor-pointer flex-shrink-0 transition-all duration-200 ${checked ? "bg-teal-500" : "bg-gray-300"}`}>
    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-200 ${checked ? "left-5" : "left-1"}`} />
  </div>
);

const initialAds = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  title: "Summer Shipping Promo",
  dates: "2026-04-01, 2026-04-30",
  status: i === 2 ? "Paused" : i === 3 ? "Inactive" : i === 4 ? "Draft" : "Active",
  placement: "Dashboard",
  priority: i + 1,
  impressions: 12540,
  clicks: 12540,
  ctr: "1.76%",
  type: "Banner",
  startDate: "May 20, 2025",
  endDate: "May 30, 2025",
  redirectUrl: "https://www.cargomate.com/booking",
}));

const trendPoints = [
  { x: "Apr 18", y: 1000 }, { x: "Apr 20", y: 1800 }, { x: "Apr 22", y: 2800 },
  { x: "Apr 24", y: 1700 }, { x: "Apr 26", y: 2200 }, { x: "Apr 28", y: 1500 },
  { x: "May 2", y: 2400 }, { x: "May 8", y: 2900 }, { x: "May 12", y: 900 },
];

const clickPoints = [
  { x: "May 12", y: 180 }, { x: "May 13", y: 310 }, { x: "May 14", y: 410 },
  { x: "May 15", y: 280 }, { x: "May 16", y: 400 }, { x: "May 17", y: 410 }, { x: "May 18", y: 200 }, { x: "May 19", y: 220 },
];

const ctrPoints = [
  { x: "May 12", y: 1 }, { x: "May 13", y: 4.5 }, { x: "May 14", y: 7.5 },
  { x: "May 15", y: 3 }, { x: "May 16", y: 7 }, { x: "May 17", y: 7.5 }, { x: "May 18", y: 3 }, { x: "May 19", y: 3 },
];

function MiniChart({ points, color, maxY, height = 120 }) {
  const w = 600, padL = 40, padB = 25, padT = 10, padR = 10;
  const chartW = w - padL - padR;
  const chartH = height - padB - padT;
  const n = points.length;
  const xScale = (i) => padL + (i / (n - 1)) * chartW;
  const yScale = (v) => padT + chartH - (v / maxY) * chartH;
  const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"} ${xScale(i)} ${yScale(p.y)}`).join(" ");
  const areaD = `${pathD} L ${xScale(n - 1)} ${yScale(0)} L ${xScale(0)} ${yScale(0)} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${height}`} className="w-full" style={{ height }} preserveAspectRatio="none">
      <defs>
        <linearGradient id={`grad-${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      {[0, maxY * 0.25, maxY * 0.5, maxY * 0.75, maxY].map(v => (
        <line key={v} x1={padL} x2={w - padR} y1={yScale(v)} y2={yScale(v)} stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4" />
      ))}
      <path d={areaD} fill={`url(#grad-${color})`} />
      <path d={pathD} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {points.map((p, i) => (
        <circle key={i} cx={xScale(i)} cy={yScale(p.y)} r="4" fill={color} stroke="white" strokeWidth="2" />
      ))}
      {points.map((p, i) => (
        <text key={i} x={xScale(i)} y={height - 5} textAnchor="middle" fontSize="10" fill="#9ca3af">{p.x}</text>
      ))}
    </svg>
  );
}

function DeleteModal({ onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xs p-6 text-center">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"><FaXmark /></button>
        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <FaTrash className="text-red-500" />
        </div>
        <h3 className="text-base font-bold text-gray-800 mb-1">Delete Advertisement?</h3>
        <p className="text-xs text-gray-400 mb-5">This action cannot be undone.</p>
        <div className="flex gap-2">
          <button onClick={onClose} className="flex-1 py-2.5 text-sm text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 font-medium">Cancel</button>
          <button onClick={onConfirm} className="flex-1 py-2.5 text-sm text-white bg-red-500 hover:bg-red-600 rounded-xl font-medium">Delete</button>
        </div>
      </div>
    </div>
  );
}

function EditAdModal({ ad, onClose, onSave }) {
  const [form, setForm] = useState({ title: ad.title, type: ad.type, placement: ad.placement, startDate: ad.startDate, endDate: ad.endDate, redirectUrl: ad.redirectUrl, status: ad.status === "Active" });
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-semibold text-gray-800">Edit Ad</h3>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"><FaXmark /></button>
        </div>
        <div className="flex flex-col gap-4 mb-6">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">Ad Title</label>
            <input className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 transition-all" value={form.title} onChange={e => set("title", e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">Ad Type</label>
            <select className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 bg-white" value={form.type} onChange={e => set("type", e.target.value)}>
              <option>Banner</option><option>Popup</option><option>Video</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">Placement</label>
            <select className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 bg-white" value={form.placement} onChange={e => set("placement", e.target.value)}>
              <option>Dashboard</option><option>Homepage</option><option>Sidebar</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Start Date</label>
              <input type="date" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500" value={form.startDate} onChange={e => set("startDate", e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">End Date</label>
              <input type="date" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500" value={form.endDate} onChange={e => set("endDate", e.target.value)} />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">Redirect URL</label>
            <input className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500" value={form.redirectUrl} onChange={e => set("redirectUrl", e.target.value)} />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-gray-500">Status</span>
            <Toggle checked={form.status} onChange={v => set("status", v)} />
            <span className={`text-xs font-medium ${form.status ? "text-teal-500" : "text-gray-400"}`}>{form.status ? "Active" : "Inactive"}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={onClose} className="flex-1 px-4 py-2.5 text-sm text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 font-medium">Cancel</button>
          <button onClick={() => { onSave(form); onClose(); }} className="flex-1 px-4 py-2.5 text-sm text-white bg-teal-500 rounded-xl hover:bg-teal-600 font-medium">Save Changes</button>
        </div>
      </div>
    </div>
  );
}

function AdRow({ ad, onDelete, onEdit, onDuplicate, onPause }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const statusColor = { Active: "bg-teal-100 text-teal-600", Paused: "bg-yellow-100 text-yellow-600", Inactive: "bg-gray-100 text-gray-500", Draft: "bg-blue-100 text-blue-500" };
  return (
    <tr className="border-t border-gray-100 hover:bg-gray-50 transition-colors relative">
      <td className="px-3 py-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-100 rounded-lg flex-shrink-0 flex items-center justify-center">
            <span className="text-green-600 text-xs font-bold">S</span>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-800 whitespace-nowrap">{ad.title}</p>
            <p className="text-xs text-gray-400">{ad.dates}</p>
          </div>
        </div>
      </td>
      <td className="px-2 py-3"><span className={`text-xs px-2 py-0.5 rounded-lg font-medium ${statusColor[ad.status]}`}>{ad.status}</span></td>
      <td className="px-2 py-3"><span className="text-xs bg-teal-100 text-teal-600 px-2 py-0.5 rounded-lg font-medium">{ad.placement}</span></td>
      <td className="px-2 py-3">
        <div className="flex items-center gap-1">
          <FaStar className="text-yellow-400 text-xs" />
          <span className="text-xs text-gray-700 font-medium">{ad.priority}</span>
          <div className="flex flex-col ml-1">
            <FaArrowUp className="text-gray-300 text-xs cursor-pointer hover:text-gray-500" />
            <FaArrowDown className="text-gray-300 text-xs cursor-pointer hover:text-gray-500" />
          </div>
        </div>
      </td>
      <td className="px-2 py-3 text-xs text-gray-700">{ad.impressions.toLocaleString()}</td>
      <td className="px-2 py-3 text-xs text-gray-700">{ad.clicks.toLocaleString()}</td>
      <td className="px-2 py-3 text-xs text-teal-500 font-medium">{ad.ctr}</td>
      <td className="px-2 py-3"><span className={`text-xs px-2 py-0.5 rounded-lg font-medium ${statusColor[ad.status]}`}>{ad.status}</span></td>
      <td className="px-2 py-3">
        <div className="flex items-center gap-1.5 relative">
          <button className="text-gray-400 hover:text-gray-600"><FaEye className="text-sm" /></button>
          <button className="text-gray-400 hover:text-teal-500"><FaChartLine className="text-sm" /></button>
          <button className="text-red-300 hover:text-red-500"><FaThumbtack className="text-sm" /></button>
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-400 hover:text-gray-600"><FaEllipsisVertical className="text-sm" /></button>
          {menuOpen && (
            <div className="absolute right-0 top-6 bg-white border border-gray-100 rounded-xl shadow-xl z-20 py-1 w-40">
              <button onClick={() => { onEdit(ad); setMenuOpen(false); }} className="w-full flex items-center gap-2 px-3 py-2 text-xs text-gray-700 hover:bg-gray-50"><FaPen className="text-gray-400 text-xs" /> Edit Ad</button>
              <button onClick={() => { onDuplicate(ad); setMenuOpen(false); }} className="w-full flex items-center gap-2 px-3 py-2 text-xs text-gray-700 hover:bg-gray-50"><FaCopy className="text-gray-400 text-xs" /> Duplicate Ad</button>
              <button onClick={() => { onPause(ad); setMenuOpen(false); }} className="w-full flex items-center gap-2 px-3 py-2 text-xs text-gray-700 hover:bg-gray-50"><FaPause className="text-gray-400 text-xs" /> Pause Ad</button>
              <button onClick={() => { onDelete(ad); setMenuOpen(false); }} className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-500 hover:bg-red-50"><FaTrash className="text-red-400 text-xs" /> Delete Ad</button>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
}

function PerformanceChart() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h2 className="text-sm font-bold text-gray-800">Performance Tracking</h2>
        <div className="flex items-center gap-2">
          <select className="border border-gray-200 rounded-xl px-3 py-1.5 text-xs outline-none focus:border-teal-500 bg-white">
            <option>Impressions</option><option>Clicks</option><option>CTR</option>
          </select>
          <select className="border border-gray-200 rounded-xl px-3 py-1.5 text-xs outline-none focus:border-teal-500 bg-white">
            <option>Last 30 Days</option><option>Last 7 Days</option><option>Last 90 Days</option>
          </select>
          <button className="flex items-center gap-1.5 border border-gray-200 rounded-xl px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-50 transition-colors">
            <FaDownload className="text-xs" /> Export Report
          </button>
        </div>
      </div>
      <div className="flex items-end justify-between text-xs text-gray-400 mb-1 px-1">
        {["3K", "2K", "1K", "0"].map(v => <span key={v}>{v}</span>)}
      </div>
      <MiniChart points={trendPoints} color="#14b8a6" maxY={3000} height={160} />
    </div>
  );
}

function CreateAdPage({ onBack, onPreview, onPublish }) {
  const fileRef = useRef();
  const [form, setForm] = useState({ title: "", adType: "Banner", placement: { dashboard: false, homepage: false, sidebar: true }, startDate: "May 20, 2025", endDate: "May 30, 2025", redirectUrl: "", status: true });
  const [uploadedImg, setUploadedImg] = useState(null);
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));
  const togglePlacement = (k) => setForm(p => ({ ...p, placement: { ...p.placement, [k]: !p.placement[k] } }));


  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
          <button onClick={onBack} className="hover:text-gray-600">Ad Managment</button>
          <FaChevronRight className="text-xs" />
          <span className="text-teal-500 font-medium">Create Ad</span>
        </div>
        <div className="flex items-start justify-between gap-3 mb-5">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Create New Advertisement</h1>
            <p className="text-xs text-gray-400 mt-0.5">Set up and publish a new promotional campaign</p>
          </div>
          <button className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors whitespace-nowrap">
            <FaPlus className="text-xs" /> Create Ad
          </button>
        </div>

        <div className="flex flex-col xl:flex-row gap-4">
          <div className="flex-1">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Ad Title</label>
                  <input className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 transition-all" placeholder="Enter campaign name" value={form.title} onChange={e => set("title", e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Ad Type</label>
                  <div className="flex gap-2">
                    {["Banner", "Popup", "Video"].map(t => (
                      <button key={t} onClick={() => set("adType", t)}
                        className={`flex-1 py-2 rounded-xl text-xs font-medium border transition-all ${form.adType === t ? "bg-teal-500 text-white border-teal-500" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Upload Banner Image</label>
                  <div onClick={() => fileRef.current.click()} onDrop={e => { e.preventDefault(); setUploadedImg(e.dataTransfer.files[0]); }} onDragOver={e => e.preventDefault()}
                    className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-teal-400 hover:bg-teal-50/20 transition-all">
                    {uploadedImg ? (
                      <div className="flex items-center gap-2"><FaCheck className="text-teal-500" /><span className="text-xs text-gray-600">{uploadedImg.name}</span></div>
                    ) : (
                      <>
                        <FaCloudArrowUp className="text-teal-400 text-2xl mb-2" />
                        <p className="text-xs text-gray-500">Drag & drop image here</p>
                        <p className="text-xs text-gray-400">or <span className="text-teal-500 font-medium">browse file</span></p>
                        <p className="text-xs text-gray-400 mt-1">Recommended size : 1200 × 400 px (JPG, PNG)</p>
                      </>
                    )}
                  </div>
                  <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e => setUploadedImg(e.target.files[0])} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Placement</label>
                  {["dashboard", "homepage", "sidebar"].map(p => (
                    <div key={p} onClick={() => togglePlacement(p)} className="flex items-center gap-2 mb-2 cursor-pointer">
                      <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${form.placement[p] ? "bg-teal-500 border-teal-500" : "border-gray-300"}`}>
                        {form.placement[p] && <FaCheck className="text-white text-xs" />}
                      </div>
                      <span className="text-sm text-gray-700 capitalize">{p.charAt(0).toUpperCase() + p.slice(1)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Start Date</label>
                  <input type="text" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500" value={form.startDate} onChange={e => set("startDate", e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">End Date</label>
                  <input type="text" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500" value={form.endDate} onChange={e => set("endDate", e.target.value)} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Redirect URL</label>
                  <input className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500" placeholder="https://example.com" value={form.redirectUrl} onChange={e => set("redirectUrl", e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Status</label>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-sm text-gray-600">Active</span>
                    <Toggle checked={form.status} onChange={v => set("status", v)} />
                    <span className="text-sm text-gray-600">Inactive</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full xl:w-72 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 xl:sticky xl:top-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-bold text-gray-800">Live Preview</h2>
                <button onClick={() => onPreview(form)} className="text-xs text-teal-500 hover:text-teal-600 font-medium">Add Preview</button>
              </div>
              <div className="bg-gray-800 rounded-xl p-3 mb-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white text-xs font-medium">≡ Dashboard</span>
                  <div className="w-5 h-5 bg-gray-600 rounded-full" />
                </div>
                <div className="bg-gradient-to-r from-gray-700 to-gray-900 rounded-lg p-3 mb-2">
                  <p className="text-teal-300 text-xs">Fast Realiable</p>
                  <p className="text-white text-sm font-bold">Worldwide Shipping</p>
                  <p className="text-gray-300 text-xs">Your cargo our priority.</p>
                  <button className="mt-2 bg-yellow-400 text-gray-900 text-xs px-3 py-1 rounded-lg font-medium">Book Now →</button>
                </div>
                <div className="flex justify-center gap-1">
                  {[0, 1, 2, 3].map(i => <div key={i} className={`w-2 h-2 rounded-full ${i === 0 ? "bg-teal-400" : "bg-gray-600"}`} />)}
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs font-bold text-gray-700 mb-2">Details</p>
                {[["Type", form.adType], ["Placement", "Dashboard Homepage"], ["Schedule", `${form.startDate} - ${form.endDate}`], ["Status", form.status ? "Active" : "Inactive"]].map(([k, v]) => (
                  <div key={k} className="flex justify-between mb-1.5">
                    <span className="text-xs text-gray-400">{k}</span>
                    {k === "Status" ? <span className="text-xs bg-teal-100 text-teal-600 px-2 py-0.5 rounded-lg font-medium">{v}</span> : <span className="text-xs text-gray-700">{v}</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4 bg-white rounded-2xl border border-gray-100 px-4 py-3 shadow-sm">
          <button className="flex items-center gap-2 border border-teal-500 text-teal-500 px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-teal-50 transition-colors w-full sm:w-auto justify-center">
            Save as Draft
          </button>
          <div className="flex gap-2 w-full sm:w-auto">
            <button onClick={onBack} className="flex-1 sm:flex-none px-4 py-2.5 text-sm text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 font-medium">Cancel</button>
            <button onClick={() => onPublish(form)} className="flex-1 sm:flex-none flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors justify-center">
              <FaPen className="text-xs" /> Publish Ad
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdPreviewPage({ ad, onBack, onEdit,  onPublish  }) {
  const placements = ["Dashboard Preview", "Homepage", "Sidebar"];
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
          <button onClick={onBack} className="hover:text-gray-600">Ad Managment</button>
          <FaChevronRight className="text-xs" />
          <span className="text-teal-500 font-medium">Ad Preview</span>
        </div>
        <div className="flex items-start justify-between gap-3 mb-5">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Ad Preview</h1>
            <p className="text-xs text-gray-400 mt-0.5">See how your ad will appear to users</p>
          </div>
          <button onClick={onBack} className="flex items-center gap-2 border border-gray-200 text-gray-600 px-3 py-2 rounded-xl text-sm font-medium hover:bg-gray-50">
            <FaChevronLeft className="text-xs" /> Back to List
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          <div className="w-full lg:w-64 flex-shrink-0 flex flex-col gap-4">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <p className="text-sm font-bold text-gray-800 mb-3">Ad Details</p>
              {[
  ["Ad Title", ad?.title],
  ["Ad Type", ad?.adType],
  ["Placement", "Dashboard"],
  ["Schedule", `${ad?.startDate} - ${ad?.endDate}`],
  ["Status", ad?.status ? "Active" : "Inactive"],
  ["Redirect URL", ad?.redirectUrl]
].map(([k, v]) => (
                <div key={k} className="flex flex-col mb-2 border-b border-gray-50 pb-2">
                  <span className="text-xs text-gray-400">{k}</span>
                  {k === "Status" ? <span className="text-xs bg-teal-100 text-teal-600 px-2 py-0.5 rounded-lg font-medium w-fit mt-0.5">{v}</span>
                    : k === "Ad Type" || k === "Placement" ? <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-lg font-medium w-fit mt-0.5">{v}</span>
                      : <span className="text-xs text-gray-700 font-medium mt-0.5">{v}</span>}
                </div>
              ))}
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <p className="text-sm font-bold text-gray-800 mb-2 flex items-center gap-1.5"><span className="text-teal-500">↗</span> Click Behavior</p>
              <p className="text-xs text-gray-400 mb-2">When users click on this will be redirected to</p>
              <div className="border border-gray-200 rounded-xl px-3 py-2.5 flex items-center gap-2">
                <span className="text-xs text-gray-600 flex-1">https://www.cargomate.com/booking</span>
                <span className="text-teal-400 text-xs">↗</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">Behavior : Open in same tab</p>
            </div>
            <div className="bg-teal-50 border border-teal-100 rounded-2xl p-4 flex items-start gap-2">
              <FaCircleCheck className="text-teal-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-teal-600">This ad is active and will be visible to users as per the selected placement and schedule.</p>
            </div>
          </div>

          <div className="flex-1">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <p className="text-sm font-bold text-gray-800 mb-1">Placement Preview</p>
              <p className="text-xs text-gray-400 mb-3">This is how your ad will appear in different placements</p>
              <div className="flex gap-4 border-b border-gray-100 mb-3">
                {placements.map((p, i) => (
                  <button key={p} onClick={() => setActiveTab(i)}
                    className={`pb-2 text-xs font-medium border-b-2 transition-all ${activeTab === i ? "border-teal-500 text-teal-500" : "border-transparent text-gray-400 hover:text-gray-600"}`}>
                    {p}
                  </button>
                ))}
              </div>
              <p className="text-xs font-bold text-gray-700 mb-3">{placements[activeTab]}</p>
              <div className="bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
                <div className="bg-white px-3 py-2 flex items-center justify-between border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-teal-500 rounded" />
                    <span className="text-xs font-bold text-gray-700">ASD CargoMate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-5 bg-gray-100 rounded-lg" />
                    <div className="w-5 h-5 bg-gray-200 rounded-full" />
                  </div>
                </div>
                <div className="flex">
                  <div className="w-16 bg-gray-800 min-h-[140px] p-2">
                    {Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-2 bg-gray-600 rounded mb-1.5" />)}
                  </div>
                  <div className="flex-1 p-3">
                    <div className="bg-gradient-to-r from-gray-700 to-gray-900 rounded-lg p-3 mb-2">
                      <p className="text-teal-300 text-xs">Fast Realiable</p>
                      <p className="text-white text-xs font-bold">Worldwide Shipping</p>
                      <p className="text-gray-300 text-xs">Your cargo our priority.</p>
                      <button className="mt-1 bg-yellow-400 text-gray-900 text-xs px-2 py-0.5 rounded font-medium">Book Now →</button>
                    </div>
                    <div className="grid grid-cols-4 gap-1">
                      {["12,450", "860", "41,000", "128,500"].map((v, i) => (
                        <div key={i} className="bg-white rounded p-1 text-center"><p className="text-xs font-bold text-gray-700">{v}</p></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4 bg-white rounded-2xl border border-gray-100 px-4 py-3 shadow-sm">
          <button onClick={() => onEdit()} className="flex items-center gap-2 border border-gray-200 text-gray-600 px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 w-full sm:w-auto justify-center">
            <FaPen className="text-xs" /> Edit Ad
          </button>
          <button
  onClick={onPublish}
 className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors w-full sm:w-auto justify-center">
            <FaCheck className="text-xs" /> Publish Changes
          </button>
        </div>
      </div>
    </div>
  );
}

function AnalyticsPage({ onBack }) {
  
  const [page, setPage] = useState(1);
  const perPage = 4;


  const [analytics, setAnalytics] = useState([]);
const [stats, setStats] = useState({});
const [loading, setLoading] = useState(false);

const [filters, setFilters] = useState({
  startDate: "",
  endDate: "",
  placement: "All"
});

const totalPages = Math.ceil(analytics.length / perPage);
  const pageData = analytics.slice((page - 1) * perPage, page * perPage);

const fetchAnalytics = async () => {
  try {
    setLoading(true);

    const res = await API.get("/ads/analytics", {
      params: {
        startDate: filters.startDate,
        endDate: filters.endDate
      }
    });

    const statsRes = await API.get("/ads/stats");

    console.log("ANALYTICS:", res.data);
    console.log("STATS:", statsRes.data);

    if (res.data.status) {
      const formatted = res.data.data.map(item => ({
        date: new Date(item.date).toLocaleDateString(),
        imp: item.impressions,
        clicks: item.clicks,
        ctr: item.impressions
          ? ((item.clicks / item.impressions) * 100).toFixed(2) + "%"
          : "0%",
        placement: capitalize(item.placement),
        device: item.device
      }));

      setAnalytics(formatted);
    }

    if (statsRes.data.status) {
      setStats(statsRes.data.data);
    }

  } catch (err) {
    console.error("ANALYTICS ERROR:", err.response?.data || err.message);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchAnalytics();
}, []);

const clickPoints = analytics.map((a, i) => ({
  x: a.date,
  y: a.clicks
}));

const ctrPoints = analytics.map((a, i) => ({
  x: a.date,
  y: parseFloat(a.ctr)
}));

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
          <button onClick={onBack} className="hover:text-gray-600">Ad Managment</button>
          <FaChevronRight className="text-xs" />
          <span className="text-teal-500 font-medium">Analytics</span>
        </div>
        <div className="flex items-start justify-between gap-3 mb-5">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Ad Performance Analytics</h1>
            <p className="text-xs text-gray-400 mt-0.5">Track and analyze advertisement performance</p>
          </div>
          <button onClick={onBack} className="flex items-center gap-2 border border-gray-200 text-gray-600 px-3 py-2 rounded-xl text-sm font-medium hover:bg-gray-50">
            <FaChevronLeft className="text-xs" /> Back to List
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-4">
          <div className="flex flex-wrap gap-3 items-end">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Date Range</label>
              <div className="flex items-center border border-gray-200 rounded-xl px-3 py-2 gap-2 text-sm text-gray-600">
                <span className="text-xs">May 12, 2025 - May 18, 2025</span>
                <FaChevronDown className="text-gray-400 text-xs" />
              </div>
            </div>
            {["Placement", "Placement"].map((label, i) => (
              <div key={i}>
                <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
                <select className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-teal-500 bg-white">
                  <option>All Placements</option><option>Dashboard</option><option>Homepage</option><option>Sidebar</option>
                </select>
              </div>
            ))}
            <button onClick={fetchAnalytics} className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">Apply Filter</button>
            <button className="border border-gray-200 text-gray-600 px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-50">Reset</button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 flex flex-col gap-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "Total Impressions", value: stats.impressions || 0, change: "12.5%", color: "text-orange-400" },
                { label: "Total Clicks", value: stats.clicks || 0, change: "8.5%", color: "text-teal-500" },
                { label: "Average CTR", value: stats.ctr || 0, change: "5.8%", color: "text-green-500" },
                { label: "Total Conversion", value: "328", change: "$0.25 vs May 5 - May 11", color: "text-blue-500" },
              ].map(s => (
                <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3">
                  <p className="text-xs text-gray-400 mb-1">{s.label}</p>
                  <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
                  <p className="text-xs text-teal-500 flex items-center gap-1 mt-0.5"><FaArrowUp className="text-xs" />{s.change}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-bold text-gray-800">Click Over Time</h2>
                <select className="border border-gray-200 rounded-xl px-3 py-1.5 text-xs outline-none bg-white"><option>Daily</option><option>Weekly</option></select>
              </div>
              <MiniChart points={clickPoints} color="#14b8a6" maxY={500} height={160} />
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-bold text-gray-800">CTR Trend</h2>
                <select className="border border-gray-200 rounded-xl px-3 py-1.5 text-xs outline-none bg-white"><option>Daily</option><option>Weekly</option></select>
              </div>
              <MiniChart points={ctrPoints} color="#a78bfa" maxY={10} height={160} />
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100"><h2 className="text-sm font-bold text-gray-800">Detailed Performance Data</h2></div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr className="bg-gray-50">
                      {["Data", "Impressions", "Clicks", "CTR", "Placement", "Device", "Actions"].map((h, i) => (
                        <th key={h} className={`text-left text-xs font-semibold text-gray-500 px-3 py-3 ${i === 0 ? "rounded-l-xl" : ""} ${i === 6 ? "rounded-r-xl" : ""}`}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {pageData.map((r, i) => (
                      <tr key={i} className="border-t border-gray-100">
                        <td className="px-3 py-3 text-xs text-gray-600">{r.date}</td>
                        <td className="px-3 py-3 text-xs text-gray-700">{r.imp.toLocaleString()}</td>
                        <td className="px-3 py-3 text-xs text-gray-700">{r.clicks.toLocaleString()}</td>
                        <td className="px-3 py-3 text-xs text-teal-500 font-medium">{r.ctr}</td>
                        <td className="px-3 py-3 text-xs text-gray-600">{r.placement}</td>
                        <td className="px-3 py-3 text-xs text-gray-600">{r.device}</td>
                        <td className="px-3 py-3"><FaEye className="text-gray-400 hover:text-teal-500 cursor-pointer text-sm" /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
                <p className="text-xs text-gray-400">Showing 1 to {pageData.length} of 7 entries</p>
                <div className="flex items-center gap-1">
                  <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="w-7 h-7 flex items-center justify-center border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 disabled:opacity-40">
                    <FaChevronLeft className="text-xs" />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                    <button key={p} onClick={() => setPage(p)} className={`w-7 h-7 rounded-lg text-xs font-medium ${page === p ? "bg-teal-500 text-white" : "border border-gray-200 text-gray-600 hover:bg-gray-50"}`}>{p}</button>
                  ))}
                  <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="w-7 h-7 flex items-center justify-center border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 disabled:opacity-40">
                    <FaChevronRight className="text-xs" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-64 flex-shrink-0 flex flex-col gap-4">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <div className="flex items-center gap-1 mb-3">
                <FaStar className="text-yellow-400" />
                <h2 className="text-sm font-bold text-gray-800">Top performing Ad</h2>
              </div>
              <div className="bg-gradient-to-r from-gray-700 to-gray-900 rounded-xl p-3 mb-3">
                <p className="text-teal-300 text-xs">Fast Realiable</p>
                <p className="text-white text-sm font-bold">Worldwide Shipping</p>
                <button className="mt-1 bg-yellow-400 text-gray-900 text-xs px-2 py-0.5 rounded font-medium">Book Now →</button>
              </div>
              <p className="text-xs font-bold text-gray-800 mb-1">Summer Shipping Promo</p>
              <span className="text-xs bg-teal-100 text-teal-600 px-2 py-0.5 rounded-lg font-medium">Dashboard</span>
              <div className="flex justify-between mt-3">
                {[["Impressions", "12,540"], ["Clicks", "641"], ["CTR", "5.11%"]].map(([k, v]) => (
                  <div key={k} className="text-center">
                    <p className="text-xs text-gray-400">{k}</p>
                    <p className="text-xs font-bold text-gray-800">{v}</p>
                  </div>
                ))}
              </div>
              <button className="w-full mt-3 border border-gray-200 rounded-xl py-2 text-xs text-gray-600 hover:bg-gray-50 flex items-center justify-center gap-1">
                View Details <FaChevronRight className="text-xs" />
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <h2 className="text-sm font-bold text-gray-800 mb-2">Best Placement</h2>
              <span className="text-xs bg-teal-100 text-teal-600 px-2 py-0.5 rounded-lg font-medium">Dashboard</span>
              <p className="text-xs text-gray-500 mt-2">Ads on Dashboard are performing <span className="font-bold text-gray-700">25% better</span> than other placement</p>
              <div className="mt-2">
                <div className="flex justify-between text-xs text-gray-400 mb-1"><span>Performance</span><span>25%</span></div>
                <div className="w-full h-2 bg-gray-100 rounded-full"><div className="w-1/4 h-2 bg-teal-500 rounded-full" /></div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <h2 className="text-sm font-bold text-gray-800 mb-2 flex items-center gap-1.5"><FaLightbulb className="text-yellow-400" /> Insights</h2>
              <p className="text-xs text-gray-500">Dashboard ads get the most engagement between <span className="font-bold text-gray-700">10 AM - 2 PM</span></p>
              <button className="w-full mt-3 border border-gray-200 rounded-xl py-2 text-xs text-gray-600 hover:bg-gray-50 flex items-center justify-center gap-1">
                View All Insights <FaChevronRight className="text-xs" />
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <h2 className="text-sm font-bold text-gray-800 mb-2">Compare Ads</h2>
              <p className="text-xs text-gray-500">Select multiple ads get the meet engagement between <span className="font-bold text-teal-600">10 AM - 2 PM</span></p>
              <button className="w-full mt-3 bg-teal-500 hover:bg-teal-600 text-white rounded-xl py-2 text-xs font-medium transition-colors">Compare Ads</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdManagement() {
  const [view, setView] = useState("list");
  const [ads, setAds] = useState([]);
  const [activeTab, setActiveTab] = useState("All Ads");
  const [search, setSearch] = useState("");
  const [placement, setPlacement] = useState("All Placements");
  const [status, setStatus] = useState("All Status");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [editTarget, setEditTarget] = useState(null);
  const [previewAd, setPreviewAd] = useState(null);

  const fetchAds = async () => {
    try {
      const res = await API.get("/ads");
  
      console.log("FETCH RESPONSE:", res.data);
  
      if (res.data.status && Array.isArray(res.data.data)) {
        const formatted = res.data.data.map(ad => ({
          id: ad._id,
          title: ad.title,
          dates: `${new Date(ad.startDate).toLocaleDateString()} - ${new Date(ad.endDate).toLocaleDateString()}`,
          status: capitalize(ad.status),
          placement: capitalize(ad.placement),
          priority: ad.priority,
          impressions: ad.impressions || 0,
          clicks: ad.clicks || 0,
          ctr: ad.impressions
            ? ((ad.clicks / ad.impressions) * 100).toFixed(2) + "%"
            : "0%"
        }));
  
        setAds(formatted);
      }
  
    } catch (err) {
      console.error("FETCH ERROR:", err.response?.data || err.message);
    }
  };
  const capitalize = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1);

  useEffect(() => {
    fetchAds();
  }, []);

  const createAd = async (form) => {
    try {
      const res = await API.post("/ads", {
        title: form.title,
        type: form.adType.toLowerCase(),   
        placement: getPlacement(form.placement), 
        startDate: new Date(form.startDate), 
        endDate: new Date(form.endDate),
        redirectUrl: form.redirectUrl,
        status: form.status ? "active" : "inactive"
      });
  
      console.log("CREATE RESPONSE:", res.data);
  
      fetchAds();  
  
    } catch (err) {
      console.error("CREATE ERROR:", err.response?.data || err.message);
    }
  };

  const getPlacement = (placementObj) => {
    if (placementObj.dashboard) return "dashboard";
    if (placementObj.homepage) return "homepage";
    if (placementObj.sidebar) return "sidebar";
    return "dashboard";
  };

  const tabs = ["All Ads", "Active", "Paused", "Inactive", "Drafts"];

  const filtered = ads.filter(a => {
    const matchTab = activeTab === "All Ads" || a.status === activeTab.replace("Drafts", "Draft");
    const matchSearch = search.length < 2 || a.title.toLowerCase().includes(search.toLowerCase());
    const matchPlacement = placement === "All Placements" || a.placement === placement;
    const matchStatus = status === "All Status" || a.status === status;
    return matchTab && matchSearch && matchPlacement && matchStatus;
  });

  const handleDelete = async () => {
  await API.delete(`/ads/${deleteTarget.id}`, {
    method: "DELETE"
  });

  fetchAds();
  setDeleteTarget(null);
};
  const handleEdit = (ad) => setEditTarget(ad);
  const handleSaveEdit = async (form) => {
    await API.put(`/ads/${editTarget.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: form.title,
        type: form.type,
        placement: form.placement,
        startDate: form.startDate,
        endDate: form.endDate,
        redirectUrl: form.redirectUrl,
        status: form.status ? "Active" : "Inactive"
      })
    });
  
    fetchAds();
    setEditTarget(null);
  };


  const handleDuplicate = async (ad) => {
    await API.post(`/duplicate/${ad.id}`, {
      method: "POST"
    });
  
    fetchAds();
  };
  const handlePause = async (ad) => {
    const newStatus = ad.status === "Paused" ? "Active" : "Paused";
  
    await API.post(`/ads/status/${ad.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ status: newStatus })
    });
  
    fetchAds();
  };

  if (view === "create") return (
    <CreateAdPage
      onBack={() => setView("list")}
      onPreview={(form) => {
        setPreviewAd(form);
        setView("preview");
      }}
      onPublish={async (form) => {
        await createAd(form);
        setView("list");
      }}
    />
  );

  if (view === "preview") return (
    <AdPreviewPage
      ad={previewAd}
      onBack={() => setView("list")}
      onEdit={() => setView("create")}
      onPublish={async () => {
        await createAd(previewAd);
        setView("list");
      }}
    />
  );
  if (view === "analytics") return <AnalyticsPage onBack={() => setView("list")} />;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      {deleteTarget && <DeleteModal onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} />}
      {editTarget && <EditAdModal ad={editTarget} onClose={() => setEditTarget(null)} onSave={handleSaveEdit} />}

      <div className="max-w-6xl mx-auto">
        <div className="flex items-start justify-between mb-5 gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Ad Managment</h1>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">Create and manage promotion campaigns</p>
          </div>
          <button onClick={() => setView("create")} className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors whitespace-nowrap">
            <FaPlus className="text-xs" /> Create Ad
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          {[
            { label: "Total Ads", value: ads.length, sub: "Campaigns", icon: <FaThumbtack className="text-blue-400 text-xl" />, color: "text-gray-800" },
            { label: "Total Impressions", value: "41,060", sub: "VS last 30 days", change: "12.5%", icon: <FaEye className="text-orange-400 text-xl" />, color: "text-gray-800" },
            { label: "Total Clicks", value: "1,627", sub: "VS last 30 days", change: "8.5%", icon: <FaChartLine className="text-teal-400 text-xl" />, color: "text-gray-800" },
            { label: "Average CTR", value: "3.96%", sub: "VS last 30 days", change: "5.6%", icon: <FaChartLine className="text-green-400 text-xl" />, color: "text-gray-800" },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3 sm:p-4 flex items-start justify-between gap-2">
              <div>
                <p className="text-xs text-gray-400 mb-1">{s.label}</p>
                <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
                {s.change && <p className="text-xs text-teal-500 flex items-center gap-0.5 mt-0.5"><FaArrowUp className="text-xs" />{s.change}</p>}
                <p className="text-xs text-gray-400 mt-0.5">{s.sub}</p>
              </div>
              {s.icon}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5 mb-4">
          <div className="flex flex-wrap gap-2 mb-4 border-b border-gray-100 pb-3">
            {tabs.map(t => (
              <button key={t} onClick={() => setActiveTab(t)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${activeTab === t ? "text-teal-500 border-b-2 border-teal-500" : "text-gray-400 hover:text-gray-600"}`}>
                {t}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <div className="flex items-center border border-gray-200 rounded-xl px-3 py-2 gap-2 focus-within:border-teal-500 transition-all">
              <span className="text-gray-400 text-xs">🔍</span>
              <input className="text-xs outline-none bg-transparent" placeholder="Search" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <select className="border border-gray-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-teal-500 bg-white" value={placement} onChange={e => setPlacement(e.target.value)}>
              {["All Placements", "Dashboard", "Homepage", "Sidebar"].map(o => <option key={o}>{o}</option>)}
            </select>
            <select className="border border-gray-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-teal-500 bg-white" value={status} onChange={e => setStatus(e.target.value)}>
              {["All Status", "Active", "Paused", "Inactive", "Draft"].map(o => <option key={o}>{o}</option>)}
            </select>
            <div className="border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-600">May 12 - May 18, 2026</div>
            <button className="flex items-center gap-1.5 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-600 hover:bg-gray-50">
              <FaFilter className="text-xs" /> Filter
            </button>
            <button onClick={() => setView("analytics")} className="flex items-center gap-1.5 border border-teal-400 text-teal-500 rounded-xl px-3 py-2 text-xs font-medium hover:bg-teal-50 ml-auto">
              <FaChartLine className="text-xs" /> Analytics
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="bg-teal-50">
                  {["AD TITLE", "STATUS", "PLACEMENT", "PRIORITY", "Impressions", "Clicks", "CTR", "ACTIONS"].map((h, i) => (
                    <th key={`${h}-${i}`} className={`text-left text-xs font-semibold text-teal-600 px-2 py-3 ${i === 0 ? "rounded-l-xl pl-3" : ""} ${i === 8 ? "rounded-r-xl" : ""}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={9} className="text-center py-10 text-sm text-gray-400">No ads found</td></tr>
                ) : filtered.map(ad => (
                  <AdRow key={ad.id} ad={ad} onDelete={setDeleteTarget} onEdit={handleEdit} onDuplicate={handleDuplicate} onPause={handlePause} />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <PerformanceChart />
      </div>
    </div>
  );
}