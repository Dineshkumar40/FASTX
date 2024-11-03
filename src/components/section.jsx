import React, { useRef, useState } from 'react';
import busImage from '../assets/ebus.jpg';
import Datepicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {useNavigate} from 'react-router-dom';

const Section = () => {
    const inputFocusOne = useRef(null);
    const inputFocusTwo = useRef(null);
    const dateHook = useRef(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [forMonth,setForMonth] = useState('');
    const month = forMonth.toLocaleString('default', { month: 'short' }); // Abbreviated month name
console.log(month); // Example: "Dec"

    const navigate = useNavigate();


    const handleSearch = () => {
        const fromLocation = inputFocusOne.current.value;
        const toLocation = inputFocusTwo.current.value;
        const travelDate = selectedDate;
        navigate(`/Buses/${fromLocation}/${toLocation}/${travelDate}/${month}`);
        // console.log({ fromLocation, toLocation, travelDate });
    };

    return (
        <section className='overflow-x-hidden'>
            <img className='w-full relative' src={busImage} alt='busImage.png' />
            <div className='absolute top-36 left-80 text-white text-4xl max-w-full mx-auto'>
                <h1>India's No. 1 Online Bus Ticket Booking Site</h1>
            </div>
            <div className='absolute top-64 w-full'>
                <div className='w-10/12 mx-auto flex shadow-lg rounded-3xl hover:shadow-xl'>
                    {/* From Input */}
                    <div onClick={() => { inputFocusOne.current.focus(); }} className='w-1/4 flex hover:bg-slate-50 items-center py-6 px-2 bg-white border-r rounded-s-3xl space-x-4 hover:cursor-pointer'>
                        {/* Icon */}
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                            </svg>
                        </div>
                        {/* Input */}
                        <div className='flex-col space-y-1'>
                            <div className='text-gray-500'>From</div>
                            <div>
                                <input className='border-none focus:outline-none bg-transparent' type="text" ref={inputFocusOne} />
                            </div>
                        </div>
                    </div>
                    {/* To Input */}
                    <div onClick={() => { inputFocusTwo.current.focus(); }} className='w-1/4 flex hover:bg-slate-50 items-center py-6 px-2 bg-white border-r space-x-4 hover:cursor-pointer'>
                        {/* Icon */}
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                            </svg>
                        </div>
                        {/* Input */}
                        <div className='flex-col space-y-1'>
                            <div className='text-gray-500'>To</div>
                            <div>
                                <input className='border-none focus:outline-none bg-transparent' type="text" ref={inputFocusTwo} />
                            </div>
                        </div>
                    </div>
                    {/* Date Picker */}
                    <div onClick={() => dateHook.current.input.focus()} className='w-1/4 p-8 bg-white hover:cursor-pointer hover:bg-slate-50 flex items-center space-x-4 py-6 px-2'>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z" />
                            </svg>
                        </div>
                        <div className='flex-col space-y-1'>
                            <div className='text-gray-500'>Date</div>
                            <div>
                                <Datepicker 
                                    className='border-none focus:outline-none bg-transparent'
                                    selected={selectedDate} 
                                    onChange={(date) => {
                                        setForMonth(date);
                                        const isoDate = date.toISOString(); // Convert to ISO format
                                        setSelectedDate(isoDate);
                                        // console.log(isoDate); // Output: "2024-12-12T00:00:00.000Z"
                                    }} 
                                    minDate={new Date()} 
                                    ref={dateHook} 
                                />
                            </div>
                        </div>
                    </div>
                    {/* Search Button */}
                    <div 
                        onClick={handleSearch} 
                        className='w-1/4 bg-rose-500 border-l flex justify-center items-center rounded-e-3xl p-8 font-sans text-[30px] text-white hover:cursor-pointer'
                    >
                        Search Buses
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Section;
