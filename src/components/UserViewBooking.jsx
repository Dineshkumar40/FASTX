import React, { useState, useEffect } from 'react';
import axiosInstance from './AxiosInstance';
import Navbar from './navbar';
import Footer from './footer';

function UserViewBooking() {
  const [bookingDetails, setBookingDetails] = useState([]);
  const userid = localStorage.getItem("UserId");

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const response = await axiosInstance.post('/user/userGetBookingDetails', { userid }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('JWTToken')}`,
          },
        });
        setBookingDetails(response.data);
      } catch (error) {
        console.error('Error fetching booking details:', error);
      }
    };

    fetchBookingData();
  }, [userid]);

  return (
    <>
      <Navbar />

      <div className="max-w-md mx-auto  bg-gray-50 rounded-lg shadow-md p-6 mb-16 mt-8">
        <h2 className="text-lg font-semibold  text-red-600 mb-4 text-center">Ticket Confirmation</h2>

        {bookingDetails.map((booking, index) => (
          <div key={index} className="mb-8">
            {/* Travel Information */}
            <div className="flex justify-between items-center mb-6">
              <div className="text-center">
                <div className="text-lg font-semibold text-red-700">{booking.startLocation}</div>
                <div className="text-xs text-gray-500"></div>
              </div>

              <div className="flex-1 border-t border-dashed border-gray-400 mx-2"></div>

              <div className="text-center">
                <div className="text-lg font-semibold text-red-600">{booking.endLocation}</div>
                <div className="text-xs text-gray-500"></div>
              </div>
            </div>


            {/* Ticket Information */}
            <div className="grid grid-cols-3 gap-y-3 text-sm text-gray-800 mb-4">
              <div>
                <div className="text-gray-500">Bus Name</div>
                <div className="font-medium">{booking.busName}</div>
              </div>
              <div>
                <div className="text-gray-500">Seat Numbers</div>
                <div className="font-medium ">{booking.seatNumbers}</div>
              </div>
              <div>
                <div className="text-gray-500">Fare</div>
                <div className="font-medium">₹{booking.fare}</div>
              </div>
            </div>

            {/* Passenger Information */}
            <div className="text-lg font-semibold text-gray-800 mb-2 mt-3">Passenger Details:</div>
            {booking.passengerInformation.map((passenger, i) => (
              <div key={i} className="flex items-center text-sm text-gray-800 mb-2 space-x-8">
                <div className="flex flex-col">
                  <div className="text-gray-500">Name</div>
                  <div className="font-medium">{passenger.name}</div>
                </div>
                <div className="flex flex-col">
                  <div className="text-gray-500">Seat Number</div>
                  <div className="font-medium text-center">{passenger.seatNumber}</div>
                </div>
                <div className="flex flex-col">
                  <div className="text-gray-500">Age</div>
                  <div className="font-medium text-center">{passenger.age}</div>
                </div>
                <div className="flex flex-col">
                  <div className="text-gray-500">Gender</div>
                  <div className="font-medium">{passenger.gender}</div>
                </div>
              </div>
            ))}

            {/* Ticket Status */}
            <div className="text-center mt-6">
              <span className="text-xs text-gray-500 font-medium">Ticket Status: </span>
              <span className="text-green-600 font-semibold">CONFIRMED</span>
            </div>
          </div>
        ))}
      </div>
      <Footer/>
      </>
      );
}

      export default UserViewBooking;
