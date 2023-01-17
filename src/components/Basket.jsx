import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import '../css/basket.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Button } from "react-bootstrap";


function Basket() {




    sessionStorage.setItem("basketTotalPrice", JSON.stringify(0));

    const [basketTotal, setBasketTotal] = useState(() => {
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
        ? { marginRight: '0px', opacity: 1, visibility: "visible" }
        : { marginRight: '-1000px', opacity: 0, visibility: "hidden" };

    // Basket Storage Section

    //Needed for initalisation
    const [basketItems, setBasketItems] = useState([]);
    useEffect(() => {
        const basketItemsFromStorage = JSON.parse(sessionStorage.getItem("basketData")) || [];
        setBasketItems(basketItemsFromStorage);
    }, []);

    useEffect(() => {
        sessionStorage.setItem("basketData", JSON.stringify(basketItems));
    }, [basketItems]);

    //Needed for updates
    window.addEventListener('basketUpdated', () => {
        const basketItemsFromStorage = JSON.parse(sessionStorage.getItem("basketData")) || []
        console.log(basketItemsFromStorage);
        setBasketItems(basketItemsFromStorage);
        console.log("received");
    })

    const handleAddToBasket = (product) => {
        const productsExists = basketItems.find((item) => item.productID == product.productID);
        if (productsExists) {
            productsExists.quantity++;
            setBasketItems([...basketItems]);
        }
        else {
            setBasketItems([...basketItems, { ...product, quantity: 1 }])
        }
    };

    const handleMinusQuantityToBasket = (product) => {
        const productsExists = basketItems.find((item) => item.productID == product.productID);
        if (productsExists) {
            if (productsExists.quantity == 1) {
                setBasketItems(basketItems.filter((item) => item !== product));
            }
            else {
                productsExists.quantity--;
                setBasketItems([...basketItems]);
            }

        }
    };



    const handleRemoveFromBasket = (product) => {
        setBasketItems(basketItems.filter((item) => item !== product));
    };

    const handleQuantityChange = (product, newQuantity) => {
        const productsExists = basketItems.find((item) => item.productID == product.productID);
        if (productsExists) {
            productsExists.quantity = newQuantity;
            setBasketItems([...basketItems]);
        }
    };



    return (
        <div className="basket" style={transitionProperties} >
            <Container fluid>


                <div className="basket-bg">
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

                        {/* Product - one card */}
                        {basketItems.map((product) => (
                            <div className="p-5" key={product.productID}>
                                <div className="card">
                                    <img src="" className="card-img-top" />
                                    <div className="card-body">
                                        <h5 className="card-title">{ }</h5>
                                        <div className="d-flex">
                                            <div className="bi bi-dash-circle-fill button-minus" onClick={() => handleMinusQuantityToBasket(product)}>
                                            </div>
                                            <div className="quantity-text px-4">
                                                {product.quantity}
                                            </div>
                                            <div className="bi bi-plus-circle-fill button-add" onClick={handleAddToBasket}>

                                            </div>
                                        </div>

                                        <div className='price-text'>
                                            £{ }
                                        </div>

                                    </div>
                                </div>
                            </div>
                        ))}
                        {/* End of singular basket */}

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

            </Container>
        </div>
    )
}

export default Basket;