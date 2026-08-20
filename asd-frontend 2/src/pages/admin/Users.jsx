

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
  import { LuUsers, LuSearch, LuChevronDown, LuActivity } from "react-icons/lu";
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
import { MoreVertical} from "lucide-react"

  const stats = [
  { label: "Total Users", value: "1,248", sub: "12.5% from last 30 days", subColor: "text-green-600", iconColor: "text-green-400" },
  { label: "Active Users", value: "1,048", sub: "84.0% of total users", subColor: "text-green-600", iconColor: "text-green-400" },
  { label: "Inactive Users", value: "200", sub: "16.0% of total users", subColor: "text-red-500", iconColor: "text-red-400" },
  { label: "New Users(This week)", value: "48", sub: "20.0% from last week", subColor: "text-purple-500", iconColor: "text-purple-400" },
];

const initialUsers = [
  { name: "Arjun Soni", email: "arjunsoni@gmail.com", phone: "1234567890", type: "B2b user", typeColor: "green", company: "example.pvt.ltd", status: "Active", joined: "12 May 2024", lastLogin: "12 May 2024" },
  { name: "Arjun Soni", email: "arjunsoni@gmail.com", phone: "1234567890", type: "B2b user", typeColor: "green", company: "example.pvt.ltd", status: "Active", joined: "12 May 2024", lastLogin: "12 May 2024" },
  { name: "Arjun Soni", email: "arjunsoni@gmail.com", phone: "1234567890", type: "B2b user", typeColor: "purple", company: "example.pvt.ltd", status: "Active", joined: "12 May 2024", lastLogin: "12 May 2024" },
  { name: "Arjun Soni", email: "arjunsoni@gmail.com", phone: "1234567890", type: "B2b user", typeColor: "purple", company: "example.pvt.ltd", status: "Active", joined: "12 May 2024", lastLogin: "12 May 2024" },
  { name: "Arjun Soni", email: "arjunsoni@gmail.com", phone: "1234567890", type: "Admin", typeColor: "blue", company: "example.pvt.ltd", status: "Active", joined: "12 May 2024", lastLogin: "12 May 2024" },
];
 

const userByType = [
  { label: "Basic Plan", value: "2499", percent: "52.2%", color: "bg-purple-500" },
  { label: "Starter Plan", value: "4999", percent: "52.2%", color: "bg-blue-500" },
  // { label: "Admins", value: "1,248", percent: "52.2%", color: "bg-green-500" },
  // { label: "Permission", value: "1,248", percent: "52.2%", color: "bg-gray-300" },
];
 
const registrationData = [
  { month: "May", value: 55 },
  { month: "june", value: 40 },
  { month: "july", value: 68 },
  { month: "Aug", value: 30 },
  { month: "Sep", value: 62 },
  { month: "Oct", value: 45 },
];

function DeleteModal({ setDeleteUser, handleDelete }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-3">
      <div className="bg-white rounded-xl p-6 w-full max-w-sm text-center">
        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-red-100 flex items-center justify-center text-red-500 text-xl">
          <FiTrash2 />
        </div>

        <h3 className="text-lg font-semibold">Delete User Info ?</h3>
        <p className="text-sm text-gray-500 mb-4">
          This will be delete permanantly
        </p>

        <div className="flex gap-3">
          <button
            onClick={() => setDeleteUser(null)}
            className="w-full border py-2 rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            className="w-full bg-red-500 text-white py-2 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}


