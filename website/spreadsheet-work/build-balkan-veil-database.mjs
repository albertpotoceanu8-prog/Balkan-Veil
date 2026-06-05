import fs from "node:fs/promises";
import path from "node:path";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outputDir = path.resolve("../outputs");
const outputPath = path.join(outputDir, "balkan-veil-database.xlsx");

const black = "#050505";
const panel = "#0E0D0A";
const gold = "#D4AF37";
const mutedGold = "#8F7835";
const text = "#F3EAD2";
const muted = "#8E8878";
const green = "#8FE28F";

const workbook = Workbook.create();

function styleTitle(sheet, range, title, subtitle) {
  sheet.showGridLines = false;
  sheet.getRange(range).merge();
  sheet.getRange(range).values = [[title]];
  sheet.getRange(range).format = {
    fill: black,
    font: { bold: true, color: text, size: 20 },
    horizontalAlignment: "left",
    verticalAlignment: "middle",
  };

  sheet.getRange("A2:H2").merge();
  sheet.getRange("A2:H2").values = [[subtitle]];
  sheet.getRange("A2:H2").format = {
    fill: black,
    font: { color: muted, size: 11 },
    wrapText: true,
  };

}

function writeTable(sheet, startCell, headers, rows) {
  const start = sheet.getRange(startCell);
  const rowCount = rows.length + 1;
  const colCount = headers.length;
  const range = start.resize(rowCount, colCount);
  range.values = [headers, ...rows];
  range.format = {
    font: { color: text, size: 10 },
    fill: panel,
    wrapText: true,
    verticalAlignment: "top",
  };
  start.resize(1, colCount).format = {
    fill: "#1A160C",
    font: { bold: true, color: gold, size: 10 },
    wrapText: true,
  };
  return range;
}

function setWidths(sheet, widths) {
  widths.forEach((width, index) => {
    sheet.getRangeByIndexes(0, index, 1, 1).format.columnWidth = Math.round(width / 7);
  });
}

const overview = workbook.worksheets.add("Overview");
styleTitle(
  overview,
  "A1:H1",
  "BALKAN VEIL / DATABASE BLUEPRINT",
  "Excel workbook for planning the Supabase database before production setup."
);
setWidths(overview, [180, 180, 180, 180, 170, 170, 170, 170]);

writeTable(
  overview,
  "A4",
  ["Area", "Table", "Purpose", "Status"],
  [
    ["Public Interface", "site_settings", "Singleton content record for hero, offer, contact and SEO controls.", "Ready"],
    ["Services", "service_protocols", "Service cards and commercial positioning.", "Ready"],
    ["Packages", "retainer_packages", "Monthly retainers and recommended package data.", "Ready"],
    ["Process", "protocol_steps", "Build protocol shown on the public site/admin.", "Ready"],
  ],
);

overview.getRange("A11:B11").values = [["Metric", "Value"]];
overview.getRange("A12:A15").values = [
  ["Site settings fields"],
  ["Service fields"],
  ["Retainer fields"],
  ["Protocol fields"],
];
overview.getRange("B12:B15").formulas = [
  ["=COUNTA('Table Schema'!A2:A23)"],
  ["=COUNTA('Table Schema'!A25:A38)"],
  ["=COUNTA('Table Schema'!A40:A52)"],
  ["=COUNTA('Table Schema'!A54:A64)"],
];
overview.getRange("A11:B15").format = {
  fill: panel,
  font: { color: text },
};
overview.getRange("A11:B11").format = {
  fill: "#1A160C",
  font: { color: gold, bold: true },
};

const schema = workbook.worksheets.add("Table Schema");
styleTitle(schema, "A1:H1", "TABLE SCHEMA", "Column-level database specification.");
setWidths(schema, [170, 190, 150, 90, 110, 230, 210, 190]);

