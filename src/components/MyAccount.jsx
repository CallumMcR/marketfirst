import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/navigation.css';
import '../css/myaccount.css';
import NavigationBar from "./NavigationBar";
import React, { useState, useEffect } from 'react';
import MyOrders from './accountComponents/MyOrders';
import ChangeDelivery from './accountComponents/ChangeDelivery';
import { useParams } from "react-router";
import Admin from "./accountComponents/AdminComp";


function MyAccount() {
    const pageLocation = useParams();
    const [pageState, setPageState] = useState();


    useEffect(() => {
        if (pageLocation.location === "home") {
            setPageState(<MyOrders></MyOrders>);
        }
    }, [pageLocation]);

    return (
        <div>
            <NavigationBar></NavigationBar>
            <div className="row">
                <div className="col-3">

                </div>
                <div className="col-1 border">
                    <div className="hyperlink-container text-center my-5">
                        <button onClick={(e) => setPageState(<MyOrders></MyOrders>)}>My Orders</button>
                        <button onClick={(e) => setPageState(<ChangeDelivery></ChangeDelivery>)}>Change Delivery Details</button>
                        <button onClick={(e) => setPageState(<Admin></Admin>)}>Admin</button>
                    </div>
                </div>
                <div className="col-5 border">
                    <div className="my-3">
                        {pageState}
                    </div>

                </div>
                <div className="col-3">

                </div>
            </div>
        </div>
    )
}
export default MyAccount;