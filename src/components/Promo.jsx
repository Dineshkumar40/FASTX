import React from 'react';
import Proim from '../assets/primoHomeBannerComp.png';
import prayingicon from '../assets/praying-hands-svgrepo-com.svg';
import star from '../assets/star.svg';
import time from '../assets/time.svg'


const Promo = () => {
  return (
    <div className=' w-5/6 mx-auto m-80 relative'   >
      <div className='rounded-3xl   '>
        <img src={Proim} alt='promo' />
      </div>
      <div className='absolute  rounded-[40px] bg-[#233058] space-y-20 top-0 right-7 py-[55px] px-12'>
        {/* ontime */}
        <div className='flex space-x-7' >
          {/* icon */}
          <div className='flex items-center'>
            <img className='h-[80px] w-[80px] ' src={time} alt='' />
          </div >
          {/* para */}
           <div className='flex-col justify-center '>
            <h3 className='font-bold text-[28px] text-white'>On time</h3>
            <p className='text-[20px] text-white'> Punctual arrivals on<br/>95% trips</p>
           </div>
        </div>
        {/* friendlystaff */}
        <div className='flex space-x-7'>
          {/* icon */}
          <div className='flex items-center'>
            <img className='h-[80px] w-[80px]' src={prayingicon} alt='pray' />
          </div>
          {/* para */}
          <div className='flex-col justify-center '>
            <h3 className='font-bold text-[28px] text-white'>Friendly Staff</h3>
            <p className='text-[20px] text-white'>Always ready to help</p>
          </div>
        </div>
        {/* toprated */}
        <div className='flex space-x-7'>
          {/* icon */}
          <div className='flex items-center'>
            <img className='h-[80px] w-[80px]' src={star} alt='star' />

          </div>
          {/* para */}
          <div className='flex-col justify-center '>
            <h3 className='font-bold text-[28px] text-white'>Top Rated</h3>
            <p className='text-[20px] text-white'>Buses with 4+ star<br/> rating</p>
          </div>
          <div>
			
          </div>
        </div>
      </div>
    </div>

  );
}

export default Promo;
