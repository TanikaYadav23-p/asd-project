import {
    Download, CreditCard, Phone, Mail, Crown, RefreshCcw, Ban, Wallet, CircleDollarSign, Package, FileText, Code2, ChevronRight, MessageCircle
} from "lucide-react";

import crown from "../../assets/Images/webp/crown.webp"

   const invoices = [
        {
            id: "INV-2025-0425",
            date: "25 Apr 2025",
            amount: "₹24,860.00",
            status: "Paid",
            payment: "VISA ••••4242"
        },
        {
            id: "INV-2024-0425",
            date: "25 Apr 2024",
            amount: "₹24,860.00",
            status: "Paid",
            payment: "VISA ••••4242"
        },
        {
            id: "INV-2023-0425",
            date: "25 Apr 2023",
            amount: "₹19,999.00",
            status: "Paid",
            payment: "VISA ••••4242"
        },
        {
            id: "INV-2022-0425",
            date: "25 Apr 2022",
            amount: "₹19,999.00",
            status: "Paid",
            payment: "VISA ••••4242"
        },
        {
            id: "INV-2021-0425",
            date: "25 Apr 2021",
            amount: "₹17,999.00",
            status: "Paid",
            payment: "VISA ••••4242"
        }
    ];

 function ActionRow({ icon, label, danger = false }) {
        return (
            <div className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-4">
                    <div
                        className={`w-11 h-11 rounded-full flex items-center justify-center ${danger ? "bg-red-50" : "bg-blue-50"
                            }`}
                    >
                        {icon}
                    </div>

                    <span
                        className={`text-sm  font-medium ${danger ? "text-red-500" : "text-gray-700"
                            }`}
                    >
                        {label}
                    </span>
                </div>

                <ChevronRight size={20} className="text-gray-300" />
            </div>
        );
    }

    function InfoRow({ title, value }) {
        return (
            <div className="flex justify-between">
                <span className="font-semibold text-xs ">{title}</span>
                <span className="font-medium text-xs">{value}</span>
            </div>
        );
    }

    function ActionItem({ icon, label, danger }) {
        return (
            <div className={`flex gap-3 items-center ${danger ? "text-red-500" : ""}`}>
                {icon}
                {label}
            </div>
        );
    }
    
    
    export default function Subscription() {

   
    return (
        <div className="min-h-screen bg-gray-50 p-5 pt-20">
            {/* Header */}
            <nav className="flex items-center text-sm mb-2">
                <span className="text-gray-400">Dashboard</span>
                <span className="mx-2 text-gray-300">&gt;</span>
                <span className="font-semibold text-[#111827]">Subscription</span>
            </nav>
            
            <div className="flex justify-between items-center mt-4">
                <div>
                    <h1 className="text-xl font-bold">Subscription</h1>
                    <p className="text-gray-500 font-xs  mt-2">
                        Manage your plan, billing and payment preferences.
                    </p>
                </div>

                <button className="border rounded-lg px-4 py-2 flex gap-2 items-center">
                    <Download size={16} />
                    Download Invoice
                </button>
            </div>

            {/* Top cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
                {/* Current Plan */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border-b-gray-800">
                    <p className="font-bold font-sm">Current Plan</p>
                    <span className="bg-green-100 text-[#166534] px-3 py-1 rounded text-xs inline-block mt-3">
                        Pro Plan
                    </span>

                    <div className="flex justify-between items-center mt-6">
                        <div>
                            <h2 className="text-3xl font-bold">₹24,860 <span className="text-gray-400 text-sm font-medium">/ year</span></h2>

                        </div>

                        <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
                            <img src={crown} className="text-blue-500 text-4xl" />
                        </div>
                    </div>

                    <p className="mt-4 text-gray-400 text-sm">Renews on</p>
                    <p className="font-semibold">25 Apr 2026</p>

                    <button className="mt-5 w-full text-sm bg-[#007d88] text-white py-3 rounded-lg">
                        Manage Plan
                    </button>
                </div>

                {/* Usage */}
                <div className="bg-white rounded-2xl p-6  shadow-sm border-b-gray-800" >
                    <h3 className="font-bold font-sm text-black-800 mb-6 gap-5">Usage Summary</h3>

                    {[
                        {
                            icon: <Package size={18} className="text-black-500" />,
                            label: "Shipments",
                            value: "156 / 1000",
                            progress: 16
                        },
                        {
                            icon: <FileText size={18} className="text-black-500" />,
                            label: "Documents Storage",
                            value: "2.4 GB / 10 GB",
                            progress: 24
                        },
                        {
                            icon: <Code2 size={18} className="text-black-500" />,
                            label: "HS Code Lookups",
                            value: "1,248 / 5,000",
                            progress: 24
                        },
                    ].map((item, i) => (
                        <div key={i} className="mb-12 last:mb-0 " >
                            <div className="flex items-center justify-between gap-3">
                                {/* Left */}
                                <div className="flex items-center gap-2 min-w-[110px]">
                                    {item.icon}
                                    <span className="text-[12px] text-black-700">
                                        {item.label}
                                    </span>
                                </div>

                                {/* Progress + count */}
                                <div className="flex items-center gap-3 flex-1">
                                    <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-blue-500 rounded-full"
                                            style={{ width: `${item.progress}%` }}
                                        />
                                    </div>

                                    <span className="text-xs text-gray-400 whitespace-nowrap">
                                        {item.value}
                                    </span>
                                </div>

                                {/* Percentage */}
                                <span className="text-xs font-bold text-black-700 w-8 text-right">
                                    {item.progress}%
                                </span>
                            </div>
                        </div>
                    ))}

                    <div className="flex justify-center mt-8">
                        <button className="flex items-center gap-1 text-l text-sm font-medium text-teal-600 hover:text-teal-700">
                            View Usage Details
                            <ChevronRight size={15} />
                        </button>
                    </div>
                </div>

                {/* Billing */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border-b-gray-800 ">
                    <div className="flex justify-between">
                        <h3 className="font-bold font-sm">Billing Information</h3>
                        <span className="bg-green-100 text-green-600 px-3 rounded-full text-sm">
                            Active
                        </span>
                    </div>

                    <div className="space-y-4 mt-6 text-black-700">
                        <InfoRow title="Billing Cycle" value="Yearly" />
                        <InfoRow title="Plan Amount" value="₹24,860.00" />
                        <InfoRow title="Next Billing Date" value="25 Apr 2026" />
                        <InfoRow title="Payment Method" value="VISA ****4242" />
                    </div>

                    <button className="w-full mt-10 border text-sm border-blue-700 text-blue-500 rounded-lg py-3 font-bold">
                        View Billing History
                        {/* <ChevronRight size={15} /> */}
                    </button>

                </div>
            </div>

            {/* Middle section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
                {/* Invoices */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                    <div className="px-6 py-5">
                        <h3 className=" font-bold text-sm text-gray-800">
                            Invoices
                        </h3>
                    </div>
                    <table className="w-full">
                        <thead className="bg-gray-50 border-y">
                            <tr className="text-left text-[18px] text-gray-600">
                                <th className="px-6  py-4 text-xs font-semibold">Invoice ID</th>
                                <th className="py-4 text-xs font-semibold">Date</th>
                                <th className="py-4 text-xs font-semibold">Amount (INR)</th>
                                <th className="py-4 text-xs font-semibold">Status</th>
                                <th className="py-4 text-xs font-semibold">Payment Method</th>
                                <th className="py-4 text-xs font-semibold">Download</th>
                            </tr>
                        </thead>

                        <tbody>
                            {invoices.map((invoice, i) => (
                                <tr key={i} className="border-b last:border-b-0">
                                    <td className="px-6 py-5 font-semibold text-xs text-gray-700">
                                        {invoice.id}
                                    </td>

                                    <td className="text-gray-700 text-xs">
                                        {invoice.date}
                                    </td>

                                    <td className="font-semibold text-gray-800 text-xs">
                                        {invoice.amount}
                                    </td>

                                    <td>
                                        <span className="bg-green-100 text-green-700 text-xs px-4 py-1 rounded-full m">
                                            {invoice.status}
                                        </span>
                                    </td>

                                    <td>
                                        <span className="text-blue-700 font-semibold text-xs">
                                            VISA
                                        </span>
                                        <span className="ml-2 text-gray-700 font-semibold text-xs">
                                            ••••4242
                                        </span>
                                    </td>

                                    <td>
                                        <Download
                                            size={18}
                                            className="text-gray-400 cursor-pointer text-xs"
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="px-6 py-4 border-t flex justify-between items-center">
                        <p className="text-sm text-gray-400">
                            Showing 1 to 5 of 8 invoices
                        </p>

                        <button className="flex items-center gap-2 text-teal-500 font-semibold text-sm">
                            View All Invoices
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>


                {/* Side cards */}
                <div className="space-y-5">
                    {/* Payment Method */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                        <h3 className=" font-semibold text-gray-800 mb-6">
                            Payment Method
                        </h3>

                        <div className="border border-gray-200 rounded-2xl px-5 py-6 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                {/* VISA Badge */}
                                <div className="bg-gray-100 px-3 py-2 rounded-lg">
                                    <span className="text-blue-700 font-bold text-lg">
                                        VISA
                                    </span>
                                </div>

                                {/* Card Info */}
                                <div>
                                    <p className="text-l font-bold text-sm text-gray-800">
                                        Visa ending in 4242
                                    </p>
                                    <p className="text-gray-400 text-l">
                                        Expires 12/27
                                    </p>
                                </div>
                            </div>

                            {/* Default Badge */}
                            <span className="bg-green-100 text-green-600 px-4 py-2 rounded-md text-xs font-semibold">
                                DEFAULT
                            </span>
                        </div>
                    </div>

                    {/* Subscription Actions */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                        <h3 className=" font-semibold text-gray-800 mb-6">
                            Subscription Actions
                        </h3>

                        <div className="space-y-6 text-sm">
                            <ActionRow
                                icon={<RefreshCcw size={18} className="text-blue-500" />}
                                label="Change Plan"
                            />

                            <ActionRow
                                icon={<Wallet size={18} className="text-blue-500" />}
                                label="Update Payment Method"
                            />

                            <ActionRow
                                icon={<Ban size={18} className="text-red-400" />}
                                label="Cancel Subscription"
                                danger
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Support */}
            <div className="bg-white border border-gray-200 rounded-2xl mt-6 px-7 py-7 shadow-sm">
                <div className="flex   flex-col md:flex-row items-center justify-between gap-6">

                    {/* Left Section */}
                    <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-full bg-teal-50 flex items-center justify-center">
                            <MessageCircle size={24} className="text-teal-500" />
                        </div>

                        <div>
                            <h3 className=" text-gray-900 font-bold text-sm">
                                Need Help?
                            </h3>
                            <p className="text-gray-400 text-xs mt-1 ">
                                Our support team is here to help you with any subscription related queries.
                            </p>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="flex f  items-center gap-5 mt-5">
                        <span className="flex items-center gap-3 text-sm font-medium whitespace-nowrap text-gray-900 text-l">
                            <Phone size={18} className="text-gray-400" />
                            +91 2212345678
                        </span>

                        <span className="flex items-center gap-3 text-sm font-medium text-gray-900 text-l">
                            <Mail size={20} className="text-gray-400" />
                            support@asdcargomate.com
                        </span>
                        {/* Button */}
                        <button className="flex gap-3 border whitespace-nowrap text-sm border-gray-200 rounded-xl px-8 py-4 text-l font-medium text-gray-900 hover:bg-gray-50">
                            <MessageCircle size={14} className="mt-1" />
                            Contact Support
                        </button>
                    </div>


                </div>
            </div>
        </div>
    );
}

