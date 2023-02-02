import React from 'react';

const Price = ({ text, price }) => {
  return (
    <div className='text-center p-6 bg-gray-100 rounded-lg'>
      <div>{text}</div>
      <div className='text-brand font-bold'>₩{price}</div>
    </div>
  );
};

export default Price;
