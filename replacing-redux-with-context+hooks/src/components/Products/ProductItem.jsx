// import { useContext } from 'react';
import { memo } from 'react';

// import { ProductsContext } from '../../context/ProductsContext';

import { useStore } from '../../hooks-store/store';
import Card from '../UI/Card';
import './ProductItem.css';

const ProductItem = ({ id, title, isFav, description }) => {
  // const { toggleFavorite } = useContext(ProductsContext);
  const [_state, dispatch] = useStore(false);

  const toggleFavHandler = () => {
    // toggleFavorite(id);
    dispatch('TOGGLE_FAV', id);
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

export default memo(ProductItem);
