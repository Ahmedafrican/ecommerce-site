import axios from 'axios';
import { useFormik } from 'formik'
import React from 'react'
import { useParams } from 'react-router-dom';

function Adress() {

  let {cartId} = useParams()

    async function order (values){
        let res = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,{
          shippingAddress : values
        },{
          headers :{
            token : localStorage.getItem('token')
          }
        })
        window.location.href = res.data.session.url
    }

    let formik = useFormik({
        initialValues:{
          details : '',
          phone : '',
          city : ''
        },
        onSubmit : order
      })


  return (
    <form className='w-75 m-auto' onSubmit={formik.handleSubmit}>
        

    <label htmlFor="details" className='my-1'>Details</label>
    <input value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" className='form-control mb-3' id='details' name='details' />

    <label htmlFor="phone" className='my-1'>Phone:</label>
    <input value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} type="tel" className='form-control mb-3' id='phone' name='phone' />

    <label htmlFor="city" className='my-1'>City:</label>
    <input value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" className='form-control mb-3' id='city' name='city' />

    <button  type='submit' className='btn btn-danger d-block ms-auto px-3'>Order</button>
    

    
    
    


  </form>
  )
}

export default Adress