import { Link } from "react-router-dom";
import React from 'react';
import classes from './AccountDropdown.module.css';
import { logout } from "../../../services/auth";

const AccountMenu = (props) => {
  
  const links = props.links


  function generateLink(string) {
    const tokens = string.split(' ');
    let result = tokens[0].toLowerCase();
    if (tokens.length === 1) {
      return result
    } else {
      for (let i = 1; i < tokens.length; i++) {
        const capitalizedWord = tokens[i].charAt(0).toUpperCase() + tokens[i].slice(1);
        result += capitalizedWord
      }
      return result
    }
  }

  return (
    <div className={classes.dropdown} onMouseEnter={props.onMouseOver} onMouseLeave={props.onMouseLeave}>
      <ul className={classes.ul}>
        {links && links.map(link => (
          link.toLowerCase() === 'logout' ? <Link key={'Logout'} className={classes.li} onClick={logout}>Logout</Link> :
            <li key={link}><Link key={link} className={classes.li} to={'/' + generateLink(link)}>{link}</Link></li>))}
      </ul>
    </div>
  );
}
export default React.memo(AccountMenu);