
import { useState } from "react";
import { BsCheckLg, BsXLg } from "react-icons/bs";
import { FaPlane, FaBriefcase, FaBuilding, FaCrown } from "react-icons/fa";
import { MdArrowForward } from "react-icons/md";

import plane from '../../assets/Images/webp/aeroplane.webp';
import building from '../../assets/Images/webp/building.webp';
import king from '../../assets/Images/webp/king.webp';
import shotcase from '../../assets/Images/webp/shotcase.webp';


const plans = [
  {
    id: "basic",
    name: "Basic",
    desc: "For individuals & small businesses",
    price: "₹1,999",
    period: "/ month",
    billed: "Billed annually",
    btnLabel: "Choose Basic",
    tagline: "Essential tools to get started with global trade.",
    popular: false,
    icon: plane,
    iconBg: "bg-blue-50",
    features: [
      { label: "AI Queries", value: "50 / month" },
      { label: "Shipments", value: "50 / month" },
      { label: "HS Code Lookup", value: "100 / month" },
      { label: "Document Storage", value: "1 GB" },
      { label: "Email Support", value: "Available" },
    ],
  },
  {
    id: "pro",
    name: "Pro",
    desc: "For individuals & small businesses",
    price: "₹4,999",
    period: "/ month",
    billed: "Billed annually",
    btnLabel: "Choose Pro",
    tagline: "Advanced features for efficient trade operations.",
    popular: true,
    icon: shotcase,
    iconBg: "bg-[#E8FBF7]",
    features: [
      { label: "AI Queries", value: "50 / month" },
      { label: "Shipments", value: "50 / month" },
      { label: "HS Code Lookup", value: "100 / month" },
      { label: "Document Storage", value: "1 GB" },
      { label: "Email Support", value: "Available" },
    ],
  },
  {
    id: "business",
    name: "Business",
    desc: "For individuals & small businesses",
    price: "₹9,999",
    period: "/ month",
    billed: "Billed annually",
    btnLabel: "Choose Business",
    tagline: "Comprehensive insights and analytics.",
    popular: false,
    icon: building,
    iconBg: "bg-[#F2EAFF]",
    features: [
      { label: "AI Queries", value: "50 / month" },
      { label: "Shipments", value: "50 / month" },
      { label: "HS Code Lookup", value: "100 / month" },
      { label: "Document Storage", value: "1 GB" },
      { label: "Email Support", value: "Available" },
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    desc: "For individuals & small businesses",
    price: "Custom",
    period: "",
    billed: "Billed annually",
    btnLabel: "Choose Enterprise",
    tagline: "Tailored solutions for enterprise needs.",
    popular: false,
    icon: king,
    iconBg: "bg-[#FFF1DF]",
    features: [
      { label: "AI Queries", value: "50 / month" },
      { label: "Shipments", value: "50 / month" },
      { label: "HS Code Lookup", value: "100 / month" },
      { label: "Document Storage", value: "1 GB" },
      { label: "Email Support", value: "Available" },
    ],
  },
];

const compareRows = [
  { feature: "AI Queries", basic: "50 / month", pro: "200 / month", business: "Unlimited", enterprise: "Unlimited", type: "text" },
  { feature: "Shipments", basic: "50 / month", pro: "200 / month", business: "Unlimited", enterprise: "Unlimited", type: "text" },
  { feature: "Documents Storage", basic: "1 GB", pro: "10 GB", business: "50 GB", enterprise: "Custom", type: "text" },
  { feature: "Download Reports", basic: false, pro: true, business: true, enterprise: true, type: "bool" },
  { feature: "API Access", basic: false, pro: false, business: true, enterprise: true, type: "bool" },
  { feature: "Support", basic: "Email", pro: "Priority Email", business: "Priority", enterprise: "Dedicated", type: "text" },
];

export default function UpgradePlan() {
  const [yearly, setYearly] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 font-sans pt-10">
      <div className="max-w-[1400px] mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8">

        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Upgrade Plan</h1>
            <p className="text-sm text-gray-500 mt-1">Choose the perfect plan to grow your trade intelligence and operations.</p>
          </div>
          <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-2.5 shadow-sm self-start">
            <span className={`text-sm font-semibold ${!yearly ? "text-[#07194D]" : "text-gray-400"}`}>Monthly</span>
            {/* <button
              onClick={() => setYearly(v => !v)}
              className={`relative w-11 h-6 rounded-full transition-colors ${yearly ? "bg-teal-500" : "bg-gray-300"}`}
            >
              <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${yearly ? "translate-x-5" : "translate-x-0.5"}`} />
            </button> */}
            <button
            onClick={() => setYearly(v => !v)}
            className={`
              relative inline-flex h-5 w-11 items-center rounded-full
              transition-all duration-300
              ${yearly ? "bg-teal-500" : "bg-gray-300"}
              focus:outline-none 
            `}
          >
            <span
              className={`
                inline-block h-4 w-4 rounded-full bg-white shadow-md
                transform transition-transform duration-300 ease-in-out
                ${yearly ? "translate-x-6" : "translate-x-1"}
              `}
            />
          </button>
            <span className={`text-sm font-semibold ${yearly ? "text-[#07194D]" : "text-gray-400"}`}>Yearly</span>
            <span className="text-xs font-bold text-teal-600 whitespace-nowrap">Save up to 20%</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {plans.map((plan) => (
            <div key={plan.id} className={`relative bg-white rounded-2xl border shadow-sm flex flex-col ${plan.popular ? "border-teal-400 shadow-teal-100 shadow-md" : "border-gray-200"}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <span className="bg-teal-500 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow">MOST POPULAR</span>
                </div>
              )}
              <div className="p-5 sm:p-6 flex flex-col flex-1">
                <div className={`w-14 h-14 rounded-full ${plan.iconBg} flex items-center justify-center mb-4`}>

                 <img src={plan.icon} size={28} className="text-blue-400" />
                 
                </div>
                <h2 className="text-base font-bold text-gray-900 mb-1">{plan.name}</h2>
                <p className="text-sm text-gray-500 mb-4">{plan.desc}</p>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-xl font-extrabold text-gray-900">{plan.price}</span>
                  {plan.period && <span className="text-sm text-gray-500 font-medium">{plan.period}</span>}
                </div>
                <p className="text-xs text-gray-400 mb-4">{plan.billed}</p>
                <button className="w-full border-2 border-teal-500 text-[#07194D] text-sm font-bold rounded-xl py-2.5 hover:bg-teal-50 transition-colors mb-4">
                  {plan.btnLabel}
                </button>
                <p className="text-xs text-gray-500 mb-4">{plan.tagline}</p>
                <div className="space-y-2.5 mt-auto">
                  {plan.features.map((f, i) => (
                    <div key={i} className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <BsCheckLg size={13} className="text-teal-500 flex-shrink-0" />
                        <span className="text-xs text-gray-600">{f.label}</span>
                      </div>
                      <span className="text-xs font-bold text-gray-900 whitespace-nowrap">{f.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm mb-6 overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">Compare Plans</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-sm font-bold text-gray-900 px-5 py-4 w-2/5">Features</th>
                  {["Basic", "Pro", "Business", "Enterprise"].map(h => (
                    <th key={h} className="text-center text-sm font-bold text-gray-900 px-4 py-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row, i) => (
                  <tr key={i} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4 text-sm font-bold text-[#07194D]">{row.feature}</td>
                    {[row.basic, row.pro, row.business, row.enterprise].map((val, j) => (
                      <td key={j} className="px-4 py-4 text-center">
                        {row.type === "bool" ? (
                          val
                            ? <BsCheckLg size={16} className="text-teal-500 mx-auto" />
                            : <BsXLg size={14} className="text-red-400 mx-auto" />
                        ) : (
                          <span className="text-sm text-gray-700">{val}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-teal-50 border border-teal-200 rounded-2xl px-5 sm:px-8 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base   font-bold text-[#087D73]">30-Day Money Back Guarantee</h3>
            <p className="text-xs text-gray-500 mt-0.5">Not satisfied? Get a full refund within 30 days of your purchase.</p>
          </div>
          <button className="flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:underline whitespace-nowrap">
            View Refund Policy <MdArrowForward size={16} />
          </button>
        </div>

      </div>
    </div>
  );
}