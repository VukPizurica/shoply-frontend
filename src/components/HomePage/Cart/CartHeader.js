import React, { useContext } from 'react';
import CartContext from '../../../context/cart-context';
import classes from './HeaderCartButton.module.css';
import Cart from '../../../images/Cart.png';

const CartHeader = (props) => {

  const ctx = useContext(CartContext);

  const numberOfCartItems = ctx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  return (
    <button onClick={props.onClick} className={classes.button}>
      <span className={classes.icon} >
        <img className={classes.cart} alt = '' src={Cart}/>
      </span>
      <span>Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default React.memo(CartHeader);
