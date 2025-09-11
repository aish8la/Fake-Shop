import { ShoppingCart } from "lucide-react";
import styles from "./CartIcon.module.css";
import { useState, useRef, useEffect } from "react";

function CartIcon({ cartCount }) {
    const [animate, setAnimate] = useState(false);
    const prevCount = useRef(0);

    useEffect(() => {
        if(prevCount.current < cartCount) {
            setAnimate(true);
        }

        prevCount.current = cartCount;
    }, [cartCount])


    return (
        <button className={styles.cartBtn}>
            <ShoppingCart className={styles.cartIcon} />
            <span onAnimationEnd={() => setAnimate(false)} className={`${styles.countBadge} ${animate ? styles.bump : ""}`}>{cartCount}</span>
        </button>
    )
}

export default CartIcon;