import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import ErrorPage from "../pages/ErrorPage";

function Layout() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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
            setError(error);
        })
        .finally(() => {
            if(!controller.signal.aborted) setLoading(false);
        });

        return () => {
            controller.abort();
        }
    }, []);

    if(error) return <ErrorPage error={error}/>;

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

    function changeCart(prodID, quantity) {
        setCart(prev => {
            let newCart = prev.map(item => {
                if(item.id === prodID) {
                    return {...item, qty: quantity}
                } else {
                    return item;
                }
            })
            
            if(quantity === 0) {
                newCart = newCart.filter(item => item.id !== prodID);
            }
            return newCart;
        });
    }

    return (
        <>
            <Header cartCount={cart.length}/>
            <main>
                {loading ? "Now Loading" : //TODO: add better handling load
                    <Outlet context={{products, cart, addToCart, changeCart}}/>
                }
            </main>
        </>
    );
};

export default Layout;