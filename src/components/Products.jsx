import React from 'react';
import { getProducts } from '../api/firebase';
import { useQuery } from '@tanstack/react-query';
import ProductCard from './ProductCard';

const Products = () => {
  const {
    isLoading,
    error,
    data: products,
  } = useQuery(['products'], () => getProducts());
  console.log(products);
  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul className='grid grid-cols-3 '>
        {products &&
          products.map((product) => <ProductCard product={product} />)}
      </ul>
    </>
  );
};

export default Products;
