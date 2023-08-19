import React from "react";
import { NavLink } from 'react-router-dom';
// import { AuthContext } from '../../context/auth-context';
import './NavLinks.css';

const NavLinks = function (props) {
    // const auth = useContext(AuthContext);

    return (
        <ul className="nav-links">
            <li>
                <NavLink to="/MyGallery" exact>
                    My Gallery
                </NavLink>
            </li>
            <li>
                <NavLink to="/auth">AUTHENTICATE</NavLink>
            </li>
            <li>
                <button >MY Profile</button>
            </li>
        </ul>
    )
}

export default NavLinks;