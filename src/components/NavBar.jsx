import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';
import { BsFillPencilFill } from 'react-icons/bs';

const NavBar = () => {
  return (
    <header className='flex justify-between p-2 border-b border-gray-300'>
      <Link to='/' className='flex text-4xl items-center text-[#F96162]'>
        <FiShoppingBag />
        <h1>Shoppy</h1>
      </Link>
      <nav className='flex items-center gap-4 font-semibold'>
        <Link to='/products'>Products</Link>
        <Link to='/carts'>Carts</Link>
        <Link to='/products/new'>
          <BsFillPencilFill className='text-2xl' />
        </Link>
        <button>Login</button>
      </nav>
    </header>
  );
};

export default NavBar;
