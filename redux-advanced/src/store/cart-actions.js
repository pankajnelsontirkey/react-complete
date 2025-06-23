import { cartActions } from './cart-slice';
import { uiActions } from './ui-slice';

const { VITE_FIREBASE_DB_URL } = import.meta.env;

export const fetchCart = () => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: 'pending',
        title: 'Fetching...',
        message: 'Please wait while we retrieve your cart.'
      })
    );

    const sendRequest = async () => {
      const response = await fetch(`${VITE_FIREBASE_DB_URL}/cart.json`);

      if (!response.ok) {
        throw new Error('We were unable to fetch your saved cart!');
      }

      const data = await response.json();

      return data;
    };

    try {
      const cart = await sendRequest();

      dispatch(cartActions.replaceCart({ ...cart, items: cart.items || [] }));

      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Cart fetched.',
          message: 'Your saved cart has been loaded.'
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error',
          message: error.message
        })
      );
    }
  };
};

export const saveCart = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: 'pending',
        title: 'Saving Cart...',
        message: 'Saving your cart...'
      })
    );

    const sendRequest = async () => {
      const response = await fetch(`${VITE_FIREBASE_DB_URL}/cart.json`, {
        method: 'PUT',
        body: JSON.stringify(cart)
      });

      if (!response.ok) {
        throw new Error('We were unable to save your cart!');
      }
    };

    try {
      await sendRequest();

      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Cart Saved...',
          message: 'Cart saved successfully.'
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error with saving cart!',
          message: `${error.message}`
        })
      );
    }
  };
};
