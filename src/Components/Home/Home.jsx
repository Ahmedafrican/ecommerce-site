import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Product from '../Product/Product'
import MainSlider from '../MainSlider/MainSlider';
import CategorySlider from '../CategorySlider/CategorySlider';
import { useQuery } from 'react-query';
import { Helmet } from 'react-helmet';



export default function Home() {

  // const[products , setProducts] = useState([])


  // useEffect(()=>{
  //   getData()
  // },[])

  // async function getData(){
  //   let{data} = await axios.get('https://ecommerce.routemisr.com/api/v1/products')
  //   setProducts(data.data)
  //   console.log(data.data);
  // }
  
  function getData(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/products')
  }

  let {data , isError , isFetching , isFetched , isLoading, isStale , refetch} = useQuery('products',getData,{
    cacheTime : 5000,
    // refetchInterval :15000,
    // refetchOnMount : false,
    // staleTime :10000,
    enabled : false
  })
  console.log(isFetching , isLoading);


  return (
    <>
    <Helmet>
      <title>
        Home
      </title>
    </Helmet>
      <MainSlider/>
      <CategorySlider/>
      <button onClick={refetch} className='btn bg-main w-100 text-white text-center'>Get all products</button>
      {isLoading ? <div className='text-center'>
        <i className='fas fa-spinner fa-spin fa-2x py-5'></i>
      </div> :
      <div className="row">
        {data?.data.data.map((product)=>{
          return <Product key={product._id} product = {product}/>
        })}
      </div>}
    </>
  )
}
