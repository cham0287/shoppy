import React from 'react';

const ProductCard = ({ product: { id, image, title, price, category } }) => {
  return (
    <li className='rounded-lg shadow-2xl m-4 overflow-hidden cursor-pointer'>
      <img className='w-full' src={image} alt={title} />
      <div className='productInfo p-2'>
        <div className='flex justify-between'>
          <div>{title}</div>
          <div>₩{price}</div>
        </div>
        <div className='opacity-[50%]'>{category}</div>
      </div>
    </li>
  );
};

export default ProductCard;
