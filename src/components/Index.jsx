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

function Index() {
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

                        <div className="productCard-container d-flex justify-content-evenly">

                            <div className="productCard-master">
                                <div className="productCard">
                                    <img src={require('../images/test/image1.webp')} class="" alt="..."></img>
                                    <div className="price-bg">
                                        £20.00
                                    </div>
                                </div>
                                <div className="productCard-productName">
                                    Product Name
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

                        </div>












                    </div>
                    <div className="col-2">

                    </div>
                </div>

            </Container>

            <Container fluid className="pt-5">

                <div className="row">
                    <div className="col-2">

                    </div>
                    <div className="col-8">
                        <div className="fs-2">
                            Best Sellers Of All time
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

                        <div className="productCard-container d-flex justify-content-evenly">

                            <div className="productCard-master">
                                <div className="productCard">
                                    <img src={require('../images/test/image1.webp')} class="" alt="..."></img>
                                    <div className="price-bg">
                                        £20.00
                                    </div>
                                </div>
                                <div className="productCard-productName">
                                    Product Name
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

                        </div>

                    </div>
                    <div className="col-2">

                    </div>
                </div>

            </Container>

            <Container fluid className="pt-5">

                <div className="row">
                    <div className="col-2">

                    </div>
                    <div className="col-8">
                        <div className="fs-2">
                            Seasonal gifts
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

                        <div className="productCard-container d-flex justify-content-evenly">

                            <div className="productCard-master">
                                <div className="productCard">
                                    <img src={require('../images/test/image1.webp')} class="" alt="..."></img>
                                    <div className="price-bg">
                                        £20.00
                                    </div>
                                </div>
                                <div className="productCard-productName">
                                    Product Name
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

                        </div>

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