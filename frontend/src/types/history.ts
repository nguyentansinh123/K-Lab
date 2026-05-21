export interface CognitiveData {
  avg: number;
  base: number;
  peak: number;
  label: string;
  alignment?: number;
}

export interface Session {
  id: string;
  app: string;
  appIcon: string;
  title: string;
  duration: string;
  focus: number;
  topic: string;
  path: string;
  pathIcon: string;
  notes: string;
  cognitive: CognitiveData;
  accentColor: "primary" | "tertiary";
}

export interface DayLog {
  date: string;
  totalFocus: string;
  isPast?: boolean;
  sessions: Session[];
}

export interface ToolStat {
  name: string;
  icon: string;
  accentColor: "primary" | "tertiary";
  badge?: string;
  thisWeek: string;
  thisMonth: string;
}
