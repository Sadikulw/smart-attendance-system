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
import { colors, fmt } from "./shared.js";
const miniAttendance = [
  {
    id: "1",
    name: "Aarav Mukherjee",
    roll: "CST-21-014",
    department: "Computer Science",
    time: "08:42 AM",
    status: "Present",
    initials: "AM",
  },
  {
    id: "2",
    name: "Ananya Das",
    roll: "CST-22-027",
    department: "Computer Science",
    time: "08:48 AM",
    status: "Present",
    initials: "AD",
  },
  {
    id: "3",
    name: "Rohan Chatterjee",
    roll: "ET-21-008",
    department: "Electronics",
    time: "09:17 AM",
    status: "Late",
    initials: "RC",
  },
  {
    id: "4",
    name: "Meera Ghosh",
    roll: "CE-21-006",
    department: "Civil",
    time: "08:56 AM",
    status: "Present",
    initials: "MG",
  },
];
export default function OverviewPage({ students, attendance, onNavigate }) {
  const present = attendance.filter(
    (row) => row.status === "Present" || row.status === "Late",
  ).length;
  const absent = attendance.filter((row) => row.status === "Absent").length;
  const percentage = Math.round(
    (present / Math.max(attendance.length, 1)) * 100,
  );
  const byDepartment = departments.map((department, index) => ({
    department: ["Computer Sci.", "Electronics", "Mechanical", "Civil"][index],
    rate: [89, 84, 78, 86][index],
  }));
  return (
    <>
      <PageHeading
        title="Overview"
        description="A clear view of attendance across your campus."
        actions={
          <span className="data-note">
            <i /> Sample data · Not connected to a live system
          </span>
        }
      />
      <section className="stat-grid">
        <StatCard
          label="Total students"
          value={fmt.format(students.length + 1240)}
          note="Across all departments"
          icon={Users}
          trend="+4.8%"
        />
        <StatCard
          label="Total faculty"
          value="86"
          note="4 departments"
          icon={BriefcaseBusiness}
          tone="blue"
        />
        <StatCard
          label="Present today"
          value={fmt.format(present + 972)}
          note="Of enrolled students"
          icon={Check}
          tone="green"
          trend="+2.1%"
        />
        <StatCard
          label="Absent today"
          value={fmt.format(absent + 118)}
          note="Needs follow-up"
          icon={CircleAlert}
          tone="yellow"
        />
        <StatCard
          label="Attendance rate"
          value={`${percentage || 87}%`}
          note="Today's campus average"
          icon={Activity}
          tone="purple"
          trend="+1.6%"
        />
        <StatCard
          label="Connected devices"
          value="0 / 8"
          note="Live status unavailable"
          icon={Laptop}
          tone="gray"
        />
      </section>
      <section className="chart-grid chart-grid-two">
        <ChartCard
          title="Weekly attendance"
          subtitle="Attendance rate by day · this week"
        >
          <div className="chart-wrap chart-tall">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={weeklyAttendance}
                barGap={5}
                margin={{ top: 12, right: 4, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  vertical={false}
                  stroke="#ECEEF3"
                  strokeDasharray="3 4"
                />
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: colors.muted, fontSize: 11 }}
                  dy={8}
                />
                <YAxis
                  domain={[0, 100]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: colors.muted, fontSize: 11 }}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip
                  content={<ChartTooltip />}
                  cursor={{ fill: "#F7F7FA" }}
                />
                <Bar
                  dataKey="present"
                  name="Present"
                  fill={colors.purple}
                  radius={[4, 4, 0, 0]}
                  maxBarSize={24}
                />
                <Bar
                  dataKey="absent"
                  name="Absent"
                  fill="#E9E7F7"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={24}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-legend">
            <span>
              <i className="legend-purple" />
              Present
            </span>
            <span>
              <i className="legend-pale" />
              Absent
            </span>
          </div>
        </ChartCard>
        <ChartCard
          title="Monthly attendance"
          subtitle="Campus attendance rate · last 6 months"
          action={
            <span className="chart-summary">
              89% <small>current</small>
            </span>
          }
        >
          <div className="chart-wrap chart-tall">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={monthlyAttendance}
                margin={{ top: 14, right: 5, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="attendanceArea"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor={colors.purple}
                      stopOpacity={0.14}
                    />
                    <stop
                      offset="95%"
                      stopColor={colors.purple}
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  vertical={false}
                  stroke="#ECEEF3"
                  strokeDasharray="3 4"
                />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: colors.muted, fontSize: 11 }}
                  dy={8}
                />
                <YAxis
                  domain={[50, 100]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: colors.muted, fontSize: 11 }}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip content={<ChartTooltip />} />
                <Area
                  type="monotone"
                  dataKey="rate"
                  name="Attendance"
                  stroke={colors.purple}
                  strokeWidth={2.2}
                  fill="url(#attendanceArea)"
                  activeDot={{ r: 4, strokeWidth: 0 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </section>
      <section className="chart-grid chart-grid-two overview-lower">
        <ChartCard
          title="Department attendance"
          subtitle="Average attendance by department"
        >
          <div className="chart-wrap chart-short">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={byDepartment}
                layout="vertical"
                margin={{ top: 2, right: 12, left: 18, bottom: 0 }}
              >
                <CartesianGrid horizontal={false} stroke="#ECEEF3" />
                <XAxis type="number" domain={[0, 100]} hide />
                <YAxis
                  type="category"
                  dataKey="department"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#555B68", fontSize: 11 }}
                  width={108}
                />
                <Tooltip content={<ChartTooltip />} />
                <Bar
                  dataKey="rate"
                  name="Attendance"
                  fill={colors.purple}
                  radius={[0, 4, 4, 0]}
                  barSize={13}
                  label={{
                    position: "right",
                    fill: "#727786",
                    fontSize: 11,
                    formatter: (value) => `${value}%`,
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
        <Panel
          title="Device status"
          description="Hardware status requires a live backend."
          action={
            <button
              className="text-button"
              onClick={() => onNavigate("/admin/devices")}
            >
              View devices <ArrowRight size={14} />
            </button>
          }
        >
          <div className="device-summary-row">
            <span className="device-symbol">
              <Wifi size={18} />
            </span>
            <span className="device-copy">
              <strong>ESP32 · Main entrance</strong>
              <small>Heartbeat not available</small>
            </span>
            <StatusBadge>Offline</StatusBadge>
          </div>
      
          <div className="device-footnote">
            <CircleAlert size={14} /> No device telemetry connected
          </div>
        </Panel>
      </section>
      <section className="chart-grid chart-grid-two overview-lower">
        <Panel
          title="Recent attendance activity"
          description="Latest sample records"
          action={
            <button
              className="text-button"
              onClick={() => onNavigate("/admin/attendance")}
            >
              View all <ArrowRight size={14} />
            </button>
          }
        >
          <Table
            columns={[
              {
                key: "student",
                label: "Student",
                render: (row) => (
                  <div className="person-cell">
                    <Avatar initials={row.initials} small />
                    <span>
                      <strong>{row.name}</strong>
                      <small>{row.roll}</small>
                    </span>
                  </div>
                ),
              },
              { key: "department", label: "Department" },
              { key: "time", label: "Time" },
              {
                key: "status",
                label: "Status",
                render: (row) => <StatusBadge>{row.status}</StatusBadge>,
              },
            ]}
            rows={miniAttendance}
          />
        </Panel>
        <Panel
          title="Recently added students"
          description="Recently added to the register"
          action={
            <button
              className="text-button"
              onClick={() => onNavigate("/admin/students")}
            >
              Manage students <ArrowRight size={14} />
            </button>
          }
        >
          <div className="recent-students">
            {students
              .slice(-4)
              .reverse()
              .map((student) => (
                <div className="recent-person" key={student.id}>
                  <Avatar initials={student.photo} />
                  <span>
                    <strong>{student.name}</strong>
                    <small>
                      {student.department} · {student.roll}
                    </small>
                  </span>
                  <span className="recent-date">New</span>
                </div>
              ))}
          </div>
        </Panel>
      </section>
    </>
  );
}
