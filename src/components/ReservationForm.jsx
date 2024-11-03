import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


const ReservationForm = () => {
  const [userDetails, setUserDetails] = useState({});
  const { busId, seatString,FromLocation,ToLocation,Duration,noOfSeats,Month } = useParams();
  console.log(seatString);
  const seatNumbers = seatString.split(',');
  console.log(seatNumbers);

  const handleChange = (seatNumber, field, value) => {
    setUserDetails(prevDetails => ({
      ...prevDetails,
      [seatNumber]: {
        ...prevDetails[seatNumber],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reservationData = {
        busId,
        FromLocation,
        ToLocation,
        Duration,
        month:Month,
        noOfSeats,
        seatNumbers,
        passengerDetails: seatNumbers.map(seatNumber => ({
          seatNumber,
          ...userDetails[seatNumber],
        })),
      };

    try {
      await axios.post('/user/reservations', reservationData);
    //   console.log('Booking confirmed!', reservationData);
      // Redirect or show a confirmation message here
    } catch (error) {
      console.error('Error submitting reservation:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-6 rounded-lg shadow-lg bg-white">
        <h2 className="text-center text-2xl font-bold text-gray-700">Passenger Details</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {seatNumbers.map(seatNumber => (
            <div key={seatNumber} className="border-b border-gray-200 pb-4 mb-4">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Seat {seatNumber}</h3>
              <div className="space-y-2">
                <div>
                  <label className="block text-sm font-medium text-gray-600">Name:</label>
                  <input
                    type="text"
                    value={userDetails[seatNumber]?.name || ''}
                    onChange={(e) => handleChange(seatNumber, 'name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Age:</label>
                  <input
                    type="number"
                    value={userDetails[seatNumber]?.age || ''}
                    onChange={(e) => handleChange(seatNumber, 'age', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Gender:</label>
                  <select
                    value={userDetails[seatNumber]?.gender || ''}
                    onChange={(e) => handleChange(seatNumber, 'gender', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Email:</label>
                  <input
                    type="email"
                    value={userDetails[seatNumber]?.email || ''}
                    onChange={(e) => handleChange(seatNumber, 'email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>
              </div>
            </div>
          ))}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 text-white rounded-md shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Confirm Reservation
            </button>
            
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReservationForm;
