import { useState } from 'react'
import axios from 'axios'
import config from '../config'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useDispatch } from 'react-redux'
import { signinRedux } from '../slices/authSlice'

const Signin = () => {
  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const signin = () => {
    // check if user has really entered any value
    if (Email.length === 0) {
      toast.warning('please enter Email')
    } else if (Password.length === 0) {
      toast.warning('please enter Password')
    } else {
      axios
        .post(config.serverURL + '/signin', {
          Email,
          Password,
        })
        .then((response) => {
          const result = response.data
          if (result['status'] === 'error') {
            toast.error(result['error'])
          } else {
            const user = result['data']
            dispatch(signinRedux(user))
            toast.success(
              'Hello ' + user['First_name'] + ', welcome to Bus-hub'
            )
            console.log(user.Role === 'admin')
            if (user.Role === 'admin') {
              navigate('/admin')
            } else {
              navigate('/')
            }
          }
        })
    }
  }
  return (
    <div
      style={{
        width: 450,
        height: 390,
        position: 'relative',
        top: 100,
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
        Signin
      </h1>
      <div className='mb-3'>
        <label className='form-label'>Email</label>
        <input
          type='email'
          className='form-control'
          onChange={(event) => {
            setEmail(event.target.value)
          }}
        />
      </div>
      <div className='mb-3'>
        <label className='form-label'>Password</label>
        <input
          type='password'
          className='form-control'
          onChange={(event) => {
            setPassword(event.target.value)
          }}
        />
      </div>
      <div className='container'>
        <button
          onClick={signin}
          className='btn btn-success'
          style={{
            margin: 20,
            width: 180,
          }}>
          <i className='fas fa-sign-in-alt'></i> Sign-In
        </button>
        <br />

        <Link to='/signup' style={{ textAlign: 'center' }}>
          Don't have an account. SIGN UP
        </Link>
      </div>
    </div>
  )
}
export default Signin
