export function downloadFile(filename, content, mimeType) {
  const url = URL.createObjectURL(new Blob([content], { type: mimeType }));
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function downloadCsv(filename, rows) {
  if (!rows.length) return;
  const headers = Object.keys(rows[0]);
  const escape = (value) => {
    let safe = String(value ?? "");
    if (/^\s*[=+\-@]/.test(safe)) safe = `'${safe}`;
    return `"${safe.replaceAll('"', '""')}"`;
  };
  const content = [
    headers.map(escape).join(","),
    ...rows.map((row) =>
      headers.map((header) => escape(row[header])).join(","),
    ),
  ].join("\r\n");
  downloadFile(filename, `\uFEFF${content}`, "text/csv;charset=utf-8;");
}

export function downloadExcel(filename, rows) {
  if (!rows.length) return;
  const escapeXml = (value) =>
    String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&apos;");
  const xmlRows = [
    Object.keys(rows[0]),
    ...rows.map((row) => Object.values(row)),
  ]
    .map(
      (row) =>
        `<Row>${row.map((value) => `<Cell><Data ss:Type="String">${escapeXml(value)}</Data></Cell>`).join("")}</Row>`,
    )
    .join("");
  const workbook = `<?xml version="1.0"?><?mso-application progid="Excel.Sheet"?><Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"><Worksheet ss:Name="Attendance"><Table>${xmlRows}</Table></Worksheet></Workbook>`;
  downloadFile(filename, workbook, "application/vnd.ms-excel;charset=utf-8;");
}

export async function downloadPdf(filename, title, rows) {
  if (!rows.length) return;
  const { jsPDF } = await import("jspdf");
  const document = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });
  document.setFont("helvetica", "bold");
  document.setFontSize(15);
  document.text(title, 14, 17);
  document.setFont("helvetica", "normal");
  document.setFontSize(8);
  document.text("Smart Attendance · Preview data", 14, 24);
  let y = 33;
  const lines = [
    Object.keys(rows[0]).join("  |  "),
    ...rows.map((row) => Object.values(row).join("  |  ")),
  ];
  for (const line of lines) {
    const wrapped = document.splitTextToSize(String(line), 268);
    if (y + wrapped.length * 4 > 195) {
      document.addPage();
      y = 15;
    }
    document.text(wrapped, 14, y);
    y += wrapped.length * 4 + 2;
  }
  document.save(filename);
}
