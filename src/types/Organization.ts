export interface Organizations {
  organizations: Organization[];
}

export interface Organization {
  organization: string;
  zone_id: number;
  zone: string;
  polygon_decoded: string;
}
