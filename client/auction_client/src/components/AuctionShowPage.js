import React, { Component } from 'react'
import Moment from 'react-moment'
import BidForm  from './BidForm'
import { Bid } from '../lib/requests'


class AuctionShowPage extends Component {
  constructor(props){
    super(props)
    this.state= {
      newBid: []
    }
  //  console.log(this.props)
    this.createBid = this.createBid.bind(this);
  }

  createBid(bidParams) {
    Bid
      .create(bidParams, bidParams.auction)
      .then(data => {

        if (data.errors) {
          this.setState({
            validationErrors: data
            .errors
            .filter(e => e.type === "ActiveRecord::RecordInvalid")
          })

        } else {

          this.setState ({ newBid: [...this.state.newBid, data]})
        }
      })
    }


  render() {
    const { auction } = this.props.location;
    const { newBid } = this.state;
    console.log(this.state.newBid)
    return(
      <div style={{margin: 15}}>
        <h1> {auction.title} </h1>
        <h3>{auction.description}</h3>
        <h4>Ends on: {auction.end_date}</h4>


        <div>
          <BidForm
            //errors={this.state.validationErrors}
            onSubmit={this.createBid}
            auction ={auction.id}
          />
        </div>

        <h4> Previous Bids </h4>
        {
          newBid.map(bid =>(
            <div key={bid.bid.id}>${bid.bid.price} @ {bid.bid.created_at}</div>
          ))
        }
        {
          auction.bids.map(bid =>(
          <div key={bid.id}>${bid.price} @ {bid.created_at}</div>
          ))
        }
      </div>
    )
  }
}
export default AuctionShowPage
