const DOMAIN = 'localhost:3000';
const BASE_URL = `http://${DOMAIN}`;

function getJWT () {

  return localStorage.getItem('jwt');
}

const Auction = {
  all () {
    return fetch(
    `${BASE_URL}/auctions`,
    {
      headers: {
        'Authorization': getJWT()
      }
    }
  )
    .then(res => res.json());
  },

  one(id) {
    return fetch(
      `${BASE_URL}/auctions/${id}`,
      {
        headers: {
          'Authorization': getJWT()
        }
      }
    )
      .then(res => res.json());
  },

  create(params) {
    return fetch(
      `${BASE_URL}/auctions`,
      {
        headers: {
          'Authorization': getJWT(),
          'Content-Type':'application/json'
        },
        method: 'POST',
        body: JSON.stringify(params)
      }
    ).then(res => res.json())
  }
}

const Bid = {
  create(params, id) {
    return fetch(
      `${BASE_URL}/auctions/${id}/bids`,
      {
        method: 'POST',
        headers: {
          'Authorization': getJWT(),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
      }
    ).then(res => res.json());
  }
}



const Token = {
  create(params) {
    return fetch(
      `${BASE_URL}/tokens`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
      }
    ).then(res => res.json());
  }
}

export { Auction, Bid, Token }
