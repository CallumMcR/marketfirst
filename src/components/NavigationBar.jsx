import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Button } from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/navigation.css';



function NavigationBar() {
    return (
        <div className="navBar">
            <div className="row">
                <div className="col-1 border">
                    t
                </div>
                <div className="col-10 border">

                    <div className="row">

                        <div className="col-2 border font-os">
                            Brand logo
                        </div>
                        <div className="col-2 border">
                            <div className="d-flex justify-content-around">
                                <div className="border m-3 p-2">
                                    Home
                                </div>
                                <div className="border m-3 p-2">
                                    Browse
                                </div>
                            </div>

                        </div>
                        <div className="col-5 border">
                            Search bar
                        </div>
                        <div className="col-3 border">
                            Icons
                        </div>

                    </div>
                </div>
                <div className="col-1 border">
                    t
                </div>
            </div>
        </div>
    )
}

export default NavigationBar;