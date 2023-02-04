import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { addOrUpdateCart, getCart, removeFromCart } from '../api/firebase';
import { useAuthContext } from '../context/AuthContext';

export default function useCart() {
  const { uid } = useAuthContext();
  const queryClient = useQueryClient();
  const cartQuery = useQuery(['cart', uid || ''], () => getCart(uid), {
    staleTime: 1000 * 60 * 30,
    enabled: !!uid,
  });
  const addOrUpdateCartItem = useMutation(
    (item) => addOrUpdateCart(uid, item),
    {
      onSuccess: () => queryClient.invalidateQueries(['cart', uid]),
    }
  );
  const removeItem = useMutation((id) => removeFromCart(uid, id), {
    onSuccess: () => queryClient.invalidateQueries(['cart', uid]),
  });
  return { cartQuery, addOrUpdateCartItem, removeItem };
}
