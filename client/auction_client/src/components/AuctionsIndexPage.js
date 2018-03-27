import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Auction } from '../lib/requests'



class AuctionsIndexPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      auctions: [],
       loading: true
    };
  };

  componentDidMount(){
    Auction.all().then(auctions => {
      this.setState({
        auctions: auctions,
        loading: false
      });
    });
  };

  render() {
    const { auctions, loading } = this.state

    if(loading){
      return(
        <main className="AuctionIndexPage" style={{
        margin: '0 1rem'}}>
          <h2> Auctions </h2>
          <h3> Loading... </h3>
        </main>
      )
    }
    return (
      <main className="AuctionIndexPage" style={{
      margin: '0 1rem'}}>
        <h2> Auctions </h2>
        <ul>
          {
            auctions.map(auction =>(
              <div  key={auction.id}>
                <Link
                  to={{pathname: `/auctions/${auction.id}`,
                      auction: auction}}
                >
                  {auction.title}
                </Link>
              </div>
              )
            )
          }
        </ul>
      </main>
    )
  }
}

export default AuctionsIndexPage
