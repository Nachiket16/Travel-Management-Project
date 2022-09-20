import { Link } from 'react-router-dom'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { signoutRedux } from '../slices/authSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Navbar = () => {
  const navigate = useNavigate()
  const signinStatus = useSelector((state) => state.authSlice.status)
  const dispatch = useDispatch()

  return (
    <nav
      className='navbar navbar-expand-lg navbar-dark '
      style={{ background: '#C70039 ' }}>
      <div className='container-fluid'>
        <Link className='navbar-brand' to='/'>
          <h3>
            Bushub <i className='fas fa-bus-alt'></i>
          </h3>
        </Link>

        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className='collapse navbar-collapse ' id='navbarSupportedContent'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <Link
                className='nav-link active'
                aria-current='page'
                to='/searchbus'>
                <h5>SearchBus🔎</h5>
              </Link>
            </li>

            <li className='nav-item'>
              {signinStatus && sessionStorage['role'] === 'user' && (
                <Link
                  className='nav-link active'
                  aria-current='page'
                  to='/myBookings'>
                  <h5>MyBookings</h5>
                </Link>
              )}
            </li>
            <li className='nav-item'>
              {sessionStorage['role'] === 'admin' && (
                <Link
                  className='nav-link active'
                  aria-current='page'
                  to='/admin/viewBus'>
                  <h5>ViewBuses</h5>
                </Link>
              )}
            </li>
            <li className='nav-item'>
              {sessionStorage['role'] === 'admin' && (
                <Link
                  className='nav-link active'
                  aria-current='page'
                  to='/admin/addBus'>
                  <h5>AddBus</h5>
                </Link>
              )}
            </li>
            <li className='nav-item'>
              {sessionStorage['role'] === 'admin' && (
                <Link
                  className='nav-link active'
                  aria-current='page'
                  to='/admin/addJourney'>
                  <h5>AddJourney</h5>
                </Link>
              )}
            </li>
          </ul>
          <ul className='navbar-nav navbar-right'>
            <li className='nav-item'>
              {signinStatus && (
                <Link
                  className='nav-link active'
                  aria-current='page'
                  to='/myProfile'>
                  <h5>MyProfile</h5>
                </Link>
              )}
            </li>
            {sessionStorage['role'] === 'admin' && (
              <Link className='nav-link active' aria-current='page' to='/admin'>
                <h5>
                  ADMIN<i class='fas fa-user-lock'></i>
                </h5>
              </Link>
            )}
            <li className='nav-item'>
              {!signinStatus && (
                <Link
                  className='nav-link active'
                  aria-current='page'
                  to='/signin'>
                  <h5>SignIn</h5>
                </Link>
              )}
            </li>
            <li className='nav-item'>
              {!signinStatus && (
                <Link
                  className='nav-link active'
                  aria-current='page'
                  to='/signup'>
                  <h5>Signup</h5>
                </Link>
              )}
              {signinStatus && (
                <button
                  className='btn btn-danger btn-lg'
                  aria-current='page'
                  onClick={() => {
                    toast.info('you have logged out')
                    navigate('/signin')
                    dispatch(signoutRedux())
                  }}
                  style={{ background: '#C70039 ' }}>
                  Signout
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
export default Navbar
