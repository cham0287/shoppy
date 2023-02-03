import React from 'react';

const Price = ({ text, price }) => {
  return (
    <div className='w-24 sm:w-32 lg:w-36 text-center p-4 lg:p-6 bg-gray-100 rounded-lg'>
      <div className='text-xs sm:text-sm lg:text-lg'>{text}</div>
      <div className='text-brand font-bold text-xs md:text-sm lg:text-xl'>
        ₩{price}
      </div>
    </div>
  );
};

export default Price;
