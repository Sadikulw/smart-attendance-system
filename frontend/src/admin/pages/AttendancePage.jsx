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
import { downloadCsv, downloadExcel, downloadPdf } from "../utils/downloads.js";
export default function AttendancePage({
  attendance,
  setAttendance,
  globalSearch,
  notify,
}) {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All departments");
  const [semester, setSemester] = useState("All semesters");
  const [status, setStatus] = useState("All statuses");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [audit, setAudit] = useState([]);
  const query = `${search} ${globalSearch}`.trim().toLowerCase();
  const rows = useMemo(
    () =>
      attendance.filter(
        (row) =>
          (!query ||
            `${row.name} ${row.roll} ${row.uid}`
              .toLowerCase()
              .includes(query)) &&
          (department === "All departments" || row.department === department) &&
          (semester === "All semesters" || row.semester === semester) &&
          (status === "All statuses" || row.status === status) &&
          (!dateStart || row.date >= dateStart) &&
          (!dateEnd || row.date <= dateEnd),
      ),
    [attendance, query, department, semester, status, dateStart, dateEnd],
  );
  const present = rows.filter((row) => row.status === "Present").length;
  const absent = rows.filter((row) => row.status === "Absent").length;
  const late = rows.filter((row) => row.status === "Late").length;
  function correct(row) {
    const newStatus = row.status === "Present" ? "Absent" : "Present";
    setAttendance((records) =>
      records.map((item) =>
        item.id === row.id ? { ...item, status: newStatus } : item,
      ),
    );
    setAudit((events) => [
      {
        id: `${Date.now()}`,
        text: `${row.name}: ${row.status} → ${newStatus}`,
        time: new Date().toLocaleString(),
      },
      ...events,
    ]);
    notify(`Attendance corrected to ${newStatus}; audit entry recorded`);
  }
  return (
    <>
      <PageHeading
        title="Attendance management"
        description="Review daily records and document authorised corrections."
        actions={
          <div className="button-group">
            <button
              className="button button-secondary"
              onClick={() => downloadCsv("attendance-records.csv", rows)}
            >
              <Download size={15} /> Export CSV
            </button>
            <button
              className="button button-secondary"
              onClick={() =>
                downloadPdf(
                  "attendance-records.pdf",
                  "Attendance records",
                  rows,
                )
              }
            >
              <Printer size={15} /> Export PDF
            </button>
          </div>
        }
      />
      <div className="data-note attendance-note">
        <i /> Sample attendance data · Manual edits are local to this session
        and logged below
      </div>
      <section className="stat-grid stat-grid-four">
        <StatCard
          label="Total records"
          value={rows.length}
          note="Filtered records"
          icon={Activity}
          tone="purple"
        />
        <StatCard
          label="Present"
          value={present}
          note="On-time arrivals"
          icon={Check}
          tone="green"
        />
        <StatCard
          label="Absent"
          value={absent}
          note="No entry recorded"
          icon={CircleAlert}
          tone="red"
        />
        <StatCard
          label="Late entries"
          value={late}
          note="After 9:00 AM"
          icon={Clock3}
          tone="yellow"
        />
      </section>
      <Panel
        title="Attendance records"
        description="Select a record to make an authorised correction."
      >
        <div className="table-toolbar attendance-filters">
          <SearchField
            value={search}
            onChange={setSearch}
            placeholder="Search name, roll number, UID..."
          />
          <div className="filter-toolbar">
            <label className="date-filter">
              <CalendarDays size={15} />
              <input
                type="date"
                value={dateStart}
                onChange={(event) => setDateStart(event.target.value)}
                aria-label="Start date"
              />
            </label>
            <label className="date-filter">
              <CalendarDays size={15} />
              <input
                type="date"
                value={dateEnd}
                onChange={(event) => setDateEnd(event.target.value)}
                aria-label="End date"
              />
            </label>
            <SelectField
              value={department}
              onChange={setDepartment}
              options={[
                { value: "All departments", label: "All departments" },
                ...departments.map((value) => ({ value, label: value })),
              ]}
            />
            <SelectField
              value={semester}
              onChange={setSemester}
              options={[
                { value: "All semesters", label: "All semesters" },
                ...semesters.map((value) => ({ value, label: value })),
              ]}
            />
            <SelectField
              value={status}
              onChange={setStatus}
              options={["All statuses", "Present", "Absent", "Late"].map(
                (value) => ({ value, label: value }),
              )}
            />
          </div>
        </div>
        <Table
          columns={[
            {
              key: "student",
              label: "Student",
              render: (row) => (
                <div className="person-cell">
                  <Avatar
                    initials={row.name
                      .split(/\s+/)
                      .map((part) => part[0])
                      .join("")}
                    small
                  />
                  <span>
                    <strong>{row.name}</strong>
                    <small>{row.roll}</small>
                  </span>
                </div>
              ),
            },
            { key: "uid", label: "RFID UID" },
            { key: "date", label: "Date" },
            { key: "time", label: "Entry time" },
            {
              key: "status",
              label: "Status",
              render: (row) => <StatusBadge>{row.status}</StatusBadge>,
            },
            { key: "source", label: "Source" },
            {
              key: "correct",
              label: "Correction",
              className: "actions-cell",
              render: (row) => (
                <button className="text-button" onClick={() => correct(row)}>
                  <Pencil size={14} /> Correct
                </button>
              ),
            },
          ]}
          rows={rows}
        />
      </Panel>
      <Panel
        title="Correction audit trail"
        description="Session log of manual attendance changes"
        className="audit-panel"
      >
        {audit.length ? (
          <div className="audit-list">
            {audit.map((entry) => (
              <div key={entry.id}>
                <span className="audit-marker" />
                <span>
                  <strong>{entry.text}</strong>
                  <small>{entry.time} · System Admin</small>
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="audit-empty">
            <Clock3 size={16} /> No manual corrections in this session.
          </div>
        )}
      </Panel>
    </>
  );
}
