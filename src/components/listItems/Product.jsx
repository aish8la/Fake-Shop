import { NavLink, useOutletContext } from "react-router-dom";

function Product({ product }) {
    const { addToCart } = useOutletContext();

    return (
        <div>
            <NavLink to={`/product/${product.id}`}>
                <img src={product.image}></img>
                <p>{product.title}</p>
            </NavLink>
            <p>{product.price}</p>
            <button onClick={() => addToCart(product.id)}>Add to Cart</button>
        </div>
    )
}

export default Product;