import { useState } from 'react'
import axios from 'axios'
import config from '../../config'
import { useNavigate } from 'react-router-dom'
import '../../styles/admin.css'
import { toast } from 'react-toastify'

const AddJourney = () => {
  const [Bus_id, setBus_id] = useState('')
  const [From_location, setFrom_location] = useState('')
  const [To_location, setTo_location] = useState('')
  const [Departure_datetime, setDeparture_datetime] = useState('')
  const [Arrival_datetime, setArrival_datetime] = useState('')
  // const [Available_seats,setAvailable_seats] = useState('')
  const [Fare, setFare] = useState('')

  const navigate = useNavigate()

  const addJourney = () => {
    if (Bus_id.length === 0) {
      toast.warning('Enter Proper Bus_id')
    } else if (From_location.length === 0) {
      toast.warning('please enter Source city')
    } else if (To_location.length === 0) {
      toast.warning('please enter Destination city')
    } else if (Departure_datetime.length === 0) {
      toast.warning('please enter Departure date & time')
    } else if (Arrival_datetime.length === 0) {
      toast.warning('please enter Arrival date & time')
    } else {
      axios
        .post(
          config.serverURL + '/admin/addJourney',
          {
            Bus_id,
            From_location,
            To_location,
            Departure_datetime,
            Arrival_datetime,
            Fare,
            // Available_seats,
          },
          {
            headers: { token: sessionStorage['token'] },
          }
        )
        .then((response) => {
          const result = response.data
          if (result['status'] === 'error') {
            toast.error('invalid Email or Password')
          } else {
            toast.success('Journey added successfully')
            navigate('/admin')
          }
        })
    }
  }

  return (
    <div
      style={{
        width: 450,
        height: 690,
        position: 'relative',
        top: 20,
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
          padding: 0,
        }}>
        Add Journey
      </h1>
      <div className='mb-3'>
        <div className='mb-3'>
          <label className='form-label'>Bus-Id</label>
          <input
            type='number'
            className='form-control'
            placeholder='Enter valid Bus_id'
            onChange={(event) => {
              setBus_id(event.target.value)
            }}
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Source City</label>
          <input
            type='text'
            className='form-control'
            placeholder='Enter source city'
            onChange={(event) => {
              setFrom_location(event.target.value)
            }}
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Destination City</label>
          <input
            type='text'
            className='form-control'
            placeholder='Enter destination city'
            onChange={(event) => {
              setTo_location(event.target.value)
            }}
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Departure Date & Time</label>
          <input
            type='datetime-local'
            className='form-control'
            onChange={(event) => {
              setDeparture_datetime(event.target.value)
            }}
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Arrival_datetime</label>
          <input
            type='datetime-local'
            className='form-control'
            onChange={(event) => {
              setArrival_datetime(event.target.value)
            }}
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Fare</label>
          <input
            type='number'
            className='form-control'
            placeholder='Enter fare per seat'
            onChange={(event) => {
              setFare(event.target.value)
            }}
          />
        </div>
        <div className='container'>
          <button
            onClick={addJourney}
            className='btn btn-success'
            style={{
              marginTop: 20,
              width: 170,
            }}>
            <i class='fas fa-road'></i> Add Journey
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddJourney
