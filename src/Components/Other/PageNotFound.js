import 'bootstrap/dist/css/bootstrap.min.css';

function PageNotFound() {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="text-center">
                <h1 className="display-4 text-danger">404</h1>
                <p className="lead">Oops! The page you are looking for does not exist.</p>
                <a href="/" className="btn btn-primary mt-3">Go Home</a>
            </div>
        </div>
    );
}

export default PageNotFound;
