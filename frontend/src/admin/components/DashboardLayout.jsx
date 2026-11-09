import { useState } from "react";
import { Bell, ChevronDown, ChevronRight, CircleHelp, Fingerprint, LayoutDashboard, LogOut, Menu, PanelLeftClose, PanelLeftOpen, Settings, Users, UserRound, X, ClipboardCheck, ChartNoAxesCombined } from "lucide-react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import Avatar from "./Avatar.jsx";
import SearchField from "./SearchField.jsx";
import { navigation } from "./navigation.js";
export default function DashboardLayout({ children, title, collapsed, setCollapsed, search, setSearch }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [noticeOpen, setNoticeOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const adminName = sessionStorage.getItem("campus-admin-name") || "System Admin";
  const adminInitials = adminName.split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase();
  const current = navigation.find((item) => item.path === location.pathname) || navigation[0];
  const date = new Intl.DateTimeFormat("en", { weekday: "short", month: "short", day: "numeric", year: "numeric" }).format(new Date());
  const logout = () => {
    sessionStorage.removeItem("campus-admin-demo");
    sessionStorage.removeItem("campus-admin-name");
    navigate("/admin/login");
  };
  const navContents = <>
    <Link to="/admin" className="brand-lockup" aria-label="Smart Attendance overview">
      <span className="brand-icon"><img src="/college/college_logo.png" alt="" /></span>
      <span className="brand-name"><strong>SMART ATTENDANCE</strong><small>Campus administration</small></span>
    </Link>
    <div className="sidebar-section-label">WORKSPACE</div>
    <nav className="sidebar-nav" aria-label="Main navigation">
      {navigation.map(({ label, path, icon: Icon, end }) => <NavLink key={path} to={path} end={end}
        title={collapsed ? label : undefined} onClick={() => setDrawerOpen(false)} className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
        <Icon size={18} strokeWidth={1.8} /><span>{label}</span>
      </NavLink>)}
    </nav>
    <div className="sidebar-bottom">
     
      <div className="sidebar-profile">
        <Avatar initials={adminInitials} small /><div className="profile-info"><strong>{adminName}</strong><span>Administrator</span></div>
        <button className="profile-logout" aria-label="Log out" title="Log out" onClick={logout}><LogOut size={16} /></button>
      </div>
    </div>
  </>;

  return <div className={`admin-shell ${collapsed ? "sidebar-collapsed" : ""}`}>
    {drawerOpen && <button className="drawer-scrim" aria-label="Close navigation" onClick={() => setDrawerOpen(false)} />}
    <aside className={`admin-sidebar ${drawerOpen ? "drawer-open" : ""}`}>
      {navContents}
      <button className="sidebar-collapse" onClick={() => setCollapsed(!collapsed)} aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}>
        {collapsed ? <PanelLeftOpen size={16} /> : <><PanelLeftClose size={16} /><span>Collapse menu</span></>}
      </button>
    </aside>
    <div className="admin-main">
      <header className="topbar">
        <button className="mobile-menu icon-button" aria-label="Open navigation" onClick={() => setDrawerOpen(true)}><Menu size={20} /></button>
        <div className="topbar-title"><span>Workspace</span><ChevronRight size={14} /><strong>{title || current.label}</strong></div>
        <div className="topbar-right">
          <SearchField value={search} onChange={setSearch} placeholder="Search students, records..." />
          <span className="topbar-date">{date}</span>
          <div className="dropdown-wrap">
            <button className={`icon-button notification-button ${noticeOpen ? "is-open" : ""}`} aria-label="Notifications" onClick={() => { setNoticeOpen(!noticeOpen); setProfileOpen(false); }}>
              <Bell size={18} /><i />
            </button>
            {noticeOpen && <div className="popover notice-popover"><strong>Notifications</strong><p>No new notifications</p><small>System alerts will appear here.</small></div>}
          </div>
          <div className="dropdown-wrap">
            <button className="topbar-profile" onClick={() => { setProfileOpen(!profileOpen); setNoticeOpen(false); }}>
              <Avatar initials={adminInitials} small /><span>Admin</span><ChevronDown size={14} />
            </button>
            {profileOpen && <div className="popover profile-popover"><div className="popover-user"><Avatar initials={adminInitials} small /><span><strong>{adminName}</strong><small>Admin preview</small></span></div>
              <button onClick={() => navigate("/admin/settings")}><Settings size={15} /> Settings</button>
              <button onClick={logout}><LogOut size={15} /> Sign out</button>
            </div>}
          </div>
        </div>
      </header>
      <main className="dashboard-content">{children}</main>
      <footer className="admin-footer"><span>Smart Attendance · Admin preview</span><span>Mock data only · No live backend connection</span></footer>
    </div>
    {drawerOpen && <button className="drawer-close mobile-menu" aria-label="Close navigation" onClick={() => setDrawerOpen(false)}><X size={18} /></button>}
  </div>;
}
