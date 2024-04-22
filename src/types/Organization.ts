export interface SeriesGrouped {
  organizations: Organizations;
}
export interface Organizations {
  adasa?: Values;
  gsinima?: Values;
}
export interface Values {
  values: Series;
}
export interface Series {
  "CHL-01": Serie[];
  "SPM-01": Serie[];
}
export interface Serie {
  timestamp: string;
  variable: string;
  organization: string;
  value: number;
  ingestion_time: string;
}
export enum TypeZonesSelection {
  "No selected",
  "Single zone",
  "All selected",
}
