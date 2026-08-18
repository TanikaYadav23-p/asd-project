import { useState } from "react";
import {
  Calendar,
  ChevronDown,
  Plus,
  Pencil,
  Trash2,
  Eye,
  Megaphone,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const initialPlans = [
  {
    id: 1,
    planName: "Tirupur to Dubai – T-shirts Export",
    createdOn: "24 Apr 2025, 09:25 AM",
    planId: "PLN-2025-04-24-000123",
    status: "Draft",
    totalEstimatedCost: "₹24,860",
    estimatedTransitTime: "3 – 5 Days",
  },
  {
    id: 2,
    planName: "Mumbai to Dubai – Garments Export",
    createdOn: "25 Apr 2025, 11:10 AM",
    planId: "PLN-2025-04-25-000124",
    status: "Draft",
    totalEstimatedCost: "₹32,450",
    estimatedTransitTime: "4 – 6 Days",
  },
  {
    id: 3,
    planName: "Delhi to London – Textile Export",
    createdOn: "26 Apr 2025, 02:40 PM",
    planId: "PLN-2025-04-26-000125",
    status: "Active",
    totalEstimatedCost: "₹41,280",
    estimatedTransitTime: "7 – 10 Days",
  },
  {
    id: 4,
    planName: "Surat to Dubai – Cotton Export",
    createdOn: "28 Apr 2025, 10:15 AM",
    planId: "PLN-2025-04-28-000126",
    status: "Draft",
    totalEstimatedCost: "₹28,900",
    estimatedTransitTime: "3 – 5 Days",
  },
  {
    id: 5,
    planName: "Chennai to Singapore – Apparel Export",
    createdOn: "30 Apr 2025, 04:20 PM",
    planId: "PLN-2025-04-30-000127",
    status: "Completed",
    totalEstimatedCost: "₹36,750",
    estimatedTransitTime: "5 – 7 Days",
  },
  {
    id: 6,
    planName: "Kolkata to Dubai – Fashion Export",
    createdOn: "02 May 2025, 09:45 AM",
    planId: "PLN-2025-05-02-000128",
    status: "Draft",
    totalEstimatedCost: "₹21,600",
    estimatedTransitTime: "3 – 5 Days",
  },
  {
    id: 7,
    planName: "Bangalore to Dubai – T-shirt Export",
    createdOn: "04 May 2025, 12:30 PM",
    planId: "PLN-2025-05-04-000129",
    status: "Active",
    totalEstimatedCost: "₹30,250",
    estimatedTransitTime: "4 – 6 Days",
  },
  {
    id: 8,
    planName: "Tirupur to London – Clothing Export",
    createdOn: "06 May 2025, 03:10 PM",
    planId: "PLN-2025-05-06-000130",
    status: "Draft",
    totalEstimatedCost: "₹45,900",
    estimatedTransitTime: "8 – 12 Days",
  },
 
 
];

const StatusBadge = ({ status }) => {
  const statusClasses = {
    Draft: "bg-orange-50 text-orange-500 border-orange-200",
    Active: "bg-green-50 text-green-600 border-green-200",
    Completed: "bg-blue-50 text-blue-600 border-blue-200",
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full border text-xs font-medium whitespace-nowrap ${
        statusClasses[status] ||
        "bg-gray-50 text-gray-500 border-gray-200"
      }`}
    >
      {status}
    </span>
  );
};

export default function PlanSummary({
  onAddNew,
  onDelete,
  onEdit,
  onViewDetail,
}) {
  const [plans, setPlans] = useState(initialPlans);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  const totalPages = Math.ceil(plans.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentPlans = plans.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleDelete = (id) => {
    if (onDelete) {
      onDelete(id);
    } else {
      const updatedPlans = plans.filter(
        (plan) => plan.id !== id
      );

      setPlans(updatedPlans);

      const newTotalPages = Math.ceil(
        updatedPlans.length / itemsPerPage
      );

      if (
        currentPage > newTotalPages &&
        newTotalPages > 0
      ) {
        setCurrentPage(newTotalPages);
      }
    }
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className=" bg-white p-4 sm:p-6 ">

     
      <h2 className="text-lg font-bold text-slate-900 mb-4">
        Plan Summary
      </h2>

      {/* ================= TABLE ================= */}
      <div className="border border-slate-200 rounded-2xl overflow-hidden">

        {/* 
          Mobile horizontal scroll
          Desktop also works normally.
        */}
        <div className="w-full overflow-x-auto">

          <table className="w-full min-w-[1150px] text-left">

            {/* ================= TABLE HEADER ================= */}
            <thead>

              <tr className="border-b border-slate-100 bg-slate-50/50">

                <th className="py-4 px-6 text-sm font-semibold text-slate-500 whitespace-nowrap">
                  Plan Name
                </th>

                <th className="py-4 px-6 text-sm font-semibold text-slate-500 whitespace-nowrap">
                  Created On
                </th>

                <th className="py-4 px-6 text-sm font-semibold text-slate-500 whitespace-nowrap">
                  Plan ID
                </th>

                <th className="py-4 px-6 text-sm font-semibold text-slate-500 whitespace-nowrap">
                  Status
                </th>

                <th className="py-4 px-6 text-sm font-semibold text-slate-500 whitespace-nowrap">
                  Total Estimated Cost
                </th>

                <th className="py-4 px-6 text-sm font-semibold text-slate-500 whitespace-nowrap">
                  Estimated Transit Time
                </th>

                <th className="py-4 px-6 text-sm font-semibold text-slate-500 whitespace-nowrap">
                  Action
                </th>

              </tr>

            </thead>

            {/* ================= TABLE BODY ================= */}
            <tbody>

              {currentPlans.length > 0 ? (
                currentPlans.map((plan) => (

                  <tr
                    key={plan.id}
                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition"
                  >

                    {/* Plan Name */}
                    <td className="py-5 px-6">

                      <p className="text-sm font-bold text-slate-800 leading-5 max-w-[240px]">
                        {plan.planName}
                      </p>

                    </td>

                    {/* Created On */}
                    <td className="py-5 px-6">

                      <span className="text-sm font-medium text-slate-700 whitespace-nowrap">
                        {plan.createdOn}
                      </span>

                    </td>

                    {/* Plan ID */}
                    <td className="py-5 px-6">

                      <span className="text-sm font-semibold text-indigo-700 whitespace-nowrap">
                        {plan.planId}
                      </span>

                    </td>

                    {/* Status */}
                    <td className="py-5 px-6">

                      <StatusBadge
                        status={plan.status}
                      />

                    </td>

                    {/* Estimated Cost */}
                    <td className="py-5 px-6">

                      <span className="text-sm font-bold text-slate-800 whitespace-nowrap">
                        {plan.totalEstimatedCost}
                      </span>

                    </td>

                    {/* Transit Time */}
                    <td className="py-5 px-6">

                      <span className="text-sm font-bold text-slate-800 whitespace-nowrap">
                        {plan.estimatedTransitTime}
                      </span>

                    </td>

                    {/* Actions */}
                    <td className="py-5 px-6">

                      <div className="flex items-center gap-2">

                        {/* View */}
                        <button
                          type="button"
                          title="View Details"
                          onClick={() =>
                            onViewDetail?.(plan)
                          }
                          className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition"
                        >
                          <Eye size={17} />
                        </button>

                        {/* Edit */}
                        <button
                          type="button"
                          title="Edit"
                          onClick={() =>
                            onEdit?.(plan)
                          }
                          className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition"
                        >
                          <Pencil size={16} />
                        </button>

                        {/* Delete */}
                        <button
                          type="button"
                          title="Delete"
                          onClick={() =>
                            handleDelete(plan.id)
                          }
                          className="w-8 h-8 rounded-full flex items-center justify-center text-red-500 hover:bg-red-50 transition"
                        >
                          <Trash2 size={16} />
                        </button>

                      </div>

                    </td>

                  </tr>

                ))
              ) : (

                <tr>

                  <td
                    colSpan={7}
                    className="py-12 text-center text-sm text-slate-500"
                  >
                    No plans found.
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* ================= PAGINATION ================= */}
      {plans.length > 0 && (

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">

          {/* Showing text */}
          <p className="text-sm text-slate-500">

            Showing{" "}

            <span className="font-semibold text-slate-700">
              {startIndex + 1}
            </span>

            {" - "}

            <span className="font-semibold text-slate-700">
              {Math.min(
                startIndex + itemsPerPage,
                plans.length
              )}
            </span>

            {" of "}

            <span className="font-semibold text-slate-700">
              {plans.length}
            </span>

            {" plans"}

          </p>

          {/* Pagination controls */}
          <div className="flex items-center gap-1">

            {/* Previous */}
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() =>
                goToPage(currentPage - 1)
              }
              className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <ChevronLeft size={17} />
            </button>

            {/* Page numbers */}
            {Array.from(
              { length: totalPages },
              (_, index) => index + 1
            ).map((page) => (

              <button
                key={page}
                type="button"
                onClick={() =>
                  goToPage(page)
                }
                className={`w-9 h-9 rounded-lg text-sm font-medium transition ${
                  currentPage === page
                    ? "bg-indigo-600 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {page}
              </button>

            ))}

            {/* Next */}
            <button
              type="button"
              disabled={
                currentPage === totalPages
              }
              onClick={() =>
                goToPage(currentPage + 1)
              }
              className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <ChevronRight size={17} />
            </button>

          </div>

        </div>

      )}

    </div>
  );
}