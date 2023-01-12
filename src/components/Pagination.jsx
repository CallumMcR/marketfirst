import React from 'react';
import { useState } from 'react';
import '../css/pagination.css';

const Pagination = ({ productsPerPage, totalProducts, paginate }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <nav>

            <div className="d-flex justify-content-start">

                {currentPage !== 1 ?
                    <div className="paginationNumber-container" onClick={() => paginate(currentPage - 1)}>
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

                <div className="paginationNumber-container" onClick={paginate(currentPage - 1)}>
                    <div className="pagination-number">
                        {currentPage}
                    </div>
                </div>


                {typeof pageNumbers[currentPage + 1] !== 'undefined' ?
                    <div className="paginationNumber-container" onClick={paginate(currentPage - 1)}>
                        <div className="pagination-number">
                            {currentPage + 1}
                        </div>
                    </div>
                    :
                    <div className="paginationNumber-container" style={{ opacity: 0.4, cursor: "not-allowed" }}>
                        <div className="pagination-number">
                            {currentPage + 1}
                        </div>
                    </div>
                }

                {typeof pageNumbers[currentPage] !== 'undefined' ?
                    <div className="paginationNumber-container" onClick={paginate(currentPage - 1)}>
                        <div className="pagination-number">
                            {currentPage + 2}
                        </div>
                    </div>
                    :
                    <div className="paginationNumber-container" style={{ opacity: 0.4, cursor: "not-allowed" }}>
                        <div className="pagination-number">
                            {currentPage + 2}
                        </div>
                    </div>
                }


                {typeof pageNumbers[currentPage] !== 'undefined' ?
                    <div className="paginationNumber-container" onClick={paginate(currentPage - 1)}>
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