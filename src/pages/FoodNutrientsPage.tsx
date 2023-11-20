import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

type AltMeasure = {
  serving_weight: number;
  measure: string;
  seq: number;
  qty: number;
};

interface FoodData {
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

const FoodNutrients = () => {
  const { id } = useParams();
  const [foodData, setFoodData] = useState<FoodData | null>(null);
  const [servingQty, setServingQty] = useState<number | null>(100);
  const [servingUnit, setServingUnit] = useState<string>("g");
  const [servingWeight, setServingWeight] = useState<number>(1);

  const nutrientCoefPerGram = useRef<number>(0);

  const getNutrients = async () => {
    try {
      const response = await axios.post(
        "https://trackapi.nutritionix.com/v2/natural/nutrients",
        { query: id },
        {
          headers: {
            "x-app-id": import.meta.env.VITE_NUTRITIONIX_ID as string,
            "x-app-key": import.meta.env.VITE_NUTRITIONIX_KEY as string,
          },
        }
      );
      const foodData = response.data.foods[0];
      setFoodData(foodData);
      addMoreNutrients(foodData);
      setUniqueMeasures(foodData);
      nutrientCoefPerGram.current =
        1 / response.data.foods[0].serving_weight_grams;
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const setUniqueMeasures = (data: FoodData) => {
    const uniqueMeasures: AltMeasure[] = [];
    data.alt_measures.forEach((measure: AltMeasure) => {
      if (uniqueMeasures.some((item) => item.measure === measure.measure))
        return;
      uniqueMeasures.push(measure);
    });
    data.alt_measures = uniqueMeasures;
  };

  const addMoreNutrients = (data: FoodData) => {
    data.full_nutrients.forEach(
      (nutrient: { attr_id: number; value: number }) => {
        switch (nutrient.attr_id) {
          case 262:
            data.nf_caffeine = nutrient.value;
            break;
          case 301:
            data.nf_calcium = nutrient.value;
            break;
          case 303:
            data.nf_iron = nutrient.value;
            break;
          case 306:
            data.nf_potassium = nutrient.value;
            break;
          case 324:
            data.nf_vitamin_d = nutrient.value;
            console.log(data.nf_vitamin_d);
            break;
          case 605:
            data.nf_trans_fat = nutrient.value;
            break;
          case 645:
            data.nf_monounsaturated_fat = nutrient.value;
            break;
          case 646:
            data.nf_polyunsaturated_fat = nutrient.value;
            break;
          default:
            return;
        }
      }
    );
  };

  useEffect(() => {
    if (!id) return;
    getNutrients();
  }, []);

  const formatNumber = (num: number) => {
    let number = num * (servingQty ? servingQty : 1);
    number *= servingWeight * nutrientCoefPerGram.current;
    console.log(number, nutrientCoefPerGram.current, servingWeight);
    return number % 1 !== 0 ? Math.round(number * 10) / 10 : number.toFixed();
  };

  if (!foodData) return <h1>Loading...</h1>;

  return (
    <Wrapper>
      <section className="nutrients-card">
        <h1>{foodData.food_name}</h1>
        <h3>Serving Size: </h3>
        <input
          type="text"
          value={servingQty === null ? "" : servingQty}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setServingQty(() => {
              if (e.target.value === "") {
                return null;
              } else if (!isNaN(+e.target.value)) {
                return +e.target.value;
              }
              return servingQty;
            })
          }
        />
        <select
          value={servingUnit}
          onChange={(e) => {
            setServingUnit(e.target.value);
            setServingQty(
              foodData.alt_measures.find(
                (measure) => measure.measure === e.target.value
              )?.qty as number
            );
            setServingWeight(() => {
              const servingWeight = foodData.alt_measures.find(
                (measure) => measure.measure === e.target.value
              )?.serving_weight as number;
              return e.target.value === "g" ? 1 : servingWeight;
            });
          }}
        >
          {foodData.alt_measures.map((measure) => {
            return (
              <option key={measure.seq} value={measure.measure}>
                {measure.measure}
              </option>
            );
          })}
        </select>
        <span>({servingWeight}g)</span>
        <h2>
          Calories{" "}
          <span>
            {Math.round(
              foodData.nf_calories *
                (servingQty ? servingQty : 1) *
                nutrientCoefPerGram.current *
                servingWeight
            )}
          </span>
        </h2>
        <h4>
          Total Fat <span>{formatNumber(foodData.nf_total_fat)} g</span>
        </h4>
        <p className="sub-nutrient">
          Saturated Fat <span>{formatNumber(foodData.nf_saturated_fat)} g</span>
        </p>
        {foodData.nf_trans_fat !== null &&
          foodData.nf_trans_fat !== undefined && (
            <p className="sub-nutrient">
              Trans Fat <span>{formatNumber(foodData.nf_trans_fat)} g</span>
            </p>
          )}
        <p className="sub-nutrient">
          Polyunsaturated Fat{" "}
          <span>{formatNumber(foodData.nf_polyunsaturated_fat)} g</span>
        </p>
        <p className="sub-nutrient">
          Monounsaturated Fat{" "}
          <span>{formatNumber(foodData.nf_monounsaturated_fat)} g</span>
        </p>
        <h4>
          Cholesterol <span>{formatNumber(foodData.nf_cholesterol)} mg</span>
        </h4>
        <h4>
          Sodium <span>{formatNumber(foodData.nf_sodium)} mg</span>
        </h4>
        <h4>
          Total Carbohydrate{" "}
          <span>{formatNumber(foodData.nf_total_carbohydrate)} g</span>
        </h4>
        <p className="sub-nutrient">
          Dietary Fiber <span>{formatNumber(foodData.nf_dietary_fiber)} g</span>
        </p>
        <p className="sub-nutrient">
          Sugars <span>{formatNumber(foodData.nf_sugars)} g</span>
        </p>
        <h4>
          protein <span>{formatNumber(foodData.nf_protein)} g</span>
        </h4>
        <p>
          Vitamin D <span>{formatNumber(foodData.nf_vitamin_d)} mcg</span>
        </p>
        <p>
          Calcium <span>{formatNumber(foodData.nf_calcium)} mg</span>
        </p>
        <p>
          Iron <span>{formatNumber(foodData.nf_iron)} mg</span>
        </p>
        <p>
          Potassium <span>{formatNumber(foodData.nf_potassium)} mg</span>
        </p>
        <h4>
          Caffeine <span> {formatNumber(foodData.nf_caffeine)} mg</span>
        </h4>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 4rem 0 0 4rem;

  .nutrients-card {
    width: 40rem;
    padding: 1rem;
    border: 1px solid var(--black);
  }

  input[type="text"] {
    width: 3rem;
    text-align: center;
    outline: none;
  }

  select {
    outline: none;
  }

  h1,
  h2,
  h4,
  p {
    width: 100%;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid var(--black);
    margin-bottom: 0.5rem;
  }

  h1 {
    color: var(--orange);
    text-transform: capitalize;
    font-size: 3rem;
  }

  .sub-nutrient {
    padding-left: 2rem;
  }
`;

export default FoodNutrients;
