import { useState } from "react";
import {
  X,
  UserCheck,
  Building2,
  Mail,
  Smartphone,
  Clock,
  IdCard,
  Landmark,
  MapPin,
  CheckCircle2,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Maximize2,
  Download,
  CheckCheck,
} from "lucide-react";
import RejectKYCModal from "./RejectKycVerification";

const defaultApplicant = {
  name: "Arjun Soni",
  userId: "CRG-USR-10482",
  tag: "B2B USER",
  company: "example.pvt.ltd",
  email: "arjunsoni@gmail.com",
  mobile: "+91 98XXXXXX21",
  submittedOn: "19 Aug 2026, 03:42 PM",
};

const defaultDocuments = [
  {
    id: "identity",
    icon: IdCard,
    color: "text-blue-600 bg-blue-50",
    label: "Identity Proof",
    title: "Aadhaar Card",
    subtitle: "Aadhaar Front & Back",
    status: "Uploaded Successfully",
    previewUrl: "",
  },
  {
    id: "business",
    icon: Landmark,
    color: "text-indigo-600 bg-indigo-50",
    label: "Business/Tax ID",
    title: "PAN Card",
    subtitle: "PAN Card",
    status: "Uploaded Successfully",
    previewUrl: "",
  },
  {
    id: "address",
    icon: MapPin,
    color: "text-teal-600 bg-teal-50",
    label: "Address Proof",
    title: "Utility Bill",
    subtitle: "Electricity Bill",
    status: "Uploaded Successfully",
    previewUrl: "",
  },
];

