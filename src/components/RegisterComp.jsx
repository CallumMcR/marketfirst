import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/navigation.css';
import '../css/login.css';
import Container from 'react-bootstrap/Container';
import React, { useState } from 'react';






function RegisterComp() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [firstName,setFirstName]=useState("");
    const [surname,setSurname]=useState("");

    return (
        <div>

            <div className="text-center">
                <Container id="container-signin">

                    <input
                        placeholder='Email address' type="email"
                        onChange={(e) => setEmail(e.target.value)}>
                    </input>
                    <input
                        placeholder='Password' type="password"
                        onChange={(e) => setPassword(e.target.value)}>
                    </input>

                    <input
                        placeholder='Repeat Password' type="password"
                        onChange={(e) => setPasswordConfirmation(e.target.value)}>
                    </input>
                    <div className="d-flex justify-content-center">
                        <input
                            placeholder='First Name' type="text"
                            onChange={(e) => setFirstName(e.target.value)}>
                        </input>
                        <input
                            placeholder='Surname' type="text"
                            onChange={(e) => setSurname(e.target.value)}>
                        </input>
                    </div>



                </Container>

            </div>
            <div className="text-center">
                <div className="signin-button mx-auto">
                    Register
                </div>

            </div>
        </div>
    )
}
export default RegisterComp;