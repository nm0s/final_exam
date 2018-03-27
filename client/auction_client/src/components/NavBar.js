import React from 'react';
import { NavLink } from 'react-router-dom';

function NavBar (props) {
  const { user, onSignOut = () => {} } = props;

  const handleSignOut = event =>{
    event.preventDefault();
    onSignOut();
  }
  return (
    <nav className="NavBar">
      <NavLink exact to="/">Home</NavLink> |
      <NavLink exact to="/auctions/new"> New Auction</NavLink> |
      <NavLink exact to="/auctions">Auctions</NavLink> |
      {
        user ? (
          [ <span key="1"> Hello, {user.first_name} | </span> 
          , <a key="2" href="/signout" onClick={handleSignOut}>Sign Out</a>
          ]
        ): (
          <NavLink exact to="/signin">Sign In</NavLink>
        )
      }
    </nav>
  )
}

export default NavBar;
