import React from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import styled from "styled-components";
import {
  goToNextPage,
  goToPreviousPage,
} from "../app/redux/pagination/pagination";
import { Exercise } from "../../types/main";

function Pagination({ exercises }: { exercises: Exercise[] }) {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector((state) => state.pagination.currentPage);

  return (
    <>
      {exercises.length > 9 && (
        <Wrapper className="pagination">
          <button onClick={() => dispatch(goToPreviousPage())}>previous</button>
          <p>{currentPage + 1}</p>
          <button onClick={() => dispatch(goToNextPage())}>next</button>
        </Wrapper>
      )}
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

export default Pagination;
