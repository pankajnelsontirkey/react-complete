import { useContext } from 'react';

import logoImg from '../assets/logo.jpg';
import Button from './UI/Button';
import CartContext from '../store/CartContext';

export default function Header() {
  const { items } = useContext(CartContext);

  // const totalCartItems = items.reduce((acc, item) => item.quantity + acc, 0);

  return (
    <header id='main-header'>
      <div id='title'>
        <img src={logoImg} alt='Logo' />
        <h1>Bon Appetit</h1>
      </div>
      <nav>
        <Button>Cart ({items.length})</Button>
        {/* <Button>Cart ({totalCartItems})</Button> */}
      </nav>
    </header>
  );
}
