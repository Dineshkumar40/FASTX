import React, { useState } from 'react';
import axiosInstance from './AxiosInstance';

function EditBus({ BusesData, ToggleModal, IsModelOpen }) {
    const [busId, setBusId] = useState(BusesData.BusId || '');
    const [busName, setBusName] = useState(BusesData.BusName || '');
    const [departureTime, setDepartureTime] = useState(BusesData.DepartureTime || '');
    const [arrivalTime, setArrivalTime] = useState(BusesData.ArrivalTime || '');
    const [totalSeats, setTotalSeats] = useState('');
    const [fare, setFare] = useState(BusesData.Fare || '');
    const [complementory, setComplementary] = useState(BusesData.Complementory || '');
    const [routeId, setRouteID] = useState(BusesData.RouteId || '');
    const [busType, setBusType] = useState(BusesData.BusType || '');
    const [travelDays, setTravelDays] = useState('');
    const [busNumber, setBusNumber] = useState(BusesData.BusNumber || '');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const busData = {
            busId,
            busName,
            departureTime,
            arrivalTime,
            totalSeats,
            fare,
            complementory, 
            routeId,
            busType,
            travelDays,
            busNumber
        };

        try {
            await axiosInstance.put('/user/editBuses', busData, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('JWTToken')}`,
                },
              });            
              resetForm();
            ToggleModal(); // Close modal on successful submit
        } catch (error) {
            console.error('Error updating bus:', error);
        }
    };

    const resetForm = () => {
        setBusId('');
        setBusName('');
        setDepartureTime('');
        setArrivalTime('');
        setTotalSeats('');
        setFare('');
        setComplementary('');
        setRouteID('');
        setBusType('');
        setTravelDays('');
        setBusNumber('');
    };

    if (!IsModelOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-md w-11/12 md:w-2/3 lg:w-1/2 p-6">
                <h2 className="text-xl font-semibold mb-4">Edit Bus</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="Bus ID"
                            value={busId}
                            readOnly
                            className="border border-gray-300 rounded-lg p-2"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Bus Name"
                            value={busName}
                            onChange={(e) => setBusName(e.target.value)}
                            className="border border-gray-300 rounded-lg p-2"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Bus Number"
                            value={busNumber}
                            onChange={(e) => setBusNumber(e.target.value)}
                            className="border border-gray-300 rounded-lg p-2"
                            required
                        />
                        
                        <input
                            type="text"
                            placeholder="Departure Time(HH:MM:SS)"
                            value={departureTime}
                            onChange={(e) => setDepartureTime(e.target.value)}
                            className="border border-gray-300 rounded-lg p-2"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Arrival Time(HH:MM:SS)"
                            value={arrivalTime}
                            onChange={(e) => setArrivalTime(e.target.value)}
                            className="border border-gray-300 rounded-lg p-2"
                            required
                        />
                        <input
                            type="number"
                            placeholder="Total Seats"
                            value={totalSeats}
                            onChange={(e) => setTotalSeats(e.target.value)}
                            className="border border-gray-300 rounded-lg p-2"
                            required
                        />
                        <input
                            type="number"
                            placeholder="Fare"
                            value={fare}
                            onChange={(e) => setFare(e.target.value)}
                            className="border border-gray-300 rounded-lg p-2"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Complement (eg:charger,WaterBottle....."
                            value={complementory}
                            onChange={(e) => setComplementary(e.target.value)}
                            className="border border-gray-300 rounded-lg p-2"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Route ID"
                            value={routeId}
                            onChange={(e) => setRouteID(e.target.value)}
                            className="border border-gray-300 rounded-lg p-2"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Bus Type"
                            value={busType}
                            onChange={(e) => setBusType(e.target.value)}
                            className="border border-gray-300 rounded-lg p-2"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Travel Days"
                            value={travelDays}
                            onChange={(e) => setTravelDays(e.target.value)}
                            className="border border-gray-300 rounded-lg p-2"
                            required
                        />
                    </div>
                    <div className="flex justify-end mt-4">
                        <button
                            type="button"
                            onClick={ToggleModal}
                            className="mr-2 text-gray-600 bg-gray-200 hover:bg-gray-300 rounded-lg px-4 py-2"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="text-white bg-red-600 hover:bg-red-700 rounded-lg px-4 py-2"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditBus;
