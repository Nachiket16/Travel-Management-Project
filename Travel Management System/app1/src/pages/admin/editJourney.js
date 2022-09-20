import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import config from '../../config'
import axios from 'axios'
import { toast } from 'react-toastify'

const EditJourney = (props) => {
  const navigate = useNavigate()
  const location = useLocation()

  var journeydata = location.state.journeydata
  const Journey_id = journeydata.Journey_id
  const [Bus_id, setBus_id] = useState(journeydata.Bus_id)
  const [From_location, setFrom_location] = useState(journeydata.From_location)
  const [To_location, setTo_location] = useState(journeydata.To_location)
  const [Departure_datetime, setDeparture_datetime] = useState(
    journeydata.Departure_datetime
  )
  const [Arrival_datetime, setArrival_datetime] = useState(
    journeydata.Arrival_datetime
  )
  const [Fare, setFare] = useState(journeydata.Fare)

  const editJourney = () => {
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
        .put(
          config.serverURL + '/admin/editJourney',
          {
            Journey_id,
            Bus_id,
            From_location,
            To_location,
            Departure_datetime,
            Arrival_datetime,
            Fare,
          },
          {
            headers: { token: sessionStorage['token'] },
          }
        )
        .then((response) => {
          const result = response.data
          if (result['status'] === 'error') {
            toast.error('Error occurred while updating journey')
          } else {
            toast.success('Journey updated successfully')
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
        Edit Journey
      </h1>
      <div className='mb-3'>
        <div className='mb-3'>
          <label className='form-label'>Bus-Id</label>
          <input
            type='number'
            className='form-control'
            value={Bus_id}
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
            value={From_location}
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
            value={To_location}
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
            value={Departure_datetime}
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
            value={Arrival_datetime}
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
            value={Fare}
            onChange={(event) => {
              setFare(event.target.value)
            }}
          />
        </div>
        <div className='container'>
          <button
            onClick={editJourney}
            className='btn btn-success'
            style={{
              marginTop: 20,
              width: 170,
            }}>
            <i class='fas fa-road'></i> Update Journey
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditJourney
