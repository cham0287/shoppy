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
    <>
      <div className='grid grid-cols-5 gap-2 p-4'>
        <Price text='상품 총액' price={checkItemsTotalPrice} />
        <div className='m-auto'>
          <AiFillPlusCircle />
        </div>
        <Price text='배송액' price={deliveryFee} />
        <div className='m-auto'>
          <FaEquals />
        </div>
        <Price text='총 결제금액' price={checkItemsTotalPrice + deliveryFee} />
      </div>
      <Button text='결제하기' />
    </>
  );
};

export default Payment;
