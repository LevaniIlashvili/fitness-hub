import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FoodData } from "../../../types/main";

interface NutrientsCardProps {
  foodData: FoodData;
  timesToMultiplyNutrients: number;
  setTimesToMultiplyNutrients: React.Dispatch<React.SetStateAction<number>>;
}

const NutrientsCard = ({
  foodData,
  timesToMultiplyNutrients,
  setTimesToMultiplyNutrients,
}: NutrientsCardProps) => {
  const [servingQty, setServingQty] = useState<number | null>(100);
  const [servingUnit, setServingUnit] = useState<string>("g");
  const [servingWeight, setServingWeight] = useState<number>(1);

  const nutrientCoefPerGram = 1 / foodData.serving_weight_grams;

  useEffect(() => {
    setTimesToMultiplyNutrients(
      (servingQty ? servingQty : 1) * nutrientCoefPerGram * servingWeight
    );
  }, [servingQty, nutrientCoefPerGram, servingWeight]);

  const formatNumber = (num: number) => {
    let number = num * timesToMultiplyNutrients;
    return number % 1 !== 0 ? Math.round(number * 10) / 10 : number.toFixed();
  };

  return (
    <Wrapper>
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
          {Math.round(foodData.nf_calories * timesToMultiplyNutrients) || 0}
        </span>
      </h2>
      <h4>
        Total Fat <span>{formatNumber(foodData.nf_total_fat) || 0} g</span>
      </h4>
      <p className="sub-nutrient">
        Saturated Fat{" "}
        <span>{formatNumber(foodData.nf_saturated_fat) || 0} g</span>
      </p>
      {foodData.nf_trans_fat !== null &&
        foodData.nf_trans_fat !== undefined && (
          <p className="sub-nutrient">
            Trans Fat <span>{formatNumber(foodData.nf_trans_fat) || 0} g</span>
          </p>
        )}
      <p className="sub-nutrient">
        Polyunsaturated Fat{" "}
        <span>{formatNumber(foodData.nf_polyunsaturated_fat) || 0} g</span>
      </p>
      <p className="sub-nutrient">
        Monounsaturated Fat{" "}
        <span>{formatNumber(foodData.nf_monounsaturated_fat) || 0} g</span>
      </p>
      <h4>
        Cholesterol <span>{formatNumber(foodData.nf_cholesterol) || 0} mg</span>
      </h4>
      <h4>
        Sodium <span>{formatNumber(foodData.nf_sodium) || 0} mg</span>
      </h4>
      <h4>
        Total Carbohydrate{" "}
        <span>{formatNumber(foodData.nf_total_carbohydrate) || 0} g</span>
      </h4>
      <p className="sub-nutrient">
        Dietary Fiber{" "}
        <span>{formatNumber(foodData.nf_dietary_fiber || 0)} g</span>
      </p>
      <p className="sub-nutrient">
        Sugars <span>{formatNumber(foodData.nf_sugars) || 0} g</span>
      </p>
      <h4>
        protein <span>{formatNumber(foodData.nf_protein) || 0} g</span>
      </h4>
      <p>
        Vitamin D <span>{formatNumber(foodData.nf_vitamin_d) || 0} mcg</span>
      </p>
      <p>
        Calcium <span>{formatNumber(foodData.nf_calcium) || 0} mg</span>
      </p>
      <p>
        Iron <span>{formatNumber(foodData.nf_iron) || 0} mg</span>
      </p>
      <p>
        Potassium <span>{formatNumber(foodData.nf_potassium) || 0} mg</span>
      </p>
      <h4>
        Caffeine <span> {formatNumber(foodData.nf_caffeine) || 0} mg</span>
      </h4>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 40rem;
  padding: 1rem;
  border: 1px solid var(--black);

  input[type="text"] {
    width: 3rem;
    text-align: center;
    outline: none;
  }

  select {
    max-width: 80%;
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

export default NutrientsCard;
