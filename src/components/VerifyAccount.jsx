import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/navigation.css';
import Container from 'react-bootstrap/Container';
import NavigationBar from "./NavigationBar";
import React, { useState } from 'react';
import { useParams } from "react-router";
import $ from "jquery";




function VerifyAccount() {
    const parameters = useParams();
    const verificationID = parameters.creationID;

    const verifyAccount = () => {
        $.ajax({
            type: "POST",
            url: "http://localhost:8000/registerAccount.php",
            data: {activationID: verificationID},
            success(data) {
                console.log("Activation sent")
            },
        });
    }

    verifyAccount();
    return (
        <div>
            <NavigationBar></NavigationBar>

            <Container fluid>

                <div className="fs-5">
                    Please wait while your account is added to our system
                </div>

            </Container>

        </div>


    )
}

export default VerifyAccount;