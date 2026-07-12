export type Trend = "up" | "down" | "flat"

export const kpis: {
  key: string
  label: string
  value: string
  delta: string
  trend: Trend
  hint: string
}[] = [
  { key: "assets", label: "Total Assets", value: "1,284", delta: "+42", trend: "up", hint: "tracked equipment" },
  { key: "documents", label: "Total Documents", value: "18,930", delta: "+312", trend: "up", hint: "indexed files" },
  { key: "incidents", label: "Active Incidents", value: "7", delta: "-3", trend: "down", hint: "needs attention" },
  { key: "maintenance", label: "Pending Maintenance", value: "23", delta: "+5", trend: "up", hint: "work orders" },
  { key: "compliance", label: "Compliance Score", value: "94%", delta: "+1.2%", trend: "up", hint: "audit ready" },
]

export const assetHealth = [
  { name: "Optimal", value: 812, fill: "var(--color-optimal)" },
  { name: "Monitor", value: 316, fill: "var(--color-monitor)" },
  { name: "At Risk", value: 118, fill: "var(--color-risk)" },
  { name: "Critical", value: 38, fill: "var(--color-critical)" },
]

export const uptimeTrend = [
  { month: "Jan", uptime: 96.2, incidents: 12 },
  { month: "Feb", uptime: 97.1, incidents: 9 },
  { month: "Mar", uptime: 95.8, incidents: 14 },
  { month: "Apr", uptime: 98.0, incidents: 6 },
  { month: "May", uptime: 98.6, incidents: 5 },
  { month: "Jun", uptime: 97.9, incidents: 7 },
  { month: "Jul", uptime: 99.1, incidents: 4 },
]

export const failureTrends = [
  { month: "Jan", mechanical: 8, electrical: 5, thermal: 3 },
  { month: "Feb", mechanical: 6, electrical: 4, thermal: 2 },
  { month: "Mar", mechanical: 9, electrical: 6, thermal: 4 },
  { month: "Apr", mechanical: 5, electrical: 3, thermal: 2 },
  { month: "May", mechanical: 4, electrical: 4, thermal: 1 },
  { month: "Jun", mechanical: 6, electrical: 2, thermal: 3 },
  { month: "Jul", mechanical: 3, electrical: 2, thermal: 1 },
]

export const maintenanceCost = [
  { month: "Jan", planned: 42000, reactive: 28000 },
  { month: "Feb", planned: 38000, reactive: 21000 },
  { month: "Mar", planned: 45000, reactive: 34000 },
  { month: "Apr", planned: 41000, reactive: 18000 },
  { month: "May", planned: 39000, reactive: 15000 },
  { month: "Jun", planned: 43000, reactive: 19000 },
  { month: "Jul", planned: 40000, reactive: 12000 },
]

export const recentUploads = [
  { id: "u1", name: "Turbine-A7-Inspection.pdf", type: "PDF", size: "4.2 MB", by: "M. Chen", when: "12 min ago" },
  { id: "u2", name: "Pump-Station-Logs-Q2.xlsx", type: "Excel", size: "1.8 MB", by: "S. Patel", when: "48 min ago" },
  { id: "u3", name: "Compressor-SOP-v3.docx", type: "DOCX", size: "820 KB", by: "A. Rivera", when: "2 hrs ago" },
  { id: "u4", name: "Thermal-Scan-Bearing.png", type: "Image", size: "3.1 MB", by: "J. Okafor", when: "5 hrs ago" },
  { id: "u5", name: "Gearbox-Vibration-Report.pdf", type: "PDF", size: "2.4 MB", by: "M. Chen", when: "Yesterday" },
]

export const aiInsights = [
  {
    id: "i1",
    title: "Bearing degradation predicted on Turbine A-7",
    detail: "Vibration signature matches early-stage inner-race fault. Recommend inspection within 14 days.",
    severity: "high" as const,
    confidence: 92,
  },
  {
    id: "i2",
    title: "Compressor C-3 efficiency drift",
    detail: "Discharge temperature trending +4°C over baseline. Likely fouled intercooler.",
    severity: "medium" as const,
    confidence: 78,
  },
  {
    id: "i3",
    title: "SOP gap detected for Pump Station 2",
    detail: "No documented lockout procedure for valve V-114. Compliance risk.",
    severity: "medium" as const,
    confidence: 85,
  },
]

export type Asset = {
  id: string
  name: string
  tag: string
  type: string
  location: string
  health: number
  status: "Operational" | "Monitor" | "At Risk" | "Critical"
  lastService: string
  docs: number
  incidents: number
}

