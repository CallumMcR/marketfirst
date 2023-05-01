import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/login.css'
import pic from "../../images/test/image1.webp";
import React, { useState, useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Card from 'react-bootstrap/Card';
import Cookies from 'universal-cookie';
import $ from "jquery";

function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
        console.log(''),
    );



    return (
        <button
            type="button"
            style={{ width: "100%", outline: "none", border: "none", backgroundColor: "white" }}
            onClick={decoratedOnClick}
        >
            {children}
        </button>
    );
}



function MyOrders() {
    const cookies = new Cookies();
    const [orderedProducts, setOrderedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userID = cookies.get('userID')
        $.ajax({
            type: "POST",
            url: 'http://localhost:8000/getOrders.php',
            data: { user_id: userID },
            success(data) {
                console.log(data);
                if (data.length === 0) {
                    setOrderedProducts([]);
                }
                else {
                    setOrderedProducts(JSON.parse(data));
                }

                setLoading(false);

            },
            error: function (xhr, textStatus, errorThrown) {
                console.log("Error retrieving orders: " + errorThrown);
            }
        });



    }, []);

    return (
        <div className="">
            <div className="text-center">
                My Orders
            </div>
            <hr></hr>
            <div className="row">
                <div className="col-2">

                </div>
                <div className="col-8 container-custom-input">




                    {
                        loading ?
                            <div>
                                <div class="d-flex justify-content-center">
                                    <div class="spinner-border" role="status" style={{ width: "5em", height: "5em" }}>
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-center">
                                    Loading...
                                </div>
                            </div>

                            :
                            orderedProducts.map((product, index) => {
                                return (

                                    <Accordion defaultActiveKey="0" key={index}>
                                        <Card style={{ display: "block" }}>
                                            <Card.Header>
                                                <CustomToggle eventKey="0" >
                                                    <div className="d-flex position-relative" style={{ flexGrow: 1 }}>

                                                        <img style={{ maxHeight: "100px", border: 0 }} className='img-fluid img-thumbnail' src={pic} alt="product"></img>

                                                        <div className="container-fluid w-100">
                                                            <div className="row">
                                                                <div className="col-10 text-start">
                                                                    <div className="fs-5">
                                                                        {product.productName}
                                                                    </div>
                                                                    <div className="fs-5">
                                                                        £{product.price}
                                                                    </div>
                                                                    <div className="fs-5">
                                                                        Order No. #{product.orderID}
                                                                    </div>
                                                                </div>
                                                                <div className="col-2">
                                                                    <div className="text-end">
                                                                        <i class="bi bi-caret-down-fill"></i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </CustomToggle>
                                            </Card.Header>
                                            <Accordion.Collapse eventKey="0">
                                                <Card.Body>
                                                    Information about the product goes here
                                                </Card.Body>
                                            </Accordion.Collapse>
                                        </Card>

                                    </Accordion>

                                )



                            })



                    }

                    {
                        !loading && orderedProducts.length === 0 ?

                        <div className="fs-4">
                            No orders
                        </div>
                        :
                        <div></div>
                    }




                </div>
                <div className="col-2">

                </div>
            </div>
        </div>
    )
}
export default MyOrders;