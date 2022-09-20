import { useState } from 'react'
import axios from 'axios'
import config from '../config'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'

const UpdateMyProfile = () => {
  const location = useLocation()
  const navigate = useNavigate()

  var userData = location.state.userData

  const [First_name, setFirst_name] = useState(userData[0].First_name)
  const [Last_name, setLast_name] = useState(userData[0].Last_name)
  const [Email, setEmail] = useState(userData[0].Email)
  const [Phone_no, setPhone_no] = useState(userData[0].Phone_no)
  const [Password, setPassword] = useState('')

  const updateMyProfile = () => {
    // check if user has really entered any value
    if (First_name.length === 0) {
      toast.warning('please enter First Name')
    } else if (Last_name.length === 0) {
      toast.warning('please  enter Last Name')
    } else if (Email.length === 0) {
      toast.warning('please enter Email')
    } else if (Phone_no.length === 0) {
      toast.warning('please Phone_no')
    } else if (Password.length === 0) {
      toast.warning('please enter Password')
    } else {
      axios
        .put(
          config.serverURL + '/updateMyProfile',
          {
            First_name,
            Last_name,
            Email,
            Phone_no,
            Password,
          },
          {
            headers: { token: sessionStorage['token'] },
          }
        )
        .then((response) => {
          const result = response.data
          if (result['status'] === 'error') {
            toast.error('invalid Email or Password')
          } else {
            console.log(result['data'])
            if (result['data'].affectedRows === 1) {
              toast.success(
                'Dear ' + First_name + ', your profile is updated successfully'
              )
              navigate('/myProfile')
            } else {
              toast.error('Wrong Password')
            }
          }
        })
    }
  }

  return (
    <div className='container-fluid'>
      <h1
        style={{
          padding: 20,
        }}>
        Update Profile
      </h1>
      <div
        style={{
          width: 450,
          height: 560,
          position: 'relative',
          top: 0,
          left: 0,
          bottom: 0,
          margin: 'auto',
          borderStyle: 'solid',
          borderColor: 'lightblue',
          borderRadius: 20,
          padding: 30,
          color: 'black',
        }}>
        <div className='mb-3'>
          <label className='form-label'>First Name</label>
          <input
            type='text'
            className='form-control'
            value={First_name}
            onChange={(event) => {
              setFirst_name(event.target.value)
            }}
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Last Name</label>
          <input
            type='text'
            className='form-control'
            value={Last_name}
            onChange={(event) => {
              setLast_name(event.target.value)
            }}
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Email</label>
          <input
            type='Email'
            className='form-control'
            value={Email}
            onChange={(event) => {
              setEmail(event.target.value)
            }}
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Phone no.</label>
          <input
            type='Phone_no'
            className='form-control'
            value={Phone_no}
            onChange={(event) => {
              setPhone_no(event.target.value)
            }}
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Password</label>
          <input
            type='Password'
            className='form-control'
            onChange={(event) => {
              setPassword(event.target.value)
            }}
          />
        </div>
        <div className='container'>
          <button
            onClick={updateMyProfile}
            className='btn btn-success'
            style={{
              marginTop: 20,
              width: 170,
            }}>
            <i class='fas fa-user-plus'></i> Update Profile
          </button>
        </div>
      </div>
    </div>
  )
}
export default UpdateMyProfile
