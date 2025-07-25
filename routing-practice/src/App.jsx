import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import {
  addUpdateEventAction,
  deleteEventAction,
  eventByIdLoader,
  eventsLoader
} from './actions/events';
import { newsletterAction } from './actions/newsletter';
import EditEventPage from './pages/EditEventPage';
import ErrorPage from './pages/ErrorPage';
import EventDetailPage from './pages/EventDetailPage';
import EventsPage from './pages/EventsPage';
import EventsRootPage from './pages/EventsRootPage';
import HomePage from './pages/HomePage';
import NewEventPage from './pages/NewEventPage';
import NewsletterPage from './pages/NewsletterPage';
import RootLayoutPage from './pages/RootLayoutPage';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayoutPage />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <HomePage /> },
        {
          path: 'events',
          element: <EventsRootPage />,
          children: [
            {
              index: true,
              element: <EventsPage />,
              loader: eventsLoader
            },
            {
              path: 'new',
              element: <NewEventPage />,
              action: addUpdateEventAction
            },
            {
              path: ':eventId',
              id: 'event-details',
              loader: eventByIdLoader,
              children: [
                {
                  index: true,
                  element: <EventDetailPage />,
                  action: deleteEventAction
                },
                {
                  path: 'edit',
                  element: <EditEventPage />,
                  action: addUpdateEventAction
                }
              ]
            }
          ]
        },
        {
          path: 'newsletter',
          element: <NewsletterPage />,
          action: newsletterAction
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
