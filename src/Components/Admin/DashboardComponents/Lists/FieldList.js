import React, { useState, useEffect } from 'react';
import { fetchFields, removeField } from '../../../../Services/fieldService';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function FieldList() {
    const [fields, setFields] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadFields();
    }, []);

    const loadFields = async () => {
        try {
            setLoading(true);
            const data = await fetchFields();
            setFields(data);
            setError(null);
        } catch (err) {
            setError(err.message);
            console.error("Error loading fields:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (fieldId) => {
        if (window.confirm("Are you sure you want to delete this field?")) {
            try {
                await removeField(fieldId);
                setFields(fields.filter(field => field.id !== fieldId));
            } catch (err) {
                setError(err.message);
                console.error("Error deleting field:", err);
            }
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Fields List</h2>

            {loading && <div className="alert alert-info">Loading fields...</div>}
            {error && <div className="alert alert-danger">Error: {error}</div>}
            {!loading && fields.length === 0 && (
                <div className="alert alert-warning">No fields found.</div>
            )}

            {!loading && fields.length > 0 && (
                <div className="table-responsive">
                    <table className="table table-striped table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Sport</th>
                                <th>Location</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fields.map(field => (
                                <tr key={field.id}>
                                    <td>{field.id}</td>
                                    <td>{field.name}</td>
                                    <td>{field.sportName}</td>
                                    <td>{field.location}</td>
                                    <td>${field.pricePerHour?.toFixed(2)}</td>
                                    <td>
                                        <Link
                                            to={`/fields/edit/${field.id}`}
                                            className="btn btn-sm btn-primary me-2"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(field.id)}
                                            className="btn btn-sm btn-danger"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default FieldList;
