import { useState } from 'react';
import { Link } from 'react-router-dom';
import AccountMenu from '../components/HomePage/Account/AccountMenu';
import React from 'react';
import classes from '../css/layoutsCss/MainHeader.module.css';
import ShoplyLogo from '../images/ShoplyLogo.png';


function MainHeaderUser() {
    const [active, setActive] = useState(false);

    function showMenu() {
        setActive(!active);
    }
    return (
        <div className={classes.container}>
            <div className={classes.nav}>
                <Link to='/'><img className={classes.logo} alt='logo.svg' src={ShoplyLogo} /></Link>
                {active && <AccountMenu active={active} />}
                <ul className={classes.ul} >
                    <li className={classes.link}><Link to='/login' className={classes.link}>Login</Link></li>
                </ul>

            </div>
        </div>
    );
}

export default React.memo(MainHeaderUser);
