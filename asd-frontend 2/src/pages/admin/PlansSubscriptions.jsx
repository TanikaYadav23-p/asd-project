

import { useState, useEffect, useRef } from "react";
import {
    FiMenu,
    FiSearch,
    FiBell,
    FiMail,
    FiSun,
    FiMoon,
    FiPlus,
    FiUsers,
    FiShield,
    FiCreditCard,
    FiDatabase,
    FiFileText,
    FiGlobe,
    FiPackage,
    FiTruck,
    FiCpu,
    FiPieChart,
    FiLink,
    FiMonitor,
    FiHelpCircle,
    FiGrid,
    FiSettings,
    FiChevronRight,
    FiUserPlus,
    FiUserCheck,
    FiPlusCircle,
    FiAlertCircle,
    FiCheckCircle,
    FiXCircle,
    FiHome,
    FiCamera,
    FiLock,
    FiSend,
  } from "react-icons/fi";
  import {
    FaTrash,
    FaCheck,
    FaBox,
    FaBell,
    FaChevronLeft,
    FaFileLines,
    FaListCheck,
    FaGripVertical,
    FaPlus,
    FaSliders,
    FaEye,
    FaClock,
    FaUser,
    FaFloppyDisk,
    FaPaperPlane,
    FaUsers,
    FaIndianRupeeSign,
    FaRotate,
  } from "react-icons/fa6";
  
  import {
    FiEdit,
    FiTrash2,
    FiCheck,
    FiDollarSign,
    FiRefreshCw,
    FiUser,
  } from "react-icons/fi";
  import {
    LineChart,
    Line,
    AreaChart,
    Area,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
  } from "recharts";
  import { RxCross1 } from "react-icons/rx";
  import { FaCalendarAlt, FaTimes } from "react-icons/fa";
  import API from "../../api/axios";
  import { toast } from "react-toastify";