export const assets: Asset[] = [
  { id: "a1", name: "Gas Turbine A-7", tag: "GT-A7", type: "Turbine", location: "Plant 1 · Hall B", health: 62, status: "At Risk", lastService: "2025-05-18", docs: 214, incidents: 3 },
  { id: "a2", name: "Centrifugal Pump P-114", tag: "PMP-114", type: "Pump", location: "Pump Station 2", health: 88, status: "Operational", lastService: "2025-06-30", docs: 96, incidents: 0 },
  { id: "a3", name: "Air Compressor C-3", tag: "CMP-C3", type: "Compressor", location: "Plant 2 · Utilities", health: 74, status: "Monitor", lastService: "2025-06-11", docs: 152, incidents: 1 },
  { id: "a4", name: "Cooling Tower CT-2", tag: "CT-02", type: "Cooling", location: "Plant 1 · Roof", health: 91, status: "Operational", lastService: "2025-07-02", docs: 61, incidents: 0 },
  { id: "a5", name: "Conveyor Belt CV-9", tag: "CV-09", type: "Conveyor", location: "Warehouse East", health: 45, status: "Critical", lastService: "2025-04-22", docs: 38, incidents: 5 },
  { id: "a6", name: "Boiler B-1", tag: "BLR-01", type: "Boiler", location: "Plant 2 · Steam", health: 83, status: "Operational", lastService: "2025-06-25", docs: 178, incidents: 1 },
]

export const maintenanceTimeline = [
  { id: "t1", date: "2025-07-08", title: "Vibration analysis completed", meta: "GT-A7 · Predictive", type: "predictive" as const },
  { id: "t2", date: "2025-06-30", title: "Seal replacement", meta: "PMP-114 · Planned", type: "planned" as const },
  { id: "t3", date: "2025-06-11", title: "Intercooler cleaning", meta: "CMP-C3 · Corrective", type: "corrective" as const },
  { id: "t4", date: "2025-05-18", title: "Blade borescope inspection", meta: "GT-A7 · Planned", type: "planned" as const },
  { id: "t5", date: "2025-04-22", title: "Emergency belt splice", meta: "CV-09 · Reactive", type: "reactive" as const },
]

export type WorkOrder = {
  id: string
  asset: string
  task: string
  risk: "Low" | "Medium" | "High" | "Critical"
  downtime: string
  due: string
  assignee: string
  status: "Scheduled" | "In Progress" | "Overdue" | "Done"
}

export const workOrders: WorkOrder[] = [
  { id: "WO-4821", asset: "Conveyor Belt CV-9", task: "Replace drive motor bearings", risk: "Critical", downtime: "6 hrs", due: "2025-07-14", assignee: "A. Rivera", status: "Overdue" },
  { id: "WO-4830", asset: "Gas Turbine A-7", task: "Borescope + bearing inspection", risk: "High", downtime: "12 hrs", due: "2025-07-19", assignee: "M. Chen", status: "Scheduled" },
  { id: "WO-4835", asset: "Air Compressor C-3", task: "Intercooler descale", risk: "Medium", downtime: "3 hrs", due: "2025-07-22", assignee: "S. Patel", status: "In Progress" },
  { id: "WO-4840", asset: "Boiler B-1", task: "Safety valve calibration", risk: "Medium", downtime: "2 hrs", due: "2025-07-25", assignee: "J. Okafor", status: "Scheduled" },
  { id: "WO-4844", asset: "Cooling Tower CT-2", task: "Fan belt tension check", risk: "Low", downtime: "1 hr", due: "2025-07-28", assignee: "S. Patel", status: "Scheduled" },
]

export const recommendations = [
  {
    id: "r1",
    asset: "Conveyor Belt CV-9",
    title: "Replace drive motor bearings immediately",
    rationale: "Acoustic emission and thermal data indicate imminent bearing seizure. Failure probability 87% within 10 days.",
    risk: "Critical" as const,
    downtime: "6 hrs planned vs ~48 hrs unplanned",
    confidence: 91,
    savings: "$128k",
  },
  {
    id: "r2",
    asset: "Gas Turbine A-7",
    title: "Schedule inner-race bearing inspection",
    rationale: "Early fault frequencies detected in vibration spectrum. Trending toward stage-2 defect.",
    risk: "High" as const,
    downtime: "12 hrs planned",
    confidence: 84,
    savings: "$76k",
  },
  {
    id: "r3",
    asset: "Air Compressor C-3",
    title: "Clean fouled intercooler",
    rationale: "Discharge temperature +4°C over baseline reducing efficiency by ~6%.",
    risk: "Medium" as const,
    downtime: "3 hrs planned",
    confidence: 78,
    savings: "$21k / yr energy",
  },
  {
    id: "r4",
    asset: "Boiler B-1",
    title: "Recalibrate safety relief valve",
    rationale: "Set-point drift detected during last cycle. Recommend recalibration before next audit.",
    risk: "Medium" as const,
    downtime: "2 hrs planned",
    confidence: 72,
    savings: "Compliance",
  },
]

