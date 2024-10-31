// EditRouteModal.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EditRouteModal({ isOpen, toggleModal, routeData }) {
    const [routeId, setRouteId] = useState('');
    const [fromLocation, setFromLocation] = useState('');
    const [toLocation, setToLocation] = useState('');
    const [duration, setDuration] = useState('');
    const [routeName, setRouteName] = useState('');


    useEffect(() => {
        if (routeData) {
            setRouteId(routeData.RouteId);
            setFromLocation(routeData.FromLocation);
            setToLocation(routeData.ToLocation);
            setDuration(routeData.Duration);
            setRouteName(routeData.Routename);
        }
    }, [routeData]);

    const handleEditRoute = async (e) => {
        e.preventDefault();
        const updatedRoute = { routeId, fromLocation, toLocation, duration,routeName };

        try {
            await axios.put(`http://localhost:5000/api/routes/${routeId}`, updatedRoute);
            toggleModal(); // Close modal
        } catch (error) {
            console.error('Error updating route:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-md w-11/12 md:w-2/3 lg:w-1/2 p-6">
                <h2 className="text-xl font-semibold mb-4">Edit Route</h2>
                <form onSubmit={handleEditRoute}>
                    <input
                        type="text"
                        placeholder="Route ID"
                        value={routeId}
                        readOnly
                        className="border border-gray-300 rounded-lg p-2 w-full mb-2"
                    />
                    <input
                        type="text"
                        placeholder="Route Name"
                        value={routeName}
                        onChange={(e) => setRouteName(e.target.value)}
                        className="border border-gray-300 rounded-lg p-2 w-full mb-2"
                        required
                    />
                    <input
                        type="text"
                        placeholder="From Location"
                        value={fromLocation}
                        onChange={(e) => setFromLocation(e.target.value)}
                        className="border border-gray-300 rounded-lg p-2 w-full mb-2"
                        required
                    />
                    
                    <input
                        type="text"
                        placeholder="To Location"
                        value={toLocation}
                        onChange={(e) => setToLocation(e.target.value)}
                        className="border border-gray-300 rounded-lg p-2 w-full mb-2"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Duration"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="border border-gray-300 rounded-lg p-2 w-full mb-4"
                        required
                    />
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={toggleModal}
                            className="mr-2 text-gray-600 bg-gray-200 hover:bg-gray-300 rounded-lg px-4 py-2"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="text-white bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditRouteModal;
