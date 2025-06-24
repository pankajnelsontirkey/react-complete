import { Link } from 'react-router-dom';

import styles from './MainNavigation.module.css';

export default function MainNavigation() {
  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles.list}>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/'>Products</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
