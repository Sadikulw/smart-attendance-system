import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/public/Home.jsx";
import AdminApp from "./admin/AdminApp.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/*" element={<AdminApp />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
