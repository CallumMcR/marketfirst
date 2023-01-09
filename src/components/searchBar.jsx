import React from "react";
import '../css/navigation.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import "bootstrap-icons/font/bootstrap-icons.css";

function searchBar() {
    return (
        <div className="searchBar">

            <InputGroup className="mb-3">
                <InputGroup.Text id="Search icon">@</InputGroup.Text>
                <Form.Control
                    placeholder="Username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                />
            </InputGroup>


        </div >
    )
}

export default searchBar;