import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import AuthRoute from './AuthRoute'
import SignInPage from './SignInPage'
import HomePage from './HomePage'
import AuctionsIndexPage from './AuctionsIndexPage'
import AuctionShowPage from './AuctionShowPage'
import AuctionCreatePage from './AuctionCreatePage'
import NavBar from './NavBar'

class Router extends Component {
  constructor (props) {
    super(props);

    this.state = {
      user: null
    };

    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  componentWillMount () {
    this.signIn();
  }

  signIn () {
    const jwt =  localStorage.getItem('jwt');

    if (jwt) {
      const payload = jwtDecode(jwt);
      this.setState({
        user: payload
      });
    }
  }

  isSignedIn(){
    return !!this.state.user
  }

  signOut () {
    localStorage.removeItem('jwt');
    this.setState({user: null});
  }


  render(){
    const { user } = this.state

    return(
      <BrowserRouter>
        <div>    
        <NavBar
          user={user}
          onSignOut = {this.signOut}
        />
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route
            path="/signin"
            render={
              props => (
                <SignInPage
                  {...props}
                  onSignIn={this.signIn}
                />
              )
            }
          />
          <AuthRoute
            exact
            isAuthenticated={this.isSignedIn()}
            path="/auctions"
            component={AuctionsIndexPage}
          />
          <AuthRoute
            exact
            isAuthenticated={this.isSignedIn()}
            path="/auctions/new"
            component={AuctionCreatePage}
          />
          <AuthRoute
              isAuthenticated={this.isSignedIn()}
              path="/auctions/:id"
              component={AuctionShowPage}
            />
        </Switch>
      </div>
      </BrowserRouter>
    )
  }
}

export default Router
