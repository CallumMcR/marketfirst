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
import { NavLink } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FaBarcode } from "react-icons/fa";

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

                    {
                        // Not logged in stage 0
                        userID === undefined && progressBar === 1 &&
                        <GuestStage1
                            basketItems={basketItems}
                            basketTotal={basketTotal}
                            onProgressClick={handleProgressClick}
                        />
                    }
                    {
                        // Logged in stage 0
                        userID !== undefined && progressBar === 1 &&
                        <UserStage1
                            basketItems={basketItems}
                            basketTotal={basketTotal}
                            onProgressClick={handleProgressClick}
                        />
                    }

                    {
                        // Not logged in stage 0
                        userID === undefined && progressBar === 2 &&
                        <GuestStage2
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
    const [cardNumber, setCardNumber] = useState("");
    const [expirationDate, setExpirationDate] = useState("");

    const handleCardNumberChange = (e) => {
        let formattedCardNumber = e.target.value
            .replace(/\D/g, "")
            .replace(/(.{4})/g, "$1 ")
            .trim();
        setCardNumber(formattedCardNumber);
    };

    const handleExpirationDateChange = (e) => {
        let formattedExpirationDate = e.target.value
            .replace(/\D/g, "")
            .replace(/(\d{2})(\d{1,2})/, "$1/$2")
            .trim();
        setExpirationDate(formattedExpirationDate);
    };

    const [cvv, setCVV] = useState("");

    const handleCVVChange = (e) => {
        let formattedCVV = e.target.value
            .replace(/\D/g, "")
            .trim();
        setCVV(formattedCVV);
    };


    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-md-6">
                    <div className="purchase-header text-center">
                        Card Details
                    </div>
                    <div className="card-number-header">Card Number</div>
                    <div id="container-details" className="text-start">
                        <input
                            id="cardNumber"
                            name="cardNumber"
                            placeholder="1234 1234 1234 1234"
                            type="text"
                            inputMode="numeric"
                            autoComplete="cc-number"
                            value={cardNumber}
                            onChange={handleCardNumberChange}
                            maxLength={19}
                            required
                        />
                    </div>

                    <div className="card-number-header">CVV Number</div>
                    <div id="container-details" className="text-start">
                        <input
                            id="CVV"
                            name="CVV"
                            placeholder="123"
                            type="text"
                            maxLength={3}
                            value={cvv}
                            onChange={handleCVVChange}
                            required
                        />
                    </div>

                    <div className="card-number-header">Expiration Date</div>
                    <div id="container-details" className="text-start">
                        <input
                            id="expirationDate"
                            name="expirationDate"
                            placeholder="MM/YY"
                            type="text"
                            autoComplete="cc-exp"
                            value={expirationDate}
                            onChange={handleExpirationDateChange}
                            maxLength={5}
                            required
                        />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="text-center buying-header">
                        Items being bought
                    </div>

                    <div
                        style={{
                            overflowX: "hidden",
                            overflowY: "scroll",
                            height: "400px",
                        }}
                    >
                        {basketItems.map((product) => (
                            <div className="" key={product.productID}>
                                <div
                                    className="card"
                                    style={{ border: "none" }}
                                >
                                    <img
                                        src={require(`../PHP/images/products/${product.productID}/image1.png`)}
                                        alt="product"
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title fs-5">
                                            {product.productName}
                                        </h5>
                                        <div className="d-flex">
                                            <div className="fs-4 px-4">
                                                {product.quantity}
                                            </div>
                                        </div>
                                        <div className="size-text">
                                            Size:{product.shoeSize}
                                        </div>
                                        <div className="price-text">
                                            £{product.price * product.quantity}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <hr></hr>

            <div className="d-flex justify-content-end">

                <div className="subtotal-price-stage1">
                    £ {basketTotal}

                </div>
            </div>

            <div className="my-3">

            </div>

            <div className="d-flex justify-content-between">
                <button
                    className="btn btn-light"
                    onClick={() => onProgressClick(0)}
                >
                    <FaArrowLeft />
                    &nbsp;Card Overview
                </button>
                <button
                    className="btn btn-primary"
                    onClick={() => onProgressClick(2)}
                >
                    Payment Details&nbsp;
                    <FaArrowRight />
                </button>
            </div>

        </div>
    );
}


function GuestStage2({ basketItems, basketTotal, onProgressClick }) {
    const [barcode, setBarcode] = useState("");

    useEffect(() => {
        // Generate a random barcode
        setBarcode(Math.random().toString(36).substring(2, 15));
    }, []);

    return (
        <div className="pt-5">
            <div className="container my-5">
                <div className="gueststage2-header text-center">
                    Purchase complete
                </div>
                <hr></hr>

                <div className="row">
                    <div className="col-6">
                        <div
                            style={{
                                overflowX: "hidden",
                                overflowY: "scroll",
                                height: "600px",
                            }}
                        >
                            {basketItems.map((product) => (
                                <div className="" key={product.productID}>
                                    <div
                                        className="card"
                                        style={{ border: "none" }}
                                    >
                                        <img
                                            src={require(`../PHP/images/products/${product.productID}/image1.png`)}
                                            alt="product"
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title fs-5">
                                                {product.productName}
                                            </h5>
                                            <div className="d-flex">
                                                <div className="fs-4">
                                                    Quantity: {product.quantity}
                                                </div>
                                            </div>
                                            <div className="size-text">
                                                Size:{product.shoeSize}
                                            </div>
                                            <div className="price-text">
                                                £{product.price * product.quantity}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="d-flex justify-content-start">

                            <div className="subtotal-price-stage1">
                                Total £ {basketTotal}

                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="d-flex flex-column align-items-center">
                            <div className="orderconfirmation-text">
                                Order Confirmation #{ }
                            </div>
                            <div className="my-2">

                            </div>
                            <div className="orderconfirmation-text">
                                Your order has been made and is being
                                processed.
                                <br></br> <br></br>
                                Upon completion of processing, your order
                                will be dispatched to the vendor nearest to
                                you, and then put out for delivery.
                            </div>
                            <div className="my-5">

                            </div>
                            <h3>Scan the barcode below to track your package</h3>
                            <hr></hr>
                            <FaBarcode size={200} />




                        </div>

                    </div>
                </div>

                <hr>
                </hr>

            </div>
        </div>
    );
}






