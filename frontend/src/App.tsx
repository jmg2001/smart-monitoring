import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Overview from "./pages/Overview";
import MachineDetail from "./pages/MachineDetail";
import MachinesPage from "./pages/MachinesPage";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import AdminLayout from "./layouts/AdminLayout";
import AdminOverview from "./pages/admin/AdminOverview";
import CompaniesPage from "./pages/admin/CompaniesPage";
import CompanyDetailPage from "./pages/admin/CompanyDetailPage";
import AdminMachineDetail from "./pages/admin/AdminMachineDetail";

function App() {
  return (
    <Routes>
      {/* PUBLIC ROUTE */}
      <Route path="/login" element={<Login />} />

      {/* CLIENT AREA*/}
      <Route
        element={
          <PrivateRoute roles={["admin", "operator"]}>
            <MainLayout />
          </PrivateRoute>
        }
      >
        <Route path="/" element={<Overview />} />
        <Route path="/machine/:id" element={<MachineDetail />} />
        <Route path="/machines" element={<MachinesPage />} />
      </Route>

      {/* ADMIN AREA */}
      <Route
        path="/admin"
        element={
          <PrivateRoute roles={["super_admin"]}>
            <AdminLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<AdminOverview />} />
        <Route path="companies/" element={<CompaniesPage />} />
        <Route path="companies/:companyId/" element={<CompanyDetailPage />} />
        <Route
          path="companies/:companyId/machine/:machineId/"
          element={<AdminMachineDetail />}
        />
      </Route>
    </Routes>
  );
}

export default App;
