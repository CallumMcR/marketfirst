import React from "react";
import '../css/navigation.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function searchbar() {
    return (
        <div className="searchBar m-3 p-2">


            <InputGroup className="mb-3 rounded-pill bg-white">
                <InputGroup.Text id="inputGroup-sizing-default">
                    <div className="bi bi-search">
                    </div>
                </InputGroup.Text>
                <Form.Control
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                />
            </InputGroup>


        </div >
    )
}

export default searchbar;