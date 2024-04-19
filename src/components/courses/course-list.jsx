"use client";
import SubHeading from "../sub-heading";
import CoursesData from "../../data/courses.json";
import { useState } from "react";
import CourseCard from "../course-card";
import Navigator from "../navigator";

const CourseList = () => {

    const [courses, setCourses] = useState(CoursesData);
    return (
        <>
            <Navigator links={[
                {
                    title: "Courses",
                    url: "/courses"
                }
            ]}/>
            <div className="px-[20px] md:px-[50px]">
                <SubHeading text="Available " colourText="courses." />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {
                        courses.map(c =>
                            <CourseCard key={Math.random() * 9} id={c.id} imgPath={c.imgPath} title={c.title} price={c.price} />
                        )
                    }
                </div>
            </div>
        </>
    );
}

export default CourseList;