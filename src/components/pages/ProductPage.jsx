import { useOutletContext, useParams } from "react-router-dom";

function ProductPage() {
    const { products, addToCart } = useOutletContext();
    const params = useParams();
    const prodID = parseInt(params.prodID)
    const product = products.find(product => product.id === prodID);


    return (
        <div>
            <img src={product.image} alt="" />
            <p>{product.title}</p>
            <p>{product.price}</p>
            <button onClick={() => addToCart(prodID)}>Add to Cart</button>
        </div>
    )
}

export default ProductPage;