export const complianceAlerts = [
  { id: "c1", title: "Expired hot-work permit", asset: "Plant 2 · Steam", type: "Expired Permit", severity: "high" as const, due: "Expired 3 days ago" },
  { id: "c2", title: "Missing pressure vessel inspection", asset: "Boiler B-1", type: "Missing Inspection", severity: "high" as const, due: "Overdue" },
  { id: "c3", title: "Lockout/tagout SOP not documented", asset: "Valve V-114", type: "Safety Alert", severity: "medium" as const, due: "Review needed" },
  { id: "c4", title: "Fire suppression test due", asset: "Warehouse East", type: "Missing Inspection", severity: "medium" as const, due: "In 6 days" },
  { id: "c5", title: "Confined space entry log gap", asset: "Cooling Tower CT-2", type: "Safety Alert", severity: "low" as const, due: "Minor" },
]

export const complianceStats = [
  { label: "Compliant", value: 142 },
  { label: "Pending Review", value: 18 },
  { label: "Non-Compliant", value: 6 },
]

export const chatSuggestions = [
  "What's the failure risk for Turbine A-7 this month?",
  "Summarize the last inspection report for Compressor C-3",
  "Which assets are missing safety inspections?",
  "Draft a maintenance plan for the conveyor system",
]

export const chatHistory = [
  { id: "h1", title: "Turbine A-7 vibration analysis", when: "Today" },
  { id: "h2", title: "Q2 maintenance cost breakdown", when: "Today" },
  { id: "h3", title: "Compressor efficiency report", when: "Yesterday" },
  { id: "h4", title: "Compliance gap review", when: "Yesterday" },
  { id: "h5", title: "Pump station SOP lookup", when: "Jul 8" },
]

export const graphNodes = [
  { id: "gt-a7", label: "Turbine A-7", type: "equipment", x: 50, y: 42 },
  { id: "bearing", label: "Bearing Fault", type: "failure", x: 22, y: 20 },
  { id: "cmp-c3", label: "Compressor C-3", type: "equipment", x: 78, y: 24 },
  { id: "sop-114", label: "SOP-114", type: "sop", x: 20, y: 70 },
  { id: "eng-chen", label: "M. Chen", type: "engineer", x: 52, y: 82 },
  { id: "eng-patel", label: "S. Patel", type: "engineer", x: 82, y: 66 },
  { id: "overheat", label: "Overheating", type: "failure", x: 88, y: 46 },
  { id: "pmp-114", label: "Pump P-114", type: "equipment", x: 30, y: 46 },
]

export const graphEdges: { from: string; to: string; label: string }[] = [
  { from: "gt-a7", to: "bearing", label: "exhibits" },
  { from: "gt-a7", to: "eng-chen", label: "maintained by" },
  { from: "gt-a7", to: "pmp-114", label: "feeds" },
  { from: "cmp-c3", to: "overheat", label: "risk of" },
  { from: "cmp-c3", to: "eng-patel", label: "maintained by" },
  { from: "pmp-114", to: "sop-114", label: "governed by" },
  { from: "sop-114", to: "eng-chen", label: "authored by" },
  { from: "overheat", to: "bearing", label: "leads to" },
]

export const analyticsKpis: {
  key: string
  label: string
  value: string
  delta: string
  trend: Trend
  hint: string
}[] = [
  { key: "mtbf", label: "Mean Time Between Failures", value: "412 hrs", delta: "+18%", trend: "up", hint: "vs last quarter" },
  { key: "mttr", label: "Mean Time to Repair", value: "3.2 hrs", delta: "-22%", trend: "down", hint: "improved response" },
  { key: "oee", label: "Overall Equipment Effectiveness", value: "86.4%", delta: "+2.1%", trend: "up", hint: "fleet average" },
  { key: "savings", label: "AI-Driven Savings (YTD)", value: "$1.4M", delta: "+$180k", trend: "up", hint: "avoided downtime" },
]

