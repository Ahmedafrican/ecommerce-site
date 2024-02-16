import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Brands() {
  let [brandsData , setBrandData] = useState([])

  useEffect(()=>{
    getAllBrands()
  },[])

  async function getAllBrands(){
    let res = await axios.get('https://ecommerce.routemisr.com/api/v1/brands')
    console.log(res.data.data);
    setBrandData(res.data.data)
  }


  return (
    <div className='row'>
      {brandsData.map((brand)=>{
        return(
        <div className="col-md-3" key={brand._id}>
        <div className="show-brands">
          <Link to={'/brandsDetails/' + brand._id}>
          <img className='w-100' src={brand.image} alt="" />
          </Link>
          
        </div>
      </div>
      )
        
      })}
    </div>
  )
}
