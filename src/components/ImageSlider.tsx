'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import Image from 'next/image'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const sliderImages = [
  '/images/slider/image1.jpg',
  '/images/slider/image2.jpg',
  '/images/slider/image3.jpg'
]

export default function ImageSlider() {
  return (
    <div className="w-full">
      {sliderImages.length === 0 ? (
        <div className="text-center text-red-500">No images found for slider</div>
      ) : (
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ 
            delay: 3000,
            disableOnInteraction: false 
          }}
          loop={true}
          className="w-full h-[500px]"
        >
          {sliderImages.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full">
                <Image 
                  src={image} 
                  alt={`Slider image ${index + 1}`}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    console.error(`Error loading image: ${image}`, e)
                  }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  )
}
