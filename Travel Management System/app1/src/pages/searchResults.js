import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import config from '../config'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const SearchResults = () => {
  const location = useLocation()
  const navigate = useNavigate()

  var busdata = location.state.result['data']

  const [byFare, setByFare] = useState(false)
  const [byRating, setByRating] = useState(false)
  const [byDaparture, setByDeparture] = useState(false)
  const [byDuration, setByDuration] = useState(false)
  const [byArrival, setByArrival] = useState(false)
  const [bySeats, setBySeats] = useState(false)

  const [seatType_seater, setSeatType_seater] = useState(false)
  const [seatType_sleeper, setSeatType_sleeper] = useState(false)
  const [busType_AC, setBusType_AC] = useState(false)
  const [busType_NonAC, setBusType_NonAC] = useState(false)

  function resetSort() {
    setByFare(false)
    setByRating(false)
    setByDeparture(false)
    setByDuration(false)
    setByArrival(false)
    setBySeats(false)
  }

  if (byFare) {
    busdata.sort((a, b) => a.Fare - b.Fare)
  } else if (byRating) {
    busdata.sort((a, b) => a.Bus_rating - b.Bus_rating)
  } else if (byDaparture) {
    busdata.sort((a, b) => a.Departure_time.localeCompare(b.Departure_time))
  } else if (byDuration) {
    busdata.sort((a, b) => a.Duration.localeCompare(b.Duration))
  } else if (byArrival) {
    busdata.sort((a, b) => a.Arrival_time.localeCompare(b.Arrival_time))
  } else if (bySeats) {
    busdata.sort((a, b) => a.Available_seats - b.Available_seats)
  }

  if (!(seatType_seater && seatType_sleeper)) {
    if (seatType_seater) {
      busdata = busdata.filter((busdata) => busdata.Seat_type === 'Seater')
    } else if (seatType_sleeper) {
      busdata = busdata.filter((busdata) => busdata.Seat_type === 'Sleeper')
    }
  }

  if (!(busType_AC && busType_NonAC)) {
    if (busType_AC) {
      busdata = busdata.filter((busdata) => busdata.Bus_type === 'AC')
    } else if (busType_NonAC) {
      busdata = busdata.filter((busdata) => busdata.Bus_type === 'Non-AC')
    }
  }

  const getSeats = (Journey_id) => {
    if (!sessionStorage['token']) {
      toast.warning('you need to sign in first')
      navigate('/signin')
    } else {
      axios
        .get(config.serverURL + `/getSeats/${Journey_id}`, {
          headers: { token: sessionStorage['token'] },
        })
        .then((response) => {
          const result = response.data
          if (result['status'] === 'error') {
            console.log('ERROR : ', result['error'])
            toast.error('Error while fetching seats details')
          } else {
            navigate('/selectSeats', { state: { result } })
          }
        })
    }
  }

  return (
    <div className='container-fluid'>
      <h1
        style={{
          padding: 15,
        }}>
        SearchResults
        {/* <hr /> */}
      </h1>

      <div className='row'>
        <div className='col-2'>
          <div
            className='text-bg-secondory p-5'
            style={{
              backgroundColor: '#D3D3D3',
              width: '90%',
              height: '100%',
              borderRadius: 20,
              borderStyle: 'outset',
              // borderColor: 'black',
            }}>
            <h3 style={{ color: 'white' }}>
              <b>FILTERS</b>
            </h3>
            <h5 style={{ color: '#505050', paddingTop: '5px' }}>
              <b>Bus Type</b>
            </h5>
            <div className='form-check'>
              <input
                className='form-check-input'
                type='checkbox'
                onChange={() => setBusType_AC(!busType_AC)}
              />
              <label className='form-check-label' htmlFor='flexCheckDefault'>
                AC
              </label>
            </div>
            <div className='form-check' style={{ paddingTop: '5px' }}>
              <input
                className='form-check-input'
                type='checkbox'
                onChange={() => setBusType_NonAC(!busType_NonAC)}
              />
              <label className='form-check-label' htmlFor='flexCheckDefault'>
                Non-AC
              </label>
            </div>
            <br />
            <h5 style={{ color: '#505050' }}>
              <b>Seats Type</b>
            </h5>
            <div className='form-check'>
              <input
                className='form-check-input'
                type='checkbox'
                onChange={() => setSeatType_seater(!seatType_seater)}
              />
              <label className='form-check-label' htmlFor='flexCheckDefault'>
                Seater
              </label>
            </div>
            <div className='form-check' style={{ paddingTop: '5px' }}>
              <input
                className='form-check-input'
                type='checkbox'
                onChange={() => setSeatType_sleeper(!seatType_sleeper)}
              />
              <label className='form-check-label' htmlFor='flexCheckDefault'>
                Sleeper
              </label>
            </div>
          </div>
        </div>

        <div className='col-10'>
          <h4 style={{ color: 'green' }}>
            <b>SORT BY</b>
          </h4>

          <div
            className='btn-group'
            role='group'
            aria-label='Basic outlined example'
            style={{ width: '100%' }}>
            <button
              type='button'
              className='btn btn-outline-success'
              onClick={() => {
                resetSort()
                setByFare(true)
              }}>
              Fare
            </button>

            <button
              type='button'
              className='btn btn-outline-success'
              onClick={() => {
                resetSort()
                setByRating(true)
              }}>
              Rating
            </button>

            <button
              type='button'
              className='btn btn-outline-success'
              onClick={() => {
                resetSort()
                setByDeparture(true)
              }}>
              Departure
            </button>

            <button
              type='button'
              className='btn btn-outline-success'
              onClick={() => {
                resetSort()
                setByDuration(true)
              }}>
              Duration
            </button>

            <button
              type='button'
              className='btn btn-outline-success'
              onClick={() => {
                resetSort()
                setByArrival(true)
              }}>
              Arrival
            </button>

            <button
              type='button'
              className='btn btn-outline-success'
              onClick={() => {
                resetSort()
                setBySeats(true)
              }}>
              Available seats
            </button>
          </div>

          <br />
          <br />
          <hr />

          <table
            className='table table-light table-striped'
            style={{ textAlign: 'center' }}>
            <thead>
              <tr>
                <th>Operator</th>
                <th>Description</th>
                <th>Rating</th>
                <th>Departure</th>
                <th>Duration</th>
                <th>Arrival</th>
                <th>Fare</th>
                <th>Seats Available</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {busdata.map((props) => {
                return (
                  <tr key={props.Journey_id}>
                    <td>{props.Bus_name}</td>
                    <td>
                      {props.Bus_type} / {props.Seat_type}
                    </td>
                    <td>{props.Bus_rating}</td>
                    <td>{props.Departure_time}</td>
                    <td style={{ color: 'grey' }}>{props.Duration}hr</td>
                    <td>{props.Arrival_time}</td>
                    <td>{props.Fare}</td>
                    <td>{props.Available_seats}</td>
                    <td>
                      <button
                        onClick={() => {
                          getSeats(props.Journey_id)
                          localStorage.setItem('selectedBusFare', props.Fare)
                        }}
                        className='btn btn-sm btn-danger'>
                        Book Seat
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          {busdata.length === 0 && (
            <h2 style={{ textAlign: 'center', margin: 30, color: 'orange' }}>
              Sorry, no buses available for this route
            </h2>
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchResults
