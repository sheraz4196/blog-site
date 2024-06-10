import React from "react";
import ReactPaginate from "react-paginate";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import PropTypes from "prop-types";

export default function Pagination({ totalPages, setCurrentPage }) {
  const handlePageClick = (event) => {
    const pageNo = event.selected + 1;
    setCurrentPage(pageNo);
  };
  return (
    <div className="pagination-area">
      <menu className="nav-links">
        <ReactPaginate
          breakLabel="..."
          nextLabel={<FiChevronRight />}
          previousLabel={<FiChevronLeft />}
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          pageCount={totalPages || null}
          renderOnZeroPageCount={null}
          containerClassName="react-pagination"
          activeClassName="active"
        />
      </menu>
    </div>
  );
}
Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};
