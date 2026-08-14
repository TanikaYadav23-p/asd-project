import React, { useState } from "react";
import {
  Megaphone,
  Calendar,
  ChevronDown,
  Plus,
  Pencil,
  Trash2,
  Truck,
  Plane,
  X,
} from "lucide-react";
import API from "../../api/axios";

const initialAds = [
  {
    id: 1,
    name: "Summer offer Banner",
    start: "10 May 2025",
    end: "20 May 2025",
    status: "Active",
    banner: "summer",
  },
  {
    id: 2,
    name: "Freight Discount",
    start: "10 May 2025",
    end: "20 May 2025",
    status: "Active",
    banner: "freight",
  },
  {
    id: 3,
    name: "New Route Launch",
    start: "10 May 2025",
    end: "20 May 2025",
    status: "Paused",
    banner: "route",
  },
  {
    id: 4,
    name: "Weekend Special",
    start: "10 May 2025",
    end: "20 May 2025",
    status: "Active",
    banner: "weekend",
  },
];

function Banner({ type }) {
  if (type === "summer") {
    return (
      <div className="w-24 h-14 rounded-lg bg-gradient-to-br from-yellow-300 via-orange-400 to-orange-500 flex flex-col items-center justify-center leading-none">
        <span className="text-white text-[8px] font-extrabold tracking-wide">
          SPECIAL
        </span>
        <span className="text-white text-[9px] font-extrabold tracking-wide">
          SUMMER
        </span>
        <span className="text-white text-[8px] font-extrabold tracking-wide">
          OFFER
        </span>
      </div>
    );
  }
  if (type === "freight") {
    return (
      <div className="w-24 h-14 rounded-lg bg-sky-900 flex flex-col items-center justify-center gap-1">
        <div className="flex items-center gap-1 text-white">
          <Truck size={14} />
          <span className="text-[8px] font-bold">FREE SHIPPING</span>
        </div>
      </div>
    );
  }
  if (type === "route") {
    return (
      <div className="w-24 h-14 rounded-lg bg-slate-100 flex flex-col items-center justify-center relative">
        <div className="w-6 h-6 rounded-full bg-white border border-slate-300 flex items-center justify-center absolute top-1 right-1">
          <span className="text-[6px] font-bold text-slate-600 leading-tight text-center">
            NEW
            <br />
            UPDATE
          </span>
        </div>
        <Plane size={16} className="text-slate-400 rotate-45" />
      </div>
    );
  }
  return (
    <div className="w-24 h-14 rounded-lg bg-slate-700 flex flex-col items-center justify-center">
      <span className="text-red-400 text-[8px] font-extrabold">DISCOUNT</span>
      <span className="text-white text-[9px] font-extrabold">WEEKEND</span>
      <span className="text-white text-[8px] font-extrabold">SALE</span>
    </div>
  );
}

function StatusBadge({ status }) {
  const color =
    status === "Active" ? "text-emerald-500" : "text-amber-500";
  return <span className={`font-medium ${color}`}>{status}</span>;
}

