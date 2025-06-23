import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { fetchCart, saveCart } from './store/cart-actions';

let init = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  useEffect(() => {
    if (init) {
      init = false;
      return;
    }

    if (cart.wasUpdated) {
      dispatch(saveCart(cart));
    }
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
