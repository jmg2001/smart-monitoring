export type MachineBase = {
  name: string;
  id: string;
};

export type CompanyBase = {
  name: string;
  id: string;
};

export interface MachineAPI extends MachineBase {
  api_key: string;
}

export interface MachineOverview extends MachineBase {
  id: string;
  status: string;
  total_production: number;
  last_update_seconds: number;
}

export type MachineSeriesData = {
  timestamp: string;
  count_value: number;
  status: string;
};

export type MachineDailyData = {
  date: string;
  total_production: number;
  run_time_minutes: number;
  stop_time_minutes: number;
  availability_percent: number;
};

export type MachineRealtimeData = {
  status: string;
  last_count: number;
  last_timestamp: string;
  seconds_since_last_update: number;
};

export type ServerStatistics = {
  total_companies: number;
  total_machines: number;
  total_users: number;
  total_records: number;
  active_machines_today: number;
};

export type ServerStatus = {
  time: string;
  cpu: number;
  memory: number;
  rpm: number;
};

export type UserBase = {
  id: string;
  role: string;
  email: string;
  company_id: string;
};

export interface TokenPayload {
  sub: string;
  role: string;
  company_id: string | null;
  exp: number;
}

export interface AuthContextType {
  user: TokenPayload | null;
  login: (token: string) => void;
  logout: () => void;
}
