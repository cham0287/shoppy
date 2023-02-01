import React, { useState } from 'react';
import { addNewProduct } from '../api/firebase';
import { uploadImage } from '../api/uploader';
import Button from '../components/ui/Button';

const NewProduct = () => {
  const [product, setProduct] = useState({});
  const [file, setFile] = useState(null);
  const handleChange = (e) => {
    const { value, name, files } = e.target;
    if (name === 'file') {
      setFile(files && files[0]);
      return;
    }
    setProduct((product) => ({ ...product, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    uploadImage(file).then((url) => {
      addNewProduct(product, url);
    });
  };
  return (
    <div className='flex flex-col items-center '>
      <h1 className='text-3xl text-semibold p-4'>새로운 제품 등록</h1>
      {file && (
        <img
          className='p-4'
          src={URL.createObjectURL(file)}
          alt='selected file'
        />
      )}

      <form
        className='flex flex-col items-center w-4/5 gap-2'
        onSubmit={handleSubmit}
      >
        <input
          className='border p-2 w-full'
          type='file'
          accept='image/*'
          name='file'
          required
          onChange={handleChange}
        />

        <input
          className='border p-2 w-full'
          type='text'
          name='title'
          placeholder='제품명'
          value={product.title ?? ''}
          required
          onChange={handleChange}
        />
        <input
          className='border p-2 w-full'
          type='text'
          name='price'
          placeholder='가격'
          value={product.price ?? ''}
          required
          onChange={handleChange}
        />
        <input
          className='border p-2 w-full'
          type='text'
          name='category'
          placeholder='카테고리'
          value={product.category ?? ''}
          required
          onChange={handleChange}
        />
        <input
          className='border p-2 w-full'
          type='text'
          name='description'
          placeholder='제품 설명'
          value={product.description ?? ''}
          required
          onChange={handleChange}
        />
        <input
          className='border p-2 w-full'
          type='text'
          name='options'
          placeholder='옵션들(콤마(,)로 구분)'
          value={product.options ?? ''}
          required
          onChange={handleChange}
        />
        <Button text='제품 등록하기' />
        <button className='border p-2 w-full bg-brand text-white'>
          제품 등록하기
        </button>
      </form>
    </div>
  );
};

export default NewProduct;
