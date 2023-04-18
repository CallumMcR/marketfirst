import React from 'react';
import { useState } from 'react';
import '../css/pagination.css';
const Pagination = ({ productsPerPage, totalProducts, paginate }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
        pageNumbers.push(i);
    }
    const maxPagesVisible = 10;
    const pagesToShow = pageNumbers.slice(currentPage - 1, currentPage + maxPagesVisible - 1);
    const handlePreviousPage = (newPage) => {
        setCurrentPage(newPage);
        paginate(newPage)
    };
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        paginate(newPage)
    };

    const handleNextPage = (newPage) => {
        setCurrentPage(newPage);
        paginate(newPage)
    };
    return (
        <nav>
            <div className="d-flex justify-content-start">
                {currentPage !== 1 ?
                    <div className="paginationNumber-container" onClick={() => handlePreviousPage(currentPage - 1)}>
                        <div className="pagination-number">
                            <i className="bi bi-arrow-left-short"></i>
                        </div>
                    </div>
                    :
                    <div className="paginationNumber-container" style={{ opacity: 0.4, cursor: "not-allowed" }}>
                        <div className="pagination-number">
                            <i className="bi bi-arrow-left-short"></i>
                        </div>
                    </div>
                }
                {pagesToShow.map(number => (
                    <div className={`paginationNumber-container ${currentPage === number ? 'active-page' : ''}`} onClick={() => handlePageChange(number)} key={number}>
                        <div className="pagination-number">
                            {number}
                        </div>
                    </div>
                ))}
                {typeof pageNumbers[currentPage] !== 'undefined' ?
                    <div className="paginationNumber-container" onClick={() => handleNextPage(currentPage + 1)}>
                        <div className="pagination-number">
                            <i className="bi bi-arrow-right-short"></i>
                        </div>
                    </div>
                    :
                    <div className="paginationNumber-container" style={{ opacity: 0.4, cursor: "not-allowed" }}>
                        <div className="pagination-number">
                            <i className="bi bi-arrow-right-short"></i>
                        </div>
                    </div>
                }
            </div>
        </nav >
    )
}
export default Pagination