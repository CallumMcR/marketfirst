import React from "react";
import axios from 'axios';
import { useState, useEffect } from "react";
import { useParams } from "react-router";
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

    const handleQuantityChange = (e) => {
        setQuantity(e);
    }

    return (
        <div>
            <NavigationBar>
            </NavigationBar>

            <div className="row">
                <div className="col-2">

                </div>
                <div className="col-8">

                    <div className="py-2 fs-1">
                        Back to search results
                    </div>
                    <hr></hr>

                    <div className="row">
                        <div className="col-5">
                            <div className="text-center">
                                <div className="product-image-container text-center border rounded">
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
                                className="py-2"
                            >
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

                </div>
                <div className="col-2">

                </div>
            </div>

        </div >
    )
}

export default Product;