import { useState } from 'react'
import axios from 'axios'
import config from '../config'
import { toast } from 'react-toastify'

const PassengerForm = () => {
  const [Name, setName] = useState('')
  const [Gender, setGender] = useState('')
  const [Phone_no, setPhone_no] = useState('')
  const [Age, setAge] = useState(0)
  const [buttonStatus, setButtonStatus] = useState(true)
  var passengerIdArray = []

  const addPassenger = () => {
    if (Name.length === 0) {
      toast.warning('please enter Name')
    } else if (Gender.length === 0) {
      toast.warning('please select Gender')
    } else if (Age < 1 || Age > 80) {
      toast.warning('please enter Age between 1 to 80')
    } else if (Phone_no.length !== 10) {
      toast.warning('please enter Phone_no (10 digits)')
    } else {
      axios
        .post(
          config.serverURL + '/addPassenger',
          {
            Name,
            Gender,
            Age,
            Phone_no,
          },
          {
            headers: { token: sessionStorage['token'] },
          }
        )
        .then((response) => {
          const result = response.data
          if (result['status'] === 'error') {
            toast.error('Error while adding Passenger')
          } else {
            // console.log('123456-insertId :', result['data'].insertId)

            passengerIdArray = JSON.parse(
              localStorage.getItem('passengerIdArray')
            )

            passengerIdArray.push(result['data'].insertId)

            localStorage.setItem(
              'passengerIdArray',
              JSON.stringify(passengerIdArray)
            )
            toast.success(Name + `'s details added successfully`)
            setButtonStatus(false)
          }
        })
    }
  }

  return (
    <div>
      <div>
        <div className='mb-3'>
          <label className='form-label'>Name</label>
          <input
            type='text'
            className='form-control'
            placeholder='Enter Name'
            disabled={!buttonStatus}
            onChange={(event) => {
              setName(event.target.value)
            }}
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Gender</label>
          <select
            class='form-select'
            disabled={!buttonStatus}
            onChange={(event) => {
              setGender(event.target.value)
            }}>
            <option>select gender</option>
            <option value='male'>Male</option>
            <option value='female'>Female</option>
            <option value='other'>Other</option>
          </select>
        </div>
        <div className='mb-3'>
          <label className='form-label'>Age</label>
          <input
            type='Number'
            className='form-control'
            min='1'
            max='80'
            placeholder='Enter Age (1 to 80)'
            disabled={!buttonStatus}
            onChange={(event) => {
              setAge(event.target.value)
            }}
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Phone no.</label>
          <input
            type='Number'
            className='form-control'
            min='1000000000'
            max='9999999999'
            placeholder='Enter Phone no. (10 digits)'
            disabled={!buttonStatus}
            onChange={(event) => {
              setPhone_no(event.target.value)
            }}
          />
        </div>
        <div className='col-6 mx-auto'>
          <button
            type='button'
            onClick={addPassenger}
            className='btn btn-danger'
            disabled={!buttonStatus}
            style={{
              fontWeight: 'bold',
              textAlign: 'center',
              margin: 12,
            }}>
            {buttonStatus ? 'Confirm' : 'Saved'}
          </button>
        </div>
      </div>
    </div>
  )
}
export default PassengerForm
