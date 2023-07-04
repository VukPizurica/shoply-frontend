import { Fragment, useState, useRef } from "react";
import PriceSort from "./PriceSort";
import classes from './Filters.module.css';
import TimeFilter from "./TimeFilter";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { postActions } from "../../../store/postSlice";

const Filters = () => {

    const [mode, setMode] = useState(false);
    const [changed, setChanged] = useState(false);
    const [prices, setPrices] = useState({ min: 0, max: 1000 })
    const [showFilters, setShowFilters] = useState(false)
    const [showClearAll, setShowClearAll] = useState(false);

    const posts = useSelector(state => state.posts.posts);
    const filteredPosts = useSelector(state => state.posts.filteredPosts);
    
    const dispatch = useDispatch();

    const priceRef = useRef();
    const timeRef = useRef();


    function passData(mode, changed) {
        setMode(mode);
        setChanged(changed)
    }


    function showClearAllButton() {
        if ((mode !== false || changed !== false || prices.min !== 0 || prices.max !== 1000) || posts.length !== filteredPosts.length) {
            setShowClearAll(true)
        }
    }


    function hideClearAll() {
        setShowClearAll(false)
    }

    function toggleShowFilters() {
        if (showFilters) {
            clearAll({ mode, changed })
        }
        setShowFilters(!showFilters)
        hideClearAll()

    }

    function clearAll() {
        priceRef.current.clear();
        timeRef.current.clear();
        dispatch(postActions.setFilters({ priceMin: 0, priceMax: 1000 }))
        dispatch(postActions.setCategory(''))
        dispatch(postActions.filter())
        setShowClearAll(false)
        setShowFilters(false)
    }



    return <Fragment>
        <button onClick={toggleShowFilters} className={classes.filtersButton}>Filters</button>
        {showClearAll && <button onClick={clearAll} className={classes.clearAll}>Clear All</button>}
        <div className={`${classes.filters} ${showFilters ? classes.wipeInDown : classes.wipeOutUp}`}>
            {showFilters && <div className={classes.Filters}>
                <PriceSort ref={priceRef} hideClearAll={hideClearAll} showClearAll={() => setShowClearAll(true)} />
                <TimeFilter ref={timeRef} hideClearAll={hideClearAll} showClearAll={() => setShowClearAll(true)} prices={prices} />
            </div>
            }
        </div>
    </Fragment>


};

export default React.memo(Filters);
