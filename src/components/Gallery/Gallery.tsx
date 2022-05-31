import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import './gallery.scss'

interface IGallery {
  images: string[]
}

const Gallery: React.FC<IGallery> = ({ images }) => {
  return (
    <div className="gallery">
      <Swiper
        modules={[Pagination]}
        spaceBetween={10}
        slidesPerView={1}
        pagination={{ clickable: true }}
      >
        {images?.map((img, index) => (
          <SwiperSlide key={index}><img src={img} alt="" /></SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default Gallery