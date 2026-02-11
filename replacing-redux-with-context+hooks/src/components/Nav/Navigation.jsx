import { NavLink } from 'react-router';

import './Navigation.css';

export default function Navigation() {
  return (
    <header className='main-header'>
      <nav>
        <ul>
          <li>
            <NavLink to='/'>All Products</NavLink>
          </li>
          <li>
            <NavLink to='/favorites'>Favorites</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
