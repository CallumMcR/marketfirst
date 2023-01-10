import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/navigation.css';
import Search from "./SearchBar";
import { NavLink } from 'react-router-dom';
import Basket from "./Basket";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function NavigationBar() {
    return (
        <div>
            <div className="navBar">
                <Container fluid className='h-100'>

                    <div className="row h-100">
                        <div className="col-1">

                        </div>
                        <div className="col-10">

                            <div className="row h-100">

                                <div className="col-2 font-os m-auto text-center font-white">
                                    Brand logo
                                </div>
                                <div className="col-2 m-auto">

                                    <div className="d-flex justify-content-evenly align-items-center">
                                        <div className="navButton font-os-lighter font-white">

                                            <NavLink className=' fs-5 font-white text-center'
                                                style={{
                                                    fontSize: '25px',
                                                    textDecoration: "none",
                                                    verticalAlign: 'middle'
                                                }} to="Index">

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
                                                }} to="Products">

                                                <div className="text-center font-white p-2">
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
                                    <div className="d-flex justify-content-around align-items-center">
                                        <div className="navButton font-os-lighter font-white">

                                            <NavLink className=' fs-5 font-white text-center'
                                                style={{
                                                    fontSize: '25px',
                                                    textDecoration: "none",
                                                    verticalAlign: 'middle'
                                                }} to="login">
                                                <div className="text-center bi bi-person-circle font-icons font-white p-2">
                                                </div>

                                            </NavLink>
                                        </div>

                                        <div className="navButton font-os-lighter font-white nav-Button">

                                            <div className='fs-5 font-white text-center'
                                                style={{
                                                    fontSize: '25px',
                                                    textDecoration: "none",
                                                    verticalAlign: 'middle'
                                                }} >
                                                <div className="text-center bi bi-basket font-icons position-relative p-2">
                                                    <div className="basket-notification rounded-circle">
                                                        0
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                        <div className="navButton font-os-lighter font-white">

                                            <NavLink className=' fs-5 font-white text-center'
                                                style={{
                                                    fontSize: '25px',
                                                    textDecoration: "none",
                                                    verticalAlign: 'middle'
                                                }} to="account">
                                                <div className="text-center bi bi-truck font-icons font-white p-2">
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

                </Container>

            </div >
            <Basket></Basket>
        </div>


    )
}

export default NavigationBar;