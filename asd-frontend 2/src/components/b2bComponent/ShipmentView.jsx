import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Edit3,
  Package,
  MapPin,
  FileText,
  IndianRupee,
  Truck,
  User,
  CalendarDays,
  ShieldCheck,
  Box,
  AlertCircle,
  ChevronDown,
} from "lucide-react";
import ShipmentForm from "../ShipmentForm";
import { getShipmentDetails } from "../../api/ShipmentApi";

// Try several fixed values first (in priority order), skipping empty ones
const pick = (...candidates) => {
  for (const c of candidates) {
    if (c !== undefined && c !== null && c !== "") return c;
  }
  return undefined;
};

// Last-resort: recursively search the whole object for a key name (case-insensitive)
// and return the first primitive value found. Guards against circular refs.
const deepFind = (obj, keyNamesLower, seen = new Set()) => {
  if (!obj || typeof obj !== "object" || seen.has(obj)) return undefined;
  seen.add(obj);

  for (const k of Object.keys(obj)) {
    if (keyNamesLower.includes(k.toLowerCase())) {
      const v = obj[k];
      if (v !== null && v !== undefined && v !== "" && typeof v !== "object") {
        return v;
      }
    }
  }
  for (const k of Object.keys(obj)) {
    const v = obj[k];
    if (v && typeof v === "object") {
      const found = deepFind(v, keyNamesLower, seen);
      if (found !== undefined) return found;
    }
  }
  return undefined;
};

const deepFindArray = (obj, keyNamesLower, seen = new Set()) => {
  if (!obj || typeof obj !== "object" || seen.has(obj)) return undefined;
  seen.add(obj);

  for (const k of Object.keys(obj)) {
    if (keyNamesLower.includes(k.toLowerCase()) && Array.isArray(obj[k])) {
      return obj[k];
    }
  }
  for (const k of Object.keys(obj)) {
    const v = obj[k];
    if (v && typeof v === "object" && !Array.isArray(v)) {
      const found = deepFindArray(v, keyNamesLower, seen);
      if (found !== undefined) return found;
    }
  }
  return undefined;
};

