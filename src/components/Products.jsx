import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import Footer from "./Footer";
import Pagination from "./Pagination";
import Container from 'react-bootstrap/Container';
import '../css/productCard.css';
import '../css/productsPage.css';
import '../css/quickfilter.css';
import { useParams } from "react-router";
import axios from "axios";
import { Spinner } from 'react-bootstrap'
import Dropdown from "./Dropdown";
import QuickFilterButton from './QuickFilterButton';

function Products() {
    const query = useParams();
    const options = ['Relevancy', 'Lowest price', 'Highest price', 'Most popular'];
    const [DropDownBoxStyle, SetDropDownBoxStyle] = useState("dropdown-container");
    const [toggle, setToggled] = useState(false);
    const [selectedOption, setSelectedOption] = useState("Relevancy");
    const timeoutRef = useRef(null);

    const [searchQuery, setSearchQuery] = useState("");


    const [masterDB, setMasterDB] = useState([]);

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
                const res = await axios.get('http://localhost:8000/getProducts.php');
                setMasterDB(res.data);
                console.log(res.data);

            } catch (err) {
                console.error(err);
            }
        };
        postData();
    }, [searchQuery]);





    useEffect(() => {
        setLoading(true);
        let filteredProducts = [];
        if (searchQuery && searchQuery.length > 0 && typeof searchQuery === 'string' && searchQuery !== "") {
            filteredProducts = masterDB.filter(product => {
                return (
                    product.productName && typeof product.productName === 'string' &&
                    product.productName.toLowerCase().includes(searchQuery.toLowerCase())
                );
            });
        } else {
            filteredProducts = masterDB;
        }
        setListOfProducts(filteredProducts);
        setLoading(false);
    }, [masterDB])





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


    const indexOfLastItem = currentPage * numberProductsPerPage;
    const indexOfFirstItem = indexOfLastItem - numberProductsPerPage;
    const currentItems = listOfProducts.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }




    const sortProducts = (sortOption, listProducts) => {
        switch (sortOption) {
            case "Relevancy":
                return masterDB;
            case "Lowest price":
                return [...listProducts].sort((a, b) => a.price - b.price);
            case "Highest price":
                return [...listProducts].sort((a, b) => b.price - a.price);
            case "Most popular":
                return [...listProducts].sort((a, b) => b.ratings - a.ratings);
            default:
                return listProducts;
        }
    };


    useEffect(() => {
        console.log(selectedOption);
        setListOfProducts(sortProducts(selectedOption, listOfProducts));
        console.log(listOfProducts);
    }, [selectedOption]);

    const [searchResultOptions, setSearchResultOptions] = useState([5, 10, 25, 50]);




    // Quick filter

    const [toggledFilters, setToggledFilters] = useState([]);

    const handleQuickFilterClick = (filterOption) => {
        if (toggledFilters.includes(filterOption)) {
            setToggledFilters(toggledFilters.filter((item) => item !== filterOption));
        } else {
            setToggledFilters([...toggledFilters, filterOption]);
        }
    };


    return (
        <div className="div">

            <NavigationBar></NavigationBar>
            <Container fluid>
                <div className="row">
                    <div className="col-2">
                    </div>
                    <div className="col-8">
                        <div className="row pt-4">
                            <div className="col-lg-8" style={{ paddingLeft: "100px" }}>
                                <Dropdown
                                    options={searchResultOptions}
                                    startingToggleStatus={false}
                                    onOptionClick={(option) => {
                                        handleItemPerPageChange(option);
                                    }}
                                    prefix="Results: "
                                />
                            </div>
                            <div className="col-lg-4 col-md-4 d-flex justify-content-end" style={{ paddingRight: "100px" }}>
                                <Dropdown
                                    options={options}
                                    startingToggleStatus={false}
                                    onOptionClick={(option) => {
                                        handleOptionClick(option);
                                    }}
                                    prefix="Sort By: "
                                />
                            </div>
                        </div>
                        <hr></hr>
                        <Container fluid>
                            <div className="container-quick-filter">
                                <QuickFilterButton
                                    filterOption="Mens"
                                    onButtonClick={handleQuickFilterClick}
                                    toggledFilters={toggledFilters}
                                />
                                <QuickFilterButton
                                    filterOption="Womens"
                                    onButtonClick={handleQuickFilterClick}
                                    toggledFilters={toggledFilters}
                                />
                                <QuickFilterButton
                                    filterOption="Trainers"
                                    onButtonClick={handleQuickFilterClick}
                                    toggledFilters={toggledFilters}
                                />
                                <QuickFilterButton
                                    filterOption="Boots"
                                    onButtonClick={handleQuickFilterClick}
                                    toggledFilters={toggledFilters}
                                />
                                <QuickFilterButton
                                    filterOption="Adidas"
                                    onButtonClick={handleQuickFilterClick}
                                    toggledFilters={toggledFilters}
                                />
                                <QuickFilterButton
                                    filterOption="Nike"
                                    onButtonClick={handleQuickFilterClick}
                                    toggledFilters={toggledFilters}
                                />
                                <QuickFilterButton
                                    filterOption="Converse"
                                    onButtonClick={handleQuickFilterClick}
                                    toggledFilters={toggledFilters}
                                />
                                <QuickFilterButton
                                    filterOption="Running Shoes"
                                    onButtonClick={handleQuickFilterClick}
                                    toggledFilters={toggledFilters}
                                />
                                <QuickFilterButton
                                    filterOption="Unisex"
                                    onButtonClick={handleQuickFilterClick}
                                    toggledFilters={toggledFilters}
                                />
                            </div>
                        </Container>

                    </div>
                    <div className="col-2">
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

                                </div>
                            </div>
                        </Container>
                        {!loading ?
                            <div className="row">
                                {currentItems.map((product, index) => {
                                    let imageSrc;
                                    try {
                                        imageSrc = require(`../PHP/images/products/${product.productID}/image1.png`);
                                    } catch {
                                        imageSrc = require('../images/stockimage.jpg');
                                    }
                                    return (
                                        <div className="col-xxl-3 col-xl-4 col-md-6 col-sm-12 d-flex justify-content-center p-5" key={index}>
                                            <Link style={{ textDecoration: 'none', color: 'black' }} to={{ pathname: `/products/product/` + product.productID }}>
                                                <div className="productCard-master">
                                                    <div className="productCard">
                                                        <img src={imageSrc} className="" alt="..."></img>
                                                        <div className="price-bg">
                                                            £{product.price}
                                                        </div>
                                                    </div>
                                                    <div className="productCard-productName">
                                                        {product.productName}
                                                    </div>

                                                </div>
                                            </Link>
                                        </div>
                                    )
                                })}
                            </div>
                            : <div></div>}
                    </div>
                    <div className="col-2">
                    </div>
                </div>
            </Container>

            <Container fluid>
                <div className="row">
                    <div className="col-2">
                    </div>
                    <div className="col-8 px-5">
                        {!loading ? <Pagination
                            productsPerPage={numberProductsPerPage}
                            totalProducts={listOfProducts.length}
                            paginate={paginate}
                        />
                            :
                            <div className="text-center my-5">
                                <Spinner animation="border" role="status" variant="primary">
                                    <span className="visually-hidden">Loading Product</span>
                                </Spinner>
                                <div className="my-2 fs-3">Loading Products...</div>
                            </div>
                        }
                    </div>
                    <div className="col-2">
                    </div>
                </div>
            </Container>
            <Footer></Footer>
        </div>


    )
}

export default Products;