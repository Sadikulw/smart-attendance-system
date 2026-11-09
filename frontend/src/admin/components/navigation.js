import { ChartNoAxesCombined, ClipboardCheck, Fingerprint, LayoutDashboard, Settings, UserRound, Users } from "lucide-react";

export const navigation = [
  { label: "Overview", path: "/admin", icon: LayoutDashboard, end: true },
  { label: "Students", path: "/admin/students", icon: Users },
  { label: "Faculty", path: "/admin/faculty", icon: UserRound },
  { label: "Attendance", path: "/admin/attendance", icon: ClipboardCheck },
  { label: "RFID devices", path: "/admin/devices", icon: Fingerprint },
  { label: "Reports & analytics", path: "/admin/reports", icon: ChartNoAxesCombined },
  { label: "Settings", path: "/admin/settings", icon: Settings },
];
