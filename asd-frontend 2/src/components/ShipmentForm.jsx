
import React, { useState, useEffect,useRef } from "react";
import {
  FiChevronDown,
  FiFileText,
  FiClipboard,
  FiAward,
  FiCreditCard,
  FiShoppingCart,
  FiFolder,
  FiTruck,
  FiZap,
  FiUploadCloud,
  FiEye,
  FiSend,
  FiCheckCircle,
  FiExternalLink,
  FiCalendar,
} from "react-icons/fi";

import {
  createShipment,
  updateShipmentStep2,
  updateShipmentStep3,
  saveDraft,
  analyzeShipment,
  submitShipment,
  getHSCodes,
  uploadShipmentDocument
} from "../services/shipmentApi";
import { CloudCog } from "lucide-react";

function Label({ children, required = true }) {
  return (
    <label className="block text-xs font-semibold text-gray-700 mb-1">
      {children}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
  );
}

function Input({
  label,
  placeholder,
  value,
  name,
  onChange,
  required = true,
  disabled = false,
}) {
  return (
    <div>
      <Label required={required}>{label}</Label>
      <input
        type="text"
        name={name}
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
      />
    </div>
  );
}

function DateInput({ label, value, name, onChange, required = false }) {
  return (
    <div>
      <Label required={required}>{label}</Label>
      <div className="relative">
        <input
          type="date"
          name={name}
          value={value || ""}
          onChange={onChange}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <FiCalendar
          size={14}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        />
      </div>
    </div>
  );
}

function Select({
  label,
  placeholder,
  value,
  name,
  onChange,
  children,
  required = true,
}) {
  return (
    <div>
      <Label required={required}>{label}</Label>
      <div className="relative">
        <select
          name={name}
          value={value || ""}
          onChange={onChange}
          className="w-full appearance-none border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">{placeholder}</option>
          {children}
        </select>
        <FiChevronDown
          size={14}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
        />
      </div>
    </div>
  );
}

function RadioGroup({ label, name, value, onChange, required = true }) {
  return (
    <div>
      <Label required={required}>{label}</Label>
      <div className="flex items-center gap-4 mt-2">
        <label className="flex items-center gap-1.5 text-sm text-gray-700">
          <input
            type="radio"
            name={name}
            checked={value === true || value === "yes"}
            onChange={() => onChange(name, true)}
            className="accent-blue-600"
          />
          Yes
        </label>
        <label className="flex items-center gap-1.5 text-sm text-gray-700">
          <input
            type="radio"
            name={name}
            checked={value === false || value === "no"}
            onChange={() => onChange(name, false)}
            className="accent-blue-600"
          />
          No
        </label>
      </div>
    </div>
  );
}

function Grid2({ children }) {
  return <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>;
}

function SectionCard({ number, title, subtitle, children }) {
  return (
    <div className="bg-white grid grid-cols-1 border border-gray-200 rounded-xl p-2 shadow-sm">
      <div className="flex items-center gap-2">
        <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
          {number}
        </span>
        <h3 className="text-sm font-bold text-gray-900">{title}</h3>
      </div>
      {subtitle && (
        <p className="text-xs text-gray-500 whitespace-nowrap mt-1 ml-7">
          {subtitle}
        </p>
      )}
      <div className="mt-4 space-y-4">{children}</div>
    </div>
  );
}

const docTypes = [
  { label: "Commercial Invoice", icon: FiFileText, color: "text-blue-600 bg-blue-50" },
  { label: "Packing List", icon: FiClipboard, color: "text-orange-600 bg-orange-50" },
  { label: "MSDS", icon: FiAward, color: "text-purple-600 bg-purple-50" },
  { label: "COO", icon: FiAward, color: "text-green-600 bg-green-50" },
  { label: "IEC / GST", icon: FiCreditCard, color: "text-blue-600 bg-blue-50" },
  { label: "Purchase Order", icon: FiShoppingCart, color: "text-orange-600 bg-orange-50" },
  { label: "Product Certificate", icon: FiAward, color: "text-purple-600 bg-purple-50" },
  { label: "Other Documents", icon: FiFolder, color: "text-gray-500 bg-gray-100" },
];

