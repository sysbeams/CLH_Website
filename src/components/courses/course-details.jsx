"use client";
import { usePathname } from "next/navigation";
import Navigator from "../navigator";
import CoursesData from "../../data/courses.json";
import SubHeading from "../sub-heading";
import { useEffect, useState } from "react";
import { GoArrowUpRight } from "react-icons/go";

const CourseDetails = () => {

    const pathname = usePathname();
    const [courses, setCourses] = useState(CoursesData);
    const [course, setCourse] = useState(null);

    useEffect(() => {
        const parts = pathname.split("/");
        const id = parts[parts.length - 1];
        const activeCourse = courses.find(c => c.id == id);
        setCourse(activeCourse);
    }, [pathname])
    return (

        course ?
            <>
                <Navigator links={
                    [
                        {
                            title: "Courses",
                            url: "/courses"
                        },
                        {
                            title: course.title,
                            url: `/courses${course.id}`
                        },

                    ]} />

                <div className="px-[20px] md:px-[50px]">
                    <SubHeading text={course.title} colourText="" />
                    <div className=" flex flex-col md:flex-row md:h-[550px]">
                        <div className="custom-border md:flex-1  h-[300px] md:h-auto grayscale bg-no-repeat bg-cover bg-center " style={{ backgroundImage: `url('${course.imgPath}')` }}></div>
                        <div className="md:basis-[35%] flex flex-col">
                            <div className="custom-border h-[88px] md:h-auto px-[15px] md:px-[30px] justify-center md:flex-1 flex flex-col">
                                <span className="text-[18px] font-[500]">Enrolled.</span>
                                <span className="text-[28px] md:text-[32px] font-[600]">{course.enrolled}</span>
                            </div>
                            <div className="custom-border h-[88px] md:h-auto px-[15px] md:px-[30px] justify-center md:flex-1 flex flex-col">
                                <span className="text-[18px] font-[500]">Lectures.</span>
                                <span className="text-[28px] md:text-[32px] font-[600]">{course.lectures}</span>
                            </div>
                            <div className="custom-border h-[88px] md:h-auto px-[15px] md:px-[30px] justify-center md:flex-1 flex flex-col">
                                <span className="text-[18px] font-[500]">Level.</span>
                                <span className="text-[28px] md:text-[32px] font-[600]">{course.level}</span>
                            </div>
                            <div className="custom-border h-[88px] md:h-auto px-[15px] md:px-[30px] justify-center md:flex-1 flex flex-col">
                                <span className="text-[28px] text-secondary font-[600]">{course.price}</span>
                            </div>
                            <button className="custom-border h-[88px] md:h-auto px-[15px] md:px-[30px] md:flex-1 flex bg-secondary justify-between items-center text-[20px] md:text-[28px] font-[600]">
                                <span>
                                    Buy Course
                                </span>
                                <GoArrowUpRight size={20} />
                            </button>
                        </div>
                    </div>
                    <div className=" flex text-primary">
                        <div className="custom-border md:flex-1 text-[16px] md:text-[18px] font-[500] p-[15px] md:p-[30px] flex flex-col gap-8">
                            <span className=" whitespace-pre-line">{course.description}</span>
                            <ul className=" list-disc ml-6 ">
                                {
                                    course.topicsCovered.map(t =>
                                        <li key={Math.random() * 45}>{t}</li>
                                    )
                                }
                            </ul>
                            <div >
                                <h4 className="text-[29px] md:text-[32px] font-[700]">What do you benefit?</h4>
                                <span>In this immersive 12-month Engineering course, you will achieve the following learning outcomes</span>
                                <ul className=" list-decimal ml-6 mt-4">
                                    {
                                        course.learningOutcomes.map(t =>
                                            <li key={Math.random() * 65}>{t}</li>
                                        )
                                    }
                                </ul>
                            </div>
                            <div >
                                <h4 className="text-[29px] md:text-[32px] font-[700]">Whom are the target audience?</h4>
                                <ul className=" list-disc ml-6 mt-4">
                                    {
                                        course.targetAudience.map(t =>
                                            <li key={Math.random() * 65}>{t}</li>
                                        )
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className="custom-border md:basis-[35%] hidden md:flex"></div>
                    </div>
                </div>
            </>
            :
            <span>loading</span>

    );
}

export default CourseDetails;