import { useSelector } from 'react-redux';

import FavoriteItem from '../components/Favorites/FavoriteItem';
import './Products.css';

export default function Favorites() {
  const favoriteProducts = useSelector((state) => {
    const { products } = state.products;

    return products.filter((p) => p.isFavorite);
  });

  let content = <p className='placeholder'>Got no favorites yet!</p>;
  if (favoriteProducts.length > 0) {
    content = (
      <ul className='products-list'>
        {favoriteProducts.map((prod) => (
          <FavoriteItem
            key={prod.id}
            id={prod.id}
            title={prod.title}
            description={prod.description}
          />
        ))}
      </ul>
    );
  }
  return content;
}
