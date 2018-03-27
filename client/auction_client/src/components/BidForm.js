import React from 'react'



function BidForm (props) {
  const { errors=[], onSubmit = () => {}, auction=[]} = props

  const handleSubmit = event => {
    event.preventDefault();

    const formData =new FormData(event.currentTarget);

    onSubmit({
      price: formData.get('price'),
      auction: auction
    })
  }

  return (
    <form
      className="QuestionForm"
      onSubmit={handleSubmit}
    >
      <div className="BidFormInput">
        <input name="price" id="price" />
      </div>

      <div>
        <input type="submit" value="Bid"/>
      </div>
    </form>
  )
}

export default BidForm
