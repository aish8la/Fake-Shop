import { NavLink } from "react-router-dom";

function Header() {
    return (
        <header>
            <NavLink to={"/"}>Home</NavLink>
            <NavLink to={"about"}>About</NavLink>
            <NavLink to={"shop"}>Shop</NavLink>
        </header>
    )
}

export default Header;