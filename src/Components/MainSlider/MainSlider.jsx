import React from 'react'
import Slider from "react-slick";
import slide1 from '../../Assets/images/blog-img-2.jpeg'
import slide2 from '../../Assets/images/blog-img-1.jpeg'
import img1 from '../../Assets/images/grocery-banner.png'
import img2 from '../../Assets/images/grocery-banner-2.jpeg'

function MainSlider() {

    let settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };

  return (
    <div className="main-slider">
    <div className="row">
      <div className="col-md-9 p-0">
      <Slider {...settings}>
       <img src={slide1} height={500} className='w-100'  />
       <img src={slide2} height={500} className='w-100'  />
    </Slider>
      </div>
      <div className="col-md-3 p-0">
       <img src={img1} className='w-100' alt="" />
       <img src={img2} className='w-100' alt="" />
      </div>
    </div>
  </div>
  )
}

export default MainSlider