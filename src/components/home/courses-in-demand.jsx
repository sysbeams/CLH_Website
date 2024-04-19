"use client";
import SubHeading from "../sub-heading";
import CoursesData from "../../data/courses.json";
import { useState } from "react";
import CourseCard from "../course-card";

const CoursesInDemand = () => {

    const [courses, setCourses] = useState(CoursesData);
    return (
        <div className="px-[20px] md:px-[50px]">
            <SubHeading text="Curated courses" colourText="in demand." />
            <div className="grid grid-cols-1 md:grid-cols-3">
                {
                    courses.slice(0, 3).map(c =>
                        <CourseCard key={Math.random() * 9} id={c.id} imgPath={c.imgPath} title={c.title} price={c.price} />
                    )
                }
            </div>
        </div>
    );
}

export default CoursesInDemand;