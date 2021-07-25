import React, { useState, useRef } from "react";
import PropTypes from "prop-types";

Pagination.propTypes = {
  pagination: PropTypes.object.isRequired,
  onPageChange: PropTypes.func,
};

Pagination.defaltProps = {
  onPageChange: null,
};

function Pagination(props) {
  const { pagination, onPageChange } = props;

  const { page, page_size, totals } = pagination;

  const [currentPage, setCurrentPage] = useState(page);

  const typingTimeoutRef = useRef(null);

  const totalPage = Math.ceil(totals / page_size);

  function handlePageChange(newPage) {
    setCurrentPage(newPage);

    if (onPageChange) {
      onPageChange(newPage);
    }
  }

  function handleCurrentPageChange(e) {
    const value = e.target.value;

    var tempPage = page;

    setCurrentPage(value);

    if (!onPageChange) return;

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      if (isNaN(value) || value < 1 || value > totalPage) {
        setCurrentPage(tempPage);

        return;
      }
      const formValue = { currentPage: value };
      onPageChange(formValue.currentPage);
    }, 1000);
  }

  return (
    <div className="col col-full style-pagination-container">
      <div className="col col-half pt-4">
        <span className="text-is-grey bold-text">
          Trang {page} trong tổng số {totalPage}
        </span>
      </div>
      <div className="float-right">
        <button
          className="text-is-pink bg-color-white pt-4 pb-4 pr-8 pl-8"
          disabled={page <= 1}
          onClick={() => handlePageChange(page - 1)}
        >
          <i className="fi-rr-angle-small-left text-14" />
        </button>
        <div className="style-current-page bg-color-red">
          <input
            className="field-curent-page text-align-ct bg-color-red text-is-white bold-text"
            type="text"
            value={currentPage}
            onChange={handleCurrentPageChange}
            size="1"
          />
        </div>
        <button
          className="text-is-pink bg-color-white bold-text pt-4 pb-4 pr-8 pl-8"
          disabled={page >= totalPage}
          onClick={() => handlePageChange(page + 1)}
        >
          <i className="fi-rr-angle-small-right text-14" />
        </button>
      </div>
    </div>
  );
}
export default Pagination;
