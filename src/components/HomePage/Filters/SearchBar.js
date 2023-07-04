import { useRef } from "react";
import { useDispatch } from "react-redux";
import { Form } from "react-router-dom";
import ShoplyAxios from "../../../apis/ShoplyAxios";
import { postActions } from "../../../store/postSlice";
import classes from './Filters.module.css'


const SearchBar = () => {

  const searchRef = useRef();
  const dispatch = useDispatch();

  function getPostsBySearch() {

    const searchQuery = searchRef.current.value.replace(/\s+/g, "+");

    ShoplyAxios.get('/posts/search?search=' + searchQuery)
      .then(res => {
        dispatch(postActions.setFilteredPosts(res.data))
        dispatch(postActions.setCategory(''))
        dispatch(postActions.setRerenderFilters(true))
        dispatch(postActions.setActivePage(1))

      })
      .catch(error => {
        console.log(error);
      });
  }


  function filterSearch() {
    getPostsBySearch()
  }

  return <Form onSubmit={filterSearch} className={classes.Search} action="">
    <input ref={searchRef} className={classes.SearchInput} type="search" placeholder="Search..." required={false} />
    <button className={classes.SearchButton} type="submit">Search</button>
  </Form>

}
export default SearchBar;