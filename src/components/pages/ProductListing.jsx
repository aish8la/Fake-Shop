import Product from "../listItems/Product";
import { useOutletContext } from "react-router-dom";

function ProductListing() {
    const {products} = useOutletContext();

    return (
        <div>
            {products.map(product => <Product key={product.id} product={product}></Product>)}
        </div>
    )
}

export default ProductListing;