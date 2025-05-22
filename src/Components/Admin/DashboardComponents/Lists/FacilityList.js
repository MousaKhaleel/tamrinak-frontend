import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchFacilities, removeFacility } from '../../../../Services/facilityService';

function FacilityList() {
    const [facilities, setFacilities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        loadFacilities();
    }, []);

    const loadFacilities = async () => {
        try {
            setLoading(true);
            const data = await fetchFacilities();
            setFacilities(data);
            setError(null);
        } catch (err) {
            setError(err.message);
            console.error("Failed to load facilities:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (facilityId) => {
        if (window.confirm("Are you sure you want to delete this facility?")) {
            try {
                await removeFacility(facilityId);
                await loadFacilities();
            } catch (err) {
                setError(err.message);
                console.error("Failed to delete facility:", err);
            }
        }
    };

    if (loading) return <div>Loading facilities...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="facility-list">
            <h2>Facilities Management</h2>
            {facilities.length === 0 ? (
                <p>No facilities found.</p>
            ) : (
                <table className="facility-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Location</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {facilities.map((facility) => (
                            <tr key={facility.id}>
                                <td>{facility.name}</td>
                                <td>{facility.description}</td>
                                <td>{facility.location}</td>
                                <td>
                                    <button 
                                        onClick={() => navigate(`/facility/edit/${facility.id}`)}
                                        className="edit-button"
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(facility.id)}
                                        className="delete-button"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default FacilityList;
