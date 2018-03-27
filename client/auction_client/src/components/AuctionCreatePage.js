import React from 'react'
import { Auction } from '../lib/requests'
import AuctionForm from './AuctionForm'

class AuctionCreatePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      validationErrors: []
    }
    this.createAuction = this.createAuction.bind(this);
  }

  createAuction(auctionParams) {
    Auction
      .create(auctionParams)
      .then(data => {

        if (data.errors) {
          this.setState({
            validationErrors: data
            .errors
            .filter(e => e.type === "ActiveRecord::RecordInvalid")
          })

        } else {
          this.props.history.push(`/auctions`)
        }
      })
  }

  render () {
    return (
      <main className="AuctionNewPage" style={{
        margin: '0 1rem'}}>
        <h1> New Auction </h1>

        <AuctionForm
          errors={this.state.validationErrors}
          onSubmit={this.createAuction}
        />
      </main>
    )
  }
}
export default AuctionCreatePage
