import { useContext, useRef } from 'react';

import { CartContext } from '../store/cartContext';
import CartModal from './CartModal';

export default function Header() {
  const { items } = useContext(CartContext);
  const modal = useRef();

  const cartQuantity = items.length;

  function handleOpenCartClick() {
    modal.current.open();
  }

  let modalactions = <button>Close</button>;

  if (cartQuantity > 0) {
    modalactions = (
      <>
        <button>Close</button>
        <button>Checkout</button>
      </>
    );
  }

  return (
    <>
      <CartModal ref={modal} title='Your Cart' actions={modalactions} />
      <header id='main-header'>
        <div id='main-title'>
          <img src='logo.png' alt='Elegant model' />
          <h1>Elegant Context</h1>
        </div>

        <p>
          <button onClick={handleOpenCartClick}>Cart ({cartQuantity})</button>
        </p>
      </header>
    </>
  );
}
