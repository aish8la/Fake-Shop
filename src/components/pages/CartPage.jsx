import CartItem from "../widgets/CartItem";
import { useOutletContext } from "react-router-dom";
import styles from "./CartPage.module.css";
import { currencyFormatter } from "../../util";

function CartPage() {
    const {cart} = useOutletContext();
    const cartTotal = cart.cartItems.reduce((total, current) => {
        const itemPrice = parseInt(current.qty) * parseFloat(current.price);
        return total + itemPrice;
    }, 0)

    return (
        <div className={styles.cartPage}>
            <ul className={styles.cartItemContainer}>
                {cart.cartItems.map(item => <CartItem key={item.id} item={item}></CartItem>)}
            </ul>
            <div className={styles.totalContainer}>
                <dl>
                    <dt>Total</dt>
                    <dd>{currencyFormatter.format(cartTotal)}</dd>
                </dl>
            </div>
        </div>
    )
}

export default CartPage;