const schemaRows = [
  ["site_settings", "id", "uuid", "Yes", "gen_random_uuid()", "Primary key.", "No direct editing.", "uuid primary key"],
  ["site_settings", "singleton_key", "text", "Yes", "main", "Unique key for singleton row.", "Keep one row only.", "unique"],
  ["site_settings", "studio_status", "text", "Yes", "Accepting selected builds", "Availability status.", "Admin editable.", ""],
  ["site_settings", "tagline", "text", "Yes", "In Shadows, Power Remains.", "Brand phrase.", "Admin editable.", ""],
  ["site_settings", "hero_eyebrow", "text", "Yes", "BALKAN VEIL / PREMIUM DIGITAL STUDIO", "Small hero label.", "Admin editable.", ""],
  ["site_settings", "hero_headline", "text", "Yes", "Premium digital presence for brands that operate in silence.", "Main hero headline.", "Admin editable.", ""],
  ["site_settings", "hero_description", "text", "Yes", "Premium websites, private digital systems and digital presence management.", "Hero paragraph.", "Admin editable.", ""],
  ["site_settings", "primary_cta_label", "text", "Yes", "Request Access", "Primary button label.", "Admin editable.", ""],
  ["site_settings", "primary_cta_href", "text", "Yes", "/access", "Primary button destination.", "Admin editable.", ""],
  ["site_settings", "secondary_cta_label", "text", "Yes", "View Protocol", "Secondary button label.", "Admin editable.", ""],
  ["site_settings", "secondary_cta_href", "text", "Yes", "/protocol", "Secondary button destination.", "Admin editable.", ""],
  ["site_settings", "starting_price", "text", "Yes", "from 1.500€", "Public starting price.", "Admin editable.", ""],
  ["site_settings", "standard_website_value", "text", "Yes", "3.500€", "Reference website value.", "Admin editable.", ""],
  ["site_settings", "partner_launch_setup", "text", "Yes", "800€", "Partner setup price.", "Admin editable.", ""],
  ["site_settings", "contact_email", "text", "No", "", "Public contact email.", "Optional.", ""],
  ["site_settings", "instagram_url", "text", "No", "", "Instagram link.", "Optional URL.", ""],
  ["site_settings", "tiktok_url", "text", "No", "", "TikTok link.", "Optional URL.", ""],
  ["site_settings", "seo_title", "text", "Yes", "Balkan Veil — Premium Digital Studio", "SEO title.", "Admin editable.", ""],
  ["site_settings", "seo_description", "text", "Yes", "Premium websites, private digital systems and digital presence management.", "SEO meta description.", "Admin editable.", ""],
  ["site_settings", "seo_keywords", "text[]", "Yes", "premium websites, digital systems, digital presence", "SEO keywords array.", "Comma list in admin.", ""],
  ["site_settings", "updated_at", "timestamptz", "Yes", "now()", "Last update timestamp.", "Trigger managed.", ""],
  ["site_settings", "created_at", "timestamptz", "Yes", "now()", "Created timestamp.", "System managed.", ""],
  ["service_protocols", "id", "uuid", "Yes", "gen_random_uuid()", "Primary key.", "System managed.", "uuid primary key"],
  ["service_protocols", "name", "text", "Yes", "", "Service name.", "Required.", ""],
  ["service_protocols", "codename", "text", "No", "", "Protocol label.", "Optional.", ""],
  ["service_protocols", "category", "text", "Yes", "website", "Category filter.", "Website/system/management/etc.", ""],
  ["service_protocols", "short_description", "text", "No", "", "Card description.", "Optional.", ""],
  ["service_protocols", "primary_outcome", "text", "No", "", "Commercial result.", "Optional.", ""],
  ["service_protocols", "starting_price", "text", "No", "", "Service price label.", "Optional.", ""],
  ["service_protocols", "features", "text[]", "Yes", "{}", "Feature bullets.", "Array.", ""],
  ["service_protocols", "active", "boolean", "Yes", "true", "Show/hide record.", "Admin toggle.", ""],
  ["service_protocols", "featured", "boolean", "Yes", "false", "Feature on homepage.", "Admin toggle.", ""],
  ["service_protocols", "display_order", "int", "Yes", "1", "Sort order.", "Admin editable.", ""],
  ["service_protocols", "updated_at", "timestamptz", "Yes", "now()", "Last update timestamp.", "Trigger managed.", ""],
  ["service_protocols", "created_at", "timestamptz", "Yes", "now()", "Created timestamp.", "System managed.", ""],
  ["retainer_packages", "id", "uuid", "Yes", "gen_random_uuid()", "Primary key.", "System managed.", "uuid primary key"],
  ["retainer_packages", "name", "text", "Yes", "", "Package name.", "Required.", ""],
  ["retainer_packages", "codename", "text", "No", "", "Internal package code.", "Optional.", ""],
  ["retainer_packages", "monthly_price", "text", "Yes", "", "Monthly price label.", "Required.", ""],
  ["retainer_packages", "short_description", "text", "No", "", "Package description.", "Optional.", ""],
  ["retainer_packages", "best_for", "text", "No", "", "Ideal customer.", "Optional.", ""],
  ["retainer_packages", "features", "text[]", "Yes", "{}", "Feature bullets.", "Array.", ""],
  ["retainer_packages", "active", "boolean", "Yes", "true", "Show/hide package.", "Admin toggle.", ""],
  ["retainer_packages", "recommended", "boolean", "Yes", "false", "Recommended badge.", "Admin toggle.", ""],
  ["retainer_packages", "display_order", "int", "Yes", "1", "Sort order.", "Admin editable.", ""],
  ["retainer_packages", "updated_at", "timestamptz", "Yes", "now()", "Last update timestamp.", "Trigger managed.", ""],
  ["retainer_packages", "created_at", "timestamptz", "Yes", "now()", "Created timestamp.", "System managed.", ""],
  ["protocol_steps", "id", "uuid", "Yes", "gen_random_uuid()", "Primary key.", "System managed.", "uuid primary key"],
  ["protocol_steps", "step_number", "int", "Yes", "", "Visible protocol number.", "Required.", ""],
  ["protocol_steps", "title", "text", "Yes", "", "Step title.", "Required.", ""],
  ["protocol_steps", "codename", "text", "No", "", "Internal phase code.", "Optional.", ""],
  ["protocol_steps", "short_description", "text", "No", "", "Step description.", "Optional.", ""],
  ["protocol_steps", "output", "text", "No", "", "Step output.", "Optional.", ""],
  ["protocol_steps", "active", "boolean", "Yes", "true", "Show/hide step.", "Admin toggle.", ""],
  ["protocol_steps", "display_order", "int", "Yes", "1", "Sort order.", "Admin editable.", ""],
  ["protocol_steps", "updated_at", "timestamptz", "Yes", "now()", "Last update timestamp.", "Trigger managed.", ""],
  ["protocol_steps", "created_at", "timestamptz", "Yes", "now()", "Created timestamp.", "System managed.", ""],
];

