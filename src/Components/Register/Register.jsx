import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'


export default function Register() {
  
  let navigate = useNavigate()
  let[errorMessage , setErrorMessage] = useState('')
  let[isLoading , setIsLoading] = useState(false)
  
  async function register(){
    setErrorMessage('')
    setIsLoading(true)
   let {data} =await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup' , formik.values).catch((err)=>{
    
    setErrorMessage(err.response.data.message)
    setIsLoading(false)
   })
   console.log(data);
   if(data.message == 'success'){
    setIsLoading(true)
    navigate('/login')
   }
  }
 

  function validation(values){
    let errors = {}

    if(values.name == ''){
      errors.name = 'Name is required'
    }else if(values.name.length < 3){
      errors.name = 'Min length 3 characters'
    }else if (values.name.length > 20){
      errors.name = 'Max length 20 characters'
    }

    if(values.email == ''){
      errors.email = 'Email is required'
    }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
      errors.email = 'Invalid email address'
    }

    if(values.password == ''){
      errors.password = 'Password is required'
    }
    

    if(values.rePassword == ''){
      errors.rePassword = 'Repassword is requierd'
    }else if(values.password != values.rePassword ){
      errors.rePassword ="Password and repassword dosen't matche"
    }

    if(values.phone == ''){
      errors.phone = 'Phone is required'
    }else if(!/^01[0125][0-9]{8}$/.test(values.phone)){
      errors.phone = 'Enter valid egyption number'
    }

    return errors
  }

  let vlidation2 = Yup.object({
    name : Yup.string().required('Name is required').min(3,'Min length 3 characters').max(20,'Max length 20 characters'),
    email : Yup.string().required('Email is required').matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,'Invalid email address'),
    password : Yup.string().required('Password is required'),
    rePassword : Yup.string().required('Repassword is requierd').oneOf([Yup.ref('password')],"Password and repassword dosen't matche"),
    phone :Yup. string().required('Phone is required').matches(/^01[0125][0-9]{8}$/,'Enter valid egyption number')
  })


  let formik = useFormik({
    initialValues:{
      name : '',
      email : '',
      password : '',
      rePassword : '',
      phone : ''
    },
    onSubmit : register,
    // validate : validation
    validationSchema : vlidation2
  })
  return (
    <>
      <div className='w-75 m-auto my-5 '>
        <h1>Register Now :</h1>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="name" className='my-1'>Name:</label>
          <input value={formik.values.name} onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" className='form-control mb-3' id='name' name='name' />
          {formik.errors.name && formik.touched.name? <div className="alert alert-danger">{formik.errors.name}</div> : null}

          <label htmlFor="email" className='my-1'>Email:</label>
          <input value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" className='form-control mb-3' id='email' name='email' />
          {formik.errors.email && formik.touched.email? <div className="alert alert-danger">{formik.errors.email}</div> : null }

          <label htmlFor="password" className='my-1'>Password:</label>
          <input value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" className='form-control mb-3' id='password' name='password' />
          {formik.errors.password && formik.touched.password? <div className="alert alert-danger">{formik.errors.password}</div> : null}

          <label htmlFor="rePassword" className='my-1'>Repassword:</label>
          <input value={formik.values.rePassword} onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" className='form-control mb-3' id='rePassword' name='rePassword' />
          {formik.errors.rePassword && formik.touched.rePassword? <div className="alert alert-danger">{formik.errors.rePassword}</div> : null}

          <label htmlFor="phone" className='my-1'>Phone:</label>
          <input value={formik.values.phone} onBlur={formik.handleBlur} onChange={formik.handleChange} type="tel" className='form-control mb-3' id='phone' name='phone' />
          {formik.errors.phone && formik.touched.phone? <div className="alert alert-danger">{formik.errors.phone}</div> : null}
          
          {errorMessage? <div className='alert alert-danger'>{errorMessage}</div> : null}
          

          {/* <button disabled ={!formik.isValid} type='submit'  className='btn btn-danger px-3 d-block ms-auto'>Register</button> */}
          {/* <button disabled ={formik.errors} type='submit'  className='btn btn-danger px-3 d-block ms-auto'>Register</button> */}
          {isLoading? <button disabled  type='button' className='btn btn-danger d-block ms-auto px-3'><i className='fas fa-spin fa-spinner'></i></button> : <button disabled = {!(formik.isValid && formik.dirty)} type='submit' className='btn btn-danger d-block ms-auto px-3'>Register</button>}
          
          


        </form>
      </div>
    </>
  )
}
