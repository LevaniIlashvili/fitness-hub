import React from "react";
import styled from "styled-components";
import workoutImg from "../assets/workout.svg";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Wrapper>
      <img src={workoutImg} alt="Workout Icon" />
      <h1>Fitness Hub</h1>

      <div className="link-container">
        <Link className="link" to="/exercises">
          exercise
        </Link>
        <Link className="link" to="/food">
          food
        </Link>
        <Link className="link" to="calculator">
          calculator
        </Link>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  display: flex;
  align-items: center;
  padding: 1rem 2rem;
  gap: 1rem;
  box-shadow: -1px 3px 19px 0px rgba(0, 0, 0, 0.46);
  -webkit-box-shadow: -1px 3px 19px 0px rgba(0, 0, 0, 0.46);
  -moz-box-shadow: -1px 3px 19px 0px rgba(0, 0, 0, 0.46);

  h1 {
    font-size: 2.8rem;
  }

  img {
    width: 4rem;
  }

  .link-container {
    margin: auto;
    display: flex;
    gap: 3rem;
  }

  .link {
    text-decoration: none;
    color: var(--black);
    font-weight: 500;
  }

  .link:hover {
    font-weight: 600;
  }
`;

export default Navbar;
