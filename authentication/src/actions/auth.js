import { redirect } from 'react-router-dom';

import { API_HOST } from '../utils/constants';
import { getAuthToken } from '../utils/auth';

export const loginSignupAction = async ({ request }) => {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get('mode') || 'login';

  const formData = await request.formData();
  const { email, password } = Object.fromEntries(formData.entries());

  if (mode !== 'login' && mode !== 'signup') {
    throw new Response(
      JSON.stringify({ message: 'Unsupported mode' }, { status: 422 })
    );
  }

  const response = await fetch(`${API_HOST}/${mode}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw new Response(
      JSON.stringify(
        { message: 'Could not authenticate user' },
        { status: 500 }
      )
    );
  }

  const { token } = await response.json();

  localStorage.setItem('token', token);
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem('expiration', expiration.toISOString());

  return redirect('/');
};

export const logoutAction = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expiration');
  return redirect('/');
};

export const tokenLoader = () => getAuthToken();

export const checkTokenLoader = () => {
  const token = getAuthToken();

  if (!token) {
    return redirect('/auth');
  }

  return null;
};