const ViewShipment = ({ shipmentId, onBack, onEdit }) => {
  const [shipment, setShipment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showRaw, setShowRaw] = useState(false);

  useEffect(() => {
    if (shipmentId) {
      fetchShipmentDetails();
    } else {
      setLoading(false);
      setError("No shipment selected.");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shipmentId]);

  const fetchShipmentDetails = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getShipmentDetails(shipmentId);

      console.log("Shipment Details API (full):", response.data);

      setShipment(response.data?.data || response.data);
    } catch (err) {
      console.error("Shipment details error:", err);
      setError(
        err.response?.data?.message ||
          "Unable to load shipment details."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    if (onEdit) onEdit(shipment);
  };

  const handleBack = () => {
    if (onBack) onBack();
  };

  const formatValue = (value) => {
    if (value === null || value === undefined || value === "") return "-";
    if (typeof value === "boolean") return value ? "Yes" : "No";
    if (typeof value === "object") return JSON.stringify(value);
    return value;
  };

  const formatDate = (value) => {
    if (!value) return "-";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const DetailItem = ({ label, value }) => (
    <div className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-3">
      <p className="text-[11px] font-medium text-slate-400 mb-1">{label}</p>
      <p className="text-sm font-semibold text-slate-800 break-words">
        {formatValue(value)}
      </p>
    </div>
  );

  const Overlay = ({ children }) => (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#F8FAFC]">
      {children}
    </div>
  );

  if (loading) {
    return (
      <Overlay>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-9 h-9 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm text-slate-500">Loading shipment details...</p>
          </div>
        </div>
      </Overlay>
    );
  }

  if (error || !shipment) {
    return (
      <Overlay>
        <div className="min-h-screen p-6">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 mb-6"
          >
            <ArrowLeft size={18} />
            Back
          </button>
          <div className="bg-white border border-red-100 rounded-2xl p-8 text-center">
            <AlertCircle size={40} className="text-red-500 mx-auto mb-3" />
            <h2 className="text-lg font-bold text-slate-800">Unable to load shipment</h2>
            <p className="text-sm text-slate-500 mt-2">
              {error || "Shipment details not found."}
            </p>
          </div>
        </div>
      </Overlay>
    );
  }

  // ---- Locate the likely containers regardless of API's exact nesting ----
  const info = shipment.shipmentInfo || {};
  const overview = shipment.overview || {};
  const header = shipment.header || {};

  const route = info.route || overview.route || shipment.route || {};
  const cargo = info.cargo || overview.cargo || shipment.cargo || {};
  const exporter = info.exporter || overview.exporter || shipment.exporter || {};
  const importer = info.importer || overview.importer || shipment.importer || {};

  const val = (fromSpots, deepKeys) =>
    pick(...fromSpots, deepFind(shipment, deepKeys.map((k) => k.toLowerCase())));

  const referenceNo = val(
    [header.referenceNumber, info.referenceNumber, overview.referenceNumber, shipment.referenceNumber, header.sbNumber, info.sbNumber, shipment.sbNumber],
    ["referenceNumber", "referenceNo", "sbNumber", "blNo", "shipmentNo"]
  );

  const shipmentStatus = val(
    [header.status, header.shipmentStatus, info.status, shipment.status, shipment.shipmentStatus],
    ["status", "shipmentStatus"]
  ) || "Draft";

  const shipmentMode = val(
    [header.mode, route.mode, info.shipmentMode, shipment.shipmentMode],
    ["mode", "shipmentMode"]
  );

  const shipmentValue = val(
    [header.value, cargo.value, info.amount, shipment.amount, shipment.invoiceValue],
    ["value", "amount", "invoiceValue"]
  );

  const expectedDate = val(
    [header.etd, info.etd, shipment.etd, shipment.expectedShipmentDate],
    ["etd", "expectedShipmentDate", "expectedDate"]
  );

  const documents = pick(
    shipment.documents,
    info.documents,
    overview.documents,
    deepFindArray(shipment, ["documents"])
  ) || [];

  return (
    <Overlay>
      <div className="min-h-screen p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">

          {/* HEADER */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div>
              <button
                onClick={handleBack}
                className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600 mb-3 transition"
              >
                <ArrowLeft size={17} />
                Back to Shipments
              </button>

              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">
                  Shipment Details
                </h1>
                <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold">
                  {shipmentStatus}
                </span>
              </div>

              <p className="text-sm text-slate-500 mt-1">
                Complete shipment information and operational details
              </p>
            </div>

            <button
              onClick={handleEdit}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-sm transition"
            >
              <Edit3 size={17} />
              Edit Shipment
            </button>
          </div>

          {/* SUMMARY */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Package size={19} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-[11px] text-slate-400">Shipment / B.L. No.</p>
                  <p className="text-sm font-bold text-slate-800">{formatValue(referenceNo)}</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                  <Truck size={19} className="text-indigo-600" />
                </div>
                <div>
                  <p className="text-[11px] text-slate-400">Shipment Mode</p>
                  <p className="text-sm font-bold text-slate-800">{formatValue(shipmentMode)}</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <IndianRupee size={19} className="text-emerald-600" />
                </div>
                <div>
                  <p className="text-[11px] text-slate-400">Shipment Value</p>
                  <p className="text-sm font-bold text-slate-800">
                    ₹{Number(cargo.value || 0).toLocaleString("en-IN")}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
                  <CalendarDays size={19} className="text-orange-500" />
                </div>
                <div>
                  <p className="text-[11px] text-slate-400">Expected Shipment Date</p>
                  <p className="text-sm font-bold text-slate-800">{formatDate(expectedDate)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* BASIC + ROUTE */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
            <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center">
                  <Package size={17} />
                </div>
                <h2 className="text-base font-bold text-slate-800">Basic Shipment Details</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <DetailItem label="Shipment Type" value={val([info.shipmentType, shipment.shipmentType], ["shipmentType"])} />
                <DetailItem label="Shipment Mode" value={shipmentMode} />
                <DetailItem label="Shipment Purpose" value={val([info.shipmentPurpose, shipment.shipmentPurpose], ["shipmentPurpose"])} />
                <DetailItem label="Customer / Company Name" value={val([exporter.companyName, shipment.customerName], ["companyName", "customerName"])} />
                <DetailItem label="Contact Person" value={val([exporter.contactPerson, shipment.contactPerson], ["contactPerson"])} />
                <DetailItem label="Reference No." value={referenceNo} />
              </div>
            </div>

            <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                  <MapPin size={17} />
                </div>
                <h2 className="text-base font-bold text-slate-800">Origin & Destination</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <DetailItem label="Origin Country" value={val([route.originCountry, route.origin], ["originCountry", "origin"])} />
                <DetailItem label="Origin City / Port / Airport" value={val([route.originCity], ["originCity"])} />
                <DetailItem label="Destination Country" value={val([route.destinationCountry, route.destination], ["destinationCountry", "destination"])} />
                <DetailItem label="Destination City / Port / Airport" value={val([route.destinationCity], ["destinationCity"])} />
                <DetailItem label="Consignee / Buyer Name" value={val([importer.companyName], ["consigneeName", "buyerName"])} />
                <DetailItem label="Consignee Address" value={val([importer.address], ["consigneeAddress"])} />
                <DetailItem label="Incoterm" value={val([info.incoterm, shipment.incoterm], ["incoterm"])} />
                <DetailItem label="Payment Terms" value={val([info.paymentTerms, shipment.paymentTerms], ["paymentTerms"])} />
              </div>
            </div>
          </div>

          {/* INVOICE + PRODUCT */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
            <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                  <FileText size={17} />
                </div>
                <h2 className="text-base font-bold text-slate-800">Invoice & Value</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <DetailItem label="Invoice Value" value={shipmentValue} />
                <DetailItem label="Currency" value={val([info.currency, shipment.currency], ["currency"])} />
                <DetailItem label="Payment Terms" value={val([info.paymentTerms, shipment.paymentTerms], ["paymentTerms"])} />
                <DetailItem label="Insurance Required" value={val([info.insuranceRequired, shipment.insuranceRequired], ["insuranceRequired"])} />
                <DetailItem label="Export Incentive" value={val([info.exportIncentive, shipment.exportIncentive], ["exportIncentive"])} />
              </div>
            </div>

            <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-full bg-purple-600 text-white flex items-center justify-center">
                  <Box size={17} />
                </div>
                <h2 className="text-base font-bold text-slate-800">Product Details</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <DetailItem label="Product Name" value={val([cargo.productName], ["productName"])} />
                <DetailItem label="Product Description" value={val([cargo.productDescription], ["productDescription"])} />
                <DetailItem label="HS Code" value={val([cargo.hsCode?.hsCode, cargo.hsCode], ["hsCode"])} />
                <DetailItem label="Product Category" value={val([cargo.category], ["category", "productCategory"])} />
                <DetailItem label="Quantity" value={val([cargo.quantity], ["quantity"])} />
                <DetailItem label="Unit" value={val([cargo.unit], ["unit"])} />
                <DetailItem label="Net Weight (Kg)" value={val([cargo.weight], ["weight", "netWeight"])} />
                <DetailItem label="Gross Weight (Kg)" value={val([cargo.grossWeight], ["grossWeight"])} />
              </div>
            </div>
          </div>

          {/* SHIPPING / PACKAGE */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm mb-5">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-full bg-orange-500 text-white flex items-center justify-center">
                <Truck size={17} />
              </div>
              <h2 className="text-base font-bold text-slate-800">Shipping & Package Details</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <DetailItem
                label="Dimensions"
                value={
                  cargo.dimensions
                    ? `${cargo.dimensions.length || "-"} × ${cargo.dimensions.width || "-"} × ${cargo.dimensions.height || "-"} ${cargo.dimensions.unit || ""}`
                    : "-"
                }
              />
              <DetailItem label="Volumetric Weight" value={val([cargo.volumetricWeight], ["volumetricWeight"])} />
              <DetailItem label="No. of Packages" value={val([cargo.packages], ["packages", "numberOfPackages"])} />
              <DetailItem label="Packing Type" value={val([cargo.packingType], ["packingType"])} />
              <DetailItem label="Stackable" value={val([cargo.isStackable], ["isStackable", "stackable"])} />
              <DetailItem label="Fragile" value={val([cargo.isFragile], ["isFragile", "fragile"])} />
              <DetailItem label="Battery Included" value={val([cargo.hasBattery], ["hasBattery", "batteryIncluded"])} />
              <DetailItem label="Lithium Battery" value={val([cargo.isLithium], ["isLithium", "lithiumBattery"])} />
              <DetailItem label="Dangerous Goods" value={val([cargo.isDangerous], ["isDangerous", "dangerousGoods"])} />
              <DetailItem label="Temperature Controlled" value={val([cargo.isTemperatureControlled], ["isTemperatureControlled", "temperatureControlled"])} />
              <DetailItem label="UN Number" value={val([cargo.unNumber], ["unNumber"])} />
              <DetailItem label="Package Marks & Numbers" value={val([cargo.packageMarks], ["packageMarks"])} />
            </div>
          </div>

          {/* DOCUMENTS */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm mb-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-full bg-cyan-600 text-white flex items-center justify-center">
                <FileText size={17} />
              </div>
              <h2 className="text-base font-bold text-slate-800">Documents</h2>
            </div>

            {Array.isArray(documents) && documents.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {documents.map((doc, index) => (
                  <div key={index} className="border border-slate-100 bg-slate-50 rounded-xl p-4">
                    <p className="text-sm font-semibold text-slate-700">
                      {doc.name || doc.documentType || doc.type || `Document ${index + 1}`}
                    </p>
                    {(doc.url || doc.fileUrl) && (
                      <a
                        href={doc.url || doc.fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-semibold text-blue-600 hover:underline mt-2 inline-block"
                      >
                        View Document
                      </a>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-slate-400 bg-slate-50 border border-dashed border-slate-200 rounded-xl p-5 text-center">
                No documents uploaded.
              </div>
            )}
          </div>

          {/* RAW DATA DEBUG (toggle) */}
          <div className="mb-6">
            <button
              onClick={() => setShowRaw((s) => !s)}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-slate-600"
            >
              <ChevronDown size={14} className={`transition-transform ${showRaw ? "rotate-180" : ""}`} />
              {showRaw ? "Hide raw API data" : "Show raw API data (for debugging)"}
            </button>
            {showRaw && (
              <pre className="mt-2 bg-slate-900 text-slate-100 text-[10px] rounded-xl p-4 overflow-auto max-h-96">
                {JSON.stringify(shipment, null, 2)}
              </pre>
            )}
          </div>

          {/* FOOTER ACTIONS */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <button
              onClick={handleBack}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-600 hover:bg-slate-50"
            >
              ← Back to Shipments
            </button>
            <button
              onClick={handleEdit}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold"
            >
              <Edit3 size={17} />
              Edit Shipment
            </button>
          </div>
        </div>
      </div>
    </Overlay>
  );
};

export default ViewShipment;