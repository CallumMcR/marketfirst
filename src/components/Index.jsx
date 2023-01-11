import React from "react";
import { Link } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import Carousel from 'react-bootstrap/Carousel';
import image1 from '../images/coverImages/superdryadvertSplashPage.png';
import Container from 'react-bootstrap/Container';
import '../css/productCard.css';


function Index() {
    return (
        <div className="div">

            <NavigationBar></NavigationBar>

            <Container fluid>
                <Carousel >
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={image1}
                            style={{ maxHeight: "600px" }}
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            <h3>First slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item >
                        <img
                            className="d-block w-100"
                            src={image1}
                            alt="Second slide"
                            style={{ maxHeight: "600px" }}
                        />
                        <Carousel.Caption>
                            <h3>Second slide label</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={image1}
                            alt="Third slide"
                            style={{ maxHeight: "600px" }}
                        />
                        <Carousel.Caption>
                            <h3>Third slide label</h3>
                            <p>
                                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                            </p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </Container>

            <Container fluid className="pt-5">

                <div className="row">
                    <div className="col-2">

                    </div>
                    <div className="col-8">
                        <div className="fs-2">
                            Most popular products this month
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
        </div>
    )
}

export default Index;