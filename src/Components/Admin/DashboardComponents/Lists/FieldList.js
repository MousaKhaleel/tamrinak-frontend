import React, { useState, useEffect } from 'react';
import { fetchFields, removeField } from '../../../../Services/fieldService';

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
                // Remove the deleted field from the local state
                setFields(fields.filter(field => field.id !== fieldId));
            } catch (err) {
                setError(err.message);
                console.error("Error deleting field:", err);
            }
        }
    };

    if (loading) {
        return <div>Loading fields...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    if (fields.length === 0) {
        return <div>No fields found.</div>;
    }

    return (
        <div className="field-list">
            <h2>Fields List</h2>
            <table className="fields-table">
                <thead>
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
                                <button 
                                    onClick={() => handleDelete(field.id)}
                                    className="delete-button"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default FieldList;