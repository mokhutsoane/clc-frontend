export interface HouseModel {
  houses: House[];
}

export interface House {
  id?: number;
  user_id?: number;
  address: string;
  description: string;
  created_at?: string;
  updated_at?: string;
  latitude: string | null;
  longitude: string | null;
}
