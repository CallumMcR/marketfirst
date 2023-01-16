import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import Pagination from "./Pagination";
import Container from 'react-bootstrap/Container';
import '../css/productCard.css';
import '../css/productsPage.css';

function Products() {
    const options = ['Relevancy', 'Lowest price', 'Highest Price', 'Most popular'];

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
    }, [toggle]);



    const handleItemPerPageChange = (value) => {
        if (!isNaN(value)) {
            if (value > 4 && value < 50) {
                setNumberProductsPerPage(value);
            }
            else if (value < 5) {
                setNumberProductsPerPage(5);
            }
            else if (value > 50) {
                setNumberProductsPerPage(50);
            }

        }

    }




    const [listOfProducts, setListOfProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [numberProductsPerPage, setNumberProductsPerPage] = useState(5);

    useEffect(() => {
        setLoading(true);
        setListOfProducts([
            { name: "Nike trainers", price: "2.00", image: "image1.webp" },
            { name: "Nike shirt", price: "2.00", image: "image1.webp" },
            { name: "Nike joggers", price: "2.00", image: "image1.webp" },
            { name: "Nike shirt", price: "2.00", image: "image1.webp" },
            { name: "Nike coat", price: "2.00", image: "image1.webp" },
            { name: "Nike hoodie", price: "2.00", image: "image1.webp" },
            { name: "Nike jacket", price: "2.00", image: "image1.webp" },
            { name: "Nike trainers", price: "2.00", image: "image1.webp" },
        ])
        setLoading(false);
    }, [currentPage]);



    const indexOfLastItem = currentPage * numberProductsPerPage;
    const indexOfFirstItem = indexOfLastItem - numberProductsPerPage;
    const currentItems = listOfProducts.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => {
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
                                            Sort by: {selectedOption} <i className="bi bi-caret-down-fill"></i>
                                        </div>
                                        {toggle && (
                                            <ul className="dropdown-options-list">
                                                {options.map(option => (
                                                    <li className="dropdown-option" key={option} value={option}
                                                        style={
                                                            option === "Most popular"
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
                    <div className="col-2">

                    </div>

                    <div className="col-8">
                        <Container fluid>
                            <div className="row">
                                <div className="col-9">

                                </div>
                                <div className="col-3">
                                    <div className="number-results-text">
                                        Number of search results:
                                    </div>
                                    <input type="number" max={50} defaultValue={numberProductsPerPage} value={numberProductsPerPage}
                                        onChange={(e) => handleItemPerPageChange(e.target.value)}></input>




                                </div>
                            </div>
                        </Container>


                        <div className="row">


                            {currentItems.map((test, index) => {
                                return (

                                    <div className="col-xxl-3 col-xl-4 col-md-6 col-sm-12 d-flex justify-content-center p-5" key={index}>
                                        <Link style={{ textDecoration: 'none', color: 'black' }}
                                            to={{
                                                pathname: `2`
                                            }}>

                                            <div className="productCard-master">
                                                <div className="productCard">
                                                    <img src={require('../images/test/image1.webp')} className="" alt="..."></img>
                                                    <div className="price-bg">
                                                        £{test.price}
                                                    </div>
                                                </div>
                                                <div className="productCard-productName">
                                                    {test.name}
                                                </div>
                                                <div className="d-flex productCard-Reviews">
                                                    <i className="bi bi-star"></i>
                                                    <i className="bi bi-star"></i>
                                                    <i className="bi bi-star"></i>
                                                    <i className="bi bi-star"></i>
                                                    <i className="bi bi-star"></i>
                                                    (3,000)
                                                </div>

                                            </div>
                                        </Link>
                                    </div>


                                )



                            })}


                        </div>

                    </div>
                    <div className="col-2">

                    </div>

                </div>

            </Container>

            <Container fluid>
                <div className="row">
                    <div className="col-3">

                    </div>
                    <div className="col-6">
                        {!loading ? <Pagination
                            productsPerPage={numberProductsPerPage}
                            totalProducts={listOfProducts.length}
                            paginate={paginate}
                        />
                            :
                            <div>Loading...</div>
                        }
                    </div>
                    <div className="col-3">

                    </div>
                </div>

            </Container>


        </div>
    )
}

export default Products;