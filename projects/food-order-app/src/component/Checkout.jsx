import { useContext } from 'react';

import CartContext from '../store/CartContext';
import UserProgressContext from '../store/UserProgressContext';
import { currencyFormatter } from '../utils/formatting';
import Button from './UI/Button';
import Input from './UI/Input';
import Modal from './UI/Modal';

export default function Checkout() {
  const { items } = useContext(CartContext);
  const { progress, hideCheckout } = useContext(UserProgressContext);

  const cartTotal = items.reduce(
    (totalPrice, item) => totalPrice + item.price * item.quantity,
    0
  );

  function handleHideCheckout() {
    hideCheckout();
  }

  function handleSubmitOrder() {}

  return (
    <Modal
      className='cart'
      open={progress === 'checkout'}
      onClose={handleHideCheckout}
    >
      <h2>Checkout</h2>
      <p>Total Amount: {currencyFormatter.format(cartTotal)} </p>
      <Input label='Full Name' type='text' id='fullName' />
      <Input label='Email Address' type='email' id='email' />
      <Input label='Street' type='text' id='street' />
      <div className='control-row'>
        <Input label='Postal Code' type='text' id='postalCode' />
        <Input label='City' type='text' id='city' />
      </div>

      <p className='modal-actions'>
        <Button type='button' textOnly onClick={handleHideCheckout}>
          Close
        </Button>
        <Button onClick={handleSubmitOrder}>Submit Order</Button>
      </p>
    </Modal>
  );
}
