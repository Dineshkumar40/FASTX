import React, { useEffect, useState, useRef } from 'react';
import AdminBusCard from './ABC';
import AddBusModal from './AddBusModel'; // Import the modal component
import axiosInstance from './AxiosInstance';
import { useSelector } from 'react-redux';

const AdminBusList = () => {
    const [buses, setBuses] = useState([]);
    const [filteredBuses, setFilteredBuses] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
    const userRole = useSelector((state) => state.auth);
    const jwtToken = userRole?.jwtToken;
    const timeoutRef = useRef(null); // Store the timeout ID for debouncing
  
    const onBusAdded = (newBus) => {
        setBuses((prevBuses) => [...prevBuses, newBus]); // Add new bus to buses
        setFilteredBuses((prevFilteredBuses) => [...prevFilteredBuses, newBus]); // Add new bus to filteredBuses
    };

    useEffect(() => {
        const fetchBuses = async () => {
            try {
                const response = await axiosInstance.get('/user/adminGetBuses', {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    },
                });
                setBuses(response.data);
                setFilteredBuses(response.data);
            } catch (error) {
                console.error('Error fetching buses:',  error.response ? error.response.data : error.message);
            }
        };

        fetchBuses();
    }, [jwtToken]);

    const handleSearch = (e) => {
        setSearchValue(e.target.value);
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current); // Clear previous timeout
        }
        timeoutRef.current = setTimeout(() => {
            filterBuses(e.target.value); // Apply filtering after debounce delay
        }, 500); // Adjust delay as needed
    };

    const filterBuses = (search) => {
        if (search === '') {
            setFilteredBuses(buses); // Show all buses if search is empty
        } else {
            const filtered = buses.filter(bus => 
                bus.busName.toLowerCase().includes(search.toLowerCase()) ||
                bus.busId.toString().toLowerCase().includes(search.toLowerCase())
            );
            setFilteredBuses(filtered);
        }
    };

    const toggleModal = () => setIsModalOpen(!isModalOpen); // Toggle modal open/close

    return (
        <div className="bg-white p-8">
            <div className="w-3/4 mx-auto">
                <div className="bg-white p-6 rounded-lg mb-4 relative">
                    <div className="flex flex-col items-center mb-4">
                        <div className="flex items-center space-x-24">
                            <input
                                type="text"
                                value={searchValue}
                                placeholder="Search for buses..."
                                className="border border-gray-300 rounded-lg px-4 py-2"
                                onChange={handleSearch}
                            />
                            {/* Plus icon to open modal */}
                            <div
                                className="flex items-center bg-red-500 p-2 rounded-2xl transform transition-transform duration-300 hover:scale-105 group relative cursor-pointer"
                                onClick={toggleModal}
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
                                    className="text-white"
                                >
                                    <path d="M5 12h14" />
                                    <path d="M12 5v14" />
                                </svg>
                                <span className="ml-2 text-white text-sm group-hover:scale-x-110 bg-red-500 rounded-2xl px-2 py-1">
                                    Add Buses
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Sort Options */}
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center space-x-16 p-2">
                            <p className="font-semibold text-lg">{filteredBuses.length} Bus(es) found</p>
                            <p className="font-semibold">SORT BY:</p>
                            <p className="opacity-50">Departure</p>
                            <p className="opacity-50">Duration</p>
                            <p className="opacity-50">Arrival</p>
                            <p className="opacity-50">Fare</p>
                            <p className="opacity-50">Seats Available</p>
                        </div>
                    </div>

                    {/* Bus Cards */}
                    {filteredBuses.map((bus, index) => (
                        <AdminBusCard
                            key={index}
                            BusName={bus.busName}
                            BusNumber={bus.busNumber}
                            TotalSeats={bus.totalSeats}
                            DepartureTime={bus.departureTime}
                            Duration={bus.totalTime}
                            ArrivalTime={bus.arrivalTime}
                            Fare={bus.fare}
                            AvailableSeats={bus.availableSeats}
                            BusType={bus.busType}
                            FromLocation={bus.startLocation}
                            ToLocation={bus.endLocation}
                            BusId={bus.busId}
                            Complementory={bus.complementary}
                            TravelDays={bus.travelDays}
                            RouteId={bus.routeId}
                        />
                    ))}

                    {/* AddBusModal */}
                    <AddBusModal isOpen={isModalOpen} onClose={toggleModal} onBusAdded={onBusAdded} />
                </div>
            </div>
        </div>
    );
};

export default AdminBusList;
