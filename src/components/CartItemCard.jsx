import React, { useState } from 'react';
import { BsFillTrashFill } from 'react-icons/bs';
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from 'react-icons/ai';
import useCart from '../hooks/useCart';

const ICON_CLASS =
  'transition-all cursor-pointer hover:text-brand hover:scale-110 mx-1';

const CartItemCard = ({
  item,
  item: { id, image, options, title, price, quantity },
}) => {
  const [checked, setChecked] = useState(item.checked);
  const { addOrUpdateCartItem, removeItem } = useCart();
  const handleMinus = () => {
    if (quantity < 2) return;
    addOrUpdateCartItem.mutate({ ...item, quantity: quantity - 1 });
  };
  const handlePlus = () => {
    addOrUpdateCartItem.mutate({ ...item, quantity: quantity + 1 });
  };
  const handleClickCheck = () => {
    setChecked((prev) => {
      addOrUpdateCartItem.mutate({ ...item, checked: !prev });
      return !prev;
    });
  };
  const handleRemove = () => removeItem.mutate(id + options);
  return (
    <li className='flex my-2 justify-between items-center'>
      <div className='basis-2/12 '>
        <img
          className='w-24 md:w-72 rounded-lg shrink-0'
          src={image}
          alt={title}
        />
      </div>
      <div className='basis-8/12 p-4 flex flex-col justify-center'>
        <div className='flex'>
          <div className='text-right pr-2'>
            <p>상품명: </p>
            <p>사이즈: </p>
            <p>상품가격: </p>
          </div>
          <div>
            <p> {title}</p>
            <p> {options}</p>
            <p> ₩{price}</p>
          </div>
        </div>
      </div>
      <div className='basais-2/12 flex items-center'>
        <button onClick={handleMinus}>
          <AiOutlineMinusSquare className={ICON_CLASS} />
        </button>
        <span>{quantity}</span>
        <button onClick={handlePlus} className={ICON_CLASS}>
          <AiOutlinePlusSquare />
        </button>
        <button onClick={handleRemove} className={ICON_CLASS}>
          <BsFillTrashFill />
        </button>
        <input type='radio' checked={checked} onClick={handleClickCheck} />
      </div>
    </li>
  );
};

export default CartItemCard;
