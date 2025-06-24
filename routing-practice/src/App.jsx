import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import EditEventPage from './pages/EditEventPage';
import EventDetailPage from './pages/EventDetailPage';
import EventsPage from './pages/EventsPage';
import EventsRootPage from './pages/EventsRootPage';
import HomePage from './pages/HomePage';
import NewEventPage from './pages/NewEventPage';
import RootLayoutPage from './pages/RootLayoutPage';

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
            { path: '', element: <EventsPage /> },
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
