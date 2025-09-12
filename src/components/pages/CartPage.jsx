import CartItem from "../widgets/CartItem";
import { useOutletContext } from "react-router-dom";
import styles from "./CartPage.module.css";

function CartPage() {
    const {cart} = useOutletContext();

    return (
        <div className={styles.cartPage}>
            <ul className={styles.cartItemContainer}>
                {cart.map(item => <CartItem key={item.id} item={item}></CartItem>)}
            </ul>
            
        </div>
    )
}

export default CartPage;