import axios, { CancelTokenSource } from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import healthyVitaminColorful from "../assets/healthy-vitamin-colorful.jpg";
import { IoMdArrowDropright } from "react-icons/io";

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

  const cancelToken = useRef<CancelTokenSource | undefined>();

  const navigate = useNavigate();

  const getFoodSearchResults = async () => {
    if (cancelToken.current) {
      cancelToken.current.cancel("token cancelled");
    }

    cancelToken.current = axios.CancelToken.source();

    try {
      const response = await axios.get(
        `https://trackapi.nutritionix.com/v2/search/instant?query=${searchQuery}`,
        {
          headers: {
            "x-app-id": import.meta.env.VITE_NUTRITIONIX_ID,
            "x-app-key": import.meta.env.VITE_NUTRITIONIX_KEY,
          },
          cancelToken: cancelToken.current.token,
        }
      );
      console.log(searchQuery);
      console.log("fetching data");
      setFoodSearchResults(response.data.common);
      setAutoCompleteResults(response.data.common.slice(0, 5));
    } catch (error) {
      if (axios.isCancel(error)) {
        // Request was canceled, do nothing
      } else {
        console.log(error);
      }
    }
  };

  console.log(autoCompleteResults);

  useEffect(() => {
    if (!searchQuery) {
      setAutoCompleteResults([]);
      if (cancelToken.current) {
        cancelToken.current.cancel("token cancelled");
      }

      return;
    }
    getFoodSearchResults();
  }, [searchQuery]);

  return (
    <Wrapper>
      <section className="search-container">
        <div
          className="search-container__overlay"
          onClick={() => setSearchQuery("")}
        ></div>
        <div>
          <div className="search-container__search-input-container">
            <input
              className="search-container__search-input"
              type="text"
              placeholder="Search for food"
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
            />
            <button
              className="search-container__search-button"
              onClick={() => {
                setSearchQuery("");
                setFullSearchResults(foodSearchResults);
              }}
            >
              search
            </button>
          </div>
          <div className="search-container__autocomplete">
            {autoCompleteResults.map((result: FoodSearchResult) => {
              return (
                <div
                  key={result.food_name}
                  className="autocomplete__result"
                  onClick={() => navigate(`/food/${result.food_name}`)}
                >
                  <img
                    className="autocomplete__result-image"
                    src={result.photo.thumb}
                    alt=""
                  />
                  <span className="autocomplete__result-name">
                    {result.food_name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <div className="full-search-results__container">
        {fullSearchResults.length > 0 ? (
          <div>
            <h2 className="full-search-results__header">
              <span>Showing</span> Results
            </h2>
            <div className="full-search-results">
              {fullSearchResults.map((result: FoodSearchResult) => {
                return (
                  <div
                    key={result.food_name}
                    className="full-search-results__result"
                    onClick={() => navigate(`/food/${result.food_name}`)}
                  >
                    <div>
                      <img
                        className="full-search-results__result-image"
                        src={result.photo.thumb}
                        alt=""
                      />
                      <span className="full-search-results__result-name">
                        {result.food_name}
                      </span>
                    </div>
                    <IoMdArrowDropright className="arrow-icon" />
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
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

  .search-container__overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .search-container__search-input-container {
    display: flex;
    height: 4rem;
    gap: 0.4rem;
    margin-bottom: 0.4rem;
  }

  .search-container__search-input {
    font-family: inherit;
    width: 50vw;
    padding: 1rem;
    font-size: 1.6rem;
    font-weight: 500;
    position: relative;
    z-index: 1;
    outline: none;
    border: none;
    border-radius: 3px;
  }

  .search-container__search-button {
    font-family: inherit;
    height: 100%;
    width: 5rem;
    z-index: 1;
    position: relative;
    cursor: pointer;
    margin-bottom: 0.5rem;
    background-color: var(--light-orange);
    color: var(--white);
    border: none;
    border-radius: 3px;
    font-weight: 600;
  }

  .search-container__autocomplete {
    position: absolute;
    background-color: white;
    width: calc(50vw + 5rem + 0.4rem);
    height: fit-content;
    border-radius: 3px;
  }

  .autocomplete__result {
    height: 5rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    border-bottom: 1px solid transparent;
    cursor: pointer;
  }

  .autocomplete__result:hover {
    border-bottom: 1px solid #817f7f63;
  }

  .autocomplete__result-image {
    width: 5rem;
    max-height: 5rem;
  }

  .full-search-results__header {
    margin: 2rem 0 0 2rem;
  }

  .full-search-results__header span {
    color: var(--light-orange);
  }

  .full-search-results {
    padding: 3rem;
    display: grid;
    column-gap: 5rem;
    row-gap: 2rem;
    grid-template-columns: repeat(auto-fill, minmax(30rem, 1fr));
  }

  .full-search-results__result {
    padding: 1rem;
    height: 10rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 10px;
    border: 2px solid #817f7f63;
    cursor: pointer;
  }

  .full-search-results__result div {
    display: flex;
    align-items: center;
    gap: 2rem;
    font-weight: 600;
  }

  .arrow-icon {
    font-size: 4rem;
    color: #63626262;
  }

  .full-search-results__result:hover .arrow-icon {
    color: var(--black);
  }

  .full-search-results__result-image {
    width: 10rem;
    max-height: 9rem;
  }

  @media (max-width: 768px) {
    .search-container__search-input {
      width: 70vw;
    }

    .search-container__autocomplete {
      width: calc(70vw + 5rem + 0.4rem);
    }
  }
`;

export default FoodSearchPage;
