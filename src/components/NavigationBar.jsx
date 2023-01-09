import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Button } from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/navigation.css';



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
                                Search bar
                            </div>
                            <div className="col-3 border">
                                Icons
                            </div>

                        </div>
                    </div>
                    <div className="col-1 border">
                        
                    </div>
                </div>
            </div>

        </div>
    )
}

export default NavigationBar;