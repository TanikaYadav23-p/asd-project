import { useState } from "react";
import { FaDatabase, FaPlus, FaPen } from "react-icons/fa6";
import { FaCalendarAlt, FaTimes } from "react-icons/fa";
import API from "../../api/axios"; 
import { toast } from "react-hot-toast";
import { useEffect } from "react";


const initialCategories = [
  { id: 1, name: "Product Categories", subtitle: "Supported product categories", items: Array.from({ length: 45 }, (_, i) => ({ id: i + 1, code: `PRO-${String(i + 1).padStart(3, "0")}`, name: "Sample Product 01", status: "Active" })) },
  { id: 2, name: "Shipment Types", subtitle: "Supported shipment types", items: Array.from({ length: 12 }, (_, i) => ({ id: i + 1, code: `Ship-${String(i + 1).padStart(3, "0")}`, name: "Sample Product 01", status: "Active" })) },
  { id: 3, name: "Container Types", subtitle: "Supported container types", items: Array.from({ length: 12 }, (_, i) => ({ id: i + 1, code: `Con-${String(i + 1).padStart(3, "0")}`, name: "Sample Product 01", status: "Active" })) },
  { id: 4, name: "Payment Types", subtitle: "Supported payment types", items: Array.from({ length: 12 }, (_, i) => ({ id: i + 1, code: `Pay-${String(i + 1).padStart(3, "0")}`, name: "Sample Product 01", status: "Active" })) },
  { id: 5, name: "Incoterms Types", subtitle: "Supported incoterms types", items: Array.from({ length: 12 }, (_, i) => ({ id: i + 1, code: `Inc-${String(i + 1).padStart(3, "0")}`, name: "Sample Product 01", status: "Active" })) },
  { id: 6, name: "Currency Codes", subtitle: "Supported currency codes", items: Array.from({ length: 12 }, (_, i) => ({ id: i + 1, code: `Cur-${String(i + 1).padStart(3, "0")}`, name: "Sample Product 01", status: "Active" })) },
];

const ITEMS_PER_PAGE = 9;

function AddCategoryModal({ onClose, onAdd }) {
  const [name, setName] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = "Category name is required";
    if (!subtitle.trim()) e.subtitle = "Subtitle is required";
    return e;
  };

  const handleAdd = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    onAdd({ name: name.trim(), subtitle: subtitle.trim() });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-semibold text-gray-800">Add Category</h3>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <FaTimes />
          </button>
        </div>
        <div className="flex flex-col gap-4 mb-6">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">Category Name</label>
            <input
              type="text"
              className={`w-full border rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-all ${errors.name ? "border-red-400" : "border-gray-200"}`}
              placeholder="Enter category name"
              value={name}
              onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: "" })); }}
            />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">Subtitle</label>
            <input
              type="text"
              className={`w-full border rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-all ${errors.subtitle ? "border-red-400" : "border-gray-200"}`}
              placeholder="Enter subtitle"
              value={subtitle}
              onChange={(e) => { setSubtitle(e.target.value); setErrors((p) => ({ ...p, subtitle: "" })); }}
            />
            {errors.subtitle && <p className="text-xs text-red-500 mt-1">{errors.subtitle}</p>}
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={onClose} className="flex-1 px-4 py-2.5 text-sm text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 font-medium transition-colors">Cancel</button>
          <button onClick={handleAdd} className="flex-1 px-4 py-2.5 text-sm text-white bg-teal-500 rounded-xl hover:bg-teal-600 font-medium transition-colors">Add Category</button>
        </div>
      </div>
    </div>
  );
}

function AddItemModal({ categoryName, prefix, onClose, onAdd }) {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("active");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!code.trim()) e.code = "Code is required";
    if (!name.trim()) e.name = "Name is required";
    return e;
  };

  const handleAdd = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    onAdd({ code: code.trim(), name: name.trim(), status });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-semibold text-gray-800">Add Item — {categoryName}</h3>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <FaTimes />
          </button>
        </div>
        <div className="flex flex-col gap-4 mb-6">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">Code</label>
            <input
              type="text"
              className={`w-full border rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-all ${errors.code ? "border-red-400" : "border-gray-200"}`}
              placeholder={`e.g. ${prefix}-001`}
              value={code}
              onChange={(e) => { setCode(e.target.value); setErrors((p) => ({ ...p, code: "" })); }}
            />
            {errors.code && <p className="text-xs text-red-500 mt-1">{errors.code}</p>}
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">Name</label>
            <input
              type="text"
              className={`w-full border rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-all ${errors.name ? "border-red-400" : "border-gray-200"}`}
              placeholder="Enter item name"
              value={name}
              onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: "" })); }}
            />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">Status</label>
            <select
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 bg-white transition-all"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={onClose} className="flex-1 px-4 py-2.5 text-sm text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 font-medium transition-colors">Cancel</button>
          <button onClick={handleAdd} className="flex-1 px-4 py-2.5 text-sm text-white bg-teal-500 rounded-xl hover:bg-teal-600 font-medium transition-colors">Add Item</button>
        </div>
      </div>
    </div>
  );
}

