import React from 'react'

export default function Footer() {
  return (
    <footer className='bg-main-light py-5'>
      <div className="container">
        <h4>Get the Frech Cart App</h4>
        <p>We will send you a link ,ioan it on your phone tp download the app.</p>
        <div className="row">
          <div className="col-sm-10">
            <div className="form1">
              <input type="text" className='form-control py-2' placeholder='Email'/>
            </div>
          </div>
          <div className="col-sm-2 ps-3">
            <div className="button1">
              <button className='btn bg-danger text-white w-100'>Share App Link</button>
            </div>
          </div>
        </div>
        <div className="line border-bottom border-2 my-4"></div>
      </div>
    </footer>
  )
}
