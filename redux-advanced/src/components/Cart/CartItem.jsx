import { useDispatch } from 'react-redux';

import { cartActions } from '../../store/cart-slice';
import classes from './CartItem.module.css';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const { id, title, quantity, totalPrice, price } = item;

  const handleIncrementQuantity = () => {
    dispatch(cartActions.addItemToCart(item));
  };

  const handleDecrementQuantity = () => {
    dispatch(cartActions.removeItemFromCart(id));
  };

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${totalPrice?.toFixed(2)}{' '}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={handleDecrementQuantity}>-</button>
          <button onClick={handleIncrementQuantity}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
