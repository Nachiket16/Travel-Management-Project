//import React, { useState } from "react";
// import { useState } from 'react'
// import axios from 'axios'
// import config from '../config'
import { useNavigate } from 'react-router-dom'
import '../../styles/admin.css'

const Admin = () => {
  const navigate = useNavigate()

  const addBus = () => {
    navigate('/admin/addBus')
  }
  const addJourney = () => {
    navigate('/admin/addJourney')
  }
  const viewJourney = () => {
    navigate('/admin/viewJourney')
  }
  const viewBus = () => {
    navigate('/admin/viewBus')
  }

  const viewPayment = () => {
    navigate('/admin/viewPayment')
  }

  return (
    <div
      style={{
        width: 450,
        height: 600,
        position: 'relative',
        top: 40,
        left: 0,
        bottom: 0,
        margin: 'auto',
        borderStyle: 'solid',
        borderColor: 'lightblue',
        borderRadius: 20,
        padding: 10,
        color: 'black',
      }}>
      <h1
        style={{
          padding: 20,
        }}>
        Admin Home
      </h1>
      <div className='container'>
        <button onClick={addJourney} className='btn btn-primary btn-lg'>
          <i class='fas fa-road'></i> Add Journey
        </button>

        <br />
        <br />
        <button onClick={addBus} className='btn btn-primary btn-lg'>
          <i class='fas fa-bus'></i> Add Bus
        </button>
        <br />
        <br />
        <button onClick={viewJourney} className='btn btn-primary btn-lg'>
          <i class='fas fa-eye'></i> View Journey
        </button>

        <br />
        <br />

        <button onClick={viewBus} className='btn btn-primary btn-lg'>
          <i class='fas fa-bus'></i> View Bus
        </button>

        <br />
        <br />

        <button onClick={viewPayment} className='btn btn-primary btn-lg'>
          <i class='fas fa-file-invoice-dollar'></i> View Payment
        </button>
      </div>
    </div>
  )
}

export default Admin
