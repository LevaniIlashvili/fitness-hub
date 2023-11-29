import React, { useState } from "react";
import styled from "styled-components";
import workoutImg from "../assets/workout.svg";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState<boolean>(false);

  return (
    <Wrapper>
      <div className="top">
        <div className="logo-container">
          <img src={workoutImg} alt="Workout Icon" width="40" height="50" />
          <h1>Fitness Hub</h1>
        </div>

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
        {isNavbarOpen ? (
          <FaTimes
            className="bars-icon"
            onClick={() => setIsNavbarOpen(!isNavbarOpen)}
          />
        ) : (
          <FaBars
            className="bars-icon"
            onClick={() => setIsNavbarOpen(!isNavbarOpen)}
          />
        )}
      </div>
      {isNavbarOpen && (
        <div className="mobile-link-container">
          <Link
            className="link"
            to="/exercises"
            onClick={() => setIsNavbarOpen(false)}
          >
            exercise
          </Link>
          <Link
            className="link"
            to="/food"
            onClick={() => setIsNavbarOpen(false)}
          >
            food
          </Link>
          <Link
            className="link"
            to="calculator"
            onClick={() => setIsNavbarOpen(false)}
          >
            calculator
          </Link>
        </div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  position: fixed;
  background-color: var(--white);
  width: 100vw;
  z-index: 1;
  display: flex;
  flex-direction: column;
  padding: 1rem 2rem;
  gap: 1rem;
  box-shadow: -1px 3px 14px 0px rgba(0, 0, 0, 0.35);
  -webkit-box-shadow: -1px 3px 14px 0px rgba(0, 0, 0, 0.35);
  -moz-box-shadow: -1px 3px 14px 0px rgba(0, 0, 0, 0.35);

  .top {
    height: 5rem;
    display: flex;
    align-items: center;
    position: relative;
  }

  .logo-container {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  h1 {
    font-size: 2.8rem;
  }

  img {
    width: 4rem;
  }

  .link-container {
    position: absolute;
    top: 1.5rem;
    left: calc(50% - 12rem);
    display: flex;
    gap: 3rem;
  }

  .mobile-link-container {
    position: absolute;
    top: 7rem;
    left: 0;
    z-index: 1;
    background-color: var(--white);
    width: 100%;
    height: 12rem;
    display: flex;
    flex-direction: column;
    padding: 2rem;
    gap: 1rem;
  }

  .link {
    text-decoration: none;
    color: var(--black);
    font-weight: 500;
  }

  .link:hover {
    font-weight: 600;
  }

  .bars-icon {
    display: none;
    font-size: 2.5rem;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    justify-content: space-between;

    .link-container {
      display: none;
    }

    .bars-icon {
      display: block;
    }
  }
`;

export default Navbar;
