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
import { colors, fmt } from "./shared.js";
export default function ReportsPage() {
  const [period, setPeriod] = useState("Monthly");
  const [department, setDepartment] = useState("All departments");
  const [report, setReport] = useState("Campus overview");
  const [applied, setApplied] = useState({
    period: "Monthly",
    department: "All departments",
    report: "Campus overview",
  });
  const departmentIndex = departments.indexOf(applied.department);
  const departmentShift =
    departmentIndex < 0 ? 0 : [2, -3, 4, -1][departmentIndex];
  const periodShift =
    applied.period === "Daily" ? -2 : applied.period === "Weekly" ? -1 : 0;
  const attendanceRate = 87 + departmentShift + periodShift;
  const reportRows = [
    { label: "Present", value: attendanceRate - 6, fill: colors.purple },
    { label: "Absent", value: 100 - attendanceRate + 1, fill: "#D9D5F2" },
    { label: "Late", value: 5, fill: "#E8B967" },
  ];
  const trend = monthlyAttendance.map((item) => ({
    ...item,
    rate: Math.max(50, Math.min(98, item.rate + departmentShift + periodShift)),
  }));
  const presentRecords = Math.round(
    1284 + departmentShift * 19 + periodShift * 24,
  );
  const absentRecords = Math.round(
    216 - departmentShift * 7 - periodShift * 10,
  );
  const reportExport = [
    {
      report: applied.report,
      period: applied.period,
      department: applied.department,
      attendance: `${attendanceRate}%`,
      present: reportRows[0].value,
      absent: reportRows[1].value,
      late: 5,
    },
    ...trend.map((item) => ({
      month: item.month,
      attendance: `${item.rate}%`,
    })),
  ];
  return (
    <>
      <PageHeading
        title="Reports & analytics"
        description="Explore attendance patterns by date, department and student group."
        actions={
          <div className="button-group">
            <button
              className="button button-secondary"
              onClick={() => downloadCsv("attendance-report.csv", reportExport)}
            >
              <Download size={15} /> CSV
            </button>
            <button
              className="button button-secondary"
              onClick={() =>
                downloadExcel("attendance-report.xml", reportExport)
              }
            >
              <Download size={15} /> Excel
            </button>
            <button
              className="button button-primary"
              onClick={() =>
                downloadPdf(
                  "attendance-report.pdf",
                  "Attendance report",
                  reportExport,
                )
              }
            >
              <FileText size={15} /> PDF
            </button>
          </div>
        }
      />
      <div className="data-note attendance-note">
        <i /> Sample reporting data · Exported files contain preview values only
      </div>
      <Panel
        title="Report filters"
        description="Choose a report view and refine the data shown."
        className="report-filter-panel"
      >
        <div className="report-filters">
          <SelectField
            label="Report type"
            value={report}
            onChange={setReport}
            options={[
              "Campus overview",
              "Student-wise report",
              "Department-wise report",
              "Semester-wise report",
            ].map((value) => ({ value, label: value }))}
          />
          <SelectField
            label="Time period"
            value={period}
            onChange={setPeriod}
            options={["Daily", "Weekly", "Monthly"].map((value) => ({
              value,
              label: value,
            }))}
          />
          <SelectField
            label="Department"
            value={department}
            onChange={setDepartment}
            options={[
              { value: "All departments", label: "All departments" },
              ...departments.map((value) => ({ value, label: value })),
            ]}
          />
          <button
            className="button button-primary"
            onClick={() => setApplied({ period, department, report })}
          >
            <SlidersHorizontal size={15} /> Apply filters
          </button>
        </div>
      </Panel>
      <section className="stat-grid stat-grid-four report-stats">
        <StatCard
          label="Attendance rate"
          value={`${(attendanceRate + 0.4).toFixed(1)}%`}
          note={`${applied.department} · ${applied.period.toLowerCase()}`}
          icon={Activity}
          tone="purple"
          trend="+2.3%"
        />
        <StatCard
          label="Present records"
          value={fmt.format(presentRecords)}
          note={`${applied.period} report`}
          icon={Check}
          tone="green"
        />
        <StatCard
          label="Absent records"
          value={fmt.format(absentRecords)}
          note={`${applied.period} report`}
          icon={CircleAlert}
          tone="red"
        />
        <StatCard
          label="Late arrivals"
          value="74"
          note="Across selected period"
          icon={Clock3}
          tone="yellow"
        />
      </section>
      <section className="chart-grid chart-grid-two reports-charts">
        <ChartCard
          title={
            applied.report === "Campus overview"
              ? "Present vs absent"
              : applied.report
          }
          subtitle={`${applied.period} attendance distribution · ${applied.department}`}
        >
          <div className="report-pie-layout">
            <div className="chart-wrap pie-wrap">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={reportRows}
                    dataKey="value"
                    nameKey="label"
                    innerRadius={62}
                    outerRadius={88}
                    paddingAngle={3}
                    stroke="none"
                  >
                    {reportRows.map((entry) => (
                      <Cell key={entry.label} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
              <div className="pie-center">
                <strong>87%</strong>
                <span>Attendance</span>
              </div>
            </div>
            <div className="pie-legend">
              {reportRows.map((row) => (
                <div key={row.label}>
                  <span>
                    <i style={{ background: row.fill }} />
                    {row.label}
                  </span>
                  <strong>{row.value}%</strong>
                </div>
              ))}
            </div>
          </div>
        </ChartCard>
        <ChartCard
          title="Monthly attendance trend"
          subtitle={`${applied.department} · attendance rate`}
        >
          <div className="chart-wrap chart-tall">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={trend}
                margin={{ top: 14, right: 4, left: -20, bottom: 0 }}
              >
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
                <Line
                  type="monotone"
                  dataKey="rate"
                  name="Attendance"
                  stroke={colors.purple}
                  strokeWidth={2.2}
                  dot={{ r: 3, fill: colors.purple, strokeWidth: 0 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </section>
    </>
  );
}
