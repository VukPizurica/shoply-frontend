import { useContext } from 'react';
import { Fragment } from 'react';
import ReactDOM from 'react-dom';
import CartContext from '../../context/cart-context';
import classes from './Modal.module.css';


const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose}/>;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById('overlay-root');

const Modal = (props) => {
  const cartCtx = useContext(CartContext);

  function toggleCart(){
    cartCtx.toggleCart();
  }
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop onClose={toggleCart} />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
