import { Outlet } from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';
import classes from './RootLayout.module.css';

export default function RootLayout() {
  return (
    <>
      <MainNavigation />
      <main className={classes.content}>
        <Outlet />
      </main>
    </>
  );
}