writeTable(
  schema,
  "A4",
  ["Table", "Column", "DB Type", "Required", "Default", "Purpose", "Admin Notes", "Constraint"],
  schemaRows,
);
schema.freezePanes.freezeRows(4);

const site = workbook.worksheets.add("site_settings");
styleTitle(site, "A1:H1", "SITE SETTINGS", "Singleton content row. Edit values here before migrating to Supabase.");
setWidths(site, [220, 520, 150, 150, 160, 160, 160, 160]);
writeTable(
  site,
  "A4",
  ["Field", "Value", "DB Column", "Type", "Required", "Default", "Status", "Notes"],
  [
    ["Studio Status", "Accepting selected builds", "studio_status", "text", "Yes", "Accepting selected builds", "Ready", "Public availability message."],
    ["Tagline", "In Shadows, Power Remains.", "tagline", "text", "Yes", "In Shadows, Power Remains.", "Ready", "Brand phrase."],
    ["Hero Eyebrow", "BALKAN VEIL / PREMIUM DIGITAL STUDIO", "hero_eyebrow", "text", "Yes", "BALKAN VEIL / PREMIUM DIGITAL STUDIO", "Ready", "Small hero label."],
    ["Hero Headline", "Premium digital presence for brands that operate in silence.", "hero_headline", "text", "Yes", "", "Ready", "Main homepage headline."],
    ["Hero Description", "Premium websites, private digital systems and digital presence management.", "hero_description", "text", "Yes", "", "Ready", "Hero paragraph."],
    ["Primary CTA Label", "Request Access", "primary_cta_label", "text", "Yes", "Request Access", "Ready", "Primary button text."],
    ["Primary CTA URL", "/access", "primary_cta_href", "text", "Yes", "/access", "Ready", "Primary button route."],
    ["Secondary CTA Label", "View Protocol", "secondary_cta_label", "text", "Yes", "View Protocol", "Ready", "Secondary button text."],
    ["Secondary CTA URL", "/protocol", "secondary_cta_href", "text", "Yes", "/protocol", "Ready", "Secondary button route."],
    ["Starting Price", "from 1.500€", "starting_price", "text", "Yes", "from 1.500€", "Ready", "Offer display."],
    ["Standard Website Value", "3.500€", "standard_website_value", "text", "Yes", "3.500€", "Ready", "Reference value."],
    ["Partner Launch Setup", "800€", "partner_launch_setup", "text", "Yes", "800€", "Ready", "Partner setup."],
    ["Contact Email", "contact@balkanveil.com", "contact_email", "text", "No", "", "Ready", "Public contact channel."],
    ["Instagram URL", "", "instagram_url", "text", "No", "", "Pending", "Add when profile is live."],
    ["TikTok URL", "", "tiktok_url", "text", "No", "", "Pending", "Add when profile is live."],
    ["SEO Title", "Balkan Veil — Premium Digital Studio", "seo_title", "text", "Yes", "", "Ready", "Browser/search title."],
    ["SEO Description", "Premium websites, private digital systems and digital presence management.", "seo_description", "text", "Yes", "", "Ready", "Meta description."],
    ["SEO Keywords", "premium websites, digital systems, digital presence", "seo_keywords", "text[]", "Yes", "", "Ready", "Comma-separated in admin."],
  ],
);

