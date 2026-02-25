export type MachineBase = {
  name: string;
};

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
