import axios from 'axios'
import config from '../../config'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ViewBus = () => {
  const [view, viewBus] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    getViewBus()
  }, [])

  const getViewBus = () => {
    axios
      .get(config.serverURL + '/admin/viewBus', {
        headers: { token: sessionStorage['token'] },
      })
      .then((response) => {
        const result = response.data

        if (result['status'] === 'success') {
          console.log(result)
          // set the homes to the state member
          viewBus(result['data'])
        } else {
          toast.error(result['error'])
        }
      })
  }

  return (
    <div className='container-fluid'>
      <h3 style={styles.h3}>View Bus Details</h3>
      <table
        className='table table-light table-striped'
        style={{ textAlign: 'center' }}>
        <thead>
          <tr>
            <th>Bus_id</th>
            <th>Bus_name</th>
            <th>Bus_type</th>
            <th>Bus_rating</th>
            <th>Seat_type</th>
            <th>Bus_no</th>
            <th>Total_seats</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {view.map((props) => {
            return (
              <tr key={props.Bus_id}>
                <td>{props.Bus_id}</td>
                <td>{props.Bus_name}</td>
                <td>{props.Bus_type}</td>
                <td>{props.Bus_rating}</td>
                <td>{props.Seat_type}</td>
                <td>{props.Bus_no}</td>
                <td>{props.Total_seats}</td>
                <td>
                  <button
                    onClick={() => {
                      navigate('/admin/editBus', { state: { busdata: props } })
                    }}
                    className='btn btn-sm btn-warning'>
                    Edit Bus
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
export default ViewBus
