import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { blogLoader } from './actions/blog';
import { postLoader } from './actions/post';
import BlogPage from './pages/Blog';
import HomePage from './pages/Home';
import PostPage from './pages/Post';
import RootLayout from './pages/Root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'posts',
        children: [
          { index: true, element: <BlogPage />, loader: blogLoader },
          { path: ':id', element: <PostPage />, loader: postLoader }
        ]
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
