import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

function Layout() {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    
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

    return (
        <>
            <Header />
            <main>
                {loading ? "Now Loading" : //TODO: add better handling load
                    <Outlet context={[products]}/>
                }
            </main>
        </>
    );
};

export default Layout;