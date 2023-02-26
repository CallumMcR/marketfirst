import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import '../css/basket.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Button } from "react-bootstrap";
import Accordion from 'react-bootstrap/Accordion';

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

    //useEffect(() => {
    // This causes the data to be reset and thus go empty
    //    sessionStorage.setItem("basketData", JSON.stringify(basketItems));
    //}, [basketItems]);

    //Needed for updates
    window.addEventListener('basketUpdated', () => {
        const basketItemsFromStorage = JSON.parse(sessionStorage.getItem("basketData")) || [];
        setBasketItems(basketItemsFromStorage);
    })

    const handleAddToBasket = (product) => {
        const productsExists = basketItems.find((item) => item.productID === product.productID);
        if (productsExists) {
            const updatedBasketItems = basketItems.map((item) => {
                if (item.productID === product.productID) {
                    return { ...item, quantity: item.quantity + 1 }
                }
                return item;
            });
            setBasketItems(updatedBasketItems);
        } else {
            setBasketItems([...basketItems, { ...product, quantity: 1 }])
        }
        sessionStorage.setItem("basketData", JSON.stringify(basketItems))
    };


    // need to make this delete the item
    const handleMinusQuantityToBasket = (product) => {
        const productsExists = basketItems.find((item) => item.productID === product.productID);
        if (productsExists) {
            if (productsExists.quantity === 1) {
                setBasketItems(basketItems.filter((item) => item !== product));
            }
            else {
                productsExists.quantity--;
                setBasketItems([...basketItems]);
            }

        }
        sessionStorage.setItem("basketData", JSON.stringify(basketItems))
    };



    const handleRemoveFromBasket = (product) => {
        setBasketItems(basketItems.filter((item) => item !== product));
    };

    const handleQuantityChange = (product, newQuantity) => {
        const productsExists = basketItems.find((item) => item.productID === product.productID);
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

                            <button className=' m-auto closeButton bi bi-x h-100 text-center' onClick={toggleClass}></button>



                        </div>
                        <div className="col-lg-8 m-auto">
                            <div className="text-center align-middle mybasketText">
                                Basket
                            </div>
                        </div>
                        <div className="col-lg-2">

                        </div>
                    </Row>



                    <Container fluid className="basketMain">

                        {/* Product - one card */}
                        {basketItems.map((product) => (
                            <div className="p-5" key={product.productID}>
                                <div className="card">
                                    <img src="" className="card-img-top" alt="product image" />
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
                        <div className="text-center">
                            <div className="basketTotal">
                                Total: £ {basketTotal}
                            </div>
                        </div>



                        <div className="text-center d-flex justify-content-center align-items-center mb-4">
                            <input id="promoCodeInput" placeholder='Promo code'></input>
                            <button id='applyPromoButton'>Apply</button>
                        </div>






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