import React from 'react';

const Button = ({ text, onClick }) => {
  return (
    <button
      className='bg-brand py-2 px-4 text-white rounded-sm hover:brightness-125'
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