export const plantMetrics = [
  { plant: "Plant 1", uptime: 98.7, oee: 88.2, incidents: 4, mtbf: 428, health: 84 },
  { plant: "Plant 2", uptime: 97.9, oee: 85.6, incidents: 6, mtbf: 396, health: 79 },
  { plant: "Pump Station 2", uptime: 99.2, oee: 91.4, incidents: 1, mtbf: 512, health: 92 },
  { plant: "Warehouse East", uptime: 94.8, oee: 72.1, incidents: 9, mtbf: 284, health: 61 },
]

export const costSavingsTrend = [
  { month: "Jan", predictive: 42000, avoided: 18000 },
  { month: "Feb", predictive: 38000, avoided: 22000 },
  { month: "Mar", predictive: 51000, avoided: 14000 },
  { month: "Apr", predictive: 47000, avoided: 31000 },
  { month: "May", predictive: 54000, avoided: 28000 },
  { month: "Jun", predictive: 49000, avoided: 35000 },
  { month: "Jul", predictive: 62000, avoided: 41000 },
]

export const auditSchedule = [
  { id: "as1", standard: "OSHA 1910.147", area: "Plant 2 · Steam", status: "Compliant" as const, lastAudit: "2025-06-15", nextDue: "2025-12-15", owner: "J. Okafor" },
  { id: "as2", standard: "API 510", area: "Boiler B-1", status: "Non-Compliant" as const, lastAudit: "2024-11-02", nextDue: "Overdue", owner: "M. Chen" },
  { id: "as3", standard: "NFPA 25", area: "Warehouse East", status: "Pending Review" as const, lastAudit: "2025-05-20", nextDue: "2025-08-20", owner: "A. Rivera" },
  { id: "as4", standard: "ISO 45001", area: "Plant 1 · Hall B", status: "Compliant" as const, lastAudit: "2025-07-01", nextDue: "2026-01-01", owner: "S. Patel" },
  { id: "as5", standard: "EPA 40 CFR", area: "Cooling Tower CT-2", status: "Compliant" as const, lastAudit: "2025-06-28", nextDue: "2025-12-28", owner: "S. Patel" },
  { id: "as6", standard: "LOTO Procedure", area: "Valve V-114", status: "Non-Compliant" as const, lastAudit: "—", nextDue: "Action required", owner: "M. Chen" },
]

export const recommendationSummary = {
  open: 4,
  approved: 12,
  dismissed: 3,
  totalSavings: "$225k",
}

export const recommendationHistory = [
  { id: "RH-118", title: "Intercooler descale", asset: "Air Compressor C-3", status: "Approved" as const, date: "2025-07-01", outcome: "$18k energy saved" },
  { id: "RH-117", title: "Fan belt tension adjustment", asset: "Cooling Tower CT-2", status: "Approved" as const, date: "2025-06-24", outcome: "Prevented 4 hr outage" },
  { id: "RH-116", title: "Seal replacement deferral", asset: "Centrifugal Pump P-114", status: "Dismissed" as const, date: "2025-06-18", outcome: "Risk accepted" },
  { id: "RH-115", title: "Thermal scan follow-up", asset: "Gas Turbine A-7", status: "Approved" as const, date: "2025-06-10", outcome: "Fault confirmed early" },
  { id: "RH-114", title: "Conveyor alignment check", asset: "Conveyor Belt CV-9", status: "Dismissed" as const, date: "2025-06-02", outcome: "Scheduled manually" },
]

export const graphStats = [
  { label: "Total Nodes", value: "1,284", hint: "equipment, SOPs, people" },
  { label: "Relationships", value: "4,892", hint: "typed edges" },
  { label: "Document Links", value: "18,930", hint: "indexed references" },
  { label: "Coverage", value: "94%", hint: "assets mapped" },
]

export const graphEntityIndex = [
  { id: "gt-a7", label: "Turbine A-7", type: "Equipment", relations: 4, documents: 214, status: "At Risk" as const },
  { id: "cmp-c3", label: "Compressor C-3", type: "Equipment", relations: 3, documents: 152, status: "Monitor" as const },
  { id: "pmp-114", label: "Pump P-114", type: "Equipment", relations: 3, documents: 96, status: "Operational" as const },
  { id: "bearing", label: "Bearing Fault", type: "Failure Mode", relations: 2, documents: 18, status: "High" as const },
  { id: "sop-114", label: "SOP-114", type: "Procedure", relations: 2, documents: 4, status: "Review" as const },
  { id: "eng-chen", label: "M. Chen", type: "Engineer", relations: 3, documents: 0, status: "Active" as const },
]
