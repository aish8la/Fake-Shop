function ErrorPage({ error }) {

    return (
        <div>
            <h1>Oops</h1>
            <p>An Error has occured</p>
            <p>{error.statusText || error.message}</p>
        </div>
    )
}

export default ErrorPage;