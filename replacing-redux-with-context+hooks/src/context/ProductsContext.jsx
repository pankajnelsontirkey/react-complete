import { createContext, useState } from 'react';

const initialProducts = [
  {
    id: 'p1',
    title: 'Red Scarf',
    description: 'A pretty red scarf.',
    isFavorite: false
  },
  {
    id: 'p2',
    title: 'Blue T-Shirt',
    description: 'A pretty blue t-shirt.',
    isFavorite: false
  },
  {
    id: 'p3',
    title: 'Green Trousers',
    description: 'A pair of lightly green trousers.',
    isFavorite: false
  },
  {
    id: 'p4',
    title: 'Orange Hat',
    description: 'Street style! An orange hat.',
    isFavorite: false
  }
];

export const ProductsContext = createContext({
  products: [],
  toggleFavorite: (id) => {}
});

export default function ProductsProvider({ children }) {
  const [productsList, setProductsList] = useState(initialProducts);

  function toggleFavorite(productId) {
    setProductsList((currentProductList) => {
      const prodIndex = currentProductList.findIndex((p) => p.id === productId);

      const newFavStatus = !currentProductList[prodIndex].isFavorite;
      const updatedProducts = [...currentProductList];
      updatedProducts[prodIndex] = {
        ...currentProductList[prodIndex],
        isFavorite: newFavStatus
      };
      return updatedProducts;
    });
  }

  return (
    <ProductsContext.Provider
      value={{ products: productsList, toggleFavorite }}
    >
      {children}
    </ProductsContext.Provider>
  );
}
