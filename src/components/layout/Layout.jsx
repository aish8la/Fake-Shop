import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

function Layout() {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        fetch("https://fakestoreapi.com/products", {signal: signal})
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
            if(error.name === "AbortError") return
            console.error("Fetch Failed:", error);
        })
        .finally(() => {
            setLoading(false);
        });

        return () => {
            controller.abort();
        }
    }, []);

    function addToCart(prodID) {
        const product = products.find(prod => prod.id === prodID);
        setCart(prev => {
            const exists = prev.some(item => item.id === prodID);

            if(exists) {
                return prev.map(item => item.id === prodID ? {...item, qty: item.qty + 1} : item);
            } else {
                return [...prev, {...product, qty: 1}];
            }
        });
    }

    return (
        <>
            <Header />
            <main>
                {loading ? "Now Loading" : //TODO: add better handling load
                    <Outlet context={{products, cart, addToCart}}/>
                }
            </main>
        </>
    );
};

export default Layout;