import React, { useState, useEffect } from 'react';
import './Slider.css';
import img1 from "../img/img1.jpeg"
import img2 from "../img/img2.jpg"
import img3 from "../img/img3.jpg"

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState([
    { id: 1, image: img1 },
    { id: 2, image: img2 },
    { id: 3, image: img3 }
  ]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000); 

    return () => clearInterval(intervalId);
  }, [slides]);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
    const slides = document.querySelectorAll('.slide');
    slides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });
  };

  return (
    <div className="slider-container">
      <div className="slider">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
          >
            <img src={slide.image} alt={slide.image} />
          </div>
        ))}
      </div>
      <div className="slider-nav">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => handleSlideChange(index)}
            className={index === currentSlide ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Slider;