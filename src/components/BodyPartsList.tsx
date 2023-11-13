import React from "react";
import styled from "styled-components";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { selectBodyPart } from "../app/redux/bodyParts/bodyParts";
import { goToPage } from "../app/redux/pagination/pagination";

const BodyPartsList = () => {
  const dispatch = useAppDispatch();
  const selectedBodyPart = useAppSelector(
    (state) => state.bodyParts.selectedBodyPart
  );

  const bodyParts = [
    "all",
    "back",
    "cardio",
    "chest",
    "lower arms",
    "lower legs",
    "neck",
    "shoulders",
    "upper arms",
    "upper legs",
    "waist",
  ];

  return (
    <Wrapper>
      {bodyParts.map((bodyPart, index) => {
        return (
          <li key={index}>
            <input
              type="radio"
              name="body_parts"
              id={bodyPart}
              checked={bodyPart === selectedBodyPart}
              onChange={() => {
                dispatch(selectBodyPart(bodyPart));
                dispatch(goToPage(0));
              }}
            />
            <label htmlFor={bodyPart}>{bodyPart}</label>
          </li>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.ul`
  display: flex;
  gap: 0.5rem;
  list-style: none;

  input {
    display: none;
  }

  label {
    padding: 1rem;
    border: 1px solid var(--gray);
    border-radius: 3px;
    cursor: pointer;
  }

  label:hover {
    border-color: var(--orange);
  }

  label:active {
    background-color: var(--orange);
    color: var(--white);
  }

  input[type="radio"]:checked + label {
    background-color: var(--dark-orange);
    border-color: var(--dark-orange);
    color: var(--white);
  }
`;

export default BodyPartsList;
