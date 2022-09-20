import { useState } from 'react'
import axios from 'axios'
import config from '../../config'
import { useNavigate } from 'react-router-dom'
import '../../styles/admin.css'
import { toast } from 'react-toastify'

const AddBus = () => {
  const [Bus_name, setBus_name] = useState('')
  const [Bus_type, setBus_type] = useState('')
  const [Bus_rating, setBus_rating] = useState('')
  const [Seat_type, setSeat_type] = useState('')
  const [Bus_no, setBus_no] = useState('')

  const navigate = useNavigate()

  const addBus = () => {
    if (Bus_name.length === 0) {
      toast.warning('Enter Proper Bus name')
    } else if (Bus_type.length === 0) {
      toast.warning('please select bus type')
    } else if (Bus_rating < 0 || Bus_rating > 5) {
      toast.warning('please enter bus rating between 0 to 5')
    } else if (Seat_type.length === 0) {
      toast.warning('please select seat type')
    } else if (Bus_no.length === 0) {
      toast.warning('please enter bus no.')
    } else {
      axios
        .post(
          config.serverURL + '/admin/addBus',
          {
            Bus_name,
            Bus_type,
            Bus_rating,
            Seat_type,
            Bus_no,
          },
          {
            headers: { token: sessionStorage['token'] },
          }
        )
        .then((response) => {
          const result = response.data
          if (result['status'] === 'error') {
            console.log(result.error)
            toast.error('Error occurred while adding bus')
          } else {
            toast.success('Bus added succssfully')
            navigate('/admin')
          }
        })
    }
  }

  return (
    <div
      style={{
        width: 450,
        height: 610,
        position: 'relative',
        top: 40,
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
      <div className='mb-3'>
        <h1
          style={{
            padding: 0,
          }}>
          Add Bus
        </h1>
        <div className='mb-3'>
          <label className='form-label'>Bus Name</label>
          <input
            type='text'
            className='form-control'
            placeholder='Enter Bus Company Name'
            onChange={(event) => {
              setBus_name(event.target.value)
            }}
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Bus Type</label>
          <select
            onChange={(event) => {
              setBus_type(event.target.value)
            }}
            className='form-select'
            aria-label='Default select example'>
            <option>Choose Bus Type</option>
            <option value='AC'>AC</option>
            <option value='Non-AC'>Non-AC</option>
          </select>
        </div>
        <div className='mb-3'>
          <label className='form-label'>Bus Rating</label>
          <input
            type='text'
            className='form-control'
            placeholder='0.0 to 5.0'
            onChange={(event) => {
              setBus_rating(event.target.value)
            }}
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Seat Type</label>
          <select
            onChange={(event) => {
              setSeat_type(event.target.value)
            }}
            className='form-select'
            aria-label='Default select example'>
            <option>Choose Seat Type</option>
            <option value='Seater'>Seater</option>
            <option value='Sleeper'>Sleeper</option>
          </select>
        </div>
        <div className='mb-3'>
          <label className='form-label'>Bus No.</label>
          <input
            type='text'
            className='form-control'
            placeholder='Enter Bus No. eg.MH01A8888'
            onChange={(event) => {
              setBus_no(event.target.value)
            }}
          />
        </div>
        <div className='container'>
          <button
            onClick={addBus}
            className='btn btn-success'
            style={{
              marginTop: 20,
              width: 170,
            }}>
            <i class='fas fa-bus'></i> Add Bus
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddBus
