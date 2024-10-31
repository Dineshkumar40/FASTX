import React, { useState } from 'react';
import axios from 'axios';

const AddBusModal = ({ isOpen, onClose }) => {
    const [busId, setBusId] = useState('');
    const [busName, setBusName] = useState('');
    const [fromLocation, setFromLocation] = useState('');
    const [toLocation, setToLocation] = useState('');
    const [duration, setDuration] = useState('');
    const [departureTime, setDepartureTime] = useState('');
    const [arrivalTime, setArrivalTime] = useState('');
    const [totalSeats, setTotalSeats] = useState('');
    const[fare,setFare]=useState('');
    const [complementary,setComplemenatry] = useState('');
    const[routeId,setRouteID]=useState('');
    const[busType,setBusType]=useState('');
    const[travelDays,setTravelDays]=useState('');
    const[busNumber,setBusNUmber] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();

        const busData = {
            busId,
            busName,
            fromLocation,
            toLocation,
            duration,
            departureTime,
            arrivalTime,
            totalSeats,
            fare,
            complementary,
            routeId,
            busType,
            travelDays,
            busNumber
        };

        try {
            await axios.post('http://localhost:5000/api/bus', busData);
            resetForm();
        } catch (error) {
            console.error('Error adding bus:', error);
        }
    };

    const resetForm = () => {
        setBusId('');
        setBusName('');
        setFromLocation('');
        setToLocation('');
        setDuration('');
        setDepartureTime('');
        setArrivalTime('');
        setTotalSeats('');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-md w-11/12 md:w-2/3 lg:w-1/2 p-6">
                <h2 className="text-xl font-semibold mb-4">Add Bus</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="Bus ID"
                            value={busId}
                            onChange={(e) => setBusId(e.target.value)}
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
                            placeholder="BusNumber"
                            value={busNumber}
                            onChange={(e) => setBusNUmber(e.target.value)}
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
                            type="text"
                            placeholder="Enter Fare"
                            value={fare}
                            onChange={(e) => setFare(e.target.value)}
                            className="border border-gray-300 rounded-lg p-2"
                            required
                        />
                         <input
                            type="complementries"
                            placeholder="Complement (eg:charger,WaterBottle....."
                            value={complementary}
                            onChange={(e) => setComplemenatry(e.target.value)}
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
                            type="number"
                            placeholder="Total Seats"
                            value={totalSeats}
                            onChange={(e) => setTotalSeats(e.target.value)}
                            className="border border-gray-300 rounded-lg p-2"
                            required
                        />
                          <input
                            type="text"
                            placeholder="TravelDays"
                            value={travelDays}
                            onChange={(e) => setTravelDays(e.target.value)}
                            className="border border-gray-300 rounded-lg p-2"
                            required
                        />
                          <input
                            type="routeId"
                            placeholder="RouteId"
                            value={routeId}
                            onChange={(e) => setRouteID(e.target.value)}
                            className="border border-gray-300 rounded-lg p-2"
                            required
                        />
                       
                    </div>
                    <div className="flex justify-end mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="mr-2 text-gray-600 bg-gray-200 hover:bg-gray-300 rounded-lg px-4 py-2"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="text-white bg-red-600 hover:bg-red-700 rounded-lg px-4 py-2"
                        >
                            Add Bus
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddBusModal;
