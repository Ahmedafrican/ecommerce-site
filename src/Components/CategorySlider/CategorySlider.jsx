import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Slider from "react-slick";

function CategorySlider() {
    let [categorySlider , setCategorySlider] = useState([])
    useEffect(()=>{
        getAllCategories()
    },[])

    async function getAllCategories(){
        let {data} =await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
        console.log(data.data);
        setCategorySlider(data.data)

    }



    let settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 3
      };


  return (
    <Slider {...settings}>
        {categorySlider.map((category,index)=>{
            return(
                <div key={index}>
                 <img src={category.image} className='w-100' height={200} alt={category.name} />
                 <h5 className='font-sm text-main'>{category.name}</h5>
                </div>
           
            )
           
            
        })}
    </Slider>
  )
}

export default CategorySlider