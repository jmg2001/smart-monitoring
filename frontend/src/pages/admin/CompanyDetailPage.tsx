import { useParams } from "react-router-dom";
import { useState } from "react";

// import CompanyUsersTab from "./tabs/CompanyUsersTab";
import CompanyMachinesTab from "./tabs/CompanyMachinesTab";

export default function CompanyDetailPage() {
  const { companyId } = useParams();
  const [activeTab, setActiveTab] = useState<"machines" | "users">("machines");

  return (
    <div>
      <h1 className="text-3xl font-bold text-red-400 mb-6">Company Detail</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-gray-700">
        <button
          onClick={() => setActiveTab("machines")}
          className={`pb-2 ${
            activeTab === "machines"
              ? "text-red-400 border-b-2 border-red-400"
              : "text-gray-400"
          }`}
        >
          Machines
        </button>

        <button
          onClick={() => setActiveTab("users")}
          className={`pb-2 ${
            activeTab === "users"
              ? "text-red-400 border-b-2 border-red-400"
              : "text-gray-400"
          }`}
        >
          Users
        </button>
      </div>

      {/* Content */}
      {activeTab === "machines" && (
        <CompanyMachinesTab companyId={companyId!} />
      )}

      {/* {activeTab === "users" && <CompanyUsersTab companyId={companyId!} />} */}
    </div>
  );
}
