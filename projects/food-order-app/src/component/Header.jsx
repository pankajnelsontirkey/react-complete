import logoImg from '../assets/logo.jpg';
import Button from './UI/Button';

export default function Header() {
  return (
    <header id='main-header'>
      <div id='title'>
        <img src={logoImg} alt='Logo' />
        <h1>Bon Appetit</h1>
      </div>
      <nav>
        <Button>Cart (0)</Button>
      </nav>
    </header>
  );
}
