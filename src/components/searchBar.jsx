import React from "react";
import '../css/navigation.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import '../css/searchbar.css';
import { useState } from "react";
import { useNavigate } from "react-router";


function SearchBar() {
    const [searchCritera, setSearchCriteria] = useState("");
    const navigate = useNavigate();

    const search = () => {
        navigate(`/products/${searchCritera}`);
    }

    const handleInputChange = (e) => {
        setSearchCriteria(e);
    }
    return (
        <form className="searchBar m-auto d-flex position-relative">
            


         
                <input className="" style={{ width: "80%", paddingLeft: "5px" }}
                    placeholder="Search for products..."
                    onChange={(e) => handleInputChange()}>
                </input>


                <i className="bi bi-search vertical-center">
                </i>

        </form >
    )
}

export default SearchBar;