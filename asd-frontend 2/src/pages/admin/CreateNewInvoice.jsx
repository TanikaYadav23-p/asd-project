import { useState, useRef } from "react";
import { FileText, UploadCloud, Pencil, Trash2, DollarSign } from "lucide-react";

const emptyItem = { description: "", hsCode: "", qty: "", unit: "", unitPrice: "" };

export default function CreateNewInvoice() {
  const [form, setForm] = useState({
    invoiceNumber: "PMW-2025-0202",
    invoiceDate: "24 Apr 2025",
    dueDate: "30 Apr 2026",
    currency: "INR - Indian Ruppes",
    billTo: "ABC Export",
    address: "123 palam vihar , andheri, mumbai",
    paymentTerms: "Next 15 Days",
    paymentMode: "Bank Transfer",
    poReference: "PO-5470",
    freightCharges: "25,000.00",
    insuranceCharges: "5,000.00",
    handlingCharges: "3,000.00",
    discount: "10,000.00",
    notes: "Thank for your Business.",
  });

  const [items, setItems] = useState([
    { id: 1, description: "Almond", hsCode: "0802.99287", qty: 120, unit: "Kgs", unitPrice: 500.0 },
    { id: 2, description: "Almond", hsCode: "0802.99287", qty: 120, unit: "Kgs", unitPrice: 500.0 },
    { id: 3, description: "Almond", hsCode: "0802.99287", qty: 120, unit: "Kgs", unitPrice: 500.0 },
  ]);
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState(emptyItem);
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const startEdit = (item) => {
    setEditingId(item.id);
    setEditValues(item);
  };

  const saveEdit = (id) => {
    setItems((prev) => prev.map((i) => (i.id === id ? editValues : i)));
    setEditingId(null);
  };

  const deleteItem = (id) => setItems((prev) => prev.filter((i) => i.id !== id));

  const subtotal = items.reduce((sum, i) => sum + Number(i.qty) * Number(i.unitPrice), 0);
  const discount = parseFloat(form.discount.replace(/,/g, "")) || 0;
  const taxable = subtotal - discount;
  const cgst = taxable * 0.09;
  const sgst = taxable * 0.09;
  const total = taxable + cgst + sgst;

  const handleFile = (f) => {
    if (f) setFile(f);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("invoice", JSON.stringify({ ...form, items }));
    if (file) fd.append("attachment", file);
    try {
      await fetch("/api/invoices", { method: "POST", body: fd });
    } catch (err) {}
  };

  const inputClass = "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-600";

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-4 sm:p-6">
      <div className="flex items-center justify-between mb-6 gap-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-purple-50 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Create New Invoice</h2>
            <p className="text-sm text-gray-500">Create and manage invoice for this shipment</p>
          </div>
        </div>
        <span className="text-xs text-yellow-600 font-medium">Pending Review</span>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <div className="border border-gray-100 rounded-lg p-4">
            <p className="text-purple-600 font-semibold text-sm mb-4">Invoice Information</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
              <div>
                <label className="block text-xs text-gray-700 mb-1">Invoice Number *</label>
                <input value={form.invoiceNumber} onChange={handleChange("invoiceNumber")} className={inputClass} />
              </div>
              <div>
                <label className="block text-xs text-gray-700 mb-1">Invoice Date *</label>
                <input value={form.invoiceDate} onChange={handleChange("invoiceDate")} className={inputClass} />
              </div>
              <div>
                <label className="block text-xs text-gray-700 mb-1">Due Date</label>
                <input value={form.dueDate} onChange={handleChange("dueDate")} className={inputClass} />
              </div>
              <div>
                <label className="block text-xs text-gray-700 mb-1">Currency</label>
                <input value={form.currency} onChange={handleChange("currency")} className={inputClass} />
              </div>
              <div>
                <label className="block text-xs text-gray-700 mb-1">Bill To *</label>
                <input value={form.billTo} onChange={handleChange("billTo")} className={inputClass} />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs text-gray-700 mb-1">Address</label>
                <input value={form.address} onChange={handleChange("address")} className={inputClass} />
              </div>
              <div>
                <label className="block text-xs text-gray-700 mb-1">Payment Terms *</label>
                <input value={form.paymentTerms} onChange={handleChange("paymentTerms")} className={inputClass} />
              </div>
              <div>
                <label className="block text-xs text-gray-700 mb-1">Payment Mode *</label>
                <input value={form.paymentMode} onChange={handleChange("paymentMode")} className={inputClass} />
              </div>
              <div>
                <label className="block text-xs text-gray-700 mb-1">PO/Reference No*</label>
                <input value={form.poReference} onChange={handleChange("poReference")} className={inputClass} />
              </div>
            </div>
          </div>

          <div className="border border-gray-100 rounded-lg p-4">
            <p className="text-purple-600 font-semibold text-sm mb-4">Invoice Terms</p>
            <div className="overflow-x-auto">
              <div className="min-w-[600px]">
                <div className="grid grid-cols-7 text-xs font-semibold text-gray-700 pb-2 border-b border-gray-100">
                  <span>#</span>
                  <span className="col-span-2">Description</span>
                  <span>HS Code</span>
                  <span>Qty</span>
                  <span>Unit Price</span>
                  <span>Actions</span>
                </div>
                {items.map((item, idx) => {
                  const isEditing = editingId === item.id;
                  return (
                    <div key={item.id} className="grid grid-cols-7 items-center py-2 border-b border-gray-50 text-sm">
                      <span>{idx + 1}</span>
                      {isEditing ? (
                        <input
                          value={editValues.description}
                          onChange={(e) => setEditValues({ ...editValues, description: e.target.value })}
                          className="col-span-2 border border-gray-300 rounded px-2 py-1 text-xs"
                        />
                      ) : (
                        <span className="col-span-2">{item.description}</span>
                      )}
                      <span className="text-gray-500 text-xs">{item.hsCode}</span>
                      {isEditing ? (
                        <input
                          value={editValues.qty}
                          onChange={(e) => setEditValues({ ...editValues, qty: e.target.value })}
                          className="border border-gray-300 rounded px-2 py-1 text-xs"
                        />
                      ) : (
                        <span className="text-gray-500">{item.qty} {item.unit}</span>
                      )}
                      {isEditing ? (
                        <input
                          value={editValues.unitPrice}
                          onChange={(e) => setEditValues({ ...editValues, unitPrice: e.target.value })}
                          className="border border-gray-300 rounded px-2 py-1 text-xs"
                        />
                      ) : (
                        <span className="text-gray-500">₹{Number(item.unitPrice).toFixed(2)}</span>
                      )}
                      <div className="flex gap-2">
                        {isEditing ? (
                          <button type="button" onClick={() => saveEdit(item.id)} className="text-xs text-green-600 font-medium">
                            Save
                          </button>
                        ) : (
                          <button type="button" onClick={() => startEdit(item)}>
                            <Pencil className="w-4 h-4 text-gray-700" />
                          </button>
                        )}
                        <button type="button" onClick={() => deleteItem(item.id)}>
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="border border-gray-100 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4">
              <DollarSign className="w-4 h-4 text-purple-600" />
              <p className="text-purple-600 font-semibold text-sm">Additional Charges</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
              <div>
                <label className="block text-xs text-gray-700 mb-1">Freight Charges</label>
                <input value={form.freightCharges} onChange={handleChange("freightCharges")} className={inputClass} />
              </div>
              <div>
                <label className="block text-xs text-gray-700 mb-1">Insurance Charges</label>
                <input value={form.insuranceCharges} onChange={handleChange("insuranceCharges")} className={inputClass} />
              </div>
              <div>
                <label className="block text-xs text-gray-700 mb-1">Handling Charges</label>
                <input value={form.handlingCharges} onChange={handleChange("handlingCharges")} className={inputClass} />
              </div>
              <div>
                <label className="block text-xs text-gray-700 mb-1">Discount</label>
                <input value={form.discount} onChange={handleChange("discount")} className={inputClass} />
              </div>
            </div>
            <label className="block text-xs text-gray-700 mb-1">Notes to Customer (optional)</label>
            <input value={form.notes} onChange={handleChange("notes")} className={inputClass} />
          </div>
        </div>

        <div className="space-y-4">
          <div className="border border-gray-100 rounded-lg p-4">
            <p className="text-purple-600 font-semibold text-sm mb-4">Invoice Summary</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span className="text-gray-900">₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Discount</span>
                <span className="text-gray-900">₹{discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Taxable Amount</span>
                <span className="text-gray-900">₹{taxable.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">CGST(9%)</span>
                <span className="text-gray-900">₹{cgst.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">SGST(9%)</span>
                <span className="text-gray-900">₹{sgst.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-100">
                <span className="text-purple-600 font-bold">Total Amount</span>
                <span className="text-purple-600 font-bold">₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="border border-gray-100 rounded-lg p-4">
            <p className="text-purple-600 font-semibold text-sm mb-4">Attached Document (optional)</p>
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current.click()}
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer ${
                dragging ? "border-purple-400 bg-purple-50" : "border-gray-200"
              }`}
            >
              <UploadCloud className="w-6 h-6 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-1">Drag & Upload file here.</p>
              <p className="text-xs text-gray-400 mb-2">or</p>
              <span className="text-sm text-purple-600 font-medium border border-purple-200 rounded-full px-4 py-1.5 inline-block">
                Browse Files
              </span>
              <p className="text-xs text-gray-400 mt-2">PDF,PNG,JPG up to 100 mb.</p>
              {file && <p className="text-xs text-gray-600 mt-2">{file.name}</p>}
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={(e) => handleFile(e.target.files[0])}
                className="hidden"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-lg bg-purple-600 text-white text-sm font-medium hover:bg-purple-700"
          >
            Save Invoice
          </button>
        </div>
      </div>
    </form>
  );
}