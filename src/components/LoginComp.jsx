import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/navigation.css';
import '../css/login.css';
import Container from 'react-bootstrap/Container';
import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router';
import $ from "jquery";




function LoginComp() {
    const cookies = new Cookies();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [invalidPasswordOrEmail, setInvalidPasswordOrEmail] = useState(false);

    const navigate = useNavigate();
    const handleLogin = (e) => {
        e.preventDefault();
        const form = $(e.target);
        $.ajax({
            type: "POST",
            url: form.attr("action"),
            data: form.serialize(),
            success(data) {

                if (data === "incorrect") {
                    setInvalidPasswordOrEmail(true);
                }
                else {
                    cookies.set('userID', data, { path: '/' })
                    navigate("/account/home");

                }
            },
        });
    }

    return (
        <div className=''>
            <form
                action="http://localhost:8000/login.php"
                method="post"
                onSubmit={(event) => handleLogin(event)}>
                <div className="text-center">
                    <Container id="container-signin">

                        <input
                            id="email"
                            name="email"
                            placeholder='Email address' type="email"
                            onChange={e => setEmail(e.target.value)}>
                        </input>
                        <input
                            id="password"
                            name="password"
                            placeholder='Password...'
                            type="password"
                            onChange={e => setPassword(e.target.value)}>
                        </input>
                        {invalidPasswordOrEmail ? <div className='text-center pb-3 text-invalid'> Invalid Email Address/Password </div> : <div></div>}
                        <div className="text-center">
                            <button type="submit" className="signin-button mx-auto">
                                Sign in
                            </button>

                        </div>

                    </Container>

                </div>
            </form>
        </div>
    )
}
export default LoginComp;