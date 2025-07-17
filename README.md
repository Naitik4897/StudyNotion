# StudyNotion - EdTech Platform

StudyNotion is a fully functional ed-tech platform that enables users to create, consume, and rate educational content. The platform is built using the MERN stack (MongoDB, ExpressJS, ReactJS, NodeJS) and provides a seamless and interactive learning experience for students and a platform for instructors to showcase their expertise.

## 🚀 Features

### For Students
- **User Registration & Authentication**: Secure signup/login with email verification
- **Course Catalog**: Browse and search through available courses
- **Course Enrollment**: Purchase and enroll in courses using Razorpay integration
- **Video Streaming**: Watch course videos with progress tracking
- **Course Progress**: Track learning progress and completion status
- **User Profile**: Manage personal information and view enrolled courses
- **Rating & Reviews**: Rate and review courses after completion
- **Wishlist**: Save courses for later purchase

### For Instructors
- **Instructor Dashboard**: Comprehensive dashboard to manage courses
- **Course Creation**: Create courses with videos, descriptions, and pricing
- **Content Management**: Upload and organize course materials
- **Student Analytics**: View student enrollment and progress statistics
- **Earnings Overview**: Track revenue and course performance
- **Course Editing**: Edit and update existing courses

### System Features
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Cloud Storage**: Media files stored securely on Cloudinary
- **Payment Integration**: Secure payment processing with Razorpay
- **Email Notifications**: Automated email notifications for various actions
- **Search & Filter**: Advanced search and filtering capabilities
- **Media Management**: Efficient handling of images and videos

## 🛠️ Tech Stack

### Frontend
- **React.js**: Frontend framework
- **Redux Toolkit**: State management
- **Tailwind CSS**: Styling and responsive design
- **React Router**: Navigation and routing
- **Axios**: HTTP client for API calls
- **React Hook Form**: Form handling and validation
- **React Player**: Video playback component
- **React Hot Toast**: Notifications
- **React Icons**: Icon library

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **JWT**: Authentication and authorization
- **Bcrypt**: Password hashing
- **Multer**: File upload handling
- **Cloudinary**: Cloud storage for media files
- **Razorpay**: Payment gateway integration
- **Nodemailer**: Email service
- **Express Fileupload**: File upload middleware

## 📁 Project Structure

```
StudyNotion/
├── src/                          # Frontend source code
│   ├── components/               # Reusable UI components
│   ├── pages/                    # Page components
│   ├── services/                 # API services
│   ├── slices/                   # Redux slices
│   ├── utils/                    # Utility functions
│   ├── hooks/                    # Custom hooks
│   └── data/                     # Static data
├── server/                       # Backend source code
│   ├── controllers/              # Request handlers
│   ├── models/                   # Database models
│   ├── routes/                   # API routes
│   ├── middlewares/              # Custom middlewares
│   ├── config/                   # Configuration files
│   ├── mail/                     # Email templates
│   └── utils/                    # Backend utilities
├── public/                       # Static assets
└── docs/                         # Documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Cloudinary account
- Razorpay account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Naitik4897/study-notion-project.git
   cd study-notion-project
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   npm install
   
   # Install backend dependencies
   cd server
   npm install
   ```

3. **Environment Configuration**
   
   Create `.env` file in the root directory:
   ```env
   REACT_APP_BASE_URL=http://localhost:4000/api/v1
   REACT_APP_RAZORPAY_KEY=your_razorpay_key
   ```
   
   Create `.env` file in the server directory:
   ```env
   MONGODB_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   FOLDER_NAME=StudyNotion
   RAZORPAY_KEY=your_razorpay_key
   RAZORPAY_SECRET=your_razorpay_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   MAIL_HOST=smtp.gmail.com
   MAIL_USER=your_email@gmail.com
   MAIL_PASS=your_app_password
   ```

4. **Start the application**
   ```bash
   # Run both frontend and backend concurrently
   npm run dev
   
   # Or run separately
   # Frontend (from root directory)
   npm start
   
   # Backend (from server directory)
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:4000

## 🔧 API Endpoints

### Authentication
- `POST /api/v1/auth/signup` - User registration
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/sendotp` - Send OTP for verification
- `POST /api/v1/auth/changepassword` - Change password

### Courses
- `GET /api/v1/course/getAllCourses` - Get all courses
- `POST /api/v1/course/createCourse` - Create new course
- `GET /api/v1/course/getCourseDetails/:id` - Get course details
- `PUT /api/v1/course/editCourse` - Edit course
- `DELETE /api/v1/course/deleteCourse` - Delete course

### Payment
- `POST /api/v1/payment/capturePayment` - Capture payment
- `POST /api/v1/payment/verifyPayment` - Verify payment
- `POST /api/v1/payment/sendPaymentSuccessEmail` - Send payment confirmation

### Profile
- `GET /api/v1/profile/getUserDetails` - Get user profile
- `PUT /api/v1/profile/updateProfile` - Update profile
- `PUT /api/v1/profile/updateDisplayPicture` - Update profile picture
- `DELETE /api/v1/profile/deleteProfile` - Delete account

## 🌟 Key Features Implementation

### Authentication System
- JWT-based authentication with refresh tokens
- Email verification using OTP
- Password reset functionality
- Role-based access control (Student/Instructor)

### Payment Integration
- Razorpay payment gateway integration
- Secure payment processing
- Payment verification and confirmation
- Automated email receipts

### Course Management
- Rich course creation interface
- Video upload and streaming
- Course progress tracking
- Rating and review system

### User Experience
- Responsive design for all devices
- Fast loading with optimized images
- Interactive UI with smooth animations
- Real-time notifications

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👥 Authors

- **Naitik** - *Initial work* - [Naitik4897](https://github.com/Naitik4897)

## 🙏 Acknowledgments

- React.js community for excellent documentation
- MongoDB for robust database solutions
- Cloudinary for seamless media management
- Razorpay for secure payment processing
- All contributors who helped improve this project

## 📞 Support

For support, email nrmaisuriya3@gmail.com or create an issue in this repository.

## 🔮 Future Enhancements

- [ ] Mobile app development
- [ ] Advanced analytics dashboard
- [ ] AI-powered course recommendations
- [ ] Live streaming capabilities
- [ ] Multi-language support
- [ ] Offline course downloads
- [ ] Integration with learning management systems
- [ ] Advanced search with filters
- [ ] Discussion forums for courses
- [ ] Certificate generation system

---

**Happy Learning! 🎓**
