import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

import CompanyUsersTab from "./tabs/CompanyUsersTab";
import CompanyMachinesTab from "./tabs/CompanyMachinesTab";

export default function CompanyDetailPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const { companyId } = useParams();
  const [activeTab, setActiveTab] = useState<"machines" | "users">("machines");

  const companyName = location.state?.companyName;

  return (
    <div>
      <div className="flex justify-between">
        <div>
          <h1 className="text-3xl font-bold text-red-400 mb-6">
            Detalle de empresa - [{companyName}]
          </h1>
        </div>

        <div>
          <button
            className="p-2 h-10 
            bg-red-600 hover:bg-red-500
            text-white font-semibold
            rounded-lg
            shadow-lg
            transition-all duration-300
            hover:cursor-pointer"
            onClick={() => navigate("/admin/companies/")}
          >
            ← Volver
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-gray-700">
        <button
          onClick={() => setActiveTab("machines")}
          className={`pb-2 cursor-pointer ${
            activeTab === "machines"
              ? "text-red-400 border-b-2 border-red-400"
              : "text-gray-400"
          }`}
        >
          Máquinas
        </button>

        <button
          onClick={() => setActiveTab("users")}
          className={`pb-2 cursor-pointer ${
            activeTab === "users"
              ? "text-red-400 border-b-2 border-red-400"
              : "text-gray-400"
          }`}
        >
          Usuarios
        </button>
      </div>

      {/* Content */}
      {activeTab === "machines" && (
        <CompanyMachinesTab companyId={companyId!} companyName={companyName!} />
      )}

      {activeTab === "users" && <CompanyUsersTab companyId={companyId!} />}
    </div>
  );
}
