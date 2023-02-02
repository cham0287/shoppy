import React, { useState } from 'react';
import { addNewProduct } from '../api/firebase';
import { uploadImage } from '../api/uploader';
import Button from '../components/ui/Button';

const NewProduct = () => {
  const [product, setProduct] = useState({});
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState();
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
    setIsUploading(true);
    uploadImage(file) //
      .then((url) => {
        addNewProduct(product, url) //
          .then(() => {
            setSuccess('성공적으로 제품이 추가되었습니다');
          });
        setTimeout(() => {
          setSuccess(null);
          setFile(null);
          setProduct({});
        }, 5000);
      })
      .finally(() => setIsUploading(false));
  };
  return (
    <section className='w-full text-center'>
      <h1 className='text-3xl text-semibold p-4'>새로운 제품 등록</h1>
      {success && <p className='my-2'>✅{success}</p>}
      {file && (
        <img
          className='w-96 mx-auto mb-2'
          src={URL.createObjectURL(file)}
          alt='selected file'
        />
      )}

      <form className='flex flex-col px-12' onSubmit={handleSubmit}>
        <input
          type='file'
          accept='image/*'
          name='file'
          required
          onChange={handleChange}
        />
        <input
          type='text'
          name='title'
          placeholder='제품명'
          value={product.title ?? ''}
          required
          onChange={handleChange}
        />
        <input
          type='text'
          name='price'
          placeholder='가격'
          value={product.price ?? ''}
          required
          onChange={handleChange}
        />
        <input
          type='text'
          name='category'
          placeholder='카테고리'
          value={product.category ?? ''}
          required
          onChange={handleChange}
        />
        <input
          type='text'
          name='description'
          placeholder='제품 설명'
          value={product.description ?? ''}
          required
          onChange={handleChange}
        />
        <input
          type='text'
          name='options'
          placeholder='옵션들(콤마(,)로 구분)'
          value={product.options ?? ''}
          required
          onChange={handleChange}
        />
        <Button
          text={isUploading ? '업로드중...' : '제품 등록하기'}
          disabled={isUploading}
        />
      </form>
    </section>
  );
};

export default NewProduct;