const services = workbook.worksheets.add("service_protocols");
styleTitle(services, "A1:K1", "SERVICE PROTOCOLS", "Initial service records for the custom admin.");
setWidths(services, [190, 160, 140, 330, 260, 140, 420, 90, 90, 110, 150]);
writeTable(
  services,
  "A4",
  ["name", "codename", "category", "short_description", "primary_outcome", "starting_price", "features", "active", "featured", "display_order", "notes"],
  [
    ["Premium Website Systems", "PROTOCOL WEB-01", "website", "Premium websites designed for trust, authority and conversion.", "A high-authority public interface that positions the brand properly.", "from 1.500€", "Strategy map; Premium interface design; Responsive build; SEO-ready structure; Launch support", true, true, 1, "Homepage featured service."],
    ["Private Digital Systems", "PROTOCOL SYS-02", "digital-system", "Private dashboards, client portals and internal systems.", "Operational control through custom digital infrastructure.", "custom quote", "Admin panels; Client portals; Workflow systems; Secure access; Database structure", true, true, 2, "Scope depends on complexity."],
    ["Digital Presence Management", "PROTOCOL PRES-03", "management", "Ongoing updates, content alignment and digital presence care.", "Consistent public signal after launch.", "from 150€/month", "Website updates; Content adjustments; Social presence guidance; Technical care; Monthly improvements", true, true, 3, "Connects to retainer packages."],
  ],
);