function EditDrawer({ user, setEditUser, setUsers }) {
  const [form, setForm] = useState({
    name: user.name || "",
    email: user.email || "",
    phone: user.phone || "",
    company: user.companyName || "",
    gst: user.gstNumber || "",
    business: user.businessType || "",
    accountType: user.accountType || "B2B",
    status: user.status ?? true,
    plan: user.plan || "Pro",
    expiry: user.expiryDate?.split("T")[0] || "",
     suspend: false,
      startDate: "",
     endDate: "",
     
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      await API.put(`/users/${user._id}`, {
        name: form.name,
        email: form.email,
        phone: form.phone,
        companyName: form.company,
        gstNumber: form.gst,
        businessType: form.business,
        role: form.accountType === "B2B" ? "user" : "user",
        status: form.status ? "active" : "inactive",
        plan: form.plan,
        expiryDate: form.expiry
      });
  
      toast.success("User updated ✅");
  
  
    } catch (err) {
      toast.error("Update failed ❌");
    }
  };

  const handleResetPassword = async () => {
    const newPassword = prompt("Enter new password");
  
    if (!newPassword) return;
  
    try {
      await API.put(`/users/reset-password/${user._id}`, {
        password: newPassword,
      });
  
      toast.success("Password reset successful ✅");
  
    } catch (err) {
      toast.error(err.response?.data?.message || "Reset failed ❌");
    }
  };

  const handleSendInvite = async () => {
    try {
      const res = await API.post(`/users/invite/${user._id}`);
  
      const link = res.data.data.inviteLink;
  
      toast.success("Invite sent ✅");
  
      console.log("Invite link:", link);
  
      // optional: copy to clipboard
      navigator.clipboard.writeText(link);
  
    } catch (err) {
      toast.error("Invite failed ❌");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex justify-end">
      <div className="w-full sm:w-[420px] bg-white h-full overflow-y-auto transform transition-transform duration-300 translate-x-0 p-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Edit User</h2>
          <RxCross1
            onClick={() => setEditUser(null)}
            className="text-xl cursor-pointer"
          />
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-600">
            {form.name?.[0]}
          </div>
          <div>
            <p className="font-medium">{form.name}</p>
            <p className="text-xs text-gray-500">Last updated 2 days ago</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="border-t pt-4">
            <p className="text-sm font-medium mb-2">Basic Info</p>

            {/* <div className="flex gap-4 items-center mb-3">
              <div className="w-14 h-14 border rounded-md flex items-center justify-center text-gray-400">
                <FiCamera />
              </div>
              <p className="text-xs text-gray-400">
                Upload Photo JPG, PNG up to 2 MB
              </p>
            </div> */}

            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Full Name"
              className="w-full border px-3 py-2 rounded mb-2"
            />

            <input
              value={form.email}
              disabled={true}
              // onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Email Address"
              className="w-full border px-3 py-2 rounded mb-2"
            />

            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="Phone Number"
              className="w-full border px-3 py-2 rounded"
            />

        
          </div>

          {/* <div className="border-t pt-4">
            <p className="text-sm font-medium mb-2">Account Type</p>

            <select
              value={form.accountType}
              onChange={(e) =>
                setForm({ ...form, accountType: e.target.value })
              }
              className="w-full border px-3 py-2 rounded"
            >
              <option>B2B</option>
              <option>B2C</option>
            </select>
          </div> */}

          <div className="border-t pt-4">
            <p className="text-sm font-medium mb-2">Company name</p>

            <input
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              placeholder="Company Name"
              className="w-full border px-3 py-2 rounded mb-2"
            />
          </div>
          {/*   <input
              value={form.gst}
              onChange={(e) => setForm({ ...form, gst: e.target.value })}
              placeholder="GST Number"
              className="w-full border px-3 py-2 rounded mb-2"
            />

            <select
              value={form.business}
              onChange={(e) => setForm({ ...form, business: e.target.value })}
              className="w-full border px-3 py-2 rounded"
            >
              <option>Exporter</option>
              <option>Manufacturer</option>
            </select>
          </div> */}

         <div className="border-t pt-4">
  <p className="text-sm font-medium mb-2">Status</p>

  <div className="flex items-center gap-6">
    {/* Active */}
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={form.status}
        onChange={(e) =>
          setForm({ ...form, status: e.target.checked })
        }
      />
      <span className="text-sm">Active</span>
    </div>

    {/* Suspend */}
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={form.suspend}
        onChange={(e) =>
          setForm({
            ...form,
            suspend: e.target.checked,
          })
        }
      />
      <span className="text-sm">Suspend</span>
    </div>
  </div>
</div>

          

          <div className="border-t pt-4">
            <p className="text-sm font-medium mb-2">Subscription Plan</p>

            <div className="grid grid-cols-2 gap-2">
             <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Plan Name
            </label>

            <select
              value={form.plan}
              onChange={(e) =>
                setForm({ ...form, plan: e.target.value })
              }
              className="w-full border border-gray-300 px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Pro">Pro</option>
              <option value="Basic">Basic</option>
                <option value="Basic">Starter</option>
            </select>
          </div>
              {/* <input
                type="date"

                value={form.expiry}
                onChange={(e) => setForm({ ...form, expiry: e.target.value })}
                className="border px-3 py-2 rounded"
              /> */}

         <div>
  <label className="block text-sm font-medium mb-1">
    Start Date
  </label>
  <input
    type="date"
    value={form.startDate}
    onChange={(e) =>
      setForm({ ...form, startDate: e.target.value })
    }
    className="border px-3 py-2 rounded w-full"
  />
</div>

    {/* End Date */}
    <div>   <label className="block text-sm font-medium mb-1">
    End Date
  </label>
   <input
      type="date"
      value={form.endDate}
      onChange={(e) =>
        setForm({ ...form, endDate: e.target.value })
      }
      className="border px-3 py-2 rounded"
    />
  </div>
   
            </div>
          </div>

          {/* <div className="border-t pt-4 space-y-2">
          <button
  type="button"
  onClick={handleResetPassword}
  className="w-full border py-2 rounded flex items-center justify-center gap-2"
>
  <FiLock /> Reset Password
</button>

<button
  type="button"
  onClick={handleSendInvite}
  className="w-full border py-2 rounded flex items-center justify-center gap-2"
>
  <FiSend /> Send Invite Link
</button>
          </div> */}

          <button className="w-full bg-teal-500 text-white py-2 rounded mt-2">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

function AddUserModal({ setShowModal, setUsers }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    status: "active",
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    let err = {};
    if (!form.name) err.name = "Required";
    if (!form.email) err.email = "Required";
    if (!form.role) err.role = "Required";
  
    setErrors(err);
    if (Object.keys(err).length > 0) return;
  
    try {
      await API.post("/users", {
        name: form.name,
        email: form.email,
        role: form.role, // 👈 string (backend convert karega)
        status: form.status
      });
  
      toast.success("User added ✅");
  
      setShowModal(false);
      window.location.reload(); // simple refresh
  
    } catch (err) {
      toast.error(err.response?.data?.message || "Add failed ❌");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-3">
      <div className="bg-white w-full max-w-md rounded-xl p-5 relative">
        <button
          onClick={() => setShowModal(false)}
          className="absolute right-4 top-4 text-gray-500"
        >
          <RxCross1 />
        </button>

        <h2 className="text-lg font-semibold mb-4">Add User</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            placeholder="Name"
            className="w-full border px-3 py-2 rounded"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}

          <input
            placeholder="Email"
            className="w-full border px-3 py-2 rounded"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email}</p>
          )}

          <select
            className="w-full border px-3 py-2 rounded"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          {errors.role && <p className="text-red-500 text-xs">{errors.role}</p>}

          <select
            className="w-full border px-3 py-2 rounded"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          {errors.status && (
            <p className="text-red-500 text-xs">{errors.status}</p>
          )}

          <div className="flex gap-2 pt-2">
            <button
              type="submit"
              className="w-full bg-teal-500 text-white py-2 rounded"
            >
              Add User
            </button>

            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="w-full border py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

 
function StatCard({ stat }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{stat.label}</p>
        <p className="text-2xl font-semibold text-gray-900 mt-1">{stat.value}</p>
        <p className={`text-xs mt-1 ${stat.subColor}`}>{stat.sub}</p>
      </div>
      <LuActivity className={stat.iconColor} size={32} strokeWidth={1.5} />
    </div>
  );
}

