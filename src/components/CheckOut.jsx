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

function CheckOut() {



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
                    <div className="container-fluid d-flex justify-content-center">
                        
                    </div>

                </div>
                <div className="col-2">

                </div>
            </div>

        </div >
    )
}

export default CheckOut;