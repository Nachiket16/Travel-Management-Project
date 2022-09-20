import axios from 'axios'
import config from '../config'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import '../styles/selectSeats.css'

const SelectSeats = () => {
  const location = useLocation()
  const navigate = useNavigate()

  var [seatsData, setSeatsData] = useState(location.state.result['data'])
  var [seatsCount, SetSeatsCount] = useState(0)

  const busFare = localStorage.getItem('selectedBusFare')

  const shouldLog = useRef(true)
  useEffect(() => {
    if (shouldLog.current) {
      shouldLog.current = false
      document.addEventListener('click', (e) => onClick(e), false)
    }
    const onClick = (e) => {
      console.log(4310001)

      if (
        e.target.classList.contains('seat') &&
        !e.target.classList.contains('reserved')
      ) {
        console.log(4310002)
        console.log(e.target.id)
        if (seatsData[e.target.id - 1].Status === 'selected') {
          seatsData[e.target.id - 1].Status = 'available'
          SetSeatsCount(--seatsCount)
        } else {
          seatsData[e.target.id - 1].Status = 'selected'
          SetSeatsCount(++seatsCount)
        }

        setSeatsData([...seatsData])
        console.log(4310005, seatsData)
      }
    }
    return () => {
      document.removeEventListener('click', (e) => onClick(e), false)
    }
    // eslint-disable-next-line
  }, [seatsData])

  function ConfirmSave() {
    var SelectedSeats = [...seatsData].filter(
      (seat) => seat.Status === 'selected'
    )
    console.log(SelectedSeats)
    if (SelectedSeats.length === 0) {
      toast.warning('please select a seat')
    } else {
      let arrSeats = SelectedSeats
      localStorage.setItem('selectedSeatsArray', JSON.stringify(SelectedSeats))
      axios
        .put(
          config.serverURL + `/updateSeatStatus/'reserved'`,
          {
            arrSeats,
          },
          {
            headers: { token: sessionStorage['token'] },
          }
        )
        .then((response) => {
          const result = response.data
          if (result['status'] === 'error') {
            // console.log(result['error'])
            toast.error('Error while blocking the seats')
          } else {
            // toast.success('Seats selected successfully')
            localStorage.setItem('totalAmount', seatsCount * busFare)
            navigate('/addAllPassengers')
          }
        })
    }
  }

  console.log(
    'LocalStorage :',
    JSON.parse(localStorage.getItem('selectedSeatsArray'))
  )

  var seatNo = 0
  return (
    <div className='bus-container'>
      <ul className='showcase'>
        <h1 className='title'>Select seats</h1>
        <li>
          <div className='seat available'></div>
          <small>Available</small>
        </li>
        <li>
          <div className='seat selected'></div>
          <small>Selected</small>
        </li>
        <li>
          <div className='seat reserved'></div>
          <small>Reserved</small>
        </li>
      </ul>

      <div className='container'>
        <div className='row'>
          <div
            id='1'
            value='1'
            className={'seat ' + seatsData[seatNo++].Status}>
            1
          </div>
          <div
            id='2'
            value='2'
            className={'seat ' + seatsData[seatNo++].Status}>
            2
          </div>
          <div
            id='3'
            value='3'
            className={'seat ' + seatsData[seatNo++].Status}>
            3
          </div>
          <div
            id='4'
            value='4'
            className={'seat ' + seatsData[seatNo++].Status}>
            4
          </div>
        </div>
        <div className='row'>
          <div
            id='5'
            value='5'
            className={'seat ' + seatsData[seatNo++].Status}>
            5
          </div>
          <div
            id='6'
            value='6'
            className={'seat ' + seatsData[seatNo++].Status}>
            6
          </div>
          <div
            id='7'
            value='7'
            className={'seat ' + seatsData[seatNo++].Status}>
            7
          </div>
          <div
            id='8'
            value='8'
            className={'seat ' + seatsData[seatNo++].Status}>
            8
          </div>
        </div>
        <div className='row'>
          <div
            id='9'
            value='9'
            className={'seat ' + seatsData[seatNo++].Status}>
            9
          </div>
          <div
            id='10'
            value='10'
            className={'seat ' + seatsData[seatNo++].Status}>
            10
          </div>
          <div
            id='11'
            value='11'
            className={'seat ' + seatsData[seatNo++].Status}>
            11
          </div>
          <div
            id='12'
            value='12'
            className={'seat ' + seatsData[seatNo++].Status}>
            12
          </div>
        </div>
        <div className='row'>
          <div
            id='13'
            value='13'
            className={'seat ' + seatsData[seatNo++].Status}>
            13
          </div>
          <div
            id='14'
            value='14'
            className={'seat ' + seatsData[seatNo++].Status}>
            14
          </div>
          <div
            id='15'
            value='15'
            className={'seat ' + seatsData[seatNo++].Status}>
            15
          </div>
          <div
            id='16'
            value='16'
            className={'seat ' + seatsData[seatNo++].Status}>
            16
          </div>
        </div>
        <div className='row'>
          <div
            id='17'
            value='17'
            className={'seat ' + seatsData[seatNo++].Status}>
            17
          </div>
          <div
            id='18'
            value='18'
            className={'seat ' + seatsData[seatNo++].Status}>
            18
          </div>
          <div
            id='19'
            value='19'
            className={'seat ' + seatsData[seatNo++].Status}>
            19
          </div>
          <div
            id='20'
            value='20'
            className={'seat ' + seatsData[seatNo++].Status}>
            20
          </div>
        </div>
        <div className='row'>
          <div
            id='21'
            value='21'
            className={'seat ' + seatsData[seatNo++].Status}>
            21
          </div>
          <div
            id='22'
            value='22'
            className={'seat ' + seatsData[seatNo++].Status}>
            22
          </div>
          <div
            id='23'
            value='23'
            className={'seat ' + seatsData[seatNo++].Status}>
            23
          </div>
          <div
            id='24'
            value='24'
            className={'seat ' + seatsData[seatNo++].Status}>
            24
          </div>
        </div>
        <div className='row'>
          <div
            id='25'
            value='25'
            className={'seat ' + seatsData[seatNo++].Status}>
            25
          </div>
          <div
            id='26'
            value='26'
            className={'seat ' + seatsData[seatNo++].Status}>
            26
          </div>
          <div
            id='27'
            value='27'
            className={'seat ' + seatsData[seatNo++].Status}>
            27
          </div>
          <div
            id='28'
            value='28'
            className={'seat ' + seatsData[seatNo++].Status}>
            28
          </div>
        </div>
        <div className='row'>
          <div
            id='29'
            value='29'
            className={'seat ' + seatsData[seatNo++].Status}>
            29
          </div>
          <div
            id='30'
            value='30'
            className={'seat ' + seatsData[seatNo++].Status}>
            30
          </div>
          <div
            id='31'
            value='31'
            className={'seat ' + seatsData[seatNo++].Status}>
            31
          </div>
          <div
            id='32'
            value='32'
            className={'seat ' + seatsData[seatNo++].Status}>
            32
          </div>
        </div>
      </div>
      <p className='text'>
        You have selected <span id='count'>{seatsCount}</span> seats for a price
        of Rs.
        <span id='total'>{seatsCount * busFare}</span>
      </p>
      <div className='container'>
        <button
          type='button'
          className='btn btn-success'
          onClick={() => {
            ConfirmSave()
          }}>
          <b>Confirm</b>
        </button>
      </div>
    </div>
  )
}
export default SelectSeats
