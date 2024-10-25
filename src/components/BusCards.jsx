import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BusComplementory from './BusComplementory'; 

function BusCards({ BusName, Departure, Duration, Arrival, Fare, SeatsAvailable, BusType, FromLocation, ToLocation, busId, complementory }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [seats, setSeats] = useState([]); 
    const [selectedSeats, setSelectedSeats] = useState([]); 
    const [message, setMessage] = useState(''); 
    const sections = complementory ? complementory.split(',') : []; // Split complementory string

    // Toggle function for expanding the seat selection
    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    useEffect(() => {
        if (isExpanded) {
            const fetchSeats = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/api/bus/${busId}/seats`);
                    setSeats(response.data); // array of seat
                } catch (error) {
                    console.error('Error fetching seat data:', error);
                }
            };
            fetchSeats();
        }
    }, [isExpanded, busId]);

    const handleSeatSelect = (seatNumber) => {
        if (selectedSeats.includes(seatNumber)) {
            setSelectedSeats(selectedSeats.filter(seat => seat !== seatNumber)); // Deselect seat
        } else {
            setSelectedSeats([...selectedSeats, seatNumber]); // Select seat
        }
    };

    // Handle seat reservation
    const handleReserveSeats = async () => {
        try {
            const response = await axios.post(`http://localhost:5000/api/bus/${busId}/reserve`, {
                seats: selectedSeats,
            });
            setMessage(response.data); // Display confirmation message
            setSelectedSeats([]); 
        } catch (error) {
            console.error('Error reserving seats:', error);
            setMessage('Error reserving seats, please try again.');
        }
    };

    return (
        <div className="border hover:border-red-200 transition-shadow duration-300 hover:shadow-xl rounded-2xl p-4 mb-4 group relative">
            <div className="flex justify-between items-center mb-2">
                <div className="font-semibold text-lg">{BusName}</div>
                <div className="flex items-center space-x-16 p-2">
                    <p className='font-semibold text-2xl'>{Departure}</p>
                    <p className='opacity-50'>{Duration}</p>
                    <p className='text-lg'>{Arrival}</p>
                    <div className="flex items-center space-x-0 bg-red-500 rounded-full text-white text-sm font-semibold"
                        style={{ padding: '3px 4px', width: '40px', height: '24px' }}>
                        <span>☆2.2</span>
                    </div>
                    <div className="flex items-center space-x-16">
                        <p><span className='opacity-75'>Starts from <br />INR </span><span className='font-bold'>{Fare}</span></p>
                        <p><span className='font-semibold'>{SeatsAvailable}</span> <span className='opacity-50'>Seats<br /> available</span></p>
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <span>{BusType}</span>
                </div>
            </div>
            <div className="flex justify-between items-center mt-2">
                <div className="text-gray-600 font-light">{FromLocation} - {ToLocation}</div>
            </div>

            {/* Expandable Seat Selection Section */}
            <div className="flex justify-end">
                {/* Hidden Hover Content */}
                <div className="absolute opacity-0 group-hover:opacity-100 group-hover:translate-x-4 transform transition-all ease-out duration-300 right-36 delay-100">
                    <div className="flex items-center px-2 py-2">
                        {/* Display complementaries */}
                        {sections.map((complementoryItem, index) => (
                            <BusComplementory key={index} complementories={complementoryItem} />
                        ))}
                        <p className="border-l-2 border-red-400 px-2">Booking policies</p>
                    </div>
                </div>
                <button onClick={toggleExpand} className="bg-red-600 text-white px-4 py-3 rounded-xl">
                    {isExpanded ? 'Hide Seats' : 'View Seats'}
                </button>
            </div>
            {isExpanded && (
                <div className="mt-4 p-4 border-t border-gray-300 transition-all duration-300">
                    <h2 className="text-xl font-bold mb-4">Select Seats</h2>
                    <div className="grid grid-cols-5 gap-4">
                        {seats.map((seat) => (
                            <div
                                key={seat.seatNumber}
                                onClick={() => handleSeatSelect(seat.seatNumber)}
                                className={`w-12 h-12 cursor-pointer rounded-md
                  ${seat.isReserved ? 'bg-red-500' : 'bg-green-500'}
                  ${selectedSeats.includes(seat.seatNumber) ? 'border-4 border-yellow-500' : ''}`}
                                style={{ pointerEvents: seat.isReserved ? 'none' : 'auto' }} 
                            >
                              
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={handleReserveSeats}
                        className="bg-red-600 text-white px-4 py-2 rounded mt-4 cursor-pointer"
                        disabled={selectedSeats.length === 0}
                    >
                        Reserve Selected Seats
                    </button>
                    {message && <p className="mt-4">{message}</p>}
                </div>
            )}
        </div>
    );
}

export default BusCards;
