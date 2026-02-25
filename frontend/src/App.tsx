import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import MachineDetail from "./pages/MachineDetail";
import MachinesPage from "./pages/MachinesPage";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/machine/:id" element={<MachineDetail />} />
          <Route path="/machines" element={<MachinesPage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
