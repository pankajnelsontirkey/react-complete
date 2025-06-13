import { useContext } from 'react';

import CartContext from '../store/CartContext';
import UserProgressContext from '../store/UserProgressContext';
import { currencyFormatter } from '../utils/formatting';
import Button from './UI/Button';
import Modal from './UI/Modal';

export default function Cart() {
  const { items } = useContext(CartContext);
  const { progress, hideCart, showCheckout } = useContext(UserProgressContext);

  const cartTotal = items.reduce(
    (totalPrice, item) => totalPrice + item.price * item.quantity,
    0
  );

  function handleHideCart() {
    hideCart();
  }

  function handleShowCheckout() {
    showCheckout();
  }

  return (
    <Modal className='cart' open={progress === 'cart'}>
      <h2>Your Cart</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} = {item.quantity}
          </li>
        ))}
      </ul>
      <p className='cart-total'>{currencyFormatter.format(cartTotal)}</p>
      <p className='modal-actions'>
        <Button onClick={handleHideCart}>Close</Button>
        <Button onClick={handleShowCheckout}>Checkout</Button>
      </p>
    </Modal>
  );
}