function AdManagement({ ads, onDelete, onAddNew }) {
  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 lg:p-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center shrink-0">
            <Megaphone className="text-pink-500" size={22} />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Ad Management
            </h1>
            <p className="text-sm text-slate-500">
              Manage and Monitor your recent ads.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-slate-300 text-slate-700 font-medium text-sm">
            <Calendar size={16} />
            Run On Website
            <ChevronDown size={16} />
          </button>
          <button
            onClick={onAddNew}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-indigo-600 text-white font-semibold text-sm"
          >
            <Plus size={16} />
            Add new ads
          </button>
        </div>
      </div>

      <h2 className="text-lg font-bold text-slate-900 mt-8 mb-4">
        Recent Ads
      </h2>

      <div className="hidden md:block border border-slate-200 rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="py-4 px-6 text-sm font-semibold text-slate-500">
                Ad Name
              </th>
              <th className="py-4 px-6 text-sm font-semibold text-slate-500">
                Banner
              </th>
              <th className="py-4 px-6 text-sm font-semibold text-slate-500">
                Start Date
              </th>
              <th className="py-4 px-6 text-sm font-semibold text-slate-500">
                End Date
              </th>
              <th className="py-4 px-6 text-sm font-semibold text-slate-500">
                Status
              </th>
              <th className="py-4 px-6 text-sm font-semibold text-slate-500">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {initialAds.map((ad) => (
              <tr key={ad.id} className="border-b border-slate-100 last:border-0">
                <td className="py-4 px-6 text-slate-800 font-medium">
                  {ad.name}
                </td>
                <td className="py-4 px-6">
                  <Banner type={ad.banner} />
                </td>
                <td className="py-4 px-6 text-slate-600">{ad.start}</td>
                <td className="py-4 px-6 text-slate-600">{ad.end}</td>
                <td className="py-4 px-6">
                  <StatusBadge status={ad.status} />
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3 text-slate-600">
                    <button>
                      <Pencil size={16} />
                    </button>
                    <button onClick={() => onDelete(ad.id)}>
                      <Trash2 size={16} className="text-red-500" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden flex flex-col gap-4">
        {initialAds.map((ad) => (
          <div
            key={ad.id}
            className="border border-slate-200 rounded-2xl p-4 flex flex-col gap-3"
          >
            <div className="flex items-center gap-3">
              <Banner type={ad.banner} />
              <div className="flex flex-col">
                <span className="font-semibold text-slate-800">
                  {ad.name}
                </span>
                <StatusBadge status={ad.status} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm text-slate-600">
              <div>
                <span className="text-slate-400 block text-xs">
                  Start Date
                </span>
                {ad.start}
              </div>
              <div>
                <span className="text-slate-400 block text-xs">
                  End Date
                </span>
                {ad.end}
              </div>
            </div>
            <div className="flex items-center gap-4 text-slate-600 pt-1 border-t border-slate-100">
              <button className="flex items-center gap-1 text-sm">
                <Pencil size={15} />
                Edit
              </button>
              <button
                onClick={() => onDelete(ad.id)}
                className="flex items-center gap-1 text-sm text-red-500"
              >
                <Trash2 size={15} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function NewPostForm({ onCancel, onSubmit }) {
  const [formData, setFormData] = useState({
    postText: "",
    targetStartDate: "",
    linkUrl: "",
  });
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      payload.append(key, value);
    });
    if (file) {
      payload.append("file", file);
    }
    try {
      const response = await fetch("https://your-api.com/ads/posts", {
        method: "POST",
        body: payload,
      });
      const data = await response.json();
      onSubmit(data);
    } catch (error) {
      onSubmit(null);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-start sm:items-center justify-center p-4 sm:p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md sm:max-w-lg sm:border sm:border-slate-200 sm:rounded-3xl sm:shadow-lg sm:p-8 flex flex-col gap-6"
      >
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-extrabold text-slate-900">
            New Post Details
          </h1>
          <button type="button" onClick={onCancel} className="sm:hidden">
            <X size={22} className="text-slate-500" />
          </button>
        </div>

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          className={`rounded-2xl border-2 border-dashed p-8 flex flex-col items-center justify-center gap-3 text-center ${
            dragActive ? "border-indigo-400 bg-indigo-50" : "border-slate-300"
          }`}
        >
          <span className="text-slate-500">Drag & Upload file here.</span>
          <span className="text-slate-400 text-sm">or</span>
          <label className="px-5 py-2.5 rounded-full border border-slate-300 text-indigo-600 font-semibold text-sm cursor-pointer">
            Browse Files
            <input
              type="file"
              accept=".pdf,.png,.jpg,.jpeg"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
          <span className="text-slate-400 text-xs">
            PDF,PNG,JPG up to 100 mb.
          </span>
          {file && (
            <span className="text-slate-600 text-xs font-medium">
              {file.name}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-lg font-bold text-slate-900">
            Post Text
          </label>
          <textarea
            name="postText"
            value={formData.postText}
            onChange={handleChange}
            placeholder="Get ready for summer! Special beach offers are here."
            className="w-full min-h-[120px] rounded-2xl border border-slate-300 p-4 text-slate-700 placeholder-slate-400 resize-none outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-lg font-bold text-slate-900">
            Target Start Date
          </label>
          <input
            type="text"
            name="targetStartDate"
            value={formData.targetStartDate}
            onChange={handleChange}
            placeholder="20 May 2025"
            className="w-full rounded-full border border-slate-300 px-5 py-3.5 text-slate-400 outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-lg font-bold text-slate-900">
            Link URL
          </label>
          <input
            type="text"
            name="linkUrl"
            value={formData.linkUrl}
            onChange={handleChange}
            placeholder="Link URL"
            className="w-full rounded-full border border-slate-300 px-5 py-3.5 text-slate-400 outline-none"
          />
        </div>

        <div className="flex gap-4 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-3.5 rounded-full border border-slate-300 text-slate-700 font-bold"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 py-3.5 rounded-full bg-indigo-600 text-white font-bold"
          >
            Confirmed Post
          </button>
        </div>
      </form>
    </div>
  );
}

export default function App() {
  const [ads, setAds] = useState(initialAds);
  const [view, setView] = useState("list");

  const handleDelete = (id) => {
    setAds((prev) => prev.filter((ad) => ad.id !== id));
  };

  const handleSubmit = () => {
    setView("list");
  };

  if (view === "form") {
    return (
      <NewPostForm onCancel={() => setView("list")} onSubmit={handleSubmit} />
    );
  }

  return (
    <AdManagement
      ads={ads}
      onDelete={handleDelete}
      onAddNew={() => setView("form")}
    />
  );
}
