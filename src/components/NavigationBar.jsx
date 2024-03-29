import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/navigation.css';
import Search from "./SearchBar";
import { NavLink } from 'react-router-dom';
import Basket from "./Basket";
import Container from 'react-bootstrap/Container';
import { useEffect } from 'react';

import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';




function NavigationBar(props) {
    const cookies = new Cookies();
    const [basketNotification, setBasketNotification] = useState(0);

    const [showSignInDropdown, setSignInDropdown] = useState(false);

    const [isActive, setActive] = useState(() => {
        // getting stored value
        const saved = sessionStorage.getItem("isActive");
        const initialValue = JSON.parse(saved);
        return initialValue || false;
    });
    sessionStorage.setItem("isActive", JSON.stringify(isActive));

    const toggleClass = () => {
        setActive(!isActive);
        sessionStorage.setItem("isActive", JSON.stringify(isActive));
        window.dispatchEvent(new Event("isActive2"));
    };


    const navigate = useNavigate();


    const handleSignOut = () => {
        cookies.remove("userID");
        navigate('/');

    }

    
    window.addEventListener('isActive', () => {
        setActive(JSON.parse(sessionStorage.getItem('isActive')));
    })

    useEffect(() => {
        const handleStorageChange = () => {
            const basketCount = JSON.parse(sessionStorage.getItem('basketData')) || [];
            setBasketNotification(basketCount.length);
            console.log(basketCount);
            console.log(basketCount.length);
        };

        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);



    return (
        <div style={{ position: "sticky", top: "0px", left: "0px", zIndex: "1000" }}>
            <div className="navBar" >
                <Container fluid className='h-100' >

                    <div className="row h-100">
                        <div className="col-lg-1">

                        </div>
                        <div className="col-lg-10">

                            <div className="row h-100">

                                <div className="col-2 font-os m-auto text-center font-white">
                                    Brand logo
                                </div>
                                <div className="col-2 m-auto">

                                    <div className="d-flex justify-content-end align-items-center">
                                        <div className="navButton font-os-lighter font-white">

                                            <NavLink className=' fs-5 font-white text-center'
                                                style={{
                                                    fontSize: '25px',
                                                    textDecoration: "none",
                                                    verticalAlign: 'middle'
                                                }} to="/">

                                                <div className="text-center font-white p-2">
                                                    Home
                                                </div>
                                            </NavLink>
                                        </div>

                                        <div className="navButton font-os-lighter font-white">

                                            <NavLink className=' fs-5 font-white text-center'
                                                style={{
                                                    fontSize: '25px',
                                                    textDecoration: "none",
                                                    verticalAlign: 'middle'
                                                }} to="/products">

                                                <div className="text-center font-white p-2">
                                                    Browse
                                                </div>
                                            </NavLink>
                                        </div>


                                    </div>

                                </div>

                                <div className="col-lg-5 m-auto" style={{ marginLeft: "auto", marginRight: "auto" }}>
                                    <Search></Search>
                                </div>


                                <div className="col-lg-3 m-auto">
                                    <div className="d-flex justify-content-lg-start justify-content-center align-items-center">
                                        <div className="navButton font-os-lighter font-white nav-Button">
                                            {cookies.get('userID') === undefined ?
                                                <NavLink className=' fs-5 font-white text-center'
                                                    style={{
                                                        fontSize: '25px',
                                                        textDecoration: "none",
                                                        verticalAlign: 'middle'
                                                    }} to="/login">
                                                    <div className="text-center bi bi-person-circle font-icons font-white p-2">
                                                    </div>

                                                </NavLink> :
                                                <div className="position-relative"
                                                    onMouseEnter={() => setSignInDropdown(true)}
                                                    onMouseLeave={() => setSignInDropdown(false)}>


                                                    <NavLink className=' fs-5 font-white text-center'
                                                        style={{
                                                            fontSize: '25px',
                                                            textDecoration: "none",
                                                            verticalAlign: 'middle'
                                                        }} to="/account/home"
                                                    >
                                                        <div className="text-center bi bi-person-circle font-icons font-white p-2">
                                                        </div>

                                                    </NavLink>
                                                    {showSignInDropdown && (
                                                        <div className="dropbox-signout" onClick={handleSignOut}>
                                                            Sign out
                                                        </div>
                                                    )}
                                                </div>}


                                        </div>

                                        <div className="navButton font-os-lighter font-white nav-Button" onClick={toggleClass}>

                                            <div className='fs-5 font-white text-center'
                                                style={{
                                                    fontSize: '25px',
                                                    textDecoration: "none",
                                                    verticalAlign: 'middle'
                                                }} >
                                                <div className="text-center bi bi-basket font-icons position-relative p-2">
                                                    <div className="basket-notification rounded-circle">
                                                        {basketNotification}
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                        <div className="navButton font-os-lighter font-white nav-Button">

                                            <NavLink className=' fs-5 font-white text-center'
                                                style={{
                                                    fontSize: '25px',
                                                    textDecoration: "none",
                                                    verticalAlign: 'middle'
                                                }} to="/account/MyOrders">
                                                <div className="text-center bi bi-truck font-icons font-white p-2">
                                                </div>

                                            </NavLink>
                                        </div>

                                    </div>


                                </div>

                            </div>
                        </div>
                        <div className="col-lg-1">

                        </div>
                    </div>

                </Container>

            </div >
            <div name="basketCart" id="basketCart" style={{ position: "absolute", zIndex: "10000", width: "100%" }}>
                <Basket></Basket>

            </div>

        </div>


    )
}

export default NavigationBar;