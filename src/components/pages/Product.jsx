function Product({ product }) {
    return (
        <div>
            <img src={product.image}></img>
            <p>{product.title}</p>
            <p>{product.price}</p>
            <button>Add to Cart</button>
        </div>
    )
}

export default Product;