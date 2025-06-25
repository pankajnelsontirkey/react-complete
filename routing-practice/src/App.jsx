import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import EditEventPage from './pages/EditEventPage';
import EventDetailPage from './pages/EventDetailPage';
import EventsPage from './pages/EventsPage';
import EventsRootPage from './pages/EventsRootPage';
import HomePage from './pages/HomePage';
import NewEventPage from './pages/NewEventPage';
import RootLayoutPage from './pages/RootLayoutPage';
import { VITE_API_HOST } from './utils/constants';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayoutPage />,
      children: [
        { index: true, element: <HomePage /> },
        {
          path: 'events',
          element: <EventsRootPage />,
          children: [
            {
              path: '',
              element: <EventsPage />,
              loader: async () => {
                const response = await fetch(`${VITE_API_HOST}/events`);

                if (!response.ok) {
                  // setError('Fetching events failed.');
                } else {
                  const resData = await response.json();
                  return resData.events;
                }
              }
            },
            { path: 'new', element: <NewEventPage /> },
            { path: ':eventId', element: <EventDetailPage /> },
            { path: ':eventId/edit', element: <EditEventPage /> }
          ]
        }
      ]
    }
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
