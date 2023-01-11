import React from "react";
import '../css/navigation.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function searchbar() {
    return (
        <div className="searchBar m-auto">


            <InputGroup className="rounded-pill bg-white">
                <InputGroup.Text id="search-icon">
                    <div className="bi bi-search">
                    </div>
                </InputGroup.Text>
                <Form.Control
                    aria-label="searchInput"
                    aria-describedby="searchInput"
                    placeholder="Search for products..."
                />
            </InputGroup>


        </div >
    )
}

export default searchbar;