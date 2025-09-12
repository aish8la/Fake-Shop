import { useOutletContext } from "react-router-dom";
import styles from "./CartItem.module.css";
import NumberInput from "./NumberInput"

function CartItem({item}) {
    const {changeCart} = useOutletContext();

    return (
        <li className={`${styles.cartItem} reset-list`}>
            <div className={styles.imageContainer}>
                <img src={item.image}/>
            </div>
            <div className={styles.titleContainer}>
                <p className={styles.title}>{item.title}</p>
                <p>{item.price}</p>
            </div>
            <div className={styles.buttonContainer}>
                <NumberInput number={item.qty} setNumber={(qty) => changeCart(item.id, qty)}/>
                <button className={styles.deleteButton} onClick={() => changeCart(item.id, 0)}>Remove</button>
            </div>
        </li>
    )
}

export default CartItem;