const express = require('express')
const db = require('../db')
const utils = require('../utils')

const router = express.Router()

router.get('/getSeats/:journeyId', (request, response) => {
  const { journeyId } = request.params
  const query = ` 
  SELECT * 
  FROM seats 
  WHERE Journey_id = ? 
  `
  db.pool.query(query, [journeyId], (error, result) => {
    response.send(utils.createResult(error, result))
  })
})

router.put('/updateSeatStatus/:newStatus', (request, response) => {
  const { newStatus } = request.params
  const { arrSeats } = request.body
  const arr = arrSeats

  var query = ` 
        UPDATE seats SET Status=${newStatus} 
        WHERE Journey_id=${arr[0].Journey_id} 
        AND Seat_no in ( ${arr[0].Seat_no} `
  for (let i = 1; i < arr.length; i++) {
    query = query + `, ${arr[i].Seat_no}`
  }
  query = query + ` );`

  db.pool.query(query, (error, result) => {
    response.send(utils.createResult(error, result))
  })
})

module.exports = router
