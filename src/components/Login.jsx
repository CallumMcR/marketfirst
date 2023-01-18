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

    const [styleActiveSignin, setStyleActiveSignin] = useState("text-center active");
    const [styleActiveSignup, setStyleActiveSignup] = useState("text-center");

    const handleToggle = (type) => {
        if (type === "signin") {
            setLoginActive(true);
            setStyleActiveSignin("text-center active");
            setStyleActiveSignup("text-center");
        }
        else {
            setLoginActive(false);
            setStyleActiveSignin("text-center");
            setStyleActiveSignup("text-center active");
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
                                <div className={styleActiveSignin} onClick={() => handleToggle("signin")}>
                                    Sign in
                                </div>
                            </div>
                            <div className="col-4">
                                <div className={styleActiveSignup} onClick={() => handleToggle("register")}>
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