function DocumentsUpload({
  uploadedDocs,
  handleDocumentUpload,
  fileInputRef
  }){
  return (
    <SectionCard number={4} title="Documents Upload" subtitle="Upload all relevant documents">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1">
        {docTypes.map((d) => {
          const Icon = d.icon;
          return (
            <div
              key={d.label}
              className="border border-gray-200 items-center rounded-lg p-1 text-center"
            >
              <div
                className={`w-8 h-8 rounded-full mx-auto flex items-center justify-center ${d.color}`}
              >
                <Icon size={14} />
              </div>
              <div>
                <p className="xl:text-[9px] text-xs font-semibold text-gray-700 mt-1.5">
                  {d.label}
                </p>
                <>
<input
  type="file"
  hidden
  ref={(el)=>fileInputRef.current[d.label]=el}
  onChange={(e)=>{
      if(e.target.files.length){
          handleDocumentUpload(
             d.label,
             e.target.files[0]
          );
      }
  }}
/>

<button
type="button"
onClick={()=>
fileInputRef.current[d.label].click()
}
className="xl:text-[9px] text-xs text-blue-600 font-medium mt-0.5"
>

{uploadedDocs[d.label]
? "Uploaded ✔"
: "Upload"}

</button>
</>
              </div>
            </div>
          );
        })}
      </div>
      <p className="text-[10px] text-gray-400">
        Accepted formats: PDF, JPG, PNG (Max size: 10MB per file)
      </p>
    </SectionCard>
  );
}

