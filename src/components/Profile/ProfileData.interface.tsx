import { FoodObject } from "../Food/foodDetails/FoodDetails";

export interface ProfileData {
  id: number;
  username: string;
  phone: string;
  mail: string;
  address: string;
  latitude: number;
  longitude: number;
  food: FoodObject[];
}
