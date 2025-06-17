import { useContext } from 'react';

import logoImg from '../assets/logo.jpg';
import CartContext from '../store/CartContext';
import UserProgressContext from '../store/UserProgressContext';
import Button from './UI/Button';

export default function Header() {
  const { items } = useContext(CartContext);
  const { showCart } = useContext(UserProgressContext);

  // const totalCartItems = items.reduce((acc, item) => item.quantity + acc, 0);

  function handleShowCart() {
    showCart();
  }

  return (
    <header id='main-header'>
      <div id='title'>
        <img src={logoImg} alt='Logo' />
        <h1>Bon Appetit</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleShowCart}>
          Cart ({items.length})
        </Button>
        {/* <Button>Cart ({totalCartItems})</Button> */}
      </nav>
    </header>
  );
}
