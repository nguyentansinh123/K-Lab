export interface ActiveWindow {
  title: string;
  app: string;
  initialTitle: string;
}

export interface PollingOptions {
  intervalMs: number;
  immediate?: boolean;
}

export interface ActivityLog {
  id?: number;
  app: string;
  title: string;
  started_at: string;
  ended_at: string | null;
  duration_mins: number;
  is_productive: "productive" | "unproductive" | "unknown";
  user_key: string | null;
}
