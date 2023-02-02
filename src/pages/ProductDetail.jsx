import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../components/ui/Button';

const ProductDetail = () => {
  const { id, image, title, description, category, price, options } =
    useLocation().state.product;
  const [selected, setSelected] = useState(options && options[0]);
  const handleSelect = (e) => setSelected(e.target.value);
  const handleClick = (e) => {
    // 장바구니에 추가하기
  };
  return (
    <div className='flex flex-col items-center'>
      <div>{category}</div>
      <div className='flex flex-col md:flex-row'>
        <img className='w-full px-4 basis-7/12' src={image} alt={title} />
        <div className='w-full p-4 basis-5/12 flex flex-col'>
          <h1 className='text-3xl font-semibold'>{title}</h1>
          <div className='text-xl font-semibold border-gray-300 border-b'>
            ₩{price}
          </div>
          <div className='py-4 text-lg'>{description}</div>
          <div className='flex items-center'>
            <label className='text-brand font-bold' htmlFor='select'>
              옵션:
            </label>
            <select
              id='select'
              onChange={handleSelect}
              className='border-brand flex-1  border-4 border-dashed outline-none p-2 my-4'
            >
              {options.map((option, index) => (
                <option key={index}>{option}</option>
              ))}
            </select>
          </div>
          <Button text='장바구니에 추가' onClick={handleClick} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
