import { useSelector } from 'react-redux';

import ProductItem from '../components/Products/ProductItem';
import './Products.css';

export default function Products() {
  const { products } = useSelector((state) => {
    return state.products;
  });

  return (
    <>
      <ul className='products-list'>
        {products.map((prod) => (
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
