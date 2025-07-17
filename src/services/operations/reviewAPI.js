import { toast } from "react-hot-toast"
import { apiConnector } from "../apiconnector"
import { ratingsEndpoints } from "../apis"

const { REVIEWS_DETAILS_API } = ratingsEndpoints

// Get all reviews
export const getAllReviews = async () => {
  let result = []
  
  try {
    const response = await apiConnector("GET", REVIEWS_DETAILS_API)
    
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could not fetch reviews")
    }
    
    result = response?.data?.data || []
    
  } catch (error) {
    // Silently handle errors for reviews
    result = []
  }
  
  return result
}

// Create a review (for enrolled students)
export const createReview = async (reviewData, token) => {
  const toastId = toast.loading("Submitting Review...")
  let success = false
  
  try {
    const response = await apiConnector(
      "POST", 
      ratingsEndpoints.CREATE_RATING_API || (ratingsEndpoints.REVIEWS_DETAILS_API.replace('/getReviews', '/createRating')),
      reviewData,
      {
        Authorization: `Bearer ${token}`,
      }
    )
    
    if (!response?.data?.success) {
      throw new Error(response.data.message)
    }
    
    toast.success("Review submitted successfully!")
    success = true
    
  } catch (error) {
    if (error.response?.status === 403) {
      toast.error("You are not enrolled in this course")
    } else if (error.response?.status === 400) {
      toast.error("You have already reviewed this course")
    } else {
      toast.error(error.response?.data?.message || "Could not submit review")
    }
  }
  
  toast.dismiss(toastId)
  return success
}

// Get sample reviews for demonstration
export const getSampleReviews = () => [
  {
    _id: "sample1",
    user: {
      firstName: "Sarah",
      lastName: "Johnson",
      email: "sarah@example.com",
      image: null
    },
    course: {
      courseName: "Complete Web Development Bootcamp"
    },
    review: "This course completely transformed my understanding of web development. The instructor explains complex concepts in a very clear and engaging way. I went from knowing nothing about coding to building my own web applications!",
    rating: 5
  },
  {
    _id: "sample2",
    user: {
      firstName: "Michael",
      lastName: "Chen",
      email: "michael@example.com",
      image: null
    },
    course: {
      courseName: "Data Science with Python"
    },
    review: "Excellent course with practical examples and real-world projects. The content is well-structured and the instructor provides great support throughout the learning journey.",
    rating: 4.8
  },
  {
    _id: "sample3",
    user: {
      firstName: "Emily",
      lastName: "Rodriguez",
      email: "emily@example.com",
      image: null
    },
    course: {
      courseName: "React.js Masterclass"
    },
    review: "I highly recommend this course to anyone wanting to learn React. The projects are challenging but rewarding, and I feel confident building React applications now.",
    rating: 4.9
  },
  {
    _id: "sample4",
    user: {
      firstName: "David",
      lastName: "Thompson",
      email: "david@example.com",
      image: null
    },
    course: {
      courseName: "Machine Learning Fundamentals"
    },
    review: "Great introduction to machine learning concepts. The course covers both theory and practical implementation. Perfect for beginners in the field.",
    rating: 4.7
  },
  {
    _id: "sample5",
    user: {
      firstName: "Lisa",
      lastName: "Wang",
      email: "lisa@example.com",
      image: null
    },
    course: {
      courseName: "Mobile App Development"
    },
    review: "Amazing course! I built my first mobile app by the end of it. The step-by-step approach made complex topics easy to understand.",
    rating: 4.6
  },
  {
    _id: "sample6",
    user: {
      firstName: "James",
      lastName: "Wilson",
      email: "james@example.com",
      image: null
    },
    course: {
      courseName: "Digital Marketing Strategy"
    },
    review: "Comprehensive course covering all aspects of digital marketing. The case studies and real-world examples were particularly valuable.",
    rating: 4.4
  }
]
