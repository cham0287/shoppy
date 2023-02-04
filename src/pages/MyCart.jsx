import React from 'react';
import { removeAllCart } from '../api/firebase';
import CartItemCard from '../components/CartItemCard';
import Payment from '../components/Payment';
import Button from '../components/ui/Button';
import useCart from '../hooks/useCart';

const MyCart = () => {
  const uid = localStorage.getItem('user');
  const {
    cartQuery: { isLoading, error, data: items },
  } = useCart();

  const handleRemoveAll = () => {
    if (confirm('장바구니를 비우시겠습니까?')) removeAllCart(uid), refetch();
  };

  if (isLoading) return <div>Loading...</div>;
  return (
    <div className='flex flex-col items-center px-2'>
      <div className='w-full p-4 text-xl font-bold text-center'>
        내 장바구니
      </div>
      {items.length === 0 && <p>장바구니가 비었습니다.</p>}
      {items.length > 0 && (
        <>
          <ul className='w-5/6 md:w-2/3 border-b border-t border-gray-400'>
            <li className='text-right px-6'>
              <button className='mx-4'>전체선택</button>
              <button className='mx-4' onClick={handleRemoveAll}>
                전체삭제
              </button>
            </li>
            {items &&
              items.map((item) => <CartItemCard key={item.id} item={item} />)}
          </ul>
          <Payment items={items} />
        </>
      )}
    </div>
  );
};

export default MyCart;
