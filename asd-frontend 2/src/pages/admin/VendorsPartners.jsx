import { useState } from "react";
import {
  FaPlus, FaMagnifyingGlass, FaXmark, FaChevronDown,
  FaStar, FaTruck, FaBoxOpen, FaWarehouse, FaFileContract
} from "react-icons/fa6";
import { useEffect } from "react";
import API from "../../api/axios";

const typeOptions = ["All Types", "Shipping Partner", "Freight Forwarder", "Custom Broker", "Warehouse Partner"];
const statusOptions = ["All Status", "Active", "Inactive"];

const typeIcon = (type) => {
  if (type === "Shipping Partner") return <FaTruck className="text-blue-400 text-xs" />;
  if (type === "Freight Forwarder") return <FaBoxOpen className="text-orange-400 text-xs" />;
  if (type === "Custom Broker") return <FaFileContract className="text-purple-400 text-xs" />;
  if (type === "Warehouse Partner") return <FaWarehouse className="text-teal-400 text-xs" />;
  return <FaTruck className="text-blue-400 text-xs" />;
};

const initialVendors = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  name: "Global Logistic Inc.",
  email: "contact@globallog.com",
  type: "Shipping Partner",
  location: "United States",
  rating: 4.8,
  activeShipment: 32,
  status: "Active",
}));

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

  const handleAdd = async () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
  
    try {
      await API.post("/vendors", {
        name: form.name,
        email: form.email,
        type: form.type,
        location: form.location,
        rating: Number(form.rating || 0),
        activeShipments: Number(form.activeShipment || 0),
        status: form.status.toLowerCase() // 🔥 important
      });
  
      onClose();
      window.location.reload(); // simple for now
    } catch (err) {
      console.log(err);
      alert("Error creating vendor");
    }
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
        <span className={`text-xs px-2.5 py-1 rounded-lg font-medium ${
  vendor.status === "active"
    ? "bg-green-100 text-green-600"
    : "bg-gray-100 text-gray-500"
}`}>
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
          <span className="text-xs font-semibold text-gray-700">{vendor.activeShipments}</span>
        </div>
      </div>
      <button className="w-full mt-4 py-2 text-xs font-medium text-teal-500 border border-teal-200 rounded-xl hover:bg-teal-50 transition-colors">
        View Details
      </button>
    </div>
  );
}

export default function VendorsPartners() {
  const [vendors, setVendors] = useState([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [showModal, setShowModal] = useState(false);
  const fetchVendors = async () => {
    try {
      const res = await API.get("/vendors");
      setVendors(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  
  useEffect(() => {
    fetchVendors();
  }, []);

  const handleAdd = (vendor) => setVendors(prev => [vendor, ...prev]);

  const filtered = vendors.filter(v => {
    const q = search.toLowerCase();
    const matchSearch = search.length >= 2
      ? v.name.toLowerCase().includes(q) || v.email.toLowerCase().includes(q) || v.location.toLowerCase().includes(q)
      : true;
    const matchType = typeFilter === "All Types" || v.type === typeFilter;
    const matchStatus = statusFilter === "All Status" || v.status === statusFilter.toLowerCase();
    return matchSearch && matchType && matchStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      {showModal && <AddVendorModal onClose={() => setShowModal(false)} onAdd={handleAdd} />}

      <div className="max-w-6xl mx-auto">
        <div className="flex items-start justify-between mb-6 gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Vendors/Partners</h1>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">Manage vendors relationship and partnership</p>
          </div>
          <button onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors shadow-sm whitespace-nowrap">
            <FaPlus className="text-xs" /> Add Vendor
          </button>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(v => <VendorCard key={v.id} vendor={v} />)}
          </div>
        )}
      </div>
    </div>
  );
}