import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { loginSignupAction, logoutAction, tokenLoader } from './actions/auth';
import {
  addUpdateEventAction,
  deleteEventAction,
  eventByIdLoader,
  eventsLoader
} from './actions/events';
import { newsletterAction } from './actions/newsletter';
import AuthenticationPage from './pages/Authentication';
import EditEventPage from './pages/EditEvent';
import ErrorPage from './pages/Error';
import EventDetailPage from './pages/EventDetail';
import EventsPage from './pages/Events';
import EventsRootLayout from './pages/EventsRoot';
import HomePage from './pages/Home';
import NewEventPage from './pages/NewEvent';
import NewsletterPage from './pages/Newsletter';
import RootLayout from './pages/Root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: 'root',
    loader: tokenLoader,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'events',
        element: <EventsRootLayout />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: eventsLoader
          },
          {
            path: ':eventId',
            id: 'event-detail',
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
          },
          {
            path: 'new',
            element: <NewEventPage />,
            action: addUpdateEventAction
          }
        ]
      },
      {
        path: 'newsletter',
        element: <NewsletterPage />,
        action: newsletterAction
      },
      {
        path: 'auth',
        element: <AuthenticationPage />,
        action: loginSignupAction
      },
      {
        path: 'logout',
        action: logoutAction
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
