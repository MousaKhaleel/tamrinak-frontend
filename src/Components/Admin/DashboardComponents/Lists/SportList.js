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

    if (loading) return <div>Loading sports...</div>;
    if (error) return <div className="text-red-500">Error: {error}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Sports Management</h1>
            
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {sports.map((sport) => (
                            <tr key={sport.id}>
                                <td className="px-6 py-4 whitespace-nowrap">{sport.name}</td>
                                <td className="px-6 py-4">{sport.description}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <Link
                                        to={`/sport/edit/${sport.id}`}
                                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(sport.id)}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {sports.length === 0 && !loading && (
                <div className="text-center py-8 text-gray-500">No sports found</div>
            )}
        </div>
    );
}

export default SportList;