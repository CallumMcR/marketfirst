import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import Pagination from "./Pagination";
import Container from 'react-bootstrap/Container';
import '../css/productCard.css';
import '../css/productsPage.css';

function Products() {
    const options = ['Relevancy', 'Lowest price', 'Highest Price', 'Most popular'];
    const placeHolder = ['Test', 'Nike trainers', 'Nike Sneakers', 'Nike Shirt', 'Nike Joggers']


    const [DropDownBoxStyle, SetDropDownBoxStyle] = useState("dropdown-container");
    const [toggle, setToggled] = useState(false);
    const [selectedOption, setSelectedOption] = useState("Relevancy");
    const timeoutRef = useRef(null);

    const toggleDropdown = () => {
        clearTimeout(timeoutRef.current);
        setToggled(!toggle);
        if (DropDownBoxStyle === "dropdown-container") {
            SetDropDownBoxStyle("dropdown-container-toggled");
        }
        else {
            SetDropDownBoxStyle("dropdown-container");
        }
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        toggleDropdown();
    };

    useEffect(() => {
        if (toggle) {
            timeoutRef.current = setTimeout(() => {
                setToggled(false);
                SetDropDownBoxStyle("dropdown-container");
            }, 5000);
        }
    }, [toggle, 5000]);


    const [currentProducts, setCurrentProducts] = useState(placeHolder);
    const [previousPage, setPreviousPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [numberProductsPerPage, setNumberProductsPerPage] = useState(25);


    const paginate = (pageNumber) => {
        setPreviousPage(currentPage);
        setCurrentPage(pageNumber);
    }



    return (
        <div className="div">

            <NavigationBar></NavigationBar>
            <Container fluid>
                <div className="row">
                    <div className="col-3">
                    </div>
                    <div className="col-6">
                        <div className="row pt-4">
                            <div className="col-lg-8">
                                <div class="productHeader">
                                    You searched for: { }
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div class="d-flex justify-content-end">
                                    <div className={DropDownBoxStyle}>
                                        <div className="dropdown-selected-option" onClick={toggleDropdown}>
                                            Sort by: {selectedOption} <i class="bi bi-caret-down-fill"></i>
                                        </div>
                                        {toggle && (
                                            <ul className="dropdown-options-list">
                                                {options.map(option => (
                                                    <li className="dropdown-option" key={option} value={option}
                                                        style={
                                                            option == "Most popular"
                                                                ? { borderBottom: "1px solid red" }
                                                                : {}
                                                        }
                                                        onClick={() => handleOptionClick(option)} >
                                                        Sort by: {option}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>

                                </div>
                            </div>
                        </div>
                        <hr></hr>
                    </div>
                    <div className="col-3">
                    </div>
                </div>
            </Container>

            <Container fluid>

                <div className="row">
                    <div className="col-3">

                    </div>

                    <div className="col-6">

                        <div className="row">

                            {placeHolder.map((test) => {
                                return (

                                    <div className="col-xxl-3 d-flex justify-content-center p-5">
                                        <Link style={{ textDecoration: 'none', color: 'black' }}
                                            to={{
                                                pathname: `product/${test}`
                                            }}>

                                            <div className="productCard-master">
                                                <div className="productCard">
                                                    <img src={require('../images/test/image1.webp')} className="" alt="..."></img>
                                                    <div className="price-bg">
                                                        £20.00
                                                    </div>
                                                </div>
                                                <div className="productCard-productName">
                                                    {test}
                                                </div>
                                                <div className="d-flex productCard-Reviews">
                                                    <i class="bi bi-star"></i>
                                                    <i class="bi bi-star"></i>
                                                    <i class="bi bi-star"></i>
                                                    <i class="bi bi-star"></i>
                                                    <i class="bi bi-star"></i>
                                                    (3,000)
                                                </div>

                                            </div>
                                        </Link>
                                    </div>


                                )



                            })}


                        </div>

                    </div>
                    <div className="col-3">

                    </div>

                </div>

            </Container>

            <Container fluid>
                <div className="row">
                    <div className="col-3">

                    </div>
                    <div className="col-6">
                        <Pagination
                            productsPerPage={numberProductsPerPage}
                            totalProducts={placeHolder.length}
                            paginate={paginate}
                        />
                    </div>
                    <div className="col-3">

                    </div>
                </div>

            </Container>


        </div>
    )
}

export default Products;