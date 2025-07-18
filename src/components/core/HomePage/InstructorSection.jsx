import React from 'react'
import CTAButton from "../../../components/core/HomePage/Button";
import { FaArrowRight } from "react-icons/fa";
import Instructor from "../../../assets/Images/Instructor.png";
import HighlightText from './HighlightText';

const InstructorSection = () => {
  return (
    <div className="px-4 sm:px-0">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-center">
          <div className="w-full lg:w-[50%]">
            <img
              src={Instructor}
              alt=""
              className="shadow-white shadow-[-20px_-20px_0_0] w-full h-auto max-w-[400px] lg:max-w-none mx-auto"
            />
          </div>
          <div className="w-full lg:w-[50%] flex gap-6 lg:gap-10 flex-col text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl font-semibold">
              Become an
              <HighlightText text={"instructor"} />
            </h1>

            <p className="font-medium text-[14px] sm:text-[16px] text-center lg:text-justify w-[95%] lg:w-[90%] text-richblack-300 mx-auto lg:mx-0">
              Instructors from around the world teach millions of students on
              StudyNotion. We provide the tools and skills to teach what you
              love.
            </p>

            <div className="w-fit mx-auto lg:mx-0">
              <CTAButton active={true} linkto={"/signup"}>
                <div className="flex items-center gap-3">
                  Start Teaching Today
                  <FaArrowRight />
                </div>
              </CTAButton>
            </div>
          </div>
        </div>
    </div>
  )
}

export default InstructorSection