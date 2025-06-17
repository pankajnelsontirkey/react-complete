import { useContext } from 'react';

import useHttp from '../hooks/useHttp';
import CartContext from '../store/CartContext';
import UserProgressContext from '../store/UserProgressContext';
import { API } from '../utils/constants';
import { currencyFormatter } from '../utils/formatting';
import Error from './Error';
import Button from './UI/Button';
import Input from './UI/Input';
import Modal from './UI/Modal';

export default function Checkout() {
  const { items, clearCart } = useContext(CartContext);
  const { progress, hideCheckout } = useContext(UserProgressContext);

  const requestConfig = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  };

  const { data, isLoading, error, sendRequest, clearData } = useHttp(
    `${API}/orders`,
    requestConfig
  );

  const cartTotal = items.reduce(
    (totalPrice, item) => totalPrice + item.price * item.quantity,
    0
  );

  function handleHideCheckout() {
    hideCheckout();
  }

  function handleCompleteOrder() {
    hideCheckout();
    clearCart();
    clearData();
  }

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const customerData = Object.fromEntries(formData.entries());

    sendRequest(JSON.stringify({ order: { items, customer: customerData } }));
  }

  let actions = (
    <>
      <Button type='button' textOnly onClick={handleHideCheckout}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (isLoading) {
    actions = <span>Sending order...</span>;
  }

  if (data && !error) {
    return (
      <Modal
        className='cart'
        open={progress === 'checkout'}
        onClose={handleHideCheckout}
      >
        <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p>Details about your order will be sent to your email shortly.</p>
        <p className='modal-actions'>
          <Button onClick={handleCompleteOrder}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal
      className='cart'
      open={progress === 'checkout'}
      onClose={handleHideCheckout}
    >
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)} </p>
        <Input label='Full Name' type='text' id='name' />
        <Input label='Email Address' type='email' id='email' />
        <Input label='Street' type='text' id='street' />
        <div className='control-row'>
          <Input label='Postal Code' type='text' id='postal-code' />
          <Input label='City' type='text' id='city' />
        </div>

        {error ? (
          <Error title='Failed to submit order...' message={error} />
        ) : null}

        <p className='modal-actions'>{actions}</p>
      </form>
    </Modal>
  );
}
