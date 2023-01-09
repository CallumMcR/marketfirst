import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/navigation.css';
import Search from "./SearchBar";
import { NavLink } from 'react-router-dom';
import { Button } from 'bootstrap';

function NavigationBar() {
    return (
        <div className="navBar">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-1 border">

                    </div>
                    <div className="col-10 border">

                        <div className="row">

                            <div className="col-2 border font-os">
                                Brand logo
                            </div>
                            <div className="col-2 border">
                                <div className="d-flex justify-content-around">
                                    <div className="navButton m-3 p-2 font-os-lighter font-white">
                                        Home
                                    </div>
                                    <div className="navButton m-3 p-2 font-os-lighter font-white">
                                        Browse
                                    </div>
                                </div>

                            </div>
                            <div className="col-5 border">
                                <Search></Search>
                            </div>
                            <div className="col-3 border">
                                <div className="d-flex justify-content-evenly align-items-center">
                                    <div className="navButton m-3 p-2 font-os-lighter font-white">

                                        <NavLink className=' fs-5 font-white text-center'
                                            style={{
                                                fontSize: '25px',
                                                textDecoration: "none",
                                                verticalAlign: 'middle'
                                            }} to="login">
                                            <div className="text-center bi bi-person-circle">
                                            </div>
                                            <div className="text-center">
                                                Sign in
                                            </div>
                                        </NavLink>
                                    </div>

                                    <div className="navButton m-3 p-2 font-os-lighter font-white">

                                        <div className=' fs-5 font-white text-center'
                                            style={{
                                                fontSize: '25px',
                                                textDecoration: "none",
                                                verticalAlign: 'middle'
                                            }} >
                                            <div className="text-center bi bi-basket">
                                            </div>
                                            <div className="text-center">
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
                                            <div className="text-center bi bi-truck">
                                            </div>
                                            <div className="text-center font-os-100">
                                                Orders and Returns
                                            </div>
                                        </NavLink>
                                    </div>

                                </div>


                            </div>

                        </div>
                    </div>
                    <div className="col-1 border">

                    </div>
                </div>
            </div>

        </div >
    )
}

export default NavigationBar;