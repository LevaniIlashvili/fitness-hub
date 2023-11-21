export interface Exercise {
  bodyPart: string;
  equipment: string;
  gifUrl: string;
  id: string;
  name: string;
  target: string;
  secondaryMuscles: string[];
  instructions: string[];
}

export interface AltMeasure {
  serving_weight: number;
  measure: string;
  seq: number;
  qty: number;
}

export interface FoodData {
  food_name: string;
  photo: {
    thumb: string;
  };
  nf_calories: number;
  nf_total_fat: number;
  nf_saturated_fat: number;
  nf_trans_fat: number;
  nf_polyunsaturated_fat: number;
  nf_monounsaturated_fat: number;
  nf_cholesterol: number;
  nf_sodium: number;
  nf_total_carbohydrate: number;
  nf_dietary_fiber: number;
  nf_sugars: number;
  nf_protein: number;
  nf_vitamin_d: number;
  nf_calcium: number;
  nf_iron: number;
  nf_potassium: number;
  nf_caffeine: number;
  serving_unit: string;
  serving_qty: number;
  serving_weight_grams: number;
  alt_measures: AltMeasure[];
  full_nutrients: { attr_id: number; value: number }[];
}
