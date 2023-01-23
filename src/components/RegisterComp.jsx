import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/navigation.css';
import '../css/login.css';
import Container from 'react-bootstrap/Container';
import React, { useState } from 'react';
import axios from 'axios';






function RegisterComp() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [firstName, setFirstName] = useState("");
    const [surname, setSurname] = useState("");

    
    const { sendConfirmatonEmail } = require('../mailer.js')
    
    
    
    const handleRegisterAccount = () => {



    }


    const registerAccount = async () => {
        const option = {
            method: 'post',
            url: `registerAccount.php`,
            data: {
                email: email,
                password: password,
                firstName: firstName,
                surname: surname
            },
            validateStatus: function (status) {
                return status >= 200 && status < 300; // default
            },
        };

        try {
            const response = await axios(option);
            if (response === true) {

            }
        } catch (error) {
            const { response } = error;
            const { request, ...errorObject } = response; // take everything but 'request'
            console.log(errorObject);
        }
    }

    return (
        <div>

            <div className="text-center">
                <Container id="container-signin">
                    <form>
                        <input
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
                            <button className="signin-button mx-auto" onSubmit={handleRegisterAccount}>
                                Register
                            </button>

                        </div>
                    </form>


                </Container>

            </div>

        </div>
    )
}
export default RegisterComp;