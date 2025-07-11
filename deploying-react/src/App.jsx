import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage from './pages/Home';
import RootLayout from './pages/Root';

const BlogPage = lazy(() => import('./pages/Blog'));
const PostPage = lazy(() => import('./pages/Post'));

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
          {
            index: true,
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <BlogPage />
              </Suspense>
            ),
            loader: () =>
              import('./actions/blog').then((module) => module.blogLoader())
          },
          {
            path: ':id',
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <PostPage />
              </Suspense>
            ),
            loader: ({ params }) =>
              import('./actions/post').then((module) =>
                module.postLoader({ params })
              )
          }
        ]
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
