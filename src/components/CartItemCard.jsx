import React, { useState } from 'react';
import { BsFillTrashFill } from 'react-icons/bs';
import {
  changeCartItemQuantity,
  changeItemChecked,
  removeFromCart,
} from '../api/firebase';
import { useAuthContext } from './context/AuthContext';

const CartItemCard = ({ item, refetch }) => {
  const {
    user: { uid },
  } = useAuthContext();
  const [count, setCount] = useState(Number(item.quantity));
  const [checked, setChecked] = useState(item.checked);
  const handleChangeQuantity = (e) => {
    if (e.target.value < 1) return;
    setCount(() => {
      changeCartItemQuantity(uid, item, e.target.value);
      refetch();
      return e.target.value;
    });
  };
  const handleClickCheck = () => {
    setChecked((prev) => {
      changeItemChecked(uid, item, !prev);
      refetch();
      return !prev;
    });
  };
  const handleRemove = () => {
    removeFromCart(uid, item.id + item.options);
    refetch();
  };
  return (
    <li className='flex my-2'>
      <div className='basis-2/12'>
        <img src={item.image} alt={item.title} />
      </div>
      <div className='basis-8/12 p-4 flex flex-col justify-center'>
        <div className='flex'>
          <div className='text-right pr-2'>
            <p>상품명: </p>
            <p>사이즈: </p>
            <p>상품가격: </p>
          </div>
          <div>
            <p> {item.title}</p>
            <p> {item.options}</p>
            <p> ₩{item.price}</p>
          </div>
        </div>
      </div>
      <div className='basais-2/12 flex items-center'>
        <button>-</button>
        <input
          type='number'
          className='h-12 w-20'
          value={count}
          onChange={handleChangeQuantity}
        />
        <button>+</button>
        <button onClick={handleRemove}>
          <BsFillTrashFill />
        </button>
        <input type='radio' checked={checked} onClick={handleClickCheck} />
      </div>
    </li>
  );
};

export default CartItemCard;
