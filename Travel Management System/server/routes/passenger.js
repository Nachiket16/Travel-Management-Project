const express = require('express')
const db = require('../db')

const router = express.Router()

router.post('/addPassenger', (request, response) => {
  const { First_name, Last_name, Gender, Age, Phone_no } = request.body

  const query = ` 
        INSERT INTO 
        passenger (First_name, Last_name, Gender, Age, Phone_no ) 
         VALUES (?, ?, ?, ?, ?);
        `

  db.pool.query(
    query,
    [First_name, Last_name, Gender, Age, Phone_no],
    (error, result) => {
      if (error) {
        response.send(error)
      } else {
        response.send(result)
        // console.log(result)
      }
    }
  )

  // const query1 = ` SELECT LAST_INSERT_ID(); `

  // db.pool.query(query1, (error1, result1) => {
  //   if (error1) {
  //     response.send(error1)
  //   } else {
  //     response.send(result1)
  //   }
  // })
})

module.exports = router
