import { useState, useRef, useEffect } from "react";

function Dropdown({ options, startingToggleStatus, onOptionClick }) {
    const [isToggled, setIsToggled] = useState(startingToggleStatus);
    const [dropdownStyle, setDropdownStyle] = useState(isToggled ? "dropdown-container-toggled" : "dropdown-container");
    const timeoutRef = useRef(null);
    const [selectedOption,setSelectedOption] = useState(options[0]);

    const toggleDropdown = () => {
        clearTimeout(timeoutRef.current);
        setIsToggled(!isToggled);
        setDropdownStyle(isToggled ? "dropdown-container" : "dropdown-container-toggled");
    };

    const handleOptionClick = (option) => {
        onOptionClick(option);
        setSelectedOption(option);
        toggleDropdown();
    };

    useEffect(() => {
        if (isToggled) {
            timeoutRef.current = setTimeout(() => {
                setIsToggled(false);
                setDropdownStyle("dropdown-container");
            }, 5000);
        }
    }, [isToggled]);

    return (
        <div>
            <div className={dropdownStyle} style={{ marginTop: "20px", marginBottom: "20px" }}>
                <div className="dropdown-selected-option" onClick={toggleDropdown}>
                    Size UK: {selectedOption}
                    <i className="bi bi-caret-down-fill"></i>
                </div>
                {isToggled && (
                    <ul className="dropdown-options-list">
                        {options.map(option => (
                            <li className="dropdown-option" key={option} value={option}
                                style={
                                    option === 1
                                        ? { borderBottom: "1px solid #960018" }
                                        : {}
                                }
                                onClick={() => handleOptionClick(option)} >
                                {option}
                            </li>
                        ))}
                    </ul>
                )}

            </div>
        </div>
    );
}

export default Dropdown;
