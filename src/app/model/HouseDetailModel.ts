export interface HouseDetailModel {
  house: House;
  images: Image[];
}

export interface House {
  id: number;
  user_id: number;
  address: string;
  description: string;
  created_at: string;
  updated_at: string;
  latitude: string;
  longitude: string;
}

export interface Image {
  id: number;
  user_id: number;
  house_id: number;
  image_url: string;
  title: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}
