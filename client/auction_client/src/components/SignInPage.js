import React, { Component } from 'react';
import { Token } from '../lib/requests'

class SignInPage extends Component {
  constructor (props) {
    super(props);
    this.state ={
      errors: []
    }
    this.createToken = this.createToken.bind(this)
  }

  createToken(event) {

    const { onSignIn =()=> {} } = this.props
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    Token.create({
      email: formData.get('email'),
      password: formData.get('password')
    })
    .then(data =>{
      if (!data.errors) {
        localStorage.setItem('jwt', data.jwt)
        onSignIn()

        this.props.history.push('/auctions');

      } else {
        this.setState({
          errors: [{
            message: "Invalid Username or Password!"
          }]
        })
      }
    })
  }

  render(){
    const { errors } = this.state;
    return(
      <main className="SignInPage" style={{
      margin: '0 1rem'}}>

      <h2>Sign In</h2>
      {
        errors.map (
          (e, i)=> <div className="alert" key={i}> {e.message}</div>
        )
      }
      <form onSubmit={this.createToken}>
        <div className="SignInInput">
          <label htmlFor='email'>Email</label> <br />
          <input type='email' id='email' name='email' />
        </div>

        <div className="SignInInput">
          <label htmlFor='password'>Password</label> <br />
          <input type='password' id='password' name='password' />
        </div>

        <div className="SignInInput">
          <input type='submit' value='Sign In'/>
        </div>
      </form>
    </main>
    )
  }

}

export default SignInPage
