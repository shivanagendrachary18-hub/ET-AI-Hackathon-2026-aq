import {
  aiInsights,
  assets,
  complianceAlerts,
  recentUploads,
  recommendations,
  workOrders,
} from "@/lib/mock-data"

export type AssistantCitation = {
  source: string
  page: string
}

export type AssistantResponse = {
  content: string
  confidence: number
  citations: AssistantCitation[]
  recommendations: string[]
}

const assetAliases: Record<string, string> = {
  "turbine a-7": "Gas Turbine A-7",
  "gt-a7": "Gas Turbine A-7",
  "compressor c-3": "Air Compressor C-3",
  "cmp-c3": "Air Compressor C-3",
  "pump p-114": "Centrifugal Pump P-114",
  "pmp-114": "Centrifugal Pump P-114",
  "conveyor cv-9": "Conveyor Belt CV-9",
  "cv-9": "Conveyor Belt CV-9",
  "boiler b-1": "Boiler B-1",
  "blr-01": "Boiler B-1",
  "cooling tower ct-2": "Cooling Tower CT-2",
  "ct-2": "Cooling Tower CT-2",
}

const findAsset = (query: string) => {
  const normalized = query.toLowerCase()
  const alias = Object.entries(assetAliases).find(([key]) => normalized.includes(key))?.[1]
  return assets.find((asset) => asset.name.toLowerCase() === alias?.toLowerCase())
    ?? assets.find((asset) => normalized.includes(asset.name.toLowerCase()))
}

const citationsForAsset = (assetName: string): AssistantCitation[] => {
  if (assetName.includes("Turbine A-7")) {
    return [
      { source: "Turbine-A7-Inspection.pdf", page: "p. 12" },
      { source: "Gearbox-Vibration-Report.pdf", page: "p. 4" },
    ]
  }
  if (assetName.includes("Compressor C-3")) {
    return [
      { source: "Compressor-SOP-v3.docx", page: "§3.2" },
      { source: "Pump-Station-Logs-Q2.xlsx", page: "Sheet 2" },
    ]
  }
  return [{ source: "Indexed maintenance records", page: "Asset history" }]
}

const assetAnswer = (asset: (typeof assets)[number]): AssistantResponse => {
  const recommendation = recommendations.find((item) => item.asset === asset.name)
  const workOrder = workOrders.find((item) => item.asset === asset.name)
  const risk = asset.status === "Critical" ? "critical" : asset.status === "At Risk" ? "elevated" : "moderate"
  const failureProbability = asset.status === "Critical" ? 87 : asset.status === "At Risk" ? 72 : asset.status === "Monitor" ? 48 : 18

  return {
    content:
      `${asset.name} currently has an ${risk} risk profile. Its health score is ${asset.health}/100 and its status is ${asset.status}. ` +
      `${recommendation ? `The strongest AI recommendation is: ${recommendation.title}. ` : "No urgent AI recommendation is currently attached to this asset. "}` +
      `${workOrder ? `The related work order is ${workOrder.id}, currently ${workOrder.status.toLowerCase()}. ` : "No active work order was found in the current dataset. "}` +
      `For this demo dataset, the estimated near-term failure probability is ${failureProbability}%.`,
    confidence: asset.status === "Critical" || asset.status === "At Risk" ? 91 : 82,
    citations: citationsForAsset(asset.name),
    recommendations: recommendation
      ? [recommendation.title, `Planned downtime: ${recommendation.downtime}`, `Estimated impact: ${recommendation.savings}`]
      : ["Continue scheduled monitoring", `Review the latest ${asset.docs} indexed documents before the next service window`],
  }
}

export function answerAssistantQuery(query: string): AssistantResponse {
  const normalized = query.toLowerCase()
  const asset = findAsset(normalized)

  if (asset) {
    return assetAnswer(asset)
  }

  if (normalized.includes("compliance") || normalized.includes("safety") || normalized.includes("inspection")) {
    const highRisk = complianceAlerts.filter((alert) => alert.severity === "high")
    return {
      content:
        `There are ${complianceAlerts.length} compliance alerts in the current dataset, including ${highRisk.length} high-severity items. ` +
        `The highest-priority issues are ${highRisk.map((alert) => `${alert.title} (${alert.asset})`).join(" and ")}. ` +
        "These should be reviewed before the next audit or maintenance window.",
      confidence: 94,
      citations: [{ source: "Compliance alerts", page: "Current register" }],
      recommendations: [
        "Resolve the expired hot-work permit",
        "Complete the missing Boiler B-1 pressure-vessel inspection",
        "Review the Valve V-114 lockout/tagout SOP gap",
      ],
    }
  }

  if (normalized.includes("maintenance") || normalized.includes("work order") || normalized.includes("repair")) {
    const urgent = workOrders.filter((order) => order.risk === "Critical" || order.risk === "High")
    return {
      content:
        `There are ${workOrders.length} maintenance work orders in the current dataset. ` +
        `${urgent.length} are high-priority. The most urgent is ${urgent[0]?.id ?? "not available"} for ${urgent[0]?.asset ?? "the selected asset"}, ` +
        `with ${urgent[0]?.downtime ?? "unknown"} estimated downtime and status ${urgent[0]?.status ?? "unknown"}.`,
      confidence: 93,
      citations: [{ source: "Maintenance work orders", page: "Current register" }],
      recommendations: urgent.slice(0, 3).map((order) => `${order.id}: ${order.task} — ${order.status}`),
    }
  }

  if (normalized.includes("document") || normalized.includes("report") || normalized.includes("upload")) {
    return {
      content:
        `The knowledge base currently contains ${recentUploads.length} recent indexed documents in the demo view. ` +
        `The latest upload is ${recentUploads[0]?.name ?? "not available"}. ` +
        "These documents are surfaced as evidence for asset analysis and AI recommendations.",
      confidence: 88,
      citations: recentUploads.slice(0, 3).map((file) => ({ source: file.name, page: "Indexed" })),
      recommendations: [
        "Open the Documents workspace to inspect indexed evidence",
        "Use an asset-specific question to connect documents to an operational risk",
      ],
    }
  }

  if (normalized.includes("risk") || normalized.includes("failure") || normalized.includes("fail")) {
    const critical = assets.filter((item) => item.status === "Critical" || item.status === "At Risk")
    return {
      content:
        `The current dataset has ${critical.length} assets requiring elevated attention: ${critical.map((item) => `${item.name} (${item.health}/100)`).join(", ")}. ` +
        `The most urgent is ${critical.sort((a, b) => a.health - b.health)[0]?.name ?? "not available"}. ` +
        "Use the asset-specific view to inspect the evidence and recommended maintenance action.",
      confidence: 92,
      citations: [{ source: "Asset health register", page: "Current snapshot" }, { source: "AI insights", page: "Today" }],
      recommendations: critical.slice(0, 3).map((item) => `Investigate ${item.name} — health ${item.health}/100`),
    }
  }

  const insight = aiInsights[0]
  return {
    content:
      `I can analyze assets, maintenance, compliance, documents and failure risk using the current Industrial Brain dataset. ` +
      `The strongest current insight is ${insight?.title ?? "an elevated asset-risk signal"}. ` +
      `${insight?.detail ?? "Open an asset or ask a specific operational question for a grounded answer."}`,
    confidence: 84,
    citations: [{ source: "AI insights", page: "Today" }],
    recommendations: [
      "Ask: Why is Turbine A-7 at risk?",
      "Ask: Which assets require immediate maintenance?",
      "Ask: Which assets have compliance issues?",
    ],
  }
}
