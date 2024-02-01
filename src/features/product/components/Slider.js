import React from 'react'
import pic1 from '../../../Images/1.png'
import pic2 from '../../../Images/2.png'
import pic3 from '../../../Images/3.png'

const Slider = () => {
  return (
    <div id="carouselExampleFade" class="carousel slide carousel-fade " data-bs-ride="carousel">
    <div class="carousel-inner ">
      <div class="carousel-item active">
        <img src={pic1} class="d-block w-100 " alt="..."/>
      </div>
      <div class="carousel-item">
        <img src={pic2} class="d-block w-100" alt="..."/>
      </div>
      <div class="carousel-item">
        <img src={pic3} class="d-block w-100"  alt="..."/>
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
  )
}

export default Slider