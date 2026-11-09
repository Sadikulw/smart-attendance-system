import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { DashboardLayout as Layout, LoginGate, RegisterGate, Toast } from "./components.jsx";
import { initialAttendance, initialFaculty, initialStudents } from "./data.js";
import "./admin.css";

const OverviewPage = lazy(() => import("./pages/OverviewPage.jsx"));
const StudentsPage = lazy(() => import("./pages/StudentsPage.jsx"));
const FacultyPage = lazy(() => import("./pages/FacultyPage.jsx"));
const AttendancePage = lazy(() => import("./pages/AttendancePage.jsx"));
const DevicesPage = lazy(() => import("./pages/DevicesPage.jsx"));
const ReportsPage = lazy(() => import("./pages/ReportsPage.jsx"));
const SettingsPage = lazy(() => import("./pages/SettingsPage.jsx"));

function ProtectedWorkspace() {
  const [collapsed, setCollapsed] = useState(false);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState("");
  const location = useLocation();
  const { title } = pageFor(location.pathname);
  useEffect(() => {
    if (!sessionStorage.getItem("campus-admin-demo")) return;
    document.title = `${title} | Smart Attendance`;
  }, [location.pathname]);

  if (!sessionStorage.getItem("campus-admin-demo")) return <Navigate to="/admin/login" replace />;
  return <WorkspaceContent collapsed={collapsed} setCollapsed={setCollapsed} search={search} setSearch={setSearch}
    toast={toast} setToast={setToast} title={title} />;
}

function pageFor(path) {
  const pages = {
    "/admin": ["Overview", OverviewPage],
    "/admin/students": ["Students", StudentsPage],
    "/admin/faculty": ["Faculty", FacultyPage],
    "/admin/attendance": ["Attendance", AttendancePage],
    "/admin/devices": ["RFID devices", DevicesPage],
    "/admin/reports": ["Reports & analytics", ReportsPage],
    "/admin/settings": ["Settings", SettingsPage],
  };
  return pages[path] ? { title: pages[path][0], Component: pages[path][1] } : { title: "Overview", Component: OverviewPage };
}

function WorkspaceContent({ collapsed, setCollapsed, search, setSearch, toast, setToast, title }) {
  const [students, setStudents] = useState(initialStudents);
  const [faculty, setFaculty] = useState(initialFaculty);
  const [attendance, setAttendance] = useState(initialAttendance);
  const location = useLocation();
  const navigate = useNavigate();
  const { Component } = pageFor(location.pathname);
  const toastTimer = useRef(null);
  const notify = (message) => {
    setToast(message);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(""), 3200);
  };
  return <>
    <Layout title={title} collapsed={collapsed} setCollapsed={setCollapsed} search={search} setSearch={setSearch}>
      <Suspense fallback={<div className="page-loading" role="status">Loading dashboard…</div>}>
        <Component students={students} attendance={attendance} faculty={faculty}
          records={title === "Students" ? students : faculty} setRecords={title === "Students" ? setStudents : setFaculty}
          setAttendance={setAttendance} globalSearch={search} notify={notify}
          onNavigate={(path) => navigate(path)} />
      </Suspense>
    </Layout>
    <Toast message={toast} onClose={() => setToast("")} />
  </>;
}

export default function AdminApp() {
  return <Routes>
    <Route path="login" element={<LoginGate />} />
    <Route path="register" element={<RegisterGate />} />
    <Route path="*" element={<ProtectedWorkspace />} />
  </Routes>;
}
