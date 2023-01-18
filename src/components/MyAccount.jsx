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






function MyAccount() {


    return (
        <div>
            <NavigationBar></NavigationBar>

        </div>
    )
}
export default MyAccount;