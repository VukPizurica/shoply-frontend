import React, { Fragment, useRef, useState } from "react";
import { Form, Link, useNavigate } from "react-router-dom";
import classes from '../css/pages/LoginPage.module.css';
import { login } from "../services/auth";
import 'animate.css/animate.min.css';
import { notify } from "../components/Cart/Cart";
import { useEffect } from "react";


const AccountPage = () => {

    const name = useRef();
    const password = useRef();

    const navigate = useNavigate();

    function checkLogin() {

        const jwt = window.localStorage.getItem('jwt')
        if (jwt) {
            notify('Already logged in', classes.popupRed)
            navigate('/')
        }
    }

    function sumbitHandler(event) {
        event.preventDefault();
        login(name.current.value, password.current.value)
            .then(() => {
                navigate('/')
            })
            .catch((error) => {
                console.log(error);
                notify('Wrong username or password', classes.popupRed)
            });
    }
    function fillLogin(username, pass) {
        name.current.value = username
        password.current.value = pass
    }

    useEffect(checkLogin, [])

    return <Fragment>


        <Form onSubmit={sumbitHandler} method='POST' className={classes.form}>
            <p>
                <label htmlFor="username">Username</label>
                <input ref={name} id="username" type="text" name="username" required />
            </p>
            <p>
                <label htmlFor="password">Password</label>
                <input ref={password} id="password" type="text" name="password" required />
            </p>
            <div className={classes.actions}>
                <Link to='/register' className={classes.link}>Register</Link>
                <button type="button" onClick={() => navigate('/')}>Cancel</button>
                <button>Login</button>

            </div >

            <div className={classes.testData}>
                <p className={classes.testDataTitle}>Test Data</p>
                <div className={classes.testDataUsers}>
                    <div className={classes.testDataContainer} onClick={() => fillLogin('kaylaperez87', 'password1')}>
                        <p className={classes.testDataLabel} >Buyer</p>
                        <p>Username: kaylaperez87</p>
                        <p>Password : password1</p>
                    </div>
                    <div className={classes.testDataContainer} onClick={() => fillLogin('demo123', 'demo123')} >
                        <p className={classes.testDataLabel} >Seller</p>
                        <p>Username: demo123</p>
                        <p>Password : demo123</p>
                    </div>

                </div>
            </div>
        </Form>
    </Fragment>

}


export default React.memo(AccountPage);

