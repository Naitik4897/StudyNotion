const RatingAndReview = require("../models/RatingAndRaview");
const Course = require("../models/Course");
const User = require("../models/User");
const mongoose = require("mongoose");

//createRating
exports.createRating = async (req, res) => {
    try{

        //get user id
        const userId = req.user.id;
        //fetchdata from req body
        const {rating, review, courseId} = req.body;
        //check if user is enrolled or not
        const courseDetails = await Course.findOne(
                                    {_id:courseId,
                                    studentsEnrolled: {$elemMatch: {$eq: userId} },
                                });

        if(!courseDetails) {
            return res.status(404).json({
                success:false,
                message:'Student is not enrolled in the course',
            });
        }
        //check if user already reviewed the course
        const alreadyReviewed = await RatingAndReview.findOne({
                                                user:userId,
                                                course:courseId,
                                            });
        if(alreadyReviewed) {
                    return res.status(403).json({
                        success:false,
                        message:'Course is already reviewed by the user',
                    });
                }
        //create rating and review
        const ratingReview = await RatingAndReview.create({
                                        rating, review, 
                                        course:courseId,
                                        user:userId,
                                    });
       
        //update course with this rating/review
        const updatedCourseDetails = await Course.findByIdAndUpdate({_id:courseId},
                                    {
                                        $push: {
                                            ratingAndReviews: ratingReview._id,
                                        }
                                    },
                                    {new: true});
        console.log(updatedCourseDetails);
        //return response
        return res.status(200).json({
            success:true,
            message:"Rating and Review created Successfully",
            ratingReview,
        })
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}



//getAverageRating
exports.getAverageRating = async (req, res) => {
    try {
            //get course ID
            const courseId = req.body.courseId;
            //calculate avg rating

            const result = await RatingAndReview.aggregate([
                {
                    $match:{
                        course: new mongoose.Types.ObjectId(courseId),
                    },
                },
                {
                    $group:{
                        _id:null,
                        averageRating: { $avg: "$rating"},
                    }
                }
            ])

            //return rating
            if(result.length > 0) {

                return res.status(200).json({
                    success:true,
                    averageRating: result[0].averageRating,
                })

            }
            
            //if no rating/Review exist
            return res.status(200).json({
                success:true,
                message:'Average Rating is 0, no ratings given till now',
                averageRating:0,
            })
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}


//getAllRatingAndReviews

exports.getAllRating = async (req, res) => {
    try {
        console.log("Starting getAllRating function...");
        
        // Check if RatingAndReview model is properly loaded
        if (!RatingAndReview) {
            console.error("RatingAndReview model not found");
            throw new Error("RatingAndReview model not found");
        }
        
        console.log("Checking database connection...");
        
        // Test database connection first
        if (mongoose.connection.readyState !== 1) {
            console.error("Database not connected. Connection state:", mongoose.connection.readyState);
            throw new Error("Database connection failed");
        }
        
        console.log("Database connected. Fetching reviews...");
        
        // First, let's try a simple query without population to test basic functionality
        const reviewCount = await RatingAndReview.countDocuments();
        console.log(`Total reviews in database: ${reviewCount}`);
        
        if (reviewCount === 0) {
            console.log("No reviews found in database");
            return res.status(200).json({
                success: true,
                message: "No reviews found in database yet. This is normal for a new application.",
                data: [],
            });
        }
        
        console.log("Fetching reviews with population...");
        
        try {
            // Try to fetch with population first - explicitly specify the model to avoid schema registration issues
            const allReviews = await RatingAndReview.find({})
                .sort({ rating: "desc" })
                .populate({
                    path: "user",
                    model: User,
                    select: "firstName lastName email image"
                })
                .populate({
                    path: "course", 
                    model: Course,
                    select: "courseName"
                })
                .exec();
                
            console.log(`Successfully fetched ${allReviews.length} reviews from database`);
            
            // Filter out any reviews with missing user or course data
            const validReviews = allReviews.filter(review => {
                const isValid = review.user && review.course && review.review && review.rating;
                if (!isValid) {
                    console.log("Found invalid review:", {
                        hasUser: !!review.user,
                        hasCourse: !!review.course,
                        hasReview: !!review.review,
                        hasRating: !!review.rating
                    });
                }
                return isValid;
            });
            
            console.log(`Found ${validReviews.length} valid reviews after filtering`);
            
            return res.status(200).json({
                success: true,
                message: validReviews.length > 0 
                    ? "Reviews fetched successfully" 
                    : "No valid reviews found in database",
                data: validReviews,
            });
            
        } catch (populateError) {
            console.log("Population failed, trying manual lookup:", populateError.message);
            
            // Fallback: fetch reviews without population and manually lookup users and courses
            const allReviews = await RatingAndReview.find({}).sort({ rating: "desc" }).exec();
            console.log(`Fetched ${allReviews.length} reviews without population`);
            
            const enrichedReviews = [];
            
            for (const review of allReviews) {
                try {
                    // Manually fetch user and course data
                    const user = await User.findById(review.user).select("firstName lastName email image").exec();
                    const course = await Course.findById(review.course).select("courseName").exec();
                    
                    if (user && course) {
                        enrichedReviews.push({
                            _id: review._id,
                            rating: review.rating,
                            review: review.review,
                            user: {
                                firstName: user.firstName,
                                lastName: user.lastName,
                                email: user.email,
                                image: user.image
                            },
                            course: {
                                courseName: course.courseName
                            }
                        });
                    }
                } catch (lookupError) {
                    console.log("Failed to lookup data for review:", review._id, lookupError.message);
                }
            }
            
            console.log(`Successfully enriched ${enrichedReviews.length} reviews manually`);
            
            return res.status(200).json({
                success: true,
                message: enrichedReviews.length > 0 
                    ? "Reviews fetched successfully (manual lookup)" 
                    : "No valid reviews found in database",
                data: enrichedReviews,
            });
        }
        
    } catch(error) {
        console.error("Error in getAllRating:", error);
        console.error("Error stack:", error.stack);
        console.error("Error name:", error.name);
        console.error("Error message:", error.message);
        
        return res.status(500).json({
            success: false,
            message: "Failed to fetch reviews from database",
            error: process.env.NODE_ENV === 'development' ? {
                message: error.message,
                stack: error.stack,
                name: error.name
            } : "Internal server error"
        });
    } 
}

// Temporary endpoint for testing - provides mock data if database is empty
exports.getMockReviews = async (req, res) => {
    try {
        console.log("Serving mock reviews for testing...");
        
        const mockReviews = [
            {
                _id: "mock1",
                rating: 5,
                review: "Amazing course! Really helped me understand the concepts.",
                user: {
                    firstName: "John",
                    lastName: "Doe",
                    email: "john@example.com",
                    image: null
                },
                course: {
                    courseName: "React Development"
                }
            },
            {
                _id: "mock2",
                rating: 4,
                review: "Great content and excellent instructor. Highly recommended!",
                user: {
                    firstName: "Jane",
                    lastName: "Smith", 
                    email: "jane@example.com",
                    image: null
                },
                course: {
                    courseName: "JavaScript Fundamentals"
                }
            },
            {
                _id: "mock3",
                rating: 5,
                review: "Comprehensive course with practical examples. Worth every penny!",
                user: {
                    firstName: "Mike",
                    lastName: "Johnson",
                    email: "mike@example.com", 
                    image: null
                },
                course: {
                    courseName: "Node.js Backend"
                }
            }
        ];
        
        return res.status(200).json({
            success: true,
            message: "Mock reviews for testing purposes",
            data: mockReviews,
        });
        
    } catch(error) {
        console.error("Error in getMockReviews:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch mock reviews",
            error: error.message
        });
    }
}