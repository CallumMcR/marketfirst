import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/navigation.css';
import '../css/login.css';
import Container from 'react-bootstrap/Container';
import React, { useState } from 'react';






function RegisterComp() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    return (
        <div>

            <div className="text-center">
                <Container id="container-signin">
                    <input
                        placeholder='Email address' type="email"
                        onChange={e => setEmail(e.target.value)}>
                    </input>
                    <br></br>
                 
                </Container>

            </div>
            <div className="text-center">
                <div className="signin-button mx-auto">
                    Sign in
                </div>

            </div>
        </div>
    )
}
export default RegisterComp;