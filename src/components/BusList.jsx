import React, { useState, useEffect,useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BusCards from './BusCards';
import Navbar from './navbar'; 
import Footer from './footer'; 

function BusList() {
    const { fromLocation, toLocation, travelDate } = useParams();
    const [isLoading, setIsLoading] = useState(true);

    const [ac, setAc] = useState(false);
    const [nonAc, setNonAc] = useState(false);
    const [seater, setSeater] = useState(false);
    const [sleeper, setSleeper] = useState(false);

    // Departure time slots
    const [before6AM, setBefore6AM] = useState(false);
    const [from6AMTo12PM, setFrom6AMTo12PM] = useState(false);
    const [from12PMTo6PM, setFrom12PMTo6PM] = useState(false);
    const [after6PM, setAfter6PM] = useState(false);

    // Arrival time slots
    const [arrivalBefore6AM, setArrivalBefore6AM] = useState(false);
    const [arrivalFrom6AMTo12PM, setArrivalFrom6AMTo12PM] = useState(false);
    const [arrivalFrom12PMTo6PM, setArrivalFrom12PMTo6PM] = useState(false);
    const [arrivalAfter6PM, setArrivalAfter6PM] = useState(false);
    const [buses, setBuses] = useState([]);

    // Get selected bus types
    const getBusTypes = useCallback(() => {
        const types = [];
        if (ac) types.push('AC');
        if (nonAc) types.push('Non-AC');
        if (sleeper) types.push('Sleeper');
        if (seater) types.push('Seater');
        return types;
    }, [ac, nonAc, sleeper, seater]);

    const getTimeSlots = useCallback(() => {
        const slots = {
            departure: [],
            arrival: [],
        };
    
        // Departure time slots
        if (before6AM) slots.departure.push('Before6AM');
        if (from6AMTo12PM) slots.departure.push('From6AMTo12PM');
        if (from12PMTo6PM) slots.departure.push('From12PMTo6PM');
        if (after6PM) slots.departure.push('After6PM');
    
        // Arrival time slots
        if (arrivalBefore6AM) slots.arrival.push('ArrivalBefore6AM');
        if (arrivalFrom6AMTo12PM) slots.arrival.push('ArrivalFrom6AMTo12PM');
        if (arrivalFrom12PMTo6PM) slots.arrival.push('ArrivalFrom12PMTo6PM');
        if (arrivalAfter6PM) slots.arrival.push('ArrivalAfter6PM');
    
        return {
            departure: slots.departure.length > 0 ? slots.departure.join(',') : null,
            arrival: slots.arrival.length > 0 ? slots.arrival.join(',') : null,
        };
    }, [before6AM, from6AMTo12PM, from12PMTo6PM, after6PM, arrivalBefore6AM, arrivalFrom6AMTo12PM, arrivalFrom12PMTo6PM, arrivalAfter6PM]);
    
    const fetchBuses = useCallback(() => {
        const { departure, arrival } = getTimeSlots();
        setIsLoading(true);
        axios.post('/api/searchbuses', {
            from: fromLocation,
            to: toLocation,
            date: travelDate,
            bustype: getBusTypes(),
            departureTimeSlots: departure,
            arrivalTimeSlots: arrival,
        })
            .then((response) => {
                setBuses(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching buses:', error);
                setIsLoading(false);
            });
    }, [fromLocation, toLocation, travelDate, getTimeSlots,getBusTypes]);

    useEffect(() => {        
            fetchBuses();        
    }, [fetchBuses]);

    return (
        <>
            <Navbar /> 
            <div className='mt-5'> 
                <div className="flex gap-8">
                    {/* Filters Sidebar */}
                    <div className="w-1/6 bg-white p-6">
                        <h2 className="font-semibold text-xl mb-4 pb-2 border-b-4">FILTERS</h2>
                        {/* Bus Types Filter */}
                        <div className="mb-6 pb-8 border-b-2">
                            <h3 className="font-medium text-lg mb-3">BUS TYPES</h3>
                            <div className="space-y-3">
                                <label className="flex items-center space-x-3">
                                    <input type="checkbox" checked={seater} onChange={(e) => setSeater(e.target.checked)} className="text-indigo-600 border-gray-300 focus:ring-indigo-500" />
                                    <span className='font-thin'>Seater</span>
                                </label>
                                <label className="flex items-center space-x-3">
                                    <input type="checkbox" checked={sleeper} onChange={(e) => setSleeper(e.target.checked)} className="text-indigo-600 border-gray-300 focus:ring-indigo-500" />
                                    <span className='font-thin'>Sleeper</span>
                                </label>
                                <label className="flex items-center space-x-3">
                                    <input type="checkbox" checked={ac} onChange={(e) => setAc(e.target.checked)} className="text-indigo-600 border-gray-300 focus:ring-indigo-500" />
                                    <span className='font-thin'>AC</span>
                                </label>
                                <label className="flex items-center space-x-3">
                                    <input type="checkbox" checked={nonAc} onChange={(e) => setNonAc(e.target.checked)} className="text-indigo-600 border-gray-300 focus:ring-indigo-500" />
                                    <span className='font-thin'>Non-AC</span>
                                </label>
                            </div>
                        </div>

                        {/* Departure Time Filter */}
                        <div className="mb-6 pb-8 border-b-2">
                            <h3 className="font-medium text-lg mb-2">DEPARTURE TIME</h3>
                            <div className="space-y-3">
                                <label className="flex items-center space-x-3">
                                    <input type="checkbox" checked={before6AM} onChange={(e) => setBefore6AM(e.target.checked)} className="text-indigo-600 border-gray-300 focus:ring-indigo-500" />
                                    <span className='font-thin'>Before 6 am</span>
                                </label>
                                <label className="flex items-center space-x-3">
                                    <input type="checkbox" checked={from6AMTo12PM} onChange={(e) => setFrom6AMTo12PM(e.target.checked)} className="text-indigo-600 border-gray-300 focus:ring-indigo-500" />
                                    <span className='font-thin'>6 am to 12 pm</span>
                                </label>
                                <label className="flex items-center space-x-3">
                                    <input type="checkbox" checked={from12PMTo6PM} onChange={(e) => setFrom12PMTo6PM(e.target.checked)} className="text-indigo-600 border-gray-300 focus:ring-indigo-500" />
                                    <span className='font-thin'>12 pm to 6 pm</span>
                                </label>
                                <label className="flex items-center space-x-3">
                                    <input type="checkbox" checked={after6PM} onChange={(e) => setAfter6PM(e.target.checked)} className="text-indigo-600 border-gray-300 focus:ring-indigo-500" />
                                    <span className='font-thin'>After 6 pm</span>
                                </label>
                            </div>
                        </div>

                        {/* Arrival Time Filter */}
                        <div className="mb-8 pb-7 border-b-2">
                            <h3 className="font-medium text-lg mb-5">ARRIVAL TIME</h3>
                            <div className="space-y-3">
                                <label className="flex items-center space-x-3">
                                    <input type="checkbox" checked={arrivalBefore6AM} onChange={(e) => setArrivalBefore6AM(e.target.checked)} className="text-indigo-600 border-gray-300 focus:ring-indigo-500" />
                                    <span className='font-thin'>Before 6 am</span>
                                </label>
                                <label className="flex items-center space-x-3">
                                    <input type="checkbox" checked={arrivalFrom6AMTo12PM} onChange={(e) => setArrivalFrom6AMTo12PM(e.target.checked)} className="text-indigo-600 border-gray-300 focus:ring-indigo-500" />
                                    <span className='font-thin'>6 am to 12 pm</span>
                                </label>
                                <label className="flex items-center space-x-3">
                                    <input type="checkbox" checked={arrivalFrom12PMTo6PM} onChange={(e) => setArrivalFrom12PMTo6PM(e.target.checked)} className="text-indigo-600 border-gray-300 focus:ring-indigo-500" />
                                    <span className='font-thin'>12 pm to 6 pm</span>
                                </label>
                                <label className="flex items-center space-x-3">
                                    <input type="checkbox" checked={arrivalAfter6PM} onChange={(e) => setArrivalAfter6PM(e.target.checked)} className="text-indigo-600 border-gray-300 focus:ring-indigo-500" />
                                    <span className='font-thin'>After 6 pm</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Bus Listing */}
                    <div className="w-5/6">
                        {isLoading ? (
                            <div className="flex items-center justify-center h-screen">
                                <svg className="animate-spin h-10 w-10 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                                </svg>
                            </div>
                        ) : (
                            <BusCards buses={buses} />
                        )}
                    </div>
                </div>
            </div>
             <Footer/>
        </>
    );
}

export default BusList;
/* <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
<svg
    xmlns="http://www.w3.org/2000/svg"
    width="64" // Adjust the size as needed
    height="64"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="animate-bus w-24 h-24"
>
    <path d="M8 6v6" />
    <path d="M15 6v6" />
    <path d="M2 12h19.6" />
    <path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3" />
    <circle cx="7" cy="18" r="2" />
    <path d="M9 18h5" />
    <circle cx="16" cy="18" r="2" />
</svg>
<h1 className="text-xl font-semibold text-gray-700 mt-4">Loading Bus...</h1>

<style jsx>{`
    @keyframes moveBus {
        0% { transform: translateX(-30px); }
        50% { transform: translateX(30px); }
        100% { transform: translateX(-30px); }
    }

    .animate-bus {
        animation: moveBus 5s ease-in-out infinite;
    }
`}</style>
</div> */
