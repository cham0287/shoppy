import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { id, image, title, price, category } = product;
  return (
    <Link to={`products/${id}`} state={{ product }}>
      <li className='rounded-lg shadow-2xl m-4 overflow-hidden cursor-pointer hover:scale-105 transition-all'>
        <img className='w-full' src={image} alt={title} />
        <div className='productInfo p-2'>
          <div className='flex justify-between'>
            <div>{title}</div>
            <div>₩{price}</div>
          </div>
          <div className='opacity-[50%]'>{category}</div>
        </div>
      </li>
    </Link>
  );
};

export default ProductCard;
