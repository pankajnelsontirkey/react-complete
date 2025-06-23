import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { uiActions } from './store/ui-slice';

const { VITE_FIREBASE_DB_URL } = import.meta.env;

let init = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    async function saveCart() {
      dispatch(
        uiActions.showNotification({
          status: 'pending',
          title: 'Saving Cart...',
          message: 'Saving your cart...'
        })
      );
      const response = await fetch(`${VITE_FIREBASE_DB_URL}/cart.json`, {
        method: 'PUT',
        body: JSON.stringify(cart)
      });

      if (!response.ok) {
        dispatch(
          uiActions.showNotification({
            status: 'error',
            title: 'Error with saving cart!',
            message: 'We were unable to save your cart.'
          })
        );
      }

      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Cart Saved...',
          message: 'Cart saved successfully.'
        })
      );
    }

    if (init) {
      init = false;
      return;
    }

    saveCart().catch((error) => {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error',
          message: `${error.message}`
        })
      );
    });
  }, [cart, dispatch]);

  return (
    <>
      {notification ? (
        <Notification
          status={notification?.status}
          title={notification?.title}
          message={notification?.message}
        />
      ) : null}
      <Layout>
        {showCart ? <Cart /> : null}
        <Products />
      </Layout>
    </>
  );
}

export default App;
