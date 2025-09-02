import { useOutletContext } from "react-router-dom";

function Product({ product }) {
    const { addToCart } = useOutletContext();

    return (
        <div>
            <img src={product.image}></img>
            <p>{product.title}</p>
            <p>{product.price}</p>
            <button onClick={() => addToCart(product.id)}>Add to Cart</button>
        </div>
    )
}

export default Product;