import { useEffect } from "react";
import { useState } from "react";
import { Fragment } from "react";
import Review from "./Review";
import classes from './Review.module.css';
import React from "react";
import jwt_decode from "jwt-decode"
import ShoplyAxios from "../../apis/ShoplyAxios";
import RatingStarsComponent from 'react-rating-stars-component';
import { notify } from '../Cart/Cart';


const Reviews = (props) => {
    const [totalRating, setTotalRating] = useState(0);
    const [ratingLength, setRatingLength] = useState(0);
    const [showReview, setShowReview] = useState(false);
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(3.5);

    const jwt = window.localStorage.getItem('jwt')


    function handleChange(value) {
        setRating(value);
    };


    function checkForReview() {
        if (jwt) {
            const decoded = jwt_decode(jwt);
            const username = decoded.sub
            ShoplyAxios.get('/sales/checkForReview?username=' + username + "&postId=" + props.id)
                .then(res => {
                    setShowReview(res.data)
                })
                .catch(error => {
                    console.log(error);
                });
        }

    }

    function submitReview(event) {
        event.preventDefault()
        const decoded = jwt_decode(jwt);
        const username = decoded.sub
        const action = {
            username: username,
            review: review,
            rating: rating,
            postId: props.id,
        }

        ShoplyAxios.post('/reviews/create', action)
            .then(res => {
                notify(res.data.message, classes.popupGreen)
                props.reload()
                setReview('')
            })
            .catch((error) => {
                if (error.response && error.response.status === 400) {
                    notify(error.response.data.message, classes.popupRed)
                }
            });
    }


    function updateReview(event) {
        setReview(event.target.value)
    }



    function calculateTotalRating() {
        let reviewSum = 0;
        let totalRating = 0;
        let ratingLength = 0;
        if (props.reviews) {
            const ratings = props.reviews.map((review) => review.rating);
            if (ratings.length > 0) {
                reviewSum = ratings.reduce(
                    (accumulator, currentValue) => accumulator + currentValue,
                    0
                );
                totalRating = (reviewSum / ratings.length).toFixed(1);
                ratingLength = `(${ratings.length})`;
            } else {
                totalRating = 0
                ratingLength = '(0)'
            }
        }
        setTotalRating(totalRating);
        setRatingLength(ratingLength);
    }



    useEffect(() => {
        checkForReview();
        calculateTotalRating();
    }, [props.reviews]);



    return <Fragment>

        <div className={classes.reviews}>
            <h1> Reviews</h1>
            <h2>Total Rating: {totalRating} {ratingLength} </h2>
        </div>

        {props.reviews.map(review => (<Review reload={props.reload} key={review.id} id={review.id} name={review.nameAndSurname} rating={review.rating} review={review.review} />))}


        {showReview &&

            <form onSubmit={submitReview} className={classes.reviewForm}>
                <label className={classes.reviewLabel} htmlFor="review">Leave a review</label>
                <textarea onChange={updateReview} value={review} maxLength='200' className={classes.reviewInput} name="review" id="review" type="text" />

                <div className={classes.flex}>
                    <label className={classes.label} htmlFor="rating">Rating</label>
                    <div className={classes.starsContainer}>
                        <div className={classes.stars}>
                            <RatingStarsComponent
                                count={5}
                                onChange={handleChange}
                                size={35}
                                isHalf={true}
                                edit={true}
                                value={rating}
                                defaultValue={3.5}
                            />
                        </div>
                    </div>
                    <div className={classes.valueContainer}>{rating}</div>

                </div>



                <button className={classes.submitButton} type="submit">Submit</button>
            </form>
        }


    </Fragment>
}

export default React.memo(Reviews);

