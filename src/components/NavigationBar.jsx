import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/navigation.css';
import Search from "./SearchBar";
import { NavLink } from 'react-router-dom';
import Basket from "./Basket";

function NavigationBar() {
    return (
        <div>
            <div className="navBar">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-1">

                        </div>
                        <div className="col-10">

                            <div className="row">

                                <div className="col-2 font-os m-auto text-center font-white">
                                    Brand logo
                                </div>
                                <div className="col-2 m-auto">

                                    <div className="d-flex justify-content-evenly align-items-center">
                                        <div className="navButton m-3 p-2 font-os-lighter font-white">

                                            <NavLink className=' fs-5 font-white text-center'
                                                style={{
                                                    fontSize: '25px',
                                                    textDecoration: "none",
                                                    verticalAlign: 'middle'
                                                }} to="Index">

                                                <div className="text-center font-white">
                                                    Home
                                                </div>
                                            </NavLink>
                                        </div>

                                        <div className="navButton m-3 p-2 font-os-lighter font-white">

                                            <NavLink className=' fs-5 font-white text-center'
                                                style={{
                                                    fontSize: '25px',
                                                    textDecoration: "none",
                                                    verticalAlign: 'middle'
                                                }} to="Products">

                                                <div className="text-center font-white">
                                                    Browse
                                                </div>
                                            </NavLink>
                                        </div>


                                    </div>

                                </div>

                                <div className="col-5 m-auto">
                                    <Search></Search>
                                </div>


                                <div className="col-3 m-auto">
                                    <div className="d-flex justify-content-evenly align-items-center">
                                        <div className="navButton m-3 p-2 font-os-lighter font-white">

                                            <NavLink className=' fs-5 font-white text-center'
                                                style={{
                                                    fontSize: '25px',
                                                    textDecoration: "none",
                                                    verticalAlign: 'middle'
                                                }} to="login">
                                                <div className="text-center bi bi-person-circle font-icons font-white">
                                                </div>
                                                <div className="text-center font-white">
                                                    Sign in
                                                </div>
                                            </NavLink>
                                        </div>

                                        <div className="navButton m-3 p-2 font-os-lighter font-white nav-Button">

                                            <div className=' fs-5 font-white text-center'
                                                style={{
                                                    fontSize: '25px',
                                                    textDecoration: "none",
                                                    verticalAlign: 'middle'
                                                }} >
                                                <div className="text-center bi bi-basket font-icons position-relative">
                                                    <div className="basket-notification rounded-circle">
                                                        0
                                                    </div>
                                                </div>
                                                <div className="text-center font-white">
                                                    Basket
                                                </div>
                                            </div>
                                        </div>

                                        <div className="navButton m-3 p-2 font-os-lighter font-white">

                                            <NavLink className=' fs-5 font-white text-center'
                                                style={{
                                                    fontSize: '25px',
                                                    textDecoration: "none",
                                                    verticalAlign: 'middle'
                                                }} to="account">
                                                <div className="text-center bi bi-truck font-icons font-white">
                                                </div>
                                                <div className="text-center font-os-100 font-white">
                                                    Orders and Returns
                                                </div>
                                            </NavLink>
                                        </div>

                                    </div>


                                </div>

                            </div>
                        </div>
                        <div className="col-1">

                        </div>
                    </div>
                </div>

            </div >
            <Basket></Basket>
        </div>


    )
}

export default NavigationBar;