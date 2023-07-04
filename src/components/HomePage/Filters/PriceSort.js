import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { useState } from "react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-router-dom";
import { postActions } from "../../../store/postSlice";
import classes from './Filters.module.css';
import { sortAsc, sortDsc } from "./TimeFilter";
import React from "react";

const PriceSort = forwardRef((props, ref) => {

    const dispatch = useDispatch();
    const [showClear, setShowClear] = useState(false);

    const inputMin = useRef();
    const inputMax = useRef();


    function filter(event) {
        event.preventDefault();
        const min = inputMin.current.value
        const max = inputMax.current.value
        dispatch(postActions.filter({ priceMin: min, priceMax: max }));
        dispatch(postActions.setActivePage(1))
        props.showClearAll()
    }


    function clear() {
        dispatch(postActions.setFilters({ priceMin: 0, priceMax: 1000 }))
        dispatch(postActions.filter({ priceMin: 0, priceMax: 1000 }))
        dispatch(postActions.setActivePage(1))
        inputMin.current.value = ''
        inputMax.current.value = ''
    }

    function showClearButton() {
        if (!showClear) {
            setShowClear(true)
        }

    }


    useImperativeHandle(ref, () => ({
        clear
    }))


    return <Fragment>
        <Form onSubmit={filter}>
            <div className={classes.PriceContent}>
                <h4 className={classes.h4}>Price</h4>
                <label htmlFor="min">Min</label>
                <input onChange={showClearButton} className={classes.PriceInput} ref={inputMin} id='min' type='number' step='1' />

                <label htmlFor="max">Max</label>
                <input onChange={showClearButton} className={classes.PriceInput} ref={inputMax} id='max' type='number' step='1' />

                <button className={classes.PriceButton} type="submit">Check</button>
                <button disabled={!showClear} className={classes.clear} type="button" onClick={clear}>Clear</button>

            </div>
        </Form>
    </Fragment>
})
export default React.memo(PriceSort);
