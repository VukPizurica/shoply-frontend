import { Fragment } from "react";
import PostsList from "../components/HomePage/Posts/PostsList";
import Filters from '../components/HomePage/Filters/Filters';
import Categories from "../components/HomePage/Categories/CategoriesList";
import Footer from "../layouts/Footer";
import Banner from "../components/HomePage/Filters/Banner";
import React from "react";
import Pagination from "../components/HomePage/Pagianation/Pagianation"
import useHeader from "../hooks/use-header";

const HomePage = () => {

    const header = useHeader();

    return <Fragment>
        {header}
        <Banner />
        <Categories />
        <Filters />
        <PostsList />
        <Pagination />
        <Footer />
    </Fragment>


}

export default React.memo(HomePage);