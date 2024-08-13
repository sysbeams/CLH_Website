import Achievements from "@/components/home/achievements";
import Alumni from "@/components/home/alumni";
import DropMessage from "@/components/home/drop-message";
import CoursesInDemand from "@/components/home/courses-in-demand";
import Heading from "@/components/home/heading";
import HowThingsWork from "@/components/home/how-things-work";
import Love from "@/components/home/love";
import Needs from "@/components/home/needs";
import Testimonials from "@/components/home/testimonials";

export const metadata = {
    title: "CLH - Home",
    description: "Learn, Collaborate, Validate\nBecome an industry ready software developer in a few months.\n\n Code Learners Hub gives the best training and hand-on experience that you need to fit into the evolving and competitive global tech market.",
    keywords: "software development, code learners hub, clh, tech training, hands-on experience, industry-ready developers, global tech market, programming courses, coding bootcamp, developer education, learn coding, learn to code",
  };

const HomePage = () => {
    return ( 
        <div className="mt-[30px]">
            <Heading/>
            <Needs/>
            <CoursesInDemand/>
            <HowThingsWork/>
            <Achievements/>
            <Love/>
            <Testimonials/>
            <Alumni/>
            <DropMessage/>
        </div>
     );
}
 
export default HomePage;