// import { useContext } from 'react';

import ProductItem from '../components/Products/ProductItem';
// import { ProductsContext } from '../context/ProductsContext';
import { useStore } from '../hooks-store/store';
import './Products.css';

export default function Products() {
  // const { products } = useContext(ProductsContext);
  const [state] = useStore();

  return (
    <>
      <ul className='products-list'>
        {state.products.map((prod) => (
          <ProductItem
            key={prod.id}
            id={prod.id}
            title={prod.title}
            description={prod.description}
            isFav={prod.isFavorite}
          />
        ))}
      </ul>
    </>
  );
}
