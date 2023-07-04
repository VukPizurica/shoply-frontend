import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShoplyAxios from "../../../apis/ShoplyAxios";
import { postActions } from "../../../store/postSlice";
import classes from './Category.module.css';
import React from "react";

const Category = (props) => {

    const [active, setActive] = useState(false);
    const [clear, setClear] = useState(false);

    const dispatch = useDispatch();

    const activeCategory = useSelector(state => state.posts.activeCategory);
    const rerenderFilters = useSelector(state => state.posts.rerenderFilters)
    const posts = useSelector(state => state.posts.posts)
    const filteredPosts = useSelector(state => state.posts.filteredPosts)



    const getPostsByCategory = () => {
        ShoplyAxios.get('/posts/category/' + props.category)
            .then(res => {

                dispatch(postActions.setCategory(props.category))
                dispatch(postActions.setFilteredPosts(res.data.content))
                dispatch(postActions.setTimeChanged(false))
                dispatch(postActions.setTimeMode(false))
                dispatch(postActions.setTotalPages(res.totalPages))
            })
            .catch(error => {
                console.log(error);
            });
    }

    const handleCategoryClick = () => {
        dispatch(postActions.setActivePage(1))
        if (!active) {
            setActive(true);
            getPostsByCategory();
            dispatch(postActions.filter({ category: '' }))
        }
        setClear(true)
        if (active) {
            setActive(false)
            if (filteredPosts.length !== posts.length) {
                dispatch(postActions.setRerenderFilters(!rerenderFilters))
            }
            dispatch(postActions.setCategory(''))

            dispatch(postActions.setFilteredPosts(posts))
        }
    }


    useEffect(() => {
        if (props.category === activeCategory) {
            setActive(true);
        } else {
            setActive(false);
        }
    }, [activeCategory, props.category]);


    return (
        <Fragment>
            <button onClick={handleCategoryClick}
                className={`${classes.button} ${active ? classes.active : ''}`}>
                {props.category}
            </button>
        </Fragment>
    );
}

export default React.memo(Category);
