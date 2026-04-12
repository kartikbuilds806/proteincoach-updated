export interface ProfileRow {
  id: string; // uuid
  name: string | null;
  age: number | null;
  height_cm: number | null;
  weight_kg: number | null;
  target_weight_kg: number | null;
  goal: string | null;
  budget: string | null;
  routine: string | null;
  protein_preference: string | null;
  daily_protein_goal: number | null;
  created_at?: string;
  updated_at?: string;
}

export interface ProteinLogRow {
  id?: string | number; // uuid or bigserial
  user_id: string; // uuid
  food_name: string | null;
  protein_g: number;
  calories: number | null;
  quantity_g: number | null;
  meal_type: string | null;
  logged_at?: string;
}
