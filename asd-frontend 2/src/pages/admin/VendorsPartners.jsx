import { useState, useEffect } from "react";
import {
  FaPlus, FaMagnifyingGlass, FaXmark, FaChevronDown,
  FaStar, FaTruck, FaBoxOpen, FaWarehouse, FaFileContract
} from "react-icons/fa6";
import { ChevronDown,  CircleCheckBig }   from "lucide-react";
import {
  MoreVertical,
} from "lucide-react";
  import crown from "../../assets/Images/webp/crown.webp"
  import {
    FiEdit,
  
  } from "react-icons/fi";
const typeOptions = ["All Types", "Shipping Partner", "Freight Forwarder", "Custom Broker", "Warehouse Partner"];
const statusOptions = ["All Status", "Active", "Inactive"];

import KYCVerificationModal from "../../components/adminComponent/KycVerification";
import RejectKYCModal from "../../components/adminComponent/RejectKycVerification";

const HEADING = "text-[#07156B]";
const typeIcon = (type) => {
  if (type === "Shipping Partner") return <FaTruck className="text-blue-400 text-xs" />;
  if (type === "Freight Forwarder") return <FaBoxOpen className="text-orange-400 text-xs" />;
  if (type === "Custom Broker") return <FaFileContract className="text-purple-400 text-xs" />;
  if (type === "Warehouse Partner") return <FaWarehouse className="text-teal-400 text-xs" />;
  return <FaTruck className="text-blue-400 text-xs" />;
};

 const stats = [
  { label: "Total Vendors", value: "1,248", sub: "All vendors",  subColor: "text-green-600", iconColor: "text-green-400" },
  { label: "Active Vendors", value: "1,048", sub: "Active vendors", subColor: "text-green-600", iconColor: "text-green-400" },
  { label: "Total Shipments", value: "200", sub: "This month", subColor: "text-red-500", iconColor: "text-red-400" },
  { label: "Verified Vendor", value: "00", sub: "", subColor: "text-purple-500", iconColor: "text-purple-400" },
];
function StatusBadge({ status }) {
  const styles = {
    "In Transit": "bg-blue-100 text-blue-600",
    Pending: "bg-amber-100 text-amber-600",
    Delayed: "bg-rose-100 text-rose-600",
    Exception: "bg-purple-100 text-purple-600",
    Delivered: "bg-green-100 text-green-600",
  };
  return <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg whitespace-nowrap ${styles[status]}`}>{status}</span>;
}

function StatCard({ stat }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{stat.label}</p>
        <p className="text-2xl font-semibold text-gray-900 mt-1">{stat.value}</p>
        <p className={`text-xs mt-1 ${stat.subColor}`}>{stat.sub}</p>
      </div>
      {/* <LuActivity className={stat.iconColor} size={32} strokeWidth={1.5} /> */}
    </div>
  );
}

const initialVendors = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  companyName: "Global Logistic Inc.",
  email: "contact@globallog.com",
  phone: "999999998",
  location: "United States",
  subscriptionPlan: "Premium",
  shipmentStatus: "4",
  status: "Active",
  kyc: "Verified",
  
  gstNumber: "",
  registrationNumber: "",
  businessType: "",
  yearOfEstablishment: "",
  associatedWith: "",
  verifiedOn: "",
  verifiedBy: "",
  nextReviewDate: "",
  bankName: "",
  accountHolder: "",
  accountNumber: "",
  ifscCode: "",
  swiftCode: "",
}));

 function InfoRow({ title, value }) {
        return (
            <div className="flex justify-between">
                <span className="font-semibold text-xs ">{title}</span>
                <span className="font-medium text-xs">{value}</span>
            </div>
        );
    }
function AddVendorModal({ onClose, onAdd }) {
  const [form, setForm] = useState({ name: "", email: "", type: "Shipping Partner", location: "", rating: "", activeShipment: "", status: "Active" });
  const [errors, setErrors] = useState({});
  const set = (k, v) => { setForm(p => ({ ...p, [k]: v })); setErrors(p => ({ ...p, [k]: "" })); };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    if (!form.location.trim()) e.location = "Location is required";
    return e;
  };

  const handleAdd = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    onAdd({ ...form, id: Date.now(), rating: parseFloat(form.rating) || 0, activeShipment: parseInt(form.activeShipment) || 0 });
    onClose();
  };

  const inp = (k) => `w-full border rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-all ${errors[k] ? "border-red-400" : "border-gray-200"}`;
 
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-semibold text-gray-800">Add New Vendor</h3>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <FaXmark />
          </button>
        </div>
        <div className="flex flex-col gap-4 mb-6">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">Company Name</label>
            <input className={inp("name")} placeholder="Enter company name" value={form.name} onChange={e => set("name", e.target.value)} />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">Email</label>
            <input type="email" className={inp("email")} placeholder="Enter email address" value={form.email} onChange={e => set("email", e.target.value)} />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">Type</label>
            <select className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 bg-white transition-all"
              value={form.type} onChange={e => set("type", e.target.value)}>
              {typeOptions.slice(1).map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">Location</label>
            <input className={inp("location")} placeholder="Enter location" value={form.location} onChange={e => set("location", e.target.value)} />
            {errors.location && <p className="text-xs text-red-500 mt-1">{errors.location}</p>}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Rating</label>
              <input type="number" step="0.1" min="0" max="5" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-all"
                placeholder="4.8" value={form.rating} onChange={e => set("rating", e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Active Shipment</label>
              <input type="number" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-all"
                placeholder="32" value={form.activeShipment} onChange={e => set("activeShipment", e.target.value)} />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">Status</label>
            <select className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 bg-white transition-all"
              value={form.status} onChange={e => set("status", e.target.value)}>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={onClose} className="flex-1 px-4 py-2.5 text-sm text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 font-medium transition-colors">Cancel</button>
          <button onClick={handleAdd} className="flex-1 px-4 py-2.5 text-sm text-white bg-teal-500 rounded-xl hover:bg-teal-600 font-medium transition-colors">Add Vendor</button>
        </div>
      </div>
    </div>
  );
}

function VendorCard({ vendor }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
      <div className="flex items-start justify-between gap-2 mb-1">
        <div className="min-w-0">
          <h3 className="text-sm font-bold text-gray-800 truncate">{vendor.name}</h3>
          <p className="text-xs text-gray-400 truncate">{vendor.email}</p>
        </div>
        <span className={`text-xs px-2.5 py-1 rounded-lg font-medium flex-shrink-0 ${vendor.status === "Active" ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-500"}`}>
          {vendor.status}
        </span>
      </div>
      <div className="flex flex-col gap-2 mt-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400">Type</span>
          <span className="flex items-center gap-1.5 text-xs bg-blue-50 text-blue-500 font-medium px-2 py-0.5 rounded-lg">
            {typeIcon(vendor.type)} {vendor.type}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400">Location</span>
          <span className="text-xs font-semibold text-gray-700">{vendor.location}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400">Rating</span>
          <span className="flex items-center gap-1 text-xs font-semibold text-gray-700">
            <FaStar className="text-yellow-400 text-xs" />{vendor.rating}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400">Active Shipment</span>
          <span className="text-xs font-semibold text-gray-700">{vendor.activeShipment}</span>
        </div>
      </div>
      <button className="w-full mt-4 py-2 text-xs font-medium text-teal-500 border border-teal-200 rounded-xl hover:bg-teal-50 transition-colors">
        View Details
      </button>
    </div>
  );
}

