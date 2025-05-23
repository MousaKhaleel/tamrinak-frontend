import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchFacilities, removeFacility } from '../../../../Services/FacilityService';

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

  if (loading)
    return (
      <div className="d-flex justify-content-center my-5">
        <div className="spinner-border text-primary" role="status" aria-label="Loading facilities...">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  return (
    <div className="container my-4">
      <h2 className="mb-4">Facilities Management</h2>

      {error && (
        <div className="alert alert-danger" role="alert">
          Error: {error}
        </div>
      )}

      {facilities.length === 0 ? (
        <div className="alert alert-info">No facilities found.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-primary">
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Location</th>
                <th style={{ width: '160px' }}>Actions</th>
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
                      className="btn btn-sm btn-outline-primary me-2"
                      onClick={() => navigate(`/facility/edit/${facility.id}`)}
                      aria-label={`Edit ${facility.name}`}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(facility.id)}
                      aria-label={`Delete ${facility.name}`}
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

export default FacilityList;