function EditItemModal({ item, onClose, onUpdate }) {
  const [name, setName] = useState(item.name);
  const [status, setStatus] = useState(item.status);

  const handleUpdate = () => {
    onUpdate({
      ...item,
      name,
      status,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
        <h3 className="text-base font-semibold mb-4">Edit Item</h3>

        <input
          className="w-full border p-2 rounded mb-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <select
          className="w-full border p-2 rounded mb-4"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <div className="flex gap-2">
          <button onClick={onClose} className="flex-1 border py-2 rounded">
            Cancel
          </button>
          <button onClick={handleUpdate} className="flex-1 bg-teal-500 text-white py-2 rounded">
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MasterData() {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedId, setSelectedId] = useState(1);
  const [showCatModal, setShowCatModal] = useState(false);
  const [showItemModal, setShowItemModal] = useState(false);
  const [showRight, setShowRight] = useState(false);
  const [pages, setPages] = useState({});
  const [editItem, setEditItem] = useState(null);

  const selected = categories.find((c) => c._id === selectedId);
 
  const currentPage = pages[selectedId] || 1;
  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
  
  const pageItems = items.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  const setPage = (p) => setPages((prev) => ({ ...prev, [selectedId]: p }));

  useEffect(() => {
    fetchCategories();
  }, []);
  
  const fetchCategories = async () => {
    try {
      const res = await API.get("/master/categories");
      setCategories(res.data.data);
  
      if (res.data.data.length > 0) {
        setSelectedId(res.data.data[0]._id);
        fetchItems(res.data.data[0]._id);
      }
    } catch (err) {
      toast.error("Failed to load categories");
    }
  };

  const fetchItems = async (categoryId) => {
    try {
      const res = await API.get(`/master/items/${categoryId}`);
      setItems(res.data.data);
    } catch (err) {
      toast.error("Failed to load items");
    }
  };

  const handleCategoryClick = (id) => {
    setSelectedId(id);
    setShowRight(true);
    setPage(1);
  
    fetchItems(id); // 🔥 important
  };

  

  const handleAddCategory = async ({ name, subtitle }) => {
    try {
      const key = name.toLowerCase().replace(/\s+/g, "_");
      const prefix = name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase();
  
      const res = await API.post("/master/categories", {
        name,
        key,
        prefix,
      });
  
      toast.success("Category added");
  
      fetchCategories(); // refresh
    } catch (err) {
      toast.error(err.response?.data?.message || "Error");
    }
  };

  const handleAddItem = async ({ name }) => {
    try {
      await API.post("/master/items", {
        categoryId: selectedId,
        name,
      });
  
      toast.success("Item added");
      fetchItems(selectedId);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error");
    }
  };

  const handleUpdateItem = async (updatedItem) => {
    try {
      await API.put(`/master/items/${updatedItem._id}`, {
        name: updatedItem.name,
        status: updatedItem.status,
      });
  
      toast.success("Item updated");
      fetchItems(selectedId);
    } catch (err) {
      toast.error("Update failed");
    }
  };

  const getPrefix = () => {
    return selected?.name.split(" ").map((w) => w[0]).join("").toUpperCase() || "ITM";
  };

 

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
       {editItem && (
    <EditItemModal
      item={editItem}
      onClose={() => setEditItem(null)}
      onUpdate={handleUpdateItem}
    />
  )}

      {showCatModal && <AddCategoryModal onClose={() => setShowCatModal(false)} onAdd={handleAddCategory} />}
      {showItemModal && (
        <AddItemModal
          categoryName={selected?.name}
          prefix={getPrefix()}
          onClose={() => setShowItemModal(false)}
          onAdd={handleAddItem}
        />
      )}

      <div className="max-w-6xl mx-auto">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Master Data</h1>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">Manage categories, types, and dropdown data</p>
          </div>
          <button
            onClick={() => setShowCatModal(true)}
            className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors shadow-sm whitespace-nowrap"
          >
            <FaPlus className="text-xs" /> Add Category
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-4">

          {/* LEFT */}
          <div className={`w-full lg:w-64 xl:w-72 flex-shrink-0 ${showRight ? "hidden lg:block" : "block"}`}>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <h2 className="text-sm font-semibold text-gray-700 mb-3">Data Categories</h2>
              <div className="flex flex-col gap-2">
                {categories.map((cat) => (
                  <div
                    key={cat._id}
                    onClick={() => handleCategoryClick(cat._id)}
                    className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all border ${selectedId === cat._id ? "border-teal-400 bg-teal-50/60" : "border-transparent hover:bg-gray-50"}`}
                  >
                    <div className="w-9 h-9 rounded-lg bg-teal-50 flex items-center justify-center flex-shrink-0">
                      <FaDatabase className="text-teal-500 text-sm" />
                    </div>
                    <div className="min-w-0">
                      <p className={`text-sm font-semibold truncate ${selectedId === cat._id ? "text-gray-900" : "text-gray-700"}`}>{cat.name}</p>
                      <p className="text-xs text-gray-400">{selectedId === cat._id ? items.length : ""} Items</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className={`flex-1 min-w-0 ${showRight ? "block" : "hidden lg:block"}`}>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-5">

              <div className="flex items-start justify-between mb-1 gap-2">
                <div className="flex items-center gap-2">
                  {showRight && (
                    <button onClick={() => setShowRight(false)} className="lg:hidden w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                      <FaTimes />
                    </button>
                  )}
                  <div>
                    <h2 className="text-sm sm:text-base font-semibold text-gray-800">{selected?.name}</h2>
                    <p className="text-xs text-gray-400">{selected?.subtitle}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowItemModal(true)}
                  className="flex items-center gap-1.5 bg-teal-500 hover:bg-teal-600 text-white px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors whitespace-nowrap"
                >
                  <FaPlus className="text-xs" /> Add Item
                </button>
              </div>

              <div className="overflow-x-auto mt-4">
                <table className="w-full min-w-[380px]">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left text-xs font-semibold text-gray-500 px-3 py-3 rounded-l-xl">CODE</th>
                      <th className="text-left text-xs font-semibold text-gray-500 px-3 py-3">NAME</th>
                      <th className="text-center text-xs font-semibold text-gray-500 px-3 py-3">STATUS</th>
                      <th className="text-center text-xs font-semibold text-gray-500 px-3 py-3 rounded-r-xl">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pageItems.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="text-center text-sm text-gray-400 py-10">No items yet. Click "+ Add Item" to add.</td>
                      </tr>
                    ) : (
                      pageItems.map((item, i) => (
                        <tr key={item._id} className={`border-t border-gray-100 ${i % 2 === 0 ? "" : ""}`}>
                          <td className="text-sm text-gray-700 px-3 py-3">{item.code}</td>
                          <td className="text-sm text-gray-700 px-3 py-3">{item.name}</td>
                          <td className="text-center px-3 py-3">
                            <span className={`text-xs font-medium px-3 py-1 rounded-full ${item.status === "active" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-500"}`}>
                              {item.status}
                            </span>
                          </td>
                          <td className="text-center px-3 py-3">
                          <button
  onClick={() => setEditItem(item)}
  className="text-teal-500 hover:text-teal-600 text-sm font-medium flex items-center gap-1 mx-auto"
>
  <FaPen className="text-xs" /> Edit
</button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {totalPages > 0 && (
                <div className="flex items-center justify-end gap-2 mt-4 flex-wrap">
                  <button
                    onClick={() => setPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 text-sm border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed font-medium transition-colors"
                  >
                    Preview
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`w-9 h-9 rounded-xl text-sm font-medium transition-colors ${currentPage === p ? "bg-teal-500 text-white" : "border border-gray-200 text-gray-600 hover:bg-gray-50"}`}
                    >
                      {p}
                    </button>
                  ))}
                  <button
                    onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 text-sm border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed font-medium transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}