const packages = workbook.worksheets.add("retainer_packages");
styleTitle(packages, "A1:J1", "RETAINER PACKAGES", "Initial monthly package records.");
setWidths(packages, [170, 140, 140, 330, 260, 420, 90, 120, 110, 160]);
writeTable(
  packages,
  "A4",
  ["name", "codename", "monthly_price", "short_description", "best_for", "features", "active", "recommended", "display_order", "notes"],
  [
    ["Veil Care", "CARE-150", "150€/month", "Basic technical care and controlled updates.", "New websites that need stability after launch.", "Monthly updates; Small copy edits; Technical monitoring; Basic support", true, false, 1, "Entry maintenance."],
    ["Veil Growth", "GROWTH-250", "250€/month", "Growth-oriented content and presence management.", "Brands that need active monthly improvement.", "Everything in Care; Content guidance; Section updates; Performance checks; Monthly recommendations", true, true, 2, "Recommended default."],
    ["Veil Authority", "AUTH-350", "350€/month", "Higher-touch authority and digital presence support.", "Brands that need stronger public positioning.", "Everything in Growth; Priority updates; Campaign landing pages; Social alignment; Strategic review", true, false, 3, "Premium retainer."],
  ],
);

const protocol = workbook.worksheets.add("protocol_steps");
styleTitle(protocol, "A1:H1", "PROTOCOL STEPS", "Execution sequence for Balkan Veil builds.");
setWidths(protocol, [120, 210, 180, 420, 280, 90, 110, 160]);
writeTable(
  protocol,
  "A4",
  ["step_number", "title", "codename", "short_description", "output", "active", "display_order", "notes"],
  [
    [1, "Signal Capture", "SIGNAL CAPTURE", "Clarify goals, offer, audience and positioning.", "Project direction and content inputs.", true, 1, "Discovery phase."],
    [2, "Digital Architecture", "ARCHITECTURE", "Define pages, sections, data and interaction structure.", "Site map and build plan.", true, 2, "Structural phase."],
    [3, "Interface Design", "INTERFACE", "Design the public interface and visual system.", "Approved visual direction.", true, 3, "Design phase."],
    [4, "Build Phase", "BUILD", "Develop the site, admin and core functionality.", "Working implementation.", true, 4, "Development phase."],
    [5, "Launch Sequence", "LAUNCH", "QA, optimize, deploy and connect domain.", "Live public interface.", true, 5, "Deployment phase."],
    [6, "Presence Management", "PRESENCE", "Maintain and improve digital presence after launch.", "Stable ongoing system.", true, 6, "Retainer phase."],
  ],
);

const sql = workbook.worksheets.add("SQL Checklist");
styleTitle(sql, "A1:F1", "SUPABASE MIGRATION CHECKLIST", "Use this before moving the Excel blueprint into Supabase.");
setWidths(sql, [90, 360, 160, 220, 180, 220]);
writeTable(
  sql,
  "A4",
  ["Step", "Task", "Owner", "Status", "Reference", "Notes"],
  [
    [1, "Create Supabase project.", "Admin", "Pending", "Supabase dashboard", "Use production organization."],
    [2, "Run supabase/schema.sql in SQL Editor.", "Admin", "Pending", "schema.sql", "Creates tables, triggers and RLS policies."],
    [3, "Create admin user in Supabase Auth.", "Admin", "Pending", "Authentication / Users", "Use contact@balkanveil.com if desired."],
    [4, "Add VITE_SUPABASE_URL to .env.local and Vercel.", "Admin", "Pending", ".env.example", "Required by Vite."],
    [5, "Add VITE_SUPABASE_ANON_KEY to .env.local and Vercel.", "Admin", "Pending", ".env.example", "Required by Vite."],
    [6, "Test /admin/login locally.", "Admin", "Pending", "/admin/login", "Confirm auth flow."],
    [7, "Test publishing Site Settings.", "Admin", "Pending", "/admin/site-settings", "Confirm database update."],
  ],
);

for (const sheet of workbook.worksheets.items) {
  const used = sheet.getUsedRange();
  if (used) {
    used.format.font = { name: "Inter", color: text };
    used.format.wrapText = true;
    used.format.verticalAlignment = "top";
  }
}

await fs.mkdir(outputDir, { recursive: true });

await workbook.inspect({
  kind: "table",
  range: "Overview!A1:H16",
  include: "values,formulas",
  tableMaxRows: 18,
  tableMaxCols: 8,
});

await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 300 },
  summary: "formula error scan",
});

const xlsx = await SpreadsheetFile.exportXlsx(workbook);
await xlsx.save(outputPath);
console.log(outputPath);
