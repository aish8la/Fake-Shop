import { Link, useOutletContext } from "react-router-dom";
import styles from "./Product.module.css";
import NumberInput from "./NumberInput";
import { useState } from "react";

function Product({ product }) {
    const { addToCart } = useOutletContext();
    const [number, setNumber] = useState(Number(1));

    return (
        <li className={`${styles.productCard} reset-list`}>
            <Link to={`/product/${product.id}`}>
                <div className={styles.imageContainer}>
                    <img src={product.image}></img>
                </div>

                <p>{product.title}</p>
            </Link>
            <p className={styles.price}>{product.price}</p>
            <NumberInput number={number} setNumber={setNumber}/>
            <button className={styles.addButton} onClick={() => addToCart(product.id, number)}>Add to Cart</button>
        </li>
    )
}

export default Product;