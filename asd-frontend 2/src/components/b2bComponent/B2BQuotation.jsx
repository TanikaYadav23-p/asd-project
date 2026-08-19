import React, { useState } from "react";
import {
  ArrowLeft,
  FileText,
  CheckCircle2,
  XCircle,
  Clock,
  Truck,
  Building2,
  User,
  Mail,
  Phone,
  IndianRupee,
  Send,
  MessageSquare,
} from "lucide-react";

const HEADING = "text-[#07156B]";

export default function B2BQuotation({
  shipment,
  quotation,
  onClose,
  onAccept,
  onReject,
}) {

    console.log("B2BQuotation RENDERED");
    console.log("Received shipment:", shipment);
  
  const [showRejectBox, setShowRejectBox] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [loading, setLoading] = useState(false);

  // Temporary quotation data
  // Backend integration ke time API se replace karenge
  const quotationData = quotation || {
    quotationNumber: "QT-2026-001",
    status: "Shared",
    validTill: "30 Aug 2026",

    charges: {
      freight: 25000,
      customs: 5000,
      documentation: 2500,
      insurance: 3000,
      other: 1500,
    },

    currency: "INR",
    notes:
      "This quotation is subject to final shipment details and applicable government taxes.",
  };

  const charges = quotationData.charges || {};

  const freight = Number(charges.freight || 0);
  const customs = Number(charges.customs || 0);
  const documentation = Number(charges.documentation || 0);
  const insurance = Number(charges.insurance || 0);
  const other = Number(charges.other || 0);

  const totalAmount =
    freight + customs + documentation + insurance + other;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: quotationData.currency || "INR",
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const handleAccept = async () => {
    try {
      setLoading(true);

      if (onAccept) {
        await onAccept();
      } else {
        console.log("Quotation Accepted", quotationData);
      }
    } catch (error) {
      console.error("Accept quotation error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    if (!rejectReason.trim()) {
      alert("Please enter rejection reason");
      return;
    }

    try {
      setLoading(true);

      if (onReject) {
        await onReject(rejectReason);
      } else {
        console.log("Quotation Rejected:", {
          quotation: quotationData,
          reason: rejectReason,
        });
      }
    } catch (error) {
      console.error("Reject quotation error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-[#F8FAFC] overflow-y-auto p-3 sm:p-5 md:p-6">
      <div className="max-w-[1100px] mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition"
            >
              <ArrowLeft size={19} />
            </button>

            <div>
              <h1 className={`text-xl sm:text-2xl font-bold ${HEADING}`}>
                Shipment Quotation
              </h1>

              <p className="text-xs text-slate-400 mt-1">
                Review quotation details and confirm your response.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                quotationData.status === "Accepted"
                  ? "bg-green-100 text-green-600"
                  : quotationData.status === "Rejected"
                  ? "bg-red-100 text-red-600"
                  : "bg-blue-100 text-blue-600"
              }`}
            >
              {quotationData.status || "Shared"}
            </span>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-5">
          
          {/* Left Side */}
          <div className="space-y-5">

            {/* Quotation Header */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                
                <div className="flex gap-3">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <FileText size={22} />
                  </div>

                  <div>
                    <p className="text-[11px] text-slate-400 font-medium">
                      Quotation Number
                    </p>

                    <h2 className={`text-lg font-bold ${HEADING}`}>
                      {quotationData.quotationNumber || "-"}
                    </h2>
                  </div>
                </div>

                <div className="sm:text-right">
                  <p className="text-[11px] text-slate-400">
                    Valid Till
                  </p>

                  <p className="text-sm font-bold text-orange-500 mt-1">
                    {quotationData.validTill || "-"}
                  </p>
                </div>
              </div>
            </div>

            {/* Shipment Details */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Truck size={17} className="text-blue-600" />

                <h3 className={`font-bold text-sm ${HEADING}`}>
                  Shipment Details
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">
                    Shipment Reference
                  </p>

                  <p className={`text-sm font-bold mt-1 ${HEADING}`}>
                    {shipment?.referenceNumber ||
                      shipment?.sbNumber ||
                      "-"}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">
                    Transport Mode
                  </p>

                  <p className="text-sm font-semibold text-slate-700 mt-1">
                    {shipment?.route?.mode || "-"}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">
                    Origin
                  </p>

                  <p className="text-sm font-semibold text-slate-700 mt-1">
                    {shipment?.route?.originCity || "-"}
                    {shipment?.route?.originCountry &&
                      `, ${shipment.route.originCountry}`}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">
                    Destination
                  </p>

                  <p className="text-sm font-semibold text-slate-700 mt-1">
                    {shipment?.route?.destinationCity || "-"}
                    {shipment?.route?.destinationCountry &&
                      `, ${shipment.route.destinationCountry}`}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">
                    Commodity
                  </p>

                  <p className="text-sm font-semibold text-slate-700 mt-1">
                    {shipment?.cargo?.productName || "-"}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">
                    HS Code
                  </p>

                  <p className="text-sm font-semibold text-slate-700 mt-1">
                    {shipment?.cargo?.hsCode?.hsCode || "-"}
                  </p>
                </div>
              </div>
            </div>

            {/* Charges */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <IndianRupee size={17} className="text-blue-600" />

                <h3 className={`font-bold text-sm ${HEADING}`}>
                  Quotation Charges
                </h3>
              </div>

              <div className="divide-y divide-slate-100">
                
                <ChargeRow
                  title="Freight Charges"
                  amount={formatCurrency(freight)}
                />

                <ChargeRow
                  title="Customs Charges"
                  amount={formatCurrency(customs)}
                />

                <ChargeRow
                  title="Documentation Charges"
                  amount={formatCurrency(documentation)}
                />

                <ChargeRow
                  title="Insurance Charges"
                  amount={formatCurrency(insurance)}
                />

                <ChargeRow
                  title="Other Charges"
                  amount={formatCurrency(other)}
                />
              </div>

              {/* Total */}
              <div className="mt-4 pt-4 border-t-2 border-slate-100 flex justify-between items-center">
                <div>
                  <p className="text-xs text-slate-400">
                    Total Quotation Amount
                  </p>

                  <p className={`text-xl font-bold mt-1 ${HEADING}`}>
                    {formatCurrency(totalAmount)}
                  </p>
                </div>

                <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <IndianRupee size={21} />
                </div>
              </div>
            </div>

            {/* Notes */}
            {quotationData.notes && (
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
                <div className="flex gap-3">
                  <MessageSquare
                    size={17}
                    className="text-blue-600 shrink-0 mt-0.5"
                  />

                  <div>
                    <p className="text-xs font-bold text-blue-700">
                      Additional Notes
                    </p>

                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {quotationData.notes}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Side */}
          <div className="space-y-5">

            {/* Exporter */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Building2 size={17} className="text-blue-600" />

                <h3 className={`font-bold text-sm ${HEADING}`}>
                  Exporter Details
                </h3>
              </div>

              <ContactDetails
                company={shipment?.exporter?.companyName}
                person={shipment?.exporter?.contactPerson}
                email={shipment?.exporter?.email}
                mobile={shipment?.exporter?.mobile}
              />
            </div>

            {/* Action Card */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
              
              <div className="flex items-center gap-2 mb-2">
                <Clock size={17} className="text-orange-500" />

                <h3 className={`font-bold text-sm ${HEADING}`}>
                  Your Decision
                </h3>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed mb-5">
                Please review the quotation carefully before accepting or
                rejecting it.
              </p>

              {!showRejectBox ? (
                <div className="space-y-3">
                  
                  <button
                    onClick={handleAccept}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white py-3 rounded-xl text-sm font-bold transition"
                  >
                    <CheckCircle2 size={17} />

                    {loading
                      ? "Processing..."
                      : "Accept Quotation"}
                  </button>

                  <button
                    onClick={() => setShowRejectBox(true)}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 py-3 rounded-xl text-sm font-bold transition"
                  >
                    <XCircle size={17} />

                    Reject Quotation
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  
                  <textarea
                    value={rejectReason}
                    onChange={(e) =>
                      setRejectReason(e.target.value)
                    }
                    placeholder="Please enter rejection reason..."
                    rows={4}
                    className="w-full border border-slate-200 rounded-xl p-3 text-xs outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300 resize-none"
                  />

                  <button
                    onClick={handleReject}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white py-3 rounded-xl text-sm font-bold transition"
                  >
                    <Send size={16} />

                    {loading
                      ? "Submitting..."
                      : "Submit Rejection"}
                  </button>

                  <button
                    onClick={() => setShowRejectBox(false)}
                    disabled={loading}
                    className="w-full text-xs font-semibold text-slate-400 hover:text-slate-600 py-2"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>

            {/* Help */}
            <div className="bg-slate-100 rounded-2xl p-4">
              <p className="text-xs font-bold text-slate-700">
                Need changes?
              </p>

              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                You can reject the quotation and mention the reason or required
                changes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChargeRow({ title, amount }) {
  return (
    <div className="flex items-center justify-between py-3">
      <span className="text-xs text-slate-500">
        {title}
      </span>

      <span className="text-sm font-semibold text-slate-700">
        {amount}
      </span>
    </div>
  );
}

function ContactDetails({
  company,
  person,
  email,
  mobile,
}) {
  return (
    <div className="space-y-3">
      
      <div>
        <p className="text-sm font-bold text-slate-700">
          {company || "-"}
        </p>
      </div>

      {person && (
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <User size={13} />
          {person}
        </div>
      )}

      {email && (
        <div className="flex items-center gap-2 text-xs text-slate-500 break-all">
          <Mail size={13} />
          {email}
        </div>
      )}

      {mobile && (
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Phone size={13} />
          {mobile}
        </div>
      )}
    </div>
  );
}