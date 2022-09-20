import { useState } from 'react'
import axios from 'axios'
import config from '../config'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Signup = () => {
  const [First_name, setFirst_name] = useState('')
  const [Last_name, setLast_name] = useState('')
  const [Email, setEmail] = useState('')
  const [Phone_no, setPhone_no] = useState('')
  const [Password, setPassword] = useState('')

  const navigate = useNavigate()

  const signup = () => {
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
        .post(config.serverURL + '/signup', {
          First_name,
          Last_name,
          Email,
          Phone_no,
          Password,
        })
        .then((response) => {
          const result = response.data
          if (result['status'] === 'error') {
            toast.error('invalid Email or Password')
          } else {
            toast.success(
              'Dear ' + First_name + ', your account is created successfully'
            )
            navigate('/signin')
          }
        })
    }
  }

  return (
    <div
      style={{
        width: 450,
        height: 600,
        position: 'relative',
        top: 50,
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
        Signup
      </h1>
      <div className='mb-3'>
        <label className='form-label'>First Name</label>
        <input
          type='text'
          className='form-control'
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
          onClick={signup}
          className='btn btn-success'
          style={{
            marginTop: 20,
            width: 170,
          }}>
          <i class='fas fa-user-plus'></i> Signup
        </button>
      </div>
    </div>
  )
}
export default Signup
