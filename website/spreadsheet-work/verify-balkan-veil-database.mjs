import fs from "node:fs/promises";
import path from "node:path";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const workbookPath = path.resolve("../outputs/balkan-veil-database.xlsx");
const input = await FileBlob.load(workbookPath);
const workbook = await SpreadsheetFile.importXlsx(input);

const sheets = await workbook.inspect({
  kind: "sheet",
  include: "name",
  maxChars: 2000,
});
console.log(sheets.ndjson);

const overview = await workbook.inspect({
  kind: "table",
  range: "Overview!A1:H16",
  include: "values,formulas",
  tableMaxRows: 18,
  tableMaxCols: 8,
  maxChars: 4000,
});
console.log(overview.ndjson);

const errors = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 300 },
  summary: "formula error scan",
});
console.log(errors.ndjson);

const previewDir = path.resolve("./previews");
await fs.mkdir(previewDir, { recursive: true });
for (const sheetName of [
  "Overview",
  "Table Schema",
  "site_settings",
  "service_protocols",
  "retainer_packages",
  "protocol_steps",
  "SQL Checklist",
]) {
  const preview = await workbook.render({ sheetName, autoCrop: "all", scale: 1, format: "png" });
  await fs.writeFile(
    path.join(previewDir, `${sheetName.replaceAll(" ", "-")}.png`),
    new Uint8Array(await preview.arrayBuffer())
  );
}
