import { forwardRef, Fragment, useEffect, useImperativeHandle } from "react";
import classes from './Filters.module.css';
import { useDispatch, useSelector } from "react-redux";
import { postActions } from "../../../store/postSlice";
import { useState } from "react";
import React from "react";


const TimeFilter = forwardRef((props, ref) => {


    const filteredPosts = useSelector(state => state.posts.filteredPosts)
    const posts = useSelector(state => state.posts.posts)
    const timeChanged = useSelector(state => state.posts.timeChanged)
    const mode = useSelector(state => state.posts.timeMode)

    const dispatch = useDispatch();

    const unsortedPosts = [...filteredPosts]


    function filterByTime() {
        dispatch(postActions.setTimeMode(!mode))
        dispatch(postActions.setTimeChanged(true))
        if (mode === false) {
            const array = sortDsc([...filteredPosts]);
            dispatch(postActions.setFilteredPosts(array));
        } else {
            const array = sortAsc([...filteredPosts]);
            dispatch(postActions.setFilteredPosts(array));
        }
        props.showClearAll()
    }






    function clear(reload) {

        dispatch(postActions.setTimeMode(false))
        dispatch(postActions.setTimeChanged(false))
        if (reload) {
            dispatch(postActions.setFilteredPosts(posts))
        }

        dispatch(postActions.setFilteredPosts(unsortedPosts))

    }

    useImperativeHandle(ref, () => ({
        clear
    }));


    return <Fragment>
        <div className={classes.Time}>
            {timeChanged && <button onClick={clear} className={classes.TimeCancel}>X</button>}
            <button onClick={filterByTime} className={classes.TimeButton}> {mode ? 'Oldest' : 'Newest'}</button>
        </div>
    </Fragment>
})
export default React.memo(TimeFilter);

export function sortAsc(list) {
    return list.sort((a, b) => new Date(a.date) - new Date(b.date));
}

export function sortDsc(list) {
    return list.sort((a, b) => new Date(b.date) - new Date(a.date));
}
