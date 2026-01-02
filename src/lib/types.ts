export interface Portfolio {
  id: string;
  name: string;
  description: string;
  owner: string;
  lastUpdated: string;
  rocks: string[];
}

export interface Rock {
  id: string;
  name: string;
  description: string;
  owner: string;
  status: "On Track" | "At Risk" | "Off Track" | "Complete";
  healthScore: number;
  confidence: "High" | "Medium" | "Low";
  startDate: string;
  targetDate: string;
  kpis: string[];
  risks: string[];
  decisions: string[];
  actions: string[];
}

export interface KPI {
  id: string;
  rockId: string;
  name: string;
  description: string;
  target: number;
  current: number;
  unit: string;
  trend: "Up" | "Down" | "Stable";
  status: "On Track" | "At Risk" | "Off Track";
}

export interface Risk {
  id: string;
  rockId: string;
  title: string;
  description: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  probability: "High" | "Medium" | "Low";
  mitigation: string;
  owner: string;
  status: "Open" | "Mitigated" | "Closed";
}

export interface Decision {
  id: string;
  rockId: string;
  title: string;
  description: string;
  status: "Pending" | "Decided" | "Deferred";
  decisionDate: string | null;
  decisionMaker: string;
  impact: "High" | "Medium" | "Low";
}

export interface Action {
  id: string;
  rockId: string;
  title: string;
  description: string;
  owner: string;
  dueDate: string;
  status: "Open" | "In Progress" | "Complete";
  priority: "Critical" | "High" | "Medium" | "Low";
}

export interface CadenceArtifact {
  name: string;
  offsetBusinessDays: number;
}

export interface CadenceRule {
  id: string;
  name: string;
  frequency: "daily" | "weekly" | "biweekly" | "monthly" | "quarterly";
  dayOfWeek: string;
  audience: string;
  purpose: string;
  artifacts: CadenceArtifact[];
  readinessRules: string[];
  attendees: string[];
}

