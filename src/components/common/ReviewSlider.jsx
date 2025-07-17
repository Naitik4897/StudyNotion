import React, { useEffect, useState } from "react"
import ReactStars from "react-rating-stars-component"
// Icons
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa"

// Get apiFunction and the endpoint
import { apiConnector } from "../../services/apiconnector"
import { ratingsEndpoints } from "../../services/apis"

function ReviewSlider() {
  const [reviews, setReviews] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [itemsPerSlide, setItemsPerSlide] = useState(4)
  const truncateWords = 15

  // Update items per slide based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerSlide(1)
      } else if (window.innerWidth < 768) {
        setItemsPerSlide(2)
      } else if (window.innerWidth < 1024) {
        setItemsPerSlide(3)
      } else {
        setItemsPerSlide(4)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      try {
        const { data } = await apiConnector(
          "GET",
          ratingsEndpoints.REVIEWS_DETAILS_API
        )
        if (data?.success) {
          setReviews(data?.data)
          console.log(`✅ Loaded ${data?.data?.length} valid reviews from database`)
          console.log("📊 Review data:", data?.data)
          console.log("ℹ️  Note: Server filters out reviews without ratings")
        }
      } catch (error) {
        console.error("❌ Error fetching reviews:", error)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  // Auto-slide functionality
  useEffect(() => {
    if (reviews.length > itemsPerSlide) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex + itemsPerSlide >= reviews.length ? 0 : prevIndex + itemsPerSlide
        )
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [reviews.length, itemsPerSlide])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + itemsPerSlide >= reviews.length ? 0 : prevIndex + itemsPerSlide
    )
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex - itemsPerSlide < 0 ? Math.max(0, reviews.length - itemsPerSlide) : prevIndex - itemsPerSlide
    )
  }

  const goToSlide = (index) => {
    setCurrentIndex(index * itemsPerSlide)
  }

  if (loading) {
    return (
      <div className="text-white">
        <div className="my-[50px] max-w-maxContentTab lg:max-w-maxContent">
          <div className="text-center text-richblack-200">Loading reviews...</div>
        </div>
      </div>
    )
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-white">
        <div className="my-[50px] max-w-maxContentTab lg:max-w-maxContent">
          <div className="text-center text-richblack-200">No reviews available yet</div>
        </div>
      </div>
    )
  }

  const totalSlides = Math.ceil(reviews.length / itemsPerSlide)
  const currentSlide = Math.floor(currentIndex / itemsPerSlide)

  return (
    <div className="text-white">
      <div className="my-[50px] max-w-maxContentTab lg:max-w-maxContent mx-auto">

        
        <div className="relative">
          {/* Navigation Buttons */}
          {reviews.length > itemsPerSlide && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-richblack-700 hover:bg-richblack-600 text-yellow-25 rounded-full p-3 transition-colors duration-300 shadow-lg"
              >
                <FaChevronLeft size={16} />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-richblack-700 hover:bg-richblack-600 text-yellow-25 rounded-full p-3 transition-colors duration-300 shadow-lg"
              >
                <FaChevronRight size={16} />
              </button>
            </>
          )}

          {/* Reviews Container */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${(currentIndex * 100) / itemsPerSlide}%)` }}
            >
              {reviews.map((review, i) => (
                <div
                  key={i}
                  className={`flex-shrink-0 px-3`}
                  style={{ width: `${100 / itemsPerSlide}%` }}
                >
                  <div className="flex flex-col gap-4 bg-richblack-800 p-4 text-[14px] text-richblack-25 rounded-xl border border-richblack-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 min-h-[220px]">
                    <div className="flex items-center gap-4">
                      <img
                        src={
                          review?.user?.image
                            ? review?.user?.image
                            : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                        }
                        alt=""
                        className="h-12 w-12 rounded-full object-cover border-2 border-richblack-600"
                      />
                      <div className="flex flex-col">
                        <h1 className="font-semibold text-richblack-5 text-base">{`${review?.user?.firstName} ${review?.user?.lastName}`}</h1>
                        <h2 className="text-[12px] font-medium text-richblack-400">
                          {review?.course?.courseName}
                        </h2>
                      </div>
                    </div>
                    <p className="font-medium text-richblack-25 leading-relaxed flex-1">
                      {review?.review && review?.review.split(" ").length > truncateWords
                        ? `${review?.review
                            .split(" ")
                            .slice(0, truncateWords)
                            .join(" ")} ...`
                        : `${review?.review}`}
                    </p>
                    <div className="flex items-center gap-2 mt-auto">
                      <h3 className="font-semibold text-yellow-100">
                        {review.rating.toFixed(1)}
                      </h3>
                      <ReactStars
                        count={5}
                        value={review.rating}
                        size={16}
                        edit={false}
                        activeColor="#ffd700"
                        emptyIcon={<FaStar />}
                        fullIcon={<FaStar />}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Dots */}
          {reviews.length > itemsPerSlide && (
            <div className="flex justify-center mt-6 gap-2">
              <div className="flex items-center gap-4">
                <span className="text-richblack-400 text-sm">
                  Slide {currentSlide + 1} of {totalSlides}
                </span>
                <div className="flex gap-2">
                  {Array.from({ length: totalSlides }, (_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                        currentSlide === index ? 'bg-yellow-400' : 'bg-richblack-600'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ReviewSlider