export default function KYCVerificationModal({
  applicant = defaultApplicant,
  documents = defaultDocuments,
  onClose,
  onApprove = async () => {},
}) {
  const [activeDocId, setActiveDocId] = useState(documents[0]?.id);
  const [submitting, setSubmitting] = useState(false);
  const [rejectKyc, setRejectKyc] = useState(false)
  const activeDoc = documents.find((doc) => doc.id === activeDocId) || documents[0];

  const handleApprove = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const data = [{id:1, title: "aaa", status:"success"}]
     const payload = {
      userId: "1",
      status: "approved",
      documents: data.map((doc) => ({
        id: doc.id,
        title: doc.title,
        status: doc.status,
      })),
    };

    try {
      const response = await fetch("/api/kyc/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      onApprove(data);
    } catch (err) {
      console.error("Approve KYC failed", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-500/40 flex items-start sm:items-center justify-center p-2 sm:p-6 overflow-y-auto z-50">
      <form
        onSubmit={handleApprove}
        className="bg-white w-full max-w-6xl rounded-2xl sm:rounded-3xl shadow-xl my-4 sm:my-0 max-h-[80vh] overflow-y-auto"
      >
        <div className="flex items-start justify-between gap-3 p-4 sm:p-6 border-b border-gray-100">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <UserCheck size={22} />
            </div>
            <div>
              <h2 className="text-base sm:text-xl font-bold text-gray-900">KYC Verification</h2>
              <p className="text-xs text-gray-500 mt-1 max-w-md">
                Review user identity documents and verification details to approve or reject.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <span className="hidden xs:inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 text-xs font-medium px-3 py-1.5 rounded-full border border-amber-100">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              Pending Review
            </span>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-5">
          <div className="border border-gray-200 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 text-sm">Applicant Details</h3>
              <span className="bg-indigo-100 text-indigo-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                {applicant.tag}
              </span>
            </div>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-600 font-semibold flex items-center justify-center">
                {applicant.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">{applicant.name}</p>
                <p className="text-xs text-gray-500">{applicant.userId}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Building2 size={16} className="text-gray-400 mt-0.5" />
                <div>
                  <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wide">
                    Company
                  </p>
                  <p className="text-xs font-medium text-gray-900">{applicant.company}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={16} className="text-gray-400 mt-0.5" />
                <div>
                  <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wide">
                    Email
                  </p>
                  <p className="text-xs font-medium text-gray-900">{applicant.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Smartphone size={16} className="text-gray-400 mt-0.5" />
                <div>
                  <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wide">
                    Mobile
                  </p>
                  <p className="text-xs font-medium text-gray-900">{applicant.mobile}</p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 mt-5 pt-4 flex items-start gap-3">
              <Clock size={16} className="text-gray-400 mt-0.5" />
              <div>
                <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wide">
                  Submitted On
                </p>
                <p className="text-xs font-medium text-gray-900">{applicant.submittedOn}</p>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-2xl p-5">
            <h3 className="font-semibold text-gray-900 text-sm mb-4">Required Documents Checklist</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {documents.map((doc) => {
                const Icon = doc.icon;
                return (
                  <div key={doc.id} className="border border-gray-200 rounded-xl p-4 min-h-[180px] flex flex-col">
                    <div className="flex items-center justify-between mb-8">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${doc.color}`}>
                        <Icon size={18} />
                      </div>
                      <CheckCircle2 size={18} className="text-emerald-500" />
                    </div>
                    <div className="mt-auto">
                      <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wide">
                        {doc.label}
                      </p>
                      <p className="text-xs font-semibold text-gray-900 mt-0.5">{doc.title}</p>
                      <p className="text-xs font-medium text-emerald-600 mt-1">{doc.status}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 text-sm">Document Review</h3>
            <span className="hidden sm:inline text-xs text-gray-400">Select a document to inspect</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-4">
            <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
              {documents.map((doc) => {
                const Icon = doc.icon;
                const active = doc.id === activeDoc?.id;
                return (
                  <button
                    type="button"
                    key={doc.id}
                    onClick={() => setActiveDocId(doc.id)}
                    className={`shrink-0 w-56 md:w-full flex items-center gap-3 rounded-xl border px-3 py-3 text-left transition-colors ${
                      active
                        ? "bg-emerald-50 border-emerald-200"
                        : "bg-white border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${doc.color}`}>
                      <Icon size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-900">{doc.label}</p>
                      <p className="text-xs text-gray-500">{doc.subtitle}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="bg-slate-900 rounded-xl overflow-hidden min-h-[260px] sm:min-h-[320px] flex flex-col">
              <div className="flex justify-center pt-4">
                <div className="flex items-center gap-1 bg-slate-800/80 rounded-lg px-2 py-1.5">
                  <button type="button" className="p-1.5 text-gray-300 hover:text-white">
                    <ZoomIn size={16} />
                  </button>
                  <button type="button" className="p-1.5 text-gray-300 hover:text-white">
                    <ZoomOut size={16} />
                  </button>
                  <button type="button" className="p-1.5 text-gray-300 hover:text-white">
                    <RotateCw size={16} />
                  </button>
                  <button type="button" className="p-1.5 text-gray-300 hover:text-white">
                    <Maximize2 size={16} />
                  </button>
                  <button type="button" className="p-1.5 text-gray-300 hover:text-white">
                    <Download size={16} />
                  </button>
                </div>
              </div>
              <div className="flex-1 flex items-center justify-center p-6">
                {activeDoc?.previewUrl ? (
                  <img
                    src={activeDoc.previewUrl}
                    alt={activeDoc.title}
                    className="max-h-64 rounded-lg object-contain"
                  />
                ) : (
                  <div className="w-full max-w-sm aspect-[4/3] bg-gray-200 rounded-lg flex flex-col items-center justify-center gap-2 text-gray-500">
                    {activeDoc && <activeDoc.icon size={28} />}
                    <p className="text-xs font-medium">{activeDoc?.title} Preview</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 p-4 sm:p-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <button
           onClick={() => {
            setRejectKyc(true)
           }}
            type="button"
            className="order-2 sm:order-1 border border-red-200 text-red-600 font-medium rounded-lg px-4 py-2.5 hover:bg-red-50 text-sm"
          >
            Reject KYC
          </button>
          <div className="order-1 sm:order-2 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={onClose}
              className="border border-gray-300 text-gray-700 font-medium rounded-lg px-4 py-2.5 hover:bg-gray-50 text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white font-semibold rounded-lg px-4 py-2.5 flex items-center justify-center gap-2 text-sm"
            >
              <CheckCheck size={16} />
              {submitting ? "Approving..." : "Approve KYC"}
            </button>
          </div>
        </div>
      </form>

      {rejectKyc && (<RejectKYCModal onClose={() =>  setRejectKyc(false)}/>)}
    </div>
  );
}