const userByType = [
  { label: "Basic Plan", value: "2499", percent: "52.2%", color: "bg-purple-500" },
  { label: "Starter Plan", value: "4999", percent: "52.2%", color: "bg-blue-500" },
  // { label: "Admins", value: "1,248", percent: "52.2%", color: "bg-green-500" },
  // { label: "Permission", value: "1,248", percent: "52.2%", color: "bg-gray-300" },
];
 
const registrationData = [
  { month: "May", value: 55 },
  { month: "june", value: 40 },
  { month: "july", value: 68 },
  { month: "Aug", value: 30 },
  { month: "Sep", value: 62 },
  { month: "Oct", value: 45 },
];

  const maxReg = Math.max(...registrationData.map((r) => r.value)); 

function DonutRing({ segments, centerValue, centerLabel, onClick }) {
  let cumulative = 0;

  const gradientParts = segments.map((s) => {
    const start = cumulative;
    cumulative += s.percent;

    return `${s.hex} ${start}% ${cumulative}%`;
  });

  const gradient = `conic-gradient(${gradientParts.join(",")})`;

  return (
    <div
      onClick={onClick}
      className="relative w-32 h-32 min-w-32 min-h-32 aspect-square shrink-0 rounded-full flex items-center justify-center cursor-pointer"
      style={{
        background: gradient,
      }}
    >
      <div className="absolute w-10 h-10 min-w-24 min-h-24 aspect-square bg-white rounded-full flex flex-col items-center justify-center">
        <span className="text-lg font-semibold text-gray-900">
          {centerValue}
        </span>

        <span className="text-xs text-gray-500">
          {centerLabel}
        </span>
      </div>
    </div>
  );
}

