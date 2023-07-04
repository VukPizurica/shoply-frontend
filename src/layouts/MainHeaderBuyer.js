import { useContext, useRef } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import AccountMenu from '../components/HomePage/Account/AccountMenu';
import CartHeader from '../components/HomePage/Cart/CartHeader';
import React from 'react';
import classes from '../css/layoutsCss/MainHeader.module.css';
import CartContext from '../context/cart-context';
import Cart from '../components/Cart/Cart';
import Account from '../images/Account.png';
import ShoplyLogo from '../images/ShoplyLogo.png';


function MainHeaderBuyer() {
    const [active, setActive] = useState(false);

    const ctx = useContext(CartContext);

    const accRef = useRef();

    window.addEventListener('click', (event) => {
        if (event.target != accRef.current) {
            setActive(false)
        }
    })

    function toggleCart() {
        ctx.toggleCart();
    }

    function showMenu() {
        setActive(true);
    }
    function hideMenu() {
        setTimeout(() => {
            setActive(false);
        }, 300);
    }
    const links = ['Account', 'Logout']

    return (
        <div className={classes.container}>
            <div className={classes.nav}>

                {ctx.showCart && <Cart />}
                <Link to='/'><img ref={accRef} className={classes.logo} alt='logo.svg' src={ShoplyLogo} /></Link>
                <ul className={classes.ul} >
                    <li>  <CartHeader onClick={toggleCart} /></li>
                    <li onMouseEnter={showMenu} > <img className={classes.account} alt='logo.svg' src={Account} /></li>
                </ul>
                {active && <AccountMenu links={links} onMouseOver={showMenu} onMouseLeave={hideMenu} />}
            </div>
        </div>
    );

}

export default React.memo(MainHeaderBuyer);
