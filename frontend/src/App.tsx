import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import MachineDetail from "./pages/MachineDetail";
import MachinesPage from "./pages/MachinesPage";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import AdminLayout from "./layouts/AdminLayout";
import AdminHome from "./pages/admin/AdminHome";
import CompaniesPage from "./pages/admin/CompaniesPage";
import UsersPage from "./pages/admin/UsersPage";
import AdminMachinesPage from "./pages/admin/AdminMachinePages";
import CompanyMachinesPage from "./pages/admin/CompanyMachinesPage";

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
        <Route path="/" element={<Dashboard />} />
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
        <Route index element={<AdminHome />} />
        <Route path="companies" element={<CompaniesPage />} />
        <Route
          path="companies/:companyId/machines"
          element={<CompanyMachinesPage />}
        />
        <Route path="users" element={<UsersPage />} />
        <Route path="machines" element={<AdminMachinesPage />} />
      </Route>
    </Routes>
  );
}

export default App;
