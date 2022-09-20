import axios from 'axios'
import config from '../config'
import { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import jsPDF from 'jspdf'
import logo from './Logo/Bus.jpg'

const MyBookings = () => {
  const [bookingsList, setBookingsList] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    if (!sessionStorage['token']) {
      navigate('/signin')
    } else {
      getMyBookings()
    }
    // eslint-disable-next-line
  }, [])

  const getMyBookings = () => {
    axios
      .get(config.serverURL + `/myBookings`, {
        headers: { token: sessionStorage['token'] },
      })
      .then((response) => {
        const result = response.data
        if (result['status'] === 'error') {
          toast.error('Error while fetching your Bookings')
        } else {
          setBookingsList(result['data'])
          console.log(431000, result['data'])
        }
      })
  }

  const cancelTicket = (Seat_no, Journey_id) => {
    console.log('cancelTicket :: ', Seat_no, Journey_id)
    axios
      .post(
        config.serverURL + `/cancelTicket`,
        {
          Seat_no,
          Journey_id,
        },
        {
          headers: { token: sessionStorage['token'] },
        }
      )
      .then((response) => {
        const result = response.data
        if (result['status'] === 'error') {
          toast.error('Error while cancelling the ticket')
        } else {
          toast.success('Ticket cancelled successfully')
          getMyBookings()
        }
      })
  }

  const downloadInvoice= (Name,BusName,Source,Destination,DepartureDate
    ,DepartureTime,Fare)=>{
    var doc=new jsPDF('landscape', 'px', 'a4','false');
    doc.addImage(logo,'PNG',65,20,100,100)
    doc.setFont('Helvertica', 'bold')
    doc.setTextColor('red')
    doc.setFontSize(80)
    doc.text(200,50,'BUS-HUB')
    doc.setFont('Helvertica', 'bold')
    doc.setFontSize(18)
    doc.setTextColor('Black')
    doc.text(60,170,'Name: ')
    doc.text(60,190, 'Bus Name: ')
    doc.text(60,210, 'Start: ')
    doc.text(60,230, 'Destination: ')
    doc.text(60,250, 'Date: ')
    doc.text(60,270, 'Time:')
    doc.setTextColor('red')
    doc.text(60,290, 'Fare:')
    doc.setFont('Helvertica', 'Normal')
    doc.setTextColor('Black')
    doc.text(132,170,Name)
    doc.text(132,190,BusName)
    doc.text(132,210,Source)
    doc.text(132,230,Destination)
    doc.text(132,250,DepartureDate)
    doc.text(132,270,DepartureTime)
    doc.setTextColor('red')
    doc.text(132,290, Fare +' Rs only')
    doc.setTextColor('green')
    doc.setFontSize(20)
    doc.text(150,380, '*** THANK YOU FOR TRAVELLING WITH US ***')
    doc.save('Invoice.pdf')
  }

  return (
    <div className='container-fluid'>
      <h1
        style={{
          padding: 10,
        }}>
        My Bookings
      </h1>

      <table
        className='table table-light table-striped'
        style={{ textAlign: 'center' }}>
        <thead>
          <tr>
            <th>Departure-Date</th>
            <th>Passenger Name</th>
            <th>Bus</th>
            <th>Source</th>
            <th>Destination</th>
            <th>Departure-Time</th>
            <th>Fare</th>
            <th>BusType</th>
            <th>Seat-No</th>
            <th>Bus-No</th>
            <th></th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {bookingsList.map((props) => {
            return (
              <tr key={props.Ticket_id}>
                <td>{props.departureDate}</td>
                <td>{props.Name}</td>
                <td>{props.Bus_name}</td>
                <td>{props.source}</td>
                <td>{props.destination}</td>
                <td>{props.departureTime}</td>
                <td>{props.Fare}</td>
                <td>
                  {props.Bus_type}/{props.Seat_type}
                </td>
                <td>{props.Seat_no}</td>
                <td>{props.Bus_no}</td>
                <td>
                  <button
                    onClick={() => {
                      cancelTicket(props.Seat_no, props.Journey_id)
                    }}
                    className='btn btn-sm btn-danger'>
                    Cancel Booking
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      let num = props.Fare;
                      let text = num.toString();
                      downloadInvoice(props.Name,props.Bus_name,props.source,props.destination,props.departureDate
                        ,props.departureTime,text)
                      toast.success('Pdf Downloaded Successfully')
                    }}
                    className='btn btn-sm btn-success'>
                    Download Ticket
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      {bookingsList.length === 0 && (
        <h3 style={{ textAlign: 'center', margin: 30, color: 'orange' }}>
          Your booking list is empty. Please book the ticket.
        </h3>
      )}
    </div>
  )
}

export default MyBookings
