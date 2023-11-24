import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectBodyPart } from "../../app/redux/bodyParts/bodyParts";
import { goToPage } from "../../app/redux/pagination/pagination";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import RadioBtn from "../RadioBtn";

const BodyPartsList = () => {
  const dispatch = useAppDispatch();
  const selectedBodyPart = useAppSelector(
    (state) => state.bodyParts.selectedBodyPart
  );

  // horizontal scrolling
  const containerRef = useRef<HTMLUListElement | null>(null);
  const [scrollLeft, setScrollLeft] = useState<number>(0);
  const [showScrollButtons, setShowScrollButtons] = useState<boolean>(false);

  const scroll = (direction: string): void => {
    const container = containerRef.current;
    if (container) {
      const scrollAmount = 100; // Adjust this value as needed
      const containerWidth = container.clientWidth;
      const maxScrollLeft = container.scrollWidth - containerWidth;

      const newScrollLeft =
        direction === "left"
          ? Math.max(scrollLeft - scrollAmount, 0)
          : Math.min(scrollLeft + scrollAmount, maxScrollLeft);

      container.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });

      setScrollLeft(newScrollLeft);
    }
  };

  const handleResize = (): void => {
    const container = containerRef.current;
    if (container) {
      const shouldShowButtons = container.scrollWidth > container.clientWidth;
      setShowScrollButtons(shouldShowButtons);
    }
  };

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
      {showScrollButtons && (
        <button className="scroll-button" onClick={() => scroll("left")}>
          <LuChevronLeft />
        </button>
      )}
      <ul className="body-parts__container" ref={containerRef}>
        {bodyParts.map((bodyPart, index) => {
          return (
            <li key={index}>
              <RadioBtn
                name="body_parts"
                id={bodyPart}
                labelName={bodyPart}
                isChecked={bodyPart === selectedBodyPart}
                handleChange={() => {
                  dispatch(selectBodyPart(bodyPart));
                  dispatch(goToPage(0));
                }}
              />
            </li>
          );
        })}
      </ul>
      {showScrollButtons && (
        <button className="scroll-button" onClick={() => scroll("right")}>
          <LuChevronRight />
        </button>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  gap: 0.2rem;

  .body-parts__container {
    display: flex;
    align-items: center;
    height: 4.1rem;
    width: 72vw;
    gap: 0.5rem;
    list-style: none;
    overflow-x: auto;
    -ms-overflow-style: none; /* Internet Explorer 10+ */
    scrollbar-width: none; /* Firefox */
  }

  .body-parts__container::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }

  .scroll-button {
    border: none;
    font-size: 2rem;
    cursor: pointer;
  }

  .scroll-button:hover {
    background-color: #97979784;
  }
`;

export default BodyPartsList;
