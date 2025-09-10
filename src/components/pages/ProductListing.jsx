import Product from "../listItems/Product";
import { useOutletContext } from "react-router-dom";
import styles from "./ProductListing.module.css";

function ProductListing() {
    const {products} = useOutletContext();

    return (
        <div className={styles.listingContainer}>
            {products.map(product => <Product key={product.id} product={product}></Product>)}
        </div>
    )
}

export default ProductListing;