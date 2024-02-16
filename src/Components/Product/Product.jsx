import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../Contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

function Product({product}) {
  let{userIsLoggedIn,setUserIsLoggedIn} = useContext(AuthContext)
  let navigate = useNavigate()


  async function addProductToCart(productId){
    console.log(productId);
    let res =await axios.post('https://ecommerce.routemisr.com/api/v1/cart',{
      productId 
    },{
      headers : {
        token : localStorage.getItem('token')
      }
    }).catch((err)=>{
      toast.error(err?.response?.data?.message)
      // setUserIsLoggedIn(false)
      // localStorage.removeItem('token')
      // navigate('/login')
    })
    if(res.data.status == 'success'){
      // toast.success(res.data.data.message)
      toast.success(res?.data?.message)
    }
    console.log(res);
  }


  return (
    <div  className="col-md-3">
        <div className="product overflow-hidden px-2 py-3 cursor-pointer">
        <Link to = {'/productDetails/' + product._id}>
      <img className='w-100' src={product.imageCover} alt="" />
      <h5 className='font-sm text-main'>
        {product.category.name}
      </h5>
      <h4>
        {product.title.split(' ').slice(0,2).join(' ')}
      </h4>
      <p className='d-flex justify-content-between'>
        <span>{product.price} EGP</span>
        <span>
          {product.ratingsAverage}
          <i className='fas fa-star rating-color ms-1'></i>
        </span>
      </p>
        </Link>
      <button onClick={()=>{
        addProductToCart(product?._id)
      }} className='btn bg-main text-white w-100'>+Add to Cart</button>
    </div>
   
  </div>
  )
}

export default Product