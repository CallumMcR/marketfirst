import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/navigation.css';
import '../css/myaccount.css';
import NavigationBar from "./NavigationBar";
import React, { useState } from 'react';
import MyOrders from './accountComponents/MyOrders';
import ChangeDelivery from './accountComponents/ChangeDelivery';
import { useParams } from "react-router";



function MyAccount() {
    const pageLocation = useParams(); 
    const [pageState, setPageState] = useState();
    if(pageLocation==="home"){
        setPageState(<MyOrders></MyOrders>);
    }
    

    return (
        <div>
            <NavigationBar></NavigationBar>
            <div className="row">
                <div className="col-3">

                </div>
                <div className="col-1 border">
                    <div className="hyperlink-container text-center">
                        <button onClick={(e) => setPageState(<MyOrders></MyOrders>)}>My Orders</button>
                        <button onClick={(e) => setPageState(<ChangeDelivery></ChangeDelivery>)}>Change Delivery Details</button>
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