import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/navigation.css';
import '../css/login.css';
import Search from "./SearchBar";
import { NavLink } from 'react-router-dom';
import Basket from "./Basket";
import Container from 'react-bootstrap/Container';
import { useEffect } from 'react';
import NavigationBar from "./NavigationBar";
import React, { useState } from 'react';






function LoginComp() {

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
                    <input
                        placeholder='Password...'
                        type="password"
                        onChange={e => setPassword(e.target.value)}>
                    </input>
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
export default LoginComp;