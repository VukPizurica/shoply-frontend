import { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import classes from './Post.module.css';
import Reviews from "../../PostPage/Reviews";
import ShoplyAxios from "../../../apis/ShoplyAxios";
import React from "react";
import { getDiffInDays } from "./PostsList";
import useHeader from "../../../hooks/use-header";
import CartContext from "../../../context/cart-context";
import SellerAccount from '../../../images/SellerAccount.png';
import { notify } from "../../Cart/Cart";


const Post = () => {

    const header = useHeader();
    const param = useParams();
    
    const [post, setPost] = useState({});
    const [reviews, setReviews] = useState([]);
    const [send, setSend] = useState(false);

    const navigate = useNavigate();

    const ctx = useContext(CartContext);

    const jwt = window.localStorage.getItem('jwt')

    function getPost() {
        ShoplyAxios.get(`/posts/${param.id}?increment=true`)
            .then(res => {
                setPost(res.data);
            })
            .catch(error => {
                notify('Product does not exist', classes.popupRed)
                navigate('/')
            });
    }


    function getReviews() {
        ShoplyAxios.get('/reviews/post/' + param.id)
            .then(
                res => {
                    setReviews(res.data)
                }).catch(error => {
                    console.log(error);
                });
    }

    function addItemToCart() {

        const action = {
            id: post.id,
            title: post.title,
            price: post.price,
            amount: 1
        }
        ctx.addItem(action)
    }

    function sendRequest() {
        if (send) {
            getPost()
            getReviews()
        }
    }

    useEffect(() => setSend(true), [])
    useEffect(() => sendRequest(), [send])

    return <Fragment>
        {header}
        <div>
            <div className={classes.post}>
                <img src={post.image} alt={post.title} className={classes.img} />
                <div className={classes.content}>
                    <h1 className={classes.h1}>{post.title}</h1>
                    <p className={classes.p}>{post.description}</p>


                </div>
                <h2>${post.price}</h2>
            </div>
            <p className={classes.date}>{getDiffInDays(post.date)}</p>
            <div className={classes.seller}>
                <img className={classes.sellerImg} alt="seller.jpg" src={SellerAccount} />
                <p>Seller: {post.username}</p>
            </div>
            <div>
            {jwt && <button onClick={addItemToCart} className={classes.button}>Add to Cart</button>}

            </div>
            <div>
                <Reviews reload={getReviews} id={param.id} reviews={reviews} />
            </div>
        </div>
    </Fragment>
}

export default React.memo(Post);