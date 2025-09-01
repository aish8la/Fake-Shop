import Product from "./Product";
import { useEffect, useState } from "react";

function ProductListing() {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
        .then(response => {
            if(!response.ok) {
                throw new Error(`Server Error ${response.status}`);
            }
            return response.json();
        })
        .then( data => { 
            setProducts(data);
        })
        .catch(error => {
            console.error("Fetch Failed:", error);
        })
        .finally(() => {
            setLoading(false);
        });
    }, []);

    return (
        <div>
            {!loading ? 
                products.map(product => <Product key={product.id} product={product}></Product>)
                : "Loading Page" //TODO: add better handling load
            }
        </div>
    )
}

export default ProductListing;