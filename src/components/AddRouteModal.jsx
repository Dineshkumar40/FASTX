// AddRouteModal.jsx
import React, { useState } from 'react';
import axiosInstance from './AxiosInstance';

function AddRouteModal({ isOpen, toggleModal, }) {
    const [routeId, setRouteId] = useState('');
    const [startLocation, setFromLocation] = useState('');
    const [endLocation, setToLocation] = useState('');
    const [duration, setDuration] = useState('');
    const [routeName, setRouteName] = useState('');


    const handleAddRoute = async (e) => {
        const newRoute = {routeId,startLocation,endLocation, duration,routeName };
        // const newRoute ={routeId , routeName};
        console.log("hi",newRoute);

        e.preventDefault();

        try {
            console.log("hi1",newRoute);

            await axiosInstance.post('/user/addRoutes', newRoute);
                        console.log("hi",newRoute);

            // onRouteAdded(newRoute); 
            resetForm();
            toggleModal(); // Close modal
        } catch (error) {
            console.error('Error adding route:', error);
        }
    };

    const resetForm = () => {
        setRouteId('');
        setFromLocation('');
        setToLocation('');
        setDuration('');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-md w-11/12 md:w-2/3 lg:w-1/2 p-6">
                <h2 className="text-xl font-semibold mb-4">Add Route</h2>
            
                    <input
                        type="text"
                        placeholder="Route ID"
                        value={routeId}
                        onChange={(e) => setRouteId(e.target.value)}
                        className="border border-gray-300 rounded-lg p-2 w-full mb-2"
                        required
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
                        value={startLocation}
                        onChange={(e) => setFromLocation(e.target.value)}
                        className="border border-gray-300 rounded-lg p-2 w-full mb-2"
                        required
                    />
                    <input
                        type="text"
                        placeholder="To Location"
                        value={endLocation}
                        onChange={(e) => setToLocation(e.target.value)}
                        className="border border-gray-300 rounded-lg p-2 w-full mb-2"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Duration(00h00m)"
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
                            className="text-white bg-red-600 hover:bg-red-700 rounded-lg px-4 py-2"
                            
                            onClick={handleAddRoute}
                        >
                            Add Route

                        </button>
                    </div>
                
            </div>
        </div>
    );
}

export default AddRouteModal;
