import { useMemo, useState } from "react";
import { Plus, SlidersHorizontal } from "lucide-react";
import { Avatar, ConfirmDialog, PageHeading, SearchField, SelectField, StatusBadge } from "../components.jsx";
import EntityForm from "../components/EntityForm.jsx";
import Panel from "../components/Panel.jsx";
import Table from "../components/DataTable.jsx";
import RowActions from "../components/RowActions.jsx";
import { departments, semesters } from "../data.js";

const studentFields = [
  { key: "name", label: "Full name", required: true },
  { key: "roll", label: "Roll number", required: true },
  { key: "registration", label: "Registration number", required: true },
  {
    key: "department",
    label: "Department",
    type: "select",
    options: departments,
    required: true,
  },
  {
    key: "semester",
    label: "Semester",
    type: "select",
    options: semesters,
    required: true,
  },
  { key: "email", label: "Email address", type: "email", required: true },
  { key: "phone", label: "Phone number" },
  { key: "uid", label: "RFID card UID" },
  {
    key: "status",
    label: "Account status",
    type: "select",
    options: ["Active", "Inactive"],
    required: true,
  },
];
const facultyFields = [
  { key: "name", label: "Full name", required: true },
  { key: "id", label: "Faculty ID", required: true },
  {
    key: "department",
    label: "Department",
    type: "select",
    options: departments,
    required: true,
  },
  { key: "role", label: "Role", required: true },
  { key: "email", label: "Email address", type: "email", required: true },
  { key: "phone", label: "Phone number" },
  {
    key: "status",
    label: "Account status",
    type: "select",
    options: ["Active", "Inactive"],
    required: true,
  },
];
export default function ManagementPage({ kind, records, setRecords, globalSearch, notify }) {
  const isStudent = kind === "student";
  const fields = isStudent ? studentFields : facultyFields;
  const title = isStudent ? "Students" : "Faculty";
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All departments");
  const [semester, setSemester] = useState("All semesters");
  const [editor, setEditor] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const query = `${search} ${globalSearch}`.trim().toLowerCase();
  const filtered = useMemo(
    () =>
      records.filter(
        (row) =>
          (!query ||
            Object.values(row).join(" ").toLowerCase().includes(query)) &&
          (department === "All departments" || row.department === department) &&
          (!isStudent ||
            semester === "All semesters" ||
            row.semester === semester),
      ),
    [records, query, department, semester, isStudent],
  );

  const columns = isStudent
    ? [
        {
          key: "name",
          label: "Student",
          render: (row) => (
            <div className="person-cell">
              <Avatar initials={row.photo} small />
              <span>
                <strong>{row.name}</strong>
                <small>{row.email}</small>
              </span>
            </div>
          ),
        },
        { key: "roll", label: "Roll number" },
        { key: "registration", label: "Registration no." },
        { key: "department", label: "Department" },
        { key: "semester", label: "Semester" },
        { key: "phone", label: "Phone" },
        { key: "uid", label: "RFID UID" },
        {
          key: "status",
          label: "Status",
          render: (row) => <StatusBadge>{row.status}</StatusBadge>,
        },
        {
          key: "actions",
          label: "",
          className: "actions-cell",
          render: (row) => (
            <RowActions
              onEdit={() => setEditor(row)}
              onDelete={() => setDeleting(row)}
            />
          ),
        },
      ]
    : [
        { key: "id", label: "Faculty ID" },
        {
          key: "name",
          label: "Faculty",
          render: (row) => (
            <div className="person-cell">
              <Avatar initials={row.photo} small />
              <span>
                <strong>{row.name}</strong>
                <small>{row.email}</small>
              </span>
            </div>
          ),
        },
        { key: "department", label: "Department" },
        { key: "role", label: "Role" },
        { key: "phone", label: "Phone" },
        {
          key: "status",
          label: "Status",
          render: (row) => <StatusBadge>{row.status}</StatusBadge>,
        },
        {
          key: "actions",
          label: "",
          className: "actions-cell",
          render: (row) => (
            <RowActions
              onEdit={() => setEditor(row)}
              onDelete={() => setDeleting(row)}
            />
          ),
        },
      ];

  function save(values) {
    if (editor?.id) {
      setRecords((rows) =>
        rows.map((row) => (row.id === editor.id ? { ...row, ...values } : row)),
      );
      notify(`${title.slice(0, -1)} updated`);
    } else {
      const name = values.name.trim();
      const item = {
        ...values,
        id:
          values.id ||
          `${isStudent ? "ST" : "FAC"}-${Math.floor(1000 + Math.random() * 9000)}`,
        photo: name
          .split(/\s+/)
          .map((part) => part[0])
          .join("")
          .slice(0, 2)
          .toUpperCase(),
      };
      setRecords((rows) => [item, ...rows]);
      notify(`${title.slice(0, -1)} added`);
    }
    setEditor(null);
  }
  function remove() {
    if (isStudent)
      setRecords((rows) => rows.filter((row) => row.id !== deleting.id));
    else
      setRecords((rows) =>
        rows.map((row) =>
          row.id === deleting.id ? { ...row, status: "Inactive" } : row,
        ),
      );
    setDeleting(null);
    notify(isStudent ? "Student removed" : "Faculty member deactivated");
  }
  return (
    <>
      <PageHeading
        title={`${title} management`}
        description={
          isStudent
            ? "Maintain student profiles, enrolment details and RFID assignments."
            : "Manage faculty profiles and campus access roles."
        }
        actions={
          <button
            className="button button-primary"
            onClick={() => setEditor({})}
          >
            <Plus size={16} /> Add {isStudent ? "student" : "faculty"}
          </button>
        }
      />
      <div className="list-summary">
        <span>
          <strong>{records.length}</strong>{" "}
          {isStudent ? "students" : "faculty members"} in directory
        </span>
        <span>Sample dataset · Changes remain in this session</span>
      </div>
      <Panel
        title={isStudent ? "Student directory" : "Faculty directory"}
        description={`${filtered.length} ${isStudent ? "students" : "faculty members"} shown`}
      >
        <div className="table-toolbar">
          <SearchField
            value={search}
            onChange={setSearch}
            placeholder={`Search ${isStudent ? "students" : "faculty"}...`}
          />
          <div className="filter-toolbar">
            <SelectField
              value={department}
              onChange={setDepartment}
              options={[
                { value: "All departments", label: "All departments" },
                ...departments.map((value) => ({ value, label: value })),
              ]}
            />
            {isStudent && (
              <SelectField
                value={semester}
                onChange={setSemester}
                options={[
                  { value: "All semesters", label: "All semesters" },
                  ...semesters.map((value) => ({
                    value,
                    label: `${value} semester`,
                  })),
                ]}
              />
            )}
            <span className="filter-indicator">
              <SlidersHorizontal size={15} />
            </span>
          </div>
        </div>
        <Table
          columns={columns}
          rows={filtered}
          emptyTitle={`No ${title.toLowerCase()} found`}
        />
      </Panel>
      {editor && (
        <EntityForm
          title={`${editor.id ? "Edit" : "Add"} ${isStudent ? "student" : "faculty member"}`}
          fields={fields}
          initial={editor}
          onClose={() => setEditor(null)}
          onSave={save}
        />
      )}
      {deleting && (
        <ConfirmDialog
          title={isStudent ? "Remove student?" : "Deactivate faculty member?"}
          message={
            isStudent
              ? `This will remove ${deleting.name} from this sample directory. This action cannot be undone.`
              : `This will deactivate ${deleting.name}. Their profile will remain in the directory.`
          }
          confirmLabel={isStudent ? "Remove student" : "Deactivate"}
          onCancel={() => setDeleting(null)}
          onConfirm={remove}
        />
      )}
    </>
  );
}
