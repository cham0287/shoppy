import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { addOrUpdateCart } from '../api/firebase';
import { useAuthContext } from '../components/context/AuthContext';
import Button from '../components/ui/Button';

const ProductDetail = () => {
  const { product } = useLocation().state;
  const { user } = useAuthContext();
  const { id, image, title, description, category, price, options } = product;
  const [cartProduct, setCartProduct] = useState({
    ...product,
    options: options[0],
    checked: true,
    quantity: 1,
  });
  const [isAdded, setIsAdded] = useState(false);
  const handleSelect = (e) =>
    setCartProduct((prev) => ({
      ...prev,
      options: e.target.value,
    }));

  const handleChangeCount = (e) => {
    if (e.target.value < 1) return;
    setCartProduct((prev) => ({
      ...prev,
      quantity: e.target.value,
    }));
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    addOrUpdateCart(user.uid, cartProduct).then(() => {
      setIsAdded(true);
      setTimeout(() => {
        setIsAdded(false);
      }, 4000);
    });
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
              className='border-brand flex-1  border-4 border-dashed outline-none p-2 m-2'
            >
              {options.map((option, index) => (
                <option key={index}>{option}</option>
              ))}
            </select>
          </div>
          <div className='flex items-center'>
            <label className='text-brand font-bold' htmlFor='count'>
              갯수:
            </label>
            <input
              value={cartProduct.quantity}
              className='flex-1 p-2 m-2'
              type='number'
              id='count'
              onChange={handleChangeCount}
            />
          </div>
          {isAdded && <p>✅장바구니에 추가되었습니다</p>}
          <Button text='장바구니에 추가' onClick={handleAddToCart} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
