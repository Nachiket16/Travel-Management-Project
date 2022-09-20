import axios from 'axios'
import config from '../../config'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ViewJourney = () => {
  const [view, viewJourney] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    getViewJourney()
  }, [])

  const getViewJourney = () => {
    axios
      .get(config.serverURL + '/admin/viewJourney', {
        headers: { token: sessionStorage['token'] },
      })
      .then((response) => {
        const result = response.data

        if (result['status'] === 'success') {
          // console.log(result)
          // set the homes to the state member
          viewJourney(result['data'])
        } else {
          toast.error(result['error'])
        }
      })
  }
  // const editJourney = (Journey_id) => {
  //   // pass the Journey id which you want to edit
  //   navigate('/admin/editJourney', {
  //     state: { journeyId: Journey_id },
  //   })
  // }

  return (
    <div>
      <h3 style={styles.h3}>View Journey Details</h3>
      <table className='table table-light table-striped'>
        <thead>
          <tr>
            <th>Journey_id</th>
            <th>Bus_id</th>
            <th>From_location</th>
            <th>To_location</th>
            <th>Departure_datetime</th>
            <th>Available_datetime</th>
            <th>Available_seats</th>
            <th>Fare</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {view.map((props) => {
            return (
              <tr>
                <td>{props.Journey_id}</td>
                <td>{props.Bus_id}</td>
                <td>{props.From_location}</td>
                <td>{props.To_location}</td>
                <td>{props.Departure_datetime}</td>
                <td>{props.Arrival_datetime}</td>
                <td>{props.Available_seats}</td>
                <td>{props.Fare}</td>
                <td>
                  <button
                    onClick={() =>
                      navigate('/admin/editJourney', {
                        state: { journeydata: props },
                      })
                    }
                    className='btn btn-sm btn-warning'>
                    Edit
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
const styles = {
  h3: {
    color: 'black',
    textAlign: 'center',
    margin: 20,
  },
  button: {
    marginRight: 10,
  },
}
export default ViewJourney
