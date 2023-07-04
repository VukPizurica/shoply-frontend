import { useEffect, useReducer, useState } from 'react';
import { Form, useNavigate, useParams } from 'react-router-dom';
import ShoplyAxios from '../../apis/ShoplyAxios';
import jwt_decode from "jwt-decode"
import useRedirect from '../../hooks/use-redirect';
import classes from './SellerPostEdit.module.css';
import 'animate.css/animate.min.css';
import { notify } from '../Cart/Cart';
import React from 'react';

const initialState = {
    id: '',
    title: '',
    image: 'https://t3.ftcdn.net/jpg/01/91/95/30/360_F_191953033_gehQATeDoh5z6PyRDbeKyBZuS83CjMEF.jpg',
    views: 'MALE',
    date: '',
    category: '',
    price: 0,
    reviews: []
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
        case 'UPDATE_ALL':
            return { ...state, ...action.payload };
        default:
            return state;
    }
}


const SellerPostEdit = () => {

    useRedirect('/login')
    const params = useParams();

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
            id: state.id,
            title: state.title,
            price: state.price,
            description: description,
            username: username,
            category: state.category,
            image: state.image
        }

        ShoplyAxios.put('/posts/update', action)
            .then(res => {
                notify(res.data.message, classes.popupGreen)
                navigate('/myPosts');
            })
            .catch(error => {
                console.log(error);
            });
    }

    function getCategories() {
        ShoplyAxios.get('/posts/allCategories')
            .then(res => {
                setCategories(res.data)
            })
            .catch(error => {
                console.log(error);
            });
    }



    function getPost() {
        ShoplyAxios.get('/posts/' + params.id + '?jwt=' + jwt)
            .then(res => {
                const data = res.data
                const action = {
                    type: "UPDATE_ALL",
                    payload: {
                        id: data.id,
                        title: data.title,
                        image: data.image,
                        views: data.views,
                        date: data.date,
                        category: data.category,
                        reviews: data.reviews,
                        price: data.price
                    }
                }
                dispatch(action)
                setDescription(data.description)
            })
            .catch(() => {
                notify('Product does not exist or belongs to other seller', classes.popupRed)
                navigate('/myPosts')
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

    useEffect(() => getPost(), [])

    useEffect(() => {
        setCharCount(description.length);
    }, [description]);



    return (<div className={classes.content}>
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

            <div className={classes.category}>
                <p>Category</p>
                <select onChange={(e) => updateState('CATEGORY', e.target.value)} value={state.category} className={classes.select}>
                    {categories?.map((category) => (<option key={category}>{category}</option>))}
                </select>
            </div>

            <p>
                <label htmlFor="image">Image </label>
                <input onChange={(e) => updateState('IMAGE', e.target.value)} value={state.image} className={classes.inputTitle} id="image" type="text" name="image" />
            </p>

            <label className={classes.labelFlex} htmlFor="price">Price ($)</label>
            <input onChange={(e) => updateState('PRICE', e.target.value)} value={state.price} className={classes.inputPrice} id="price" type="number" name="price" required />

            <div className={classes.actions}>
                <button onClick={() => navigate('/myPosts')} type="button">Cancel</button>
                <button className={classes.disabled} disabled={!changed} type="sumbit">Save</button>
            </div>
        </Form>
    </div>

    );
}

export default React.memo(SellerPostEdit);
