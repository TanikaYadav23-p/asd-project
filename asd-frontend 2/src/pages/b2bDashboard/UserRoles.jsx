import React, { useState,useEffect } from 'react';
import {
    getDashboard,
    getUsers,
    getActivity,
    getFilterOptions,
    getRoleDistribution,
    getRoles,
    searchUsers,
    inviteUser,
    updateUser,
    changeStatus,
    deleteUser,
} from '../../api/UserRolesApi';
import {
    Search, ChevronDown, Plus, MoreVertical, ChevronLeft,
    ChevronRight, HelpCircle, UserPlus, Users, UserCheck,
    UserX, Shield, Sliders, ArrowRightLeft, FileDown
} from 'lucide-react';

export default function UsersRolesDashboard() {
    
    const [activeTab, setActiveTab] = useState('Users');
    const [dashboard, setDashboard] = useState({});
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [roleDistribution, setRoleDistribution] = useState([]);
    const [activity, setActivity] = useState({});
    const [filterOptions, setFilterOptions] = useState({});

    const [search, setSearch] = useState("");
    const [selectedRole, setSelectedRole] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState("");

    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    
    const fetchDashboard = async () => {
        try {
            const res = await getDashboard();
            console.log("Dashboard:", res.data);
            setDashboard(res.data.data || {});
        } catch (err) {
               console.error(err);
            }
    };
    const fetchUsers = async () => {
        try {
            const res = await getUsers({
            page,
            limit,
            search,
            role: selectedRole,
            status: selectedStatus,
            department: selectedDepartment,});
            console.log("Users:", res.data);
            setUsers(res.data.data || []);
        } catch (err) {
              console.error(err);
            }
    };
    const fetchRoles = async () => {
        try {
            const res = await getRoles();
            console.log("Roles:", res.data);
            setRoles(res.data.data || []);
        } catch (err) {
              console.error(err);
            }
    };
    const fetchRoleDistribution = async () => {
        try {
            const res = await getRoleDistribution();
            console.log("Role Distribution:", res.data);
            setRoleDistribution(res.data.data || []);
        } catch (err) {
              console.error(err);
            }
    };
    const fetchActivity = async () => {
        try {
            const res = await getActivity();
            console.log("Activity:", res.data);
            setActivity(res.data.data || {});
        } catch (err) {
              console.error(err);
            }
    };
    const fetchFilterOptions = async () => {
        try {
            const res = await getFilterOptions();
            console.log("Filter Options:", res.data);
            setFilterOptions(res.data.data || {});
        } catch (err) {
             console.error(err);
            }
    };
    const handleSearch = async () => {
        try {
            const res = await searchUsers(search);
            console.log("Search Users:", res.data);
            setUsers(res.data.data || []);
        } catch (err) {
             console.error(err);
            }
    };

    useEffect(() => {
        fetchDashboard();
        fetchUsers();
        fetchRoles();
        fetchRoleDistribution();
        fetchActivity();
        fetchFilterOptions();
    }, []);
    useEffect(() => {fetchUsers();}, [page, search, selectedRole, selectedStatus, selectedDepartment,]);
    const tabs = ['Users', 'Roles'];
    const gcolors = ["#2563EB", "#10B981", "#FBBF24", "#EF4444", "#8B5CF6", "#06B6D4", "#64748B", "#F97316",];
    const total = roleDistribution.reduce((sum, item) => sum + item.totalUsers, 0);

    // Mock Data for Users Table
    /*const users = [
        { name: "Abhishek B.", isYou: true, phone: "+91 98765 43210", email: "abhishek.b@company.com", role: "Administrator", roleColor: "bg-purple-50 text-purple-700 border-purple-200", dept: "IT", status: "Active", lastLogin: "24 Apr 2025, 09:15 AM" },
        { name: "Neha Sharma", isYou: false, phone: "+91 98765 43211", email: "neha.sharma@company.com", role: "Finance Manager", roleColor: "bg-blue-50 text-blue-700 border-blue-200", dept: "Finance", status: "Active", lastLogin: "24 Apr 2025, 08:42 AM" },
        { name: "Rohit Kumar", isYou: false, phone: "+91 98765 43212", email: "rohit.kumar@company.com", role: "Operations Manager", roleColor: "bg-emerald-50 text-emerald-700 border-emerald-200", dept: "Operations", status: "Active", lastLogin: "24 Apr 2025, 08:21 AM" },
        { name: "Priya Singh", isYou: false, phone: "+91 98765 43213", email: "priya.singh@company.com", role: "Trade Analyst", roleColor: "bg-amber-50 text-amber-700 border-amber-200", dept: "Analytics", status: "Active", lastLogin: "24 Apr 2025, 07:58 AM" },
        { name: "Amit Malhotra", isYou: false, phone: "+91 98765 43214", email: "amit.malhotra@company.com", role: "Document Manager", roleColor: "bg-cyan-50 text-cyan-700 border-cyan-200", dept: "Documentation", status: "Active", lastLogin: "23 Apr 2025, 06:35 PM" },
        { name: "Sunita Shah", isYou: false, phone: "+91 98765 43215", email: "sunita.shah@company.com", role: "Viewer", roleColor: "bg-slate-100 text-slate-700 border-slate-200", dept: "Sales", status: "Active", lastLogin: "23 Apr 2025, 05:12 PM" },
        { name: "Vikram K.", isYou: false, phone: "+91 98765 43216", email: "vikram.k@company.com", role: "Support Executive", roleColor: "bg-indigo-50 text-indigo-700 border-indigo-200", dept: "Support", status: "Active", lastLogin: "23 Apr 2025, 04:40 PM" },
        { name: "Manoj Jain", isYou: false, phone: "+91 98765 43217", email: "manoj.jain@company.com", role: "Viewer", roleColor: "bg-slate-100 text-slate-700 border-slate-200", dept: "Procurement", status: "Inactive", lastLogin: "18 Apr 2025, 11:20 AM" },
    ];*/

    // Colors for Avatar matching names initials
    const avatarColors = ["bg-teal-600", "bg-emerald-600", "bg-amber-600", "bg-indigo-600", "bg-rose-500", "bg-orange-500", "bg-blue-600", "bg-slate-500"];

    return (
        <div className="overflow-y-auto bg-slate-50 text-slate-800 font-sans p-6">

            {/* HEADER SECTION */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 mt-10">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Users & Roles</h1>
                    <p className="text-sm text-slate-500 mt-1">Manage system users and roles. Assign appropriate access and permissions.</p>
                </div>
                <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-sm transition self-start sm:self-center mt-4 sm:mt-0">
                    <Plus size={16} /> Invite User
                </button>
            </div>

            {/* TOP NAVIGATION TABS */}
            <div className="border-b border-slate-200 mb-6 flex gap-6 text-sm font-medium">
                {tabs.map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-3 px-2 border-b-2 transition-all ${activeTab === tab ? 'border-blue-600 text-blue-600 font-bold' : 'border-transparent text-slate-500 hover:text-slate-800'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* STATS CARDS */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
                <StatCard title="Total Users" value={dashboard.totalUsers || 0} change="Current" isNeutral={true} icon={<Users className="text-blue-600" size={16} />} />
                <StatCard title="Active Users" value={dashboard.activeUsers || 0} change="Current" isNeutral={true} icon={<UserCheck className="text-green-600" size={16} />} />
                <StatCard title="Inactive Users" value={dashboard.inactiveUsers || 0} change="Current" isNeutral={true} icon={<UserX className="text-amber-500" size={16} />} />
                <StatCard title="Total Roles" value={dashboard.totalRoles || 0} change="No change" isNeutral={true} icon={<Shield className="text-purple-600" size={16} />} />
                <StatCard title="Admin Users" value={dashboard.adminUsers || 0} change="Current" isNeutral={true} icon={<UserPlus className="text-teal-600" size={16} />} />
            </div>

            {/* FILTERS BAR */}
            <div className="bg-white border border-slate-200 rounded-xl p-3 mb-6 flex flex-col md:flex-row gap-3 items-center shadow-sm">
                <div className="relative w-full md:w-72">
                    <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => {
                        if (e.key === "Enter") handleSearch();}} placeholder="Search by name, email or phone..." className="w-full pl-9 pr-4 py-1.5 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-blue-500" />
                </div>
                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto md:ml-auto">
                    <FilterDropdown label="All Roles" />
                    <FilterDropdown label="All Status" />
                    <FilterDropdown label="All Departments" />
                    <button className="text-xs font-bold text-slate-700 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg flex items-center gap-1 hover:bg-slate-100">
                        More Filters 🎚️
                    </button>
                    <button className="text-xs font-bold text-blue-600 hover:underline">Reset</button>
                </div>
            </div>

            {/* MAIN TABLE SECTION */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm mb-6">
                <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white">
                    <h2 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Showing 1 to {users.length} of {users.length} users</h2>
                    <button className="text-xs font-bold text-blue-600 border border-blue-100 px-3 py-1.5 rounded-lg bg-blue-50/50 hover:bg-blue-50 flex items-center gap-1">
                        <Sliders size={12} /> Customize Columns
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse whitespace-nowrap">
                        <thead>
                            <tr className="bg-slate-50/60 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                <th className="p-4 w-4"><input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" /></th>
                                <th className="p-4">User</th>
                                <th className="p-4">Email</th>
                                <th className="p-4">Role</th>
                                <th className="p-4">Department</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Last Login</th>
                                <th className="p-4 w-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                            {users.map((user, index) => (
                                <tr key={index} className="hover:bg-slate-50/40 transition">
                                    <td className="p-4"><input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" /></td>
                                    <td className="p-4 flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-full ${avatarColors[index % avatarColors.length]} text-white flex items-center justify-center font-bold text-xs`}>
                                            {user.name ? user.name.split(" ").map((n) => n[0]).join("") : "U"}
                                        </div>
                                        <div>
                                            <div className="font-bold text-slate-900 flex items-center gap-1">
                                                {user.name}
                                                {user.isYou && <span className="text-[10px] bg-blue-50 text-blue-600 font-extrabold px-1 py-0.2 rounded border border-blue-100">You</span>}
                                            </div>
                                            <div className="text-[11px] text-slate-400 mt-0.5">{user.phone}</div>
                                        </div>
                                    </td>
                                    <td className="p-4 text-slate-600">{user.email}</td>
                                    <td className="p-4">
                                        <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold border ${user.roleColor}`}>
                                            {user.roleId?.name || "-"}
                                        </span>
                                    </td>
                                    <td className="p-4 text-slate-500">{user.department?.name || "-"}</td>
                                    <td className="p-4">
                                        <span className="flex items-center gap-1.5 font-bold">
                                            <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`} />
                                            {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className="p-4 text-slate-500">{user.lastLogin ? new Date(user.lastLogin).toLocaleString() : "Never"}</td>
                                    <td className="p-4 text-slate-400 cursor-pointer hover:text-slate-600"><MoreVertical size={16} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* PAGINATION */}
                <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-semibold bg-white">
                    <span>Showing 1 to {users.length} of {users.length} users</span>
                    <div className="flex items-center gap-1">
                        <button className="p-1 border border-slate-200 rounded text-slate-400 hover:bg-slate-50"><ChevronLeft size={14} /></button>
                        <button className="px-2.5 py-1 bg-blue-600 text-white rounded font-bold">1</button>
                        <button className="px-2.5 py-1 border border-slate-200 text-slate-600 rounded hover:bg-slate-50">2</button>
                        <button className="px-2.5 py-1 border border-slate-200 text-slate-600 rounded hover:bg-slate-50">3</button>
                        <span className="px-1 text-slate-300">...</span>
                        <button className="px-2.5 py-1 border border-slate-200 text-slate-600 rounded hover:bg-slate-50">5</button>
                        <button className="p-1 border border-slate-200 rounded text-slate-400 hover:bg-slate-50"><ChevronRight size={14} /></button>
                    </div>
                </div>
            </div>

            {/* BOTTOM SECTION: ROLE DISTRIBUTION & QUICK ACTIONS */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* ROLE DISTRIBUTION (DONUT CHART) */}
                <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col justify-between">
                    <h3 className="font-bold text-sm text-slate-900 mb-4">Role Distribution</h3>
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        {/* Real SVG Ring Donut representation */}
                        <div className="relative w-28 h-28 flex-shrink-0">
                           <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                            {/* Background */}
                            <circle cx="18" cy="18" r="15.91" fill="none" stroke="#E2E8F0" strokeWidth="3"/>
                            {(() => {let offset = 0;
                            return roleDistribution.map((role, index) => {
                                const percentage = (role.totalUsers / total) * 100;
                                const circle = (
                                <circle key={index} cx="18" cy="18" r="15.91" fill="none" stroke={gcolors[index % gcolors.length]} strokeWidth="3" strokeDasharray={`${percentage} ${100 - percentage}`} strokeDashoffset={-offset}/>
                            );
                            offset += percentage;
                            return circle;
                            });
                            })()}
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-base font-bold text-slate-800">{roleDistribution.reduce((sum,item)=>sum+item.totalUsers,0)}</span>
                                <span className="text-[9px] text-slate-400 uppercase tracking-wider font-bold">Total</span>
                            </div>
                        </div>
                        {/* Grid Legends */}
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[10px] w-full sm:w-auto flex-1">
                            {roleDistribution.map((role, index) => {
                                const colors = ["bg-blue-600", "bg-emerald-500", "bg-amber-400", "bg-purple-500", "bg-indigo-400", "bg-slate-400", "bg-rose-400", "bg-cyan-500"];
                                return (
                                <LegendItem key={index} color={colors[index % colors.length]} title={role._id} value={`${role.totalUsers} (${((role.totalUsers / total) * 100).toFixed(1)}%)`}/>);
                            })}
                        </div>
                    </div>
                </div>

                {/* QUICK ACTIONS CARDS */}
                <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                    <h3 className="font-bold text-sm text-slate-900 mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-3">
                        <ActionCard icon="➕" title="Create New Role" desc="Add a new role and define permissions" color="text-blue-600" />
                        <ActionCard icon="📊" title="Role Permissions Matrix" desc="View and manage role permissions" color="text-indigo-600" />
                        <ActionCard icon="📥" title="Bulk User Import" desc="Import multiple users via CSV" color="text-amber-600" />
                        <ActionCard icon="📄" title="Download User Report" desc="Export users list and details" color="text-emerald-600" />
                    </div>
                </div>

                {/* USER ACTIVITY STATUS LIST */}
                <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col justify-between">
                    <h3 className="font-bold text-sm text-slate-900 mb-4">User Activity (Last 7 Days)</h3>
                    <div className="space-y-3">
                        <ActivityMetricsRow icon="🟩" label="New Users Added" value={activity.newUsers || 0} />
                        <ActivityMetricsRow icon="🟦" label="Users Logged In" value={activity.loggedInUsers || 0} />
                        <ActivityMetricsRow icon="🟧" label="Inactive Users" value={activity.inactiveUsers || 0} />
                        <ActivityMetricsRow icon="🟥" label="Password Resets" value={activity.passwordResets || 0} />
                    </div>
                </div>

            </div>

            {/* FOOTER AUTOMATIC SAVE REMINDER */}
            <div className="flex justify-between items-center text-[11px] text-slate-400 font-medium mt-6 pt-4 border-t border-slate-200">
                <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full inline-block"></span>
                    All data is updated daily. Last updated on 24 Apr 2025, 09:30 AM
                </span>
                <span className="hover:text-slate-600 cursor-pointer flex items-center gap-0.5"><HelpCircle size={12} /> Help Center</span>
            </div>

        </div>
    );
}

{/* --- INNER HELPER SUB-COMPONENTS FOR SCANNABILITY --- */ }

function StatCard({ title, value, change, isPositive, isNeutral, icon }) {
    return (
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-500">{title}</span>
                <div className="p-1.5 bg-slate-50 rounded-lg">{icon}</div>
            </div>
            <div>
                <h4 className="text-xl font-bold text-slate-900 tracking-tight">{value}</h4>
                <span className={`text-[10px] font-bold flex items-center gap-1 mt-0.5 ${isNeutral ? 'text-slate-400' : isPositive ? 'text-green-600' : 'text-red-500'
                    }`}>
                    {change} <span className="text-slate-400 font-normal">vs last month</span>
                </span>
            </div>
        </div>
    );
}

function FilterDropdown({ label }) {
    return (
        <div className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 flex items-center gap-1.5 cursor-pointer hover:bg-slate-50 text-xs font-semibold text-slate-700">
            <span>{label}</span>
            <ChevronDown size={14} className="text-slate-400" />
        </div>
    );
}

function LegendItem({ color, title, value }) {
    return (
        <div className="flex flex-col justify-center">
            <div className="flex items-center gap-1 text-slate-500 font-medium max-w-[90px] truncate">
                <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${color}`} />
                <span className="truncate">{title}</span>
            </div>
            <span className="font-bold text-slate-800 pl-2.5 mt-0.5">{value}</span>
        </div>
    );
}

function ActionCard({ icon, title, desc }) {
    return (
        <div className="border border-slate-150 rounded-lg p-3 hover:bg-slate-50 transition cursor-pointer flex flex-col justify-between group">
            <div>
                <div className="text-lg bg-slate-50 border border-slate-100 w-7 h-7 rounded-md flex items-center justify-center">{icon}</div>
                <h4 className="font-bold text-slate-800 text-xs mt-2 group-hover:text-blue-600 transition-colors">{title}</h4>
                <p className="text-[10px] text-slate-400 mt-0.5 font-medium leading-tight line-clamp-2">{desc}</p>
            </div>
            <span className="text-blue-600 text-[10px] font-bold mt-2 inline-flex items-center gap-0.5">Explore ➜</span>
        </div>
    );
}

function ActivityMetricsRow({ icon, label, value }) {
    return (
        <div className="flex items-center justify-between text-xs py-1">
            <div className="flex items-center gap-2 font-semibold text-slate-600">
                <span className="text-sm">{icon}</span>
                <span>{label}</span>
            </div>
            <span className="font-bold text-slate-900 text-sm">{value}</span>
        </div>
    );
}