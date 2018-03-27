import React from 'react'

function AuctionForm (props) {
  const {errors=[], onSubmit = () => {}} = props


  const handleSubmit = event => {
    event.preventDefault();

    const formData =new FormData(event.currentTarget);

    onSubmit({
      title: formData.get('title'),
      description: formData.get('description'),
      end_date: formData.get('end_date'),
      reserve_price: formData.get('reserve_price')
    })
  }

  return (
    <form
      className="AuctionForm"
      onSubmit={handleSubmit}
    >
      <div>
        <label htmlFor="title">Title</label> <br />
        <input name="title" id="title" />
      </div>

      <div>
        <label htmlFor="description">Description</label> <br />
        <textarea name="description" id="description" cols="60" rows="4" />
      </div>

      <div>
        <label htmlFor="end_date">End Date</label> <br />
        <input type="date" name="end_date" id="end_date" placeholder="YYYY-MM-DD" />
      </div>

      <div>
        <label htmlFor="reserve_price">Reserve Price $</label> <br />
        <input name="reserve_price" id="reserve_price" />
      </div>

      <div>
        <input type="submit" value="Submit"/>
      </div>
    </form>
  )
}

export default AuctionForm;
