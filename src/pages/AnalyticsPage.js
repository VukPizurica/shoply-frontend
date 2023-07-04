import classes from '../css/pages/AnalyticsPage.module.css'
import { Fragment, useEffect, useState } from "react"
import HorizontalChart from '../components/AnalyticsPage/HorizontalChart';
import PieChart from '../components/AnalyticsPage/PieChart';
import BestSellers from '../components/AnalyticsPage/BestSellers';
import jwt_decode from "jwt-decode"
import MainHeaderSeller from '../layouts/MainHeaderSeller';
import useRedirect from '../hooks/use-redirect';
import React from 'react'; 


const AnalyticsPage = () => {

    useRedirect('/login')
    const [username, setUsername] = useState('');

    const jwt = localStorage.getItem('jwt');


    function getUsername() {
        if (jwt) {
            const decoded = jwt_decode(jwt);
            setUsername(decoded.sub)
        }
    }


    useEffect(() => getUsername(), [])

    return <Fragment>
        <MainHeaderSeller />
        <h1 className={classes.h1}>Analytics</h1>


        <div className={classes.charts}>
            <div className={classes.earningsLabel}>
                <h2 className={classes.earning}>Earnings</h2>
            </div>

            <HorizontalChart username={username} />
            <div className={classes.section2}>
                <p className={classes.bestSellers}>Customer Analytics</p>
                <p className={classes.bestSellers}>Best Sellers</p>
            </div>
            <div className={classes.section3}>
                <PieChart username={username} />
                <BestSellers username={username} />
            </div>

        </div>
    </Fragment>
}

export default React.memo(AnalyticsPage);