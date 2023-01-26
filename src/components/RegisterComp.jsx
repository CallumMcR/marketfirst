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





    const handleRegisterAccount = () => {
        if (password === passwordConfirmation) {
            registerAccount();
        }

    }


    const registerAccount = async () => {
        const mailerData = {
            email: email,
            subject: "Market first account activation",
            message: "Please click here to activate your account",
        };
        console.log("trying");
        try {
            const response = await axios.post('http://localhost/marketfirst/src/php/mailer.php', mailerData);
            if (response.status === 200) {
                console.log("Activation email sent successfully");
            }
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div>

            <div className="text-center">
                <Container id="container-signin">

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
                        <button className="signin-button mx-auto" onClick={registerAccount}>
                            Register
                        </button>

                    </div>



                </Container>

            </div>

        </div>
    )
}
export default RegisterComp;