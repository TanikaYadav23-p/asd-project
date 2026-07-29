import React from "react";

import plane from "../../assets/Images/webp/plane.webp"
import blueship from "../../assets/Images/webp/blueship.webp"
import orangeship from "../../assets/Images/webp/orangeship.webp"
import NeedHelp from "../../components/core/NeedHelp";


const Icon = ({ d, d2, className = "w-4 h-4", viewBox = "0 0 24 24", fill = "none", stroke = "currentColor" }) => (
  <svg className={className} fill={fill} stroke={stroke} viewBox={viewBox}>
    <path d={d} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    {d2 && <path d={d2} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />}
  </svg>
);

// ─── Sub-components ──────────────────────────────────────────────────────────

function Breadcrumb() {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center text-sm text-gray-500 mb-4">
      <span>Dashboard</span>
      <span className="mx-2">›</span>
      <span>Freight Calculator</span>
      <span className="mx-2">›</span>
      <span className="text-gray-900 font-medium">Result</span>
    </nav>
  );
}

function HeaderActions() {
  return (
    <div className="flex flex-wrap gap-2">
      <button className="px-4 py-2 bg-white border border-gray-200 rounded-md text-xs font-bold flex items-center gap-2 hover:bg-gray-50">
        <Icon d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        New Query
      </button>
      <button className="px-4 py-2 bg-white border border-gray-200 rounded-md text-xs font-bold flex items-center gap-2 hover:bg-gray-50">
        <Icon d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        Save Report
      </button>
      <button className="px-4 py-2 bg-white border border-gray-200 rounded-md text-xs font-bold flex items-center gap-2 hover:bg-gray-50">
        <Icon d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        Download Report (PDF)
      </button>
      <button className="px-4 py-2 bg-teal-600 text-white rounded-md text-xs font-bold hover:bg-teal-700">
        Create Shipment from this Result
      </button>
    </div>
  );
}

function AiBanner() {
  return (
    <div className="bg-teal-50 border border-teal-200 p-3 rounded-md flex items-center gap-3 mb-6">
      <Icon d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" className="w-5 h-5 text-teal-600" />
      <p className="text-xs text-teal-700 font-medium">
        This result is AI-generated based on the data sources and assumptions listed below. Please review before making any trade decisions.
      </p>
    </div>
  );
}

