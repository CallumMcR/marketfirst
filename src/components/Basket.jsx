import React, { useState } from 'react';
import { Link } from "react-router-dom";
import '../css/basket.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Button } from "react-bootstrap";


function Basket() {

    sessionStorage.setItem("basketTotalPrice", JSON.stringify(0));

    const [basketTotal,setBasketTotal] = useState(() =>{
        const saved = sessionStorage.getItem("basketTotalPrice");
        const initialValue = JSON.parse(saved);
        return initialValue || 0.00;
    })





    const [isActive, setActive] = useState(() => {
        // getting stored value
        const saved = sessionStorage.getItem("isActive");
        const initialValue = JSON.parse(saved);
        return initialValue || true;
    });

    const toggleClass = () => {
        setActive(!isActive);
        sessionStorage.setItem("isActive", JSON.stringify(false));
        window.dispatchEvent(new Event("isActive"));
    };

    window.addEventListener('isActive2', () => {
        setActive(JSON.parse(sessionStorage.getItem('isActive')));

    })

    const transitionProperties = !isActive
        ? { marginRight: '0px', opacity: 1 }
        : { marginRight: '-1000px', opacity: 0 };

    return (
        <div className="basket" style={transitionProperties} >
            <Container fluid>
                <div className="row" style={{zIndex:"-1000 !important"}}>
                    <div className="col-9 " style={{zIndex:-1000}}>

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
                                <div className="card">
                                    <img src="" className="card-img-top" />
                                    <div className="card-body">
                                        <h5 className="card-title">Card Title</h5>
                                        <p className="card-text">
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
                                Total: £ {basketTotal}
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