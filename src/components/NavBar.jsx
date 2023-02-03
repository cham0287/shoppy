import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';
import { BsFillPencilFill } from 'react-icons/bs';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import User from './User';
import Button from './ui/Button';
import { useAuthContext } from '../context/AuthContext';
import { getCart } from '../api/firebase';
import { useQuery } from '@tanstack/react-query';

const NavBar = () => {
  const { user, login, logout } = useAuthContext();
  const uid = localStorage.getItem('user');
  const { data: items } = useQuery(['cart'], () => getCart(uid));

  return (
    <header className='flex justify-between p-2 border-b border-gray-300'>
      <Link to='/' className='flex text-4xl items-center text-brand'>
        <FiShoppingBag />
        <h1>Shoppy</h1>
      </Link>
      <nav className='flex items-center gap-4 font-semibold'>
        <Link to='/products'>Products</Link>
        {user && (
          <Link to='/carts' className='text-3xl relative'>
            {items && (
              <div className='bg-brand rounded-full text-xs absolute w-4 h-4 text-center left-5'>
                {items.length}
              </div>
            )}
            <AiOutlineShoppingCart />
          </Link>
        )}
        {user && user.isAdmin && (
          <Link to='/products/new'>
            <BsFillPencilFill className='text-2xl' />
          </Link>
        )}
        {user && <User user={user} />}
        {!user && <Button text='login' onClick={login} />}
        {user && <Button text='logout' onClick={logout} />}
      </nav>
    </header>
  );
};

export default NavBar;
