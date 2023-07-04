import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classes from './PostsList.module.css';
import { useSelector } from 'react-redux';


function PostsList() {

  const filteredPosts = useSelector(state => state.posts.filteredPosts);
  const totalPages = useSelector(state => state.posts.totalPages);
  const statePage = useSelector(state => state.posts.page)

  const [length, setLength] = useState(filteredPosts.length);
  const [activePage, setActivePage] = useState(1);



  useEffect(() => { setActivePage(statePage) }, [statePage])

  useEffect(() => { setLength(totalPages) }, [totalPages])



  let postsShow = <p className={classes.message}>No Posts.</p>

  if (length !== 0) {

    const from = (activePage === 1 ? activePage === 0 : activePage - 1) * 10
    const to = (activePage === 1 ? activePage === 0 : activePage - 1) * 10 + 10

    const sliced = filteredPosts.slice(from, to)
    postsShow = sliced.map((post) => (

      <li key={post.id} className={classes.item}>
        <Link className={classes.link} to={`/${post.id}`}>
          <img src={post.image} alt={post.title} className={classes.img} />

          <div className={classes.content}>
            <h2>{post.title}</h2>
            <p className={classes.p}>{post.description}</p>
            <div className={classes.date}>{getDiffInDays(post.date)}</div>

          </div>
          <h2>${post.price}</h2>
        </Link>

      </li>
    ))
  }

  return <div className={classes.posts}>
    <h1>All Posts</h1><br />
    <ul className={classes.list}>
      {postsShow}
    </ul>
  </div>
}

export default PostsList;


export function getDiffInDays(date) {
  const today = new Date(new Date().toISOString().slice(0, 10));
  const postDate = new Date(date);
  let diffInDays = 0;
  let diffDays = 0;
  if (postDate.getTime() > today.getTime() || postDate.getTime() === today.getTime()) {
    return 'Posted today';
  }
  if (postDate != null) {
    diffInDays = Math.abs(today.getTime() - postDate.getTime());
    const diff = diffDays = Math.ceil(diffInDays / (1000 * 60 * 60 * 24));
    if (diff === 1) {
      return "Posted " + diff + " day ago"
    }
    return "Posted " + diff + " days ago"
  }
  return 0;
}
