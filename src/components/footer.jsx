import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-6">
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 text-sm">
        {/* RedBus Section */}
        <div>
          <h2 className="font-bold mb-2">FASTX</h2>
          <p className="text-gray-400">
            FASTX is the world's largest online bus ticket booking service
            trusted by over 25 million happy customers globally. FASTX offers
            bus ticket booking through its website, iOS and Android mobile apps
            for all major routes.
          </p>
        </div>

        {/* About redBus Section */}
        <div>
          <h2 className="font-bold mb-2">About FASTX</h2>
          <ul>
            <li className='text-gray-400'>About us</li>
            <li className='text-gray-400'>Investor Relations</li>
            <li className='text-gray-400'>Contact us</li>
            <li className='text-gray-400'>Mobile version</li>
            <li className='text-gray-400'>Offers</li>
            <li className='text-gray-400'>Careers</li>
            <li className='text-gray-400'>Values</li>
          </ul>
        </div>

        {/* Info Section */}
        <div>
          <h2 className="font-bold mb-2">Info</h2>
          <ul>
            <li className='text-gray-400'>T&C</li>
            <li className='text-gray-400'>Privacy policy</li>
            <li className='text-gray-400'>FAQ</li>
            <li className='text-gray-400'>Blog</li>
            <li className='text-gray-400'>Bus operator registration</li>
            <li className='text-gray-400'>Agent registration</li>
            <li className='text-gray-400'>Insurance partner</li>
            <li className='text-gray-400'>User agreement</li>
            <li className='text-gray-400'>Primo Bus</li>
            <li className='text-gray-400'>Bus Time table</li>
          </ul>
        </div>

        {/* Global Sites Section */}
        <div>
          <h2 className="font-bold mb-2">Global Sites</h2>
          <ul>
            <li className='text-gray-400'>India</li>
            <li className='text-gray-400'>Singapore</li>
            <li className='text-gray-400'>Malaysia</li>
            <li className='text-gray-400'>Indonesia</li>
            <li className='text-gray-400'>Peru</li>
            <li className='text-gray-400'>Colombia</li>
            <li className='text-gray-400'>Cambodia</li>
            <li className='text-gray-400'>Vietnam</li>
          </ul>
        </div>

        {/* Our Partners Section */}
        <div>
          <h2 className="font-bold mb-2">Our Partners</h2>
          <ul>
            <li className='text-gray-400'>Goibibo Bus</li>
            <li className='text-gray-400'>Goibibo Hotels</li>
            <li className='text-gray-400'>Makemytrip Hotels</li>
          </ul>
        </div>
      </div>

      {/* Copyright & Social Icons */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center mt-6 border-t pt-6 text-xs">
        <p>© 2024 FASTX India Pvt Ltd. All rights reserved</p>
        <div className="flex space-x-4">
          <a href="#" className="text-gray-500 hover:text-black"> 
            {/* Add your social media icons here */}
            {/* <i className="fab fa-facebook"></i> */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
          <a href="#" className="text-gray-500 hover:text-black">
            {/* <i className="fab fa-linkedin"></i> */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
          <a href="#" className="text-gray-500 hover:text-black">
            {/* <i className="fab fa-twitter"></i> */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
          </a>
          <a href="#" className="text-gray-500 hover:text-black">
            {/* <i className="fab fa-instagram"></i> */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;