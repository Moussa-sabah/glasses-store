

import React from 'react'
import { Link } from 'react-router-dom'


export default function HeaderLeft() {
  return (
    <div className="header-left">
    <i className="bi bi-eyeglasses"></i>
    <Link className='web-name' to='/'>GlassesWeb</Link>
  </div>
  )
}
