import React from "react";
import axios from 'axios';
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import NavigationBar from "./NavigationBar";
import '../css/navigation.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";


function Product() {
    const productID = useParams();
    const [product, setProduct] = useState([]);
    useEffect(() => {
        axios.get(`products.php?productID=${productID}`)
            .then(res => setProduct(res.data))
    }, [productID]);



    return (
        <div>
            <NavigationBar>
            </NavigationBar>
            

        </div >
    )
}

export default Product;