import axios from 'axios'
import config from '../../config'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'

const ViewPayment = () => {
  const [view, viewPayment] = useState([])

  // const navigate = useNavigate()

  useEffect(() => {
    getViewPayment()
  }, [])

  const getViewPayment = () => {
    axios
      .get(config.serverURL + '/admin/viewPayment', {
        headers: { token: sessionStorage['token'] },
      })
      .then((response) => {
        const result = response.data

        if (result['status'] === 'success') {
          console.log(result)
          // set the homes to the state member
          viewPayment(result['data'])
        } else {
          toast.error(result['error'])
        }
      })
  }

  return (
    <div className='container-fluid'>
      <h3 style={styles.h3}>View Payment Details</h3>
      <table
        className='table table-light table-striped'
        style={{ textAlign: 'center' }}>
        <thead>
          <tr>
            <th>Payment_id </th>
            <th>User_id </th>
            <th>Payment_type </th>
            <th>Amount </th>
            <th>Transaction_datetime </th>
          </tr>
        </thead>
        <tbody>
          {view.map((props) => {
            return (
              <tr>
                <td>{props.Payment_id}</td>
                <td>{props.User_id}</td>
                <td>{props.Payment_type}</td>
                <td>{props.Amount}</td>
                <td>{props.Transaction_datetime}</td>
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
export default ViewPayment
