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
import AddPaymentMethod from "./AddPaymentMethod";


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
                        // No items in basket
                        basketItems.length <= 0 &&
                        <div className="container">
                            <div className="guest-header mt-5">
                                <span className="browse-products"><NavLink to="/products"
                                    style={{
                                        fontSize: '25px',
                                        textDecoration: "none",
                                        verticalAlign: 'middle'
                                    }}>Browse products here</NavLink></span>
                            </div>
                            <div className="text-center empty-cart">
                                Your cart is empty
                            </div>




                        </div>
                    }


                    {
                        // Not logged in stage 0
                        userID === undefined && progressBar === 0 && basketItems.length > 1 &&
                        <GuestStage0
                            basketItems={basketItems}
                            basketTotal={basketTotal}
                            onProgressClick={handleProgressClick}
                        />
                    }

                    {
                        // Logged in stage 0
                        userID !== undefined && progressBar === 0 && basketItems.length > 1 &&
                        <UserStage0
                            basketItems={basketItems}
                            basketTotal={basketTotal}
                            onProgressClick={handleProgressClick}
                        />
                    }

                    {
                        // Not logged in stage 0
                        userID === undefined && progressBar === 1 && basketItems.length > 1 &&
                        <GuestStage1
                            basketItems={basketItems}
                            basketTotal={basketTotal}
                            onProgressClick={handleProgressClick}
                        />
                    }
                    {
                        // Logged in stage 0
                        userID !== undefined && progressBar === 1 && basketItems.length > 1 &&
                        <UserStage1
                            basketItems={basketItems}
                            basketTotal={basketTotal}
                            onProgressClick={handleProgressClick}
                        />
                    }

                    {
                        // Not logged in stage 0
                        userID === undefined && progressBar === 2 && basketItems.length > 1 &&
                        <GuestStage2
                            basketItems={basketItems}
                            basketTotal={basketTotal}
                            onProgressClick={handleProgressClick}
                        />
                    }

                    {
                        // Logged in stage 1
                        userID !== undefined && progressBar === 1 && basketItems.length > 1 &&
                        <AddPaymentMethod
                            basketItems={basketItems}
                            basketTotal={basketTotal}
                            onProgressClick={handleProgressClick}
                        />
                    }









                </div>
                <div className="col-2">
                </div>
            </div>

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
                    <NavLink className=' login-button'
                        style={{
                            fontSize: '25px',
                            textDecoration: "none",
                            verticalAlign: 'middle'
                        }} to="/Login">Login </NavLink>
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
    const [cardHolderName, setCardHolderName] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [postCode, setPostCode] = useState("");
    const [city, setCity] = useState("");
    const [email, setEmail] = useState("");

    const [isCompleted, setIsCompleted] = useState(false);

    const handleAddress1Change = (e) => {
        setAddress1(e.target.value);
    };
    const handleAddress2Change = (e) => {
        setAddress2(e.target.value);
    };
    const handlePostCodeChange = (e) => {
        setPostCode(e.target.value);
    };

    const handleCityChange = (e) => {
        setCity(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };


    const handleCardNumberChange = (e) => {
        let formattedCardNumber = e.target.value
            .replace(/\D/g, "")
            .replace(/(.{4})/g, "$1 ")
            .trim();
        setCardNumber(formattedCardNumber);
    };

    const handleCardHolderNameChange = (e) => {
        setCardHolderName(e.target.value);
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


    useEffect(() => {
        // Check if all input fields are filled
        if (
            cardNumber &&
            expirationDate &&
            cardHolderName &&
            address1 &&
            address2 &&
            postCode &&
            city &&
            email
        ) {
            setIsCompleted(true);
        } else {
            setIsCompleted(false);
        }
    }, [cardNumber, expirationDate, cardHolderName, address1, address2, postCode, city, email]);


    const handleSubmit = (e) => {
        e.preventDefault();
        const form = $(e.target);
        $.ajax({
            type: "POST",
            url: form.attr("action"),
            data: form.serialize(),
            success(data) {
                console.log("Receipt Sent");
                onProgressClick(2);
            },
            error(jqXHR, textStatus, errorThrown) {
                console.log("Error:", errorThrown);
            },
        });
    };


    return (
        <div className="container my-5">
            <form
                action="http://localhost:8000/mailerReceipt.php"
                method="post"
                onSubmit={(event) => handleSubmit(event)}>

                <div className="row">
                    <div className="col-md-6">
                        <div className="purchase-header text-start pb-3">
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

                        <div className="card-number-header">Card Holder Name</div>
                        <div id="container-details" className="text-start">
                            <input
                                id="cardHolderName"
                                name="cardHolderName"
                                placeholder="MR J DOE"
                                type="text"
                                value={cardHolderName}
                                onChange={handleCardHolderNameChange}
                                required
                            />
                        </div>


                        <div className="purchase-header text-start pb-3">
                            Personal Details
                        </div>

                        <div className="card-number-header">Email Address</div>
                        <div id="container-details" className="text-start">
                            <input
                                id="email"
                                name="email"
                                placeholder="johndoe@gmail.com"
                                type="text"
                                value={email}
                                onChange={handleEmailChange}
                                required
                            />
                        </div>


                        <div className="card-number-header">Address Line 1</div>
                        <div id="container-details" className="text-start">
                            <input
                                id="address1"
                                name="address1"
                                placeholder="Address Line 1"
                                type="text"
                                value={address1}
                                onChange={handleAddress1Change}
                                required
                            />
                        </div>

                        <div className="card-number-header">Address Line 2</div>
                        <div id="container-details" className="text-start">
                            <input
                                id="address1"
                                name="address1"
                                placeholder="Address Line 2"
                                type="text"
                                value={address2}
                                onChange={handleAddress2Change}
                                required
                            />
                        </div>

                        <div className="card-number-header">City/Town</div>
                        <div id="container-details" className="text-start">
                            <input
                                id="city"
                                name="city"
                                placeholder="City/Town"
                                type="text"
                                value={city}
                                onChange={handleCityChange}
                                required
                            />
                        </div>

                        <div className="card-number-header">Post Code</div>
                        <div id="container-details" className="text-start">
                            <input
                                id="postCode"
                                name="postCode"
                                placeholder="PE1 1111"
                                type="text"
                                value={postCode}
                                onChange={handlePostCodeChange}
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
                        type="submit"
                        onSubmit={(e) => handleSubmit(e)}
                        disabled={!isCompleted}
                    >
                        Payment Details&nbsp;
                        <FaArrowRight />
                    </button>
                </div>
            </form>

        </div >
    );
}


function GuestStage2({ basketItems, basketTotal, onProgressClick }) {
    const [barcode, setBarcode] = useState("");

    useEffect(() => {
        // Generate a random barcode
        setBarcode(Math.random().toString(36).substring(2, 15));
    }, []);

    const min = 100000;
    const max = 200000;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    const [basketCopy, setBasketCopy] = useState(basketItems);

    useEffect(() => {
        sessionStorage.setItem("basketItems", JSON.stringify([]));
        sessionStorage.setItem("basketData", JSON.stringify([]));
        window.dispatchEvent(new Event("basketUpdated"));
    }, [basketCopy]);

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
                            {basketCopy.map((product) => (
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
                                Order Confirmation #{randomNumber}
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






