import React from 'react';

const Cards = ({ offer , img }) => {
    // console.log("Card props:", name, img);
    return (
        <div className='flex flex-shrink-0 items-center p-10 w-5/12 h-40 rounded-3xl bg-gradient-to-r from-rose-500 via-blue-600 to-rose-500 '>
            {/* icon */}
            <div className='rounded bg-white p-2'>
                <img src={img} alt={offer} />
                
            </div>

            {/* card-content */}
            <div className='ml-4'>
                <p className='text-white text-lg '>{offer}</p>
            </div>
        </div>
    );
}

export default Cards;
