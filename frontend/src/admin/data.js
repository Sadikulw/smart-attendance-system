export const initialStudents = [
  { id: "ST-2401", name: "Aarav Mukherjee", roll: "CST-21-014", registration: "2021CST014", department: "Computer Science", semester: "6th", email: "aarav.m@campus.edu", phone: "+91 98765 43210", uid: "A4:B2:91:0F", status: "Active", photo: "AM" },
  { id: "ST-2402", name: "Ananya Das", roll: "CST-22-027", registration: "2022CST027", department: "Computer Science", semester: "4th", email: "ananya.d@campus.edu", phone: "+91 98765 43211", uid: "B1:73:2C:8A", status: "Active", photo: "AD" },
  { id: "ST-2403", name: "Rohan Chatterjee", roll: "ET-21-008", registration: "2021ET008", department: "Electronics", semester: "6th", email: "rohan.c@campus.edu", phone: "+91 98765 43212", uid: "C9:14:67:31", status: "Active", photo: "RC" },
  { id: "ST-2404", name: "Ishita Roy", roll: "ME-23-019", registration: "2023ME019", department: "Mechanical", semester: "2nd", email: "ishita.r@campus.edu", phone: "+91 98765 43213", uid: "D8:05:3A:41", status: "Active", photo: "IR" },
  { id: "ST-2405", name: "Kabir Sen", roll: "CST-22-031", registration: "2022CST031", department: "Computer Science", semester: "4th", email: "kabir.s@campus.edu", phone: "+91 98765 43214", uid: "E2:90:AF:12", status: "Inactive", photo: "KS" },
  { id: "ST-2406", name: "Meera Ghosh", roll: "CE-21-006", registration: "2021CE006", department: "Civil", semester: "6th", email: "meera.g@campus.edu", phone: "+91 98765 43215", uid: "F3:81:14:6B", status: "Active", photo: "MG" },
  { id: "ST-2407", name: "Dev Sharma", roll: "ET-22-016", registration: "2022ET016", department: "Electronics", semester: "4th", email: "dev.s@campus.edu", phone: "+91 98765 43216", uid: "91:4D:BC:27", status: "Active", photo: "DS" },
  { id: "ST-2408", name: "Sara Khan", roll: "CST-23-011", registration: "2023CST011", department: "Computer Science", semester: "2nd", email: "sara.k@campus.edu", phone: "+91 98765 43217", uid: "3C:6F:2A:80", status: "Active", photo: "SK" },
];

export const initialFaculty = [
  { id: "FAC-018", name: "Soumen Mondal", department: "Computer Science", email: "soumen.m@campus.edu", phone: "+91 98300 11220", role: "Department head", status: "Active", photo: "SM" },
];

export const initialAttendance = [
  { id: "AT-5501", name: "Aarav Mukherjee", roll: "CST-21-014", uid: "A4:B2:91:0F", department: "Computer Science", semester: "6th", date: "2025-03-08", time: "08:42 AM", status: "Present", source: "RFID" },
  { id: "AT-5502", name: "Ananya Das", roll: "CST-22-027", uid: "B1:73:2C:8A", department: "Computer Science", semester: "4th", date: "2025-03-08", time: "08:48 AM", status: "Present", source: "RFID" },
  { id: "AT-5503", name: "Rohan Chatterjee", roll: "ET-21-008", uid: "C9:14:67:31", department: "Electronics", semester: "6th", date: "2025-03-08", time: "09:17 AM", status: "Late", source: "RFID" },
  { id: "AT-5504", name: "Ishita Roy", roll: "ME-23-019", uid: "D8:05:3A:41", department: "Mechanical", semester: "2nd", date: "2025-03-08", time: "—", status: "Absent", source: "Manual" },
  { id: "AT-5505", name: "Meera Ghosh", roll: "CE-21-006", uid: "F3:81:14:6B", department: "Civil", semester: "6th", date: "2025-03-08", time: "08:56 AM", status: "Present", source: "RFID" },
  { id: "AT-5506", name: "Dev Sharma", roll: "ET-22-016", uid: "91:4D:BC:27", department: "Electronics", semester: "4th", date: "2025-03-08", time: "09:04 AM", status: "Late", source: "RFID" },
  { id: "AT-5507", name: "Sara Khan", roll: "CST-23-011", uid: "3C:6F:2A:80", department: "Computer Science", semester: "2nd", date: "2025-03-08", time: "08:39 AM", status: "Present", source: "RFID" },
];

export const weeklyAttendance = [
  { day: "Mon", present: 82, absent: 18 }, { day: "Tue", present: 88, absent: 12 },
  { day: "Wed", present: 76, absent: 24 }, { day: "Thu", present: 91, absent: 9 },
  { day: "Fri", present: 85, absent: 15 }, { day: "Sat", present: 68, absent: 32 },
];

export const monthlyAttendance = [
  { month: "Oct", rate: 78 }, { month: "Nov", rate: 82 }, { month: "Dec", rate: 74 },
  { month: "Jan", rate: 86 }, { month: "Feb", rate: 84 }, { month: "Mar", rate: 89 },
];

export const departments = ["Computer Science", "Electronics", "Mechanical", "Civil"];
export const semesters = ["2nd", "4th", "6th"];
