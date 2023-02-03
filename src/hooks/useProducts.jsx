import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { addNewProduct, getProducts } from '../api/firebase';

export default function useProducts() {
  const queryClient = useQueryClient();
  const productsQuery = useQuery(['products'], getProducts, {
    staleTime: 1000 * 60 * 30,
  });
  const addProduct = useMutation(
    ({ product, url }) => addNewProduct(product, url),
    { onSuccess: () => queryClient.invalidateQueries(['products']) }
  );
  return { productsQuery, addProduct };
}
