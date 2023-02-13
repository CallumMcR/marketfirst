import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/navigation.css';
import '../css/login.css';
import Container from 'react-bootstrap/Container';
import React, { useState } from 'react';
import axios from 'axios';
import $ from "jquery";





function RegisterComp() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [firstName, setFirstName] = useState("");
    const [surname, setSurname] = useState("");


    const [registerInProgress, setRegisterInProgress] = useState(false);


    
    const handleSubmit = (e) => {
        setRegisterInProgress(true);
        e.preventDefault();
        const form = $(e.target);
        $.ajax({
            type: "POST",
            url: form.attr("action"),
            data: form.serialize(),
            success(data) {
                console.log("Activation sent")
            },
        });
    };

    return (
        <div>


            {registerInProgress === false ?
                <div className="text-center">
                    <Container id="container-signin">
                        <form
                            action="http://localhost:8000/mailer.php"
                            method="post"
                            onSubmit={(event) => handleSubmit(event)}>
                            <input
                                id="email"
                                name="email"
                                placeholder='Email address' type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                required>
                            </input>
                            <input
                                placeholder='Password' type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                required>
                            </input>

                            <input
                                placeholder='Repeat Password' type="password"
                                onChange={(e) => setPasswordConfirmation(e.target.value)}
                                required>
                            </input>
                            <div className="d-flex justify-content-center">
                                <input
                                    placeholder='First Name' type="text"
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required>
                                </input>
                                <input
                                    placeholder='Surname' type="text"
                                    onChange={(e) => setSurname(e.target.value)}
                                    required>
                                </input>

                            </div>
                            <div className="text-center">
                                <button type="submit" className="signin-button mx-auto">
                                    Register
                                </button>

                            </div>

                        </form>

                    </Container>

                </div>
                :
                <div>
                    <div className="text-center my-3 d-flex justify-content-center">
                        <div class="spinner-grow" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        <div class="spinner-grow" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        <div class="spinner-grow" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                    <div className="text-center">
                        Sending verification email...
                    </div>
                </div>}
        </div>
    )
}
export default RegisterComp;