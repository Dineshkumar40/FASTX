import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminHome = () => {
    const navigate = useNavigate();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 p-6 mt-10 mb-8 max-w-5xl mx-auto">
            {/* {/View Booking/} */}
            <div className="bg-gray-100 cursor-pointer text-red-600 p-6 rounded-2xl shadow-md text-center w-10/12 mx-auto transform transition duration-300 hover:scale-105 hover:bg-gray-200 hover:shadow-lg hover:py-4" >
                <div className="text-2xl font-semibold mb-2 flex items-center justify-center space-x-5 text-center w-full">View Booking</div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="23"
                    height="23"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-calendar-check">
                    <path d="M8 2v4" />
                    <path d="M16 2v4" />
                    <rect width="18" height="18" x="3" y="4" rx="2" />
                    <path d="M3 10h18" />
                    <path d="m9 16 2 2 4-4" />
                </svg>
                {/* {/Click here/} */}
                <div className="flex items-center justify-center space-x-2 text-black opacity-50 hover:opacity-100">
                    <button>Click here</button>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round">
                        <path d="M18 8L22 12L18 16" />
                        <path d="M2 12H22" />
                    </svg>
                </div>
            </div>

            {/* {/View Buses/} */}
            <div className="bg-gray-100 cursor-pointer text-red-600 p-6 rounded-2xl shadow-md text-center w-10/12 mx-auto transform transition duration-300 hover:scale-105 hover:bg-gray-200 hover:shadow-lg hover:py-4"
             onClick={()=>navigate("/AdminBusList")}>
                <div className="text-2xl font-semibold mb-2 flex items-center justify-center space-x-5 text-center w-full">View Buses</div>
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
                    className="lucide lucide-bus-front">
                    <path d="M4 6 2 7" />
                    <path d="M10 6h4" />
                    <path d="m22 7-2-1" />
                    <rect width="16" height="16" x="4" y="3" rx="2" />
                    <path d="M4 11h16" />
                    <path d="M8 15h.01" />
                    <path d="M16 15h.01" />
                    <path d="M6 19v2" />
                    <path d="M18 21v-2" />
                </svg>
                {/* {/Click here/} */}
                <div className="flex items-center justify-center space-x-2 text-black opacity-50 hover:opacity-100">
                    <button>Click here</button>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round">
                        <path d="M18 8L22 12L18 16" />
                        <path d="M2 12H22" />
                    </svg>
                </div>
            </div>

            {/* {/View Routes/} */}
            <div className="md:col-span-2 flex justify-center">
                <div className="bg-gray-100 cursor-pointer p-6 rounded-2xl shadow-md text-center w-5/12 mx-auto transform transition duration-300 hover:scale-105 hover:bg-gray-200 hover:shadow-lg hover:py-4"
                onClick={()=>navigate("/AdminBusRoute")}>
                    <div className="text-2xl font-semibold mb-2 text-red-600 flex items-center justify-center space-x-2 text-center w-full">View Routes</div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="red"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-route">
                        <circle cx="6" cy="19" r="3" />
                        <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" />
                        <circle cx="18" cy="5" r="3" />
                    </svg>
                    {/* {/Click here/} */}
                    <div className="flex items-center justify-center space-x-2 text-black opacity-50 hover:opacity-100">
                        <button>Click here</button>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round">
                            <path d="M18 8L22 12L18 16" />
                            <path d="M2 12H22" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AdminHome;