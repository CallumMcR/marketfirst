import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/login.css'
import pic from "../../images/test/image1.webp";
import React, { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Card from 'react-bootstrap/Card';


function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
        console.log('totally custom!'),
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

    const [orderedProducts, setOrderedProducts] = useState([{ orderID: "213131312", productName: "Nike Trainers", price: "20.00" }]);

    return (
        <div className="">
            <div className="text-center">
                My Orders
            </div>
            <div className="row">
                <div className="col-2">

                </div>
                <div className="col-8 container-custom-input">
                    {orderedProducts.map((product, index) => {
                        return (

                            <Accordion defaultActiveKey="0" key={index}>
                                <Card style={{ display: "block" }}>
                                    <Card.Header>
                                        <CustomToggle eventKey="0" >
                                            <div className="d-flex position-relative" style={{ flexGrow: 1 }}>

                                                <img style={{ maxHeight: "100px" }} className='img-fluid img-thumbnail' src={pic} alt="product"></img>

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



                    })}




                </div>
                <div className="col-2">

                </div>
            </div>
        </div>
    )
}
export default MyOrders;