import { Link, useOutletContext } from "react-router-dom";
import styles from "./Product.module.css";

function Product({ product }) {
    const { addToCart } = useOutletContext();

    return (
        <div className={styles.productCard}>
            <Link to={`/product/${product.id}`}>
                <div className={styles.imageContainer}>
                    <img src={product.image}></img>
                </div>

                <p>{product.title}</p>
            </Link>
            <p>{product.price}</p>
            <button className={styles.addButton} onClick={() => addToCart(product.id)}>Add to Cart</button>
        </div>
    )
}

export default Product;