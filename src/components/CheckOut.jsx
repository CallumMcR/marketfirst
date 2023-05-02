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
import Footer from "./Footer"
import Cookies from 'universal-cookie';

function CheckOut() {
    const [basketTotal, setBasketTotal] = useState(0);
    const [basketItems, setBasketItems] = useState([]);
    const setTotalPrice = () => {
        let total = 0;
        for (let item of basketItems) {
            total += parseInt(item.price) * item.quantity;
        }
        console.log("Total checkout", total);
        setBasketTotal(total);
    }
    useEffect(() => {
        const basketItemsFromStorage = JSON.parse(sessionStorage.getItem("basketData")) || [];
        setBasketItems(basketItemsFromStorage);
    }, []);

    useEffect(() => {
        setTotalPrice();
    }, [basketItems]);

    const cookies = new Cookies();
    const userID = cookies.get('userID')
    const [progressBar, setProgress] = useState(0);

    const [backClass, setBackClass] = useState(" disabled");

    const handleProgressClick = (progressValue) => {
        let newProgress = progressBar;

        if (progressValue > progressBar) {
            newProgress = progressBar + 1;
            setProgress(newProgress);
            $(".nConfirm" + newProgress).each(function () {
                $(this).addClass("done");
            });
            var pBar = (progressValue / 2) * 100;
            $(".pBar").css("width", `${pBar}%`);
            if (progressValue == 2) {
                $("#next").addClass("disabled");
            }
        } else if (progressValue < progressBar) {
            $(".nConfirm" + progressBar).each(function () {
                $(this).removeClass("done");
            });
            newProgress = progressBar - 1;
            setProgress(newProgress);
            var pBar = (progressValue / 2) * 100;
            $(".pBar").css("width", `${pBar}%`);
            if (progressValue == 0) {
                setBackClass(" disabled");
            }
        }
    };



    const progressBarChange = (state) => {
        if (state === "next") {
            setProgress(progressBar++);

            $(".nConfirm" + progressBar).each(function () {
                $(this).addClass("done");
            });

            var pBar = (state / 2) * 100;
            $(".pBar").css("width", `${pBar}%`);
            if (state == 2) {
                $("#next").addClass("disabled");
            }
        }
        else if (state === "back") {

            $(".nConfirm" + progressBar).each(function () {
                $(this).removeClass("done");
            });

            setProgress(progressBar--);

            var pBar = (state / 2) * 100;
            $(".pBar").css("width", `${pBar}%`);

            if (state == 0) {
                setBackClass(" disabled");
            }
        }

    }
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

                    {
                        // Not logged in stage 0
                        userID === undefined && progressBar === 0 &&
                        <GuestStage0
                            basketItems={basketItems}
                            basketTotal={basketTotal}
                            onProgressClick={handleProgressClick}
                        />
                    }
                    {
                        // No items in basket
                        basketItems.length <= 0 &&
                        <div className="container">
                            <div className="text-center empty-cart">
                                Your cart is empty
                            </div>
                            <div className="guest-header">
                                <span className="browse-products">Browse products here</span>
                            </div>
                        </div>
                    }

                    {
                        // Logged in stage 0
                        userID !== undefined && progressBar === 0 &&
                        <UserStage0
                            basketItems={basketItems}
                            basketTotal={basketTotal}
                            onProgressClick={handleProgressClick}
                        />
                    }









                </div>
                <div className="col-2">
                </div>
            </div>
            <Footer></Footer>
        </div >
    )
}

export default CheckOut;

function UserStage0({ basketItems, basketTotal, onProgressClick }) {
    return (
        basketItems.length > 0 ?
            <div className="container">
                <div className="justify-content-center d-flex">
                    {basketItems.map((product) => (
                        <div className="p-5" key={product.productID}>
                            <div className="card" style={{ border: "none" }}>
                                <img src={require(`../PHP/images/products/${product.productID}/image1.png`)} alt="product" />
                                <div className="card-body">
                                    <h5 className="card-title fs-1">{product.productName}</h5>
                                    <div className="d-flex">
                                        <div className="quantity-text px-4">
                                            {product.quantity}
                                        </div>
                                    </div>
                                    <div className="size-text">
                                        Size:{product.shoeSize}
                                    </div>
                                    <div className='price-text'>
                                        £{product.price * product.quantity}
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
                            £ {basketTotal}
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="d-flex justify-content-center">
                        <div className="login-button mt-4" onClick={() => onProgressClick(1)}>
                            Pay
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
            </div>
    );
}

function GuestStage0({ basketItems, basketTotal, onProgressClick }) {
    return (
        <div className="container">
            <div className="justify-content-center d-flex">
                {basketItems.map((product) => (
                    <div className="p-5" key={product.productID}>
                        <div className="card" style={{ border: "none" }}>
                            <img src={require(`../PHP/images/products/${product.productID}/image1.png`)} alt="product" />
                            <div className="card-body">
                                <h5 className="card-title fs-1">{product.productName}</h5>
                                <div className="d-flex">
                                    <div className="quantity-text px-4">
                                        {product.quantity}
                                    </div>
                                </div>
                                <div className="size-text">
                                    Size:{product.shoeSize}
                                </div>
                                <div className='price-text'>
                                    £{product.price * product.quantity}
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
                        £ {basketTotal}
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
                    <div className="pay-guest" onClick={() => onProgressClick(1)}>
                        Pay as a guest
                    </div>
                </div>
            </div>
        </div>
    );
}

function UserStage1({ basketItems, basketTotal, onProgressClick }) {
    return (
        <div>

        </div>
    );
}

function GuestStage1({ basketItems, basketTotal, onProgressClick }) {
    return (
        <div className="container">
            <div className="row">
                <div className="col-6">
                    test
                </div>
                <div className="col-6">
                    test
                </div>
            </div>
        </div>
    );
}













