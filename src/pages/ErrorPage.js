import { useRouteError } from 'react-router-dom';
import React from 'react';
import classes from '../css/pages/Error.module.css';


function ErrorPage() {
  return (
    <div className={classes.errorPage}>
      <div className={classes.errorCode}></div>
      <div className={classes.errorMessage}>Error</div>
    </div>
  );
}



export default React.memo(ErrorPage);
