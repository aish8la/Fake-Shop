import Product from "../widgets/Product";
import { useOutletContext } from "react-router-dom";
import styles from "./ProductListing.module.css";

function ProductListing() {
    const {products} = useOutletContext();

    return (
        <ul className={styles.listingContainer}>
            {products.map(product => <Product key={product.id} product={product}></Product>)}
        </ul>
    )
}

export default ProductListing;