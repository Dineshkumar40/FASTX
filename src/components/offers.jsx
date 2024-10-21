import React from 'react';
import Charter from '../assets/80x80.png';
import InterCity from '../assets/Intrcity.png';
import Icici from '../assets/MWeb-80_80 ICICI.png';
import Sbtc from '../assets/SBSTC.png';
import Hit from '../assets/SUPERHIT.png';
import Tile from '../assets/tile-80X80.png';
import Cards from './cards';



const Offers = () => {

	const items = [
		{
			name: "Save up to Rs 250 on bus tickets", //departure time 
			// before 6 
			// 6 to 12 
			// 12 to 6 
			// after 6 
			img: Tile  
		},
		{
			name: "Save up to Rs 300 on AP, TS routes",
			img: Hit
		},
		{
			name: "Save upto Rs 500 with ICICI",
			img: Icici
		},
		{
			name: "Save up to Rs 300 on Chartered Bus",
			img: Charter
		},
		{
			name: "Save 25% up to Rs 100 on SBSTC bus",
			img: Sbtc
		},
		{
			name: "Save up to Rs. 150 on IntrCity SmartBus",
			img: InterCity
		},

	]


	return (
		<div className='bg-white absolute -bottom-36 left-28 rounded-3xl w-5/6 shadow-2xl  border-black p-5  ' >
			{/* heading div	 */}
			<div className='flex justify-between items-center m-3  ' >
				<h1 className='font-bold text-2xl ' >TRENDING OFFERS</h1>
				<p className=' font-semibold px-3 py-2  rounded-xl text-blue-600 ' >
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="2 2 20 20" stroke-width="1.5" stroke="currentColor" class="size-6">
						<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
					</svg>
				</p>
			</div>
			{/* card div */}
			<div className='flex space-x-5 max-w-full  overflow-x-auto whitespace-nowrap  mt-5  scrollbar-hide ' >
				{items.map((items, index) => (
					<Cards key={index} offer={items.name} img={items.img} />        
				))}


			</div>
		</div>
	);
}

export default Offers;

