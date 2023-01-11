import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import Container from 'react-bootstrap/Container';
import '../css/productCard.css';
import '../css/productsPage.css';

function Products() {
    const options = ['Relevancy', 'Lowest price', 'Highest Price', 'Most popular'];

    const [open, setOpen] = useState(false);
    const [DropDownBoxStyle, SetDropDownBoxStyle] = useState("dropdown-container");
    const [selectedOption, setSelectedOption] = useState("Relevancy");

    const toggleDropdown = () => {
        setOpen(!open);
        if (DropDownBoxStyle === "dropdown-container") {
            SetDropDownBoxStyle("dropdown-container-toggled");
        }
        else {
            SetDropDownBoxStyle("dropdown-container");
        }
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        toggleDropdown();
    };


    return (
        <div className="div">

            <NavigationBar></NavigationBar>
            <Container fluid>
                <div className="row">
                    <div className="col-2">

                    </div>
                    <div className="col-8">

                        <div className="row pt-4">
                            <div className="col-8">
                                <div class="productHeader">
                                    You searched for: { }
                                </div>
                            </div>
                            <div className="col-4">
                                <div class="d-flex justify-content-end">
                                    <div className={DropDownBoxStyle}>
                                        <div className="dropdown-selected-option" onClick={toggleDropdown}>
                                            Sort by: {selectedOption} <i class="bi bi-caret-down-fill"></i>
                                        </div>
                                        {open && (
                                            <ul className="dropdown-options-list">
                                                {options.map(option => (
                                                    <li className="dropdown-option" key={option} value={option}
                                                        style={
                                                            option == "Most popular"
                                                                ? { borderBottom: "1px solid red" }
                                                                : {}
                                                        }
                                                        onClick={() => handleOptionClick(option)} >
                                                        Sort by: {option}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>

                                </div>
                            </div>
                        </div>
             
                        <hr></hr>



                    </div>
                    <div className="col-2">

                    </div>
                </div>
            </Container>


        </div>
    )
}

export default Products;