import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import CartIcon from "../icons/CartIcon";

function Header({ cartCount }) {

    return (
        <header className={styles.mainHeader}>
            <h1>Fake Shop</h1>
            <nav className={styles.navigation}>
                <span className={styles.navItems}>
                    <NavLink to={"/"}>Home</NavLink>
                    <NavLink to={"about"}>About</NavLink>
                    <NavLink to={"shop"}>Shop</NavLink>
                </span>
                <NavLink to={"cart"}><CartIcon cartCount={cartCount}/></NavLink>
            </nav>
        </header>
    )
}

export default Header;