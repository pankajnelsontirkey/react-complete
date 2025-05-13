import { useState } from 'react';

import { DUMMY_PRODUCTS } from './dummy-products';

import Header from './components/Header';
import Product from './components/Product';
import Shop from './components/Shop';
import { CartContext } from './store/CartContext';

function App() {
  const [shoppingCart, setShoppingCart] = useState({ items: [] });

  function handleAddItemToCart(id) {
    setShoppingCart((prev) => {
      const updatedItems = [...prev.items];

      const existingCartItemIndex = updatedItems.findIndex(
        (cartItem) => cartItem.id === id
      );
      const existingCartItem = updatedItems[existingCartItemIndex];

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        const product = DUMMY_PRODUCTS.find((product) => product.id === id);
        updatedItems.push({
          id,
          name: product.title,
          price: product.price,
          quantity: 1
        });
      }

      return { items: updatedItems };
    });
  }

  function handleUpdateCartItemQuantity(productId, amount) {
    setShoppingCart((prev) => {
      const updatedItems = [...prev.items];
      const updatedItemIndex = updateItems.findIndex(
        (item) => item.id === productId
      );

      const updatedItem = { ...updatedItems[updatedItemIndex] };

      updatedItem.quantity += amount;

      if (updateItem.quantity <= 0) {
        updatedItems.splice(updatedItemIndex, 1);
      } else {
        updatedItems[updatedItemIndex] = updatedItem;
      }
    });

    return { items: updateItems };
  }

  const ctxValue = {
    items: shoppingCart.items,
    addItemToCart: handleAddItemToCart
  };

  return (
    <>
      <CartContext.Provider value={ctxValue}>
        <Header onUpdateCartItemQuanity={handleUpdateCartItemQuantity} />
        <Shop>
          {DUMMY_PRODUCTS.map((product) => (
            <li key={product.id}>
              <Product {...product} />
            </li>
          ))}
        </Shop>
      </CartContext.Provider>
    </>
  );
}

export default App;
