import { useEffect } from "react";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import ShoplyAxios from "../../apis/ShoplyAxios";
import classes from '../../css/pages/AnalyticsPage.module.css';

const BestSellers = (props) => {

  const [posts, setPosts] = useState([]);

  const username = props.username;
  function getBestSellers() {
    if (username) {
      ShoplyAxios.get('/posts/getBestSellers/' + username)
        .then(res => {
          setPosts(res.data)
        })
        .catch(error => {
          console.log(error)
        });
    }
  }

  let postsShow = <p className={classes.messageBestSellers}>No posts.</p>

  if (posts.length !== 0) {
    postsShow = <div>  {posts.map((post) => (
      <li key={post.id} className={classes.item}>
        <Link className={classes.link} to={`/${post.id}`}>
          <img src={post.image} alt={post.title} className={classes.img} />
          <div className={classes.content}>
            <p className={classes.itemTitle}>{post.title}</p>
            <p className={classes.p}>sales: {post.sales}</p>
            <p className={classes.p}>views: {post.views}</p>
          </div>
        </Link>
      </li>
      ))}
    </div>
  }

  useEffect(() => { getBestSellers() }, [username])

  return <Fragment>
    <ul className={classes.list}>
      {postsShow}
    </ul>

  </Fragment>

}

export default BestSellers;