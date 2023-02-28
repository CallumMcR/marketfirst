import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { Dropdown, DropdownButton } from "react-bootstrap";
import NavigationBar from "./NavigationBar";
import '../css/navigation.css';
import '../css/checkout.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import $ from "jquery";
import { Spinner } from 'react-bootstrap'

function CheckOut() {

    const [basketTotal, setBasketTotal] = useState(() => {
        const saved = sessionStorage.getItem("basketTotalPrice");
        const initialValue = JSON.parse(saved);
        return initialValue || 0.00;
    })

    const [basketItems, setBasketItems] = useState([]);
    useEffect(() => {
        const basketItemsFromStorage = JSON.parse(sessionStorage.getItem("basketData")) || [];
        setBasketItems(basketItemsFromStorage);
    }, []);
    console.log(basketItems);
    return (
        <div>
            <NavigationBar>
            </NavigationBar>

            <div className="row">
                <div className="col-2">

                </div>
                <div className="col-8">
                    <div className="text-center">
                        <div className="checkout-title">
                            Checkout
                        </div>
                    </div>
                    <div className="container d-flex justify-content-center">

                        <div className="progress-bar-container">
                            <div class="mainWrapper">
                                <div class="statusBar">
                                    <span class="pBar"></span>
                                    <div class="node n0 done nConfirm0">
                                        <div class="main done m0 done nConfirm0"></div>
                                        <span class="text t0 done nConfirm0">Cart Overview</span>
                                    </div>
                                    <div class="node n1 nConfirm1">
                                        <div class="main m1 nConfirm1"></div>
                                        <span class="text t1 nConfirm1">Payment Details</span>
                                    </div>
                                    <div class="node n2 nConfirm2">
                                        <div class="main m2 nConfirm2"></div>
                                        <span class="text t2 nConfirm2">Order Confirmation</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    {basketItems.length > 0 ?
                        <div className="container">


                            <div className="justify-content-center d-flex">

                                {basketItems.map((product) => (
                                    <div className="p-5" key={product.productID}>
                                        <div className="card">
                                            <img src={product.imageName} className="card-img-top" alt="product image" />
                                            <div className="card-body">


                                                <div className="fs-3">
                                                    {product.productName || "Product Name"}
                                                </div>
                                                <div className="quantity-text px-4">
                                                    {product.quantity || 1}
                                                </div>



                                                <div className='price-text'>
                                                    £{product.price || 0.00}
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                ))}



                            </div>

                            <div className="container border-bottom">
                                <div className="d-flex justify-content-around">
                                    <div className=" subtotal-text">
                                        Subtotal
                                    </div>
                                    <div className="subtotal-price">
                                        £ {basketTotal || 0}
                                    </div>
                                </div>
                            </div>
                            <div className="container">
                                <div className="d-flex justify-content-center my-4">
                                    <div className="login-button">
                                        Login
                                    </div>
                                </div>

                                <div className="guest-header">
                                    <span>Or</span>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <div className="pay-guest">
                                        Pay as a guest
                                    </div>
                                </div>
                            </div>
                        </div>
                        :

                        <div className="container">
                            <div className="text-center empty-cart">
                                Your cart is empty
                            </div>
                            <div className="guest-header">
                                    <span className="browse-products">Browse products here</span>
                                </div>
                         
                        </div>}
                </div>
                <div className="col-2">

                </div>
            </div>

        </div >
    )
}

export default CheckOut;