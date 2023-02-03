import React from 'react';
import { getCart, removeAllCart } from '../api/firebase';
import { useQuery } from '@tanstack/react-query';
import CartItemCard from '../components/CartItemCard';
import Payment from '../components/Payment';
import Button from '../components/ui/Button';

const MyCart = () => {
  const uid = localStorage.getItem('user');
  const {
    isLoading,
    error,
    refetch,
    data: items,
  } = useQuery(['cart'], () => getCart(uid));

  const handleRemoveAll = () => {
    if (confirm('장바구니를 비우시겠습니까?')) removeAllCart(uid), refetch();
  };
  return (
    <div className='flex flex-col items-center px-12'>
      <div className='w-full p-4 text-xl font-bold text-center'>
        내 장바구니
      </div>
      <ul className='border-b border-t border-gray-400'>
        <li className='text-right px-6'>
          <button className='mx-4'>전체선택</button>
          <button className='mx-4' onClick={handleRemoveAll}>
            전체삭제
          </button>
        </li>
        {items &&
          items.map((item) => <CartItemCard item={item} refetch={refetch} />)}
      </ul>
      <Payment items={items} />
    </div>
  );
};

export default MyCart;
