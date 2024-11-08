import React from 'react';
import  { useState, useEffect } from 'react';
import axiosInstance from './AxiosInstance';

function UserViewBooking() {
  const [bookingDetails, setBookingDetails] = useState([]);

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        console.log('hi')
        const response = await axiosInstance.post('/user/bookingDetails', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('JWTToken')}`, 
          },
        });
console.log('hi2')
        setBookingDetails(response.data);
      } 
      
      catch (error) {
        console.error('Error fetching booking details:', error);
      }
    };

    fetchBookingData();
  }, []);




  return (
    <div className="max-w-md mx-auto bg-gray-50 rounded-lg shadow-md p-6 relative overflow-hidden mt-8">
      {/* Rounded Corners */}
      <div className="absolute inset-0 rounded-lg border border-gray-200" />
      
      {/* Ticket Confirmation Heading */}
      <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">Ticket Confirmation</h2>

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="h-10 w-10">
          {/* Logo */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-teal-600">
              <path d="M8 6v6" />
              <path d="M15 6v6" />
              <path d="M2 12h19.6" />
              <path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3" />
              <circle cx="7" cy="18" r="2" />
              <path d="M9 18h5" />
              <circle cx="16" cy="18" r="2" />
            </svg>
          </div>
          <div>
            <div className="text-lg font-semibold text-gray-800">Dk's Travel</div>
          </div>
        </div>
      </div>

      {/* Travel Information */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-center">
          <div className="text-sm font-semibold text-gray-800">CHENNAI CMBT</div>
          <div className="text-xs text-gray-500">Oct 10, 5:50am</div>
        </div>
        
        {/* Line */}
        <div className="flex-1 border-t border-dashed border-gray-400 mx-2"></div>

        {/* Icon */}
        <div className="text-center text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bus-front">
            <path d="M4 6 2 7"/>
            <path d="M10 6h4"/>
            <path d="m22 7-2-1"/>
            <rect width="16" height="16" x="4" y="3" rx="2"/> 
            <path d="M4 11h16"/>
            <path d="M8 15h.01"/>
            <path d="M16 15h.01"/>
            <path d="M6 19v2"/>
            <path d="M18 21v-2"/>
          </svg>
        </div>

        {/* Line */}
        <div className="flex-1 border-t border-dashed border-gray-400 mx-2"></div>

        <div className="text-center">
          <div className="text-sm font-semibold text-gray-800">BANGALORE BS</div>
          <div className="text-xs text-gray-500">Oct 10, 11:15am</div>
        </div>
      </div>
      
      {/* Line */}
      <div className="border-t border-dashed border-gray-300 mb-6"></div>
      
      {/* Ticket Information */}
      <div className="grid grid-cols-3 gap-y-3 text-sm text-gray-800">
        <div>
          <div className="text-gray-500">Passengers</div>
          <div className="font-medium">2 Passengers</div>
        </div>
        <div>
          <div className="text-gray-500">Seat Numbers</div>
          <div className="font-medium ">S11, S12,</div>
        </div>
        <div>
          <div className="text-gray-500 ml-4">Ticket Fare</div>
          <div className="font-mediumml ml-5">£89</div>
        </div>
      </div>

      {/* Passenger Information */}
      <div className="text-lg font-semibold text-gray-800 mb-2 mt-3">Passenger Details:</div>
      <div className="flex items-center text-sm text-gray-800 mb-6 space-x-8">
        <div className="flex flex-col ml-4">
          <div className="text-gray-500">Name</div>
          <div className="font-medium">Harsha</div>
        </div>
        <div className="flex flex-col ml-4">
          <div className="text-gray-500">Seat Numbers</div>
          <div className="font-medium">S11, S12, W10,  ,</div>
        </div>
        <div className="flex flex-col">
          <div className="text-gray-500">Age</div>
          <div className="font-medium ml-1">32</div>
        </div>
        <div className="flex flex-col">
          <div className="text-gray-500">Gender</div>
          <div className="font-medium ml-1">Male</div>
        </div>
      </div>
     
      {/* Cancel Button */}
      {/* <div className="flex justify-center mt-4 cursor-pointer">
        <button className="px-4 py-2 text-sm font-medium text-red-600 border border-red-600 rounded-md ">Cancel Booking</button>
      </div> */}

      {/* Tickect status */}
      <div className="text-center mt-6">
        <span className="text-xs text-gray-500 font-medium">Ticket Status: </span>
        <span className="text-green-600 font-semibold">CONFIRMED</span>
      </div>
    </div>
  );
}
export default UserViewBooking;