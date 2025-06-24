import { Outlet } from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';

export default function RootLayoutPage() {
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}
