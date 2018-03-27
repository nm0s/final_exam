PASSWORD = "supersecret"


User.destroy_all
Auction.destroy_all
Bid.destroy_all


superuser = User.create(
  first_name: "Bob",
  email: "bob@email.com",
  password: PASSWORD
)

5.times.each do
  first_name = Faker::Name.first_name

  User.create(
    first_name: first_name,
    email: "#{first_name}@email.com",
    password: PASSWORD
  )
end

users = User.all

10.times.each do
  a = Auction.create(
    title: Faker::Book.title,
    description: Faker::Movie.quote,
    reserve_price: Faker::Number.number(3),
    end_date: "2018-04-10",
    user: users.sample
  )
  if a.valid?
    5.times.each do
      Bid.create(
        price: Faker::Number.number(3),
        user: users.sample,
        auction: a
      )
    end
  end
end

auctions = Auction.all
bids = Bid.all

puts Cowsay.say "Created #{users.count} users", :tux
puts Cowsay.say "Created #{auctions.count} auctions", :frogs
puts Cowsay.say "Created #{bids.count} bids", :sheep
