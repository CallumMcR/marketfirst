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
    const productID = useParams();
    const [product, setProduct] = useState([]);
    useEffect(() => {
        axios.get(`products.php?productID=${productID}`)
            .then(res => setProduct(res.data))
    }, [productID]);


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





    return (
        <div>
            <NavigationBar>
            </NavigationBar>

            <div className="row">
                <div className="col-2">

                </div>
                <div className="col-8">

                    <div onClick={returnPrevPage} className="py-2 fs-1 btn-return">
                        <i class="bi bi-arrow-left"></i> Back to search results
                    </div>
                    <hr></hr>

                    <div className="row">
                        <div className="col-5">
                            <div className="text-center">
                                <div className="product-image-container text-center border rounded">
                                    <img src={activeImage} className="" alt="..."></img>
                                </div>

                            </div>
                            <div className="pt-4">
                                <div className="product-images-container text-center border rounded">
                                    <div className="row h-100 m-0">
                                        <div className="col-2 h-100 center-vertically-arrows">
                                            <i class="bi bi-arrow-left-circle-fill product-images-arrows-size"></i>
                                        </div>
                                        <div className="col-8 h-100">
                                            <div className="row h-100">

                                                {/* Horizontal Scroll */}



                                                <div className="col-4 h-100 center-vertically-product-thumbnail">
                                                    <div className="small-image-thumbnail center-vertically-product-thumbnail">
                                                        <img src={require('../images/test/image1.webp')} onClick={() => handleImageChange()} className="" alt="..."></img>
                                                    </div>


                                                </div>
                                         

                                            </div>
                                        </div>
                                        <div className="col-2 center-vertically-arrows">
                                            <i class="bi bi-arrow-right-circle-fill product-images-arrows-size"></i>
                                        </div>
                                    </div>

                                    <img src={require('../images/test/image1.webp')} className="" alt="..."></img>
                                </div>
                            </div>


                        </div>
                        <div className="col-7">
                            <div className="font-product-header">
                                Product Name
                            </div>

                            <div className="font-product-header py-4">
                                Stock: { }
                            </div>

                            <div className="font-price-header">
                                £{ }
                            </div>
                            <div className="font-quantity-header">
                                Quantity:
                            </div>
                            <DropdownButton
                                title={`Quantity: ${quantity}`}
                                variant="dark"
                                className="py-2">
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
                            <div className="addbasket-button">
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