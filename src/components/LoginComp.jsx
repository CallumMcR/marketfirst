import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/navigation.css';
import '../css/login.css';
import Container from 'react-bootstrap/Container';
import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';






function LoginComp() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [invalidPasswordOrEmail, setInvalidPasswordOrEmail] = useState(false);


    const [dataResponse, setDataResponse] = useState(false);


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
                const cookies = new Cookies();
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
                </Container>

            </div>
            <div className="text-center">
                <div className="signin-button mx-auto" onClick={verify}>
                    Sign in
                </div>

            </div>
        </div>
    )
}
export default LoginComp;