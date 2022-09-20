const express = require('express')
const db = require('../db')
const utils = require('../utils')

const router = express.Router()

router.post('/ticket', (request, response) => {
  const { arrSeats, arrPassengerId, paymentId } = request.body

  var query = ` 
        INSERT INTO ticket (Seat_no, Journey_id, Passenger_id, Payment_id)
        VALUES (${arrSeats[0].Seat_no}, ${arrSeats[0].Journey_id}, ${arrPassengerId[0]}, ${paymentId})
        `
  for (let i = 1; i < arrSeats.length; i++) {
    query =
      query +
      `, (${arrSeats[i].Seat_no}, ${arrSeats[i].Journey_id}, ${arrPassengerId[i]}, ${paymentId})`
  }
  query = query + `;`

  db.pool.query(query, (error, result) => {
    response.send(utils.createResult(error, result))
  })
})

router.get('/myBookings', (request, response) => {
  const { userId } = request

  const query = ` 
          SELECT
              t.Ticket_id, 
              t.Seat_no,
              t.Journey_id,
              DATE_FORMAT(j.Departure_datetime, "%d %M, %Y") AS departureDate, 
              j.From_location AS source, 
              j.To_location AS destination, 
              DATE_FORMAT(j.Departure_datetime, "%H:%i") AS departureTime,
              DATE_FORMAT(j.Arrival_datetime, "%H:%i") AS arrivalTime,
              j.Fare,
              pd.Transaction_datetime AS bookingDateTime,
              p.Name, 
              p.Gender, 
              p.Age, 
              p.Phone_no,
              b.Bus_name, 
              b.Bus_type, 
              b.Bus_rating, 
              b.Seat_type, 
              b.Bus_no
          FROM ticket t 
          JOIN journey_details j ON t.Journey_id = j.Journey_id
          JOIN bus b ON j.Bus_id = b.Bus_id
          JOIN passenger p ON t.Passenger_id = p.Passenger_id
          JOIN payment_details pd ON t.Payment_id = pd.Payment_id
          WHERE pd.User_id = ? ;
        `

  db.pool.query(query, [userId], (error, result) => {
    response.send(utils.createResult(error, result))
  })
})

module.exports = router
