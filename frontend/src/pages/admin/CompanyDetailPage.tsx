import { useParams, useLocation } from "react-router-dom";
import { useState } from "react";

import CompanyUsersTab from "./tabs/CompanyUsersTab";
import CompanyMachinesTab from "./tabs/CompanyMachinesTab";

export default function CompanyDetailPage() {
  const { companyId } = useParams();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<"machines" | "users">("machines");

  const companyName = location.state?.companyName;

  return (
    <div>
      <h1 className="text-3xl font-bold text-red-400 mb-6">
        Detalle de empresa - [{companyName}]
      </h1>

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
        <CompanyMachinesTab companyId={companyId!} />
      )}

      {activeTab === "users" && <CompanyUsersTab companyId={companyId!} />}
    </div>
  );
}
