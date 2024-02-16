import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'


export default function Cart() {
 

  let [loggedUserCart , setLoggedUserCart ] = useState([])
  let [errorMessage , setErrorMessage ] = useState('')
  let [isLoading , setIsLoading ] = useState(false)
  let [requestTime , setRequestTime ] = useState()
  let [totalCartPrice , setTotalCartPrice ] = useState(0)
  let [cartId , setCartId ] = useState()
  useEffect(()=>{
    getLoggedUserCart()
  },[])

  async function getLoggedUserCart(){
    setIsLoading(true)
    let responsed =await axios.get('https://ecommerce.routemisr.com/api/v1/cart',{
      headers :{
        token : localStorage.getItem('token')
      }
    }).catch((err)=>{
      setErrorMessage(err?.response?.data?.message)
      toast.err(err?.response?.data?.message)
    
    })
    setIsLoading(false)
    if(responsed){
      setCartId(responsed.data.data._id)
      setTotalCartPrice(responsed.data.data.totalCartPrice)
      setLoggedUserCart(responsed?.data?.data?.products)
    }
  }


  async function removeProductfromCart(productId){
    let res = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` ,{
      headers :{
        token : localStorage.getItem('token')
      }
    })
    if(res){
      setTotalCartPrice(res.data.data.totalCartPrice)
      setLoggedUserCart(res?.data?.data?.products)
    }
  }


  async function removeCart(){
    setIsLoading(true)
    let res = await axios.delete('https://ecommerce.routemisr.com/api/v1/cart',{
      headers :{
        token : localStorage.getItem('token')
      }
    })
    setIsLoading(false)
    if(res){
      setTotalCartPrice(0)
      setLoggedUserCart([])
      // setErrorMessage('dfdf')
    }
  }

   function productUpdate(productId , count , index){
    let res;
    // console.log(loggedUserCart[index]);
    let newUpdate = [...loggedUserCart]
    newUpdate[index].count = count

    setLoggedUserCart(newUpdate)

  clearTimeout(requestTime)
  setRequestTime(  setTimeout(async () => {
    res = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` , {
   count
 },{
   headers : {
     token : localStorage.getItem('token')
   }
 })
 if(res){
  setTotalCartPrice(res.data.data.totalCartPrice)
  setLoggedUserCart(res?.data?.data?.products)
 }
}, 6000))  


   
    
  }

  return (
    <>
    {isLoading ? 
    <div className='text-center '>
      <i className='fas fa-spinner fa-spin fa-2x py-5'></i>
    </div> : 
    <>
    {loggedUserCart.length == 0 ? 
    <div>
      <h2 className='alert alert-danger text-center my-5'>No product here</h2>
    </div>
    
     
    :
    <div className='my-5'>
      <button onClick={removeCart
      } className='btn btn-danger d-block ms-auto'>Clear</button>
      {loggedUserCart.map((product , index)=>{
        return <div key={product?._id} className="cart-product shadow rounded-2 my-3">
          <div className="row align-items-center">
            <div className="col-md-2">
              <img src={product?.product?.imageCover} className='w-100' alt="" />
            </div>
            <div className="col-md-8">
              <h2>{product?.product?.title}</h2>
              <h5>{product?.product?.category?.name}</h5>
              <p className='d-flex justify-content-md-between'>
                <span>{product?.price} EGP</span>
                <span>
                  <i className='fas fa-star rating-color me-1'></i>
                  {product?.product?.ratingsAverage}
                  </span>
              </p>
              <p>
                <span className='fw-bolder'>Total price :</span> {product?.count * product?.price} EGP
              </p>
            </div>
            <div className="col-md-2">
              <div onClick={()=>{
                removeProductfromCart(product?.product?._id)
              }} className='d-flex flex-column justify-content-center align-items-center gap-3'>
              <div>
              <button className='btn btn-danger'>Remove</button>
              </div>
              <div className="d-flex align-items-center">
                <button onClick={()=>{
                  productUpdate(product?.product?._id , product?.count - 1 ,index)
                }} className='btn btn-danger text-white mx-2'>-</button>
                <span>{product?.count}</span>
                <button onClick={()=>{
                  productUpdate(product?.product?._id , product?.count + 1 , index)
                }}  className='btn bg-main text-white mx-2'>+</button>
              </div>
              </div>
            </div>
          </div>
        </div>
      })}
      <div className='d-flex justify-content-between'>
        <Link to={'/address/' + cartId} className='btn bg-main text-white'>Check out</Link>
        <p>Total cart price : {totalCartPrice} EGP</p>
      </div>
    </div>
    }
  </>
    }
    </>
  )
}
