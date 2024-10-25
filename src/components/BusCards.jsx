import React from 'react'

function BusCards({ BusName, Departure, Duration, Arrival, Fare, SeatsAvailable, BusType, FromLocation, ToLocation,FirstBus,LastBus }) {
    return (
        <>
            <div className="border hover:border-red-200 transition-shadow duration-300 hover:shadow-xl rounded-2xl p-4 mb-4 group relative">
                <div className="flex justify-between items-center mb-2">
                    <div className="font-semibold text-lg">Ravina Travels</div>
                    <div className="flex items-center space-x-16 p-2">
                        <p className='font-semibold text-2xl'>14:30</p>
                        <p className='opacity-50'>28h 40m</p>
                        <p className='text-lg'>19:10</p>
                        <div className="flex items-center space-x-0 bg-red-500 rounded-full text-white text-sm font-semibold"
                            style={{ padding: '3px 4px', width: '40px', height: '24px' }}>
                            <svg fill="currentColor" viewBox="0 0 20 20"
                                style={{ width: '16px', height: '16px', padding: '0px' }}>
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.963a1 1 0 00.95.69h4.174c.969 0 1.371 1.24.588 1.81l-3.385 2.457a1 1 0 00-.364 1.118l1.286 3.963c.3.921-.755 1.688-1.538 1.118L10 13.057l-3.385 2.457c-.783.57-1.838-.197-1.538-1.118l1.286-3.963a1 1 0 00-.364-1.118L2.614 9.39c-.783-.57-.38-1.81.588-1.81h4.174a1 1 0 00.95-.69l1.286-3.963z" />
                            </svg>
                            <span>☆2.2</span>
                        </div>
                        <div className="flex items-center space-x-16">
                            <p><span className='opacity-75'>Starts from <br />INR </span><span className='font-bold'>3699</span></p>
                            <p><span className='font-semibold'>28</span > <span className='opacity-50'> Seats<br /> available</span></p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <span>A/C Sleeper</span>
                    </div>
                </div>
                <div className="flex justify-between items-center mt-2">
                    <div className="text-gray-600 font-light">Koyambedu - Bandra East</div>
                </div>

                {/* Hover Section for details */}
                <div className="flex justify-end">
                    {/* Hidden Hover Content */}
                    <div className="absolute hidden group-hover:block right-36 transition-all ease-in duration-300 delay-1000">
                        <div className="flex items-center  px-2 py-2 ">
                            <p className="border-r-2 border-red-400 pe-2 ">Amenities</p>
                            <p className="border-r-2 border-red-400 px-2">Reviews</p>
                            <p className="px-2">Booking policies</p>
                        </div>
                    </div>
                    <button className="bg-red-600 text-white px-4 py-3 group rounded-xl">VIEW SEATS</button>
                </div>
            </div>


        </>
    )
}

export default BusCards
