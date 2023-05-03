import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/navigation.css';
import Container from 'react-bootstrap/Container';
import React from 'react';
import '../css/paymentmethod.css';





function AddPaymentMethod({ basketItems, basketTotal, onProgressClick }) {

    return (
        <div>
            <div className="text-center">

                <div className="pay-header">
                    Add/Select a payment method
                </div>
                <hr></hr>


                <div className="row">
                    <div className="col-6 border-end">

                        <div className="add-payment-button">
                            Add payment
                        </div>

                    </div>
                    <div className="col-6">

                    </div>
                </div>
            </div>
        </div>
    )
}
export default AddPaymentMethod;