import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import NutrientsCard from "../components/nutrientsPage/NutrientsCard";
import { FoodData, AltMeasure } from "../../types/main";

const FoodNutrients = () => {
  const { id } = useParams();
  const [foodData, setFoodData] = useState<FoodData | null>(null);

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

  if (!foodData) return <h1>Loading...</h1>;

  return (
    <Wrapper>
      <NutrientsCard foodData={foodData} />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 4rem 0 0 4rem;
`;

export default FoodNutrients;
