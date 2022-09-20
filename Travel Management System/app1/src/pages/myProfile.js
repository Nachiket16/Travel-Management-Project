import { useState } from 'react'
import axios from 'axios'
import config from '../config'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const MyProfile = () => {
  const [userData, setUserData] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    if (!sessionStorage['token']) {
      navigate('/signin')
    } else {
      getMyProfile()
    }
    // eslint-disable-next-line
  }, [])

  const getMyProfile = () => {
    axios
      .get(config.serverURL + '/myProfile', {
        headers: { token: sessionStorage['token'] },
      })
      .then((response) => {
        const result = response.data
        if (result['status'] === 'error') {
          toast.error('Error while fetching your profileData')
        } else {
          setUserData(result['data'])
          console.log(431000, result['data'])
        }
      })
  }

  return (
    <div
      style={{
        width: 450,
        height: 430,
        position: 'relative',
        top: 80,
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
          paddingTop: 0,
          paddingBottom: 20,
        }}>
        My Profile
      </h1>
      <div className='container'>
        <table
          className='table'
          style={{
            textAlign: 'left',
            width: 400,
            height: 200,
            color: 'dimgrey',
          }}>
          {userData.map((props) => {
            return (
              <tbody>
                <tr>
                  <td>
                    <h4>Name : </h4>
                  </td>
                  <td>
                    <h4>
                      {props.First_name} {props.Last_name}
                    </h4>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h4>Role : </h4>
                  </td>
                  <td>
                    <h4>{props.Role.toUpperCase()} </h4>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h4>Phone : </h4>
                  </td>
                  <td>
                    <h4>{props.Phone_no} </h4>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h4>Email : </h4>
                  </td>
                  <td>
                    <h4>{props.Email} </h4>
                  </td>
                </tr>
              </tbody>
            )
          })}
        </table>
      </div>
      <div className='container'>
        <button
          onClick={() => {
            navigate('/updateMyProfile', { state: { userData } })
          }}
          className='btn btn-danger'
          style={{
            marginTop: 10,
            width: 170,
          }}>
          Edit Profile
        </button>
      </div>
    </div>
  )
}
export default MyProfile
