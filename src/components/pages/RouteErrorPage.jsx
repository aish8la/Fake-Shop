import { useRouteError } from "react-router-dom";
import ErrorPage from "./ErrorPage";

function RouteErrorPage() {
    const error = useRouteError();

    return (
        <ErrorPage error={error} />
    )
}

export default RouteErrorPage;