import React from "react";
import { Link } from "react-router-dom";
import '../css/basket.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from "react-bootstrap";


function Basket() {
    return (
        <div className="basket">
            <Container fluid>
                <div className="row">
                    <div className="col-9">

                    </div>

                    <div className="col-3 basket-bg">
                        <Row>
                            <div className="col-lg-2">
                                <Button variant="secondary" size="lg" className="m-3 d-lg-none w-100 m-0">X</Button>
                                <Button variant="secondary" size="lg" className="m-3 d-none d-lg-block ">X</Button>
                                
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
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Basket;