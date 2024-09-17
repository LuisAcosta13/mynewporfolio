"use client";

import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../styles/reviews.scss"

function Reviews({ recommendations }) {
  const settings = {
    focusOnSelect: true,
    pauseOnFocus: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 2000,
    dots: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "linear",
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      }
    ]
  };

  return (
    <div className="slider-container">
      <div className="blur-left"></div>
      <Slider {...settings}>
        {Object.values(recommendations).map((obj, index) =>
          <div className="card" key={index}>
            <div className="padding">
              <div className="header">
                <span className="header title">{obj.name}</span>
                <span className="header subtitle">{obj.rol}</span>
              </div>
              <p>{obj.text}</p>
            </div>
          </div>
        )}
      </Slider>
      <div className="blur-right"></div>
    </div>
  );
}

export default Reviews;