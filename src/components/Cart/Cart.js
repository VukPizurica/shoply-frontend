import React, { useContext } from 'react';
import jwt_decode from "jwt-decode"
import Modal from './Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../context/cart-context';
import useRedirect from '../../hooks/use-redirect';
import ShoplyAxios from '../../apis/ShoplyAxios';
import 'animate.css/animate.min.css';
import Swal from 'sweetalert2'

const Cart = (props) => {

  useRedirect('/login')
  const ctx = useContext(CartContext);

  const totalAmount = `$${ctx.totalAmount.toFixed(2)}`;
  const hasItems = ctx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    ctx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    ctx.addItem({ ...item, amount: 1 });
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {ctx.items.map((item) => (
        <CartItem
          key={item.id}
          title={item.title}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );


  function toggleCart() {
    ctx.toggleCart();
  }

  function order() {
    const items = ctx.items;
    const jwt = localStorage.getItem('jwt');
    const decoded = jwt_decode(jwt);
    const username = decoded.sub;

    const posts = {};

    for (const item of items) {
      posts[item.id] = item.amount;
    }

    const order = {
      posts: posts,
      username: username
    }

    ShoplyAxios.post('/sales/create', order)
      .then(res => {
        notify(res.data.message,classes.popupGreen)
        ctx.resetCart()
        setTimeout(()=>window.location.reload(),1000)
      })
      .catch(error => {
        console.log(error);
      });
  }


  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={toggleCart}>
          Close
        </button>
        {hasItems && <button onClick={order} className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default React.memo(Cart);

export function notify(message,className){
  Swal.close();
  Swal.fire({
    html: message,
    timer: 1500,
    position: 'top',
    background: 'white',
    allowOutsideClick: false,
    showConfirmButton: false,
    backdrop: false,
    customClass: {
      popup: className
    },
    showClass: {
      popup: 'animate__animated animate__slideInDown animate__faster',
    },
    hideClass: {
      popup: 'animate__animated animate__slideOutUp animate__faster'
    },
  });
}
