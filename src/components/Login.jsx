import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/navigation.css';
import '../css/login.css';
import Search from "./SearchBar";
import { NavLink } from 'react-router-dom';
import Basket from "./Basket";
import Container from 'react-bootstrap/Container';
import { useEffect } from 'react';
import NavigationBar from "./NavigationBar";
import LoginComp from "./LoginComp";
import RegisterComp from "./RegisterComp"
import React, { useState } from 'react';






function Login() {

    const [loginActive, setLoginActive] = useState(true);

    const handleToggle = (type) => {
        if (type === "signin") {
            setLoginActive(true);
        }
        else {
            setLoginActive(false);
        }

    }
    return (
        <div>
            <NavigationBar></NavigationBar>

            <Container fluid>
                <div className="row">
                    <div className="col-xxl-4 col-xl-3">

                    </div>
                    <div className="col-xxl-4 col-xl">

                        <div className="row">
                            <div className="col-2">
                            </div>
                            <div className="col-4">
                                <div className="text-center" onClick={() => handleToggle("signin")}>
                                    Sign in
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="text-center" onClick={() => handleToggle("register")}>
                                    Register
                                </div>
                            </div>
                            <div className="col-2">
                            </div>
                        </div>
                        {loginActive ? <LoginComp></LoginComp> : <RegisterComp></RegisterComp>}


                    </div>
                    <div className="col-xxl-4 col-xl-3">

                    </div>
                </div>

            </Container >

        </div >


    )
}

export default Login;