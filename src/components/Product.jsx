import React from "react";
import axios from 'axios';
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import { useNavigate, Link } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import '../css/navigation.css';
import '../css/product.css';
import '../css/dropdown.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import $ from "jquery";
import { Spinner } from 'react-bootstrap';
import ExpandableContainer from "./ExpandableContainer";
import Dropdown from "./Dropdown";


function Product() {
    const productID = useParams();
    const [product, setProduct] = useState([]);
    const id = productID.id;
    const [loadingProduct, setIsLoadingProduct] = useState(false);
    const [tempThumbnails, setTempThumbnails] = useState([]);


    // Quantity dropdown
    const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const shoeOptions = [4, 5, 6, 7, 8, 9, 10, 11, 12];
    const [selectedShoeSize, setSelectedShoeSize] = useState(4);
    const [DropDownBoxStyle, SetDropDownBoxStyle] = useState("dropdown-container");
    const [toggleQuantity, setToggledQuantity] = useState(false);
    const [selectedOptionQuantity, setSelectedOptionQuantity] = useState(1);
    const timeoutRef = useRef(null);
    const [listOfProducts, setListOfProducts] = useState([]);
    const [loading, setLoading] = useState(true);



    const toggleDropdownQuantity = () => {
        clearTimeout(timeoutRef.current);
        setToggledQuantity(!toggleQuantity);
        if (DropDownBoxStyle === "dropdown-container") {
            SetDropDownBoxStyle("dropdown-container-toggled");
        }
        else {
            SetDropDownBoxStyle("dropdown-container");
        }
    };

    const handleOptionQuantityClick = (option) => {
        setSelectedOptionQuantity(option);
        toggleDropdownQuantity();
    };
    useEffect(() => {
        if (toggleQuantity) {
            timeoutRef.current = setTimeout(() => {
                setToggledQuantity(false);
                SetDropDownBoxStyle("dropdown-container");
            }, 5000);
        }
    }, [toggleQuantity]);


    useEffect(() => {
        setIsLoadingProduct(false);
        const getProductByID = () => {
            $.ajax({
                type: "POST",
                url: 'http://localhost:8000/getProductByID.php',
                data: { productID: id },
                success(data) {
                    const productData = JSON.parse(data);
                    setProduct(productData);
                    getProductsImages();
                },
            });
            $.ajax({
                type: "POST",
                url: 'http://localhost:8000/getProductsBySimilarity.php',
                data: { productID: id },
                success(data2) {
                    const similarProducts = JSON.parse(data2);
                    setListOfProducts(similarProducts);
                },
            });
        }
        getProductByID();

    }, [productID]);





    const [thumbnailImages, setThumbnailImages] = useState([]);

    const getProductsImages = () => {
        $.ajax({
            type: "POST",
            url: 'http://localhost:8000/getThumbnailImages.php',
            data: { productID: id },
            success(data) {
                console.log(data);
                setThumbnailImages(data);
                console.log(thumbnailImages);
                iterateThumbnailImages(data)
                setIsLoadingProduct(true);



            },
        });

    };


    const iterateThumbnailImages = async (data) => {
        const tempThumbnailsCopy = [...tempThumbnails];
        for (const image of data) {
            try {
                const module = await import(`../PHP/images/products/${id}/${image}`);
                tempThumbnailsCopy.push(module.default);
            } catch (error) {
                console.error(`Failed to load image ${image}:`, error);
            }
        }
        setTempThumbnails(tempThumbnailsCopy);
    };







    const [quantity, setQuantity] = useState(1);
    const [activeImage, setActiveImage] = useState(require('../PHP/images/products/' + id + '/image1.png'));

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









    // Add to Basket

    const [basketItems, setBasketItems] = useState([]);
    useEffect(() => {
        const basketItemsFromStorage = JSON.parse(sessionStorage.getItem("basketData")) || [];
        setBasketItems(basketItemsFromStorage);
        console.log(basketItemsFromStorage, "got data");
    }, []);



    const handleAddToBasket = () => {
        const newBasketItem = { ...product[0], quantity: quantity, imagePath: activeImage, shoeSize: selectedShoeSize };
        const productExists = basketItems.find((item) => item.productID === product[0].productID && item.shoeSize === newBasketItem.shoeSize);

        if (productExists) {
            const updatedBasketItems = basketItems.map((item) => {
                if (item.productID === product[0].productID && item.shoeSize === newBasketItem.shoeSize) {
                    return { ...item, quantity: item.quantity + quantity, imagePath: activeImage };
                }
                return item;
            });
            setBasketItems(updatedBasketItems);
        } else {
            setBasketItems([...basketItems, newBasketItem]);
        }
    };



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



                    <div className="row">
                        <div className="col-2">

                        </div>
                        <div className="col-8">

                            <div onClick={returnPrevPage} className="py-2 fs-1 btn-return">
                                <i className="bi bi-arrow-left"></i> Back to search results
                            </div>
                            <hr></hr>





                            {loadingProduct ?
                                <div>
                                    <div className="row">
                                        <div className="col-5  rounded mx-3" style={{ maxWidth: "500px", maxHeight: "500px", overflow: "hidden" }}>
                                            <div className="text-center">
                                                <div className="product-image-container text-center">
                                                    <img src={activeImage} className="" alt="..."></img>
                                                </div>

                                            </div>

                                        </div>


                                        <div className="col-2 rounded container-overflow-control" style={{ maxWidth: "200px", maxHeight: "500px" }}>



                                            {tempThumbnails.map((pic, index) => {
                                                return (
                                                    <div className="small-image-thumbnail center-vertically-product-thumbnail" key={index}>
                                                        <img src={pic} onClick={() => handleImageChange(pic)} className="" alt="..." />
                                                    </div>
                                                );
                                            })}




                                        </div>
                                        <div className="col-5 px-5">
                                            <div className="font-product-header">
                                                {product[0].productName}
                                            </div>



                                            <div className="font-price-header">
                                                £{product[0].price}
                                            </div>

                                            {product[0].stock < 10 ?
                                                <div className="font-stock-warning py-4">
                                                    Only {product[0].stock} left!
                                                </div>
                                                : <div></div>}

                                            <div className={DropDownBoxStyle} style={{ marginTop: "20px", marginBottom: "20px" }}>
                                                <div className="dropdown-selected-option" onClick={toggleDropdownQuantity}>
                                                    Quantity: {selectedOptionQuantity} <i className="bi bi-caret-down-fill"></i>
                                                </div>
                                                {toggleQuantity && (
                                                    <ul className="dropdown-options-list">
                                                        {options.map(option => (
                                                            <li className="dropdown-option" key={option} value={option}
                                                                style={
                                                                    option === 1
                                                                        ? { borderBottom: "1px solid #960018" }
                                                                        : {}
                                                                }
                                                                onClick={() => handleOptionQuantityClick(option)} >
                                                                {option}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>

                                            <Dropdown
                                                options={shoeOptions}
                                                startingToggleStatus={false}
                                                onOptionClick={(option) => {
                                                    setSelectedShoeSize(option);
                                                }}
                                            />



                                            <div className="buynow-button">
                                                Buy Now
                                            </div>
                                            <div className="py-3"></div>
                                            <div className="addbasket-button" onClick={handleAddToBasket}>
                                                Add to basket
                                            </div>
                                        </div>
                                    </div>


                                    <div className="py-2">

                                    </div>



                                    <ExpandableContainer
                                        buttonText="Product Information"
                                        paragraphText="Nike Dunks Low is a classic sneaker that has been popular for decades. Originally released in 1985 as a basketball shoe, 
                                        the Nike Dunk has since become a staple in the world of streetwear and casual fashion. The low-top version of the Nike Dunk features a sleek 
                                        and streamlined design that has made it a favorite among sneakerheads and fashion enthusiasts alike. With its signature Swoosh logo and clean, 
                                        simple lines, the Nike Dunk Low is a timeless shoe that continues to be popular today. Whether you're wearing them to the gym, the skatepark, or just around 
                                        town, the Nike Dunk Low is a versatile and stylish sneaker that is sure to turn heads."
                                        startOpen={true}
                                    />
                                    <ExpandableContainer
                                        buttonText="Brand"
                                        paragraphText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod, nisi vel tristique eleifend, purus mi dapibus nibh, sed ullamcorper urna mi vitae nulla."
                                        startOpen={false}
                                    />



                                </div>

                                :
                                <div className="text-center my-5">
                                    <Spinner animation="border" role="status" variant="primary">
                                        <span className="visually-hidden">Loading Product</span>
                                    </Spinner>
                                    <div className="my-2 fs-3">Loading Product</div>
                                </div>
                            }
                        </div>
                        <hr></hr>

                        <div className="div">
                            Similar products
                        </div>
                        {!loading ?
                            <div className="row">
                                {listOfProducts.map((product, index) => {
                                    let imageSrc;
                                    try {
                                        imageSrc = require(`../PHP/images/products/${product.productID}/image1.png`);
                                    } catch {
                                        imageSrc = require('../images/stockimage.jpg');
                                    }
                                    return (
                                        <div className="col-xxl-3 col-xl-4 col-md-6 col-sm-12 d-flex justify-content-center p-5" key={index}>
                                            <Link style={{ textDecoration: 'none', color: 'black' }} to={{ pathname: `/products/product/` + product.productID }}>
                                                <div className="productCard-master">
                                                    <div className="productCard">
                                                        <img src={imageSrc} className="" alt="..."></img>
                                                        <div className="price-bg">
                                                            £{product.price}
                                                        </div>
                                                    </div>
                                                    <div className="productCard-productName">
                                                        {product.productName}
                                                    </div>
                                                    <div className="d-flex productCard-Reviews">
                                                        <i className="bi bi-star"></i>
                                                        <i className="bi bi-star"></i>
                                                        <i className="bi bi-star"></i>
                                                        <i className="bi bi-star"></i>
                                                        <i className="bi bi-star"></i>
                                                        ({product.ratings})
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    )
                                })}
                            </div>
                            : <div></div>}







                    </div>

                </div>

                <div className="col-2">

                </div>

            </div>

        </div >
    )
}

export default Product;