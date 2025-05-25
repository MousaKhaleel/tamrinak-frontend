import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchSports, deleteSport } from '../../../../Services/sportService';

function SportList() {
    const [sports, setSports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        loadSports();
    }, []);

    const loadSports = async () => {
        try {
            setLoading(true);
            const data = await fetchSports();
            setSports(data);
            setError(null);
        } catch (err) {
            setError(err.message);
            console.error("Failed to load sports:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this sport?")) {
            try {
                await deleteSport(id);
                setSports(sports.filter(sport => sport.id !== id));
            } catch (err) {
                setError(err.message);
                console.error("Failed to delete sport:", err);
            }
        }
    };

    if (loading) 
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    if (error) 
        return <div className="alert alert-danger text-center" role="alert">Error: {error}</div>;

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="h3">Sports Management</h1>
                <Link to="/sport/create" className="btn btn-primary">
                    + Add New Sport
                </Link>
            </div>

            <div className="table-responsive shadow rounded">
                <table className="table table-striped table-hover align-middle mb-0 bg-white">
                    <thead className="table-dark">
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th style={{ width: "150px" }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sports.length === 0 && (
                            <tr>
                                <td colSpan="3" className="text-center text-muted py-4">
                                    No sports found
                                </td>
                            </tr>
                        )}
                        {sports.map((sport) => (
                            <tr key={sport.id}>
                                <td>{sport.name}</td>
                                <td>{sport.description}</td>
                                <td>
                                    <Link
                                        to={`/sport/edit/${sport.id}`}
                                        className="btn btn-sm btn-outline-primary me-2"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(sport.id)}
                                        className="btn btn-sm btn-outline-danger"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SportList;
