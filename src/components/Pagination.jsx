import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  goToNextPage,
  goToPreviousPage,
} from "../app/redux/pagination/pagination";

function Pagination({ exercises }) {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.pagination.currentPage);

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
