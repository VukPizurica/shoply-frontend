import SearchBar from "./SearchBar";
import classes from './Filters.module.css';

const Banner = () => {
    return <div className={classes.imgContainer}>
        <SearchBar />
    </div>

}

export default Banner;