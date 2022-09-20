import { useNavigate } from 'react-router-dom'
import PassengerForm from '../components/passengerForm'

const AddAllPassengers = () => {
  const navigate = useNavigate()
  localStorage.setItem('passengerIdArray', JSON.stringify([]))
  const selectedSeatsArray = JSON.parse(
    localStorage.getItem('selectedSeatsArray')
  )
  console.log('selectedSeatsArray: ', selectedSeatsArray)

  const proceedToPayment = () => {
    var arrPassengerId = JSON.parse(localStorage.getItem('passengerIdArray'))
    console.log('LocalStorage => Passenger_IDs ', arrPassengerId)
    navigate('/payment')
  }

  return (
    <div className='container-fluid'>
      <br />
      <div className='row' style={{ alignItems: 'center' }}>
        <h1
          style={{
            padding: 0,
            paddingBottom: 15,
          }}>
          Add Passenger Details
        </h1>

        {selectedSeatsArray.map((props) => {
          return (
            <div
              key={props.Seat_no}
              className='col-3'
              style={{
                width: 390,
                height: 490,
                borderColor: 'lightblue',
                borderRadius: 20,
                paddingInline: 40,
                //paddingTop: 20,
                color: 'black',
                marginBottom: 20,
                marginLeft: 10,
                marginRight: 10,
                borderStyle: 'outset',
                borderWidth: 5,
              }}>
              <h4
                style={{
                  // color: 'grey',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  margin: 20,
                }}>
                Seat {props.Seat_no}
              </h4>
              <PassengerForm />
            </div>
          )
        })}
      </div>
      <div className='container'>
        <button
          type='button'
          className='btn btn-success btn-lg'
          style={{
            margin: 20,
            width: 300,
          }}
          onClick={proceedToPayment}>
          <b>Proceed to payment</b>
        </button>
      </div>
    </div>
  )
}
export default AddAllPassengers
