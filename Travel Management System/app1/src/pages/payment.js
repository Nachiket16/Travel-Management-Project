import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import config from '../config'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

const Payment = () => {
  //const [paymentType, setPaytype] = useState('')
  // const userId = localStorage.getItem('userId')
  const amount = localStorage.getItem('totalAmount')
  var paymentType = ''

  const navigate = useNavigate()

  useEffect(() => {
    if (!sessionStorage['token']) {
      navigate('/signin')
    }
    // eslint-disable-next-line
  })

  const pay = () => {
    //check the user entere the values or not
    if (paymentType.length === 0) {
      toast.warning('please select Payment type')
    } else {
      axios
        .post(
          config.serverURL + '/payment',
          {
            paymentType,
            amount,
          },
          {
            headers: { token: sessionStorage['token'] },
          }
        )
        .then((response) => {
          const result = response.data
          if (result['status'] === 'error') {
            console.log(result['error'])
            toast.error('Error occured in transaction')
          } else {
            createTicket(result['data'].insertId)
            console.log(result.data)
          }
        })
    }
  }

  const createTicket = (paymentId) => {
    let arrSeats = JSON.parse(localStorage.getItem('selectedSeatsArray'))
    let arrPassengerId = JSON.parse(localStorage.getItem('passengerIdArray'))

    axios
      .post(
        config.serverURL + '/ticket',
        {
          arrSeats,
          arrPassengerId,
          paymentId,
        },
        {
          headers: { token: sessionStorage['token'] },
        }
      )
      .then((response) => {
        const result = response.data
        if (result['status'] === 'error') {
          console.log('ERROR : ', result['error'])
          toast.error('Error while creating the bus-tickets')
        } else {
          toast.success('Your bus-tickets are booked successfully')
          console.log(result)
          navigate('/myBookings')
        }
      })
  }

  return (
    <div
      style={{
        width: 400,
        height: 300,
        position: 'relative',
        top: 100,
        left: 0,
        bottom: 0,
        margin: 'auto',
        borderColor: 'lightblue',
        borderRadius: 20,
        padding: 30,
        color: 'black',
        borderStyle: 'outset',
        borderWidth: 5,
      }}>
      <h1
        style={{
          paddingTop: 0,
          paddingBottom: 40,
        }}>
        Payment Gateway
      </h1>
      <div className='container'>
        <label className='form-label' style={{ color: 'gray' }}>
          <b>Choose Payment Method</b>
        </label>
        <select
          onChange={(event) => {
            paymentType = event.target.value
          }}
          className='form-select'
          aria-label='Default select example'>
          <option>Choose Payment Method</option>
          <option value='creditcard'>Credit Card</option>
          <option value='cash'>Cash Payment</option>
        </select>
        <div style={{ marginTop: 25, marginRight: 50 }} className='mb-2  '>
          <button
            onClick={pay}
            style={{ marginRight: 30, marginLeft: 60 }}
            className='btn btn-success'>
            Pay
          </button>
        </div>
      </div>
    </div>
  )
}

export default Payment
