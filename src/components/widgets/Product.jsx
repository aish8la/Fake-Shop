import { Link, useOutletContext } from "react-router-dom";
import styles from "./Product.module.css";
import NumberInput from "./NumberInput";
import { useState } from "react";

function Product({ product }) {
    const { addToCart } = useOutletContext();
    const [number, setNumber] = useState(Number(1));

    return (
        <div className={styles.productCard}>
            <Link to={`/product/${product.id}`}>
                <div className={styles.imageContainer}>
                    <img src={product.image}></img>
                </div>

                <p>{product.title}</p>
            </Link>
            <p className={styles.price}>{product.price}</p>
            <NumberInput number={number} setNumber={setNumber}/>
            <button className={styles.addButton} onClick={() => addToCart(product.id, number)}>Add to Cart</button>
        </div>
    )
}

export default Product;