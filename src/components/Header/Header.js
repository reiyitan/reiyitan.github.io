import React from "react"; 
import "./style.css";

const Header = ({title}) => {
    return (
        <div className="header">
            {title}
        </div>
    );
}

export default Header;