

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

            <div className="flex gap-4 items-center mb-3">
              <div className="w-14 h-14 border rounded-md flex items-center justify-center text-gray-400">
                <FiCamera />
              </div>
              <p className="text-xs text-gray-400">
                Upload Photo JPG, PNG up to 2 MB
              </p>
            </div>

            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Full Name"
              className="w-full border px-3 py-2 rounded mb-2"
            />

            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
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

          <div className="border-t pt-4">
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
          </div>

          <div className="border-t pt-4">
            <p className="text-sm font-medium mb-2">Company Info</p>

            <input
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              placeholder="Company Name"
              className="w-full border px-3 py-2 rounded mb-2"
            />

            <input
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
          </div>

          <div className="border-t pt-4">
            <p className="text-sm font-medium mb-2">Status</p>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.checked })}
              />
              <span className="text-sm">Active</span>
            </div>
          </div>

          <div className="border-t pt-4">
            <p className="text-sm font-medium mb-2">Subscription</p>

            <div className="grid grid-cols-2 gap-2">
              <select
                value={form.plan}
                onChange={(e) => setForm({ ...form, plan: e.target.value })}
                className="border px-3 py-2 rounded"
              >
                <option>Pro</option>
                <option>Basic</option>
              </select>

              <input
                type="date"
                value={form.expiry}
                onChange={(e) => setForm({ ...form, expiry: e.target.value })}
                className="border px-3 py-2 rounded"
              />
            </div>
          </div>

          <div className="border-t pt-4 space-y-2">
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
          </div>

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



export default function UsersSection({ setShowNotice }) {
 
const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const itemsPerPage = 5;

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  const [totalPages, setTotalPages] = useState(1);

  const currentData = users;

  useEffect(() => {
    fetchUsers();
   
  }, [page, search]);
  
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

        <button
          onClick={() => setShowModal(true)}
          className="bg-teal-500 text-white px-4 py-2 rounded-md  text-xs sm:text-sm"
        >
          + Add users
        </button>
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
                <th>Password</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {currentData.map((u) => (
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
                  <td>-</td>
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
                    <FiTrash2
                      onClick={() => setDeleteUser(u)}
                      className="cursor-pointer text-red-500"
                    />
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