function AIOutputAnalysis({ analysis }) {
  const aiTopStats = [
    { label: "Suggested HS Code", value: analysis?.hsCode || "--", color: "bg-blue-50 text-blue-700" },
    { label: "Required Documents", value: analysis?.requiredDocs ? `${analysis.requiredDocs} Documents` : "--", color: "bg-green-50 text-green-700" },
    { label: "Freight Estimate", value: analysis?.freightEstimate ? `₹${analysis.freightEstimate}` : "--", color: "bg-orange-50 text-orange-700" },
    { label: "RoDTEP / Incentive", value: analysis?.incentive || "N/A", color: "bg-purple-50 text-purple-700" },
  ];

  const aiBottomStats = [
    { label: "Compliance Requirements", value: analysis?.complianceCount || "--", sub: "Requirements" },
    { label: "Risk Score", value: analysis?.riskScore || "--", sub: analysis?.riskSub || "", green: true },
    { label: "Estimated Timeline", value: analysis?.timeline || "--" },
    { label: "Recommended Action", value: analysis?.recommendation || "--", green: true },
  ];

  return (
    <SectionCard number={5} title="AI Output After Analysis">
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 xl:gap-1">
        {aiTopStats.map((s) => (
          <div key={s.label} className={`flex flex-col justify-around rounded-lg p-3 xl:p-1 ${s.color}`}>
            <p className="text-xs xl:text-[10px] font-medium">{s.label}</p>
            <p className="text-xs xl:text-[9px] font-bold mt-0.5">{s.value}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 xl:gap-1">
        {aiBottomStats.map((s) => (
          <div key={s.label} className="rounded-lg p-3 xl:p-1 bg-gray-50">
            <p className="text-sm xl:text-[10px] text-gray-500">{s.label}</p>
            <p
              className={`text-sm xl:text-[10px] font-bold mt-0.5 ${
                s.green ? "text-green-600" : "text-gray-900"
              }`}
            >
              {s.value}
            </p>
            {s.sub && <p className="text-xs xl:text-[10px] text-gray-400">{s.sub}</p>}
          </div>
        ))}
      </div>
      <button type="button" className="w-full flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-2 text-sm font-semibold text-blue-600">
        <FiExternalLink size={13} />
        View Full Analysis Report
      </button>
    </SectionCard>
  );
}

function BasicShipmentDetails({ formData, handleDirectChange, handleNestedChange, referenceNumber }) {
  return (
    <SectionCard number={1} title="Basic Shipment Details">
      <Grid2>
        <Select
          label="Shipment Type"
          placeholder="Select Type"
          name="shipmentType"
          value={formData.shipmentType}
          onChange={handleDirectChange}
        >
          <option value="Export">Export</option>
          <option value="Import">Import</option>
        </Select>
        <Select
          label="Shipment Mode"
          placeholder="Select Mode"
          name="shipmentMode"
          value={formData.shipmentMode}
          onChange={handleDirectChange}
        >
          <option value="Air">Air</option>
          <option value="Sea">Sea</option>
          <option value="Road">Road</option>
        </Select>
      </Grid2>
      <Grid2>
        <Select
          label="Shipment Purpose"
          placeholder="Select Purpose"
          name="shipmentPurpose"
          value={formData.shipmentPurpose}
          onChange={handleDirectChange}
        >
          <option value="Commercial">Commercial</option>
          <option value="Sample">Sample</option>
          <option value="Personal">Personal</option>
        </Select>
        <Input
          label="Customer / Company Name"
          name="companyName"
          value={formData.exporter.companyName}
          onChange={(e) => handleNestedChange("exporter", "companyName", e.target.value)}
        />
      </Grid2>
      <Input
        label="Contact Person"
        name="contactPerson"
        value={formData.exporter.contactPerson}
        placeholder="Enter contact person"
        onChange={(e) => handleNestedChange("exporter", "contactPerson", e.target.value)}
      />
      <Input
        label="Reference No"
        value={referenceNumber || "Auto Generated on Draft/Submit"}
        disabled={true}
        required={false}
      />
    </SectionCard>
  );
}

function OriginDestination({ formData, handleDirectChange, handleNestedChange }) {
  return (
    <SectionCard number={2} title="Origin & Destination">
      <Grid2>
        <Select
          label="Origin Country"
          placeholder="Select Country"
          value={formData.route.originCountry}
          onChange={(e) => handleNestedChange("route", "originCountry", e.target.value)}
        >
          <option value="India">India</option>
          <option value="China">China</option>
          <option value="USA">USA</option>
        </Select>
        <Input
          label="Origin City / Port / Airport"
          value={formData.route.originCity}
          onChange={(e) => handleNestedChange("route", "originCity", e.target.value)}
        />
      </Grid2>
      <Grid2>
        <Select
          label="Destination Country"
          placeholder="Select Country"
          value={formData.route.destinationCountry}
          onChange={(e) => handleNestedChange("route", "destinationCountry", e.target.value)}
        >
          <option value="India">India</option>
          <option value="Singapore">Singapore</option>
          <option value="Dubai">Dubai</option>
        </Select>
        <Input
          label="Destination City / Port / Airport"
          value={formData.route.destinationCity}
          onChange={(e) => handleNestedChange("route", "destinationCity", e.target.value)}
        />
      </Grid2>
      <Grid2>
        <Input
          label="Consignee / Buyer Name"
          value={formData.importer.companyName}
          onChange={(e) => handleNestedChange("importer", "companyName", e.target.value)}
        />
        <Input
          label="Consignee Address"
          value={formData.importer.address}
          onChange={(e) => handleNestedChange("importer", "address", e.target.value)}
        />
      </Grid2>
      <Grid2>
        <Select
          label="Incoterm"
          required={false}
          placeholder="Select Incoterm"
          value={formData.incoterm}
          onChange={(e) => handleDirectChange(e)}
          name="incoterm"
        >
          <option value="FOB">FOB</option>
          <option value="CIF">CIF</option>
          <option value="EXW">EXW</option>
        </Select>
        <DateInput
          label="Expected Shipment Date"
          name="etd"
          value={formData.etd}
          onChange={handleDirectChange}
        />
      </Grid2>
    </SectionCard>
  );
}

function InvoiceValue({ formData, handleDirectChange, handleRadioChange }) {
  return (
    <SectionCard number={3} title="Invoice & Value">
      <Grid2>
        <Input
          label="Invoice Value"
          placeholder="Enter invoice value"
          name="amount"
          value={formData.amount}
          onChange={handleDirectChange}
        />
        <Select
          label="Currency"
          placeholder="Select currency"
          name="currency"
          value={formData.currency}
          onChange={handleDirectChange}
        >
          <option value="USD">USD</option>
          <option value="INR">INR</option>
          <option value="EUR">EUR</option>
        </Select>
      </Grid2>
      <Select
        label="Payment Terms"
        placeholder="Select payment terms"
        name="paymentTerms"
        value={formData.paymentTerms}
        onChange={handleDirectChange}
      >
        <option value="Advance">Advance</option>
        <option value="LC">Letter of Credit (LC)</option>
        <option value="Net 30">Net 30</option>
      </Select>
      <RadioGroup
        label="Insurance Required"
        name="insuranceRequired"
        value={formData.insuranceRequired}
        onChange={handleRadioChange}
      />
      <RadioGroup
        label="Export Incentive"
        name="exportIncentive"
        value={formData.exportIncentive}
        onChange={handleRadioChange}
      />
    </SectionCard>
  );
}

function ProductDetails({
    formData,
    handleNestedChange,
    handleRadioChange,
    hsCodes
  }) {
  return (
    <SectionCard number={6} title="Product Details">
      <div className="grid grid-cols-2 gap-2">
        <Grid2>
          <Input
            label="Product Details"
            placeholder="Enter product name"
            value={formData.cargo.productName}
            onChange={(e) => handleNestedChange("cargo", "productName", e.target.value)}
          />
          <Input
            label="Product Description"
            placeholder="Enter product description"
            value={formData.cargo.productDescription}
            onChange={(e) => handleNestedChange("cargo", "productDescription", e.target.value)}
          />
        </Grid2>
        <Grid2>
        <Select
  label="HS Code"
  placeholder="Select HS Code"
  value={formData.cargo.hsCode}
  onChange={(e) => {
    console.log("Selected HS:", e.target.value);

    handleNestedChange(
      "cargo",
      "hsCode",
      e.target.value
    );
  }}
>
  {hsCodes.map((item) => (
    <option key={item._id} value={item._id}>
      {item.hsCode}
    </option>
  ))}
</Select>
          <Select
            label="Product Category"
            placeholder="Select category"
            value={formData.cargo.category}
            onChange={(e) => handleNestedChange("cargo", "category", e.target.value)}
          >
            <option value="Electronics">Electronics</option>
            <option value="Textiles">Textiles</option>
            <option value="General">General Cargo</option>
          </Select>
        </Grid2>
        <Grid2>
          <Input
            label="Quantity"
            placeholder="Enter quantity"
            value={formData.cargo.quantity}
            onChange={(e) => handleNestedChange("cargo", "quantity", e.target.value)}
          />
          <Select
            label="Unit"
            placeholder="Select unit"
            value={formData.cargo.unit}
            onChange={(e) => handleNestedChange("cargo", "unit", e.target.value)}
          >
            <option value="PCS">PCS</option>
            <option value="KG">KG</option>
            <option value="BOX">BOX</option>
          </Select>
        </Grid2>
        <Grid2>
          <RadioGroup
            label="Dangerous Goods (DG)"
            name="isDangerous"
            value={formData.cargo.isDangerous}
            onChange={(name, val) => handleNestedChange("cargo", name, val)}
          />
          <RadioGroup
            label="Temperature Controlled"
            name="isTemperatureControlled"
            value={formData.cargo.isTemperatureControlled}
            onChange={(name, val) => handleNestedChange("cargo", name, val)}
          />
        </Grid2>
        <Grid2>
          <Input
            label="Net Weight (Kg)"
            placeholder="Enter net weight"
            value={formData.cargo.weight}
            onChange={(e) => handleNestedChange("cargo", "weight", e.target.value)}
          />
          <Input
            label="Gross Weight (Kg)"
            placeholder="Enter gross weight"
            value={formData.cargo.grossWeight}
            onChange={(e) => handleNestedChange("cargo", "grossWeight", e.target.value)}
          />
        </Grid2>
        <div>
          <Label>Dimensions (L×W×H)</Label>
          <div className="flex items-center gap-2 mt-1">
            <input
              placeholder="Length"
              value={formData.cargo.dimensions?.length || ""}
              onChange={(e) =>
                handleNestedChange("cargo", "dimensions", {
                  ...formData.cargo.dimensions,
                  length: e.target.value,
                })
              }
              className="w-full border border-gray-200 rounded-lg px-1 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              placeholder="Width"
              value={formData.cargo.dimensions?.width || ""}
              onChange={(e) =>
                handleNestedChange("cargo", "dimensions", {
                  ...formData.cargo.dimensions,
                  width: e.target.value,
                })
              }
              className="w-full border border-gray-200 rounded-lg px-1 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              placeholder="Height"
              value={formData.cargo.dimensions?.height || ""}
              onChange={(e) =>
                handleNestedChange("cargo", "dimensions", {
                  ...formData.cargo.dimensions,
                  height: e.target.value,
                })
              }
              className="w-full border border-gray-200 rounded-lg px-1 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="relative shrink-0 w-20">
              <select
                value={formData.cargo.dimensions?.unit || "CM"}
                onChange={(e) =>
                  handleNestedChange("cargo", "dimensions", {
                    ...formData.cargo.dimensions,
                    unit: e.target.value,
                  })
                }
                className="w-full appearance-none border border-gray-200 rounded-lg px-2 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="CM">CM</option>
                <option value="INCH">INCH</option>
              </select>
              <FiChevronDown
                size={12}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
              />
            </div>
          </div>
        </div>

        <Grid2>
          <Input
            label="Volumetric Weight"
            placeholder="Auto Calculate"
            value={formData.cargo.volumetricWeight}
            onChange={(e) => handleNestedChange("cargo", "volumetricWeight", e.target.value)}
          />
          <Input
            label="No. of Packages"
            placeholder="Enter number"
            value={formData.cargo.packages}
            onChange={(e) => handleNestedChange("cargo", "packages", e.target.value)}
          />
        </Grid2>
        <Grid2>
          <Select
            label="Packing Type"
            placeholder="Select type"
            value={formData.cargo.packingType}
            onChange={(e) => handleNestedChange("cargo", "packingType", e.target.value)}
          >
            <option value="Carton">Carton</option>
            <option value="Pallet">Pallet</option>
            <option value="Wooden Crate">Wooden Crate</option>
          </Select>
        </Grid2>
        <Grid2>
          <RadioGroup
            label="Stackable"
            name="isStackable"
            value={formData.cargo.isStackable}
            onChange={(name, val) => handleNestedChange("cargo", name, val)}
          />
          <RadioGroup
            label="Fragile"
            name="isFragile"
            value={formData.cargo.isFragile}
            onChange={(name, val) => handleNestedChange("cargo", name, val)}
          />
        </Grid2>
        <Grid2>
          <RadioGroup
            label="Battery Included"
            name="hasBattery"
            value={formData.cargo.hasBattery}
            onChange={(name, val) => handleNestedChange("cargo", name, val)}
          />
          <RadioGroup
            label="Lithium Battery"
            name="isLithium"
            value={formData.cargo.isLithium}
            onChange={(name, val) => handleNestedChange("cargo", name, val)}
          />
        </Grid2>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-2">
        <Input
          label="UN Number (if DG)"
          placeholder="Enter UN number"
          required={false}
          value={formData.cargo.unNumber}
          onChange={(e) => handleNestedChange("cargo", "unNumber", e.target.value)}
        />
        <Input
          label="Package Marks & Numbers"
          placeholder="Enter marks & numbers"
          required={false}
          value={formData.cargo.packageMarks}
          onChange={(e) => handleNestedChange("cargo", "packageMarks", e.target.value)}
        />
      </div>
    </SectionCard>
  );
}

function DimensionsCard({ calculatedMetrics }) {
  const dimensionRows = [
    { label: "Volume (CBM)", value: calculatedMetrics?.cbm ? `${calculatedMetrics.cbm} CBM` : "--" },
    { label: "Volumetric Weight (Air)", value: calculatedMetrics?.volumetricWeight ? `${calculatedMetrics.volumetricWeight} Kg` : "--" },
    { label: "CBM (Sea)", value: calculatedMetrics?.cbm ? `${calculatedMetrics.cbm} CBM` : "--" },
    { label: "Chargeable Weight", value: calculatedMetrics?.chargeableWeight ? `${calculatedMetrics.chargeableWeight} Kg` : "--" },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
      <p className="text-xs text-gray-400 mb-3">Based on dimensions & packages</p>
      <div className="space-y-2.5">
        {dimensionRows.map((r) => (
          <div key={r.label} className="flex items-center justify-between">
            <span className="text-xs text-gray-500">{r.label}</span>
            <span className="text-xs font-bold text-gray-900">{r.value}</span>
          </div>
        ))}
        <div className="flex items-center justify-between border-t border-gray-100 pt-2.5">
          <span className="text-xs text-gray-500">Estimated Freight Cost</span>
          <span className="text-xs font-bold text-teal-600">
            {calculatedMetrics?.estimatedFreight ? `₹ ${calculatedMetrics.estimatedFreight}` : "--"}
          </span>
        </div>
      </div>
    </div>
  );
}

function StatusFlowCard({ currentStatus = "Draft" }) {
  const statusFlow = [
    { label: "Draft", sub: "Saved as draft", icon: FiFileText, color: currentStatus === "Draft" ? "text-blue-600 bg-blue-50" : "text-gray-500 bg-gray-100" },
    { label: "AI Analyzed", sub: "Pending analysis", icon: FiZap, color: currentStatus === "AI Analyzed" ? "text-blue-600 bg-blue-50" : "text-gray-500 bg-gray-100" },
    { label: "Submitted", sub: "Pending submission", icon: FiUploadCloud, color: currentStatus === "Submitted" ? "text-blue-600 bg-blue-50" : "text-gray-500 bg-gray-100" },
    { label: "Admin Review", sub: "Pending review", icon: FiEye, color: "text-gray-500 bg-gray-100" },
    { label: "Quotation Sent", sub: "Pending", icon: FiSend, color: "text-gray-500 bg-gray-100" },
    { label: "Accepted", sub: "Pending", icon: FiCheckCircle, color: "text-gray-500 bg-gray-100" },
    { label: "Shipment Active", sub: "Pending", icon: FiTruck, color: "text-gray-500 bg-gray-100" },
    { label: "Completed", sub: "Completed", icon: FiCheckCircle, color: "text-gray-500 bg-gray-100" },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
      <h3 className="text-sm font-bold text-gray-900 mb-3">Status Flow</h3>
      <div className="space-y-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-1">
        {statusFlow.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="flex items-center gap-2.5">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${s.color}`}
              >
                <Icon size={13} />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-900">{s.label}</p>
                <p className="text-xs text-gray-400">{s.sub}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const quickTips = [
  "Fill all mandatory fields marked with *",
  "Upload clear and valid documents",
  "Use Analyze Shipment to get AI insights",
  "Submit to admin for review and quotation",
];

function QuickTipsCard() {
  return (
    <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
      <h3 className="text-sm font-bold text-gray-900 mb-2">Quick Tips</h3>
      <ul className="space-y-1.5">
        {quickTips.map((t) => (
          <li key={t} className="text-xs text-gray-600 flex gap-1.5">
            <span>•</span>
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Header({
  setActiveTab,
  setShipment,
  handleSaveDraft,
  handleAnalyze,
  handleSubmit,
  loading,
  currentTab
}) {
      // console.log("he", currentTab)
  return (
    <div>
      <p className="text-xs text-gray-500">
        Dashboard <span className="mx-1 text-gray-300">›</span> Shipment Operations{" "}
        <span className="mx-1 text-gray-300">›</span> My Shipments{" "}
        <span className="mx-1 text-gray-300">›</span>
        <span className="text-gray-700 font-medium">New Shipment</span>
      </p>
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mt-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            New Shipment Form
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Enter shipment details to generate HS code, freight estimate,
            document checklist and risk score.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 shrink-0">
          <button
            type="button"
            onClick={handleSaveDraft}
            disabled={loading}
            className="border border-gray-300 text-gray-700 text-sm font-semibold px-4 py-2 rounded-lg disabled:opacity-50"
          >
            Save Draft
          </button>
          <button
            type="button"
            onClick={handleAnalyze}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg disabled:opacity-50"
          >
            Analyze Shipment
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded-lg disabled:opacity-50"
          >
            Submit to Admin
          </button>
          <button
            type="button"
            onClick={() => {
           setShipment("");
              setActiveTab(currentTab);
            }}
            className="border border-red-300 text-red-600 text-sm font-semibold px-4 py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="border-t border-gray-200 mt-6 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
      <p>2025 ASC CargoMatrix. All rights reserved</p>
      <div className="flex items-center gap-4">
        <span>Privacy Policy</span>
        <span>Terms of Uses</span>
        <span>Support</span>
      </div>
    </div>
  );
}

export default function Shipment({ setActiveTab, setShipment, currentTab }) {
  const [shipmentId, setShipmentId] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");
  const [currentStatus, setCurrentStatus] = useState("Draft");
  const [loading, setLoading] = useState(false);
  const [hsCodes, setHsCodes] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [uploadedDocs, setUploadedDocs] = useState({});
  const fileInputRef = useRef({});

 console.log("dd", currentTab)
  const fetchHsCodes = async () => {
    try {
      const res = await getHSCodes();
      setHsCodes(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };


  useEffect(() => {
    fetchHsCodes();
  }, []);

  const [formData, setFormData] = useState({
    // Step 1
    shipmentType: "",
    shipmentMode: "",
    shipmentPurpose: "",
    customerType: "Individual",
    exporter: {
      companyName: "",
      contactPerson: "",
    },

    // Step 2
    route: {
      originCountry: "",
      originCity: "",
      destinationCountry: "",
      destinationCity: "",
    },
    importer: {
      companyName: "",
      address: "",
    },
    incoterm: "",
    etd: "",
    eta: "",

    // Step 3
    cargo: {
      productName: "",
      productDescription: "",
      hsCode: "",
      category: "",
      quantity: "",
      unit: "",
      weight: "",
      grossWeight: "",
      volumetricWeight: "",
      packages: "",
      packingType: "",
      unNumber: "",
      packageMarks: "",
      isDangerous: false,
      isTemperatureControlled: false,
      isStackable: false,
      isFragile: false,
      hasBattery: false,
      isLithium: false,
      dimensions: {
        length: "",
        width: "",
        height: "",
        unit: "CM",
      },
    },
    amount: "",
    currency: "",
    paymentTerms: "",
    insuranceRequired: false,
    exportIncentive: false,
    additionalInformation: {
        packagingType: "",
        packages: 0,
        marksNumbers: "",
        dangerousGoods: false,
        specialHandling: false,
        temperatureControl: false,
      },
  });

  const handleDirectChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNestedChange = (parentKey, childKey, value) => {
    setFormData((prev) => ({
      ...prev,
      [parentKey]: {
        ...prev[parentKey],
        [childKey]: value,
      },
    }));
  };

  const handleRadioChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveAllSteps = async () => {
    let currentId = shipmentId;

    if (!currentId) {
      const step1Res = await createShipment({
        shipmentType: formData.shipmentType,
        shipmentMode: formData.shipmentMode,
        shipmentPurpose: formData.shipmentPurpose,
        customerType: formData.customerType,
        exporter: formData.exporter,
      });

      const resData = step1Res.data?.data || step1Res.data;
      currentId = resData._id;
      setShipmentId(currentId);
      if (resData.referenceNumber) {
        setReferenceNumber(resData.referenceNumber);
      }
    }

    await updateShipmentStep2(currentId, {
      route: formData.route,
      importer: formData.importer,
      eta: formData.eta,
      etd: formData.etd,
      incoterm: formData.incoterm,
    });

    await updateShipmentStep3(currentId, {
      cargo: formData.cargo,
      amount: formData.amount,
      paymentTerms: formData.paymentTerms,
      insuranceRequired: formData.insuranceRequired,
      currency: formData.currency,
      additionalInformation: formData.additionalInformation,
    });

    return currentId;
  };

  const handleSaveDraft = async () => {
    setLoading(true);
    try {
      const id = await saveAllSteps();
      await saveDraft(id);
      setCurrentStatus("Draft");
      alert("Draft saved successfully!");
    } catch (err) {
      console.error("Save Draft Error:", err);
      alert(err.response?.data?.message || "Failed to save draft.");
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const id = await saveAllSteps();
      const res = await analyzeShipment(id);
      const data = res.data?.data || res.data;
      setAnalysis(data);
      setCurrentStatus("AI Analyzed");
      alert("Shipment analyzed successfully!");
    } catch (err) {
      console.error("Analyze Error:", err);
      alert(err.response?.data?.message || "Failed to analyze shipment.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const id = await saveAllSteps();
      await submitShipment(id);
      setCurrentStatus("Submitted");
      alert("Shipment submitted to admin successfully!");
    } catch (err) {
      console.error("Submit Error:", err);
      alert(err.response?.data?.message || "Failed to submit shipment.");
    } finally {
      setLoading(false);
    }
  };

  const handleDocumentUpload = async (documentName, file) => {
    try {
  
      const id = await saveAllSteps();
  
      const form = new FormData();
  
      form.append("shipmentId", id);
      form.append("documentType", documentName);
      form.append("required", true);
      form.append("file", file);
  
      const res = await uploadShipmentDocument(form);
  
      setUploadedDocs((prev) => ({
        ...prev,
        [documentName]: res.data.data
      }));
  
      alert("Uploaded Successfully");
  
    } catch (err) {
  
      console.log(err);
  
      alert(
        err.response?.data?.message ||
        "Upload Failed"
      );
  
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-6 ">
      <div className="max-w-[1400px] mx-auto">
        <Header
          setActiveTab={setActiveTab}
          setShipment={setShipment}
          handleSaveDraft={handleSaveDraft}
          handleAnalyze={handleAnalyze}
          handleSubmit={handleSubmit}
          loading={loading}
          currentTab={currentTab}
        />

        <div className="mt-6 grid grid-cols-1 xl:grid-cols-12 gap-2">
          <div className="xl:col-span-3 flex flex-col gap-2">
            <BasicShipmentDetails
              formData={formData}
              handleDirectChange={handleDirectChange}
              handleNestedChange={handleNestedChange}
              referenceNumber={referenceNumber}
            />
           <DocumentsUpload
uploadedDocs={uploadedDocs}
handleDocumentUpload={handleDocumentUpload}
fileInputRef={fileInputRef}
/>
            <AIOutputAnalysis analysis={analysis} />
          </div>

          <div className="xl:col-span-6 flex flex-col gap-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <OriginDestination
                formData={formData}
                handleDirectChange={handleDirectChange}
                handleNestedChange={handleNestedChange}
              />
              <InvoiceValue
                formData={formData}
                handleDirectChange={handleDirectChange}
                handleRadioChange={handleRadioChange}
              />
            </div>
            <ProductDetails
  formData={formData}
  handleNestedChange={handleNestedChange}
  handleRadioChange={handleRadioChange}
  hsCodes={hsCodes}
/>
          </div>

          <div className="xl:col-span-3 flex flex-col gap-2">
            <DimensionsCard calculatedMetrics={analysis?.metrics} />
            <StatusFlowCard currentStatus={currentStatus} />
            <QuickTipsCard />
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
