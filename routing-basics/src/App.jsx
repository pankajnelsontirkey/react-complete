import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import RootLayout from './pages/RootLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { path: '', element: <Home /> },
      { path: '/products', element: <ProductsPage /> }
    ]
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
