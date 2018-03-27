import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class HomePage extends Component {
  render () {
    return (
      <main
        className="HomePage"
        style={{margin: '0 1rem'}}
        >
          <h1> Welcome </h1>
          <h3><Link to={`/signin`}>Sign In</Link></h3>
        </main>
    )
  }
}

export default HomePage;
