import { useState, useEffect } from 'react';
import { 
  getVenueRequests, 
  approveVenueRequest, 
  rejectVenueRequest 
} from '../../../../Services/adminService';

function PendingRequestsList() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await getVenueRequests();
        setRequests(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleApprove = async (userId) => {
    try {
      setStatusMessage('Processing...');
      await approveVenueRequest(userId);
      // Update the local state to remove the approved request
      setRequests(requests.filter(request => request.userId !== userId));
      setStatusMessage('Request approved successfully!');
      setTimeout(() => setStatusMessage(''), 3000);
    } catch (err) {
      setStatusMessage('Failed to approve request');
      console.error('Approval error:', err);
    }
  };

  const handleReject = async (userId) => {
    try {
      setStatusMessage('Processing...');
      await rejectVenueRequest(userId);
      // Update the local state to remove the rejected request
      setRequests(requests.filter(request => request.userId !== userId));
      setStatusMessage('Request rejected successfully!');
      setTimeout(() => setStatusMessage(''), 3000);
    } catch (err) {
      setStatusMessage('Failed to reject request');
      console.error('Rejection error:', err);
    }
  };

  if (loading) {
    return <div>Loading pending requests...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (requests.length === 0) {
    return <div>No pending requests at this time.</div>;
  }

  return (
    <div className="p-4">
      {statusMessage && (
        <div className={`mb-4 p-2 rounded ${
          statusMessage.includes('success') ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
        }`}>
          {statusMessage}
        </div>
      )}
      
      <h2 className="text-xl font-bold mb-4">Pending Venue Manager Requests</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">User ID</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Request Date</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.userId} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b text-center">{request.userId}</td>
                <td className="py-2 px-4 border-b text-center">
                  {request.firstName} {request.lastName}
                </td>
                <td className="py-2 px-4 border-b text-center">{request.email}</td>
                <td className="py-2 px-4 border-b text-center">
                  {new Date(request.VenueRequestDate).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  <button
                    onClick={() => handleApprove(request.userId)}
                    className="btn btn-success bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded mr-2"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(request.userId)}
                    className="btn btn-danger bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                  >
                    Reject
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

export default PendingRequestsList;