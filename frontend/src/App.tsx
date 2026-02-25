import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import MachineDetail from "./pages/MachineDetail";
import MachinesPage from "./pages/MachinesPage";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import AdminLayout from "./layouts/AdminLayout";

function App() {
  return (
   <BrowserRouter>
      <Routes>
        {/* Ruta pública */}
        <Route path="/login" element={<Login />} />
        {/* Rutas privadas con layout */}
        {/* Rutas privadas */}
        <Route
          element={
            <PrivateRoute>
              <MainLayout />
            </PrivateRoute>
          }
        >
          <Route path="/" element={<Dashboard />} />
          <Route path="/machine/:id" element={<MachineDetail />} />
          <Route path="/machines" element={<MachinesPage />} />
          <Route path="/login" element={<Login />} />
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
          {/* <Route index element={<AdminHome />} />
          <Route path="companies" element={<CompaniesPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="machines" element={<AdminMachinesPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
