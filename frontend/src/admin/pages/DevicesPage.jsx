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
const devices = [
  {
    id: "ESP32-ENT-01",
    name: "Main entrance reader",
    location: "Main building · Gate A",
    wifi: "Unknown",
    heartbeat: "Not available",
    scan: "Not available",
    status: "Offline",
    rc522: "Unknown",
  },
 
];
export default function DevicesPage({ notify }) {
  const [refreshing, setRefreshing] = useState(false);
  const [details, setDetails] = useState(null);
  function refresh() {
    setRefreshing(true);
    window.setTimeout(() => {
      setRefreshing(false);
      notify("Status refreshed: backend heartbeat endpoint is not configured");
    }, 500);
  }
  return (
    <>
      <PageHeading
        title="RFID device management"
        description="Monitor ESP32 connectivity and RC522 readiness independently."
        actions={
          <button
            className="button button-secondary"
            onClick={refresh}
            disabled={refreshing}
          >
            {refreshing ? (
              <span className="button-spinner" />
            ) : (
              <RefreshCw size={15} />
            )}
            {refreshing ? "Checking..." : "Refresh status"}
          </button>
        }
      />
      <div className="device-alert">
        <CircleAlert size={17} />
        <span>
          <strong>Live monitoring unavailable.</strong> Device status is marked
          offline or unknown until the backend receives verified heartbeat and
          reader telemetry.
        </span>
      </div>
      <div className="">
        {devices.map((device) => (
          <section className="panel device-card" key={device.id}>
            <div className="device-card-top">
              <span className="device-large-icon">
                <Fingerprint size={20} />
              </span>
              <span className="device-id">{device.id}</span>
              <button
                aria-label={`Details for ${device.name}`}
                className="icon-button"
                onClick={() => setDetails(device)}
              >
                <ArrowUpRight size={17} />
              </button>
            </div>
            <h2>{device.name}</h2>
            <p className="device-location">{device.location}</p>
            <div className="device-state-grid">
              <div>
                <small>ESP32 connection</small>
                <StatusBadge>{device.status}</StatusBadge>
              </div>
              <div>
                <small>RC522 reader</small>
                <StatusBadge>{device.rc522}</StatusBadge>
              </div>
              <div>
                <small>Wi-Fi</small>
                <StatusBadge>{device.wifi}</StatusBadge>
              </div>
              <div>
                <small>Last heartbeat</small>
                <strong>{device.heartbeat}</strong>
              </div>
              <div>
                <small>Last successful scan</small>
                <strong>{device.scan}</strong>
              </div>
              <div>
                <small>Recent errors</small>
                <strong>No data</strong>
              </div>
            </div>
            <button
              className="device-detail-link"
              onClick={() => setDetails(device)}
            >
              View device details <ArrowRight size={14} />
            </button>
          </section>
        ))}
      </div>
      <section className="chart-grid chart-grid-two devices-lower">
        <Panel
          title="Connection history"
          description="No heartbeat events have been received."
        >
          <div className="device-empty">
            <Activity size={21} />
            <strong>No connection history</strong>
            <span>
              Once connected, device heartbeat events will be shown here.
            </span>
          </div>
        </Panel>
        <Panel
          title="Error information"
          description="Device logs are not connected."
        >
          <div className="device-empty">
            <CircleAlert size={21} />
            <strong>No error logs available</strong>
            <span>Log data will appear when the device API is configured.</span>
          </div>
        </Panel>
      </section>
      {details && (
        <Modal
          title={details.name}
          description={details.id}
          onClose={() => setDetails(null)}
        >
          <div className="device-detail-body">
            <div className="device-alert">
              <CircleAlert size={16} />
              <span>No live device data is available in this preview.</span>
            </div>
            <dl>
              {Object.entries({
                Location: details.location,
                "ESP32 connection": details.status,
                "RC522 reader": details.rc522,
                "Wi-Fi status": details.wifi,
                "Last heartbeat": details.heartbeat,
                "Last successful scan": details.scan,
              }).map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
            <button
              className="button button-secondary"
              onClick={() => setDetails(null)}
            >
              Close
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
