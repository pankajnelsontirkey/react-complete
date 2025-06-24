import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RootLayoutPage from './pages/RootLayoutPage';
import EventsPage from './pages/EventsPage';
import NewEventPage from './pages/NewEventPage';
import EventDetailPage from './pages/EventDetailPage';
import EditEventPage from './pages/EditEventPage';
import EventsNavigation from './components/EventsNavigation';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayoutPage />,
      children: [
        { index: true, element: <HomePage /> },
        {
          path: 'events',
          element: <EventsNavigation />,
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
