import { useMemo, useState } from "react";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  CircleAlert,
  Clock3,
  Download,
  FileText,
  Fingerprint,
  Laptop,
  Pencil,
  Plus,
  Printer,
  RefreshCw,
  SlidersHorizontal,
  Trash2,
  Wifi,
  X,
  Users,
  BriefcaseBusiness,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Line,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Avatar,
  ConfirmDialog,
  EmptyState,
  Modal,
  PageHeading,
  SearchField,
  SelectField,
  StatusBadge,
} from "../components.jsx";
import {
  departments,
  monthlyAttendance,
  semesters,
  weeklyAttendance,
} from "../data.js";

import { ChartCard, ChartTooltip, Panel, StatCard, Table } from "../components.jsx";
export default function SettingsPage({ notify }) {
  const [savedSettings] = useState(() => {
    const stored = sessionStorage.getItem("campus-admin-settings");
    return stored ? JSON.parse(stored) : {};
  });
  const [saved, setSaved] = useState(false);
  const [preferences, setPreferences] = useState(
    () =>
      savedSettings.preferences || {
        attendanceAlerts: true,
        deviceAlerts: true,
        weeklySummary: false,
      },
  );
  const [departmentList, setDepartmentList] = useState(
    () => savedSettings.departments || departments,
  );
  const [semesterList, setSemesterList] = useState(
    () => savedSettings.semesters || semesters,
  );
  function save(event) {
    event.preventDefault();
    const formValues = Object.fromEntries(
      new FormData(event.currentTarget).entries(),
    );
    sessionStorage.setItem(
      "campus-admin-settings",
      JSON.stringify({
        ...formValues,
        preferences,
        departments: departmentList,
        semesters: semesterList,
      }),
    );
    setSaved(true);
    notify("Settings saved in this browser session");
    window.setTimeout(() => setSaved(false), 2500);
  }
  function toggle(key) {
    setPreferences((current) => ({ ...current, [key]: !current[key] }));
  }
  function addSetting(values, setValues, label) {
    const value = window.prompt(`Enter ${label.toLowerCase()} name`);
    if (value?.trim() && !values.includes(value.trim()))
      setValues([...values, value.trim()]);
  }
  return (
    <>
      <PageHeading
        title="Settings"
        description="Manage the campus profile, academic structure and notification preferences."
        actions={
          <button
            className="button button-primary"
            form="settings-form"
            type="submit"
          >
            {saved ? <Check size={16} /> : null}
            {saved ? "Saved" : "Save changes"}
          </button>
        }
      />
      <form id="settings-form" className="settings-layout" onSubmit={save}>
        <div className="settings-main">
          <Panel
            title="College profile"
            description="Basic information shown across the admin workspace."
          >
            <div className="form-grid settings-form-grid">
              <label className="form-field">
                <span>College name *</span>
                <input
                  name="collegeName"
                  defaultValue={
                    savedSettings.collegeName || "Dumkal Polytechnic"
                  }
                  required
                />
              </label>
              <label className="form-field">
                <span>Academic year *</span>
                <select
                  name="academicYear"
                  defaultValue={savedSettings.academicYear || "2025–2026"}
                >
                  <option>2025–2026</option>
                  <option>2026–2027</option>
                  <option>2024–2025</option>
                </select>
              </label>
              <label className="form-field form-full">
                <span>College address</span>
                <input
                  name="collegeAddress"
                  defaultValue={
                    savedSettings.collegeAddress ||
                    "Dumkal, Murshidabad, West Bengal, India"
                  }
                />
              </label>
              
            </div>
          </Panel>
        
          <Panel
            title="Notification preferences"
            description="Choose which updates you would like to receive."
          >
            <div className="preference-list">
              {[
                [
                  "attendanceAlerts",
                  "Attendance alerts",
                  "Notify administrators about unusual attendance changes.",
                ],
                [
                  "deviceAlerts",
                  "Device status alerts",
                  "Get notified when a registered reader disconnects.",
                ],
                [
                  "weeklySummary",
                  "Weekly summary",
                  "Receive a weekly campus attendance summary.",
                ],
              ].map(([key, title, description]) => (
                <div className="preference-row" key={key}>
                  <span>
                    <strong>{title}</strong>
                    <small>{description}</small>
                  </span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={preferences[key]}
                    aria-label={title}
                    className={`switch ${preferences[key] ? "switch-on" : ""}`}
                    onClick={() => toggle(key)}
                  >
                    <i />
                  </button>
                </div>
              ))}
            </div>
          </Panel>
        </div>
        <aside className="settings-side">
      
        </aside>
      </form>
    </>
  );
}
