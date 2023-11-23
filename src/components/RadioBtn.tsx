import React from "react";
import styled from "styled-components";

interface RadioBtnProps {
  name: string;
  id: string;
  isChecked: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioBtn = ({ name, id, isChecked, handleChange }: RadioBtnProps) => {
  return (
    <Wrapper>
      <input
        type="radio"
        name={name}
        id={id}
        value={id}
        checked={isChecked}
        onChange={handleChange}
      />
      <label htmlFor={id}>{id}</label>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  white-space: nowrap;

  input {
    display: none;
  }

  label {
    padding: 1rem;
    border: 1px solid var(--gray);
    border-radius: 3px;
    font-weight: 500;
    cursor: pointer;
  }

  label:hover {
    border-color: var(--orange);
  }

  label:active {
    background-color: var(--orange);
    color: var(--white);
  }

  input:checked + label {
    background-color: var(--dark-orange);
    border-color: var(--dark-orange);
    color: var(--white);
  }
`;

export default RadioBtn;
