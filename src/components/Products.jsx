import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import Pagination from "./Pagination";
import Container from 'react-bootstrap/Container';
import '../css/productCard.css';
import '../css/productsPage.css';
import { useParams } from "react-router";
import axios from "axios";

function Products() {
    const query = useParams();
    const options = ['Relevancy', 'Lowest price', 'Highest Price', 'Most popular'];
    const [DropDownBoxStyle, SetDropDownBoxStyle] = useState("dropdown-container");
    const [toggle, setToggled] = useState(false);
    const [selectedOption, setSelectedOption] = useState("Relevancy");
    const timeoutRef = useRef(null);

    const [searchQuery, setSearchQuery] = useState("");


    useEffect(() => {
        if (query.search !== "") {
            setSearchQuery(query.search);
        }
    }, [query.search]);

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


    useEffect(() => {
        const postData = async () => {
            try {
                setLoading(true);
                const res = await axios.get('http://localhost/MarketFirst/my-app/src/php/getProducts.php', {
                });
                setListOfProducts(res.data);
                setLoading(false);

            } catch (err) {
                console.error(err);
            }
        }
        postData();
    }, [searchQuery, selectedOption]);

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
        setLoading(false);
    }, [currentPage]);


    const indexOfLastItem = currentPage * numberProductsPerPage;
    const indexOfFirstItem = indexOfLastItem - numberProductsPerPage;
    const currentItems = listOfProducts.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }



    const sortProducts = (sortOption, listProducts) => {
        switch (sortOption) {
            case 'Relevancy':
                return listProducts;
            case 'Lowest price':
                return listProducts.sort((a, b) => a.price - b.price);
            case 'Highest price':
                return listProducts.sort((a, b) => b.price - a.price);
            case 'Most popular':
                return listProducts.sort((a, b) => b.rating - a.rating);
            default:
                return listProducts;
        }
    }

    useEffect(() => {
        setListOfProducts(sortProducts(selectedOption, listOfProducts));
    }, [selectedOption]);



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
                            <div className="col-lg-4 col-md-4">
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
                                                                ? { borderBottom: "1px solid #960018" }
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


                            {currentItems.map((product, index) => {
                                return (

                                    <div className="col-xxl-3 col-xl-4 col-md-6 col-sm-12 d-flex justify-content-center p-5" key={index}>
                                        <Link style={{ textDecoration: 'none', color: 'black' }}
                                            to={{
                                                pathname: `/products/product/2`
                                            }}>

                                            <div className="productCard-master">
                                                <div className="productCard">
                                                    <img src={require('../images/test/image1.webp')} className="" alt="..."></img>
                                                    <div className="price-bg">
                                                        £{product.price}
                                                    </div>
                                                </div>
                                                <div className="productCard-productName">
                                                    {product.productName}
                                                </div>
                                                <div className="d-flex productCard-Reviews">
                                                    <i className="bi bi-star"></i>
                                                    <i className="bi bi-star"></i>
                                                    <i className="bi bi-star"></i>
                                                    <i className="bi bi-star"></i>
                                                    <i className="bi bi-star"></i>
                                                    ({product.ratings})
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