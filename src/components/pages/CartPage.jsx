import CartItem from "../listItems/CartItem";
import { useOutletContext } from "react-router-dom";

function CartPage() {
    const {cart} = useOutletContext();

    return (
        <div>
            {cart.map(item => <CartItem key={item.id} item={item}></CartItem>)}
        </div>
    )
}

export default CartPage;