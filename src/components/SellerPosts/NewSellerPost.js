import { useEffect, useReducer, useState } from 'react';
import { Form, useNavigate, useParams } from 'react-router-dom';
import ShoplyAxios from '../../apis/ShoplyAxios';
import jwt_decode from "jwt-decode"
import classes from './SellerPostEdit.module.css';
import useRedirect from '../../hooks/use-redirect';
import 'animate.css/animate.min.css';
import { notify } from '../Cart/Cart';
import React from 'react';



const initialState = {
    title: '',
    image: 'https://t3.ftcdn.net/jpg/01/91/95/30/360_F_191953033_gehQATeDoh5z6PyRDbeKyBZuS83CjMEF.jpg',
    category: '',
    price: 1
};

const registerReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_TITLE':
            return { ...state, title: action.payload };
        case 'UPDATE_PRICE':
            return { ...state, price: action.payload };
        case 'UPDATE_CATEGORY':
            return { ...state, category: action.payload };
        case 'UPDATE_IMAGE':
            return { ...state, image: action.payload };
        default:
            return state;
    }
}
const SellerPostNew = () => {
    useRedirect('/login')

    const [state, dispatch] = useReducer(registerReducer, initialState);
    const [categories, setCategories] = useState([]);
    const [changed, setChanged] = useState(false);


    const [description, setDescription] = useState("");
    const [charCount, setCharCount] = useState(0);

    const navigate = useNavigate();



    const jwt = localStorage.getItem('jwt');
    const decoded = jwt_decode(jwt);
    const username = decoded.sub


    function save(event) {
        event.preventDefault()
        const action = {
            title: state.title,
            price: state.price,
            description: description,
            username: username,
            category: state.category,
            image: state.image
        }

        ShoplyAxios.post('/posts/create', action)
            .then(res => {
                notify(res.data.message, classes.popupGreen)
                navigate('/myPosts')
                })
            .catch(error => {
                notify(error.message, classes.popupRed)
            });
        console.log(state)
    }

    function getCategories() {
        ShoplyAxios.get('/posts/allCategories')
            .then(res => {
                setCategories(res.data)
                updateState('CATEGORY', res.data[0])
            })
            .catch(error => {
                console.log(error);
            });
    }

    function updateState(type, value) {
        setChanged(true)
        const action = {
            type: "UPDATE_" + type,
            payload: value
        }
        dispatch(action)
    }


    function handleChange(event) {
        setChanged(true)
        setDescription(event.target.value);
    }

    useEffect(() => getCategories(), []);

    useEffect(() => {
        setCharCount(description.length);
    }, [description]);


    return (
        <div className={classes.content}>
            <img className={classes.img} src={state.image} alt={state.title} />
            <Form method='PUT' onSubmit={save} className={classes.form}>
                <p>
                    <label htmlFor="title">Title</label>
                    <input onChange={(e) => updateState('TITLE', e.target.value)} value={state.title} className={classes.inputTitle} id="title" type="text" name="title" required />
                </p>
                <div>
                    <label htmlFor="description" >Description</label>
                    <textarea className={classes.textArea} value={description}
                        onChange={handleChange} placeholder="Description..." maxLength='350' id="description" type="text" name="description" required />
                    <div className={classes.count}>{charCount}/350</div>
                </div>

                <p>
                    <label htmlFor="image">Image (Optional)</label> <p className={classes.details}>*By default, it's a plain white image</p>
                    <input onChange={(e) => updateState('IMAGE', e.target.value)} value={state.image} placeholder="https://..." className={classes.inputTitle} id="image" type="text" name="image" />

                </p>

                <div className={classes.category}>
                    <p>Category</p>
                    <select onChange={(e) => updateState('CATEGORY', e.target.value)} defaultValue={categories[1]} value={state.category} className={classes.select}>
                        {categories?.map((category) => (<option key={category}>{category}</option>))}
                    </select>
                </div>
                <label className={classes.labelFlex} htmlFor="price">Price ($)</label>
                <input onChange={(e) => updateState('PRICE', e.target.value)} min='1' step='0.01' placeholder="1.0" value={state.price} className={classes.inputPrice} id="price" type="number" name="price" required />



                <div className={classes.actions}>
                    <button onClick={() => navigate('/myPosts')} type="button">Cancel</button>
                    <button className={classes.disabled} disabled={!changed} type="sumbit">Save</button>
                </div>
            </Form>
        </div>
    );
}

export default React.memo(SellerPostNew);
