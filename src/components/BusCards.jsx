import React, { useEffect, useState } from 'react';
import BusComplementory from './BusComplementory';
import { useNavigate } from 'react-router-dom';
import axiosInstance from './AxiosInstance';

function BusCards({ BusName, Departure, Duration, Arrival, Fare, SeatsAvailable, BusType, FromLocation, ToLocation, busId, complementory,Month }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [seats, setSeats] = useState([]); // corrected initialization of seats array
    const [selectedSeats, setSelectedSeats] = useState([]);
    // const [message, setMessage] = useState('');
    const getSeatsString = () => selectedSeats.join(',');
    const seatsString = getSeatsString();
    const noOfSeats = selectedSeats.length;
    console.log(noOfSeats);
    const sections = complementory ? complementory.split(',') : [];

    const navigate = useNavigate();
console.log(isExpanded)
    const toggleExpand = () => {
        setIsExpanded(prevState => !prevState); 

    };

    useEffect(() => {
        if (isExpanded) {
            console.log(isExpanded)

            console.log('hi',isExpanded);
            const fetchSeats = async () => {
                try {
                    const response = await axiosInstance.post('/user/adminGetSeats',{ busId });
                    setSeats(response.data);
                } catch (error) {
                    console.error('Error fetching seat data:', error);
                }
            };
            fetchSeats();
        }
    }, [isExpanded, busId]);

    const handleSeatSelect = (seatNumber) => {
        setSelectedSeats((prevSelectedSeats) =>
            prevSelectedSeats.includes(seatNumber)
                ? prevSelectedSeats.filter(seat => seat !== seatNumber)
                : [...prevSelectedSeats, seatNumber]
        );
    };
    const handleReserveSeats = () => {
        navigate(`/ReservationForm/${busId}/${seatsString}/${FromLocation}/${ToLocation}/${Duration}/${noOfSeats}/${Month}`);
      };

   

    return (
        <div className="border hover:border-red-200 transition-shadow duration-300 hover:shadow-xl rounded-2xl p-4 mb-4 group relative">
            <div className="flex justify-between items-center mb-2">
                <div className="font-semibold text-lg">{BusName}</div>
                <div className="flex items-center space-x-16 p-2">
                    <p className="font-semibold text-2xl">{Departure}</p>
                    <p className="opacity-50">{Duration}</p>
                    <p className="text-lg">{Arrival}</p>
                    <div className="flex items-center space-x-0 bg-red-500 rounded-full text-white text-sm font-semibold"
                        style={{ padding: '3px 4px', width: '40px', height: '24px' }}>
                        <span>☆2.2</span>
                    </div>
                    <div className="flex items-center space-x-16">
                        <p><span className="opacity-75">Starts from <br />INR </span><span className="font-bold">{Fare}</span></p>
                        <p><span className="font-semibold">{SeatsAvailable}</span> <span className="opacity-50">Seats<br /> available</span></p>
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
                <div className="absolute opacity-0 group-hover:opacity-100 group-hover:translate-x-4 transform transition-all ease-out duration-300 right-36 delay-100">
                    <div className="flex items-center px-2 py-2">
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
                <div className="mt-4 p-4 border-t bg-[#EEEDED] border-gray-300 transition-all duration-300 flex">
                    <div className="w-2/3">
                        <h2 className="text-xl font-bold mb-4">Select Seats</h2>

                        <div className='flex justify-center relative '>
                            <div className="flex justify-center p-11  bg-slate-50 rounded-b-lg border-t-4 border-[#0000004a] w-max gap-8">
                                <div className='absolute  top-3 right-48 flex justify-end  items-center '>
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
                                            onClick={() => seat.isAvailable==="true" && !seat.IsBlocked ==="false" && handleSeatSelect(seat.seatNumber)}
                                            className={`w-8 h-8 flex items-center justify-center text-white font-semibold cursor-pointer rounded-md
                                       ${seat.isAvailable ==="false" || seat.IsBlocked==="true" ? 'bg-red-500 cursor-not-allowed' : selectedSeats.includes(seat.seatNumber) ? 'border-2 border-gray-400' : 'bg-green-500'}`}
                                            title={!seat.isAvailable ? "Reserved" : seat.isBlocked ? "Reserved" : "Available"}
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
                                    {seats.slice(Math.ceil(seats.length / 2)).map((seat, index) => (
                                          <div
                                          key={seat.seatNumber} // unique seat identifier
                                          onClick={() => seat.isAvailable && !seat.isBlocked && handleSeatSelect(seat.seatNumber)}
                                          className={`w-8 h-8 flex items-center justify-center text-white font-semibold cursor-pointer rounded-md
                                     ${!seat.isAvailable || seat.isBlocked ? 'bg-red-500 cursor-not-allowed' : selectedSeats.includes(seat.seatNumber) ? 'border-2 border-gray-400' : 'bg-green-500'}`}
                                          title={!seat.isAvailable ? "Reserved" : seat.isBlocked ? "Reserved" : "Available"}
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
                        <div className="mt-7 ml-32 flex gap-4 items-center">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-6 border bg-green-500 rounded-md"></div>
                                <span>Available</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-6 border bg-red-500 rounded-md"></div>
                                <span>Reserved</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-6 border-2 border-gray-400 rounded-md"></div>
                                <span>Selected</span>
                            </div>
                        </div>
                    </div>

                    {/* Booking Info Sidebar*/}
                    {selectedSeats.length > 0 && (
                        <div className="w-max p-4 border-l bg-slate-50 relative rounded-xl border-gray-300">
                            <h2 className="text-lg font-bold mb-4 ">Boarding & Droping</h2>
                            <div className='flex'>
                                <div className='absolute top-[70px]'>
                                    {/* Vertical Line with Dots */}
                                    <div class="flex flex-col items-center mr-4">
                                        {/* Top Black Dot */}
                                        <div class="w-2 h-2 bg-black rounded-lg mb-1"></div>

                                        {/* Dotted Line */}
                                        <div class="h-14  border-l-2 border-dotted border-gray-600"></div>

                                        {/* Bottom Black Dot with Opacity */}
                                        <div class="w-2 h-2 bg-black rounded-xl mt-1 opacity-30"></div>
                                    </div>
                                </div>
                                <div className='ml-4 w-52'>
                                    <div className="mb-2 flex justify-between ">
                                        <div className="opacity-75">CHENNAI
                                            <p className='text-red-600 font-bold'>(18)-(oct)-(2024)</p>
                                        </div>
                                        <div className='font-bold'> 19:50</div>
                                    </div>
                                    <div className="mb-2 mt-6 flex justify-between">
                                        <p className="opacity-75">MUMBAII</p>
                                        <p className='font-bold'> 19:50</p>
                                    </div>
                                </div>
                            </div>

                            <div className='mb-5 mt-1  border-t'>
                                <div className='flex justify-between px-2 py-3'>
                                    <div className='font-semibold '>Seat NO. </div>
                                    <div>{selectedSeats.join(', ') || 'None selected'} </div>
                                </div>
                                <hr></hr>
                                <div className='mt-3'>
                                    <p className='font-semibold'>Fare Details</p>
                                    <div className='mt-2'>
                                        <div className='flex justify-between'>
                                            <p className='opacity-45'>Amount</p>
                                            <div className='font-bold'>INR {selectedSeats.length * Fare}</div>
                                        </div>
                                        <p className='text-sm opacity-30'>Taxes will be calculated during payment</p>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleReserveSeats}
                                className={`bg-red-600 text-white px-4 py-2 rounded-lg mt-1 w-full ${selectedSeats.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={selectedSeats.length === 0}
                               
                            >
                                Reserve Seats
                            </button>

                            {/* {message && <p className="mt-4 text-center text-green-600 font-medium">{message}</p>} */}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default BusCards;
