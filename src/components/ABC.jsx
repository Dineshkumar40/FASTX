import React, { useState, useEffect } from 'react';
import BusComplementory from './BusComplementory';
import EditBus from './EditBus';
import axiosInstance from './AxiosInstance';

function ABC({ BusName, BusNumber,DepartureTime, Duration,ArrivalTime, Fare, AvailableSeats,TotalSeats, BusType, FromLocation, ToLocation, BusId, Complementory,TravelDays,RouteId}) {
    const [isExpanded, setIsExpanded] = useState(false);

    const [seats, setSeats] = useState([]); // corrected initialization of seats array

// to send to edit model
    const BusDetails = { BusName,BusNumber,  DepartureTime,ArrivalTime, Fare, TotalSeats,BusType, BusId, Complementory,TravelDays,RouteId};

    const [selectedSeats, setSelectedSeats] = useState([]);
    const sections = Complementory ? Complementory.split(',') : [];
    const getSeatsString = () => selectedSeats.join(',');
    console.log('sections',sections)


    const [isModelOpen, setIsModelOpen] = useState(false);

    const ToogleEditModel = () => {
        setIsModelOpen(prevState => !prevState);
    }

    useEffect(() => {
        if (isExpanded) {
            const fetchSeats = async () => {
                try {
                    const response = await axiosInstance.post('/user/adminGetSeats',{BusId});
                    setSeats(response.data);
                } catch (error) {
                    console.error('Error fetching seat data:', error);
                }
            };
            fetchSeats();
        }
    }, [isExpanded, BusId]);


    const toggleExpand = () => {
        setIsExpanded(prev => !prev);
    };

    const handleSeatBlock = async () => {
        try {
            await axiosInstance.post("/user/blockOrUnblock", {
                busId: BusId,
                seatNumber: getSeatsString(),
            });
            setSelectedSeats([]);
        } catch (error) {
            console.error('Error reserving seats:', error);
        }
    };
    const handleSeatSelect = (seatNumber) => {
        setSelectedSeats(prev => {
            if (prev.includes(seatNumber)) {
                return prev.filter(seat => seat !== seatNumber);
            } else {
                return [...prev, seatNumber];
            }
        });

    };

    return (
        <div className="border hover:border-red-200 transition-shadow duration-300 hover:shadow-xl rounded-2xl p-4 mb-4 group relative">
            <div className="flex justify-between items-center mb-2">
                <div className="font-semibold text-lg">{BusName}</div>
                <div className="flex items-center space-x-16 p-2">
                    <p className="font-semibold text-2xl">{DepartureTime}</p>
                    <p className="opacity-50">{Duration}</p>
                    <p className="text-lg">{ArrivalTime}</p>
                    <div className="flex items-center space-x-0 bg-red-500 rounded-full text-white text-sm font-semibold" style={{ padding: '3px 4px', width: '40px', height: '24px' }}>
                        <span>☆2.2</span>
                    </div>
                    <div className="flex items-center space-x-16">
                        <p><span className="opacity-75">Starts from <br />INR </span><span className="font-bold">{Fare}</span></p>
                        <p><span className="font-semibold">{AvailableSeats}</span> <span className="opacity-50">Seats<br /> available</span></p>
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

            <div className="flex justify-end">
                <div className="absolute opacity-0 group-hover:opacity-100 group-hover:translate-x-4 transform transition-all ease-out duration-300 right-52 delay-100">
                    <div className="flex items-center px-2 py-2">
                        {sections.map((complementaryItem, index) => (
                            <BusComplementory key={index} complementaries={complementaryItem} />
                        ))}
                        <p className="border-l-2 border-red-400 px-2">Booking policies</p>
                    </div>
                </div>
                <div className="flex justify-end space-x-4">
                    <button onClick={ToogleEditModel} className="bg-blue-600 text-white px-4 py-3 rounded-xl">
                        Edit
                    </button>

                    <EditBus IsModelOpen={isModelOpen} ToggleModal={ToogleEditModel} BusesData={BusDetails} />

                    <button onClick={toggleExpand} className="bg-red-600 text-white px-4 py-3 rounded-xl">
                        {isExpanded ? 'Hide Seats' : 'View Seats'}
                    </button>
                </div>
            </div>

            {isExpanded && (
                <div className="mt-4 p-4 border-t bg-[#EEEDED] border-gray-300 transition-all duration-300 flex">
                    <div className='flex justify-between'>
                        <div className="w-2/3 ml-14 ">
                            <h2 className="text-xl font-bold mb-4">Select Seats</h2>


                            <div className='flex justify-between ml-24 relative '>
                                <div className="flex justify-center p-11  bg-slate-50 rounded-b-lg border-t-4 border-[#0000004a] w-max gap-8">
                                    <div className='absolute  top-3 right-28 flex justify-end  items-center '>
                                        <div className='absolute top-3  -right-1 opacity-15'>_________________________________</div>

                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                                            <path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M19 14C16.5 14.5 14.5 16.5 14 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M5 14C7.5 14.5 9.5 16.5 10 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M19 11C16.8847 10.3593 14.5097 10 12 10C9.49033 10 7.11528 10.3593 5 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M12.009 14H12" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </div>

                                    {/* Left side seats */}
                                    <div className="grid grid-cols-2 gap-4">
                                        {seats.slice(0, Math.ceil(seats.length / 2)).map((seat) => (
                                            <div
                                            key={seat.seatNumber} // unique seat identifier
                                            onClick={() => handleSeatSelect(seat.seatNumber)} // Allow selection only if the seat is blocked
                                            className={`w-8 h-8 flex items-center justify-center text-white font-semibold cursor-pointer rounded-md
                                                    ${seat.isAvailable==="False" ? 'bg-red-500 cursor-not-allowed' :
                                                    seat.isBlocked ==="True"?'bg-yellow-500' : // Optionally use a different color for blocked seats
                                                        selectedSeats.includes(seat.seatNumber) ? 'border-2 border-gray-400' :
                                                            'bg-green-500'}`}
                                            title={seat.isAvailable ==="False" ? "Reserved" : seat.isBlocked ==="True" ? "Blocked" : "Available"} // Update title for blocked seats
                                        >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="lucide lucide-armchair"
                                                >
                                                    <path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3" />
                                                    <path d="M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z" />
                                                    <path d="M5 18v2" />
                                                    <path d="M19 18v2" />
                                                </svg>
                                                {/* {seat.seatNumber} Display the seat number from the database */}
                                            </div>
                                        ))}
                                    </div>


                                    {/* Right side seats */}
                                    <div className="grid grid-cols-2 gap-4">
                                        {seats.slice(Math.ceil(seats.length / 2)).map((seat) => (
                                            <div
                                                key={seat.seatNumber} // unique seat identifier
                                                onClick={() => handleSeatSelect(seat.seatNumber)} // Allow selection only if the seat is blocked
                                                className={`w-8 h-8 flex items-center justify-center text-white font-semibold cursor-pointer rounded-md
                                                        ${seat.isAvailable==="False" ? 'bg-red-500 cursor-not-allowed' :
                                                        seat.isBlocked ==="True"?'bg-yellow-500' : // Optionally use a different color for blocked seats
                                                            selectedSeats.includes(seat.seatNumber) ? 'border-2 border-gray-400' :
                                                                'bg-green-500'}`}
                                                title={seat.isAvailable ==="False" ? "Reserved" : seat.isBlocked ==="True" ? "Blocked" : "Available"} // Update title for blocked seats
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="lucide lucide-armchair" // Added margin to the right for spacing
                                                >
                                                    <path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3" />
                                                    <path d="M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z" />
                                                    <path d="M5 18v2" />
                                                    <path d="M19 18v2" />
                                                </svg>
                                                {/* {seat.seatNumber} Display the seat number from the database */}
                                            </div>
                                        ))}
                                    </div>

                                </div>
                            </div>

                            {/* Legends */}
                            <div className="mt-7 ml-20 flex gap-4 items-center">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-6 border bg-green-500 rounded-md"></div>
                                    <span>Available</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-6 border bg-red-500 rounded-md"></div>
                                    <span>Reserved</span>
                                </div>
                               
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-6 border-2 bg-yellow-400 rounded-md"></div>
                                    <span>Blocked</span>
                                </div>
                               
                            </div>
                        </div>

                        <div className='flex flex-col justify-around items-center mt-20 px-3 h-[200px] rounded-lg w-[300px] py-0 border bg-white'>
                            <div className='mt-2 w-full h-14'>
                                <span className='opacity-50'>Seats to be blocked: </span><span>{selectedSeats.join(', ')}</span>
                            </div>
                            <button
                                onClick={handleSeatBlock}
                                className={`bg-red-600 text-white px-4 py-2  border rounded-xl mt-3 w-full ${selectedSeats.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={selectedSeats.length === 0}
                            >
                                BlockorUnBlock Seats
                            </button>
                        </div>
                    </div>
                </div>)}
        </div>
    );
}

export default ABC;
