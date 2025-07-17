import React from 'react'

import {Swiper, SwiperSlide} from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import "swiper/css/navigation"
import { FreeMode, Pagination, Navigation } from 'swiper/modules'
import CourseCard from './Course_Card'

const CourseSlider = ({Courses}) => {
  return (
    <>
      {Courses?.length ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          loop={Courses.length > 2}
          modules={[FreeMode, Pagination, Navigation]}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          navigation={true}
          freeMode={true}
          grabCursor={true}
          breakpoints={{
            640: {
              slidesPerView: 1.5,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 25,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1280: {
              slidesPerView: 3.5,
              spaceBetween: 30,
            },
          }}
          className="course-slider !pb-12"
          style={{
            "--swiper-navigation-color": "#FFD60A",
            "--swiper-pagination-color": "#FFD60A",
            "--swiper-navigation-size": "20px",
          }}
        >
          {Courses?.map((course, i) => (
            <SwiperSlide key={i} className="!h-auto">
              <CourseCard course={course} Height={"h-[180px]"} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-xl text-richblack-5">No Course Found</p>
      )}
    </>
  )
}

export default CourseSlider
