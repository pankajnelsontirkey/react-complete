import { Outlet } from 'react-router';

import Navigation from '../components/Nav/Navigation';

export default function RootLayoutPage() {
  return (
    <>
      <Navigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}
