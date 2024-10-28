import React, { useState } from 'react';
import busLogo from '../assets/bus.svg'

const Navbar = () => {
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className='bg-[#EEEDED] '>
      <div className='flex justify-between items-center w-11/12 mx-auto p-4'>
        <div className='flex'>
          <h1 className='text-4xl w-32 p-1 border-r-2 border-slate-300 text-red-600 hover:text-gray-400 cursor-pointer'>
            FASTX
          </h1>
          <div className='ml-5'><img  src={busLogo} alt='bus.svg' className='w-14 '></img></div>
        </div>
     
        <div>
          <ul className='flex space-x-6 items-center '>
            <li className='hover:bg-red-600 hover:rounded-2xl hover:text-slate-100 border-b-2 border-rose-500  p-2 ease-in-out cursor-pointer'>
              About
            </li>
            <li className='hover:bg-red-600 hover:rounded-2xl hover:text-slate-100 border-b-2 border-rose-500 p-2 ease-in-out cursor-pointer'>
              Language
            </li>
            <li className='hover:bg-red-600 hover:rounded-2xl hover:text-slate-100 border-b-2 border-rose-500 p-2 ease-in-out cursor-pointer'>
              Help
            </li>

             {/* Profile dropdown with icon  */}
            <li onClick={toggleDropdown}  className={`relative p-2 flex space-x-1 border-b-2 border-rose-500 cursor-pointer ease-in-out ${
                isDropdownOpen ? 'bg-red-600 text-slate-100 rounded-2xl' : 'hover:bg-red-600 hover:rounded-2xl hover:text-slate-100'
              }`}>
              <div  className='flex'>
                Profile
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='size-6 ml-1'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
                  />
                </svg>
              </div>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className='absolute right-0 mt-10 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10'>
                  <ul className='py-2 border border-red-200 '>
                    <li className='px-4 py-2 hover:bg-gray-100 text-black cursor-pointer'>My Profile</li>
                    <li className='px-4 py-2 hover:bg-gray-100 text-black cursor-pointer'>Bookings</li>
                    <li className='px-4 py-2 hover:bg-gray-100 text-black cursor-pointer'>Settings</li>
                    <li className='px-4 py-2 hover:bg-gray-100 text-black cursor-pointer'>Logout</li>
                  </ul>
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
