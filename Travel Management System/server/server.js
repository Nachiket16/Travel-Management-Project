const express = require('express')
const cors = require('cors')
const config = require('./config')
const jwt = require('jsonwebtoken')
const utils = require('./utils')

const app = express()

app.use(express.json())
app.use(cors())

app.use((request, response, next) => {
  if (
    request.url === '/signin' ||
    request.url === '/signup' ||
    request.url === '/searchbus' ||
    request.url === '/admin/addJourney' ||
    request.url === '/admin/addBus' ||
    request.url === '/admin/viewJourney' ||
    request.url === '/admin/viewBus' 
    

  ) {
    next()
  } else {
    const token = request.headers['token']

    if (token == 'undefined') {
      response.send(utils.createError('Please signin...'))
    }

    if (!token || token.length === 0) {
      response.send(utils.createError('Token is missing'))
    } else {
      try {
        // extract the user id from token
        const payload = jwt.verify(token, config.secret)

        // add the userid to the request so that
        // all the other requests can use it
        request.userId = payload.User_id

        next()
      } catch (ex) {
        response.send(utils.createError('Invalid Token'))
      }
    }
  }
})

const userRouter = require('./routes/user')
const busRouter = require('./routes/bus')
const seatsRouter = require('./routes/seats')
const passengerRouter = require('./routes/passenger')
const paymentRouter = require('./routes/payment')
const ticketRouter = require('./routes/ticket')

app.use(userRouter)
app.use(busRouter)
app.use(seatsRouter)
app.use(passengerRouter)
app.use(paymentRouter)
app.use(ticketRouter)


app.listen(4000, '0.0.0.0', () => {
  console.log('Server started on port:4000')
})
