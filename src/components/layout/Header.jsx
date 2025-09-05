import { NavLink } from "react-router-dom";

function Header({ cartCount }) {

    return (
        <header>
            <span>
                <NavLink to={"/"}>Home</NavLink>
                <NavLink to={"about"}>About</NavLink>
                <NavLink to={"shop"}>Shop</NavLink>
            </span>
            <NavLink to={"cart"}>Cart<span>{cartCount}</span></NavLink>
        </header>
    )
}

export default Header;