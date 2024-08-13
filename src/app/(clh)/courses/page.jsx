import CourseList from "@/components/courses/course-list";

export const metadata = {
    title: "CLH - Courses",
    description: "Explore the diverse range of coding and software development courses offered by Code Learners Hub. From beginner to advanced programs, our courses are designed to equip you with the skills and knowledge needed to thrive in the tech industry. Find the perfect course to start or advance your career in programming today!",
    keywords: "Coding courses, Software development classes, Tech training programs, Programming courses, Learn to code, Developer training, Best coding bootcamps, Software engineering courses, Online coding classes, Programming education, clh, Code Learners Hub, learn to code",
  };
const CoursesPage = () => {

    return ( 
        <div>
            <CourseList/>
        </div>
     );
}
 
export default CoursesPage;