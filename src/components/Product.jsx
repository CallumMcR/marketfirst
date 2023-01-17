import React from "react";
import axios from 'axios';
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { Dropdown, DropdownButton } from "react-bootstrap";
import NavigationBar from "./NavigationBar";
import '../css/navigation.css';
import '../css/product.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";


function Product() {
    const productID = useParams(); // Make sure to switch back after testing to productID
    const [product, setProduct] = useState([{ productID: 2, name: "Product 1" }]);


    /*
    useEffect(() => {
        axios.get(`products.php?productID=${productID}`)
            .then(res => setProduct(res.data))
    }, [productID]);

*/
    const [quantity, setQuantity] = useState(1);

    const [activeImage, setActiveImage] = useState(require('../images/test/image1.webp'));

    const handleQuantityChange = (e) => {
        setQuantity(e);
    }

    const handleImageChange = (e) => {
        setActiveImage(e);
    }

    const navigate = useNavigate();
    const returnPrevPage = () => {
        navigate(-1);
    };



    const [tempThumbnails, setTempThumbnails] = useState([
        { image: "../images/test/image1.webp" },
        { image: "../images/test/image1.webp" },
        { image: "../images/test/image1.webp" },
        { image: "../images/test/image1.webp" },
        { image: "../images/test/image1.webp" },
        { image: "../images/test/image1.webp" },
    ]);

    // Add to Basket

    const [basketItems, setBasketItems] = useState([]);

    useEffect(() => {
        const basketItemsFromStorage = JSON.parse(sessionStorage.getItem("basketData")) || [];
        setBasketItems(basketItemsFromStorage);
    }, []);


    const handleAddToBasket = () => {
        const productsExists = basketItems.find((item) => item.productID == product.productID);
        if (productsExists) {
            const updatedBasketItems = basketItems.map((item) => {
                if (item.productID === product.productID) {
                    return { ...item, quantity: item.quantity + quantity }
                }
                return item;
            });
            setBasketItems(updatedBasketItems);
            console.log("Setting items 1");
        }
        else {
            setBasketItems([...basketItems, { ...product, quantity: quantity }])
            console.log("Setting items 2", basketItems);

        }
    }


    useEffect(() => {
        sessionStorage.setItem("basketData", JSON.stringify(basketItems));
        window.dispatchEvent(new Event("basketUpdated"));
    }, [basketItems]);


    return (
        <div>
            <NavigationBar>
            </NavigationBar>

            <div className="row">
                <div className="col-2">

                </div>
                <div className="col-8">

                    <div onClick={returnPrevPage} className="py-2 fs-1 btn-return">
                        <i className="bi bi-arrow-left"></i> Back to search results
                    </div>
                    <hr></hr>

                    <div className="row">
                        <div className="col-5  border rounded mx-3" style={{ maxWidth: "500px", maxHeight: "500px", overflow: "hidden" }}>
                            <div className="text-center">
                                <div className="product-image-container text-center">
                                    <img src={activeImage} className="" alt="..."></img>
                                </div>

                            </div>

                        </div>


                        <div className="col-2 border rounded container-overflow-control" style={{ maxWidth: "200px", maxHeight: "500px" }}>



                            {tempThumbnails.map((pic, index) => {
                                return (

                                    <div className="small-image-thumbnail center-vertically-product-thumbnail" key={index}>
                                        <img src={require('../images/test/image1.webp')} onClick={() => handleImageChange('../images/test/image1.webp')} className="" alt="..."></img>
                                    </div>
                                )



                            })}




                        </div>
                        <div className="col-5">
                            <div className="font-product-header">
                                Product Name
                            </div>

                            <div className="font-product-header py-4">
                                Stock: { }
                            </div>

                            <div className="font-price-header">
                                £{ }
                            </div>

                            <DropdownButton
                                title={`Quantity: ${quantity}`}
                                variant="dark"
                                className="py-2 my-4">
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((quantity) => (
                                    <Dropdown.Item
                                        key={quantity}
                                        onClick={() => handleQuantityChange(quantity)}
                                    >
                                        {quantity}
                                    </Dropdown.Item>
                                ))}
                            </DropdownButton>
                            <div className="buynow-button">
                                Buy Now
                            </div>
                            <div className="py-3"></div>
                            <div className="addbasket-button" onClick={handleAddToBasket}>
                                Add to basket
                            </div>
                        </div>
                    </div>



                    <div className="product-description-header pt-5">
                        { }
                    </div>

                    <div className="pt-3 product-reviews-header">
                        Reviews: { }
                    </div>
                    <hr></hr>

                    <div className="p-3">
                        <div className="row border">
                            <div className="col-2">
                                <div className="review-image-container">
                                    <img src={require('../images/test/image1.webp')} className="" alt="..."></img>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="ratings">
                                    <i class="bi bi-star"></i>
                                    <i class="bi bi-star"></i>
                                    <i class="bi bi-star"></i>
                                    <i class="bi bi-star"></i>
                                    <i class="bi bi-star"></i>
                                </div>
                                <div className="fs-5 fw-bold">
                                    Username
                                </div>
                                <div className="fs-5 fw-normal">
                                    Date
                                </div>
                            </div>
                            <div className="col-6">
                                Description { }
                            </div>
                        </div>
                    </div>


                </div>
                <div className="col-2">

                </div>
            </div>

        </div >
    )
}

export default Product;