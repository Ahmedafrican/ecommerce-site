import axios from 'axios'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { AuthContext } from '../../Contexts/AuthContext'


export default function Login() {
  
  let navigate = useNavigate()
  let[errorMessage , setErrorMessage] = useState('')
  let[isLoading , setIsLoading] = useState(false)

  let {setUserIsLoggedIn , userIsLoggedIn} =useContext(AuthContext)


  async function login(){
    setErrorMessage('')
    setIsLoading(true)
   let {data} =await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin' , formik.values).catch((err)=>{
    setErrorMessage(err.response.data.message)
    setIsLoading(false)
   })
   if(data.message === 'success'){
    setIsLoading(true)
    setUserIsLoggedIn(true)
    localStorage.setItem('token',data.token)
    navigate('/home')
   }
  }
 



  let vlidation2 = Yup.object({
    
    email : Yup.string().required('Email is required').matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,'Invalid email address'),
    password : Yup.string().required('Password is required'),
   
  })


  let formik = useFormik({
    initialValues:{
      email : '',
      password : '',
    },
    onSubmit : login,
    // validate : validation
    validationSchema : vlidation2
  })
  return (
    <>
      <div className='w-75 m-auto my-5 '>
        <h1>Login Now :</h1>
        <form onSubmit={formik.handleSubmit}>
        

          <label htmlFor="email" className='my-1'>Email:</label>
          <input value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" className='form-control mb-3' id='email' name='email' />
          {formik.errors.email && formik.touched.email? <div className="alert alert-danger">{formik.errors.email}</div> : null }

          <label htmlFor="password" className='my-1'>Password:</label>
          <input value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" className='form-control mb-3' id='password' name='password' />
          {formik.errors.password && formik.touched.password? <div className="alert alert-danger">{formik.errors.password}</div> : null}

         
          {errorMessage? <div className='alert alert-danger'>{errorMessage}</div> : null}
          

          {/* <button disabled ={!formik.isValid} type='submit'  className='btn btn-danger px-3 d-block ms-auto'>Register</button> */}
          {/* <button disabled ={formik.errors} type='submit'  className='btn btn-danger px-3 d-block ms-auto'>Register</button> */}
          {isLoading? <button disabled  type='button' className='btn btn-danger d-block ms-auto px-3'><i className='fas fa-spin fa-spinner'></i></button> : <button disabled = {!(formik.isValid && formik.dirty)} type='submit' className='btn btn-danger d-block ms-auto px-3'>Log in</button>}
          
          


        </form>
      </div>
    </>
  )
}
