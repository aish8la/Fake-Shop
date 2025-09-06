import About from "./components/pages/About";
import Layout from "./components/layout/Layout";
import MainPage from "./components/pages/MainPage";
import ProductListing from "./components/pages/ProductListing";
import CartPage from "./components/pages/CartPage";
import ProductPage from "./components/pages/ProductPage";
import RouteErrorPage from "./components/pages/RouteErrorPage";

const routes = [
    {
        path: "/",
        element: <Layout />,
        errorElement: <RouteErrorPage />,
        children: [
            {
                index: true,
                element: <MainPage />,
            },
            {
                path: "about",
                element: <About />,
            },
            {
                path: "shop",
                element: <ProductListing />,
            },
            {
                path: "cart",
                element: <CartPage />
            },
            {
                path: "product/:prodID",
                element: <ProductPage />
            },
        ],
    },
];

export default routes;