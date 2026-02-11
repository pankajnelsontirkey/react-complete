import { useContext } from 'react';

import { ProductsContext } from '../../context/ProductsContext';
import Card from '../UI/Card';
import './ProductItem.css';

const ProductItem = ({ id, title, isFav, description }) => {
  const { toggleFavorite } = useContext(ProductsContext);

  const toggleFavHandler = () => {
    toggleFavorite(id);
  };

  return (
    <Card style={{ marginBottom: '1rem' }}>
      <div className='product-item'>
        <h2 className={isFav ? 'is-fav' : ''}>{title}</h2>
        <p>{description}</p>
        <button
          className={!isFav ? 'button-outline' : ''}
          onClick={toggleFavHandler}
        >
          {isFav ? 'Un-Favorite' : 'Favorite'}
        </button>
      </div>
    </Card>
  );
};

export default ProductItem;