function SearchSummary() {
  const fields = [
    { label: "Origin", value: "Tirupur, India (IN)" },
    { label: "Destination", value: "Dubai, UAE (AE)" },
    { label: "Shipment Type", value: "Air Freight" },
    { label: "Commodity", value: "T-shirt, 100% Cotton" },
    { label: "Weight / Volume", value: "500kg" },
      { label: "Incotern", value: "FOB" },
  ];

  return (
    <section className="bg-white border border-gray-200 rounded-lg p-5">
      <div className="flex items-start justify-between">
        <div className="flex gap-4 items-center ">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Icon d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-bold text-sm">Your Search</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-y-3 gap-x-4 mt-4 text-sm">
              {fields.map(({ label, value }) => (
                <div key={label}>
                  <p className="text-gray-500 uppercase text-[9px] font-bold tracking-wider mb-1">{label}</p>
                  <p className="font-bold text-xs">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 pt-4 border-t border-gray-200 flex flex-col md:flex-row md:items-center justify-between text-xs text-gray-500 gap-4">
        <div className="flex gap-4 text-[#94A3B8] text-xs">
          <span className="text-xs">Search ID: <span className="font-mono">INC-2025-04-24-000123</span></span>
          <span className="text-xs">• 24 Apr 2025, 09:25 AM</span>
          <span className="text-xs">• User: Arjun Soni</span>
        </div>
        <button className="flex items-center gap-1 border border-gray-200 px-2 py-1 rounded hover:bg-gray-50">
          <Icon d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" className="w-3 h-3" />
          Copy Query
        </button>
      </div>
    </section>
  );
}

function FreightCard({ badge, badgeClass, outerBorderClass, iconBg, iconColor, iconD, title, subtitle, subtitleColor, price, priceColor, departure, arrival, viewBtnClass, viewBorderClass, viewHoverClass }) {
  return (
    <div className={`border-2 rounded-xl p-3 py-4 relative ${outerBorderClass}`}>
      <span className={`absolute top-1 right-1   text-[10px] font-bold px-2 py-1 rounded-full uppercase ${badgeClass}`}>{badge}</span>
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center border ${iconBg}`}>
          <img src={iconD} />
        </div>
        <div>
          <h4 className="font-bold text-sm">{title}</h4>
          <p className={`text-[10px] font-medium ${subtitleColor}`}>{subtitle}</p>
        </div>
      </div>
      <div className={`text-xl font-bold mb-4 ${priceColor}`}>{price}</div>
      <div className="grid grid-cols-3 gap-2 text-[10px] text-gray-500 mb-4">
        {[["Transit Time", "3 - 5 Days"], ["Est. Departure", departure], ["Est. Arrival", arrival]].map(([lbl, val]) => (
          <div key={lbl}>
            <p className="uppercase text-[9px] font-bold mb-1">{lbl}</p>
            <p className="text-gray-900 text-[9px] font-semibold">{val}</p>
          </div>
        ))}
      </div>
      <button className={`w-full text-xs font-bold mb-3 border py-2 rounded-md ${viewBtnClass} ${viewBorderClass} ${viewHoverClass}`}>View Details</button>
      <button className="w-full bg-teal-600 text-white text-xs font-bold py-2.5 rounded-md hover:bg-teal-700">
        Select &amp; Create Shipment
      </button>
    </div>
  );
}

function FreightOptions() {
  const cards = [
    {
      badge: "Best Value",
      badgeClass: "bg-green-100 text-green-700",
      outerBorderClass: "border-teal-200",
      iconBg: "bg-green-50 border-green-100",
      iconColor: "text-green-600",
      iconD: plane,
      title: "Air Freight",
      subtitle: "Fastest Delivery",
      subtitleColor: "text-green-600",
      price: "₹24,860",
      priceColor: "text-green-600",
      departure: "26 Apr 2025",
      arrival: "30 Apr 2025",
      viewBtnClass: "text-teal-600",
      viewBorderClass: "border-teal-200",
      viewHoverClass: "hover:bg-teal-50",
    },
    {
      badge: "Best Balance",
      badgeClass: "bg-blue-100 text-blue-700",
      outerBorderClass: "border-gray-200",
      iconBg: "bg-blue-50 border-blue-100",
      iconColor: "text-blue-600",
      iconD: blueship,
      title: "Sea Freight (LCL)",
      subtitle: "Cost Effective",
      subtitleColor: "text-blue-600",
      price: "₹18,450",
      priceColor: "text-blue-700",
      departure: "26 Apr 2025",
      arrival: "30 Apr 2025",
      viewBtnClass: "text-blue-700",
      viewBorderClass: "border-blue-200",
      viewHoverClass: "hover:bg-blue-50",
    },
    {
      badge: "Lowest Cost",
      badgeClass: "bg-orange-100 text-orange-700",
      outerBorderClass: "border-gray-200",
      iconBg: "bg-orange-50 border-orange-100",
      iconColor: "text-orange-600",
      iconD: orangeship,
      title: "Sea Freight (FCL)",
      subtitle: "Lowest Cost",
      subtitleColor: "text-orange-600",
      price: "₹15,230",
      priceColor: "text-orange-700",
      departure: "26 Apr 2025",
      arrival: "30 Apr 2025",
      viewBtnClass: "text-orange-700",
      viewBorderClass: "border-orange-200",
      viewHoverClass: "hover:bg-orange-50",
    },
  ];

  return (
    <section className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button className="px-6 py-4 text-xs font-semibold text-teal-600 border-b-2 border-teal-600">Freight Options</button>
        <button className="px-6 py-4 text-xs font-semibold text-gray-500 hover:text-gray-900">Cost Breakdown</button>
        <button className="px-6 py-4 text-xs font-semibold text-gray-500 hover:text-gray-900">Transit Time Comparison</button>
        <div className="ml-auto flex items-center pr-4">
          <span className="text-xs text-gray-500 mr-2">Currency:</span>
          <select className="text-xs font-bold border-gray-200 rounded px-2 py-1">
            <option>INR</option>
            <option>USD</option>
          </select>
        </div>
      </div>

      {/* Cards */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {cards.map((card) => (
          <FreightCard key={card.badge} {...card} />
        ))}
      </div>

      {/* Footer note */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center gap-2 text-[10px] text-gray-500">
        <Icon d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" className="w-4 h-4" />
        Rates are subject to change based on actual booking date, availability, and market conditions.
      </div>
    </section>
  );
}

function CostBreakdown() {
  const items = [
    { label: "Base Freight", amount: "₹18,600" },
    { label: "Fuel Surcharge", amount: "₹3,250" },
    { label: "Security Charge", amount: "₹350" },
    { label: "Airport Handling", amount: "₹1,200" },
    { label: "Documentation Fee", amount: "₹450" },
    { label: "Others", amount: "₹1,010" },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5">
      <h4 className="font-bold text-sm mb-4">Cost Breakdown (Air Freight)</h4>
      <div className="space-y-3">
        <div className="flex justify-between text-xs">
          <span className="text-gray-500">Charge Type</span>
          <span className="text-gray-500">Amount (INR)</span>
        </div>
        {items.map(({ label, amount }, i) => (
          <div key={label} className={`flex justify-between text-xs font-medium ${i === 0 ? "border-t border-gray-100 pt-3" : ""}`}>
            <span className="text-[#475569] font-medium">{label}</span>
            <span className="text-[#1E293B] font-semibold">{amount}</span>
          </div>
        ))}
        <div className="flex justify-between text-sm font-bold text-teal-600 border-t-2 border-teal-100 pt-3 mt-4">
          <span className="text-[#059669] text-xs">Total Estimated Cost</span>
          <span className="text-[#059669] text-xs">₹24,860</span>
        </div>
      </div>
    </div>
  );
}

function KeyAssumptions() {
  const items = [
    "Commodity: T-shirts, 100% cotton",
    "Total Weight: 500 kg (Chargeable Weight)",
    "Incoterm: FOB",
    "Rates are excluding GST",
    "Fuel surcharge is based on current rate",
    "Transit time includes customs clearance",
    "Rates are indicative and may change",
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5">
      <h4 className="font-bold text-sm mb-4">Key Assumptions</h4>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-[10px] font-medium">
            <Icon d="M5 13l4 4L19 7" className="w-3 h-3 text-green-500 mt-0.5 shrink-0" />
            <span className="text-[#475569]">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DataSources() {
  const sources = [
    { label: "Airline Tariff Database", d: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" },
    { label: "Shipping Lines Tariff", d: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" },
    { label: "Freightos Marketplace", d: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
    { label: "IATA Rate Sheets", d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
    { label: "Port & Airport Charges", d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z", d2: "M15 11a3 3 0 11-6 0 3 3 0 016 0z" },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5">
      <h4 className="font-bold text-sm mb-4">Data Sources</h4>
      <div className="space-y-4">
        {sources.map(({ label, d, d2 }) => (
          <div key={label} className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
              <Icon d={d} d2={d2} className="w-4 h-4 text-gray-500" />
            </div>
              <span className="text-xs  text-[#475569] font-semibold">{label}</span>
          </div>
        ))}
        <div className="mt-4">
          <a href="#" className="text-[#059669] text-xs font-bold hover:underline">View All Sources</a>
        </div>
      </div>
    </div>
  );
}

function ResultSummary() {
  const rows = [
    { iconD: "M13 10V3L4 14h7v7l9-11h-7z", iconColor: "text-blue-500", label: "Best Mode", value: "Air Freight" },
    { iconD: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z", iconColor: "text-blue-500", label: "Recommended Route", value: "Tirupur → Dubai" },
    { iconD: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", iconColor: "text-blue-500", label: "Estimated Transit Time", value: "3 - 5 Days" },
    { iconD: "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z", iconColor: "text-orange-500", label: "Total Landed Cost (EST.)", value: "₹1,24,680" },
    { iconD: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z", iconColor: "text-green-500", label: "Cost Per Kg", value: "₹8,420" },
    { iconD: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", iconColor: "text-teal-500", label: "Surcharge & Fees", value: "₹8,420" },
    { iconD: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z", iconColor: "text-blue-500", label: "Rate Validity", value: "₹8,420" },
  ];

  return (
    <section className="bg-white border border-gray-200 rounded-lg p-5">
      <h3 className="font-bold text-sm mb-6">Result Summary</h3>
      <div className="space-y-4">
        {rows.map(({ iconD, iconColor, label, value }) => (
          <div key={label} className="flex items-center gap-3">
            <div className={iconColor}>
              <Icon d={iconD} className="w-5 h-5" />
            </div>
            <div className="flex-1 flex justify-between">
              <span className="text-xs font-medium text-gray-500">{label}</span>
              <span className="text-xs font-bold text-right">{value}</span>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full bg-teal-600 text-white font-bold py-3  text-xs rounded-lg mt-6 hover:bg-teal-700">
        Create Shipment from this Result
      </button>
    </section>
  );
}

function ReportInformation() {
  const rows = [
    { label: "Report ID", value: "INC-2025-04-24-000123" },
    { label: "Generated On", value: "24 Apr 2025, 09:25 AM" },
    { label: "Generated By", value: "Arjun Soni" },
    { label: "Plan", value: "Pro Plan" },
    { label: "AI Model Version", value: "v2.1.0" },
  ];

  return (
    <section className="bg-white border border-gray-200 rounded-lg p-5">
      <h3 className="font-bold text-sm mb-4">Report Information</h3>
      <div className="space-y-3">
        {rows.map(({ label, value }) => (
          <div key={label} className="flex justify-between text-xs">
            <span className="text-gray-500">{label}</span>
            <span className="font-medium">{value}</span>
          </div>
        ))}
      </div>
      <button className="w-full border border-teal-600 text-teal-600 font-bold  text-xs
      py-2.5 rounded-lg mt-6 flex items-center justify-center gap-2 hover:bg-teal-50">
        <Icon d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        Download Report (PDF)
      </button>
    </section>
  );
}

function SaveShare() {
  return (
    <section className="bg-white border border-gray-200 rounded-lg p-5">
      <h3 className="font-bold text-sm mb-1">Save &amp; Share</h3>
      <p className="text-[10px] text-gray-500 mb-4">Save this report for future reference or share with your team.</p>
      <div className="grid grid-cols-2 gap-3">
        <button className="flex items-center justify-center gap-2 border border-gray-200 py-2 rounded-lg text-xs font-bold hover:bg-gray-50">
          <Icon d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          Save to Reports
        </button>
        <button className="flex items-center justify-center gap-2 border border-gray-200 py-2 rounded-lg text-xs font-bold hover:bg-gray-50">
          <Icon d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          Share Report
        </button>
      </div>
    </section>
  );
}

function AuditLog() {
  const events = [
    "Search Submitted by Arjun Soni",
    "Data Validated",
    "Incentives Matched",
    "Result Generated",
  ];

  return (
    <section className="bg-white border border-gray-200 rounded-lg p-5">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-sm">
          Audit Log <span className="text-xs font-normal text-gray-500">(This Search)</span>
        </h3>
        <a href="#" className="text-teal-600 text-[10px] font-bold">View All</a>
      </div>
      <div className="space-y-3">
        {events.map((event) => (
          <div key={event} className="flex items-start gap-3">
            <div className="w-2 h-2 mt-1.5 rounded-full bg-green-500 shrink-0" />
            <div className="flex-1 flex justify-between text-[10px]">
              <span className="font-medium text-gray-900">{event}</span>
              <span className="text-gray-500 uppercase">09:25 AM</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function PageFooter() {
  return (
    <footer className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 ">
      <div className=" bg-white border px-4 py-4 rounded-lg border-gray-200">
        <div>
          <h4 className="font-bold text-sm mb-2">Disclaimer</h4>
          <p className="text-xs text-gray-500 leading-relaxed max-w-lg">
            Freight rates are indicative and subject to change without prior notice. Please verify with shipping lines or freight forwarders before booking.
          </p>
          <a href="#" className="text-teal-600 text-xs font-bold mt-2 inline-block">Read Full Disclaimer</a>
        </div> 
      </div>

       <div className="bg-white flex rounded-xl border border-gray-200 px-4">
          <NeedHelp mobile={"+91 22 1234 5678"} para={" Our trade experts are here to help you."} heading={"Need help ?"}  />     
        </div>

    </footer>
  );
}


export default function FreightCalculatorResult() {

  return (
    <div className="bg-gray-50 font-sans text-gray-900 antialiased overflow-y-auto pt-10 ">
      <div className="max-w-[1440px] mx-auto p-4 md:p-6 lg:p-8">

        {/* Header */}
        <header className="mb-6">
          <Breadcrumb />
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Freight Calculator</h1>
              <p className="text-gray-500 text-xs ">Get accurate freight estimates and compare the best shipping options.</p>
            </div>
            <HeaderActions />
          </div>
        </header>

        {/* AI Banner */}
        <AiBanner />

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left Column */}
          <main className="lg:col-span-8 space-y-6">
            <SearchSummary />
            <FreightOptions />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <CostBreakdown />
              <KeyAssumptions />
              <DataSources />
            </div>
          </main>

          {/* Right Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            <ResultSummary />
            <ReportInformation />
            <SaveShare />
            <AuditLog />
          </aside>

        </div>

        {/* Footer */}
        <PageFooter />
         
      </div>
    </div>
  );
}