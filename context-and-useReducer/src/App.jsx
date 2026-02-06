import { DUMMY_PRODUCTS } from './dummy-products';

import Header from './components/Header';
import Product from './components/Product';
import Shop from './components/Shop';
import CartContextProvider from './store/cartContext';

function App() {
  return (
    <CartContextProvider>
      <Header />
      <Shop>
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product {...product} />
          </li>
        ))}
      </Shop>
    </CartContextProvider>
  );
}

export default App;
