import React, { useEffect, useState } from 'react'
import RatingStars from '../../common/RatingStars'
import GetAvgRating from '../../../utils/avgRating';
import { Link } from 'react-router-dom';

const Course_Card = ({course, Height}) => {

    const [avgReviewCount, setAvgReviewCount] = useState(0);

    useEffect(()=> {
        const count = GetAvgRating(course.ratingAndReviews);
        setAvgReviewCount(count);
    },[course])


    
  return (
    <>
      <Link to={`/courses/${course._id}`}>
        <div className="w-full h-full flex flex-col bg-richblack-800 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="relative overflow-hidden">
            <img
              src={course?.thumbnail}
              alt="course thumbnail"
              className={`${Height} w-full object-cover hover:scale-105 transition-transform duration-300`}
            />
            <div className="absolute top-2 right-2 bg-richblack-700 bg-opacity-80 text-yellow-25 px-2 py-1 rounded-md text-xs font-medium">
              ₹{course?.price}
            </div>
          </div>
          <div className="flex flex-col gap-2 p-4 flex-grow">
            <h3 className="text-lg font-semibold text-richblack-5 mb-1 min-h-[3rem] line-clamp-2">
              {course?.courseName}
            </h3>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-richblack-800 font-bold text-sm flex-shrink-0">
                {typeof course?.instructor === 'object' && course?.instructor?.firstName ? course.instructor.firstName.charAt(0) : 'I'}
                {typeof course?.instructor === 'object' && course?.instructor?.lastName ? course.instructor.lastName.charAt(0) : 'N'}
              </div>
              <p className="text-sm text-richblack-100 font-medium truncate">
                By {typeof course?.instructor === 'object' && course?.instructor?.firstName ? `${course.instructor.firstName} ${course.instructor.lastName}` : 'Instructor'}
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <span className="text-yellow-5 font-semibold">{avgReviewCount || 0}</span>
              <RatingStars Review_Count={avgReviewCount} />
              <span className="text-richblack-400 text-sm">
                ({course?.ratingAndReviews?.length || 0} Reviews)
              </span>
            </div>
            <div className="mt-auto pt-2 border-t border-richblack-700">
              <p className="text-xl font-bold text-richblack-5">₹{course?.price}</p>
              <p className="text-sm text-richblack-300">Full Course Access</p>
            </div>
          </div>
        </div>
      </Link>
    </>
  )
}

export default Course_Card
