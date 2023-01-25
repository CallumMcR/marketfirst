import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/navigation.css';
import '../css/login.css';
import Container from 'react-bootstrap/Container';
import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router';





function LoginComp() {
    const cookies = new Cookies();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [invalidPasswordOrEmail, setInvalidPasswordOrEmail] = useState(false);


    const [dataResponse, setDataResponse] = useState(false);
    const navigate = useNavigate();
    const testverify = () =>{
        cookies.set('userID', 1, { path: '/' })
        navigate("/account/home");
    }

    const verify = async () => {
        const option = {
            method: 'post',
            url: `verifyLogin.php`,
            data: {
                email: email,
                password: password
            },
            validateStatus: function (status) {
                return status >= 200 && status < 300; // default
            },
        };

        try {
            const response = await axios(option);
            if (response === true) {
                cookies.set('userID', response.userID, { path: '/' });
            }
        } catch (error) {
            const { response } = error;
            const { request, ...errorObject } = response; // take everything but 'request'
            console.log(errorObject);
        }
    }



    return (
        <div className=''>
            <form>
                <div className="text-center">
                    <Container id="container-signin">
                        <input
                            placeholder='Email address' type="email"
                            onChange={e => setEmail(e.target.value)}>
                        </input>
                        <input
                            placeholder='Password...'
                            type="password"
                            onChange={e => setPassword(e.target.value)}>
                        </input>
                        {invalidPasswordOrEmail ? <div className='text-center pb-3 text-invalid'> Invalid Email Address/Password </div> : <div></div>}
                        <div className="text-center">
                            <button className="signin-button mx-auto" onClick={testverify}>
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