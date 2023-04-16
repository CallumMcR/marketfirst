import React from "react";
import NavigationBar from "./NavigationBar";
import Carousel from 'react-bootstrap/Carousel';
import image1 from '../PHP/images/coverImages/nikebanner1.png';
import image2 from '../PHP/images/coverImages/nikebanner.png';
import image3 from '../PHP/images/coverImages/adidasbanner.png';
import Container from 'react-bootstrap/Container';
import '../css/productCard.css';
import '../css/index.css';
import Footer from "./Footer";
import $ from "jquery";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Spinner } from 'react-bootstrap';

function Index() {
    const [listOfProducts, setListOfProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const getProducts = () => {
        $.ajax({
            type: "POST",
            url: 'http://localhost:8000/getProductsIndex.php',
            data: {},
            success(data) {
                const products = JSON.parse(data);
                setListOfProducts(products);
                setLoading(false);
            },
        });

    };
    useEffect(() => {
        getProducts();
    }, []);
    return (
        <div className="div">

            <NavigationBar></NavigationBar>

            <Container fluid className="image-banner position-relative">
                <Carousel className="w-100 position-relative">
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={image1}
                            style={{ maxHeight: "800px" }}
                            alt="First slide"
                        />

                    </Carousel.Item>
                    <Carousel.Item >
                        <img
                            className="d-block w-100"
                            src={image2}
                            alt="Second slide"
                            style={{ maxHeight: "800px" }}
                        />

                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={image3}
                            alt="Third slide"
                            style={{ maxHeight: "800px" }}
                        />

                    </Carousel.Item>
                </Carousel>
                <div className="button-container">
                    <button className="shop-button">Shop Men</button>
                    <button className="shop-button">Shop Women</button>
                </div>

            </Container>



            <Container fluid className="pt-5">

                <div className="row">
                    <div className="col-2">

                    </div>
                    <div className="col-8">
                        <div className="d-flex">
                            <div className="see-these-start">
                                HAVE&nbsp;
                            </div>
                            <div className="see-these-end">
                                you seen these yet?
                            </div>
                        </div>
                    </div>
                    <div className="col-2">

                    </div>
                </div>
                <hr></hr>

                <div className="row">
                    <div className="col-2">

                    </div>
                    <div className="col-8">
                        {!loading ?
                            <div className="row">
                                {listOfProducts.map((product, index) => {
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
                            :
                            <div className="text-center my-5">
                                <Spinner animation="border" role="status" variant="primary">
                                    <span className="visually-hidden">Loading Products</span>
                                </Spinner>
                                <div className="my-2 fs-3">Loading Products</div>
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

export default Index;