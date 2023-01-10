import React, { useState } from 'react';
import { Link } from "react-router-dom";
import '../css/basket.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from "react-bootstrap";


function Basket() {

      const toggleClass = () => {
        localStorage.setItem("isActive", JSON.stringify(false));
        window.dispatchEvent(new Event("isActive"));
      };
    return (
        <div className="basket">
            <Container fluid>
                <div className="row">
                    <div className="col-9">

                    </div>

                    <div className="col-3 basket-bg">
                        <Row>
                            <div className="col-lg-2">
                                <Button variant="secondary" size="lg" className="m-3 d-lg-none w-100 m-0" onClick={toggleClass}>X</Button>
                                <Button variant="secondary" size="lg" className="m-3 d-none d-lg-block " onClick={toggleClass}>X</Button>

                            </div>
                            <div className="col-lg-8 m-auto">
                                <div className="text-center align-middle m-3 mybasketText">
                                    Basket
                                </div>
                            </div>
                            <div className="col-lg-2">

                            </div>
                        </Row>
                        <hr className="m-0"></hr>


                        <Container fluid className="basketMain">
                            <div className="p-5">
                                <div class="card">
                                    <img src="" class="card-img-top" />
                                    <div class="card-body">
                                        <h5 class="card-title">Card Title</h5>
                                        <p class="card-text">
                                            Some quick example text to build on the card title and make up the
                                            bulk of the card's content.
                                        </p>
                                        <div>
                                            Quantity: 1
                                        </div>
                                        <div>
                                            £20.00
                                        </div>

                                    </div>
                                </div>
                            </div>



                        </Container>


                        <Container fluid>
                            <hr></hr>
                            <div className="basketTotal">
                                Total: £
                            </div>
                            <hr></hr>
                            <div className="d-flex justify-content-center">
                                <div className="text-center">
                                    <div className="BasketCheckoutButton">
                                        Checkout
                                    </div>
                                </div>
                            </div>

                        </Container>


                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Basket;