import EmptyState from "./EmptyState.jsx";

export default function DataTable({
  columns,
  rows,
  emptyTitle = "No records found",
  emptyMessage = "Try adjusting your filters or search.",
}) {
  if (!rows.length)
    return <EmptyState title={emptyTitle} message={emptyMessage} />;
  return (
    <div className="table-scroll">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} className={column.className}>
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              {columns.map((column) => (
                <td key={column.key} className={column.className}>
                  {column.render ? column.render(row) : row[column.key] || "—"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
