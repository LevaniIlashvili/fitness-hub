import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import healthyVitaminColorful from "../assets/healthy-vitamin-colorful.jpg";

interface FoodSearchResult {
  food_name: string;
  photo: {
    thumb: string;
  };
  serving_unit: string;
  serving_qty: number;
  serving_weight_grams: number;
}

const FoodSearchPage = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [foodSearchResults, setFoodSearchResults] = useState<
    FoodSearchResult[]
  >([]);
  const [autoCompleteResults, setAutoCompleteResults] = useState<
    FoodSearchResult[]
  >([]);
  const [fullSearchResults, setFullSearchResults] = useState<
    FoodSearchResult[]
  >([]);
  const [showFullSearchResults, setShowFullSearchResults] =
    useState<boolean>(false);

  const navigate = useNavigate();

  const getFoodSearchResults = async () => {
    try {
      const response = await axios.get(
        `https://trackapi.nutritionix.com/v2/search/instant?query=${searchQuery}`,
        {
          headers: {
            "x-app-id": import.meta.env.VITE_NUTRITIONIX_ID,
            "x-app-key": import.meta.env.VITE_NUTRITIONIX_KEY,
          },
        }
      );
      console.log(response.data.common);
      setFoodSearchResults(response.data.common);
      setAutoCompleteResults(response.data.common.slice(0, 5));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!searchQuery) {
      setAutoCompleteResults([]);
      return;
    }
    getFoodSearchResults();
  }, [searchQuery]);

  return (
    <Wrapper>
      <div className="search-container">
        <div className="overlay"></div>
        <div>
          <input
            className="search__input"
            type="text"
            placeholder="Search for food"
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
          />
          <button
            onClick={() => {
              setSearchQuery("");
              setFullSearchResults(foodSearchResults);
            }}
          >
            search
          </button>
          <div className="autocomplete__container">
            {autoCompleteResults.map((result: FoodSearchResult) => {
              return (
                <div
                  key={result.food_name}
                  className="autocomplete__result"
                  onClick={() => navigate(`/food/${result.food_name}`)}
                >
                  <img
                    className="autocomplete__image"
                    src={result.photo.thumb}
                    alt=""
                  />
                  <span className="autocomplete__name">{result.food_name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="full-search-results">
        {fullSearchResults.length > 0 ? (
          <div>
            <h2>Showing search results</h2>
            {fullSearchResults.map((result: FoodSearchResult) => {
              return (
                <div
                  key={result.food_name}
                  className="autocomplete__result"
                  onClick={() => navigate(`/food/${result.food_name}`)}
                >
                  <img
                    className="autocomplete__image"
                    src={result.photo.thumb}
                    alt=""
                  />
                  <span className="autocomplete__name">{result.food_name}</span>
                </div>
              );
            })}
          </div>
        ) : (
          ""
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  /* display: flex;
  flex-direction: column; */

  .search-container {
    position: relative;
    max-width: 100vw;
    height: calc(100vh - 7rem);
    background-image: url(${healthyVitaminColorful});
    background-size: cover;
    background-position: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .search__input {
    height: 3rem;
    width: 40rem;
    position: relative;
    z-index: 1;
  }

  button {
    height: 3rem;
    z-index: 1;
    position: relative;
  }

  .autocomplete__container {
    position: relative;
    background-color: white;
    width: 100%;
    height: fit-content;
  }

  .autocomplete__result {
    display: flex;
    align-items: center;
    gap: 1rem;
    border-bottom: 1px solid transparent;
    cursor: pointer;
  }

  .autocomplete__result:hover {
    border-bottom: 1px solid #817f7f63;
  }

  .autocomplete__image {
    width: 5rem;
  }
`;

export default FoodSearchPage;
