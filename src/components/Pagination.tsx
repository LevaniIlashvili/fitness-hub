import React from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import styled from "styled-components";
import {
  goToNextPage,
  goToPreviousPage,
  goToPage,
} from "../app/redux/pagination/pagination";
import { Exercise } from "../../types/main";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

const Pagination = ({ exercises }: { exercises: Exercise[] }) => {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector((state) => state.pagination.currentPage);

  const Page = ({ page }: { page: number }) => {
    return (
      <span
        className={`page ${page === currentPage ? "active-page" : ""}`}
        onClick={() => dispatch(goToPage(page))}
      >
        {page + 1}
      </span>
    );
  };

  const exercisesPerPage = 9;
  const maxPages = 5;
  const totalPages = Math.ceil(exercises.length / exercisesPerPage);

  const renderPagination = () => {
    const pages: React.JSX.Element[] = [];
    // if pages are less than max pages, just render them, no need for elipsis and things like that
    if (totalPages < maxPages) {
      for (let i = 0; i < totalPages; i++) {
        pages.push(<Page page={i} key={i} />);
      }
    } else {
      pages.push(<Page page={0} key={0} />);

      // secondPage should be currentPage but not when currentPage is 0 cuz 0 should be first page
      let secondPage = currentPage === 0 ? 1 : currentPage;
      const lastPage = totalPages - 1;

      if (currentPage >= lastPage - 2) {
        secondPage = lastPage - 2;
      }

      for (let page = secondPage; page < lastPage; page++) {
        if (page === 0) continue;

        if (page >= secondPage + 2) {
          if (page === secondPage + 2) {
            pages.push(<span className="elipsis">...</span>);
          }
          continue;
        }

        if (secondPage === page && secondPage + 2 === lastPage) {
          pages.push(<span className="elipsis">...</span>);
          pages.push(<Page page={page} key={page} />);
          continue;
        }

        pages.push(<Page page={page} />);
      }

      pages.push(<Page page={lastPage} />);
    }
    return pages;
  };

  return (
    <>
      {exercises.length > 9 && (
        <Wrapper className="pagination">
          {currentPage > 0 && (
            <button
              className="navigation-button"
              onClick={() => dispatch(goToPreviousPage())}
            >
              <LuChevronLeft />
            </button>
          )}
          {renderPagination()}

          {currentPage < totalPages - 1 && (
            <button
              className="navigation-button"
              onClick={() => dispatch(goToNextPage())}
            >
              <LuChevronRight />
            </button>
          )}
        </Wrapper>
      )}
    </>
  );
};

const Wrapper = styled.nav`
  display: flex;
  gap: 1rem;
  margin-bottom: 5rem;

  .page {
    cursor: pointer;
    padding: 1rem 1rem;
  }

  .active-page {
    border: 1px solid var(--dark-orange);
    font-weight: 700;
  }

  .navigation-button {
    border: none;
    font-size: 2rem;
    cursor: pointer;
  }

  .elipsis {
    display: flex;
    align-items: center;
  }
`;

export default Pagination;
