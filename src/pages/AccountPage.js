import { Fragment, useEffect, useReducer, useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import ShoplyAxios from "../apis/ShoplyAxios";
import classes from '../css/pages/AccountPage.module.css';
import jwt_decode from "jwt-decode"
import React from "react";
import { countriesList } from "../data/countriesList";
import useRedirect from "../hooks/use-redirect";
import 'animate.css/animate.min.css';
import Account from '../images/Account.png';
import { notify } from "../components/Cart/Cart";

const initialState = {
    name: '',
    surname: '',
    age: '',
    email: '',
    gender: 'MALE',
    password: '',
    username: '',
    country: ''
};
const registerReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_NAME':
            return { ...state, name: action.payload };
        case 'UPDATE_SURNAME':
            console.log(state)
            return { ...state, surname: action.payload };
        case 'UPDATE_AGE':
            return { ...state, age: action.payload };
        case 'UPDATE_EMAIL':
            return { ...state, email: action.payload };
        case 'UPDATE_GENDER':
            return { ...state, gender: action.payload };
        case 'UPDATE_USERNAME':
            return { ...state, username: action.payload };
        case 'UPDATE_CONFIRM_PASSWORD':
            return { ...state, password: action.payload };
        case 'UPDATE_COUNTRY':
            return { ...state, country: action.payload };
        case 'UPDATE_ALL':
            return { ...state, ...action.payload };
        default:
            return state;
    }
}