export default function PlanSection({ showAddPlan, setShowAddPlan }) {
  const [tab, setTab] = useState("monthly");
  const [plansData, setPlansData] = useState({
    monthly: [],
    yearly: []
  });

  const fetchPlans = async () => {
    try {
      const [monthlyRes, yearlyRes] = await Promise.all([
        API.get("/plans?type=monthly"),
        API.get("/plans?type=yearly"),
      ]);
  
      const format = (plans) =>
      plans.map((p) => ({
        id: p._id,
        name: p.name,
        price: p.price,
        billingCycle: p.billingCycle,
        description: p.description,
        features: p.features,
        limits: p.limits,
        status: p.status,
        isPopular: p.isPopular,
        isRecommended: p.isRecommended,
        subscriber: p.subscribers,
        planType: p.planType
      }));
  
      setPlansData({
        monthly: format(monthlyRes.data.data),
        yearly: format(yearlyRes.data.data),
      });
  
    } catch (err) {
      toast.error("Failed to load plans ❌");
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const [editPlan, setEditPlan] = useState(null);


  const plans = plansData[tab];
  
  const [yearlyPlans, setYearlyPlans] = useState([{ name: "Pro", price: "₹20,000/-", desc: "per Year", features: []  }]);

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      {!showAddPlan && (
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
            <div>
              <h2 className="text-xl font-semibold">Plan & Subscription</h2>
              <p className="text-sm text-gray-500">
                Manage Subscription Plan & Pricing
              </p>
            </div>

            <div className="flex justify-center mb-6">
              <div className="flex bg-gray-200 rounded-full p-1 w-fit">
                <button
                  onClick={() => setTab("monthly")}
                  className={`px-4 py-1 text-sm rounded-full transition ${
                    tab === "monthly"
                      ? "bg-teal-500 text-white"
                      : "text-gray-600"
                  }`}
                >
                  Monthly
                </button>

                <button
                  onClick={() => setTab("yearly")}
                  className={`px-4 py-1 text-sm rounded-full transition ${
                    tab === "yearly"
                      ? "bg-teal-500 text-white"
                      : "text-gray-600"
                  }`}
                >
                  Yearly
                </button>
              </div>
            </div>

            <div>
              <button
                onClick={() => setShowAddPlan(true)}
                className="bg-teal-500 text-white px-4 py-2 cursor-pointer rounded-md text-sm w-full sm:w-auto"
              >
                + Add Plan
              </button>{" "}
            </div>
          </div>

          <div
            className={`grid gap-4 ${
              tab === "monthly"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1 place-items-center"
            }`}
          >
            {plans.map((plan, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border flex flex-col gap-10  p-5 w-full max-w-xs min-h-[420px] "
              >
                <div className="pb-28">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">{plan.name}</h3>
                    <FiEdit
  onClick={() => {
    setEditPlan(plansData[tab][i]);   // 👈 selected plan set
    setShowAddPlan(true);             // 👈 open edit screen
  }}
  className="text-gray-500 cursor-pointer hover:text-teal-500"
/>
                  </div>

                  <h2 className="text-xl font-bold">
                    {plan.price}
                    <span className="text-sm font-normal text-gray-500">
                      {" "}
                      {plan.billingCycle}
                    </span>
                  </h2>

                  <p className="text-xs text-gray-400 mb-3">
                    Perfect For small Businesses
                  </p>

                  <div className="space-y-2 text-sm mb-4">
                  {plan.features
  ?.filter(f => f.enabled)
  .map((item, idx) => (
    <div key={idx} className="flex items-center gap-2">
      <FiCheck className="text-teal-500" />
      <span>{item.name}</span>
    </div>
))}
                  </div>
                </div>

                <div className="border-t pt-3 text-sm mt-auto">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Subscriber</span>
                    <span>{plan.subscriber}</span>
                  </div>

                  <div className="flex justify-between mt-1 items-center">
                    <span className="text-gray-500">Status</span>
                    <span className="bg-teal-100 text-teal-600 px-2 py-0.5 rounded text-xs">
                     {plan.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

{showAddPlan && <AddPlan 
fetchPlans={fetchPlans}
  setShowAddPlan={setShowAddPlan} 
  setYearlyPlans={setYearlyPlans} 
  setPlansData={setPlansData}
  plansData={plansData}
  tab={tab}
  setTab={setTab}
  editPlan={editPlan}   // ✅ ADD THIS
/>}
    </div>
  );
}


function Toggle({ checked, onChange }) {
  return (
    <div
      onClick={() => onChange(!checked)}
      className={`relative w-10 h-6 rounded-full cursor-pointer flex-shrink-0 transition-all duration-200 ${
        checked ? "bg-teal-500" : "bg-gray-300"
      }`}
    >
      <div
        className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-200 ${
          checked ? "left-5" : "left-1"
        }`}
      />
    </div>
  );
}

function AddPlan({ setShowAddPlan, setYearlyPlans, setPlansData, plansData, tab, setTab, editPlan }) {
  const [formData, setFormData] = useState({
    planName: "starter",
    planType: "monthly",
    price: "1,999",
    billingCycle: "Per Month",
    description: "hello",
  
    features: [
      { id: 1, name: "Upto 100 shipment/month", enabled: true },
      { id: 2, name: "Basic reporting", enabled: true },
      { id: 3, name: "Email Support", enabled: false },
      { id: 4, name: "2 user accounts", enabled: false },
      { id: 5, name: "Standard API access", enabled: true },
    ],
  
    status: "Active",
    recommendedPlan: true,
    popularPlan: false,
  
    shipmentLimit: "100",
    userLimit: "2",
    apiLimit: "2000",
    storageLimit: "10",
  });

  useEffect(() => {
    if (editPlan) {
      setFormData({
        planName: editPlan.name || "",
        planType: editPlan.planType || "monthly",
        price: editPlan.price?.toString() || "",
        billingCycle: editPlan.billingCycle || "Per Month",
        description: editPlan.description || "",
  
        features: Array.isArray(editPlan.features)
          ? editPlan.features.map((f, i) => ({
              id: Date.now() + i,
              name: f?.name || "",
              enabled: f?.enabled ?? true
            }))
          : [],
  
        status: editPlan.status || "active",
        recommendedPlan: editPlan.isRecommended || false,
        popularPlan: editPlan.isPopular || false,
  
        shipmentLimit: editPlan.limits?.shipmentLimit || "",
        userLimit: editPlan.limits?.userLimit || "",
        apiLimit: editPlan.limits?.apiLimit || "",
        storageLimit: editPlan.limits?.storageLimit || "",
      });
    }
  }, [editPlan]);

  const [showAddFeature, setShowAddFeature] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [savedData, setSavedData] = useState(null);

  // const addFeature = (f) =>
  //   setFormData((prev) => [...prev, { id: Date.now(), ...f }]);

  const addFeature = (f) => {
    setFormData({
      ...formData,
  
      features: [
        ...formData.features,
  
        {
          id: Date.now(),
          ...f,
        },
      ],
    });
  };

  const deleteFeature = (id) => {
    setFormData({
      ...formData,
      features: formData.features.filter((f) => f.id !== id),
    });
  };
  const toggleFeature = (id) => {
    setFormData({
      ...formData,
      features: formData.features.map((f) =>
        f.id === id ? { ...f, enabled: !f.enabled } : f
      ),
    });
  };

    const cleanPrice = Number(formData.price.replace(/,/g, ""));

    const handleSave = async () => {
      try {
        const payload = {
          name: formData.planName,
          planType: formData.planType.toLowerCase(),
          price: Number(formData.price.replace(/,/g, "")),
    
          billingCycle: formData.billingCycle,
          description: formData.description,
    
          features: formData.features.map(f => ({
            name: f.name,
            enabled: f.enabled
          })),
    
          limits: {
            shipmentLimit: Number(formData.shipmentLimit || 0),
            userLimit: Number(formData.userLimit || 0),
            apiLimit: Number(formData.apiLimit || 0),
            storageLimit: Number(formData.storageLimit || 0),
          },
    
          status: formData.status.toLowerCase(),
          isPopular: formData.popularPlan,
          isRecommended: formData.recommendedPlan,
        };
    
        if (editPlan) {
          // ✏️ UPDATE
          await API.put(`/plans/${editPlan.id}`, payload);
          await fetchPlans();
          toast.success("Plan updated ✅");
        } else {
          // ➕ CREATE
          await API.post("/plans", payload);
          toast.success("Plan created ✅");
        }
    
        setShowAddPlan(false);
    
      } catch (err) {
        toast.error("Save failed ❌");
      }
    };

    const handlePublish = async () => {
      try {
        const payload = {
          name: formData.planName,
          planType: formData.planType.toLowerCase(),
          price: Number(formData.price.replace(/,/g, "")),
          billingCycle: formData.billingCycle,
          description: formData.description,
    
          features: formData.features.map((f) => ({
            name: f.name,
            enabled: f.enabled,
          })),
    
          limits: {
            shipmentLimit: Number(formData.shipmentLimit || 0),
            userLimit: Number(formData.userLimit || 0),
            apiLimit: Number(formData.apiLimit || 0),
            storageLimit: Number(formData.storageLimit || 0),
          },
    
          status: "active", // publish = active
          isPopular: formData.popularPlan,
          isRecommended: formData.recommendedPlan,
        };
    
        await API.post("/plans", payload);
    
        toast.success("Plan Published 🚀");
    
        setShowAddPlan(false);
    
      } catch (err) {
        toast.error("Publish failed ❌");
      }
    };
    
    const [analytics, setAnalytics] = useState(null);

    const fetchAnalytics = async (planId) => {
      try {
        const res = await API.get(`/plans/analytics/${planId}`);
        setAnalytics(res.data.data);
      } catch (err) {
        toast.error("Analytics load failed ❌");
      }
    };

    useEffect(() => {
      if (editPlan?.id) {
        fetchAnalytics(editPlan.id);
      }
    }, [editPlan]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ADD FEATURE POPUP */}
      {showAddFeature && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-semibold text-gray-800">
                Add New Feature
              </h3>
              <button
                onClick={() => setShowAddFeature(false)}
                className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <FaTimes />
              </button>
            </div>
            <AddFeatureForm
              onClose={() => setShowAddFeature(false)}
              onAdd={addFeature}
            />
          </div>
        </div>
      )}

      {/* DELETE CONFIRM POPUP */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mb-4">
              <FaTrash className="text-red-500" />
            </div>
            <h3 className="text-base font-semibold text-gray-800 mb-2">
              Delete Feature
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-gray-700">
                "{deleteTarget.name}"
              </span>
              ? This cannot be undone.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 px-4 py-2.5 text-sm text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteFeature(deleteTarget.id)}
                className="flex-1 px-4 py-2.5 text-sm text-white bg-red-500 rounded-xl hover:bg-red-600 font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SAVED DATA POPUP */}
      {savedData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 flex flex-col max-h-[85vh]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center">
                  <FaCheck className="text-green-500 text-sm" />
                </div>
                <h3 className="text-base font-semibold text-gray-800">
                  Plan Data Saved
                </h3>
              </div>
              <button
                onClick={() => setSavedData(null)}
                className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <FaTimes />
              </button>
            </div>
            <p className="text-xs text-gray-400 mb-3">
              Yeh data aapke{" "}
              <code className="bg-gray-100 px-1 rounded text-gray-600">
                onSave(data)
              </code>{" "}
              callback mein milega:
            </p>
            <div className="overflow-y-auto flex-1 bg-gray-900 rounded-xl p-4">
              <pre className="text-xs text-green-400 whitespace-pre-wrap break-all">
                {JSON.stringify(savedData, null, 2)}
              </pre>
            </div>
            <button
              onClick={() => setSavedData(null)}
              className="mt-4 w-full px-4 py-2.5 text-sm text-white bg-teal-500 rounded-xl hover:bg-teal-600 font-medium"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        {/* PAGE HEADER */}
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => setShowAddPlan(false)}
            className="w-8 h-8 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-gray-500 hover:text-gray-800 hover:border-gray-300 transition-all shadow-sm"
          >
            <FaChevronLeft className="text-xs" />
          </button>
          <div>
          <h1>
  {editPlan ? "Edit Plan" : "Add New Plan"}
</h1>
            <p className="text-xs text-gray-400">
              Create and configure a new Subscription plan for platform users.
            </p>
          </div>
        </div>

        <div className="flex flex-col xl:flex-row gap-4">
          {/* LEFT COLUMN */}
          <div className="flex-1 flex flex-col gap-4 min-w-0">
            {/* PLAN DETAILS */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100">
              <h2 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-5 h-5 bg-teal-500/10 rounded-md flex items-center justify-center">
                  <FaFileLines className="text-teal-500 text-xs" />
                </span>
                Plan Details
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                <div>
                  <label className="text-xs font-medium text-gray-500 block mb-1.5">
                    Plan Name
                  </label>
                  <input
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-all"
                    value={formData.planName}
                    onChange={(e) => setFormData({...formData,planName: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 block mb-1.5">
                    Plan Type
                  </label>
                  <select
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-teal-500 bg-white transition-all"
                    value={formData.planType}
                    onChange={(e) => setFormData({...formData,planType: e.target.value})}
                  >
                   <option value="monthly">Monthly</option>
<option value="yearly">Yearly</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 block mb-1.5">
                    Price
                  </label>
                  <div className="flex items-center border border-gray-200 rounded-xl px-3 py-2 gap-1 focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-500/10 transition-all">
                    <span className="text-gray-400 text-sm">₹</span>
                    <input
                      className="w-full text-sm outline-none"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData,price: e.target.value})}
                    />
                    <span className="text-gray-400 text-xs">/-</span>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 block mb-1.5">
                    Billing Cycle
                  </label>
                  <select
                    className="w-full border border-gray-200 rounded-xl px-2 py-2 text-sm outline-none focus:border-teal-500 bg-white transition-all"
                    value={formData.billingCycle}
                    onChange={(e) => setFormData({...formData,billingCycle: e.target.value})}
                  >
                    <option>Per Month</option>
                    <option>Per Year</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 block mb-1.5">
                  Description
                </label>
                <textarea
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 resize-none transition-all"
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData,description: e.target.value})}
                />
              </div>
            </div>

            {/* PLAN FEATURES */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100">
              <h2 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-5 h-5 bg-teal-500/10 rounded-md flex items-center justify-center">
                  <FaListCheck className="text-teal-500 text-xs" />
                </span>
                Plan Features
              </h2>
              <div className="flex flex-col gap-2 mb-3">
                {formData.features.map((f) => (
                  <div key={f.id} className="flex items-center gap-2">
                    <FaGripVertical className="text-gray-300 text-xs cursor-grab flex-shrink-0" />
                    <input
                      className="flex-1 min-w-0 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-all"
                      value={f.name}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          features: formData.features.map((x) =>
                            x.id === f.id
                              ? { ...x, name: e.target.value }
                              : x
                          ),
                        })
                      }
                    />
                    <Toggle
                        checked={f.enabled}
                        onChange={() =>
                          setFormData({
                            ...formData,
                            features: formData.features.map((x) =>
                              x.id === f.id
                                ? { ...x, enabled: !x.enabled }
                                : x
                            ),
                          })
                        }
                      />
                  
                  <button
                    onClick={() =>
                      setFormData({
                        ...formData,
                        features: formData.features.filter(
                          (x) => x.id !== f.id
                        ),
                      })
                    }
                    className="w-8 h-8 flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all flex-shrink-0"
                  >
                    <FaTrash className="text-sm" />
                  </button>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setShowAddFeature(true)}
                className="flex items-center gap-2 border border-teal-500 text-teal-500 rounded-xl px-4 py-2 text-sm hover:bg-teal-500/5 transition-all font-medium"
              >
                <FaPlus className="text-xs" /> Add Features
              </button>
            </div>

            {/* PLAN LIMITS */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100">
              <h2 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-5 h-5 bg-teal-500/10 rounded-md flex items-center justify-center">
                  <FaSliders className="text-teal-500 text-xs" />
                </span>
                Plan Limits
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {[
                              {
                                label: "Shipment Limit",
                                key: "shipmentLimit",
                                suffix: null,
                              },
                              {
                                label: "User Limit",
                                key: "userLimit",
                                suffix: null,
                              },
                              {
                                label: "API Limit",
                                key: "apiLimit",
                                suffix: null,
                              },
                              {
                                label: "Storage Limit (GB)",
                                key: "storageLimit",
                                suffix: "GB",
                              },
                            ].map(({ label, key, suffix }) => (
                              <div key={key}>
                                <label className="text-xs font-medium text-gray-500 block mb-1.5">
                                  {label}
                                </label>

                                <div className="flex items-center border border-gray-200 rounded-xl px-3 py-2 focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-500/10 transition-all">
                                  <input
                                    className="w-full text-sm outline-none"
                                    value={formData[key]}
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        [key]: e.target.value,
                                      })
                                    }
                                  />

                                  {suffix && (
                                    <span className="text-gray-400 text-xs font-medium ml-1">
                                      {suffix}
                                    </span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
            </div>

            {/* STATUS & VISIBILITY */}
         
<div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
  <h2 className="text-sm font-semibold text-gray-800 mb-5 flex items-center gap-2">
    <span className="w-5 h-5 bg-teal-500/10 rounded-md flex items-center justify-center">
      <FaEye className="text-teal-500 text-xs" />
    </span>
    Status & Visibility
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">

    {/* STATUS */}
    <div>
      <label className="text-xs font-medium text-gray-500 block mb-2">
        Status
      </label>
      <select
        className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-all"
        value={formData.status}
        onChange={(e) =>
          setFormData({ ...formData, status: e.target.value })
        }
      >
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
        <option value="draft">Draft</option>
      </select>
    </div>

    {/* POPULAR */}
    <div className="flex items-center justify-between border rounded-xl px-4 py-3">
      <div>
        <p className="text-sm font-medium text-gray-700">Popular Plan</p>
        <p className="text-xs text-gray-400">Highlight this plan</p>
      </div>

      <Toggle
        checked={formData.popularPlan}
        onChange={(value) =>
          setFormData({
            ...formData,
            popularPlan: value,
          })
        }
      />
    </div>

    {/* RECOMMENDED */}
    <div className="flex items-center justify-between border rounded-xl px-4 py-3">
      <div>
        <p className="text-sm font-medium text-gray-700">
          Recommended Plan
        </p>
        <p className="text-xs text-gray-400">
          Suggest to users
        </p>
      </div>

      <Toggle
        checked={formData.recommendedPlan}
        onChange={(value) =>
          setFormData({
            ...formData,
            recommendedPlan: value,
          })
        }
      />
    </div>
  </div>
</div>

            {/* FOOTER */}
            <div className="bg-white rounded-2xl px-4 sm:px-5 py-3.5 shadow-sm border border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex flex-col sm:flex-row gap-1 sm:gap-4 text-xs text-gray-400">
                <span className="flex items-center gap-1.5">
                  <FaClock className="text-gray-300" /> Last updated: {editPlan?.updatedAt 
  ? new Date(editPlan.updatedAt).toLocaleString() 
  : "Just now"}
                </span>
                <span className="flex items-center gap-1.5">
                  <FaUser className="text-gray-300" /> Updated by: Admin
                </span>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setShowAddPlan(false)}
                  className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors flex-1 sm:flex-none font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 text-sm text-white bg-teal-500 hover:bg-teal-600 rounded-xl flex items-center gap-1.5 flex-1 sm:flex-none justify-center font-medium transition-all"
                >
                  <FaFloppyDisk className="text-xs" /> Save Changes
                </button>
                <button
                  onClick={handlePublish}
                  className="px-4 py-2 text-sm text-white bg-orange-500 hover:bg-orange-600 rounded-xl flex items-center gap-1.5 flex-1 sm:flex-none justify-center font-medium transition-colors"
                >
                  <FaPaperPlane className="text-xs" /> Save & Publish
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - PLAN ANALYTICS */}
          <div className="w-full xl:w-64 2xl:w-72 flex-shrink-0">
            <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100 xl:sticky xl:top-20">
              <h2 className="text-sm font-semibold text-gray-800">
                Plan Analytics
              </h2>
              <p className="text-xs text-gray-400 mb-4">
                Real-time overview of this plan performance
              </p>
              <div className="grid grid-cols-2 xl:grid-cols-1 gap-3">
                {[
                  {
                    icon: <FaUsers className="text-teal-500 text-sm" />,
                    label: "Total Subscribers",
                    value: analytics?.totalSubscribers || 0,
                    change: "+12 this month",
                  },
                  {
                    icon: (
                      <FaIndianRupeeSign className="text-teal-500 text-sm" />
                    ),
                    label: "Revenue Generated",
                    value: `₹${analytics?.revenue || 0}`,
                    change: "+12 this month",
                  },
                  {
                    icon: <FaRotate className="text-teal-500 text-sm" />,
                    label: "Renewal Rate",
                    value: `${analytics?.renewalRate || 0}%`,
                    change: "6.2% this month",
                  },
                  {
                    icon: <FaUser className="text-teal-500 text-sm" />,
                    label: "Active users",
                    value: analytics?.activeUsers || 0,
                    change: "+9 this month",
                  },
                ].map(({ icon, label, value, change }) => (
                  <div key={label} className="bg-teal-50 rounded-xl p-3.5">
                    <div className="flex items-center gap-2 mb-1.5">
                      {icon}
                      <span className="text-xs text-gray-500">{label}</span>
                    </div>
                    <div className="text-xl font-bold text-gray-800">
                      {value}
                    </div>
                    <div className="text-xs text-teal-500 mt-1 font-medium">
                      {change}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── HELPER: Add Feature Form (used inside popup) ───
function AddFeatureForm({ onClose, onAdd }) {
  const [name, setName] = useState("");
  const [enabled, setEnabled] = useState(true);
  return (
    <>
      <div className="mb-4">
        <label className="block text-xs font-medium text-gray-500 mb-1.5">
          Feature Name
        </label>
        <input
          autoFocus
          className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-all"
          placeholder="e.g. Priority Support"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" &&
            name.trim() &&
            (onAdd({ name: name.trim(), enabled }), onClose())
          }
        />
      </div>
      <div className="mb-6 flex items-center justify-between bg-gray-50 rounded-xl p-3">
        <div>
          <p className="text-sm font-medium text-gray-700">Status</p>
          <p className="text-xs text-gray-400">
            {enabled ? "Feature is enabled" : "Feature is disabled"}
          </p>
        </div>
        <Toggle checked={enabled} onChange={setEnabled} />
      </div>
      <div className="flex gap-2">
        <button
          onClick={onClose}
          className="flex-1 px-4 py-2.5 text-sm text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 font-medium"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            if (name.trim()) {
              onAdd({ name: name.trim(), enabled });
              onClose();
            }
          }}
          className="flex-1 px-4 py-2.5 text-sm text-white bg-teal-500 rounded-xl hover:bg-teal-600 font-medium"
        >
          Add Feature
        </button>
      </div>
    </>
  );
}