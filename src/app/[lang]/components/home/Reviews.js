"use client";

import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaQuoteLeft } from "react-icons/fa";
import "../../styles/reviews.scss";

function Reviews({ recommendations }) {
  const settings = {
    focusOnSelect: true,
    pauseOnFocus: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 800,
    dots: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "ease-out",
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          dots: true,
        }
      },
    ]
  };

  return (
    <div className="slider-container">
      <div className="background-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>
      <Slider {...settings}>
        {Object.values(recommendations).map((obj, index) => (
          <div className="card" key={index}>
            <div className="card-content">
              <div className="quote-icon">
                <FaQuoteLeft />
              </div>
              <div className="padding">
                <div className="header">
                  <span className="header title">{obj.name}</span>
                  <span className="header subtitle">{obj.rol}</span>
                </div>
                <p className="recommendation-text">{obj.text}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Reviews;