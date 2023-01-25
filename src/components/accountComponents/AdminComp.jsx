import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/navigation.css';
import '../../css/login.css';
import Container from 'react-bootstrap/Container';
import React, { useState } from 'react';






function AdminComp() {

    return (
        <div>
            <div className="text-center">
                <Container id="container-signin">
                    <input
                        placeholder='Email address' type="email"
                    >
                    </input>
                    <br></br>
                    <input
                        placeholder='Password...'
                        type="password"
                    >
                    </input>
                </Container>

            </div>
        </div>
    )
}
export default AdminComp;