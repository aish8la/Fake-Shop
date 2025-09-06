import { ShoppingCart } from "lucide-react";
import styles from "./CartIcon.module.css";

function CartIcon({ cartCount }) {

    return (
        <button className={styles.cartBtn}>
            <ShoppingCart />
            <span className={styles.countBadge}>{cartCount}</span>
        </button>
    )
}

export default CartIcon;