function DonutRing({ segments, centerValue, centerLabel, onClick }) {
  let cumulative = 0;

  const gradientParts = segments.map((s) => {
    const start = cumulative;
    cumulative += s.percent;

    return `${s.hex} ${start}% ${cumulative}%`;
  });

  const gradient = `conic-gradient(${gradientParts.join(",")})`;

  return (
    <div
      onClick={onClick}
      className="relative w-32 h-32 min-w-32 min-h-32 aspect-square shrink-0 rounded-full flex items-center justify-center cursor-pointer"
      style={{
        background: gradient,
      }}
    >
      <div className="absolute w-10 h-10 min-w-24 min-h-24 aspect-square bg-white rounded-full flex flex-col items-center justify-center">
        <span className="text-lg font-semibold text-gray-900">
          {centerValue}
        </span>

        <span className="text-xs text-gray-500">
          {centerLabel}
        </span>
      </div>
    </div>
  );
}

export default function UsersSection({ setShowNotice }) {
 
const [loading, setLoading] = useState(false); 
// {name: "HELLO"}, {email: "hello@gmail.com"}, {phone: "222222"}, {companyName: "global.com"}
  const [users, setUsers] = useState([
  {
    _id: "1",
    name: "HELLO",
    email: "hello@gmail.com",
    phone: "222222",
    companyName: "Global.com",
    status: "active",
  },
  {
    _id: "2",
    name: "Aman Sharma",
    email: "aman@gmail.com",
    phone: "9876543210",
    companyName: "Tech Solutions",
    status: "active",
  },
  {
    _id: "3",
    name: "Rahul Verma",
    email: "rahul@gmail.com",
    phone: "9123456780",
    companyName: "ABC Pvt Ltd",
    status: "inactive",
  },
  {
    _id: "4",
    name: "Priya Singh",
    email: "priya@gmail.com",
    phone: "9988776655",
    companyName: "Digital World",
    status: "active",
  },
  {
    _id: "5",
    name: "Neha Gupta",
    email: "neha@gmail.com",
    phone: "9090909090",
    companyName: "",
    status: "inactive",
  },
]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
 const [openMenu, setOpenMenu] = useState(null);

  const itemsPerPage = 5;

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  const [totalPages, setTotalPages] = useState(1);

  const currentData = users;

  const maxReg = Math.max(...registrationData.map((r) => r.value)); 

  useEffect(() => {
    fetchUsers();
   
  }, [page, search]);
  
  useEffect(() => {
    const handleClickOutside = () => setOpenMenu(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
  
      const res = await API.get("/users", {
        params: {
          page,
          limit: itemsPerPage,
          search
        }
      });
  
      setUsers(res.data.data.users);
      setTotalPages(res.data.data.pagination.pages); // ✅ yaha hona chahiye
  
    } catch (err) {
      toast.error("Failed to load users ❌");
    } finally {
      setLoading(false);
    }
  };

  const [editUser, setEditUser] = useState(null);
  const [deleteUser, setDeleteUser] = useState(null);

  const handleDelete = async () => {
    try {
      await API.delete(`/users/${deleteUser._id}`);
  
      toast.success("User deleted ✅");
  
      setDeleteUser(null);
      fetchUsers();
  
    } catch (err) {
      toast.error("Delete failed ❌");
    }
  };

  return (
    <div className="p-4 w-full sm:p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-semibold">Users</h2>
          <p className="text-xs sm:text-sm text-gray-500">
            Manage user accounts and access
          </p>
        </div>

        {/* <button
          onClick={() => setShowModal(true)}
          className="bg-teal-500 text-white px-4 py-2 rounded-md  text-xs sm:text-sm"
        >
          + Add users
        </button> */}
      </div>

       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((s) => (
          <StatCard key={s.label} stat={s} />
        ))}
      </div>
       
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm font-medium text-gray-700 mb-4">Plan type user</p>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <DonutRing
              segments={[
                { hex: "#a855f7", percent: 25 },
                { hex: "#3b82f6", percent: 25 },
                { hex: "#22c55e", percent: 25 },
                { hex: "#e5e7eb", percent: 25 },
              ]}
              centerValue="1,248"
              centerLabel="Total"
            />
            <div className="space-y-2 w-full">
              {userByType.map((t) => (
                <div key={t.label} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className={`w-2 h-2 rounded-full ${t.color}`} />
                    {t.label}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">{t.value}</span>
                    <span className="text-gray-400">({t.percent})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
 
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm font-medium text-gray-700 mb-4">User Registration</p>
          <div className="flex items-end justify-between h-40 gap-2">
            {registrationData.map((r) => (
              <div key={r.month} className="flex flex-col items-center flex-1 h-full justify-end gap-2">
                <div
                  className="w-full max-w-6 bg-green-400 rounded-sm"
                  style={{ height: `${(r.value / maxReg) * 100}%` }}
                />
                <span className="text-[10px] text-gray-400">{r.month}</span>
              </div>
            ))}
          </div>
        </div>
 
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm font-medium text-gray-700 mb-4">User by Status</p>
          <div className="flex flex-col items-center gap-4">
            <DonutRing
              segments={[
                { hex: "#22c55e", percent: 84 },
                { hex: "#ef4444", percent: 16 },
              ]}
              centerValue="84%"
              centerLabel="Active"
            />
            <div className="w-full space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="w-2 h-2 rounded-full bg-green-500" /> Active
                </div>
                <span className="text-gray-900">1,048 <span className="text-gray-400">84%</span></span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="w-2 h-2 rounded-full bg-red-500" /> Inactive
                </div>
                <span className="text-gray-900">200 <span className="text-gray-400">16%</span></span>
              </div>
            </div>
          </div>
         </div>
        </div>
        
      <div className="bg-white rounded-xl shadow p-4">
        <div className="relative mb-4">
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full pl-10 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm">
            <thead className="text-gray-500 text-left">
              <tr>
                <th className="py-2">Name</th>
                <th>Email</th>
                <th>Phone no</th>
                <th>Company name</th>
                <th className="text-center">Subcription (Plan)</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {currentData.map((u,i) => (
                <tr key={u._id} className="border-t">
                  <td className="py-2 flex items-center gap-2">
                    <span className="w-7 h-7 hidden rounded-full bg-teal-100 text-teal-600 sm:flex items-center justify-center text-xs">
                      {u.name[0]}
                    </span>
                    {u.name}
                  </td>
                  <td>{u.email}</td>
                  <td>{u.phone}</td>
                  <td className=" text-xs sm:text-sm">{u.companyName || "-"}</td>
                    <td className="py-3 text-center relative ">
                                    {/* <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                   
                                      }}
                                      className="text-slate-400 hover:text-slate-600"
                                    >
                                      
                                      Basic
                                    </button> */}
                  
                                    {/* {openMenu === i && (
                                      <div
                                        onClick={(e) => e.stopPropagation()}
                                        className="absolute right-0 top-7 z-20 w-28 bg-white border border-gray-200 rounded-xl shadow-lg p-1.5 flex flex-col gap-1 text-left"
                                      >
                                         <button
                                          className="w-full py-1.5 px-2.5 rounded-lg bg-blue-50 text-blue-600 font-medium text-xs text-left hover:bg-blue-100 transition-colors"
                                        >
                                      Basic
                                        </button>
                                        <button
                                         
                                          className="w-full py-1.5 px-2.5 rounded-lg bg-blue-50 text-blue-600 font-medium text-xs text-left hover:bg-blue-100 transition-colors"
                                        >
                                       Starter
                                        </button>
                                      </div>
                                        )}*/}

                                        Basic
                                      </td> 
                     <td>
                  <span
  onClick={async () => {
    await API.put(`/users/toggle/${u._id}`);
    fetchUsers();
  }}
  className={`cursor-pointer px-2 py-1 rounded-full text-xs ${
    u.status === "active"
      ? "bg-green-100 text-green-600"
      : "bg-gray-200 text-gray-600"
  }`}
>
  {u.status}
</span>
                  </td>

                  <td className="flex gap-3 text-lg">
                    <FiEdit
                      onClick={() => setEditUser(u)}
                      className="cursor-pointer text-blue-500"
                    />
                    {/* <FiTrash2
                      onClick={() => setDeleteUser(u)}
                      className="cursor-pointer text-red-500"
                    />  */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4 text-sm">
          <p>
          Showing {users.length} users
          </p>

          <div className="flex gap-2 items-center">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              className="border px-3 py-1 rounded"
            >
              Previous
            </button>

            <span className="bg-teal-500 text-white px-3 py-1 rounded">
              {page}
            </span>

            <button
              onClick={() => setPage((p) => (p < totalPages ? p + 1 : p))}
              className="border px-3 py-1 rounded"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <AddUserModal setShowModal={setShowModal} setUsers={setUsers} />
      )}

      {editUser && (
        <EditDrawer
          user={editUser}
          setEditUser={setEditUser}
          setUsers={setUsers}
        />
      )}

      {deleteUser && (
        <DeleteModal
          setDeleteUser={setDeleteUser}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
}