const AccountPage = () => {

    useRedirect('/login');

    const [state, dispatch] = useReducer(registerReducer, initialState);
    const [changed, setChanged] = useState(true);
    const [actions, setActions] = useState(true);
    const navigate = useNavigate();
    const [showBecomeSeller, setShowBecomeSeller] = useState(false)


    const role = localStorage.getItem('role');
    const jwt = localStorage.getItem('jwt');


    const decoded = jwt ? jwt_decode(jwt) : null;
    const username = decoded ? decoded.sub : null

    function getUser() {
        ShoplyAxios.get('/users/getUser/' + username)
            .then(res => {
                const data = res.data
                const user = {
                    name: data.name,
                    surname: data.surname,
                    age: data.age,
                    email: data.email,
                    gender: data.gender,
                    username: data.username,
                    password: '',
                    country: 'Serbia'
                };
                dispatch({ type: "UPDATE_ALL", payload: user })
            })
            .catch(error => {
                console.log(error)
            });
    }


    function updateState(type, value) {
        setChanged(false)
        const action = {
            type: "UPDATE_" + type,
            payload: value
        }
        dispatch(action)
    }


    function submit(event, type) {
        event.preventDefault();
        if (type === 'update') {
            console.log('update')
            updateUser(state)
                .then((res) => {
                    notify(res.message, classes.popupGreen)
                    console.log(res.message)
                    navigate('/');
                })
                .catch((error) => {
                    notify(error.message, classes.popupRed)
                }
                );
        } else if (type === 'becomeSeller') {
            event.preventDefault();
            becomeSeller(state)
                .then((res) => {
                    notify(res.message, classes.popupGreen)
                    window.localStorage.setItem('role', res.role)
                    window.localStorage.setItem('jwt', res.token)
                    navigate('/');
                })
                .catch((error) => {
                    notify(error.message, classes.popupRed)
                    console.log(error);
                }
                );
        } else if (type === 'updateSeller') {
            console.log('updateSeller')
            event.preventDefault();
            updateSeller(state)
                .then((res) => {
                    notify(res.message, classes.popupGreen)
                    navigate('/');
                })
                .catch((error) => {
                    notify(error.message, classes.popupRed)
                }
                );
        } else {
            console.log('An unknown error occuter');
        }

    }


    function switchSeller() {
        setShowBecomeSeller(!showBecomeSeller)
        setActions(!actions)
    }

    useEffect(() => getUser(), [])


    if (role === 'ROLE_SELLER') {
        return (
            <Fragment>

                <div className={classes.content}>
                    <img className={classes.img} src={Account} />
                    <Form method="POST" className={classes.form}>
                        <p>
                            <label htmlFor="username">Username</label>
                            <input readOnly value={state.username} className={classes.username} id="username" type="text" name="username" required />
                        </p>
                        <p>
                            <label htmlFor="name">Name</label>
                            <input onChange={(e) => updateState('NAME', e.target.value)} id="name" type="text" value={state.name} name="name" required />
                        </p>
                        <p>
                            <label htmlFor="surname">Surname</label>
                            <input onChange={(e) => updateState('SURNAME', e.target.value)} id="surname" defaultValue={state.surname} type="text" name="surname" required />
                        </p>
                        <p>
                            <label htmlFor="email">Email</label>
                            <input onChange={(e) => updateState('EMAIL', e.target.value)} value={state.email} id="email" type="text" name="email" required />
                        </p>
                        <select onChange={(e) => updateState('GENDER', e.target.value)} value={state.gender} className={classes.accountSelect}>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                        </select>
                        <p>
                            <label htmlFor="age">Age</label>
                            <input onChange={(e) => updateState('AGE', e.target.value)} value={state.age} className={classes.age} id="age" type="number" name="age" required />
                        </p>
                        <div className={classes.flex}>
                            <p>Country</p>
                            <select onChange={(e) => updateState('COUNTRY', e.target.value)} value={state.country} className={classes.sellerFormSelect}>
                                {countriesList.map(country => <option key={country}>{country}</option>)}
                            </select>
                        </div>
                        <p>
                            <label className={classes.inputTitle} htmlFor="password">Confirm password</label>
                            <input onChange={(e) => updateState('CONFIRM_PASSWORD', e.target.value)} value={state.password} className={classes.inputTitle} id="password" type="password" name="password" required />
                        </p>
                        <div className={classes.actions}>
                            <button onClick={() => navigate('/')} type="button">Cancel</button>
                            <button className={classes.disabled} disabled={changed} onClick={(e) => submit(e, 'updateSeller')}>Save</button>
                        </div>
                    </Form>
                </div>
            </Fragment>
        );

    } else if (role === 'ROLE_BUYER') {
        return <div><div className={classes.content}>
            <img className={classes.img} src={Account}  ></img>
            <Form method="POST" className={classes.form} >

                <p>
                    <label htmlFor="username">Username</label>
                    <input readOnly value={state.username} className={classes.username} id="username" type="text" name="username" required />
                </p>
                <p>
                    <label htmlFor="name">Name</label>
                    <input onChange={(e) => updateState('NAME', e.target.value)} id="name" type="text" value={state.name} name="name" required />
                </p>
                <p>
                    <label htmlFor="surname">Surname</label>
                    <input onChange={(e) => updateState('SURNAME', e.target.value)} id="surname" defaultValue={state.surname} type="text" name="surname" required />
                </p>
                <p>
                    <label htmlFor="email">Email</label>
                    <input onChange={(e) => updateState('EMAIL', e.target.value)} value={state.email} id="email" type="text" name="email" required />
                </p>
                <select onChange={(e) => updateState('GENDER', e.target.value)} value={state.gender} className={classes.accountSelect}>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                </select>
                <p>
                    <label htmlFor="age">Age</label>
                    <input onChange={(e) => updateState('AGE', e.target.value)} value={state.age} className={classes.age} id="age" type="number" name="age" required />
                </p>

                {actions && <div className={classes.actions}>
                    <button onClick={() => navigate('/')} type="button">Cancel</button>
                    <button className={classes.disabled} disabled={changed} onClick={(e) => submit(e, 'update')}>Save</button>
                </div>}

                {actions && <button onClick={switchSeller} className={classes.link} to='/becomeseller'>Become a seller</button>}
            </Form>

        </div>
            {showBecomeSeller && <Form method="POST" className={classes.sellerForm}>
                <div className={classes.flex}>
                    <p>Country</p>
                    <select onChange={(e) => updateState('COUNTRY', e.target.value)} value={state.country} className={classes.sellerFormSelect}>
                        {countriesList.map(country => <option key={country}>{country}</option>)}
                    </select>
                </div>
                <p>
                    <label className={classes.inputTitle} htmlFor="password">Confirm password</label>
                    <input onChange={(e) => updateState('CONFIRM_PASSWORD', e.target.value)} value={state.password} className={classes.inputTitle} id="password" type="password" name="password" required />
                </p>
                <div className={classes.sellerActions}>
                    <button className={classes.sellerActionsButton} onClick={switchSeller} type="button">Cancel</button>
                    <button className={classes.sellerActionsButton} type='submit' onClick={(e) => submit(e, 'becomeSeller')}>Become a seller</button>
                </div>
            </Form>
            }
        </div>
    } else {
        navigate('/login')
    }



}

export default React.memo(AccountPage);

export async function becomeSeller(cred) {
    try {
        const { data } = await ShoplyAxios.post("users/becomeSeller", cred);
        return data;
    } catch (error) {
        if (error.response) {
            const errorMessage = error.response.data.message;
            throw new Error(errorMessage);
        } else {
            throw error;
        }
    }
}

export async function updateUser(cred) {
    try {
        const { data } = await ShoplyAxios.post("users/updateUser", cred);
        return data;
    } catch (error) {
        if (error.response) {
            const errorMessage = error.response.data.message;
            throw new Error(errorMessage);
        } else {
            throw error;
        }
    }
}

export async function updateSeller(cred) {
    try {
        const { data } = await ShoplyAxios.post("users/updateSeller", cred);
        return data;
    } catch (error) {
        if (error.response) {
            const errorMessage = error.response.data.message;
            throw new Error(errorMessage);
        } else {
            throw error;
        }
    }
}




