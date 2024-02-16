import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function BrandsDetails() {

  let[brandDetails , setBrandDetails] = useState({})

  let {id} = useParams()
  console.log(id);

  useEffect(()=>{
    getBrandsDetails(id)
  },[])

  async function getBrandsDetails(productId){
    let res = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${productId}`)
    console.log(res.data.data);
    setBrandDetails(res.data.data)
  }

  return (
    <div>
        <img src={brandDetails.image} alt="" />
    </div>
  )
}

export default BrandsDetails