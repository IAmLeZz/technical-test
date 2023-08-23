"use client"

import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { BsFillArrowRightSquareFill, BsFillArrowLeftSquareFill } from 'react-icons/bs'
import './Slider.css'


const buttonStyle = {
    background: 'none',
    color: '#1c1c1c',
    margin: '10px',
    border: '0',
    fontSize: '40px',
    filter: 'drop-shadow(1px 1px 2px #ffffff)'
};

const properties = {
    prevArrow: <button style={{ ...buttonStyle }} className='md:text-[60px]'><BsFillArrowLeftSquareFill /></button>,
    nextArrow: <button style={{ ...buttonStyle }} className='md:text-[60px]'><BsFillArrowRightSquareFill /></button>
}
const RocketSlider = ({ slideImages }: { slideImages: string[] }) => {
    return (
        <div className="slide-container ">
            <Slide {...properties}>
                {slideImages.map((slideImage, index) => (
                    <div key={index} className='m-auto'>
                        <div className='sliderStyle w-full h-auto mb-4 rounded-lg shadow-md' style={{ 'backgroundImage': `url(${slideImage})`, borderRadius: '15px', width: '100%' }}>
                        </div>
                    </div>
                ))}
            </Slide>
        </div>
    );
};

export default RocketSlider;