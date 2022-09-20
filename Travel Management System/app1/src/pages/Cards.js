import '../styles/Cards.css'
import React from 'react'
import CardItem from './CardItem'
const Cards = () => {
  return (
    <>
      <div className='cards'>
        <h1>All About Us</h1>
        <div className='cards__container'>
          <div className='cards__wrapper'>
            <ul className='cards__items'>
              <CardItem
                src='images/img-9.jpg'
                text='Travel and Explore all the beautiful tourist destination'
                label='Travel'
                path='/services'
              />
              <CardItem
                src='images/img-2.jpg'
                text='Travel through the Country with Luxury'
                label='Luxury'
                path='/services'
              />
            </ul>
            <ul className='cards__items'>
              <CardItem
                src='images/img-3.jpg'
                text='Set Sail around the country for solo Traveler'
                label='Mystery'
                path='/services'
              />
              <CardItem
                src='images/img-4.jpg'
                text='Special Reservation For Women'
                label='Care'
                path='/products'
              />
              <CardItem
                src='images/img-8.jpg'
                text='We Welcome Everyone on this journey'
                label='Comfort'
                path='/sign-up'
              />
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cards
