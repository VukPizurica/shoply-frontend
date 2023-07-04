import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ShoplyAxios from '../../apis/ShoplyAxios';
import useRedirect from '../../hooks/use-redirect';
import { notify } from '../Cart/Cart';
import classes from './SellerPost.module.css';
import React from 'react';


const SellerPost = () => {

    useRedirect('/login')
    const params = useParams();
    const navigate = useNavigate();

    const [post, setPost] = useState({});
    const [reviews, setReviews] = useState([]);
    const [averageRating, setAverageRating] = useState();

    const jwt = window.localStorage.getItem('jwt')

    useEffect(() => {
        function getData() {
            ShoplyAxios.get('/posts/' + params.id + '?jwt=' + jwt)
                .then((res) => {
                    setPost(res.data);
                })
                .catch((error) => {
                    notify('Product does not exist or belongs to other seller', classes.popupRed)
                    navigate('/myPosts')
                });

            ShoplyAxios.get('/reviews/post/' + params.id)
                .then((res) => {
                    setReviews(res.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        getData();
    }, [params.id]);


    useEffect(() => {
        if (reviews.length === 0) {
            setAverageRating('No reviews yet');
        } else {
            const ratings = reviews.map(review=>review.rating)
            const sum = ratings.reduce((acc, rating) => acc + rating, 0);
            const average = sum / ratings.length;
            setAverageRating(average.toFixed(1)); 
        }
    }, [reviews])


    let reviewsShow = <p>No Reviews.</p>

    if (reviews.length !== 0) {
        reviewsShow = reviews.map((review) => (
            <div key={review.id} className={classes.review}>
                <div className={classes.user}>{review.nameAndSurname}</div>
                <div className={classes.reviewText}>{review.review}</div>
                <div className={classes.rating}>{review.rating}</div>
            </div>
        ))
    }


    return (
        <div className={classes.container}>

            <div className={classes.flex}>
                <img className={classes.image} src={post.image} alt={post.title} />
                <div>
                    <p className={classes.title}>{post.title}</p>
                    <p className={classes.description}>{post.description}</p>
                    <p className={classes.category}>Category: {post.category}</p>
                    <p className={classes.views}>Views: {post.views}</p>
                    <p className={classes.price}>Price: ${post.price}</p>
                    <button onClick={(e) => { e.stopPropagation(); e.preventDefault(); navigate('/myPosts/edit/' + post.id) }} className={classes.button}>Edit</button>
                </div>
            </div>
            <div className={classes.reviews}>
                <h2 className={classes.h2}>Reviews</h2>
                <p className={classes.totalRating}>Average Rating: {averageRating}</p>
                {reviewsShow}
            </div>


        </div>
    );
};

export default React.memo(SellerPost);
