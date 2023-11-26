import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import NutrientsCard from "../components/nutrientsPage/NutrientsCard";
import { FoodData, AltMeasure } from "../../types/main";
import PieChart from "../components/nutrientsPage/PieChart";
import TimeToBurnCalories from "../components/nutrientsPage/TimeToBurnCalories";
import LoadingScreen from "../components/LoadingScreen";
import ErrorScreen from "../components/ErrorScreen";
import { IoIosArrowRoundBack } from "react-icons/io";

const FoodNutrients = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [foodData, setFoodData] = useState<FoodData | null>(null);
  const [timesToMultiplyNutrients, setTimesToMultiplyNutrients] =
    useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
      setIsLoading(false);
      const foodData = response.data.foods[0];
      setFoodData(foodData);
      addMoreNutrients(foodData);
      setUniqueMeasures(foodData);
    } catch (error) {
      setIsLoading(false);
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

  if (isLoading) return <LoadingScreen />;

  if (!foodData) return <ErrorScreen />;

  return (
    <Wrapper>
      <IoIosArrowRoundBack
        className="back-arrow-icon"
        onClick={() => navigate("/food")}
      />
      <NutrientsCard
        timesToMultiplyNutrients={timesToMultiplyNutrients}
        setTimesToMultiplyNutrients={setTimesToMultiplyNutrients}
        foodData={foodData}
      />
      <div>
        <TimeToBurnCalories
          calories={Math.round(foodData.nf_calories * timesToMultiplyNutrients)}
        />
        <PieChart
          values={[
            foodData.nf_total_carbohydrate,
            foodData.nf_protein,
            foodData.nf_total_fat,
          ]}
        />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  gap: 5rem;
  padding: 10rem 4rem 0 4rem;
  position: relative;

  .back-arrow-icon {
    font-size: 7rem;
    cursor: pointer;
    color: var(--dark-orange);
    position: absolute;
    top: -1rem;
    left: 0;
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export default FoodNutrients;
