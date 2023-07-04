import { Fragment, useEffect } from "react";
import classes from './Review.module.css';
import React from "react";
import jwt_decode from "jwt-decode"
import { useState } from "react";
import ShoplyAxios from "../../apis/ShoplyAxios";
import UserAccount from '../../images/UserAccount.png';
import { notify } from "../Cart/Cart";
import DeleteBin from '../../images/DeleteBin.png';


const Review = (props) => {
        const [showDelete, setShowDelete] = useState(false);;

        const jwt = window.localStorage.getItem('jwt')
        const decoded = jwt ? jwt_decode(jwt) : '';
        const username = decoded.sub


        function deleteButton() {
                if (jwt) {
                        ShoplyAxios.get("/reviews/" + props.id)
                                .then(res => {
                                        if (res.data !=null) {
                                                if (res.data.username === username) {
                                                        setShowDelete(true);
                                                }
                                        }
                                })
                                .catch(error => {
                                        console.log(error);
                                });
                }
        }


        function deleteReview() {
                ShoplyAxios.delete("/reviews/" + props.id)
                        .then(res => {
                                notify(res.data.message, classes.popupGreen)
                                props.reload()
                        })
                        .catch(error => {
                                console.log(error);
                        });
        }


        useEffect(() => deleteButton, [])

        return <Fragment key={props.id}>
                <div className={classes.review}>
                        <img className={classes.accImg} src={UserAccount} />
                        <div className={classes.user}>{props.name}</div>
                        <div className={classes.reviewText}>{props.review}</div>
                        <div className={classes.rating}>{props.rating}</div>
                        {showDelete && <img src={DeleteBin} className={classes.delete} onClick={deleteReview} />}
                </div>
        </Fragment>
}

export default React.memo(Review);
