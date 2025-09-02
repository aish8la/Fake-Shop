import About from "./components/pages/About";
import Layout from "./components/layout/Layout";
import MainPage from "./components/pages/MainPage";
import ProductListing from "./components/pages/ProductListing";
import ErrorPage from "./components/pages/ErrorPage";

const routes = [
    {
        path: "/",
        element: <Layout />,
        errorElement: <ErrorPage />,
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
        ]
    },
];

export default routes;