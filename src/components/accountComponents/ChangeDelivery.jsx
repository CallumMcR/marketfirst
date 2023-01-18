import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/login.css'
import React, { useState } from 'react';






function ChangeDelivery() {

    return (
        <div className="">
            <div className="text-center">
                Change delivery details
            </div>
            <div className="row">
                <div className="col-3">

                </div>
                <div className="col-6 container-custom-input">
                    <input
                        placeholder='First Name'>

                    </input>
                    <input
                    placeholder='Address 1'>
                    </input>
                    <input
                    placeholder='Address 2'>
                    </input>
                </div>
                <div className="col-3">

                </div>
            </div>
        </div>
    )
}
export default ChangeDelivery;