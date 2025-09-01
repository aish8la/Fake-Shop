import Product from "./Product";
import img from "../../public/sample-image.png"

const testProducts = [
    {id: 1, title: "Shoes", price: 10.00, imageUrl: img},
    {id: 2, title: "Glasses", price: 100.00, imageUrl: img},
]

function ProductListing() {
    const products = testProducts;

    return (
        <div>
            {products.map(product => <Product product={product}></Product>)}
        </div>
    )
}

export default ProductListing;