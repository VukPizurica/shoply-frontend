import { Form, useNavigate } from "react-router-dom";
import classes from '../css/pages/RegisterPage.module.css';
import React from "react";
import { useReducer } from "react";
import ShoplyAxios from "../apis/ShoplyAxios"
import 'animate.css/animate.min.css';
import { notify } from "../components/Cart/Cart";
import Account from '../images/Account.png';
import { useEffect } from "react";


const initialState = {
    name: '',
    surname: '',
    age: '',
    email: '',
    gender: 'Male',
    password: '',
    confirmPassword: '',
    username: ''
};

const registerReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_NAME':
            return { ...state, name: action.payload };
        case 'UPDATE_SURNAME':
            return { ...state, surname: action.payload };
        case 'UPDATE_AGE':
            return { ...state, age: action.payload };
        case 'UPDATE_EMAIL':
            return { ...state, email: action.payload };
        case 'UPDATE_GENDER':
            return { ...state, gender: action.payload };
        case 'UPDATE_PASSWORD':
            return { ...state, password: action.payload };
        case 'UPDATE_USERNAME':
            return { ...state, username: action.payload };
        case 'UPDATE_CONFIRM_PASSWORD':
            return { ...state, confirmPassword: action.payload };
        default:
            return state;
    }
}


const AccountPage = () => {

    const [state, dispatch] = useReducer(registerReducer, initialState);

    const navigate = useNavigate();

    const password = state.password.length < 7
    const confirmPassword = state.confirmPassword === state.password;


    function checkRegister() {

        const jwt = window.localStorage.getItem('jwt')
        if (jwt) {
            notify('Logged in, log out to register', classes.popupRed)
            navigate('/')
        }
    }

    function submit(event) {
        event.preventDefault();
        register(state)
            .then((res) => {
                window.localStorage.setItem('jwt', res.token);
                window.localStorage.setItem('role', 'ROLE_' + res.role);
                navigate('/');
            })
            .catch((error) => {
                notify(error.message, classes.popupRed)
            }
            );
    }


    function updateState(type, value) {
        const action = {
            type: "UPDATE_" + type,
            payload: value
        }
        dispatch(action)
    }

    useEffect(() => { checkRegister() }, [])

    return <div className={classes.content}>
        <img className={classes.img} src={Account}></img>
        <Form onSubmit={submit} className={classes.form}>
            <p>
                <label htmlFor="name">Name</label>
                <input onChange={(e) => updateState('NAME', e.target.value)} className={classes.inputTitle} id="name" type="text" name="name" required />
            </p>
            <p>
                <label htmlFor="surname">Surname</label>
                <input onChange={(e) => updateState('SURNAME', e.target.value)} className={classes.inputTitle} id="surname" type="text" name="surname" required />
            </p>
            <p>
                <label htmlFor="email">Email</label>
                <input onChange={(e) => updateState('EMAIL', e.target.value)} className={classes.inputTitle} id="email" type="text" name="email" required />
            </p>

            <div className={classes.flex}>
                <div className={classes.gender}>
                    <p>Gender</p>
                    <select onChange={(e) => updateState('GENDER', e.target.value)} className={classes.select}>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                    </select>
                </div>

                <label htmlFor="age">Age</label>
                <input onChange={(e) => updateState('AGE', e.target.value)} className={classes.inputPrice} id="age" type="number" name="age" required />
            </div>
            <p>
                <label htmlFor="username">Create a username</label>
                <input onChange={(e) => updateState('USERNAME', e.target.value)} className={classes.inputTitle} id="username" type="text" name="username" required />
            </p>
            <p>
                <label htmlFor="password">Create Password</label>
                <input onChange={(e) => updateState('PASSWORD', e.target.value)} className={classes.inputTitle} id="password" type="text" name="password" required />
            </p>
            {password && <p className={classes.message}>Password too short</p>}
            <p>
                <label htmlFor="confrimPassword">Confirm password</label>
                <input onChange={(e) => updateState('CONFIRM_PASSWORD', e.target.value)} className={classes.inputTitle} id="confrimPassword" type="text" name="confrimPassword" required />
            </p>
            {!confirmPassword && <p className={classes.message}>Passwords don't match</p>}
            <div className={classes.actions}>
                <button onClick={() => navigate('/')} type="button">Cancel</button>
                <button type='submit'>Sign In</button>
            </div>
        </Form>
    </div>

}


export default React.memo(AccountPage);

export async function register(cred) {
    if (cred.password !== cred.confirmPassword) {
        throw new Error("Passwords don't match");
    }
    if (cred.password.length < 7) {
        throw new Error('Password must be at least 7 characters long');
    }
    try {
        const { data } = await ShoplyAxios.post("users/register", cred);
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


