import { Fragment, useEffect, useState } from "react";
import Category from "./Category";
import classes from './Category.module.css';
import React from "react";
import 'swiper/swiper-bundle.min.css'
import './Swiper.css'
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y, Scrollbar } from "swiper";
import ShoplyAxios from "../../../apis/ShoplyAxios";


const Categories = () => {

    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState(null);


    function getCategories() {
        ShoplyAxios.get('/posts/categories')
            .then(res => {  
                setCategories(res.data)
            })
            .catch(error => {
                console.log(error);
            });
    }


    function handleCategoryClick(category){
        setActiveCategory(category);
    }



    useEffect(()=>getCategories(), []);


    
    const settings = {
        speed: 300,
        slidesPerView: 7,
        loop: false,
        navigation: true,
        grabCursor: false,
        modules: [Navigation, Pagination, Scrollbar, A11y],
    }
    

    return <Fragment>
        <Swiper className={classes.flex} {...settings}>
            {categories.map(category => (
                <SwiperSlide key={category} className={classes.flex}>
                    <Category
                        key={category}
                        category={category}
                        isActive={activeCategory === category}
                        onClick={handleCategoryClick}
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    </Fragment>
}

export default React.memo(Categories);
