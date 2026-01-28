import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';

import ChallengesPage from './pages/Challenges.jsx';
import WelcomePage from './pages/Welcome.jsx';

const router = createBrowserRouter([
  { path: '/', element: <WelcomePage /> },
  { path: '/challenges', element: <ChallengesPage /> }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
