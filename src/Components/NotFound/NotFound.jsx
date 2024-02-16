import React from 'react'
import notFoundImg from '../../Assets/images/error.svg'
export default function NotFound() {
  return (
    <div>
      <img src={notFoundImg} alt="error-img" className='d-block m-auto py-5 w-50' />
    </div>
  )
}
