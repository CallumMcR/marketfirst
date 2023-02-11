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

    const verifyAccount = (e) => {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "http://localhost:8000/registerAccount.php",
            data: {activationID: verificationID},
            success(data) {
                console.log("Activation sent")
            },
        });
    }
    return (
        <div>
            <NavigationBar></NavigationBar>

            <Container fluid>

                <button
                    onClick={(event) => verifyAccount(event)}>

                </button>

            </Container>

        </div>


    )
}

export default VerifyAccount;