import { createBrowserRouter, RouterProvider } from 'react-router';

import FavoritesPage from './containers/Favorites';
import ProductsPage from './containers/Products';
import RootLayoutPage from './pages/RootLayoutPage';

export default function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayoutPage />,
      children: [
        {
          index: true,
          element: <ProductsPage />
        },
        { path: '/favorites', element: <FavoritesPage /> }
      ]
    }
  ]);

  return <RouterProvider router={router} />;
}
