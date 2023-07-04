import { Link, NavLink, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import 'animate.css/animate.min.css';
import classes from './SellerPosts.module.css';
import ShoplyAxios from '../../apis/ShoplyAxios';
import jwt_decode from "jwt-decode"
import useRedirect from '../../hooks/use-redirect';
import Swal from 'sweetalert2';


const SellerPosts = () => {

  useRedirect('/login')
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [posts, setPosts] = useState([]);

  const jwt = localStorage.getItem('jwt');



  function getUsername() {
    if (jwt) {
      const decoded = jwt_decode(jwt);
      setUsername(decoded.sub)
    }
  }


  function deletePost(id, event) {
    event.stopPropagation();
    event.preventDefault();
    
    Swal.fire({
      title: 'Are you sure?',
      showDenyButton: true,
      confirmButtonText: 'Ok',
      denyButtonText: `Cancel`,
      customClass: {
        confirmButton: `${classes.confirmButton} my-confirm-button`,
        denyButton: `${classes.denyButton} my-deny-button`,
      },
      showClass: {
        popup: 'animate__animated animate__slideInDown animate__faster',
    },
 
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.showLoading();

        ShoplyAxios.delete('/posts/delete/' + id)
          .then(res => {
            Swal.close();
            Swal.fire({
              html: res.data.message,
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
              position: 'top',
              background: 'white',
              allowOutsideClick: false,
              backdrop: false,
              customClass: {
                popup: classes.popupGreen,
              },
              showClass: {
                popup: 'animate__animated animate__slideInDown animate__faster',
              },
              hideClass: {
                popup: 'animate__animated animate__slideOutUp animate__faster'
              },
              container: null,
            });

            setTimeout(() => {
              window.location.reload()
            }, 1500)
          })
          .catch(error => {
            Swal.fire({
              html: error.message,
              showConfirmButton: false,
              timer: 1500,
              position: 'top',
              background: 'white',
              allowOutsideClick: false,
              backdrop: false,
              customClass: {
                popup: classes.popupBlack,
              },
              showClass: {
                popup: 'animate__animated animate__slideInDown animate__faster',
              },
              hideClass: {
                popup: 'animate__animated animate__slideOutUp animate__faster'
              },
              container: null,
            });
          });
        
      }

    })
  }


  function getPosts() {
    if (username) {
      ShoplyAxios.get('/posts/getBySeller/' + username)
        .then(res => {
          setPosts(res.data)
        })
        .catch(error => {
          console.log(error)
        });
    }
  }



  let postsShow = <p className={classes.message}>No posts.</p>

  if (posts.length !== 0) {
    postsShow = <div>
      <ul className={classes.list}>
        {posts.map((post) => (
          <li key={post.id} className={classes.item}>
            <Link className={classes.linkItem} to={`${post.id}`}>
              <div className={classes.imgContainter}>
                <img src={post.image} alt={post.title} className={classes.img} />

              </div>
              <div className={classes.postDetails}>
                <div className={classes.content}>
                  <h2 className={classes.title}>{post.title}</h2>
                  <p className={classes.price}>${post.price}</p>
                </div>
                <div className={classes.buttonsAndCategory}>
                  <button onClick={(e) => { e.stopPropagation(); e.preventDefault(); navigate('edit/' + post.id) }} className={classes.editButton}>Edit</button>
                  <button onClick={(e) => deletePost(post.id, e)} className={classes.deleteButton}>Delete</button>
                  <p className={`${classes.category} ${classes[post.category]}`}>{post.category}</p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  }

  useEffect(() => getUsername(), [])

  useEffect(() => getPosts(), [username])

  return (
    <div className={classes.posts}>
      <NavLink to='new' className={classes.newButton}>New</NavLink>
      <h1>My Posts</h1><br />
      {postsShow}
    </div>
  );
}

export default React.memo(SellerPosts);