const vendors = [
  { name: "Global Logistic Inc.", type: "Shipping Partner", typeColor: "bg-green-100 text-green-700", location: "US", rating: "4.8", shipments: "32", kyc: "Verified", status: "Active" },
  { name: "Global Logistic Inc.", type: "Shipping Partner", typeColor: "bg-gray-100 text-gray-600", location: "US", rating: "4.8", shipments: "32", kyc: "Verified", status: "Active" },
  { name: "Global Logistic Inc.", type: "Shipping Partner", typeColor: "bg-indigo-100 text-indigo-600", location: "US", rating: "4.8", shipments: "32", kyc: "Verified", status: "Active" },
  { name: "Global Logistic Inc.", type: "Shipping Partner", typeColor: "bg-gray-100 text-gray-600", location: "US", rating: "4.8", shipments: "32", kyc: "Verified", status: "Active" },
  { name: "Global Logistic Inc.", type: "Shipping Partner", typeColor: "bg-purple-100 text-purple-600", location: "US", rating: "4.8", shipments: "32", kyc: "Verified", status: "Active" },
];
export default function VendorsPartners() {
  const [vendors, setVendors] = useState(initialVendors);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [showModal, setShowModal] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [kycVerify, setKycVerify] = useState(false)
 
  const [showDetail, setShowDetail] = useState(false)
  const [showEdit, setShowEdit] = useState(false);
   const [date, setDate] = useState({
      startDate: "",
     endDate: "",
  });
  const handleAdd = (vendor) => setVendors(prev => [vendor, ...prev]);

  const handleStatusChange = (id, newStatus) => {
    setVendors(prev => prev.map(v => v.id === id ? { ...v, status: newStatus } : v));
  };

  const filtered = vendors.filter(v => {
    const q = search.toLowerCase();
    const matchSearch = search.length >= 2
      ? v.name.toLowerCase().includes(q) || v.email.toLowerCase().includes(q) || v.location.toLowerCase().includes(q)
      : true;
    const matchType = typeFilter === "All Types" || v.type === typeFilter;
    const matchStatus = statusFilter === "All Status" || v.status === statusFilter;
    return matchSearch && matchType && matchStatus;
  });

  useEffect(() => {
    const handleClickOutside = () => setOpenMenu(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

    // const [search, setSearch] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({});
const [selectedVendor, setSelectedVendor] = useState(vendors[0]);
  // const filter = vendors.filter((v) => v.name.toLowerCase().includes(search.toLowerCase()));

  const handleEditVendor = (vendor) => {
  setSelectedVendor(vendor);

  setEditForm({
    companyName: vendor.companyName || "",
    email: vendor.email || "",
    phone: vendor.phone || "",
    gstNumber: vendor.gstNumber || "",
    registrationNumber: vendor.registrationNumber || "",
    businessType: vendor.businessType || "",
    yearOfEstablishment: vendor.yearOfEstablishment || "",
    associatedWith: vendor.associatedWith || "",
    kyc: vendor.kyc || "",
    verifiedOn: vendor.verifiedOn || "",
    verifiedBy: vendor.verifiedBy || "",
    nextReviewDate: vendor.nextReviewDate || "",
    bankName: vendor.bankName || "",
    accountHolder: vendor.accountHolder || "",
    accountNumber: vendor.accountNumber || "",
    ifscCode: vendor.ifscCode || "",
    swiftCode: vendor.swiftCode || "",
  });

  setShowDetail(true);
};

const handleSaveVendor = () => {
  if (!selectedVendor) return;

  const updatedVendor = {
    ...selectedVendor,
    ...editForm,
  };

  // Update vendors table data
  setVendors((prevVendors) =>
    prevVendors.map((vendor) =>
      vendor.id === selectedVendor.id
        ? updatedVendor
        : vendor
    )
  );

  // Update currently selected vendor
  setSelectedVendor(updatedVendor);

  // Close detail/edit section
  setShowDetail(false);

  console.log("Vendor updated:", updatedVendor);
};

const handleEditChange = (e) => {
  const { name, value } = e.target;

  setEditForm((prev) => ({
    ...prev,
    [name]: value,
  }));
};

useEffect(() => {
  if (showDetail && selectedVendor) {
    requestAnimationFrame(() => {
      document.getElementById("users-section")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }
}, [showDetail, selectedVendor]);
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      {showModal && <AddVendorModal onClose={() => setShowModal(false)} onAdd={handleAdd} />}

      <div className="max-w-6xl mx-auto">
        <div className="flex items-start justify-between mb-6 gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Vendors/Partners</h1>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">Manage vendors relationship and partnership</p>
          </div>
          {/* <button onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors shadow-sm whitespace-nowrap">
            <FaPlus className="text-xs" /> Add Vendor
          </button> */}
        </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((s) => (
          <StatCard key={s.label} stat={s} />
        ))}
      </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm font-medium text-gray-700 mb-4">Plan type vendor</p>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <DonutRing
              segments={[
                { hex: "#a855f7", percent: 25 },
                { hex: "#3b82f6", percent: 25 },
                { hex: "#22c55e", percent: 25 },
                { hex: "#e5e7eb", percent: 25 },
              ]}
              centerValue="1,248"
              centerLabel="Total"
            />
            <div className="space-y-2 w-full">
              {userByType.map((t) => (
                <div key={t.label} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className={`w-2 h-2 rounded-full ${t.color}`} />
                    {t.label}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">{t.value}</span>
                    <span className="text-gray-400">({t.percent})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
 
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm font-medium text-gray-700 mb-4">Vendor Registration</p>
          <div className="flex items-end justify-between h-40 gap-2">
            {registrationData.map((r) => (
              <div key={r.month} className="flex flex-col items-center flex-1 h-full justify-end gap-2">
                <div
                  className="w-full max-w-6 bg-green-400 rounded-sm"
                  style={{ height: `${(r.value / maxReg) * 100}%` }}
                />
                <span className="text-[10px] text-gray-400">{r.month}</span>
              </div>
            ))}
          </div>
        </div>
 
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm font-medium text-gray-700 mb-4">Vendor by Status</p>
          <div className="flex flex-col items-center gap-4">
            <DonutRing
              segments={[
                { hex: "#22c55e", percent: 84 },
                { hex: "#ef4444", percent: 16 },
              ]}
              centerValue="84%"
              centerLabel="Active"
            />
            <div className="w-full space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="w-2 h-2 rounded-full bg-green-500" /> Active
                </div>
                <span className="text-gray-900">1,048 <span className="text-gray-400">84%</span></span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="w-2 h-2 rounded-full bg-red-500" /> Inactive
                </div>
                <span className="text-gray-900">200 <span className="text-gray-400">16%</span></span>
              </div>
            </div>
          </div>
         </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex items-center border border-gray-200 rounded-xl px-3 py-2.5 gap-2 bg-white focus-within:border-teal-500 transition-all flex-1">
            <FaMagnifyingGlass className="text-gray-400 text-sm flex-shrink-0" />
            <input
              className="flex-1 text-sm outline-none bg-transparent"
              placeholder="Search Vendors"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <select
              className="flex-1 sm:flex-none border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 bg-white transition-all"
              value={typeFilter}
              onChange={e => setTypeFilter(e.target.value)}
            >
              {typeOptions.map(t => <option key={t}>{t}</option>)}
            </select>
            <select
              className="flex-1 sm:flex-none border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 bg-white transition-all"
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
            >
              {statusOptions.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400 text-sm">No vendors found</div>
        ) : (
           <div className="w-full overflow-x-auto rounded-xl border border-gray-100 bg-white px-6 py-4 [-webkit-overflow-scrolling:touch]">
          <table className="w-full text-[11px] min-w-[900px]">
            <thead>
              <tr className="text-sm text-[#081B6B] uppercase font-bold border-b border-slate-100">
                <th className="text-left py-2 font-bold">Company</th>
                <th className="text-left py-2 font-bold">Email</th>
                <th className="text-left py-2 font-bold">Phone</th>
                <th className="text-left py-2 font-bold">Location</th>
                <th className="text-left py-2 font-bold">Plan</th>
                <th className="text-center py-2 font-bold">Shipment</th>
                <th className="text-left py-2 font-bold">Status</th>
                <th className="text-left py-2 font-bold">KYC</th>
                <th className="text-right py-2 font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 ">
              {filtered.map((v, i) => (
                <tr key={v.id} className="text-xs">
                  <td  onClick={() => {
                       setSelectedVendor(v);
                       setShowDetail(true);
                        setIsEditing(false);
                      }} className="py-3 whitespace-nowrap cursor-pointer hover:underline">
                    <div className={`font-bold ${HEADING}`}>{v.companyName}</div>
                  </td>
                  <td className="py-3 whitespace-nowrap font-medium text-slate-500">{v.email}</td>
                  <td className="py-3 whitespace-nowrap font-medium text-slate-500">{v.phone}</td>
                  <td className="py-3 whitespace-nowrap font-medium text-slate-600">{v.location}</td>
                  <td className="py-3 whitespace-nowrap font-medium text-slate-500">{v.subscriptionPlan}</td>
                  <td className="py-3 whitespace-nowrap text-center font-medium text-slate-500">{v.shipmentStatus}</td>
                  <td className="py-3">
                    <StatusBadge status={v.status} />
                  </td>
                  <td className="py-3 whitespace-nowrap font-medium text-slate-500">{v.kyc}</td>
                  <td className="py-3 text-right relative">
                    <div className="flex items-center justify-end gap-2">
                       <button  onClick={(e) => {
                            e.stopPropagation();
                            setSelectedVendor(v);
                               handleEditVendor(v);
                               setIsEditing(true);
                            setShowEdit(true);
                            setShowDetail(true);
                            setOpenMenu(null);
                          }} className="text-slate-600">
                      <FiEdit />
                     </button>
                    {/* <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenMenu(openMenu === i ? null : i);
                      }}
                      className="text-slate-600 "
                    > 
                      <MoreVertical size={15} />
                    </button> */}
                     </div>
                    {openMenu === i && (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="absolute right-0 top-7 z-20 w-36 bg-white border border-gray-200 rounded-xl shadow-lg p-1.5 flex flex-col gap-1 text-left"
                      >
                        <button
                          onClick={() => {
                            setSelectedVendor(v);
                            setOpenMenu(null);
                          }}
                          className="w-full py-1.5 px-2.5 rounded-lg bg-blue-50 text-blue-600 font-medium text-xs text-left hover:bg-blue-100 transition-colors"
                        >
                          View
                        </button>
                        <button
                          onClick={() => {
                            handleStatusChange(v.id, "Active");
                            setOpenMenu(null);
                          }}
                          className="w-full py-1.5 px-2.5 rounded-lg bg-green-50 text-green-700 font-medium text-xs text-left hover:bg-green-100 transition-colors"
                        >
                          Active
                        </button>
                        <button
                          className="w-full py-1.5 px-2.5 rounded-lg bg-red-50 text-red-600 font-medium text-xs text-left hover:bg-red-100 transition-colors"
                        >
                          Suspend
                        </button>
                        <button
                          onClick={() => {
                            setSelectedVendor(v);
                            setOpenMenu(null);
                            setKycVerify(true)
                          }}
                          className="w-full py-1.5 px-2.5 rounded-lg bg-amber-50 text-amber-700 font-medium text-xs text-left hover:bg-amber-100 transition-colors"
                        >
                          KYC
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}
      </div>


     {/* {showDetail && ( <div className="w-full max-w-7xl bg-white rounded-2xl border border-gray-200 p-5 sm:p-6"  id="users-section">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <p className="font-semibold text-gray-900">{selectedVendor.companyName}</p>
            <span className="text-xs font-medium text-green-600">Active</span>
          </div>
          
          <div className="flex items-start justify-around gap-3">
            <button className="w-full whitespace-nowrap  py-1.5 px-2.5 rounded-lg bg-blue-50 text-blue-600 font-medium text-xs text-center  hover:bg-blue-100 transition-colors">Plan Change</button>
            <button className="w-full py-1.5 px-2.5 rounded-lg bg-blue-50 text-blue-600 font-medium text-xs text-center hover:bg-blue-100 transition-colors">Actions</button>
          </div>
        </div>
 
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-sm mb-6">
          <div>
            <p className="font-semibold text-gray-900 mb-2">Basic Information</p>
            <div className="space-y-1.5 text-gray-500">
              <p>Company Name <span className="block text-gray-900">{selectedVendor.companyName}</span></p>
       
              <p>Email <span className="block text-blue-500 underline">{selectedVendor.email}</span></p>
              <p>Phone <span className="block text-gray-900">{selectedVendor.phone}</span></p>
            
            </div>
          </div>
          <div>
            <p className="font-semibold text-gray-900 mb-2">Business Information</p>
            <div className="space-y-1.5 text-gray-500">
              <p>GST/VAT Number <span className="block text-gray-900">US987654321</span></p>
              <p>Registration Number <span className="block text-gray-900">GLI-2021-001</span></p>
              <p>Business Type <span className="block text-gray-900">Private Limited</span></p>
              <p>Year of Establishment <span className="block text-gray-900">2018</span></p>
              <p>Associated With <span className="block text-gray-900">Indo Global Pvt. Ltd.</span></p>
            </div>
          </div>
          <div>
            <p className="font-semibold text-gray-900 mb-2">KYC Status</p>
            <div className="space-y-1.5 text-gray-500">
              <p>KYC Status <span className="block text-green-600">{selectedVendor.kyc}</span></p>
              <p>Verified On <span className="block text-gray-900">12 May 2024</span></p>
              <p>Verified By <span className="block text-gray-900">Admin User</span></p>
              <p>Next Review Date <span className="block text-gray-900">12 May 2025</span></p>
            </div>
          </div>
          <div>
            <p className="font-semibold text-gray-900 mb-2">Bank Details</p>
            <div className="space-y-1.5 text-gray-500">
              <p>Bank Name <span className="block text-gray-900">Chase Bank</span></p>
              <p>Account Holder <span className="block text-gray-900">Global Logistic Inc.</span></p>
              <p>Account Number <span className="block text-gray-900">1234 **** **** 5678</span></p>
              <p>IFSC Code <span className="block text-gray-900">CHASUS33XXX</span></p>
              <p>SWIFT Code <span className="block text-gray-900">CHASUS33</span></p>
            </div>
          </div>
        </div>

      
    </div>)} */}

      
    {showDetail && selectedVendor && (
          <div
            className="w-full max-w-7xl bg-white rounded-2xl border border-gray-200 p-5 sm:p-6"
            id="users-section"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <p className="font-semibold text-gray-900">
                  {selectedVendor.companyName}
                </p>

                <span
                  className={`text-xs font-medium ${
                    selectedVendor.suspend
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {selectedVendor.suspend ? "Suspended" : "Active"}
                </span>
              </div>

              <div className="flex items-center gap-3">
                {/* Edit button */}
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="whitespace-nowrap py-1.5 px-3 rounded-lg bg-blue-50 text-blue-600 font-medium text-xs hover:bg-blue-100 transition-colors"
                  >
                    Edit
                  </button>
                )}

                {/* Save button */}
                {/* {isEditing && (
                  <button
                    onClick={handleSaveVendor}
                    className="whitespace-nowrap py-1.5 px-3 rounded-lg bg-blue-600 text-white font-medium text-xs hover:bg-blue-700 transition-colors"
                  >
                    Save Changes
                  </button>
                )} */}

                {/* Cancel / Close */}
                <button className="text-green-600 font-semibold text-sm">Verified</button>
                <button
                  onClick={() => {
                    setShowDetail(false);
                    setIsEditing(false);
                  }}
                  className="whitespace-nowrap py-1.5 px-3 rounded-lg bg-gray-100 text-gray-600 font-medium text-xs hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>

            {/* Main Details */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-sm mb-6">

              {/* ================= BASIC INFORMATION ================= */}
              <div>
                <p className="font-semibold text-gray-900 mb-3">
                  Basic Information
                </p>

                <div className="space-y-3">

                  {/* Company Name */}
                  <div>
                    <label className="block text-gray-500 mb-1">
                      Company Name
                    </label>

                    {isEditing ? (
                      <input
                        type="text"
                        value={selectedVendor.companyName || ""}
                        onChange={(e) =>
                          setSelectedVendor({
                            ...selectedVendor,
                            companyName: e.target.value,
                          })
                        }
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900">
                        {selectedVendor.companyName || "-"}
                      </p>
                    )}
                  </div>

                  {/* Email - NEVER EDITABLE */}
                  <div>
                    <label className="block text-gray-500 mb-1">
                      Email
                    </label>

                    <p className="text-blue-500 underline break-all">
                      {selectedVendor.email || "-"}
                    </p>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-gray-500 mb-1">
                      Phone
                    </label>

                    {isEditing ? (
                      <input
                        type="text"
                        value={selectedVendor.phone || ""}
                        onChange={(e) =>
                          setSelectedVendor({
                            ...selectedVendor,
                            phone: e.target.value,
                          })
                        }
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900">
                        {selectedVendor.phone || "-"}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* ================= BUSINESS INFORMATION ================= */}
              <div>
                <p className="font-semibold text-gray-900 mb-3">
                  Business Information
                </p>

                <div className="space-y-3">

                  {/* GST/VAT */}
                  <div>
                    <label className="block text-gray-500 mb-1">
                      GST/VAT Number
                    </label>

                    {isEditing ? (
                      <input
                        type="text"
                        value={selectedVendor.gstNumber || ""}
                        onChange={(e) =>
                          setSelectedVendor({
                            ...selectedVendor,
                            gstNumber: e.target.value,
                          })
                        }
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900">
                        {selectedVendor.gstNumber || "-"}
                      </p>
                    )}
                  </div>

                  {/* Registration Number */}
                  <div>
                    <label className="block text-gray-500 mb-1">
                      Registration Number
                    </label>

                    {isEditing ? (
                      <input
                        type="text"
                        value={selectedVendor.registrationNumber || ""}
                        onChange={(e) =>
                          setSelectedVendor({
                            ...selectedVendor,
                            registrationNumber: e.target.value,
                          })
                        }
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900">
                        {selectedVendor.registrationNumber || "-"}
                      </p>
                    )}
                  </div>

                  {/* Business Type */}
                  <div>
                    <label className="block text-gray-500 mb-1">
                      Business Type
                    </label>

                    {isEditing ? (
                      <input
                        type="text"
                        value={selectedVendor.businessType || ""}
                        onChange={(e) =>
                          setSelectedVendor({
                            ...selectedVendor,
                            businessType: e.target.value,
                          })
                        }
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900">
                        {selectedVendor.businessType || "-"}
                      </p>
                    )}
                  </div>

                  {/* Year */}
                  <div>
                    <label className="block text-gray-500 mb-1">
                      Year of Establishment
                    </label>

                    {isEditing ? (
                      <input
                        type="number"
                        value={selectedVendor.yearOfEstablishment || ""}
                        onChange={(e) =>
                          setSelectedVendor({
                            ...selectedVendor,
                            yearOfEstablishment: e.target.value,
                          })
                        }
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900">
                        {selectedVendor.yearOfEstablishment || "-"}
                      </p>
                    )}
                  </div>

                  {/* Associated With */}
                  <div>
                    <label className="block text-gray-500 mb-1">
                      Associated With
                    </label>

                    {isEditing ? (
                      <input
                        type="text"
                        value={selectedVendor.associatedWith || ""}
                        onChange={(e) =>
                          setSelectedVendor({
                            ...selectedVendor,
                            associatedWith: e.target.value,
                          })
                        }
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900">
                        {selectedVendor.associatedWith || "-"}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* ================= KYC INFORMATION ================= */}
              <div>
                <p className="font-semibold text-gray-900 mb-3">
                  KYC Status
                </p>

                <div className="space-y-3">

                  {/* KYC */}
                  <div>
                    <label className="block text-gray-500 mb-1">
                      KYC Status
                    </label>

                    {isEditing ? (
                      <select
                        value={selectedVendor.kyc || ""}
                        onChange={(e) =>
                          setSelectedVendor({
                            ...selectedVendor,
                            kyc: e.target.value,
                          })
                        }
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Verified">Verified</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    ) : (
                      <p
                        className={
                          selectedVendor.kyc === "Verified"
                            ? "text-green-600"
                            : "text-gray-900"
                        }
                      >
                        {selectedVendor.kyc || "-"}
                      </p>
                    )}
                  </div>

                  {/* Verified On */}
                  <div>
                    <label className="block text-gray-500 mb-1">
                      Verified On
                    </label>

                    {isEditing ? (
                      <input
                        type="date"
                        value={selectedVendor.verifiedOn || ""}
                        onChange={(e) =>
                          setSelectedVendor({
                            ...selectedVendor,
                            verifiedOn: e.target.value,
                          })
                        }
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900">
                        {selectedVendor.verifiedOn || "-"}
                      </p>
                    )}
                  </div>

                  {/* Verified By */}
                  <div>
                    <label className="block text-gray-500 mb-1">
                      Verified By
                    </label>

                    {isEditing ? (
                      <input
                        type="text"
                        value={selectedVendor.verifiedBy || ""}
                        onChange={(e) =>
                          setSelectedVendor({
                            ...selectedVendor,
                            verifiedBy: e.target.value,
                          })
                        }
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900">
                        {selectedVendor.verifiedBy || "-"}
                      </p>
                    )}
                  </div>

              
                </div>
              </div>

              {/* ================= BANK DETAILS ================= */}
              <div>
                <p className="font-semibold text-gray-900 mb-3">
                  Bank Details
                </p>

                <div className="space-y-3">

                  {/* Bank Name */}
                  <div>
                    <label className="block text-gray-500 mb-1">
                      Bank Name
                    </label>

                    {isEditing ? (
                      <input
                        type="text"
                        value={selectedVendor.bankName || ""}
                        onChange={(e) =>
                          setSelectedVendor({
                            ...selectedVendor,
                            bankName: e.target.value,
                          })
                        }
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900">
                        {selectedVendor.bankName || "-"}
                      </p>
                    )}
                  </div>

                  {/* Account Holder */}
                  <div>
                    <label className="block text-gray-500 mb-1">
                      Account Holder
                    </label>

                    {isEditing ? (
                      <input
                        type="text"
                        value={selectedVendor.accountHolder || ""}
                        onChange={(e) =>
                          setSelectedVendor({
                            ...selectedVendor,
                            accountHolder: e.target.value,
                          })
                        }
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900">
                        {selectedVendor.accountHolder || "-"}
                      </p>
                    )}
                  </div>

                  {/* Account Number */}
                  <div>
                    <label className="block text-gray-500 mb-1">
                      Account Number
                    </label>

                    {isEditing ? (
                      <input
                        type="text"
                        value={selectedVendor.accountNumber || ""}
                        onChange={(e) =>
                          setSelectedVendor({
                            ...selectedVendor,
                            accountNumber: e.target.value,
                          })
                        }
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900">
                        {selectedVendor.accountNumber || "-"}
                      </p>
                    )}
                  </div>

                  {/* IFSC */}
                  <div>
                    <label className="block text-gray-500 mb-1">
                      IFSC Code
                    </label>

                    {isEditing ? (
                      <input
                        type="text"
                        value={selectedVendor.ifscCode || ""}
                        onChange={(e) =>
                          setSelectedVendor({
                            ...selectedVendor,
                            ifscCode: e.target.value,
                          })
                        }
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900">
                        {selectedVendor.ifscCode || "-"}
                      </p>
                    )}
                  </div>

                  {/* SWIFT */}
                  <div>
                    <label className="block text-gray-500 mb-1">
                      SWIFT Code
                    </label>

                    {isEditing ? (
                      <input
                        type="text"
                        value={selectedVendor.swiftCode || ""}
                        onChange={(e) =>
                          setSelectedVendor({
                            ...selectedVendor,
                            swiftCode: e.target.value,
                          })
                        }
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900">
                        {selectedVendor.swiftCode || "-"}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            {isEditing && (
              
              <div className="flex items-center  justify-between "> 
              <div className="pt-4">
                {/* <button >Suspend</button> */}
                 <button 
                          onClick={() => {
                            // handleStatusChange(v.id, "Suspended");
                            setOpenMenu(null);
                            setRejectKyc(true)
                          }}
                          className="w-full  py-1.5 px-2.5 rounded-lg bg-red-50 text-red-600 font-medium text-xs text-left hover:bg-red-100 transition-colors"
                        >
                          Suspend
                        </button>
                 </div>
              <div className="flex justify-end gap-3 border-t pt-4">
                 <button
                          onClick={() => {
                          
                            setOpenMenu(null);
                            setKycVerify(true)
                          }}
                          className="px-4 py-2 rounded-lg flex items-center gap-2  bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition-colors"
                        >
                       <CircleCheckBig size={16} className="text-green-500 "/> Verify  KYC
                        </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                  }}
                  className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSaveVendor}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                Save Changes
                </button>
              </div>
              </div>
               
            )}
          </div>
        )}
 
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
                          
                          <div className="bg-white rounded-2xl p-6 shadow-sm border-b-gray-800">
                              <p className="font-bold font-sm">Current Plan</p>
                              <span className="bg-green-100 text-[#166534] px-3 py-1 rounded text-xs inline-block mt-3">
                                  Pro Plan
                              </span>
          
                              <div className="flex justify-between items-center mt-6">
                                  <div>
                                      <h2 className="text-3xl font-bold">₹24,860 <span className="text-gray-400 text-sm font-medium">/ year</span></h2>
          
                                  </div>
          
                                  <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
                                      <img src={crown} className="text-blue-500 text-4xl" />
                                  </div>
                              </div>
          
                              <p className="mt-4 text-gray-400 text-sm">Renews on</p>
                              <p className="font-semibold">25 Apr 2026</p>
          
                             <div className="relative mt-5">
                                <select
                                  className="w-full text-sm bg-[#007d88] text-white py-3 px-4 pr-10 rounded-lg appearance-none cursor-pointer outline-none"
                                  defaultValue=""
                                >
                                   

                                  <option value="basic" className="text-gray-900 bg-white">
                                    Basic Plan
                                  </option>

                                  <option value="starter" className="text-gray-900 bg-white">
                                    Starter Plan
                                  </option>

                                  <option value="pro" className="text-gray-900 bg-white">
                                    Pro Plan
                                  </option>
                                </select>

                                <ChevronDown
                                  size={18}
                                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white pointer-events-none"
                                />
                              </div>
                          </div>
          
                          <div className="k flex flex-col gap-3"> 
                              <div className="bg-white rounded-2xl p-6 shadow-sm border-b-gray-800 ">
                                  <div className="flex justify-between">
                                      <h3 className="font-bold font-sm">Billing Information</h3>
                                      <span className="bg-green-100 text-green-600 px-3 rounded-full text-sm">
                                          Active
                                      </span>
                                  </div>
              
                                  <div className="space-y-4 mt-6 text-black-700">
                                      <InfoRow title="Billing Cycle" value="Yearly" />
                                      <InfoRow title="Plan Amount" value="₹24,860.00" />
                                      <InfoRow title="Next Billing Date" value="25 Apr 2026" />
                                      <InfoRow title="Payment Method" value="VISA ****4242" />
                                  </div> 
                              </div>
                              <div className="flex bg-white px-3 py-3 rounded-2xl shadow justify-around"> <div>
                              <label className="block text-sm font-medium mb-1">
                                Start Date
                              </label>
                              <input
                                type="date"
                                value={date.startDate}
                                onChange={(e) =>
                                  setForm({ ...date, startDate: e.target.value })
                                }
                                className="border px-3 py-2 rounded w-full"
                              />
                            </div>

                                {/* End Date */}
                                <div>   <label className="block text-sm font-medium mb-1">
                                End Date
                              </label>
                              <input
                                  type="date"
                                  value={date.endDate}
                                  onChange={(e) =>
                                    setForm({ ...date, endDate: e.target.value })
                                  }
                                  className="border px-3 py-2 rounded"
                                />
                              </div>
                            </div>
                          </div>
                      </div>


        {kycVerify && (<KYCVerificationModal onClose={() => setKycVerify(false)}/>)}
        
          
    </div>
  );
}



