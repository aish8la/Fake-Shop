import { useOutletContext, useParams } from "react-router-dom";
import styles from "./ProductPage.module.css";
import { useState } from "react";
import NumberInput from "../widgets/NumberInput";

function ProductPage() {
    const { products, addToCart } = useOutletContext();
    const [quantity, setQuantity] = useState(1);
    const params = useParams();
    const prodID = parseInt(params.prodID)
    const product = products.find(product => product.id === prodID);

    return (
        <div className={styles.productPage}>
            <div className={styles.imageContainer}>
                <img src={product.image} alt="" />
            </div>
            <div className={styles.descriptionContainer}>
                <p className={styles.title}>{product.title}</p>
                <p className={styles.price}>{product.price}</p>
                <NumberInput number={quantity} setNumber={setQuantity} />
                <button onClick={() => addToCart(prodID, quantity)}>Add to Cart</button>
            </div>
        </div>
    )
}

export default ProductPage;