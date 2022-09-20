const express = require('express')
const db = require('../db')

const router = express.Router()

router.post('/payment', (request, response) => {
  const { userId, paymentType, amount } = request.body

  const query = ` 
          INSERT INTO payment_details(User_id, Payment_type, Amount) 
          VALUES(?, ?, ?);
        `
  db.pool.query(query, [userId, paymentType, amount], (error, result) => {
    if (error) {
      response.send(error)
    } else {
      response.send(result)
    }
  })
})

router.get("/admin/viewPayment", (request, response) => {
  const query = `
  SELECT * from payment_details;
  `
  db.pool.query(query, (error, result) => {
    response.send(utils.createResult(error, result))
  });
});

module.exports = router
