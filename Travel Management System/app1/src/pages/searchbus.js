import { useState } from 'react'
import axios from 'axios'
import config from '../config'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Searchbus = () => {
  const [From_location, setFrom_location] = useState('')
  const [To_location, setTo_location] = useState('')
  const [Departure_date, setDeparture_date] = useState('')

  const navigate = useNavigate()

  const searchbus = () => {
    console.log(Departure_date, From_location, To_location)

    if (From_location.length === 0) {
      toast.warning('please enter source city')
    } else if (To_location.length === 0) {
      toast.warning('please enter destination city')
    } else if (Departure_date.length === 0) {
      toast.warning('please enter date')
    } else {
      axios
        .post(config.serverURL + '/searchbus', {
          Departure_date,
          From_location,
          To_location,
        })
        .then((response) => {
          const result = response.data
          if (result['status'] === 'error') {
            console.log(result['error'])
            toast.error('Error while searching bus')
          } else {
            navigate('/searchResults', { state: { result } })
          }
        })
    }
  }

  return (
    <div
      style={{
        width: 450,
        height: 430,
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
          padding: 0,
        }}>
        Search Bus
      </h1>
      <div className='mb-3'>
        <label className='form-label'>From</label>
        <input
          type='text'
          className='form-control'
          placeholder='Enter Source City'
          onChange={(event) => {
            setFrom_location(event.target.value)
          }}
        />
      </div>
      <div className='mb-3'>
        <label className='form-label'>To</label>
        <input
          type='text'
          className='form-control'
          placeholder='Enter Destination City'
          onChange={(event) => {
            setTo_location(event.target.value)
          }}
        />
      </div>
      <div className='mb-3'>
        <div>
          <label className='form-label'>Date</label>
          <input
            type='date'
            className='form-control'
            placeholder='Date'
            onChange={(event) => {
              setDeparture_date(event.target.value)
            }}
          />
        </div>
      </div>
      <div className='mb-3'>
        <div className='container'>
          <button
            onClick={searchbus}
            type='button'
            class='btn btn-success '
            style={{
              margin: 20,
              width: 180,
            }}>
            <i className='fas fa-map-marker-alt'></i> <b>Search-Bus</b>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Searchbus
