import About from "./components/pages/About";
import Layout from "./components/layout/Layout";
import MainPage from "./components/pages/MainPage";

const routes = [
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <MainPage />,
            },
            {
                path: "about",
                element: <About />,
            },
        ]
    },
];

export default routes;