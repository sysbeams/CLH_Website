import Navigator from "../navigator";
import SubHeading from "../sub-heading";

const AboutUs = () => {
    return (
        <>
            <Navigator links={[
                {
                    title: "About Us",
                    url: "/about"
                }
            ]} />
            <div className="px-[20px] md:px-[50px]">
                <SubHeading text="About " colourText="us." />
                <div className="custom-border  md:h-[330px] bg-[#DBF6FF] flex flex-col gap-4 md:flex-row md:justify-between items-center p-[20px] md:px-[30px] overflow-hidden ">
                    <div className="flex-1 flex flex-col text-[36px] md:text-[44px] leading-[40px] md:leading-[52px] font-[600] justify-center items-center md:items-start">
                        <span className="text-center md:text-start">6+ years of teaching and </span>
                        <span className="text-center md:text-start text-secondary">academic greatness.</span>
                    </div>
                    <div className="relative flex-1 grayscale bg-no-repeat bg-cover bg-[url('/assets/images/man4.png')] w-[300px] min-h-[350px] md:w-[340px] md:h-[440px] -bottom-5">

                    </div>
                </div>
                <div className="custom-border px-[15px] py-[25px] md:p-[30px] text-primary whitespace-pre-line text-[16px] leading-[24px] md:text-[18px] md:leading-[28px] font-[500]">
                    <span className="text-[20px] md:text-[32px] font-[600]">CodeLearnersHub,</span>
                    {
                        " as a knowledge organization, offers a world-class and consistent source of relevant knowledge and expertise essential for success in today's fiercely competitive global Human Capital market. \n\nRooted in a passion for individual and organizational growth, CodeLearnersHub is a 21st-century corporate learning platform. We are dedicated to fostering excellence and helping individuals and organizations achieve their goals. Through aligning knowledge and competencies with global standards and best practices, we empower our learners to thrive in the dynamic landscape of the modern business world."
                    }
                </div>
            </div>
            <div className="h-[180px] md:h-[380px] bg-[#179FC9]"></div>
            <div className="px-[20px] md:px-[50px]">
                <div className="custom-border px-[15px] py-[25px] md:p-[30px] text-primary whitespace-pre-line text-[16px] leading-[24px] md:text-[18px] md:leading-[28px] font-[500]">
                    CodeLearnersHub has trained a diverse group of students who have gone on to make significant impacts in their fields. From emerging leaders to seasoned professionals, our alumni have leveraged the knowledge and skills gained from our platform to drive innovation and positive change. Their collective efforts have not only transformed industries but have also influenced communities and societies at large. As we continue to empower the next generation of learners, CodeLearnersHub remains dedicated to shaping a brighter future through education and empowerment.
                </div>
            </div>
        </>
    );
}

export default AboutUs;