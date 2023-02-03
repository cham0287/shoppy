import React from 'react';
import Price from './ui/Price';
import { AiFillPlusCircle } from 'react-icons/ai';
import { FaEquals } from 'react-icons/fa';
import Button from './ui/Button';

const Payment = ({ items }) => {
  const checkItemsTotalPrice =
    items &&
    items
      .filter((item) => item.checked == true)
      .reduce((acc, cur) => acc + cur.price * Number(cur.quantity), 0);
  const deliveryFee = checkItemsTotalPrice > 30000 ? 0 : 3000;
  return (
    <div className='flex flex-col w-2/3'>
      <div className='flex justify-between items-center p-6'>
        <Price text='상품 총액' price={checkItemsTotalPrice} />
        <AiFillPlusCircle className='text-md lg:text-2xl' />
        <Price text='배송비' price={deliveryFee} />
        <FaEquals />
        <Price text='총 결제금액' price={checkItemsTotalPrice + deliveryFee} />
      </div>
      <Button text='결제하기' />
    </div>
  );
};

export default Payment;
