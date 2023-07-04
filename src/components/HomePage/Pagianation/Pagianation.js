import { Fragment, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import classes from './Pagination.module.css'
import React from "react"
import { postActions } from "../../../store/postSlice"

const Pagination = () => {

  const filteredPosts = useSelector(state => state.posts.filteredPosts)
  const [activePage, setActivePage] = useState(1)

  const dispatch = useDispatch();

  let pageNumber = Math.ceil(filteredPosts.length / 10)
  let pageArray = []

  for (let i = 0; i < pageNumber; i++) {
    pageArray.push(i + 1)
  }


  const handlePageClick = (page) => {
    setActivePage(page)
    dispatch(postActions.setActivePage(page))
  }

  return (
    <Fragment>
      <div className={classes.pages}>
        {pageArray.map(page => (
          <div
            key={page}
            className={`${classes.page} ${activePage === page ? classes.active : ''}`}
            onClick={() => handlePageClick(page)}
          >
            {page}
          </div>
        ))}
      </div>
    </Fragment>
  )
}

export default React.memo(Pagination)
