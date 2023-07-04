import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import Post from './components/HomePage/Posts/Post';
import LoginPage from './pages/LoginPage'
import RootPage from './pages/RootPage'
import AccountPage from './pages/AccountPage';
import RegisterPage from'./pages/RegisterPage';
import AnalyticsPage from './pages/AnalyticsPage';
import MyPostsPage from './pages/MyPostsPage';
import SellerPost from './components/SellerPosts/SellerPost';
import NewSellerPost from './components/SellerPosts/NewSellerPost';
import { useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import ShoplyAxios from './apis/ShoplyAxios';
import { postActions } from './store/postSlice';
import SellerPostEdit from './components/SellerPosts/SellerPostEdit';
import SellerPosts from './components/SellerPosts/SellerPosts';


const router = createBrowserRouter([
  {
    path: '/',
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: ':id',
        element: <Post />
      },
      {
        path: '/account',
        element: <AccountPage />
      },
      {
        path: '/login',
        element: <LoginPage />
      },
      {
        path: '/register',
        element: <RegisterPage />
      }
      ,
      {
        path: '/analytics',
        element: <AnalyticsPage />
      },
      {
        path: '/myPosts',
        element: <MyPostsPage/>,
        children: [,
          {
            index: true,
            element: <SellerPosts/>
          },
          {
            path: ':id',
            element: <SellerPost/>
          },
          {
            path: 'edit/:id',
            element: <SellerPostEdit/>
          },
          {
            path: 'new',
            element: <NewSellerPost/>
          }    
    ]
  }
]

}])


function App() {
  
  const dispatch = useDispatch();
  const getPosts = () => {
    ShoplyAxios.get('/posts')
      .then(res => {
        dispatch(postActions.setPosts(res.data))
        dispatch(postActions.setFilteredPosts(res.data))
      })
      .catch(error => {
        console.log(error);
      });
  }

  useEffect(() => {
    getPosts()
  }, [])
  return <RouterProvider router={router} />;
}

export default React.memo(App);
