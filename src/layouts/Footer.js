import { Fragment } from "react";
import { Link } from "react-router-dom";
import classes from '../css/layoutsCss/Footer.module.css'
import ShoplyLogo from '../images/ShoplyLogo.png';
import PlayStoreLogo from '../images/PlayStoreLogo.png';
import React from 'react';


const Footer = () => {


    return <Fragment>
        <div className={classes.footer}>
            <div>
                <div className={classes.playStore}>
                    <img className={classes.img} src={PlayStoreLogo} />
                    <p className={classes.p}>Download the app on PlayStore</p>
                </div>
                <img className={classes.logo} src={ShoplyLogo} />
            </div>
            <div className={classes.list}>
                <ul className={classes.ul}>
                    <li ><Link className={classes.link}>Help</Link></li>
                    <li><Link className={classes.link}>Services</Link></li>
                    <li><Link className={classes.link}>Support</Link></li>
                </ul>
            </div>
        </div>
    </Fragment>
}

export default React.memo(Footer);