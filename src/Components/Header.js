import React from 'react'
import { Link } from 'react-router-dom'
import Footer from './Footer'

export default function Header() {
  return (
    <div className='header'>
        <Link to='/'><h2>Global Knowledge</h2></Link>
        <Footer />

    </div>
  )
}
